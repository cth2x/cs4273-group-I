import React, { useState, useEffect } from "react";
import {
  Drawer,
  Button,
  TextField,
  Box,
  IconButton,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { MissingPerson } from "@/table/page";

interface FormDrawerProps {
  open: boolean;
  onClose: () => void;
  initialData?: MissingPerson;
}

const FormDrawer: React.FC<FormDrawerProps> = ({
  open,
  onClose,
  initialData = {} as MissingPerson,
}) => {
  const [formData, setFormData] = useState({
    case_id: "",
    first_name: "",
    last_name: "",
    age: "",
    gender: "",
    race: "",
    missing_date: "",
    city: "",
    county: "",
    // state: "",
    date_modified: "",
    // tribe_status: "",
    // tribe_name: "",
    classification: "",
  });

  useEffect(() => {
    if (JSON.stringify(formData) !== JSON.stringify(initialData)) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Submitted Data:", formData);
    onClose();
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
          {initialData.first_name ? "Edit Person" : "Add Person"}
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
          label="Missing Date"
          name="missing_date"
          variant="outlined"
          fullWidth
          value={formData.missing_date}
          onChange={handleChange}
        />
        <TextField
          label="City"
          name="city"
          variant="outlined"
          fullWidth
          value={formData.city}
          onChange={handleChange}
        />
        <TextField
          label="County"
          name="county"
          variant="outlined"
          fullWidth
          value={formData.county}
          onChange={handleChange}
        />
        {/* <TextField
          label="State"
          name="state"
          variant="outlined"
          fullWidth
          value={formData.state}
          onChange={handleChange}
        /> */}
        <TextField
          label="Date Modified"
          name="date_modified"
          variant="outlined"
          fullWidth
          value={formData.date_modified}
          onChange={handleChange}
        />
        {/* <TextField
          label="Tribe Status"
          name="tribe_status"
          variant="outlined"
          fullWidth
          value={formData.tribe_status}
          onChange={handleChange}
        />
        <TextField
          label="Tribe Name"
          name="tribe_name"
          variant="outlined"
          fullWidth
          value={formData.tribe_name}
          onChange={handleChange}
        /> */}
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
