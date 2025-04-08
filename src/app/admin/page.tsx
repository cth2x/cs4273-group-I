"use client";
import { useState } from "react";
import {
  Box,
  Typography,
  Paper,
  Button,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Snackbar,
  Alert,
  Card,
  CardContent,
  CardActions,
  Grid,
  Avatar,
  Divider,
  IconButton,
  Link,
} from "@mui/material";
import {
  CheckCircle as CheckCircleIcon,
  Cancel as CancelIcon,
  PersonSearch as PersonSearchIcon,
  CalendarMonth as CalendarIcon,
  LocationOn as LocationIcon,
  Close as CloseIcon,
  ArrowBack,
} from "@mui/icons-material";
import { format } from "date-fns";
import { mockRequests } from "./mockRequests";
import { MissingPerson } from "@/table/page";

export default function MissingPersonRequests() {
  const [requests, setRequests] = useState<MissingPerson[]>(mockRequests);
  const [selectedRequest, setSelectedRequest] = useState<MissingPerson | null>(
    null
  );
  const [dialogOpen, setDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success" as "success" | "error",
  });

  const handleViewDetails = (request: MissingPerson) => {
    setSelectedRequest(request);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
  };

  const [confirmDialog, setConfirmDialog] = useState({
    open: false,
    title: "",
    message: "",
    action: null as null | (() => void),
  });

  const handleConfirmDialogClose = () => {
    setConfirmDialog({
      ...confirmDialog,
      open: false,
    });
  };

  const handleApprove = (caseId: string) => {
    setConfirmDialog({
      open: true,
      title: "Confirm Approval",
      message: "Are you sure you want to approve this missing person request?",
      action: () => {
        // Actual approval logic
        setRequests(requests.filter((request) => request.case_id !== caseId));
        setDialogOpen(false);
        setSnackbar({
          open: true,
          message: "Request approved successfully",
          severity: "success",
        });
        handleConfirmDialogClose();
      },
    });
  };

  const handleReject = (caseId: string) => {
    setConfirmDialog({
      open: true,
      title: "Confirm Rejection",
      message: "Are you sure you want to reject this missing person request?",
      action: () => {
        // Actual rejection logic
        setRequests(requests.filter((request) => request.case_id !== caseId));
        setDialogOpen(false);
        setSnackbar({
          open: true,
          message: "Request rejected",
          severity: "error",
        });
        handleConfirmDialogClose();
      },
    });
  };

  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`;
  };

  return (
    <Box className="p-6 bg-gray-50 min-h-screen">
      <Paper elevation={0} className="p-6 mb-6 bg-white rounded-lg shadow">
        <Box className="flex justify-between items-center mb-6">
          <div className="w-fit">
            <h1 className="text-2xl font-bold text-center flex-grow">
              Missing Person Requests
            </h1>
            <Typography variant="body2" className="text-gray-500">
              {requests.length} pending requests
            </Typography>
          </div>
          {/* Back button */}
          <Link href="/table">
            <Button variant="contained" startIcon={<ArrowBack />} size="medium">
              Back to Table
            </Button>
          </Link>
        </Box>

        <Grid container spacing={4}>
          {requests.map((request) => (
            <Grid item xs={12} md={6} key={request.case_id}>
              <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                <CardContent>
                  <Box className="flex items-center mb-4">
                    <Avatar
                      className="bg-blue-600 mr-3"
                      alt={`${request.first_name} ${request.last_name}`}
                    >
                      {getInitials(request.first_name, request.last_name)}
                    </Avatar>
                    <Box>
                      <Typography variant="h6">
                        {request.first_name} {request.last_name}
                      </Typography>
                      <Typography variant="body2" color="textSecondary">
                        Case ID: {request.case_id}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="mb-3 flex items-center">
                    <PersonSearchIcon
                      className="text-gray-500 mr-2"
                      fontSize="small"
                    />
                    <Typography variant="body2">
                      {request.age} year old {request.gender}, {request.race}
                    </Typography>
                  </Box>

                  <Box className="mb-3 flex items-center">
                    <CalendarIcon
                      className="text-gray-500 mr-2"
                      fontSize="small"
                    />
                    <Typography variant="body2">
                      Missing since:{" "}
                      {format(request.missing_date, "MMM d, yyyy")}
                    </Typography>
                  </Box>

                  <Box className="mb-3 flex items-center">
                    <LocationIcon
                      className="text-gray-500 mr-2"
                      fontSize="small"
                    />
                    <Typography variant="body2">
                      {request.city}, {request.county} County
                    </Typography>
                  </Box>

                  <Box className="mt-3">
                    <Chip
                      label={request.classification}
                      size="small"
                      color={
                        request.classification.includes("Endangered")
                          ? "error"
                          : "primary"
                      }
                      className="mr-2 mb-2"
                    />
                    <Chip
                      label={request.category_of_missing}
                      size="small"
                      color="default"
                      className="mr-2 mb-2"
                    />
                    {request.tribes[0] !== "N/A" && (
                      <Chip
                        label={`Tribe: ${request.tribes[0]}`}
                        size="small"
                        color="secondary"
                        className="mb-2"
                      />
                    )}
                  </Box>
                </CardContent>

                <Divider />

                <CardActions className="flex justify-between bg-gray-50">
                  <Button
                    onClick={() => handleViewDetails(request)}
                    size="small"
                    color="info"
                  >
                    View Details
                  </Button>
                  <Box>
                    <Button
                      startIcon={<CancelIcon />}
                      onClick={() => handleReject(request.case_id)}
                      size="small"
                      color="error"
                    >
                      Reject
                    </Button>
                    <Button
                      startIcon={<CheckCircleIcon />}
                      onClick={() => handleApprove(request.case_id)}
                      size="small"
                      color="success"
                      className="mr-2"
                    >
                      Approve
                    </Button>
                  </Box>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {requests.length === 0 && (
          <Box className="text-center py-16">
            <Typography variant="h6" color="textSecondary">
              No pending requests
            </Typography>
          </Box>
        )}
      </Paper>

      {/* Detail Dialog */}
      <Dialog open={dialogOpen} onClose={handleClose} maxWidth="md" fullWidth>
        {selectedRequest && (
          <>
            <DialogTitle className="flex justify-between items-center">
              <Typography fontWeight={"bold"} fontSize={20}>
                Case Details: {selectedRequest.case_id}
              </Typography>
              <Box className="flex items-center">
                <Chip
                  label={selectedRequest.classification}
                  color={
                    selectedRequest.classification.includes("Endangered")
                      ? "error"
                      : "primary"
                  }
                  className="mr-4"
                />

                <IconButton
                  color="inherit"
                  onClick={handleClose}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
              </Box>
            </DialogTitle>
            <DialogContent dividers>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Full Name
                  </Typography>
                  <Typography variant="body1" className="mb-3">
                    {selectedRequest.first_name} {selectedRequest.last_name}
                  </Typography>

                  <Typography variant="subtitle2" color="textSecondary">
                    Age / Gender / Race
                  </Typography>
                  <Typography variant="body1" className="mb-3">
                    {selectedRequest.age} / {selectedRequest.gender} /{" "}
                    {selectedRequest.race}
                  </Typography>

                  <Typography variant="subtitle2" color="textSecondary">
                    Missing Since
                  </Typography>
                  <Typography variant="body1" className="mb-3">
                    {format(selectedRequest.missing_date, "MMMM d, yyyy")}
                  </Typography>

                  <Typography variant="subtitle2" color="textSecondary">
                    Location
                  </Typography>
                  <Typography variant="body1" className="mb-3">
                    {selectedRequest.city}, {selectedRequest.county} County
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Category
                  </Typography>
                  <Typography variant="body1" className="mb-3">
                    {selectedRequest.category_of_missing}
                  </Typography>

                  <Typography variant="subtitle2" color="textSecondary">
                    Tribal Information
                  </Typography>
                  <Typography variant="body1" className="mb-3">
                    {selectedRequest.tribes[0] === "N/A"
                      ? "No tribal affiliation"
                      : `${selectedRequest.tribes.join(
                          ", "
                        )} (${selectedRequest.tribe_statuses.join(", ")})`}
                  </Typography>

                  <Typography variant="subtitle2" color="textSecondary">
                    Last Modified
                  </Typography>
                  <Typography variant="body1" className="mb-3">
                    {format(selectedRequest.date_modified, "MMMM d, yyyy")}
                  </Typography>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions className="bg-gray-50">
              <Button
                startIcon={<CancelIcon />}
                onClick={() => handleReject(selectedRequest.case_id)}
                color="error"
              >
                Reject Request
              </Button>
              <Button
                startIcon={<CheckCircleIcon />}
                onClick={() => handleApprove(selectedRequest.case_id)}
                color="success"
                variant="contained"
              >
                Approve Request
              </Button>
            </DialogActions>
          </>
        )}
      </Dialog>

      {/* Confirmation Dialog */}
      <Dialog
        open={confirmDialog.open}
        onClose={handleConfirmDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{confirmDialog.title}</DialogTitle>
        <DialogContent>
          <Typography id="alert-dialog-description">
            {confirmDialog.message}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleConfirmDialogClose} color="inherit">
            Cancel
          </Button>
          <Button
            onClick={() => confirmDialog.action && confirmDialog.action()}
            color={
              confirmDialog.title.includes("Approval") ? "success" : "error"
            }
            variant="contained"
            autoFocus
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>

      {/* Notification */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity={snackbar.severity}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
}
