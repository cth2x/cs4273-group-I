import React, { useEffect, useState } from "react";
import {
  Drawer,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { fetchMissingPersonById } from "./fetch";

interface MissingPerson {
  case_id: string;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  race: string;
  height: string;
  weight: string;
  missing_date: string;
  missing_location: string;
  circumstances: string;
  contact_info: string;
  eye_color: string;
  hair_color: string;
  classification: string;
  date_modified: string;
}
interface FormDrawerProps {
  open: boolean;
  onClose: () => void;
  initialData?: MissingPerson | null;
}

const defaultFormData: MissingPerson = {
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
};

const FormDrawer: React.FC<FormDrawerProps> = ({ open, onClose, initialData }) => {
  const [formData, setFormData] = useState<MissingPerson>(defaultFormData);

  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    } 
    else {
      console.log("No data to fill");
    }
  }, [initialData, open]);
  
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    try {
      const existingPerson = await fetchMissingPersonById(formData.case_id);
  
      if (existingPerson != null) {
        const deleteResponse = await fetch('/api/deletePerson', {
          method: 'DELETE',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ case_id: formData.case_id }),
        });
  
        if (!deleteResponse.ok) {
          throw new Error("Error deleting existing person");
        }
      }
  
      // After deleting (or if no existing person), add the new person
      const addResponse = await fetch("/api/addPerson", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      //Success msg/form close
      if (addResponse.ok) {
        alert("Persons data submitted!");
        onClose();
      } else {
        alert("Failed to submit data");
      }
    } catch (err) {
      console.error("Error in form submission:", err);
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
