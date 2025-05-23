import { Avatar, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import useFetch from "@/hooks/useFetch";
import { PlacesResponse } from "@/models/Admin";
import { Place } from "@/models/Place";

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

const columns: GridColDef<Place>[] = [
  {
    field: "picture",
    headerName: "",
    width: 40,
    renderCell: (params) => <Avatar src={params.row["photos"][0] || ""} />,
  },
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    valueGetter: (params) => params.row["_id"].slice(0, 9) || "",
  },

  { field: "name", headerName: "Name", width: 200 },
  { field: "country", headerName: "Country", width: 150 },
  { field: "state", headerName: "State", width: 150 },
  {
    field: "ratings",
    headerName: "Avg. Rating",
    width: 100,
    valueGetter: (params) =>
      params.row["ratings"].length > 0
        ? params.row["ratings"].reduce((acc, rate) => acc + rate.amount, 0) /
          params.row["ratings"].length
        : 0,
    type: "number",
  },
  {
    field: "likes",
    headerName: "Likes",
    width: 100,
    valueGetter: (params) => params.row["likedBy"].length,
    type: "number",
  },
  {
    field: "Views",
    headerName: "Views",
    width: 100,
    valueGetter: (params) => params.row["viewRecords"].length,
    type: "number",
  },
  {
    field: "comments",
    headerName: "Comments",
    width: 100,
    valueGetter: (params) => params.row["comments"].length,
    type: "number",
  },
  {
    field: "active_period",
    headerName: "Active period",
    width: 100,
    valueGetter: (params) =>
      params.row["addedOn"]
        ? formatDistanceToNow(parseISO(params.row["addedOn"]))
        : "",
  },
];

const Places: React.FC = () => {
  const {
    data: places,
    error,
    fetchData,
    isLoading,
  } = useFetch<PlacesResponse>();
  const [pageSize, setPageSize] = useState<number>(10);
  useEffect(() => {
    fetchData("admin/places", { method: "GET", type: "authenticated" });
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
        Places
      </Typography>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          py: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        {places && (
          <DataGrid
            rows={places}
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

export default Places;
