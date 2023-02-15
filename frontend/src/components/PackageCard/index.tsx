import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { Package } from "../../models/BusinessPlace";
import { SiCashapp } from "react-icons/si";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { AiOutlineEdit } from "react-icons/ai";


interface Props {
  onDelete: () => void;
  onEdit:()=>void
}

const PackageCard: React.FC<Package & Props> = ({
  dailyPrice,
  guestSize,
  isPetsAllowed,
  name,
  numberOfBeds,
  numberOfRooms,
  onDelete,
  onEdit
}) => {
  return (
    <Box p="1rem" border={1} borderRadius={1} borderColor="#EAE9EE" m="0.4rem">
      <Box display='flex' justifyContent='flex-end' gap={2}>
        <AiOutlineEdit onClick={onEdit} style={{cursor:'pointer'}}/>
        <IoIosCloseCircleOutline onClick={onDelete} style={{cursor:'pointer'}}/>
      </Box>
      <Typography fontSize="1rem" fontWeight="bold">
        {name}
      </Typography>
      <Typography fontSize="1rem">LKR {dailyPrice} per day</Typography>
      <Typography fontSize="0.9rem">Guest Size: {guestSize}</Typography>
      <Typography fontSize="0.9rem">Number of Beds: {numberOfBeds}</Typography>
      <Typography fontSize="0.9rem">
        Number of Rooms: {numberOfRooms}
      </Typography>
      <Typography fontSize="0.9rem">
        {isPetsAllowed ? "Pets Are Allowed" : "Pets Are Not Allowed"}
      </Typography>
    </Box>
  );
};

export default PackageCard;
