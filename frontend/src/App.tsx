import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import Landing from "./components/Landing";
import RequireAuth from "./components/RequireAuth/RequireAuth";
import AddPlace from "./pages/AddPlace";
import Hotels from "./pages/Hotels";
import Login from "./pages/Login";
import MainLayout from "./pages/MainLayout";
import PlaceDetails from "./pages/PlaceDetails";
import Places from "./pages/Places";
import Trending from "./pages/Trending";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route path="/" element={<Landing />} />
      <Route element={<MainLayout />}>
        <Route path="/login" element={<Login />} />
        <Route element={<RequireAuth />}>
          <Route path="/places" element={<Places />} />
          <Route path="/addplace" element={<AddPlace />} />
          <Route path="/hotels" element={<Hotels />} />
          <Route path="/trending" element={<Trending />} />
          <Route path="/places/:id" element={<PlaceDetails />} />
        </Route>
      </Route>
    </Route>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

export default App;
