import { Grid, LinearProgress, Tab, Tabs } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useMemo, useState } from "react";
import ContributionCard from "@/components/ContributionCard";
import ErrorFS from "@/components/ErrorFS";
import UserDetailsSection from "@/components/UserDetailsSection";
import useFetch from "@/hooks/useFetch";
import useHelmet from "@/hooks/useHelmet";
import { Place } from "@/models/Place";
import { UserProfile } from "@/models/User";
import { useAppSelector } from "@/store/hooks";
import { selectUser } from "@/store/slices/authSlice";

const Profile = () => {
  const { _id } = useAppSelector(selectUser);
  const { data, error, fetchData, isError, isLoading } = useFetch<{
    user: UserProfile;
    places: Place[];
  }>();
  useHelmet(data?.user.name);
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const orderedViewRecords = useMemo(() => {
    if (data?.user.viewRecords) {
      const temp = [...data?.user.viewRecords];
      return temp?.reverse().slice(0, 10);
    }
    return data?.user.viewRecords;
  }, [data?.user.viewRecords]);

  useEffect(() => {
    fetchData(`user/profile`, {
      method: "GET",
      type: "authenticated",
    });
  }, [_id]);

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
    <Box>
      <Grid container sx={{ height: { lg: "87.5vh", xs: "fit-content" } }}>
        <Grid item height={"100%"} xs={12} lg={2.5}>
          <UserDetailsSection
            name={data?.user.name || ""}
            email={data?.user.email || ""}
            joinedDate={data?.user.joinedDate || ""}
            state={data?.user.state || ""}
            country={data?.user.country || ""}
            birthDate={data?.user.birthDate || ""}
            gender={data?.user.gender || ""}
            profilePicture={data?.user.profilePicture || ""}
            userType={data?.user.userType|| ""}
            bio={data?.user.bio || ""}
            _id={data?.user._id || ""}
            favouritePlaces={[]}
          />
        </Grid>
        <Grid
          item
          xs={12}
          lg={9}
          sx={{ p: { lg: "1.2rem", xs: 0 } }}
          mt="1rem"
          overflow={"scroll"}
          maxHeight="100%"
          color={"linear-gradient(to right, red, purple)"}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="inherit"
          >
            <Tab label="Watch Histroy" />
            <Tab label="Contributions" />
            <Tab label="Favourite Places" />
          </Tabs>

          {value === 0 && (
            <Grid container>
              {orderedViewRecords?.map((record, index) => (
                <Grid item xs={12} lg={6} key={record._id || index}>
                  <ContributionCard
                    image={record.place?.photos || ""}
                    addedOn={record?.time || ""}
                    name={record.place?.name || ""}
                    country={record.place?.country || ""}
                    id={record?.place?._id || ""}
                    likes={record?.place?.likedBy?.length || 0}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {value === 1 && (
            <Grid container>
              {data?.places?.map((record, index) => (
                <Grid item xs={12} lg={6} key={record._id || index}>
                  <ContributionCard
                    likes={record?.likedBy?.length || 0}
                    image={record.photos || ""}
                    addedOn={record.addedOn || ""}
                    name={record.name || ""}
                    country={record.country || ""}
                    id={record._id || ""}
                  />
                </Grid>
              ))}
            </Grid>
          )}

          {value === 2 && (
            <Grid container>
              {data?.user?.favouritePlaces?.map((record, index) => (
                <Grid item xs={12} lg={6} key={record._id || index}>
                  <ContributionCard
                    likes={record?.likedBy?.length || 0}
                    image={record.photos || ""}
                    addedOn={record.addedOn || ""}
                    name={record.name || ""}
                    country={record.country || ""}
                    id={record._id || ""}
                  />
                </Grid>
              ))}
            </Grid>
          )}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
