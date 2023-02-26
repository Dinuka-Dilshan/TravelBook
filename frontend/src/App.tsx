import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import InsightResult from "./components/ADMIN/InsightResult";
import Advertising from "./components/Advertising";
import Bookings from "./components/Bookings";
import BusinessProfile from "./components/BusinessProfile";
import Landing from "./components/Landing";
import MyPlace from "./components/MyPlace";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import AddPlace from "./pages/AddPlace";
import AdminDashBoard from "./pages/admin/AdminDashBoard";
import AdminLayout from "./pages/admin/AdminLayout";
import BusinessPlaces from "./pages/admin/BusinessPlaces";
import Insight from "./pages/admin/Insight";
import InsightCompare from "./pages/admin/InsightCompare";
import InsightCompareResult from "./pages/admin/InsightCompareResult";
import AdminPlaces from "./pages/admin/Places";
import Transactions from "./pages/admin/Transactions";
import Users from "./pages/admin/Users";
import DashBoard from "./pages/business/Dashboard";
import Layout from "./pages/business/Layout";
import BusinessPlaceDetails from "./pages/business/PlaceDetails";
import BusinessSignUp from "./pages/business/SignUp";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import PlaceDetails from "./pages/PlaceDetails";
import Places from "./pages/Places";
import Profile from "./pages/Profile";
import Search from "./pages/Search";
import SignUp from "./pages/SignUp";
import Trending from "./pages/Trending";
import UserDetails from "./pages/UserDetails";
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
          <Route path="/search" element={<Search />} />
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
      <Route element={<AdminLayout />}>
        <Route path="/admin" element={<RequireAuth allowedType="admin" />}>
          <Route path="dashboard" element={<AdminDashBoard />} />
          <Route path="transactions" element={<Transactions />} />
          <Route path="users" element={<Users />} />
          <Route path="places" element={<AdminPlaces />} />
          <Route path="business" element={<BusinessPlaces />} />
          <Route path="insight" element={<Insight />} />
          <Route path="insight/result" element={<InsightResult />} />
          <Route path="insight/compare" element={<InsightCompare />} />
          <Route
            path="insight/compareresult"
            element={<InsightCompareResult />}
          />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
