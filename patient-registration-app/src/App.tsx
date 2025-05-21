import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import "./App.css";
import PatientForm from "./Components/Patientform";
import { initDB } from "./Database/db";
import { useEffect } from "react";



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
      </Routes>
    </Router>
  );
}

export default App;
