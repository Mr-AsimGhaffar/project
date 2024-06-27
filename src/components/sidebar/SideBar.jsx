// src/components/Sidebar.jsx
import { useState, useContext } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { Link } from "react-router-dom";
import { appContext } from "@/contexts/Context";
import { CardDescription } from "../ui/card";
import { Avatar, AvatarImage } from "../ui/avatar";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { setAppState } = useContext(appContext);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
    setAppState((prevState) => ({ ...prevState, isSidebarOpen: !isOpen }));
  };

  const handleDashboardClick = () => {
    setAppState((prevState) => ({ ...prevState, showDashboard: true }));
    toggleSidebar();
  };
  const handleHomeClick = () => {
    setAppState((prevState) => ({ ...prevState, showHome: true }));
    toggleSidebar();
  };

  return (
    <>
      <div
        className="fixed top-0 left-0 p-4 cursor-pointer z-50"
        onClick={toggleSidebar}
      >
        <FaBars className="text-2xl text-black" />
      </div>
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-gray-800 text-white transition-transform transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div
          className="absolute top-4 right-4 cursor-pointer"
          onClick={toggleSidebar}
        >
          <FaTimes className="text-2xl" />
        </div>
        <div className="mt-12 font-semibold">
          <ul>
            <li className="p-5 cursor-pointer flex flex-col items-center justify-center">
              <Avatar>
                <AvatarImage src="/img/avatar2.png" alt="item img" />
              </Avatar>
              <p>Asim Ghaffar</p>
              <CardDescription>asim.ghaffar@gmail.com</CardDescription>
            </li>
          </ul>
        </div>
        <ul className="p-4">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to="/home" onClick={handleHomeClick}>
              Home
            </Link>
          </li>
        </ul>
        <ul className="p-4">
          <li className="hover:bg-gray-700 p-2 rounded cursor-pointer">
            <Link to="/dashboard" onClick={handleDashboardClick}>
              Dashboard
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default Sidebar;
