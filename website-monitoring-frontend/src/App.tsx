import React from 'react';
import './App.css';
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import HeroSection from './components/Hero';
import CreateMonitor from './components/CreateMonitor';
import HeroPart from './components/HeroPart';
import FloatingCursor from './components/FloatingCursor';

function App() {
  return (
    <div className="App">
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<HeroPart />} />
          <Route path="/create" element={<CreateMonitor />} />
          <Route path="/main" element={<HeroSection />} />
        </Routes>
      </Router>
      <FloatingCursor />
    </div>
  );
}

export default App;
