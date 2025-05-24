import React from "react";
import { Box } from "@mui/material";
import PatientForm from "./Patientform";

const Home: React.FC = () => {
  return (
    <Box sx={{ padding: 0, maxWidth: 600, margin: 0 }}>
          {<PatientForm />}
    </Box>
  );
};

export default Home;
