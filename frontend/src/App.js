
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Index from "./pages/Admin";

import './style.scss';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Index />}>
        </Route>
      </Routes>
    </Router>
  );
}



export default App;