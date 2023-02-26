import { Booking } from "../Booking";
import { Place, PlaceComment } from "../Place";
import { User } from "../User";

interface Package {
  dailyPrice: number;
  guestSize: number;
  isPetsAllowed: boolean;
  numberOfRooms: number;
  numberOfBeds: number;
  name: string;
}

export interface BusinessPlace {
  _id: string;
  name: string;
  facilities?: string[];
  rules?: string[];
  packages?: Package[];
  description: string;
  state: string;
  country: string;
  latitude: number;
  longitude: number;
  photos: string[];
  addedBy: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
  };
  addedOn: string;
  comments: PlaceComment[];
  viewRecords: { time: string; user: string }[];
  likedBy: string[];
  isLiked?: boolean;
  ratings: { amount: number; user: string }[];
}

export type customerBooking = Omit<User & Booking, "viewRecords">;

export interface DashboardResponse {
  comments: number;
  likes: number;
  rate: number;
  totalIncome: number;
  views: number;
  ratings: { amount: number; user: string }[];
  monthlyBookings: { _id: number; income: number }[];
  genderWise: { male: number; female: number };
  customerBookings: customerBooking[];
  popularPackages: { name: string; value: number }[];
}
