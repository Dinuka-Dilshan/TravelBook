import { User } from "../User";
import { BusinessPlace } from "../BusinessPlace";

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
  totalPriece?: number;
  _id:string
}
