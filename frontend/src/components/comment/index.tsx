import {
  FormControl,
  InputAdornment,
  OutlinedInput,
  IconButton,
} from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import useFetch from "../../hooks/useFetch";
import { useEffect, useState } from "react";

interface Props {
  placeID: string;
  refetch: () => void;
}

const Comment: React.FC<Props> = ({ placeID, refetch }) => {
  const { isLoading, data, fetchData } = useFetch();
  const [comment, setComment] = useState("");

  const handleSend = () => {
    if (comment.length < 1) return;
    fetchData("place/comment", {
      body: {
        placeID,
        content: comment,
      },
      method: "POST",
      type: "authenticated",
    });
    setComment("");
  };

  useEffect(() => {
    if (isLoading) return;
    if (data) refetch();
  }, [isLoading, data]);

  return (
    <FormControl variant="outlined" fullWidth>
      <OutlinedInput
        disabled={isLoading}
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Type your comment here..."
        fullWidth
        id="outlined-adornment-password"
        endAdornment={
          <InputAdornment position="end">
            <IconButton edge="end" onClick={handleSend}>
              <SendIcon sx={{ transform: "rotate(-35deg)" }} />
            </IconButton>
          </InputAdornment>
        }
      />
    </FormControl>
  );
};

export default Comment;
