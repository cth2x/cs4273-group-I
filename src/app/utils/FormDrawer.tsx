import React, { useState } from "react";
import {
  Drawer,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface FormDrawerProps {
  open: boolean;
  onClose: () => void;
}

const FormDrawer: React.FC<FormDrawerProps> = ({ open, onClose }) => {
  const [formData, setFormData] = useState({
    case_id: "",
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    race: "",
    height: "",
    weight: "",
    missing_date: "",
    missing_location: "",
    circumstances: "",
    contact_info: "",
    eye_color: "",
    hair_color: "",
    classification: "",
    date_modified: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/addPerson', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const text = await response.text(); // fallback for HTML error pages
        throw new Error(`Server error: ${text}`);
      }

      const result = await response.json();
      console.log('Server response:', result);

      if (result.success) {
        // maybe show a success message or refresh table
      }

      onClose();
    } catch (err) {
      console.error('Error submitting form:', err);
    }
  };

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: "100%", sm: "30%" }, height: "100vh", p: 2 },
      }}
    >
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        className="bg-blue-30 pl-4"
      >
        <Typography
          textAlign="center"
          variant="h6"
          fontWeight={"bold"}
          className="text-center"
        >
          Add Person
        </Typography>
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </Box>
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 2,
          overflowY: "auto",
          maxHeight: "90vh",
          p: 1,
        }}
      >
        <TextField
          label="Case ID"
          name="case_id"
          variant="outlined"
          fullWidth
          value={formData.case_id}
          onChange={handleChange}
        />
        <TextField
          label="First Name"
          name="first_name"
          variant="outlined"
          fullWidth
          value={formData.first_name}
          onChange={handleChange}
        />
        <TextField
          label="Last Name"
          name="last_name"
          variant="outlined"
          fullWidth
          value={formData.last_name}
          onChange={handleChange}
        />
        <TextField
          label="Age"
          name="age"
          variant="outlined"
          fullWidth
          value={formData.age}
          onChange={handleChange}
        />
        <TextField
          label="Gender"
          name="gender"
          variant="outlined"
          fullWidth
          value={formData.gender}
          onChange={handleChange}
        />
        <TextField
          label="Race"
          name="race"
          variant="outlined"
          fullWidth
          value={formData.race}
          onChange={handleChange}
        />
        <TextField
          label="Height"
          name="height"
          variant="outlined"
          fullWidth
          value={formData.height}
          onChange={handleChange}
        />
        <TextField
          label="Weight"
          name="weight"
          variant="outlined"
          fullWidth
          value={formData.weight}
          onChange={handleChange}
        />
        <TextField
          label="Missing Date"
          name="missing_date"
          variant="outlined"
          fullWidth
          value={formData.missing_date}
          onChange={handleChange}
        />
        <TextField
          label="Missing Location"
          name="missing_location"
          variant="outlined"
          fullWidth
          value={formData.missing_location}
          onChange={handleChange}
        />
        <TextField
          label="Circumstances"
          name="circumstances"
          variant="outlined"
          fullWidth
          value={formData.circumstances}
          onChange={handleChange}
        />
        <TextField
          label="Contact Info"
          name="contact_info"
          variant="outlined"
          fullWidth
          value={formData.contact_info}
          onChange={handleChange}
        />
        <TextField
          label="Eye Color"
          name="eye_color"
          variant="outlined"
          fullWidth
          value={formData.eye_color}
          onChange={handleChange}
        />
        <TextField
          label="Hair Color"
          name="hair_color"
          variant="outlined"
          fullWidth
          value={formData.hair_color}
          onChange={handleChange}
        />
        <TextField
          label="Date Modified"
          name="date_modified"
          variant="outlined"
          fullWidth
          value={formData.date_modified}
          onChange={handleChange}
        />
        <TextField
          label="Classification"
          name="classification"
          variant="outlined"
          fullWidth
          value={formData.classification}
          onChange={handleChange}
        />
        <Button variant="contained" type="submit">
          Submit
        </Button>
      </Box>
    </Drawer>
  );
};

export default FormDrawer;
