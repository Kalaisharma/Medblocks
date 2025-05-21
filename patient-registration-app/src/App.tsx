import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css";
import PatientForm from "./Components/Patientform";
import { initDB } from "./Database/db";
import { useEffect } from "react";
import SqlQueryRunner from "./Components/SQLRunBox";



function App() {
  useEffect(() => {
    (async () => {
      await initDB();
      console.log("Database initialized");
    })();
  }, []);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<PatientForm />} />
        <Route path="/sqlrunner" element={<SqlQueryRunner />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
