import React, { useState, useRef } from 'react';
import { useParams } from 'react-router-dom';
import CodeEditor from './CodeEditor.jsx';
import { submitCode } from '../../service/Service.jsx';
import ProblemDescription from './ProblemDescription.jsx';

const Problem = () => {
    const [result, setResult] = useState({});
    const [error, setError] = useState(null);
    const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state
    const codeEditorRef = useRef(null);
    const { problemId } = useParams();

    const handleSubmit = async () => {
        try {
            setIsSubmitting(true); // Set loading state to true
            if (codeEditorRef.current) {
                const code = codeEditorRef.current.getEditorValue();
                const submissionData = {
                    id: problemId,
                    problemId: problemId,
                    userId: 1,
                    solution: code
                };
                const response = await submitCode(submissionData);
                setResult(response.data.messages);
            }
        } catch (err) {
            setError('Failed to submit code.');
            console.error(err);
        } finally {
            setIsSubmitting(false); // Reset loading state once request is done
        }
    };

    return (
        <div className=''>
            <div className='relative flex items-center'>
                <div className="absolute left-0 mt-2 mb-2 py-2">
                    <a href="/problem" className="flex items-center text-neutral-500 hover:text-neutral-700 font-bold">
                        <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor" className="mr-2">
                            <path d="m330-444 201 201-51 51-288-288 288-288 51 51-201 201h438v72H330Z" />
                        </svg>
                        Back to list
                    </a>
                </div>
                <div className="flex-1 flex justify-center">
                    <button
                        className='bg-neutral-800 hover:bg-neutral-700 text-green-500 font-bold py-2 px-4 rounded mt-2 mb-2'
                        onClick={handleSubmit}
                        disabled={isSubmitting} // Disable button while submitting
                    >
                        {isSubmitting ? 'Submitting...' : 'Submit'} {/* Show submitting text */}
                    </button>
                </div>
            </div>




            <div className="grid grid-cols-12 gap-2">
                <div className="col-span-12 md:col-span-6">
                    <ProblemDescription
                        problemId={problemId}
                        result={result}
                        error={error}
                    />
                </div>
                <div className="col-span-12 md:col-span-6 overflow-auto">
                    <CodeEditor
                        ref={codeEditorRef}
                        problemId={problemId}
                    />
                </div>
            </div>
        </div>
    );
};

export default Problem;
