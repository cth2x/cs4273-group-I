//Displays table with a persons data
"use client";
import { useState, useEffect, FormEvent } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import TableComponent from "../TableComponent";
import { fetchMissingPersonById, fetchMissingPersons } from "../utils/fetch";
import { MRT_ColumnDef } from "material-react-table";
import {
  Button,
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Box,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import DownloadIcon from "@mui/icons-material/Download";
import { EditIcon, ListIcon, MenuIcon } from "lucide-react";
import FormDrawer from "@/utils/FormDrawer";
import DeleteIcon from "@mui/icons-material/Delete";

export type MissingPerson = {
  case_id: string;
  first_name: string;
  last_name: string;
  age: string;
  gender: string;
  race: string;
  height: string;
  weight: string;
  eye_color: string;
  hair_color: string;
  missing_date: string;
  missing_location: string;
  circumstances: string;
  contact_info: string;
  date_modified: string;
  tribes: string[];
  tribe_statuses: string[];
  classification: string;
  category_of_missing: string;
};

// Define a type for the session state
type SessionData = {
  user?: {
    name?: string | null;
    email?: string | null;
    image?: string | null;
  };
  role?: string;
  expires?: string;
} | null;

export default function TablePage() {
  const [data, setData] = useState<MissingPerson[]>([]);
  const [filteredData, setFilteredData] = useState<MissingPerson[]>([]);
  const [session, setSession] = useState<SessionData>(null);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState<MissingPerson | null>(
    null
  );
  const searchParams = useSearchParams();

  // Authentication and Modal/Dialog State from TableComponent
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);

  const [editingPerson, setEditingPerson] = useState(false);

  async function loadData() {
    const result = await fetchMissingPersons();
    const transformedData = result.map((person: any) => {
      const nameParts = person.name.split(" ");
      const first_name = nameParts[0];
      const last_name = nameParts.slice(1).join(" ");
      const today = new Date().toISOString().split("T")[0];
      return {
        ...person,
        first_name,
        last_name,
        date_modified: today,
        classification: person.classification || "N/A",
        category_of_missing: person.classification || "N/A",
      };
    });

    setData(transformedData);

    // Apply initial filtering based on URL search params
    applyFilters(transformedData);
  }

  useEffect(() => {
    loadData();
    getSessionAndAuth();
  }, []);

  async function getSessionAndAuth() {
    try {
      // Fetch session
      const sessionRes = await fetch("/api/session");
      const sessionData = await sessionRes.json();
      setSession(sessionData);
      console.log("Session:", sessionData);

      // Fetch auth status
      const authResponse = await fetch("/api/auth");
      if (authResponse.ok) {
        const authData = await authResponse.json();
        setIsAuthenticated(authData.isAuthenticated);
      } else {
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error("Error fetching session or auth status:", error);
      setIsAuthenticated(false);
      setSession(null);
    }
  }

  // Function to filter data based on search params
  const applyFilters = (dataToFilter: MissingPerson[]) => {
    if (!searchParams || searchParams.size === 0) {
      setFilteredData(dataToFilter); // No filters, use all data
      return;
    }

    // Filter the data based on search parameters
    let filtered = [...dataToFilter];

    // Apply each filter
    if (searchParams.has("first_name")) {
      const firstName = searchParams.get("first_name")?.toLowerCase();
      if (firstName) {
        filtered = filtered.filter((person) =>
          person.first_name.toLowerCase().includes(firstName)
        );
      }
    }

    if (searchParams.has("last_name")) {
      const lastName = searchParams.get("last_name")?.toLowerCase();
      if (lastName) {
        filtered = filtered.filter((person) =>
          person.last_name.toLowerCase().includes(lastName)
        );
      }
    }
    
    
    if (searchParams.has('age')) {
      const ageParam = searchParams.get('age');
      if (ageParam) {
        const searchAge = parseInt(ageParam);
        filtered = filtered.filter((person) => {
          const personAge = parseInt(person.age);
          return (
            !isNaN(personAge) && !isNaN(searchAge) && personAge === searchAge
          );
        });
      }
    }

    if (searchParams.has("gender")) {
      const gender = searchParams.get("gender");
      if (gender) {
        filtered = filtered.filter(
          (person) => person.gender.toLowerCase() === gender.toLowerCase()
        );
      }
    }

    if (searchParams.has("race")) {
      const race = searchParams.get("race")?.toLowerCase();
      if (race) {
        filtered = filtered.filter((person) =>
          person.race.toLowerCase().includes(race)
        );
      }
    }
    
    
    if (searchParams.has('city')) {
      const city = searchParams.get('city')?.toLowerCase();
      if (city) {
        filtered = filtered.filter(
          (person) =>
            person.missing_location &&
            person.missing_location.toLowerCase().includes(city)
        );
      }
    }
  
    
    if (searchParams.has('missing_date_from') || searchParams.has('missing_date_to')) {
      const fromDateStr = searchParams.get('missing_date_from');
      const toDateStr = searchParams.get('missing_date_to');
    
      let fromDate = fromDateStr ? new Date(fromDateStr) : null;
      let toDate = toDateStr ? new Date(toDateStr) : null;
    
      // Move toDate to end of the day (23:59:59) to include entire toDate
      if (toDate) {
        toDate.setDate(toDate.getDate() + 1);
      }
    
      filtered = filtered.filter(person => {
        if (!person.missing_date) return false;
    
        const personDate = new Date(person.missing_date);
    
        if (fromDate && toDate) {
          return personDate > fromDate && personDate <= toDate;
        } else if (fromDate) {
          return personDate > fromDate;
        } else if (toDate) {
          return personDate <= toDate;
        }
    
        return true;
      });
    }

    if (searchParams.has("classification")) {
      const classification = searchParams.get("classification")?.toLowerCase();
      if (classification) {
        filtered = filtered.filter(
          (person) =>
            person.classification &&
            person.classification.toLowerCase().includes(classification)
        );
      }
    }

    if (searchParams.has("tribe")) {
      const tribe = searchParams.get("tribe")?.toLowerCase();
      if (tribe) {
        filtered = filtered.filter(
          (person) =>
            person.tribes &&
            person.tribes.some((t) => t.toLowerCase().includes(tribe))
        );
      }
    }

    setFilteredData(filtered);
  };

  // Update effect to run when search params change
  useEffect(() => {
    if (data.length > 0) {
      applyFilters(data);
    }
  }, [searchParams, data]);

  // Handlers from TableComponent
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLoginClick = () => {
    setShowLoginModal(true);
  };

  const handleCloseDialog = () => {
    setOpenLogoutDialog(false);
  };

  const handleCloseLoginModal = () => {
    setShowLoginModal(false);
  };

  async function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const response = await fetch("/api/login", {
      method: "POST",
      body: formData,
    });

    if (response.ok) {
      setShowLoginModal(false);
      window.location.reload();
    } else {
      console.error("Login failed");
    }
  }

  const handleLogout = async () => {
    try {
      setIsLoggingOut(true);
      const response = await fetch("/api/logout", { method: "POST" });
      if (response.ok) {
        window.location.reload();
      } else {
        console.error("Logout failed");
        setIsLoggingOut(false);
        setOpenLogoutDialog(false);
      }
    } catch (error) {
      console.error("Logout failed:", error);
      setIsLoggingOut(false);
      setOpenLogoutDialog(false);
    }
  };

  const openDrawer = (person: MissingPerson | null = null) => {
    console.log("Opening Drawer with Person:", person);
    setSelectedPerson(person);
    setDrawerOpen(true);
  };

  const handleDelete = async (case_id: string) => {
    const confirmation = window.confirm(
      "Are you sure you want to delete this person?"
    );
    if (confirmation) {
      try {
        const response = await fetch("/api/deletePerson", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ case_id }),
        });
        if (response.ok) {
          alert("Person Deleted");
          loadData();
        }
      } catch (error) {
        console.error("Error deleting person:", error);
      }
    }
  };

  const handleEdit = async (case_id: string) => {
    setEditingPerson(true);
    setDrawerOpen(true);
    try {
      const data = await fetchMissingPersonById(case_id);
      console.log(data.name);

      // Split the name
      const [first_name, last_name] = data.name.split(" ");

      // Set the selected person with the swapped name
      setSelectedPerson({
        ...data,
        first_name,
        last_name,
      });
    } catch (err) {
      console.error("Failed to fetch full person data", err);
    }
  };

  let columns: MRT_ColumnDef<MissingPerson>[] = [];

  if (session && session.role === "admin") {
    columns = [
      {
        header: "Edit",
        id: "actions",
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <IconButton
            className="edit-button"
            onClick={(event) => {
              event.stopPropagation();
              handleEdit(row.original.case_id);
            }}
          >
            <EditIcon />
          </IconButton>
        ),
        size: 60,
      },
      { accessorKey: "case_id", header: "ID" },
      { accessorKey: "first_name", header: "First Name" },
      { accessorKey: "last_name", header: "Last Name" },
      { accessorKey: "age", header: "Age", filterVariant: "range-slider" },
      { accessorKey: "gender", header: "Sex" },
      { accessorKey: "race", header: "Race / Ethnicity" },
      {
        accessorFn: (originalRow) => new Date(originalRow.missing_date),
        header: "Date Missing",
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        filterVariant: "date-range",
      },
      { accessorKey: "missing_location", header: "Missing Location" },
      {
        accessorKey: "tribe_statuses",
        header: "Tribal Statuses",
        Cell: ({ row }) => row.original.tribe_statuses?.join(", ") || "N/A",
      },
      {
        accessorKey: "tribes",
        header: "Associated Tribes",
        Cell: ({ row }) => row.original.tribes?.join(", ") || "N/A",
        filterVariant: "select",
      },
      {
        accessorKey: "classification",
        header: "Category of Missing",
        Cell: ({ row }) => row.original.classification || "N/A",
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.date_modified),
        header: "Date modified",
        filterVariant: "date-range",
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      },
      {
        header: "Delete",
        id: "delete",
        enableSorting: false,
        enableColumnFilter: false,
        Cell: ({ row }) => (
          <IconButton
            className="delete-button"
            onClick={(event) => {
              event.stopPropagation();
              handleDelete(row.original.case_id);
            }}
          >
            <DeleteIcon />
          </IconButton>
        ),
      },
    ];
  } else {
    columns = [
      { accessorKey: "case_id", header: "ID" },
      { accessorKey: "first_name", header: "First Name" },
      { accessorKey: "last_name", header: "Last Name" },
      {
        accessorFn: (originalRow) => parseInt(originalRow.age),
        header: "Age",
        filterVariant: "range",
      },
      { accessorKey: "gender", header: "Sex" },
      { accessorKey: "race", header: "Race / Ethnicity" },
      {
        accessorFn: (originalRow) => new Date(originalRow.missing_date),
        header: "Date Missing",
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
        filterVariant: "date-range",
      },
      { accessorKey: "missing_location", header: "Missing Location" },
      {
        accessorKey: "tribe_statuses",
        header: "Tribal Statuses",
        Cell: ({ row }) => row.original.tribe_statuses?.join(", ") || "N/A",
      },
      {
        accessorKey: "tribes",
        header: "Associated Tribes",
        Cell: ({ row }) => row.original.tribes?.join(", ") || "N/A",
        filterVariant: "select",
      },
      {
        accessorKey: "classification",
        header: "Category of Missing",
        Cell: ({ row }) => row.original.classification || "N/A",
      },
      {
        accessorFn: (originalRow) => new Date(originalRow.date_modified),
        header: "Date modified",
        filterVariant: "date-range",
        Cell: ({ cell }) => cell.getValue<Date>().toLocaleDateString(),
      },
    ];
  }

  // If the user is an admin and on mobile, change the styling slightly to make options more visible/clear
  const isMobile = useMediaQuery("(max-width:768px)");
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="p-6 h-full">
      <div className="flex justify-between items-center mb-4 gap-4">
        <Link href="/">
          <Button
            variant="contained"
            color="secondary"
            startIcon={<ArrowBackIcon />}
            size="medium"
            sx={{
              minWidth: "100px",
              backgroundColor: "#1976D2",
              "&:hover": { backgroundColor: "#1565C0" },
            }}
          >
            Back
          </Button>
        </Link>

        <h1 className="text-2xl font-bold text-center flex-grow">
          Missing Persons Table
        </h1>

        <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
          {session && session.role === "admin" && (
            <>
              {isMobile ? (
                <>
                  <IconButton onClick={handleMenuOpen}>
                    <MenuIcon />
                  </IconButton>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleMenuClose}
                    PaperProps={{
                      className: "p-2",
                    }}
                  >
                    <MenuItem onClick={handleMenuClose}>
                      <Link href="/admin" className="flex items-center gap-2">
                        <ListIcon fontSize="small" />
                        View Requests
                      </Link>
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        openDrawer();
                        handleMenuClose();
                      }}
                      className="flex items-center gap-2"
                    >
                      <AddIcon fontSize="small" />
                      Add Person
                    </MenuItem>
                    {isAuthenticated && (
                      <MenuItem
                        onClick={() => {
                          handleLogoutClick();
                          handleMenuClose();
                        }}
                        className="flex items-center gap-2"
                      >
                        <LogoutIcon fontSize="small" />
                        Logout
                      </MenuItem>
                    )}
                  </Menu>
                </>
              ) : (
                <>
                  <Link href="/admin">
                    <Button
                      variant="contained"
                      startIcon={<ListIcon />}
                      size="medium"
                    >
                      View Requests
                    </Button>
                  </Link>
                  <Button
                    variant="contained"
                    onClick={() => openDrawer()}
                    startIcon={<AddIcon />}
                    size="medium"
                    className="w-fit"
                  >
                    Add Person
                  </Button>
                </>
              )}
            </>
          )}

          {/* Always show logout/login normally if not mobile-admin */}
          {(!isMobile || session?.role !== "admin") && (
            <>
              {isAuthenticated ? (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LogoutIcon />}
                  onClick={handleLogoutClick}
                  size="medium"
                  sx={{ minWidth: "100px" }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<LoginIcon />}
                  onClick={handleLoginClick}
                  size="medium"
                  sx={{ minWidth: "100px" }}
                >
                  Admin Login
                </Button>
              )}
            </>
          )}
        </Box>
      </div>

      {/* If we have filters applied, show a message */}
      {searchParams && searchParams.size > 0 && (
        <div className="my-4 p-4 bg-blue-50 rounded-lg">
          <div className="flex justify-between items-center">
            <p className="text-blue-800">
              Showing filtered results based on your search criteria.
            </p>
            <Link href="/table">
              <button className="px-4 py-1 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
                Clear Filters
              </button>
            </Link>
          </div>
        </div>
      )}

      {filteredData.length === 0 && searchParams && searchParams.size > 0 ? (
        <div className="mt-8 p-6 text-center bg-gray-50 rounded-lg border border-gray-200">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            No Results Found
          </h3>
          <p className="text-gray-600">
            No matching records found for your search criteria. Please try
            different search parameters.
          </p>
          <Link href="/table">
            <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition">
              Clear Filters
            </button>
          </Link>
        </div>
      ) : (
        <div>
          <TableComponent columns={columns} data={filteredData} />
        </div>
      )}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-96">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Admin Login</h3>
              <button
                onClick={handleCloseLoginModal}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <form className="space-y-4" onSubmit={handleLogin}>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold"
              >
                Sign In
              </button>
            </form>
          </div>
        </div>
      )}

      <Dialog
        open={openLogoutDialog}
        onClose={handleCloseDialog}
        aria-labelledby="logout-dialog-title"
        aria-describedby="logout-dialog-description"
      >
        <DialogTitle
          id="logout-dialog-title"
          sx={{ textAlign: "center", pb: 1 }}
        >
          Confirm Logout
        </DialogTitle>
        <DialogContent sx={{ pt: 0, pb: 1 }}>
          <DialogContentText
            id="logout-dialog-description"
            sx={{ textAlign: "center" }}
          >
            Are you sure you want to log out?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "center", pt: 0, pb: 2 }}>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button
            onClick={handleLogout}
            color="error"
            variant="contained"
            disabled={isLoggingOut}
          >
            {isLoggingOut ? "Logging out..." : "Logout"}
          </Button>
        </DialogActions>
      </Dialog>

      <FormDrawer
        open={drawerOpen}
        onClose={() => {
	  setEditingPerson(false)
          setDrawerOpen(false);
          setSelectedPerson(null);
          loadData();
        }}
        initialData={selectedPerson}
	title={editingPerson ? "Edit Person" : "Add Person"}
      />
    </div>
  );
}
