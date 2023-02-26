import { Booking } from "../Booking";
import { BusinessPlace, customerBooking } from "../BusinessPlace";
import { Place } from "../Place";
import { User } from "../User";

export interface AdminDashBoardResponse {
  bookings: Booking[];
  hotels: BusinessPlace[];
  places: Place[];
  users: User[];
  views: number;
  totalCustomers: number;
  totalBookings: number;
  totalHotels: number;
  totalPlaces: number;
  monthlyBookings: { _id: number; income: number }[];
  genderWise: { male: number; female: number };
  customerBookings: customerBooking[];
  monthlyBusinessViews: { _id: number; views: number }[];
  monthlyPlaceViews: { _id: number; views: number }[];
}

export type TransactionResponse = Booking[];

export type UsersResponse = User[];

export type PlacesResponse = Place[];

export type BusinessPlacewithBookings = BusinessPlace & { bookings: Booking[] };

export type BusinessPlacesResponse = BusinessPlacewithBookings[];

export type InsightSearchResponse = {
  type: "Business" | "Normal";
  places: Place[];
};

export type InsightReportResponse = {
  ageViews: { _id: string; views: number }[];
  countryViews: { _id: string; views: number }[];
  genderViews: { _id: string; views: number }[];
  monthlyPlaceViews: { month: string; views: number }[];
  monthlyBookings?: { month: string; income: number }[];
  place: Place;
};
