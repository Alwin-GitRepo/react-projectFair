import { Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Home from './pages/Home';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import PageNotFound from './pages/PageNotFound';
import Auth from './components/Auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <div className="App">
          <Routes>
              <Route path='/' element={<Home/>} />
              <Route path='login' element={<Auth />} />
              <Route path='register' element={<Auth register />} />
              <Route path='dashboard' element={<Dashboard/>} />
              <Route path='projects' element={<Projects/>} />
              <Route path='*' element={<PageNotFound/>} />
          </Routes>
          <ToastContainer/>
    </div>
  );
}

export default App;
