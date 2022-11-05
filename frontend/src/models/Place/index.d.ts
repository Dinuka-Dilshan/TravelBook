export interface PlaceComment {
  time: string;
  content: string;
  _id: string;
  author: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
  };
}

export interface Place {
  _id: string;
  name: string;
  description: string;
  state: string;
  country: string;
  latitude: number;
  longitude: string;
  photos: string[];
  addedBy: {
    _id: string;
    name: string;
    email: string;
    profilePicture: string;
  };
  addedOn: string;
  comments: PlaceComment[];
}
