package io.nuri.streams.service;

import io.nuri.streams.dto.ProblemRequest;
import io.nuri.streams.exception.CompileException;
import io.nuri.streams.entity.Submission;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.tools.*;
import java.io.*;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.List;


@Slf4j
@Service
@RequiredArgsConstructor
public class DynamicCompiler {

    private static final String SUBMISSION_DIR = "tmp/submissions/";
    private final String TEST_CLASS_NAME = "TestRunner";
    private final String SOLUTION = "Solution";

    public void submit(Submission submission) throws CompileException {
        compile(submission.getProblemId(), submission.getSolution(), SOLUTION);

        run(submission);
    }

    public void createProblemFiles(ProblemRequest problemRequest) throws CompileException {
        String problemId =  problemRequest.problem().getTitle().toLowerCase().replace(' ', '_');

        compile(problemId, problemRequest.problem().getTemplate(), SOLUTION);
        compile(problemId, problemRequest.testClass(), TEST_CLASS_NAME);
    }

    private void run(Submission submission) throws CompileException {
        String currentDir = System.getProperty("user.dir");
        Path problemDirPath = Paths.get(currentDir, SUBMISSION_DIR, submission.getProblemId());
        File javaFile = problemDirPath.resolve(TEST_CLASS_NAME + ".class").toFile();

        StringBuilder output = new StringBuilder();
        StringBuilder errorOutput = new StringBuilder();
        if (!javaFile.exists()) {
            throw new CompileException("Server problem. Compiled file not exists for problem + " + submission.getProblemId());
        }

        try {
            // Construct the classpath
            String classpath = problemDirPath.toAbsolutePath().toString();

            // Use ProcessBuilder to run the compiled class
            ProcessBuilder builder = new ProcessBuilder("java", "-cp", classpath, TEST_CLASS_NAME);
            Process process = builder.start();

            // Capture stdout and stderr separately
            BufferedReader stdOutReader = new BufferedReader(new InputStreamReader(process.getInputStream()));
            BufferedReader stdErrReader = new BufferedReader(new InputStreamReader(process.getErrorStream()));

            // Read stdout
            String line;
            while ((line = stdOutReader.readLine()) != null) {
                output.append(line).append("\n");
            }

            // Read stderr
            while ((line = stdErrReader.readLine()) != null) {
                errorOutput.append(line).append("\n");
            }

            // Wait for the process to finish
            process.waitFor();

        } catch (Exception e) {
            log.error(e.getMessage());
        }

        String out = output.toString();
        String error = errorOutput.toString();

        if(!error.isEmpty()){
            throw new CompileException(error + "\n" +  out);
        }

    }

    private void compile(String problemId, String code, String className) throws CompileException {
        String currentDir = System.getProperty("user.dir");
        Path problemDirPath = Paths.get(currentDir, SUBMISSION_DIR, problemId);
        // Create directories if they do not exist
        try {
            Files.createDirectories(problemDirPath);
        } catch (IOException e) {
            throw new CompileException(e.getMessage());
        }

        // Write the user code to the file
        File javaFile = new File(problemDirPath + "/" +  className + ".java");
        try (FileWriter writer = new FileWriter(javaFile)) {
            writer.write(code);
        } catch (IOException e) {
            throw new CompileException(e.getMessage());
        }

        // Prepare to capture any compilation errors
        StringWriter compilationErrors = new StringWriter();
        DiagnosticCollector<JavaFileObject> diagnostics = new DiagnosticCollector<>();

        // Compile the Java file with annotation processing disabled
        JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
        StandardJavaFileManager fileManager = compiler.getStandardFileManager(null, null, null);
        Iterable<? extends JavaFileObject> compilationUnits = fileManager.getJavaFileObjects(javaFile);
        List<String> options = Arrays.asList("-proc:none", "-classpath", problemDirPath.toString());  // Disable annotation processing
        JavaCompiler.CompilationTask task = compiler.getTask(compilationErrors, fileManager, diagnostics, options, null, compilationUnits);
        boolean success = task.call();

        try {
            fileManager.close();
        } catch (IOException e) {
            throw new CompileException(e.getMessage());
        }

        // If compilation fails, capture and return error messages
        if (!success) {
            StringBuilder errorMsg = new StringBuilder();
            for (Diagnostic<? extends JavaFileObject> diagnostic : diagnostics.getDiagnostics()) {
                if (diagnostic.getSource() != null) {
                    errorMsg.append("Line ")
                            .append(diagnostic.getLineNumber())
                            .append(": error: ")
                            .append(diagnostic.getMessage(null))
                            .append("\n");
                } else {
                    errorMsg.append("Error: ")
                            .append(diagnostic.getMessage(null))
                            .append("\n");
                }

            }
            throw new CompileException(errorMsg.toString());
        }
        if (!javaFile.delete()) {
            log.warn("Failed to delete the file.");
        }
    }
}
