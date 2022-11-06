import BoyIcon from "@mui/icons-material/Boy";
import CakeIcon from "@mui/icons-material/Cake";
import GirlIcon from "@mui/icons-material/Girl";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import MarkunreadIcon from "@mui/icons-material/Markunread";
import UpdateIcon from "@mui/icons-material/Update";
import { Avatar, Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDistance, formatDistanceToNow, parseISO } from "date-fns";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import ContributionCard from "../components/ContributionCard";
import ErrorFS from "../components/ErrorFS";
import LoaderFS from "../components/LoaderFS";
import useFetch from "../hooks/useFetch";
import { Place } from "../models/Place";
import { User } from "../models/User";
import { capitalizeEachFirst } from "../utils/string";
const UserDetails = () => {
  const { id } = useParams();
  const { data, error, fetchData, isError, isLoading } = useFetch<{
    user: User;
    places: Place[];
  }>();

  useEffect(() => {
    fetchData(`user/${id}`, {
      method: "GET",
      type: "authenticated",
    });
  }, [id]);

  if (isError) {
    return <ErrorFS error={error} />;
  }

  return (
    <Grid container height={"87.5vh"}>
      {isLoading && <LoaderFS />}
      <Grid item xs={12} lg={3} height="100%">
        <Box
          display="flex"
          alignItems="center"
          p={"1rem"}
          gap={2}
          justifyContent="center"
          flexDirection="column"
          bgcolor={"primary.light"}
          height="100%"
        >
          <Avatar
            sx={{ width: "10rem", height: "10rem" }}
            src={data?.user.profilePicture}
          />
          <Typography
            fontSize={"1.2rem"}
            fontWeight="bold"
            color="primary.main"
          >
            {capitalizeEachFirst(data?.user.name || "")}
          </Typography>

          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            justifyContent="center"
          >
            <LocationOnIcon fontWeight="bold" />
            <Typography fontWeight="bold" fontSize={"0.9rem"}>
              {`${data?.user.country}, ${data?.user.state}`}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            justifyContent="center"
          >
            <MarkunreadIcon />
            <Typography fontSize={"0.9rem"}>{data?.user.email}</Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap={0.1}
            justifyContent="center"
          >
            {data?.user.gender === "male" ? (
              <BoyIcon fontWeight="bold" fontSize="large" />
            ) : (
              <GirlIcon fontWeight="bold" fontSize="large" />
            )}
            <Typography fontSize={"0.9rem"}>{data?.user.gender}</Typography>
          </Box>

          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            justifyContent="center"
          >
            <CakeIcon fontWeight="bold" />
            <Typography fontSize={"0.9rem"}>
              {data?.user.birthDate &&
                formatDistance(parseISO(data?.user.birthDate), new Date())}
            </Typography>
          </Box>
          <Box
            display="flex"
            alignItems="center"
            gap={0.5}
            justifyContent="center"
          >
            <UpdateIcon fontWeight="bold" />
            <Typography fontSize={"0.9rem"}>
              member since{" "}
              {data?.user.birthDate &&
                formatDistanceToNow(parseISO(data?.user.joinedDate))}
            </Typography>
          </Box>
          <Typography
            fontSize={"0.9rem"}
            p="0.7rem"
            borderRadius="0.3rem"
            bgcolor={"custom.gray"}
            px="3rem"
          >
            {data?.user.bio}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} lg={9} p={"1.2rem"} mt="1rem" overflow={'scroll'} maxHeight='100%'>
        <Typography fontSize={"1.2rem"} mb="1rem" fontWeight="bold">
          Contributions
        </Typography>
        {data?.places?.map((place) => (
          <ContributionCard
            id={place._id}
            key={place._id}
            image={place.photos[0]}
            addedOn={place.addedOn}
            name={place.name}
            country={place.country}
          />
        ))}
      </Grid>
    </Grid>
  );
};

export default UserDetails;
