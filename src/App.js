import { HashRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./HomePage";
import SearchPage from "./SearchPage";
import SignPage from "./SignPage";
import TipsPage from "./Tips";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/sign" element={<SignPage />} />
        <Route path="/Tips" element={<TipsPage />} />
      </Routes>
    </Router>
  );
}

export default App;