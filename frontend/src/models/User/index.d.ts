import { Place } from "../Place";

export interface User {
  _id: string;
  name: string;
  email: string;
  joinedDate: string;
  state: string;
  country: string;
  birthDate: string;
  gender: string;
  profilePicture: string;
  userType: "admin" | "normalUser" | "businessUser" | string;
  bio: string;
  viewRecords: { time: string; place: string; _id: string }[];
  favouritePlaces: Place[];
  nationalID?:string
}

export type UserProfile = Omit<User, "viewRecords"> & {
  viewRecords: { time: string; place: Place; _id: string }[];
};
