import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
  remove,
  selectNotification,
} from "../../store/slices/notificationSlice";
import CloseIcon from "@mui/icons-material/Close";

const colors = new Map();
colors.set("ERROR", "#D32F2F");
colors.set("WARNING", "#ED6C02");
colors.set("INFORMATION", "#0288D1");
colors.set("SUCCESS", "#2E7D32");

const Notification = () => {
  const notifications = useSelector(selectNotification);
  const dispatch = useDispatch();
  
  return (
    <>
      {notifications.map((notification, index) => {
        return (
          <Box
            key={index}
            position={"fixed"}
            top={`${10 + index * 10}%`}
            left="50%"
            sx={{ transform: "translateX(-50%)" }}
            width="25rem"
            height={"3rem"}
            bgcolor={colors.get(notification.type)}
            borderRadius="0.8rem"
            display={"flex"}
            justifyContent="space-between"
            alignItems={"center"}
            p="0.2rem"
            px="1rem"
            boxShadow={
              "rgba(0, 0, 0, 0.2) 0px 3px 5px -1px, rgba(0, 0, 0, 0.14) 0px 6px 10px 0px, rgba(0, 0, 0, 0.12) 0px 1px 18px 0px"
            }
          >
            <Typography
              fontWeight={"bold"}
              color="white"
              letterSpacing={"0.1rem"}
            >
              {notification.message.toString()}
            </Typography>
            <CloseIcon
              sx={{ color: "white" }}
              onClick={() => {
                dispatch(remove(index));
              }}
            />
          </Box>
        );
      })}
    </>
  );
};

export default Notification;
