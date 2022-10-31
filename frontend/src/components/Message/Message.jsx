import { Avatar, Button, Typography } from "@mui/material";
import { Box } from "@mui/system";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import { useState } from "react";
import { formatDistanceToNow, parseISO } from "date-fns";

const Message = ({ image, name, comment, likeCount, time }) => {
  // const [isLiked, setIsLiked] = useState(false);
  // const likeHandler = () => setIsLiked((p) => !p);
  return (
    <Box display="flex" justifyContent="space-around" p="1rem" mb="1rem">
      <Avatar src={image} />
      <Box
        p="1.5rem"
        bgcolor="#EAEAEA"
        mx="1rem"
        borderRadius="1rem"
        position="relative"
        width={"100%"}
      >
        <Typography fontWeight="bold">{name}</Typography>
        <Typography mt="0.8rem">{comment}</Typography>
        <Box
          position="absolute "
          bottom="-25%"
          display="flex"
          gap={5}
          p={"0.2rem"}
        >
          <Typography fontSize={"0.8rem"}>
            {formatDistanceToNow(parseISO(time), { addSuffix: true })}
          </Typography>
        </Box>
        <Box
          position="absolute"
          bottom="-25%"
          display="flex"
          gap={5}
          right="5%"
        >
          {/* <Box
            width="fit-content"
            height="1.5rem"
            borderRadius="1.5rem"
            display="flex"
            alignItems="center"
            justifyContent="center"
            bgcolor="#EAEAEA"
          >
            <Button
              onClick={likeHandler}
              sx={{
                height: "1.5rem",
                width: "100%",
                borderRadius: "1.5rem",
                p: "0.5rem",
                color: isLiked ? "primary" : "#000000",
              }}
            >
              <ThumbUpAltIcon
                fontSize="0.5rem"
                color={isLiked ? "primary" : "#000000"}
              />{" "}
              {likeCount}
            </Button>
          </Box> */}
        </Box>
      </Box>
    </Box>
  );
};

export default Message;
