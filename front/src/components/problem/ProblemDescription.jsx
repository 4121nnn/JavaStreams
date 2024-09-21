import React, { useState, useEffect } from 'react';
import { getProblemById } from '../../service/Service';

const ProblemDescription = ({ problemId, result, error }) => {
    const [problem, setProblem] = useState(null);
    const [fetchError, setFetchError] = useState(null);

    // const textColor = resultStatus === 'ERROR'
    //     ? 'text-red-600'
    //     : resultStatus === 'WARN'
    //         ? 'text-yellow-500'
    //         : resultStatus === 'SUCCESS'
    //             ? 'text-green-500'
    //             : 'text-gray-500';

    const getDifficultyColor = (difficulty) => {
        switch (difficulty) {
            case 'Easy':
                return 'text-green-600';
            case 'Medium':
                return 'text-yellow-500';
            case 'Hard':
                return 'text-red-500';
            default:
                return 'text-gray-600'; // fallback color
        }
    };

    const textColor = (status) => {
        switch (status) {
            case 'ERROR':
                return 'text-red-600';
            case 'WARN':
                return 'text-yellow-500';
            case 'SUCCESS':
                return 'text-green-500';
            default:
                return 'text-gray-600'; // fallback color
        }
    };

    useEffect(() => {
        if (problemId) {
            let isMounted = true;
            getProblemById(problemId)
                .then(response => {
                    if (isMounted) {
                        setProblem(response.data);
                    }
                })
                .catch(err => {
                    if (isMounted) {
                        setFetchError('Failed to fetch problem description.');
                    }
                });

            return () => {
                isMounted = false;
            };
        }
    }, [problemId]);

    if (!problem) {
        return <div>Loading...</div>;
    }

    return (
        <div className='card rounded-lg border border-zinc-800 overflow-hidden relative'>
            <div>
                <p className='card-header text-neutral-400 rounded-t-lg font-bold m-0 p-1 pl-3'>Description</p>
            </div>
            <div className='card-body p-4 relative'>
                <h2 className='text-2xl font-bold mb-2'>{problem.title || 'No title'}</h2>
                <p className={`text-xs inline-block font-bold ${getDifficultyColor(problem.difficulty)} bg-zinc-700 pl-2 pr-2 pt-1 pb-1 rounded-2xl`}>
                    {problem.difficulty || 'No difficulty'}
                </p>
                <br />
                <br />
                <p className='text-s' style={{ whiteSpace: 'pre-wrap' }}>
                    {problem.description || 'No description'}
                </p>
                <br />
                {problem.exampleList.map(example => (
                    <div className='mb-4' key={example.id}>
                        <p className='mb-2  font-bold text-sm'>Example :</p>
                        <div className='border-l-2 pl-4 border-neutral-700'>
                            <p><span className='font-bold mr-2'>Input:</span><span className='text-neutral-400 font-mono'> {example.testInput}</span></p>
                            <p><span className='font-bold mr-2'>Output:  </span><span className='text-neutral-400 font-mono'> {example.testOutput}</span></p>
                        </div>
                    </div>
                ))}
                {/* Display error messages */}
                {fetchError && <div className="error text-red-700 mt-2">{fetchError}</div>}

                {/* Display result messages */}
                {result && Object.entries(result).map(([key, value]) => (
                    <div key={key}  className='mt-3'>
                        <hr className='border-neutral-800 border-2' />
                        <div className={`result ${textColor(key)} mt-2`} dangerouslySetInnerHTML={{ __html: value.replace(/\n/g, '<br>') }} />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProblemDescription;
