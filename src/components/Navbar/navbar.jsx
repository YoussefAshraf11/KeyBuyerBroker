// src/components/Navbar.jsx
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Home } from "lucide-react";
import brandLogo from "../../assets/logo.svg";

/* ——— routes that every broker should see ——— */
const BROKER_NAV = [
  { name: "My Appointments", path: "/broker-home" },
  { name: "Complete Payment", path: "/confirm-payment" },
  { name: "Completed Appointments", path: "/completed-appointments" },
];

/* ——— routes for normal users ——— */
const NAV_ITEMS = [
  { name: "Listing", path: "/listing" },
  { name: "My Appointments", path: "/myappointments" },
  { name: "Favourites", path: "/favourites" },
  { name: "Interactive Maps", path: "/map" },
];


export default function Navbar() {
  const navigate = useNavigate();
 
  const user = JSON.parse(localStorage.getItem("user"));
  const isBroker = user?.role === "broker";
  const homePath = isBroker ? "/broker-home" : "/";

  /* ——— BROKER VIEW ——— */
   const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload(); // optional: refresh to reset UI state
  };
if (isBroker) {
    return (
      <header className="w-full shadow-md text-white">
        {/* slim top stripe with Logout/Login + Home */}
        <div className="w-full bg-[#001731]">
          <div className="container mx-auto flex justify-end items-center gap-3 px-5 py-2">
              <Home
              size={20}
              strokeWidth={2.5}
              className="cursor-pointer"
              onClick={() => navigate(homePath)}
            />
            {user ? (
              <button
                onClick={handleLogout}
                className="text-sm font-medium hover:text-gold transition-colors"
              >
                Logout
              </button>
            ) : (
              <Link
                to="/login"
                className="text-sm font-medium hover:text-gold transition-colors"
              >
                Join / Log In
              </Link>
            )}

          
          </div>
        </div>

        {/* main stripe: logo left, links right */}
        <div className="w-full bg-primary">
          <div className="container mx-auto flex items-center justify-between px-4 py-4">
            {/* logo */}
            <Link to={homePath} className="flex items-center">
              <img
                src={brandLogo}
                alt="KeyFinder"
                className="h-35 w-auto select-none pointer-events-none"
              />
            </Link>

            {/* right-aligned nav */}
            <nav className="flex gap-8 text-xl font-bold">
              {BROKER_NAV.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `hover:text-gold transition-colors ${
                      isActive ? "text-gold" : ""
                    }`
                  }
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        </div>
      </header>
    );
  }

  /* ——— DEFAULT VIEW ——— */
  return (
    <header className="w-full shadow-md text-white">
      {/* slim top stripe */}
      <div className="w-full bg-[#001731]">
        <div className="container mx-auto flex justify-end items-center gap-2 px-4 py-2">
          <Home
            size={20}
            strokeWidth={2.5}
            className="cursor-pointer"
            onClick={() => navigate(homePath)}
          />
          {user ? (
            <Link
              to="/profile"
              className="flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors"
            >
              My Profile
            </Link>
          ) : (
            <Link
              to="/login"
              className="flex items-center gap-2 text-sm font-medium hover:text-gold transition-colors"
            >
              Join / Log In
            </Link>
          )}
        </div>
      </div>

      {/* main nav stripe */}
      <div className="w-full bg-primary">
        <div className="container mx-auto flex flex-col sm:flex-row sm:items-center sm:justify-between px-4 py-4 gap-6">
          <Link to={homePath} className="flex items-center">
            <img
              src={brandLogo}
              alt="KeyFinder"
              className="h-35 w-auto select-none pointer-events-none"
            />
          </Link>
          <nav className="flex flex-wrap justify-center sm:justify-end gap-8 text-sm font-medium uppercase tracking-wide">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) =>
                  `hover:text-gold transition-colors ${
                    isActive ? "text-gold" : ""
                  }`
                }
              >
                {item.name}
              </NavLink>
            ))}
          </nav>
        </div>
      </div>
    </header>
  );
}
