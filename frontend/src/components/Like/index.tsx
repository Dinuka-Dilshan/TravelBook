import FavoriteIcon from "@mui/icons-material/Favorite";
import { IconButton } from "@mui/material";
import { useEffect, useState } from "react";
import useFetch from "../../hooks/useFetch";
import { Place } from "../../models/Place";
import { useAppSelector } from "../../store/hooks";
import { selectUser } from "../../store/slices/authSlice";

interface Props {
  placeID: string;
  isLiked?: boolean;
  p?: string;
  isBusinessPlace?: boolean;
}

const Like: React.FC<Props> = ({ placeID, p, isBusinessPlace }) => {
  const { _id } = useAppSelector(selectUser);
  const [isLiked, setIsLiked] = useState(false);
  const { data, fetchData } = useFetch<Place[]>();
  const { fetchData: likeOrUnlikePlace } = useFetch();

  useEffect(() => {
    const place = data?.filter((place) => place._id === placeID)[0];
    if (place && _id) {
      setIsLiked(place.likedBy.includes(_id));
    }
  }, [placeID, data, _id]);

  useEffect(() => {
    fetchData(`${isBusinessPlace ? "business" : "place"}/likedPlaces`, {
      method: "GET",
      type: "authenticated",
    });
  }, [fetchData, placeID]);

  const likeToggleHandler = () => {
    setIsLiked((prev) => {
      if (prev) {
        likeOrUnlikePlace(
          `${isBusinessPlace ? "business" : "place"}/${placeID}/unLike`,
          {
            method: "POST",
            type: "authenticated",
          }
        );
      } else {
        likeOrUnlikePlace(
          `${isBusinessPlace ? "business" : "place"}/${placeID}/like`,
          {
            method: "POST",
            type: "authenticated",
          }
        );
      }

      return !prev;
    });
  };

  return (
    <IconButton onClick={likeToggleHandler} sx={{ p }}>
      <FavoriteIcon sx={{ color: isLiked ? "#FF5D7A" : "" }} />
    </IconButton>
  );
};

export default Like;
