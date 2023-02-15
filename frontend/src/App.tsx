import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Advertising from "./components/Advertising";
import Bookings from "./components/Bookings";
import BusinessProfile from "./components/BusinessProfile";
import Landing from "./components/Landing";
import MyPlace from "./components/MyPlace";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import AddPlace from "./pages/AddPlace";
import DashBoard from "./pages/business/Dashboard";
import Layout from "./pages/business/Layout";
import BusinessSignUp from "./pages/business/SignUp";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import PlaceDetails from "./pages/PlaceDetails";
import Places from "./pages/Places";
import Profile from "./pages/Profile";
import SignUp from "./pages/SignUp";
import Trending from "./pages/Trending";
import UserDetails from "./pages/UserDetails";
import BusinessPlaceDetails from "./pages/business/PlaceDetails";
import ViewMyBookings from "./pages/ViewMyBookings";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route path="/login" element={<Login />} />
      <Route path="/join" element={<SignUp />} />
      <Route path="/business/join" element={<BusinessSignUp />} />
      <Route element={<MainLayout />}>
        <Route element={<RequireAuth allowedType="normalUser" />}>
          <Route path="/places" element={<Places />} />
          <Route path="/addplace" element={<AddPlace />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/bookings" element={<ViewMyBookings />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/places/:id" element={<PlaceDetails />} />
          <Route path="/hotels/:id" element={<BusinessPlaceDetails />} />
          <Route path="/user/:id" element={<UserDetails />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>
      <Route element={<Layout />}>
        <Route
          path="/business"
          element={<RequireAuth allowedType="businessUser" />}
        >
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="myplace" element={<MyPlace />} />
          <Route path="bookings" element={<Bookings />} />
          <Route path="advertising" element={<Advertising />} />
          <Route path="profile" element={<BusinessProfile />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
