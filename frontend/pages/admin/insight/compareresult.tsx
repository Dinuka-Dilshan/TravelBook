import { Grid } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import InsightResultCompareCard from "../../../components/ADMIN/InsightResultCompareCard";
import Loader from "../../../components/Loader";
import useFetch from "../../../hooks/useFetch";
import { InsightReportResponse } from "../../../models/Admin";

const InsightCompareResult = () => {
  const [searchParams] = useSearchParams();

  const {
    data: placeLeft,
    error,
    fetchData: fetchDataLeft,
    isLoading,
  } = useFetch<InsightReportResponse>();

  const {
    data: placeRight,
    error: rightError,
    fetchData: fetchDataRight,
    isLoading: isLoadingRight,
  } = useFetch<InsightReportResponse>();

  useEffect(() => {
    fetchDataLeft(
      `admin/${
        searchParams.get("type") === "Normal" ? "place" : "business"
      }/${searchParams.get("id1")}`,
      {
        method: "GET",
        type: "authenticated",
      }
    );
    fetchDataRight(
      `admin/${
        searchParams.get("type") === "Normal" ? "place" : "business"
      }/${searchParams.get("id2")}`,
      {
        method: "GET",
        type: "authenticated",
      }
    );
  }, []);

  if (isLoading || isLoadingRight) {
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
    <Grid container>
      {placeLeft && (
        <Grid xs={6}>
          <InsightResultCompareCard data={placeLeft} />
        </Grid>
      )}
      {placeRight && (
        <Grid xs={6}>
          <InsightResultCompareCard data={placeRight} />
        </Grid>
      )}
    </Grid>
  );
};

export default InsightCompareResult;
