import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { getAllProblems, getProblemSolvedProblemByUser } from '../../service/Service.jsx';
import { getToken } from '../../service/auth/Auth.jsx';

const ProblemsList = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Parse URL parameters
  const queryParams = new URLSearchParams(location.search);
  const initialPage = parseInt(queryParams.get('page')) || 0;
  const initialSize = parseInt(queryParams.get('size')) || 10;

  const [problems, setProblems] = useState([]);
  const [solvedSet, setSolvedSet] = useState(new Set());
  const [page, setPage] = useState(initialPage);
  const [size, setSize] = useState(initialSize);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProblems = async () => {
      try {
        setLoading(true);
        const response = await getAllProblems(page, size);
        setProblems(response.data._embedded ? response.data._embedded.problemTitleDtoList : []);
        setTotalPages(response.data.page.totalPages);
      } catch (error) {
        setError(error);
        console.error('There was a problem fetching the problems:', error);
      } finally {
        setLoading(false);
      }
      const token = getToken();
      if(token){
        getProblemSolvedProblemByUser().then(response => {
          setSolvedSet(new Set(response.data));
        }).catch(err => {
          console.log(err);
        })
      }
      

    };

    fetchProblems();
  }, [page, size]);


  useEffect(() => {
    // Update URL parameters
    navigate(`?page=${page}&size=${size}`, { replace: true });
  }, [page, size, navigate]);

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

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-6 max-w-2xl mx-auto">
      <h1 className="text-2xl  mb-4 text-center text-neutral-300">Problems List</h1>
      <table className="w-full border-collapse">
        <thead className="border-b text-base text-neutral-500 border-neutral-700">
          <tr className='text-sm'>
            <th className="p-3 font-normal text-left">Status</th>
            <th className="p-3 font-normal text-left">Title</th>
            <th className="p-3 font-normal text-left">Acceptance</th>
            <th className="p-3 font-normal text-left">Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {problems.map(problem => (
            <tr key={problem.id} className="alternate-bg">
              <td className="p-[10px]">
                <div className='flex items-center justify-left text-sm text-green-600'>
                  {solvedSet && solvedSet.has(problem.id) && (
                    <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="currentColor">
                      <path d="m429-336 238-237-51-51-187 186-85-84-51 51 136 135Zm51 240q-79 0-149-30t-122.5-82.5Q156-261 126-331T96-480q0-80 30-149.5t82.5-122Q261-804 331-834t149-30q80 0 149.5 30t122 82.5Q804-699 834-629.5T864-480q0 79-30 149t-82.5 122.5Q699-156 629.5-126T480-96Zm0-72q130 0 221-91t91-221q0-130-91-221t-221-91q-130 0-221 91t-91 221q0 130 91 221t221 91Zm0-312Z" />
                    </svg>
                  )}
                </div>
              </td>

              <td className="p-[10px]">
                <a
                  href={`/problem/${problem.id}`}
                  className="block text-white font-thin hover:text-blue-500 "
                >
                  {problem.title}
                </a>
              </td>
              <td className="p-[10px]">
                <p className={`text-sm inline-block`}>
                  {problem.submitted !== 0 ? (problem.accepted / problem.submitted * 100).toFixed(1) + ' %' : '0.0 %'}
                </p>
              </td>

              <td className="p-[10px]">
                <p className={`text-sm inline-block ${getDifficultyColor(problem.difficulty)}`}>
                  {problem.difficulty}
                </p>
              </td>
            </tr>
          ))}
        </tbody>
      </table>



      {/* Pagination Controls */}
      <div className="flex justify-center mt-4 space-x-4">
        <button
          className="px-2 py-1 bg-neutral-800 text-white rounded disabled:opacity-50"
          disabled={page === 0}
          onClick={() => setPage(page - 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M576-240 336-480l240-240 51 51-189 189 189 189-51 51Z" /></svg>
        </button>
        <button
          className="px-2 py-1 bg-neutral-800 text-white rounded disabled:opacity-50"
          disabled={page === totalPages - 1}
          onClick={() => setPage(page + 1)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" height="20px" viewBox="0 -960 960 960" width="20px" fill="#e8eaed"><path d="M522-480 333-669l51-51 240 240-240 240-51-51 189-189Z" /></svg>
        </button>
      </div>
    </div>
  );
};

export default ProblemsList;
