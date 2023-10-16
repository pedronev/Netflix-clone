import AccountMenu from "./AccountMenu";
import MoblieMenu from "./MobileMenu";
import NavbarItem from "./NavbarItem";
import React, { useCallback, useState, useEffect } from "react";

import { BsChevronDown, BsSearch, BsBell } from "react-icons/bs";

const TOP_OFFSET = 66;

const Navbar = () => {
  const [showMoblieMenu, setShowMobileMenu] = useState(false);
  const [showAccountMenu, setAccountMenu] = useState(false);
  const [showBackground, setShowBackgorund] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY >= TOP_OFFSET) {
        setShowBackgorund(true);
      } else {
        setShowBackgorund(false);
      }
    };
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const toogleMobileMenu = useCallback(() => {
    setShowMobileMenu((current) => !current);
  }, []);

  const toogleAcoountenu = useCallback(() => {
    setAccountMenu((current) => !current);
  }, []);

  return (
    <nav className="w-full fixed z-40">
      <div
        className={`px-4 md:px-16 py-6 flex flex-row items-center transition duration-500 ${
          showBackground ? "bg-zinc-900 bg-opacity-90" : ""
        }`}
      >
        <img className="h-4 lg:h-7" src="/images/logo.png" alt="Logo" />

        <div className="flex-row ml-8 gap-7 hidden lg:flex">
          <NavbarItem label="Home" />
          <NavbarItem label="Series" />
          <NavbarItem label="Movies" />
          <NavbarItem label="New" />
          <NavbarItem label="My List" />
        </div>
        <div
          onClick={toogleMobileMenu}
          className="lg:hidden flex flex-row items-center gap-2 ml-8 cursor-pointer relative"
        >
          <p className="text-white text-sm">Browse</p>
          <BsChevronDown
            className={`text-white transition ${
              showMoblieMenu ? "rotate-180" : ""
            }`}
          />
          <MoblieMenu visible={showMoblieMenu} />
        </div>
        <div className="flex flex-row ml-auto gap-7 items-center">
          <div className="text-gray-300 cursor-pointer">
            <BsSearch />
          </div>
          <div className="text-gray-300 cursor-pointer">
            <BsBell className="text-gray-300 cursor-pointer" />
          </div>
          <div
            onClick={toogleAcoountenu}
            className="flex flex-row items-center gap-2 cursor-pointer relative"
          >
            <div className="w-6 h-6 lg:w-10 lg:h-10 rounded-md overflow-hidden">
              <img src="/images/default-blue.png" alt="profile" />
            </div>
            <BsChevronDown
              className={`text-white transition ${
                showAccountMenu ? "rotate-180" : ""
              }`}
            />
            <AccountMenu visible={showAccountMenu} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
