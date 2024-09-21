import './App.css';
import Problem from './components/problem/Problem.jsx';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainPage from './components/main/MainPage.jsx';
import CreateProblem from './components/admin/CreateProblem';
import EditProblem from './components/admin/EditProblem';
import Header from './components/main/Header.jsx';
import { useAuth } from './service/auth/useAuth';
import Logout from './components/security/Logout.jsx';
import Signup from './components/security/Signup.jsx';
import About from './components/main/About.jsx';
import Oauth2Success from './components/security/Oauth2Success';
import Login from "./components/security/Login.jsx";

function App() {
  const { isAuthenticated, loading } = useAuth();

  function makeDark() {
    document.documentElement.setAttribute('theme', 'dark');
    localStorage.setItem('java-hub-theme', 'dark');
  }
  makeDark();

  if (loading) {
    return <div>Loading...</div>; // Show a loading indicator or placeholder
  }

  const ProtectedRoute = ({ element }) =>
    isAuthenticated ? element : <Navigate to="/login" />;

  return (
    <Router>
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      
      {/* Protected Routes */}
      <Route path="/" element={<><Header /><div className='max-w-6xl mx-auto px-2'><MainPage /></div></>} />
      <Route path="/oauth2-success" element={<><div className='max-w-6xl mx-auto px-2'><Oauth2Success /></div></>} />
      <Route path="/about" element={<><Header /><div className='max-w-6xl mx-auto px-2'><About /></div></>} />
      <Route path="/problem" element={<><Header /><div className='max-w-6xl mx-auto px-2'><ProtectedRoute element={<MainPage />} /></div></>} />
      <Route path="/admin/problem" element={<><Header /><div className='max-w-6xl mx-auto px-2'><ProtectedRoute element={<CreateProblem />} /></div></>} />
      <Route path="/admin/problem/:problemId" element={<><Header /><div className='max-w-6xl mx-auto px-2'><ProtectedRoute element={<EditProblem />} /></div></>} />
      <Route path="/problem/:problemId" element={<><Header /><div className='max-w-6xl mx-auto px-2'><ProtectedRoute element={<Problem />} /></div></>} />
      <Route path="/logout" element={<><Header /><div className='max-w-6xl mx-auto px-2'><ProtectedRoute element={<Logout />} /></div></>} />
      
      {/* Redirect for unmatched routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  </Router>
  );
}

export default App;
