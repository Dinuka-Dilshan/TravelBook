import { Grid, LinearProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ContributionCard from "@/components/ContributionCard";
import ErrorFS from "@/components/ErrorFS";
import UserDetailsSection from "@/components/UserDetailsSection";
import useFetch from "@/hooks/useFetch";
import useHelmet from "@/hooks/useHelmet";
import { Place } from "@/models/Place";
import { User } from "@/models/User";
const UserDetails = () => {
  const { id } = useParams();
  const { data, error, fetchData, isError, isLoading } = useFetch<{
    user: User;
    places: Place[];
  }>();
  useHelmet(data?.user.name);
  useEffect(() => {
    fetchData(`user/${id}`, {
      method: "GET",
      type: "authenticated",
    });
  }, [id]);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  if (isLoading) {
    return (
      <LinearProgress
        sx={{
          background: "linear-gradient(to right, red, purple)",
          height: "0.1rem",
        }}
      />
    );
  }

  return (
    <Grid container sx={{ height: { lg: "87.5vh", xs: "fit-content" } }}>
      {data?.user && (
        <Grid item xs={12} lg={3} height="100%">
          <UserDetailsSection {...data.user} />{" "}
        </Grid>
      )}
      <Grid
        item
        xs={12}
        lg={9}
        p={"1.2rem"}
        mt="1rem"
        overflow={"scroll"}
        maxHeight="100%"
      >
        <Typography
          fontSize={"1.5rem"}
          mb="1rem"
          pl={"0.5rem"}
          fontWeight="bold"
          fontFamily={"Poor Story, cursive"}
        >
          Contributions
        </Typography>
        <Grid container>
          {data?.places?.map((place) => (
            <Grid item xs={12} lg={6} key={place._id}>
              <ContributionCard
                id={place._id}
                image={place.photos}
                addedOn={place.addedOn}
                name={place.name}
                country={place.country}
                likes={place.likedBy.length}
              />
            </Grid>
          ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default UserDetails;
