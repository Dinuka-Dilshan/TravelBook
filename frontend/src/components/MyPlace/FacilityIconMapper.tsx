import { AiOutlineWifi } from "react-icons/ai";
import { GiOfficeChair } from "react-icons/gi";
import { GiWashingMachine } from "react-icons/gi";
import { CgSmartHomeRefrigerator } from "react-icons/cg";
import { AiOutlineCar } from "react-icons/ai";
import { GiCooler } from "react-icons/gi";
import { RiComputerLine } from "react-icons/ri";
import { TbToolsKitchen } from "react-icons/tb";
import { RiServiceLine as Default } from "react-icons/ri";

interface Props {
  icon: string;
}

const FacilityIcons: React.FC<Props> = ({ icon }) => {
  const icons = {
    Kitchen: <TbToolsKitchen size={"1.5rem"} />,
    "Dedicated workspace": <GiOfficeChair size={"1.5rem"} />,
    Washer: <GiWashingMachine size={"1.5rem"} />,
    Refrigerator: <CgSmartHomeRefrigerator size={"1.5rem"} />,
    Wifi: <AiOutlineWifi size={"1.5rem"} />,
    "Free street parking": <AiOutlineCar size={"1.5rem"} />,
    "Air conditioning": <GiCooler size={"1.5rem"} />,
    TV: <RiComputerLine size={"1.5rem"} />,
  };

  return icons[icon as keyof typeof icons] || <Default size={"1.5rem"} />;
};

export default FacilityIcons;
