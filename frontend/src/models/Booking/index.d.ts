import { BusinessPlace } from "../BusinessPlace";
import { User } from "../User";

export interface Booking {
  package: {
    dailyPrice: number;
    guestSize: number;
    isPetsAllowed: boolean;
    numberOfRooms: number;
    numberOfBeds: number;
    name: string;
  };
  place?: BusinessPlace;
  customer?: User;
  placedOn: string;
  status: string;
  startDate: string;
  endDate: string;
  totalPrice?: number;
  _id: string;
}
