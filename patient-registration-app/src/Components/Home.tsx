import React from "react";
import { Box, Button } from "@mui/material";
import PatientForm from "./Patientform";

const Home: React.FC = () => {
  return (
      <Box>
          {<PatientForm />}
    </Box>
  );
};

export default Home;
