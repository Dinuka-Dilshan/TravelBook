import {
  Container,
  FormControl,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  OutlinedInput,
  Typography,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useParams } from "react-router-dom";

import { placeImages } from "../dummyData";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import { Box } from "@mui/system";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import { useState } from "react";
import ShareLocation from "../components/ShareLocation/ShareLocation";
import Message from "../components/Message/Message";
import { messages } from "../dummyData";
import StarIcon from "@mui/icons-material/Star";
import AddRating from "../components/AddRating";
import ViewLocation from "../components/ViewLocation/ViewLocation";

const srcset = (image:string, size:number, rows = 1, cols = 1) => {
  return {
    src: `${image}?w=${size * cols}&h=${size * rows}&fit=crop&auto=format`,
    srcSet: `${image}?w=${size * cols}&h=${
      size * rows
    }&fit=crop&auto=format&dpr=2 2x`,
  };
};

const PlaceDetails = () => {
  const { placeId } = useParams();

  console.log(placeId);

  const [iconButtonStatus, setIconButtonStatus] = useState({
    isShareOpen: false,
    isRaingOpen: false,
    isHeartClicked: false,
    isLocationOpen: false,
  });

  const shareClickHandler = () => {
    setIconButtonStatus((prev) => ({
      ...prev,
      isShareOpen: !prev.isShareOpen,
    }));
  };

  const heartClickHandler = () => {
    setIconButtonStatus((prev) => ({
      ...prev,
      isHeartClicked: !prev.isHeartClicked,
    }));
  };

  const ratingClickHandler = () => {
    setIconButtonStatus((prev) => ({
      ...prev,
      isRaingOpen: !prev.isRaingOpen,
    }));
  };

  const locationClickHandler = () => {
    setIconButtonStatus((prev) => ({
      ...prev,
      isLocationOpen: !prev.isLocationOpen,
    }));
  };

  return (
    <Container sx={{ px: "4rem", pt: "1.5rem" }}>
      {iconButtonStatus.isShareOpen && (
        <ShareLocation
          link={window.location.href}
          onClose={() => {
            setIconButtonStatus((prev) => ({
              ...prev,
              isShareOpen: false,
            }));
          }}
        />
      )}

      {iconButtonStatus.isRaingOpen && (
        <AddRating
          onClose={() => {
            setIconButtonStatus((prev) => ({
              ...prev,
              isRaingOpen: false,
            }));
          }}
        />
      )}

      {iconButtonStatus.isLocationOpen && (
        <ViewLocation
          onClose={() => {
            setIconButtonStatus((prev) => ({
              ...prev,
              isLocationOpen: false,
            }));
          }}
        />
      )}
      <Grid container mb="2rem">
        <Grid item xs={12} lg={6}>
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography fontSize="1.5rem">Sigiriya</Typography>
            <Box
              display="flex"
              justifyContent="space-between"
              gap={2}
              alignItems="center"
            >
              <IconButton>
                <AddAPhotoIcon />
              </IconButton>
              <IconButton onClick={locationClickHandler}>
                <LocationOnIcon />
              </IconButton>
              <IconButton onClick={heartClickHandler}>
                <FavoriteIcon
                  sx={{
                    color: iconButtonStatus.isHeartClicked ? "#FF5D7A" : "",
                  }}
                />
              </IconButton>
              <IconButton onClick={ratingClickHandler}>
                <StarIcon />
              </IconButton>
              <IconButton onClick={shareClickHandler}>
                <ShareIcon />
              </IconButton>
            </Box>
          </Box>
          <ImageList
            sx={{ width: "100%", height: 500 }}
            variant="quilted"
            cols={4}
            rowHeight={121}
          >
            {placeImages.map((item) => (
              <ImageListItem
                key={item.img}
                cols={item.cols || 1}
                rows={item.rows || 1}
              >
                <img
                  {...srcset(item.img, 121, item.rows, item.cols)}
                  alt={item.title}
                  loading="lazy"
                />
              </ImageListItem>
            ))}
          </ImageList>
          <Box display="flex" alignItems="center" gap={1} mb="1rem">
            <StarIcon fontSize="small" />
            <Typography fontSize="0.8rem">4.5</Typography>
          </Box>
          <Typography>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ducimus
            ullam quo commodi aliquid voluptatibus magnam maxime dolorem, eius
            sunt minima doloremque! Cumque blanditiis quidem sequi aspernatur
            sed dolores repudiandae molestias. Impedit deleniti, eveniet totam
            recusandae saepe iure velit consequuntur iusto doloribus accusantium
            vero incidunt repudiandae in officia eos perferendis eius.
          </Typography>
        </Grid>
        <Grid item xs={6} mt="2rem">
          <Box
            sx={{ overflowY: "hidden", "&:hover": { overflowY: "scroll" } }}
            height={525}
          >
            {messages.map((item, index) => (
              <Message
                key={index}
                time={item.time}
                likeCount={item.likeCount}
                image={item.image}
                comment={item.comment}
                name={item.name}
              />
            ))}
          </Box>
          <Box px="2rem" pt="2rem">
            <FormControl sx={{ m: 1 }} variant="outlined" fullWidth>
              <OutlinedInput
                placeholder="Type your comment here..."
                fullWidth
                id="outlined-adornment-password"
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SendIcon sx={{ transform: "rotate(-35deg)" }} />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};

export default PlaceDetails;
