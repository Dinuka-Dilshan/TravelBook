import { Button, Chip, Grid, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useEffect, useState } from "react";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { VscDebugBreakpointUnsupported as PointIcon } from "react-icons/vsc";
import useFetch from "../../hooks/useFetch";
import { BusinessPlace, Package } from "../../models/BusinessPlace";
import LocationBox from "../Location/LocationBox";
import PackageCard from "../PackageCard";
import FacilitySelect from "./FacilitySelect";
import PackageInput from "./PackageInput";

type PlaceDetails = Pick<
  BusinessPlace,
  "name" | "description" | "packages" | "rules" | "facilities"
>;

const MyPlace = () => {
  const {
    isLoading,
    data: businessPlace,
    fetchData,
    isError,
    error,
  } = useFetch<BusinessPlace>();

  const [placeDetails, setPlaceDetails] = useState<PlaceDetails>({
    name: "",
    description: "",
    packages: [],
    facilities: [],
    rules: [],
  });

  const [isAddRuleOpen, setIsAddRuleOpen] = useState(false);
  const [newRule, setNewRule] = useState("");

  const [isAddFacilityOpen, setIsAddFacilityeOpen] = useState(false);

  const [isAddPackageOpen, setIsAddPackageOpen] = useState(false);

  const [isEditPackageOpen, setIsEditPackageOpen] = useState(false);
  const [editPackageIndex, setEditPackageIndex] = useState(0);

  useEffect(() => {
    if (businessPlace) {
      setPlaceDetails({
        name: businessPlace?.name,
        description: businessPlace?.description,
        packages: businessPlace?.packages,
        facilities: businessPlace?.facilities,
        rules: businessPlace?.rules,
      });
    }
  }, [businessPlace]);

  const handleEdit = (key: keyof PlaceDetails, value: any) => {
    setPlaceDetails((p) => {
      return { ...p, [key]: value };
    });
  };

  const handleDeleteFacility = (index: number) => {
    setPlaceDetails((places) => {
      return {
        ...places,
        facilities:
          places?.facilities?.filter(
            (_, facilityIndex) => index !== facilityIndex
          ) || [],
      };
    });
  };

  const handleAddRule = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      setPlaceDetails((places) => {
        return {
          ...places,
          rules: places?.rules ? [...places.rules, newRule] : [newRule],
        };
      });
      setNewRule("");
      setIsAddRuleOpen(false);
    }
  };

  const handleDeleteRule = (index: number) => {
    setPlaceDetails((places) => {
      return {
        ...places,
        rules:
          places?.rules?.filter((_, ruleIndex) => index !== ruleIndex) || [],
      };
    });
  };

  const handleAddFacility = (facility: string) => {
    setPlaceDetails((places) => {
      return {
        ...places,
        facilities: places?.facilities
          ? [...places.facilities, facility]
          : [facility],
      };
    });
    setIsAddFacilityeOpen(false);
  };

  const handleAddPackage = (pkg: Package) => {
    console.log(pkg);
    setPlaceDetails((places) => {
      return {
        ...places,
        packages: places?.packages ? [...places.packages, pkg] : [pkg],
      };
    });
    setIsAddPackageOpen(false);
  };

  const handleDeletePackage = (index: number) => {
    setPlaceDetails((places) => {
      return {
        ...places,
        packages:
          places?.packages?.filter((_, pkgIndex) => index !== pkgIndex) || [],
      };
    });
    setIsAddPackageOpen(false);
  };

  const handleUpdatePackage = (index: number, pkg: Package) => {
    setPlaceDetails((places) => {
      return {
        ...places,
        packages:
          places?.packages?.map((currentPkg, pkgIndex) =>
            pkgIndex === index ? pkg : currentPkg
          ) || [],
      };
    });
    setIsEditPackageOpen(false);
  };

  const handleUpdatePlace = () => {
    fetchData("business/update", {
      method: "POST",
      type: "authenticated",
      body: placeDetails,
    });
  };

  useEffect(() => {
    fetchData("business/user/place", { method: "GET", type: "authenticated" });
  }, []);

  return (
    <>
      {businessPlace?.packages?.length === 0 && (
        <Box pt="0.5rem" px="2rem">
          <Typography
            fontWeight={"500"}
            bgcolor="#FF385C"
            color={"white"}
            p="1rem"
            textTransform={"uppercase"}
            letterSpacing={2}
          >
            Your Place Will Not Publish untill you add Packages
          </Typography>
        </Box>
      )}
      <Box p="2rem">
        <Typography
          fontSize="1.2rem"
          fontWeight="bold"
          mb="2rem"
          display="flex"
          alignItems="center"
          gap={2}
        >
          Your Place Details{" "}
          <Chip
            label={
              businessPlace?.packages?.length === 0
                ? "Unpublished"
                : "Published"
            }
            color={businessPlace?.packages?.length === 0?'warning':'success'}
            size="small"
          />
        </Typography>
        <Grid container gap={2}>
          <Grid item xs={12}>
            <Typography fontSize="1rem" mb="0.2rem">
              Place Title
            </Typography>
            <TextField
              size="small"
              fullWidth
              value={placeDetails.name}
              onChange={(e) => handleEdit("name", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize="1rem" mb="0.2rem">
              Place Description
            </Typography>
            <TextField
              value={placeDetails.description}
              fullWidth
              size="small"
              multiline
              onChange={(e) => handleEdit("description", e.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography fontSize="1rem">Packages</Typography>
              <Button onClick={() => setIsAddPackageOpen((p) => !p)}>
                Add
              </Button>
            </Box>
            {isAddPackageOpen && (
              <PackageInput
                onClick={handleAddPackage}
                type={"ADD"}
                index={0}
                onEdit={() => {}}
              />
            )}
            {isEditPackageOpen && (
              <PackageInput
                onClick={() => {}}
                type="EDIT"
                index={editPackageIndex}
                onEdit={handleUpdatePackage}
                dailyPrice={
                  placeDetails.packages
                    ? placeDetails.packages[editPackageIndex].dailyPrice
                    : 0
                }
                guestSize={
                  placeDetails.packages
                    ? placeDetails.packages[editPackageIndex].guestSize
                    : 0
                }
                isPetsAllowed={
                  placeDetails.packages
                    ? placeDetails.packages[editPackageIndex].isPetsAllowed
                    : false
                }
                name={
                  placeDetails.packages
                    ? placeDetails.packages[editPackageIndex].name
                    : ""
                }
                numberOfBeds={
                  placeDetails.packages
                    ? placeDetails.packages[editPackageIndex].numberOfBeds
                    : 0
                }
                numberOfRooms={
                  placeDetails.packages
                    ? placeDetails.packages[editPackageIndex].numberOfRooms
                    : 0
                }
              />
            )}
            <Grid container>
              {placeDetails.packages?.length === 0 && (
                <Typography>No Packages Added</Typography>
              )}
              {placeDetails.packages?.map((pkg, index) => {
                return (
                  <Grid item xs={6} key={pkg.name}>
                    <PackageCard
                      onEdit={() => {
                        setEditPackageIndex(index);
                        setIsEditPackageOpen((p) => !p);
                      }}
                      onDelete={() => {
                        handleDeletePackage(index);
                      }}
                      {...pkg}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography fontSize="1rem" mr="0.5rem">
                Facilities
              </Typography>
              <Button onClick={() => setIsAddFacilityeOpen((p) => !p)}>
                Add
              </Button>
            </Box>
            {isAddFacilityOpen && (
              <Box>
                <FacilitySelect
                  addFacility={(facility) => handleAddFacility(facility)}
                />
              </Box>
            )}
            {placeDetails.rules?.length === 0 && (
              <Typography>No Facilities Added</Typography>
            )}
            {placeDetails.facilities?.map((facility, index) => {
              return (
                <Box
                  key={facility}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  border={1}
                  borderRadius={1}
                  borderColor="#EAE9EE"
                  p="0.5rem"
                  my="0.4rem"
                >
                  <Typography>{facility}</Typography>
                  <IoIosCloseCircleOutline
                    onClick={() => handleDeleteFacility(index)}
                  />
                </Box>
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <Box display="flex" alignItems="center">
              <Typography fontSize="1rem" mr="0.5rem">
                Rules
              </Typography>
              <Button onClick={() => setIsAddRuleOpen((p) => !p)}>Add</Button>
            </Box>

            {isAddRuleOpen && (
              <Box>
                <TextField
                  size="small"
                  fullWidth
                  onKeyDown={handleAddRule}
                  onChange={(e) => setNewRule(e.target.value)}
                />
              </Box>
            )}
            {placeDetails.rules?.length === 0 && (
              <Typography>No Rules Added</Typography>
            )}
            {placeDetails.rules?.map((rule, index) => {
              return (
                <Box
                  key={rule}
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  border={1}
                  borderRadius={1}
                  borderColor="#EAE9EE"
                  p="0.5rem"
                  my="0.4rem"
                >
                  <Box display="flex" alignItems="center">
                    <PointIcon size={"1.5rem"} />
                    <Typography>{rule}</Typography>
                  </Box>
                  <IoIosCloseCircleOutline
                    onClick={() => handleDeleteRule(index)}
                  />
                </Box>
              );
            })}
          </Grid>
          <Grid item xs={12}>
            <Typography fontSize="1rem" mb="0.2rem">
              Location
            </Typography>
            <LocationBox
              location={{
                lat: businessPlace?.latitude || 0,
                lng: businessPlace?.longitude || 0,
              }}
              height={"400px"}
              width={"100%"}
            />
          </Grid>
          <Grid item xs={12} mb="2rem">
            <Button
              disabled={
                !(
                  placeDetails.name.length > 3 &&
                  placeDetails.description.length > 3 &&
                  placeDetails.packages &&
                  placeDetails.packages.length > 0 &&
                  placeDetails.facilities &&
                  placeDetails.facilities.length > 0 &&
                  placeDetails.rules &&
                  placeDetails.rules.length > 0
                )
              }
              onClick={handleUpdatePlace}
              variant="contained"
              sx={{
                backgroundColor: "#FF385C",
                borderRadius: 1,
                boxShadow: "none",
                px: "2rem",
                py: "0.5rem",
                "&:hover": {
                  backgroundColor: "#FF385C",
                },
              }}
            >
              Update Place Details
            </Button>
          </Grid>
        </Grid>
      </Box>
      {isLoading && (
        <Box
          sx={{
            position: "fixed",
            right: "5%",
            top: "5%",
            backgroundColor: "#FF385C",
            py: "0.5rem",
            px: "2rem",
            borderRadius: 1,
          }}
        >
          <Typography color={"white"}>Loading Latest Data...</Typography>
        </Box>
      )}
    </>
  );
};

export default MyPlace;
