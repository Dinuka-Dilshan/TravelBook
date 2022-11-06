import { Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import { formatDistanceToNow, parseISO } from "date-fns";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { PlaceComment } from "../../models/Place";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";
import AvatarLink from "../Avatar";

type Props = PlaceComment & { placeID: string; refetch: () => void };

const Message: React.FC<Props> = ({
  time,
  _id,
  author,
  content,
  placeID,
  refetch,
}) => {
  const user = useAppSelector(selectUser);
  const { isLoading, data, fetchData } = useFetch();
  const handleDelete = () => {
    fetchData(`place/comment`, {
      method: "DELETE",
      type: "authenticated",
      body: {
        commentID: _id,
        placeID: placeID,
      },
    });
  };

  useEffect(() => {
    if (isLoading || !data) return;
    refetch();
  }, [data, isLoading]);

  return (
    <Box
      display="flex"
      justifyContent="space-around"
      p="1rem"
      mb="1rem"
      position="relative"
    >
      <AvatarLink
        image={author.profilePicture}
        userID={author._id}
        name={author.name}
      />
      <Box
        p="1.5rem"
        bgcolor="#EAEAEA"
        mx="1rem"
        borderRadius="1rem"
        width={"100%"}
      >
        <Typography fontWeight="bold">{author.name}</Typography>
        <Typography mt="0.8rem">{content}</Typography>
        <Box
          position="absolute"
          bottom="-10%"
          display="flex"
          gap={5}
          p={"0.2rem"}
        >
          <Typography fontSize={"0.8rem"}>
            {formatDistanceToNow(parseISO(time), { addSuffix: true })}
          </Typography>
        </Box>
        {user._id === author._id && (
          <Box
            position="absolute"
            bottom="-10%"
            display="flex"
            gap={5}
            right="5%"
          >
            <Box
              width="fit-content"
              height="1.5rem"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Button
                onClick={handleDelete}
                sx={{
                  height: "1rem",
                  width: "100%",
                  borderRadius: "1.5rem",
                  p: "0.5rem",
                  color: "primary.main",
                  fontSize: "0.8rem",
                }}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Message;
