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
    fetchData(`place/${placeID}`, { method: "GET", useToken: true });
  }, [fetch]);

  return (
    <>
      {isLoading && <LinearProgress/>}
      <Box
        sx={{ overflowY: "hidden", "&:hover": { overflowY: "scroll" } }}
        height={525}
      >
        {place?.comments.map((comment, index) => (
          <Message
            key={index}
            time={comment.time}
            likeCount={5}
            image={comment.author.profilePicture}
            comment={comment.content}
            name={comment.author.name}
          />
        ))}
      </Box>
      <Box px="2rem" pt="2rem">
        {place?._id && <Comment placeID={place._id} refetch={reFetchData} />}
      </Box>
    </>
  );
};

export default CommentSecton;
