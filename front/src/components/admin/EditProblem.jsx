import { useState, useEffect, useRef } from 'react';
import { editProblem, getProblemById, getProblemTemplateById } from '../../service/Service';
import Editor from '@monaco-editor/react'; // Assuming you are using Monaco Editor
import { useParams } from 'react-router-dom';

const EditProblem = () => {
  const [formData, setFormData] = useState({
    id: '',
    title: '',
    description: '',
    difficulty: '',
    template: '',
    hint: '',
    testClass: '',
    e1_id: '',
    e1_testInput: '',
    e1_testOutput: '',
    e1_explanation: '',
    e2_id: '',
    e2_testInput: '',
    e2_testOutput: '',
    e2_explanation: ''
  });

  const editorRef = useRef(null);
  const { problemId } = useParams();
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  useEffect(() => {
    if (problemId) {
      const fecthProblem = async () => {
        getProblemById(problemId)
          .then(response => {
            const data = response.data;
            setFormData({
              id: data.id,
              title: data.title,
              description: data.description,
              difficulty: data.difficulty,
              template: data.template,
              hint : data.hint,
              e1_id: data.exampleList[0].id,
              e1_testInput: data.exampleList[0].testInput,
              e1_testOutput: data.exampleList[0].testOutput,
              e1_explanation: data.exampleList[0].explanation,
              e2_id: data.exampleList[1].id,
              e2_testInput: data.exampleList[1].testInput,
              e2_testOutput: data.exampleList[1].testOutput,
              e2_explanation: data.exampleList[1].explanation,
            });
            console.log(data);
          }).catch(err => {
            setError('Failed to fetch problem.');
          });
      }
      fecthProblem();
    }
  }, [problemId]);


  const handleResetButton = () => {
    if (editorRef.current) {
      getProblemTemplateById(problemId)
        .then(response => {
          const templateCode = response.data;
          setFormData(prevFormData => ({
            ...prevFormData,
            template: templateCode
          }));

        })
        .catch(err => {
          setError('Failed to fetch problem template.');
        });
    }
  };

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor; // Store editor instance in ref
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    const code = editorRef.current.getValue();
    const examples = [
      {
        id: formData.e1_id,
        testInput: formData.e1_testInput,
        testOutput: formData.e1_testOutput,
        explanation: formData.e1_explanation,
        problemId: formData.id
      },
      {
        id: formData.e2_id,
        testInput: formData.e2_testInput,
        testOutput: formData.e2_testOutput,
        explanation: formData.e2_explanation,
        problemId: formData.id
      }
    ]
    const problem = {
      id: formData.id,
      title: formData.title,
      description: formData.description,
      difficulty: formData.difficulty,
      template: formData.template,
      hint: formData.hint,
      exampleList: examples
    }
    const editProblemRequest = {
      problem: problem,
      testClass: code
    };
    editProblem(editProblemRequest)
      .then(response => {
        console.log(response.data);
        setSuccessMessage('Problem saved successfully.' + response.data);
      })
      .catch(err => {
        setError('Failed to save problem.' + err);
      });
  };

  return (
    <div className='text-neutral-200'>
      <div className="flex justify-center p-3">
        <button onClick={handleSubmitButton} className="border px-2 py-1 rounded-md">Save</button>
      </div>
      <div className='grid grid-cols-12 gap-2'>
        <div className='col-span-12 md:col-span-6 flex-1 p-2'>
          <form onSubmit={handleSubmitButton}>
            <div>
              <input
                type="hidden"
                id="id"
                name="id"
                value={formData.id}
                onChange={handleChange}
                className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                required
              />
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title || ""}
                onChange={handleChange}
                className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                required
              />
            </div>
            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                className="w-full h-32 p-2 border rounded-md bg-neutral-900"
                value={formData.description || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                className="bg-neutral-900"
                id="difficulty"
                name="difficulty"
                value={formData.difficulty || ""}
                onChange={handleChange}
                required
              >
                <option value="">Select Difficulty</option>
                <option value="Easy">Easy</option>
                <option value="Medium">Medium</option>
                <option value="Hard">Hard</option>
              </select>
            </div>
            <div>
              <label htmlFor="template">Template:</label>
              <textarea
                className="w-full h-32 p-2 border rounded-md bg-neutral-900"
                id="template"
                name="template"
                value={formData.template || ""}
                onChange={handleChange}
                required
              />
            </div>
            <div>
              <label htmlFor="hint">Hint:</label>
              <input
                type="text"
                id="hint"
                name="hint"
                value={formData.hint || ""}
                onChange={handleChange}
                className="w-full h-8 p-2 border rounded-md bg-neutral-900"
              />
            </div>
            <div>
              <div>
                <p>Exmaple 1: </p>
                <label htmlFor="e1_id">Input:</label>
                <input
                  type="hidden"
                  id="e1_id"
                  name="e1_id"
                  value={formData.e1_id}
                  onChange={handleChange}
                  className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                  required
                />
                <input
                  type="text"
                  id="e1_testInput"
                  name="e1_testInput"
                  value={formData.e1_testInput}
                  onChange={handleChange}
                  className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                  required
                />
                <label htmlFor="e1_testOutput">Output:</label>
                <input
                  type="text"
                  id="e1_testOutput"
                  name="e1_testOutput"
                  value={formData.e1_testOutput}
                  onChange={handleChange}
                  className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                  required
                />
                <label htmlFor="e1_explanation">Explanation:</label>
                <input
                  type="text"
                  id="e1_explanation"
                  name="e1_explanation"
                  value={formData.e1_explanation || ""}
                  onChange={handleChange}
                  className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                  required
                />
              </div>
              <div>
                <p>Exmaple 2: </p>
                <input
                  type="hidden"
                  id="e2_id"
                  name="e2_id"
                  value={formData.e2_id}
                  onChange={handleChange}
                  className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                  required
                />
                <label htmlFor="e2_testInput">Input:</label>
                <input
                  type="text"
                  id="e2_testInput"
                  name="e2_testInput"
                  value={formData.e2_testInput}
                  onChange={handleChange}
                  className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                  required
                />
                <label htmlFor="e2_testOutput">Output:</label>
                <input
                  type="text"
                  id="e2_testOutput"
                  name="e2_testOutput"
                  value={formData.e2_testOutput}
                  onChange={handleChange}
                  className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                  required
                />
                <label htmlFor="e2_explanation">Explanation:</label>
                <input
                  type="text"
                  id="e2_explanation"
                  name="e2_explanation"
                  value={formData.e2_explanation || ""}
                  onChange={handleChange}
                  className="w-full h-8 p-2 border rounded-md bg-neutral-900"
                  required
                />
              </div>
              
            </div>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
          </form>
        </div>
        <div className='col-span-12 md:col-span-6 card rounded-lg border border-zinc-800 overflow-hidden'>
          <div className='flex items-center card-header rounded-t-lg font-bold m-0 p-1 pl-3'>
            <p>#Code</p>
            <button onClick={handleResetButton} className='ml-auto pr-3'>Reset</button>
          </div>
          <div className='rounded-b-lg'>
            <Editor
              className='rounded-lg'
              height="calc(100vh - 95px)"
              width="100%"
              theme="vs-dark"
              defaultLanguage="java"
              value= ""  // Bind editor value to state
              onMount={handleEditorDidMount}
              options={{
                minimap: { enabled: false },
                scrollBeyondLastLine: false,
                lineNumbersMinChars: 3,
              }}
            />
          </div>
          {error && <div className="error p-2 text-red-500">{error}</div>}
        </div>
      </div>
    </div>
  );
};

export default EditProblem;
