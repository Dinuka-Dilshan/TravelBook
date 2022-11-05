import { Box, LinearProgress } from "@mui/material";
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
    fetchData(`place/${placeID}`, { method: "GET", type:"authenticated" });
  }, [fetch]);

  return (
    <>
      {isLoading && <LinearProgress />}
      <Box
        sx={{ overflowY: "hidden", "&:hover": { overflowY: "scroll" } }}
        height={525}
      >
        {place?.comments.map((comment, index) => (
          <Message
            {...comment}
            placeID={placeID}
            key={index}
            refetch={reFetchData}
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
