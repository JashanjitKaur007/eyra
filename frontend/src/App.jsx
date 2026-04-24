

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import History from './pages/History';
import Profile from './pages/Profile';
import FaceAnalysis from './pages/FaceAnalysis';
import About from './pages/About';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import DebugPanel from './components/DebugPanel';
import './utils/i18n';

// import tests - 
import DepressionTest from "./pages/tests/DepressionTest";
import AddictionTest from "./pages/tests/AddictionTest";
import ADHDTest from "./pages/tests/ADHDTest";
import AnxietyTest from "./pages/tests/AnxietyTest";
import EatingDisorderTest from "./pages/tests/EatingDisorderTest";
import OCDTest from "./pages/tests/OCDTest";
import PsychosisTest from "./pages/tests/PsychosisTest";
import SocialAnxietyTest from "./pages/tests/SocialAnxietyTest";
import YouthTest from "./pages/tests/YouthTest";


const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { user } = useAuth();
  return user ? <Navigate to="/about" /> : children;
};

function AppContent() {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex flex-col">
      {/* Navbar - Show everywhere EXCEPT on /home */}
      {user && (
        <Routes>
          <Route path="/home" element={null} />
          <Route path="*" element={<Navbar />} />
        </Routes>
      )}

      <main className="flex-grow">
        <Routes>
          <Route 
            path="/login" 
            element={
              <PublicRoute>
                <Login />
              </PublicRoute>
            } 
          />
          <Route 
            path="/register" 
            element={
              <PublicRoute>
                <Register />
              </PublicRoute>
            } 
          />
          <Route 
            path="/home" 
            element={
              <ProtectedRoute>
                <Home />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/history" 
            element={
              <ProtectedRoute>
                <History />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/profile" 
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } 
          />

<Route path="/tests/depression" element={<DepressionTest />} />
<Route path="/tests/addiction" element={<AddictionTest />} />
<Route path="/tests/adhd" element={<ADHDTest />} />
<Route path="/tests/anxiety" element={<AnxietyTest />} />
<Route path="/tests/eating-disorder" element={<EatingDisorderTest />} />
<Route path="/tests/ocd" element={<OCDTest />} />
<Route path="/tests/psychosis" element={<PsychosisTest />} />
<Route path="/tests/social-anxiety" element={<SocialAnxietyTest />} />
<Route path="/tests/youth" element={<YouthTest />} />

          <Route 
            path="/face-analysis" 
            element={
              <ProtectedRoute>
                <FaceAnalysis />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/about" 
            element={<About />} 
          />
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </main>

      {/* Footer - Show everywhere EXCEPT on /home */}
      {user && (
        <Routes>
          <Route path="/home" element={null} />
          <Route path="*" element={<Footer />} />
        </Routes>
      )}

      <DebugPanel />
    </div>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <AppContent />
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;