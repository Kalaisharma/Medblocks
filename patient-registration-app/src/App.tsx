import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom"
import "./App.css";
import PatientForm from "./Components/Patientform";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientForm />} />
      </Routes>
    </Router>
  );
}

export default App;
