import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { DataGrid, GridColDef, GridToolbar } from "@mui/x-data-grid";
import {
  differenceInYears,
  format,
  formatDistanceToNow,
  parseISO,
} from "date-fns";
import { useEffect, useState } from "react";
import Loader from "@/components/Loader";
import useFetch from "@/hooks/useFetch";
import { TransactionResponse } from "@/models/Admin";
import { Booking } from "@/models/Booking";

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

const columns: GridColDef<Booking>[] = [
  {
    field: "_id",
    headerName: "ID",
    width: 100,
    valueGetter: (params) => params.row["_id"].slice(0, 9) || "",
  },
  { field: "status", headerName: "Status" },
  { field: "totalPrice", headerName: "Amount", width: 100, type: "number" },
  {
    field: "Date",
    headerName: "Date",
    type: "date",
    width: 130,
    valueGetter: (params) => {
      return format(parseISO(params.row["placedOn"]), "yyyy-MMM-dd") || "";
    },
  },
  {
    field: "Place_title",
    headerName: "Place Title",
    width: 130,
    valueGetter: (params) => params.row["place"]?.name || "",
  },
  {
    field: "place_country",
    headerName: "Country",
    width: 80,
    valueGetter: (params) => params.row["place"]?.country || "",
  },
  {
    field: "package_name",
    headerName: "Package Name",
    width: 130,
    valueGetter: (params) => params.row["package"]?.name || "",
  },
  {
    field: "package_price",
    headerName: "Package Price",
    width: 130,
    valueGetter: (params) => params.row["package"]?.dailyPrice || "",
    type: "number",
  },
  {
    field: "package_guest_size",
    headerName: "Guest Size",
    width: 80,
    valueGetter: (params) => params.row["package"]?.guestSize || "",
    type: "number",
  },
  {
    field: "package_beds",
    headerName: "Beds",
    width: 80,
    valueGetter: (params) => params.row["package"]?.numberOfBeds || "",
    type: "number",
  },
  {
    field: "package_rooms",
    headerName: "Rooms",
    width: 80,
    valueGetter: (params) => params.row["package"]?.numberOfRooms || "",
    type: "number",
  },
  {
    field: "place_views",
    headerName: "Place Views",
    width: 120,
    valueGetter: (params) => params.row["place"]?.viewRecords.length || "",
    type: "number",
  },
  {
    field: "place_live_days",
    headerName: "Published Since",
    width: 120,
    valueGetter: (params) =>
      params.row["place"]?.addedOn
        ? formatDistanceToNow(parseISO(params.row["place"].addedOn))
        : "",
  },
  {
    field: "cutomer",
    headerName: "Customer ID",
    width: 120,
    valueGetter: (params) => params.row["customer"]?._id || "",
  },
  {
    field: "cutomer_gender",
    headerName: "Gender",
    width: 120,
    valueGetter: (params) => params.row["customer"]?.gender || "",
  },
  ,
  {
    field: "cutomer_age",
    headerName: "Customer Age",
    width: 120,
    valueGetter: (params) =>
      params.row["customer"]?.birthDate
        ? differenceInYears(
            new Date(),
            parseISO(params.row["customer"].birthDate)
          )
        : "",
  },
  {
    field: "cutomer_country",
    headerName: "Customer Country",
    width: 130,
    valueGetter: (params) => params.row["customer"]?.country || "",
  },
];

const Transactions: React.FC = () => {
  const {
    data: bookings,
    error,
    fetchData,
    isLoading,
  } = useFetch<TransactionResponse>();
  const [pageSize, setPageSize] = useState<number>(10);
  useEffect(() => {
    fetchData("admin/transactions", { method: "GET", type: "authenticated" });
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
        Transactions
      </Typography>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          py: "1.5rem",
          boxSizing: "border-box",
        }}
      >
        {bookings && (
          <DataGrid
            rows={bookings}
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

export default Transactions;
