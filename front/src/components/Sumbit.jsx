import React, { useEffect, useState, useRef} from 'react';
import { submitCode, getProblemTemplateById } from '../service/Service';
import { Editor } from '@monaco-editor/react';


const Submit = ({ problemId }) => {
    const [code, setCode] = useState(''); // Use code state for textarea value
    const [result, setResult] = useState(null);
    const [error, setError] = useState(null);
    const editorRef = useRef(null);
    // Fetch the problem template when the component mounts or problemId changes
    useEffect(() => {
        if (problemId) {
            getProblemTemplateById(problemId)
                .then(response => {
                    setCode(response.data); // Set the template directly to the code state
                })
                .catch(err => {
                    setError('Failed to fetch problem template.');
                });
        }
    }, [problemId]);

    // Handle code submission
    const handleSubmit = async () => {
        try {
            const submissionData = {
                problemId: problemId, // Use the actual problemId passed as prop
                userId: 1,
                code: getEditorValue()
            };
            console.log("code" + submissionData.code);
            const response = await submitCode(submissionData);
            // Convert response to HTML format
            const formattedMessage = response.data.replace(/\n/g, '<br>');
            setResult(formattedMessage); // Adjust according to your API response structure
        } catch (err) {
            setError('Failed to submit code.');
        }
    };

    function handleEditorDidMount(editor, monaco){
        editorRef.current = editor;
    }

    function getEditorValue(){
        return editorRef.current.getValue();
    }

    return (
        <div>
            <h2>Submit Code</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {result && (
                <div >
                    <h3>Submission Result:</h3>
                    <div dangerouslySetInnerHTML={{ __html: result }} />
                </div>
            )}
            <button onClick={handleSubmit}>Sumbit</button>
            <Editor 
                height="100vh"
                width="100%"
                theme="vs-dark"
                defaultLanguage="java"
                defaultValue={code}
                onMount={handleEditorDidMount}
            />
        </div>
    );
};

export default Submit;
