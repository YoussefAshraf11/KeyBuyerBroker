import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/home.jsx";
import Login from "./pages/Login/login.jsx";
import SignUP from "./pages/Signup/signup.jsx";
import ForgotPassword from "./pages/ForgetPassword/forgetpassword.jsx";
import ProjectShowcase from "./pages/Project Details/moredetailshome.jsx";
import Layout from "./components/Layout/layout.jsx";
import AboutUs from "./pages/aboutus/aboutus.jsx";
import TermsAndConditions from "./pages/TermsAndConditions/TermsAndConditions.jsx";
import ProjectsGrid from "./pages/ProjectsGrid/projectgrid.jsx";
import DevelopersGrid from "./pages/Residences/residences.jsx";
import AlexandriaMap from "./pages/InteractiveMap/interactivemap.jsx";
import PropertyList from "./pages/Listing/listing.jsx";
import Favourites from "./pages/Favourites/favourites.jsx";
import UnitDetails from "./pages/Unit Details/unitdetails.jsx";
import Schedule from "./pages/Schedule/schedule.jsx";
import MyAppointments from "./pages/MyAppointments/myappointments.jsx";
import Payment from "./pages/Payment/payment.jsx";
import Profile from "./pages/Profile/profile.jsx";
import ScrollToTop from "./components/ScrollToTop/scrolltotop.jsx";
import BrokerHomePage from "./pages/Broker/BrokerHomePage/brokerhomepage.jsx";
import BrokerAppointmentDetail from "./pages/Broker/BrokerAppointmentDetails/brokerappointmentdetails.jsx";
import ConfirmPaymentPage from "./pages/Broker/ConfirmPaymentPage/confirmpaymentpage.jsx";
import CompletedAppointments from "./pages/Broker/CompletedAppointments/completedappointments.jsx";
export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUP />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/project-details/:id" element={<ProjectShowcase />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/terms" element={<TermsAndConditions />} />
          <Route path="/realstate-projects" element={<ProjectsGrid />} />
          <Route path="/residences" element={<DevelopersGrid />} />
          <Route path="/map" element={<AlexandriaMap />} />
          <Route path="/listing" element={<PropertyList />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/unit-details/:id" element={<UnitDetails />} />
          <Route path="/schedule/:id" element={<Schedule />} />
          <Route path="/myappointments" element={<MyAppointments />} />
          <Route path="/payment/:id" element={<Payment />} />
          <Route path="/profile" element={<Profile />} />
          {/* Broker routes */}
          <Route path="/broker-home" element={<BrokerHomePage />} />
          <Route path="/broker/appointments/:id" element={<BrokerAppointmentDetail />} />
          <Route path="/confirm-payment" element={<ConfirmPaymentPage />} />
          <Route path="/completed-appointments" element={<CompletedAppointments />} />
          {/* 404 catch-all */}
          <Route
            path="*"
            element={
              <div className="min-h-screen flex items-center justify-center">
                <h1 className="text-2xl">Page Not Found</h1>
              </div>
            }
          />
        </Route>
      </Routes>
    </>
  );
}
