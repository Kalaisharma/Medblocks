import React, { useState } from "react";
import db from "../Database/db";
import type { Patient } from "../Interface/interface";
import {
  Box,
  Button,
  MenuItem,
  TextField,
  Typography,
  Paper,
} from "@mui/material";

const initialFormState: Omit<Patient, "id" | "createdAt"> = {
  name: "",
  age: 0,
  gender: "",
  address: "",
  contact: "",
  email: "",
};

const PatientForm: React.FC = () => {
  const [formData, setFormData] = useState(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!/^[A-Za-z\s]+$/.test(formData.name.trim())) {
      // Regex allows only uppercase/lowercase letters and spaces
      newErrors.name = "Name should contain only letters and spaces";
    }        

    if (!formData.age || formData.age <= 0 || formData.age > 120)
      newErrors.age = "Age must be between 1 and 120";

    if (!formData.gender) newErrors.gender = "Gender is required";

    if (!formData.address.trim()) newErrors.address = "Address is required";

    if (!formData.contact.trim())
      newErrors.contact = "Contact number is required";
    else if (!/^\+?[0-9\s\-]{7,15}$/.test(formData.contact))
      newErrors.contact = "Invalid contact number";

    if (!formData.email.trim()) newErrors.email = "Email is required";
    else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))
      newErrors.email = "Invalid email address";

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "age" ? Number(value) : value,
    });
    // Clear error on change
    if (errors[name]) setErrors({ ...errors, [name]: "" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) return;

    try {
      const { name, age, gender, address, contact, email } = formData;

      await db.exec(`
        INSERT INTO patients (name, age, gender, address, contact, email, createdAt)
        VALUES (
          '${name.replace(/'/g, "''")}', 
          ${age}, 
          '${gender}', 
          '${address.replace(/'/g, "''")}', 
          '${contact}', 
          '${email}', 
          '${new Date().toISOString()}'
        )
      `);

      setFormData(initialFormState);
      alert("Patient registered successfully!");
    } catch (error) {
      console.log("DB error:", error);
      alert("Failed to register patient. Please try again.");
    }
  };
  

  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "#f5f5f5",
        p: 2,
      }}
    >
      <Paper
        elevation={4}
        sx={{
          width: "100%",
          maxWidth: 600,
          p: 4,
          boxSizing: "border-box",
          borderRadius: 2,
        }}
      >
        <Typography variant="h4" gutterBottom align="center">
          Register New Patient
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          display="flex"
          flexDirection="column"
          gap={3}
        >
          <TextField
            label="Full Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name}
            fullWidth
            required
            autoComplete={"disable-autofill"}
          />
          <TextField
            label="Age"
            name="age"
            type="number"
            value={formData.age || ""}
            onChange={handleChange}
            error={!!errors.age}
            helperText={errors.age}
            inputProps={{ min: 1, max: 120 }}
            fullWidth
            required
            autoComplete={"disable-autofill"}
          />
          <TextField
            select
            label="Gender"
            name="gender"
            value={formData.gender}
            onChange={handleChange}
            error={!!errors.gender}
            helperText={errors.gender}
            fullWidth
            required
            autoComplete="off"
          >
            <MenuItem value="">Select Gender</MenuItem>
            <MenuItem value="Male">Male</MenuItem>
            <MenuItem value="Female">Female</MenuItem>
            <MenuItem value="Other">Other</MenuItem>
          </TextField>
          <TextField
            label="Address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            error={!!errors.address}
            helperText={errors.address}
            fullWidth
            multiline
            minRows={2}
            required
            autoComplete={"disable-autofill"}
          />
          <TextField
            label="Contact Number"
            name="contact"
            value={formData.contact}
            onChange={handleChange}
            error={!!errors.contact}
            helperText={errors.contact}
            fullWidth
            required
            autoComplete={"disable-autofill"}
          />
          <TextField
            label="Email Address"
            name="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
            type="email"
            fullWidth
            required
            autoComplete={"disable-autofill"}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            size="large"
          >
            Register
          </Button>
        </Box>
      </Paper>
    </Box>
  );
};

export default PatientForm;
