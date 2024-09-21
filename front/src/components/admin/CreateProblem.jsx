import { useState, useEffect, useRef } from 'react';
import { createProblem, getProblemTemplateById } from '../../service/Service';
import Editor from '@monaco-editor/react'; // Assuming you are using Monaco Editor
import { useParams } from 'react-router-dom';

const CreateProblem = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: '',
    template: ''
  });

  const [error, setError] = useState(''); // State for handling errors
  const [successMessage, setSuccessMessage] = useState(''); // State for handling success messages

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const [code, setCode] = useState('');
  const { problemId } = useParams();
  const editorRef = useRef(null);

  useEffect(() => {
    if (problemId) {
      getProblemTemplateById(problemId)
        .then(response => {
          setCode(response.data);
        })
        .catch(err => {
          setError('Failed to fetch problem template.');
        });
    }
  }, [problemId]);

  const handleEditorDidMount = (editor, monaco) => {
    editorRef.current = editor;
  };

  const handleEditorChange = (value) => {
    setCode(value);
  };

  const handleResetButton = () => {
    if (editorRef.current) {
      getProblemTemplateById(problemId)
        .then(response => {
          const templateCode = response.data;
          setCode(templateCode);
          editorRef.current.setValue(templateCode);
        }).catch(err => {
          setError('Failed to fetch problem template.');
          console.error("Failed to reset code:", err);
        });
    }
  };

  const handleSubmitButton = (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');
    const createProblemRequest = {
      problem: formData,
      testClass: code
    };
    createProblem(createProblemRequest)
    .then(response => {
      console.log(response.data);
    }).catch(err => { 
      console.log(err);
    })
  };

  return (
    <div>
      <div className="flex justify-center p-3">
        <button onClick={handleSubmitButton} className="btn btn-primary">Create</button>
      </div>
      <div className='grid grid-cols-12 gap-2'>

        <div className='col-span-12 md:col-span-6 flex-1 p-2'>

          <form onSubmit={handleSubmitButton}>
            <div>
              <label htmlFor="title">Title:</label>
              <input
                type="text"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full h-8 p-2 border rounded-md"
                required
              />
            </div>

            <div>
              <label htmlFor="description">Description:</label>
              <textarea
                id="description"
                name="description"
                className="w-full h-32 p-2 border rounded-md"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

            <div>
              <label htmlFor="difficulty">Difficulty:</label>
              <select
                className="text-gray-950"
                id="difficulty"
                name="difficulty"
                value={formData.difficulty}
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
                className="w-full h-32 p-2 border rounded-md"
                id="template"
                name="template"
                value={formData.template}
                onChange={handleChange}
                required
              />
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
              value={code} // Bind the editor's value to the state
              onMount={handleEditorDidMount}
              onChange={handleEditorChange}
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
}

export default CreateProblem;
