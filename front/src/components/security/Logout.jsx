import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { clearToken } from '../../service/auth/Auth.jsx';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("a")
    clearToken();
    
   
    const timer = setTimeout(() => {
      navigate('/'); 
    }, 100); 

    return () => clearTimeout(timer);
  });

  return null; 
};

export default Logout;
