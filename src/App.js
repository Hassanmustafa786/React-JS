import './App.css';
import Navbar from './components/Navbar';
import TextForm from './components/TextForm';
import About from './components/About';
import NotFound from './components/pageNotFound';
import Alert from './components/Alert';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation
} from "react-router-dom";
import React, { useState, useEffect } from 'react';

function AppContent() {
  const [mode, setMode] = useState(() => {
    return localStorage.getItem("mode") || "l";
  });

  const [alert, setAlert] = useState(null);
  const [active, setActive] = useState('home');
  const location = useLocation();

  // Update active state based on current route
  useEffect(() => {
    if (location.pathname === '/') {
      setActive('home');
    } else if (location.pathname === '/about') {
      setActive('about');
    }
  }, [location.pathname]);

  useEffect(() => {
    localStorage.setItem("mode", mode);
  }, [mode]);

  const showAlert = (message, type) => {
    setAlert({
      msg: message,
      type: type
    });
    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  const toggleMode = (color) => {
    if (mode === 'light') {
      setMode('dark');
      document.body.style.backgroundColor = '#042743';
      // showAlert("Dark mode has been enabled", "success");
    }
    else {
      setMode('light');
      document.body.style.backgroundColor = 'white';
      // showAlert("Light mode has been enabled", "success");
    }
  }

  const handleActive = (page) => {
    setActive(page);
  }


  return (
    <>
      <Navbar title="TextUtils" HomeText="Home" aboutText="About" 
      mode={mode} toggleMode={toggleMode} modeText="Dark Mode" 
      showAlert={showAlert} 
      active={active} handleActive={handleActive}/>

      <Alert alert={alert} />
      <div className="container my-3">
        <Routes>
          <Route path="/" element={<TextForm heading="Enter the text to analyze" placeholder="Enter the text to analyze" mode={mode} showAlert={showAlert}/>} />
          <Route path="/about" element={<About mode={mode} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
