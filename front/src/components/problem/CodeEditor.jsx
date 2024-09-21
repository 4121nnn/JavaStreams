import { useEffect, useState, useRef, forwardRef, useImperativeHandle } from 'react';
import { getProblemTemplateById } from '../../service/Service';
import { Editor } from '@monaco-editor/react';

// eslint-disable-next-line react/display-name
const CodeEditor = forwardRef((  {problemId}, ref) => {
    const [solution, setSolution] = useState('');
    const editorRef = useRef(null);
    const [error, setError] = useState(null);

    // Retrieve saved content from local storage or problem template when component mounts
    useEffect(() => {
        if (problemId) {
            const savedCode = localStorage.getItem(problemId);
            if (savedCode && savedCode.length > 0) {
                setSolution(savedCode);
            } else {
                // Fetch the problem template if there's no saved content
                getProblemTemplateById(problemId)
                    .then(response => {
                        setSolution(response.data); // Set the template directly to the code state
                    })
                    .catch(err => {
                        setError('Failed to fetch problem template.' + err);
                    });
            }
        }
    }, [problemId]);

    useImperativeHandle(ref, () => ({
        getEditorValue: () => {
            return editorRef.current ? editorRef.current.getValue() : '';
        }
    }));

    function handleEditorDidMount(editor) {
        editorRef.current = editor;
    }

    // Save editor content to local storage whenever it changes
    const handleEditorChange = (value) => {
        setSolution(value);
        localStorage.setItem(problemId, value);
    };

    const handleResetButton = () => {
        if (editorRef.current) {
            getProblemTemplateById(problemId)
                .then(response => {
                    const templateCode = response.data;
                    setSolution(templateCode); // Update the state
                    localStorage.setItem(problemId, templateCode); // Save directly to localStorage
                    editorRef.current.setValue(templateCode); // Set the editor value directly
                })
                .catch(err => {
                    setError('Failed to fetch problem template.');
                    console.error("Failed to reset code:", err);
                });
        }
    };

    return (
        <div className='card rounded-lg border border-zinc-800 overflow-hidden'>
            <div className='flex items-center card-header rounded-t-lg font-bold m-0 p-1 pl-3'>
                <p className='text-neutral-400'>#Code</p>
                <button onClick={handleResetButton} className='hover:text-blue-400 ml-auto pr-3'>Reset</button>
            </div>
            <div className='rounded-b-lg'>
                <Editor
                    className='rounded-lg'
                    height="calc(100vh - 190px)"
                    width="100%"
                    theme="vs-dark"
                    defaultLanguage="java"
                    value={solution} // Bind the editor's value to the state
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
    );
});

export default CodeEditor;
