import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { differenceInYears, formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import useFetch from "@/hooks/useFetch";
import { UsersResponse } from "@/models/Admin";
import { User } from "@/models/User";

const ToolBar = () => {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "flex-end",
        alignItems: "center",
        p: "0.5rem",
      }}
    >
      <GridToolbar />
    </Box>
  );
};

const columns: GridColDef<User>[] = [
  {
    field: "picture",
    headerName: "",
    width: 40,
    renderCell: (params) => <Avatar src={params.row["profilePicture"] || ""} />,
  },
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    valueGetter: (params) => params.row["_id"].slice(0, 9) || "",
  },

  { field: "name", headerName: "Name", width: 200 },
  { field: "userType", headerName: "User Type", width: 100 },
  { field: "country", headerName: "Country", width: 100 },
  { field: "email", headerName: "Email", width: 200 },
  { field: "gender", headerName: "Gender", width: 100 },
  {
    field: "age",
    headerName: "Age",
    width: 120,
    valueGetter: (params) =>
      `${
        params.row["birthDate"]
          ? differenceInYears(new Date(), parseISO(params.row["birthDate"]))
          : ""
      } years`,
  },
  {
    field: "active_period",
    headerName: "Active period",
    width: 120,
    valueGetter: (params) =>
      params.row["joinedDate"]
        ? formatDistanceToNow(parseISO(params.row["joinedDate"]))
        : "",
  },
];

const Users: React.FC = () => {
  const {
    data: users,
    error,
    fetchData,
    isLoading,
  } = useFetch<UsersResponse>();
  const [pageSize, setPageSize] = useState<number>(10);
  useEffect(() => {
    fetchData("admin/users", { method: "GET", type: "authenticated" });
  }, []);

  if (isLoading) {
    return (
      <Box
        width="100%"
        height="100vh"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <Loader />
      </Box>
    );
  }
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        p: "2rem",
        boxSizing: "border-box",
      }}
    >
      <Typography fontSize="1rem" fontWeight="bold">
        Users
      </Typography>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          py: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        {users && (
          <DataGrid
            rows={users}
            columns={columns}
            rowsPerPageOptions={[5, 10, 20]}
            checkboxSelection
            getRowId={(row) => row._id}
            components={{ Toolbar: ToolBar }}
            density="comfortable"
            pageSize={pageSize}
            onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
          />
        )}
      </Box>
    </Box>
  );
};

export default Users;
