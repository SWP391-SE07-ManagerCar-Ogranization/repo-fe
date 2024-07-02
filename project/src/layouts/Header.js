import React, { useEffect, useState } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuHandler,
  Avatar,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import { Link, useNavigate } from "react-router-dom";
import {
  ChevronDownIcon,
  Cog6ToothIcon,
  LifebuoyIcon,
  PowerIcon,
  UserCircleIcon,
  WalletIcon
} from "@heroicons/react/24/solid";
import * as UserService from "../service/UserService";
import { toast } from "react-toastify";
import Logo from "../assets/image/logo.svg";

function ProfileMenu() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [profileInfo, setProfileInfo] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchProfileInfo();
  }, []);

  const profileMenuItems = [
    {
      label: "My Profile",
      icon: UserCircleIcon,
      path: "/profile",
    },
    {
      label: "Edit Profile",
      icon: Cog6ToothIcon,
      path: `update-user/${profileInfo?.accountId}`,
    },
    {
      label: "Wallet",
      icon: WalletIcon,
      path: "/wallet/your-wallet",
    },
    {
      label: "Help",
      icon: LifebuoyIcon,
      path: "/profile",
    },
    {
      label: "Sign Out",
      icon: PowerIcon,
      path: "/logout",
    },
  ];

  const fetchProfileInfo = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await UserService.getYourProfile(token);
      setProfileInfo(response.account);
    } catch (error) {
      console.error("Error fetching profile information:", error);
    }
  };
  const handleMenuItemClick = (path) => {
    setIsMenuOpen(false);
    if (path === "/logout") {
      toast.success("Logged out successfully!");
    }
    navigate(path);
  };

  return (
    <Menu open={isMenuOpen} handler={setIsMenuOpen} placement="bottom-end">
      <MenuHandler>
        <Button
          variant="text"
          color="blue-gray"
          className="flex items-center gap-1 rounded-full py-0.5 pr-2 pl-0.5 lg:ml-auto"
        >
          <Avatar
            variant="circular"
            size="sm"
            alt="tania andrew"
            className="border border-gray-900 p-0.5"
            src={profileInfo.image}
          />
          <ChevronDownIcon
            strokeWidth={2.5}
            className={`h-3 w-3 transition-transform ${
              isMenuOpen ? "rotate-180" : ""
            }`}
          />
        </Button>
      </MenuHandler>
      <MenuList className="p-1">
        {profileMenuItems.map(({ label, icon, path }, key) => {
          const isLastItem = key === profileMenuItems.length - 1;
          return (
            <MenuItem
              key={label}
              onClick={() => handleMenuItemClick(path)}
              className={`flex items-center gap-2 rounded ${
                isLastItem
                  ? "hover:bg-red-500/10 focus:bg-red-500/10 active:bg-red-500/10"
                  : ""
              }`}
            >
              {React.createElement(icon, {
                className: `h-4 w-4 ${isLastItem ? "text-red-500" : ""}`,
                strokeWidth: 2,
              })}
              <Typography
                as="span"
                variant="small"
                className="font-normal"
                color={isLastItem ? "red" : "inherit"}
              >
                {label}
              </Typography>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}

export default function StickyNavbar() {
  const navigate = useNavigate();
  const [openNav, setOpenNav] = React.useState(false);

  React.useEffect(() => {
    window.addEventListener(
      "resize",
      () => window.innerWidth >= 960 && setOpenNav(false)
    );
  }, []);
  const handleSignUpClick = (e) => {
    navigate("/registration");
  };
  const handleLoginClick = (e) => {
    navigate("/login");
  };

  const navList = (localStorage.getItem("role") === 'DRIVER') ? (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/working-page" className="flex items-center">
          Working
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/track-revenue" className="flex items-center">
          Track Revenue
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          History Trip
        </a>
      </Typography>
    </ul>
  ) : (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Pages
        </a>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/booking-driver" className="flex items-center">
          Booking
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <Link to="/home-car-pool" className="flex items-center">
          Carpool
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="p-1 font-normal"
      >
        <a href="#" className="flex items-center">
          Docs
        </a>
      </Typography>
    </ul>
  );

  return (
    <div className="sticky top-0" style={{zIndex: "100"}}>
      <Navbar className="h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4">
        <div className="flex items-center justify-between text-blue-gray-900">
          <Link to="/">
            <img src={Logo} alt="logo-ct" className="w-20 h-fit" />
          </Link>
          <div className="flex items-center gap-4" style={{zIndex: "100"}}>
            <div className="mr-4 hidden lg:block">{navList}</div>
            <div className="flex items-center gap-x-1">
              {localStorage.getItem("token") ? (
                <ProfileMenu />
              ) : (
                <div>
                  <Button
                    variant="text"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={handleLoginClick}
                  >
                    <span>Log In</span>
                  </Button>
                  <Button
                    variant="gradient"
                    size="sm"
                    className="hidden lg:inline-block"
                    onClick={handleSignUpClick}
                  >
                    <span>Sign up</span>
                  </Button>
                </div>
              )}
            </div>
            <IconButton
              variant="text"
              className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden"
              ripple={false}
              onClick={() => setOpenNav(!openNav)}
            >
              {openNav ? (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  className="h-6 w-6"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </IconButton>
          </div>
        </div>
        <MobileNav open={openNav}>
          {navList}
          <div className="flex items-center gap-x-1">
            <Button
              fullWidth
              variant="text"
              size="sm"
              className=""
              onClick={handleLoginClick}
            >
              <span>Log In</span>
            </Button>
            <Button
              fullWidth
              variant="gradient"
              size="sm"
              className=""
              onClick={handleSignUpClick}
            >
              <span>Sign up</span>
            </Button>
          </div>
        </MobileNav>
      </Navbar>
    </div>
  );
}
