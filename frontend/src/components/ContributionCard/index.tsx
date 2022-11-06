import { LocationOn } from "@mui/icons-material";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PublicIcon from "@mui/icons-material/Public";
import { Grid, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useNavigate } from "react-router-dom";
import { capitalizeEachFirst } from "../../utils/string";

interface Props {
  image: string;
  addedOn: string;
  name: string;
  country: string;
  id: string;
}

const ContributionCard: React.FC<Props> = ({
  image,
  addedOn,
  country,
  name,
  id,
}) => {
  const navigate = useNavigate();
  const handleClick = () => navigate(`/places/${id}`);

  return (
    <Box
      onClick={handleClick}
      sx={{ cursor: "pointer" }}
      my="1rem"
      bgcolor={"primary.light"}
      borderRadius="0.3rem"
      display="flex"
      alignItems="center"
    >
      <Grid container borderRadius="0.3rem" width="100%">
        <Grid item xs={12} lg={3}>
          <img
            width={"100%"}
            height="100%"
            style={{ objectFit: "cover" }}
            src={image}
            alt=""
          />
        </Grid>
        <Grid item xs={6} lg={3} display="flex" alignItems="center" gap={1} p={'1rem'}>
          <PublicIcon />
          <Typography fontSize="1rem">{capitalizeEachFirst(name)}</Typography>
        </Grid>
        <Grid xs={6} lg={3} item display="flex" alignItems="center" p={'1rem'}>
          <LocationOn />
          <Typography fontSize="1rem">{country}</Typography>
        </Grid>
        <Grid xs={12} lg={3} item display="flex" alignItems="center" p={'1rem'}>
          <CalendarMonthIcon />
          <Typography fontSize="1rem">
            {formatDistanceToNow(parseISO(addedOn))}
          </Typography>
        </Grid>
      </Grid>
    </Box>
  );
};

export default ContributionCard;
