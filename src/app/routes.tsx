import { createBrowserRouter } from "react-router";
import Home from "./pages/Home";
import BookRide from "./pages/BookRide";
import RideCategories from "./pages/RideCategories";
import BecomeDriver from "./pages/BecomeDriver";
import Pricing from "./pages/Pricing";
import About from "./pages/About";
import Contact from "./pages/Contact";
import UserDashboard from "./pages/UserDashboard";
import DriverDashboard from "./pages/DriverDashboard";
import AdminDashboard from "./pages/AdminDashboard";
import RideTracking from "./pages/RideTracking";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";
import { SupportDashboard } from "./pages/SupportDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  {
    path: "/book-ride",
    Component: BookRide,
  },
  {
    path: "/ride-categories",
    Component: RideCategories,
  },
  {
    path: "/become-driver",
    Component: BecomeDriver,
  },
  {
    path: "/pricing",
    Component: Pricing,
  },
  {
    path: "/about",
    Component: About,
  },
  {
    path: "/contact",
    Component: Contact,
  },
  {
    path: "/user-dashboard",
    Component: UserDashboard,
  },
  {
    path: "/driver-dashboard",
    Component: DriverDashboard,
  },
  {
    path: "/admin-dashboard",
    Component: AdminDashboard,
  },
  {
    path: "/support-dashboard",
    Component: SupportDashboard,
  },
  {
    path: "/track-ride/:rideId",
    Component: RideTracking,
  },
  {
    path: "/faq",
    Component: FAQ,
  },
  {
    path: "*",
    Component: NotFound,
  },
]);