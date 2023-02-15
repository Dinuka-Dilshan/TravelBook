import { Box, LinearProgress, Typography } from "@mui/material";
import Message from "../Message/Message";
import Comment from "../comment";
import useFetch from "../../hooks/useFetch";
import { Place } from "../../models/Place";
import { useEffect, useState } from "react";

interface Props {
  placeID: string;
}

const CommentSecton: React.FC<Props> = ({ placeID }) => {
  const { isLoading, data: place, fetchData } = useFetch<Place>();
  const [fetch, setFetch] = useState(false);

  const reFetchData = () => setFetch((p) => !p);

  useEffect(() => {
    fetchData(`place/${placeID}`, { method: "GET", type: "authenticated" });
  }, [fetch]);

  return (
    <>
      {isLoading && (
        <LinearProgress
          sx={{
            background: "linear-gradient(to right, red, purple)",
            height: "0.1rem",
          }}
        />
      )}
      <Box
        sx={{
          overflowY: "hidden",
          "&:hover": { overflowY: "scroll" },
          height: { lg: 525, xs: "fit-content" },
        }}
      >
        {place?.comments.length === 0 && (
          <Box
            width={"100%"}
            height="60vh"
            display={"flex"}
            justifyContent="center"
            alignItems="center"
          >
            <Typography
              fontSize={"1.5rem"}
              fontWeight={"bold"}
              fontFamily={"Poor Story, cursive"}
            >
             No Comments published for this places yet!
            </Typography>
          </Box>
        )}
        {place?.comments.map((comment, index) => (
          <Message
            {...comment}
            placeID={placeID}
            key={index}
            refetch={reFetchData}
          />
        ))}
      </Box>
      <Box sx={{ px: { lg: "2rem", xs: "0.5rem" } }} pt="2rem">
        {place?._id && <Comment placeID={place._id} refetch={reFetchData} />}
      </Box>
    </>
  );
};

export default CommentSecton;
