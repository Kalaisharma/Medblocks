import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css";
import PatientForm from "./Components/Patientform";
import SqlQueryRunner from "./Components/SQLRunBox";
import Home from "./Components/Home";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/patient" element={<PatientForm />} />
        <Route path="/sqlrunner" element={<SqlQueryRunner />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
