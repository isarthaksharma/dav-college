import { createRoot } from 'react-dom/client';
// Add this import at the top of your file
import About from './pages/About'; // or correct path to your About component
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import App from './App.tsx';  // Rename this import if it conflicts with your component
import Home from './pages/Home';  // New (points to `src/pages/Home.tsx`)    // Import your Home component
import './index.css';

// Rename your router component to avoid conflict with `App.tsx`
function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About/>} />
      </Routes>
    </Router>
  );
}

createRoot(document.getElementById("root")!).render(<AppRouter />);