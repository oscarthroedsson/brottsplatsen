import logo from "../icons/logo.svg";
import compIcon from "../icons/compIcon.svg";
import menuIcon from "../icons/menuIcon.svg";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//Adjust the nav depending on the size of the screen
export default function Nav() {
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  const handleMenuIconClick = () => {
    setMenuVisible(!menuVisible);
  };

  const handleDocumentClick = (e) => {
    if (menuVisible && menuRef.current && !menuRef.current.contains(e.target)) {
      setMenuVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleDocumentClick);
    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [menuVisible]);
  //funktionell kod
  return (
    <>
      <nav className="w-full flex justify-between items-center px-3 py-5 xxl:px-10">
        <div className="flex justify-between items-center w-full">
          <Link to="/" className="">
            <img
              id="mobileImg"
              src={compIcon}
              alt="brottskollens icon för  att ta dig till startsidan"
              className="xs:w-10 md:hidden"
            />
            <img
              id="desktopImg"
              src={logo}
              alt="Brottsplattsen.se logga med en sköld och företagsnamnet"
              className="xs:hidden md:block md:w-40 lg:w-60"
            />
          </Link>
          {/* <input
            type="text"
            name="search"
            id="searchbar"
            placeholder="Sök på brott/stad/kommun"
            className="xs:h-8 w-2/3 xl:w-3/5 md:text-size1-p md:py-5 md:px-5 outline-none bg-gray-100 px-2 rounded-md pointer-events-auto"
          /> */}
          {/* //*Burger menu för <1000px skärm */}
          <button>
            <img
              src={menuIcon}
              alt=""
              onClick={handleMenuIconClick}
              className="w-9 xl:hidden"
            />
          </button>
          {/* //*Menyknappar för 1000px skärm */}
          <ul className="xs:hidden xl:flex flex gap-5">
            <li className="hover:text-main-color">
              <a href="#">Om oss</a>
            </li>
            <Link to="/databas">
              <li className="hover:text-main-color">Databas</li>
            </Link>
            <li className="hover:text-main-color">
              <a href="#">Kontakt</a>
            </li>
          </ul>
        </div>
      </nav>
      {/* Menubox */}
      {menuVisible && (
        <div className="xs">
          <ul className="flex flex-col text-center gap-2 absolute bg-white w-full pb-5 ">
            <li className="hover:text-white hover:bg-main-color p-2">
              <a href="#">Om oss</a>
            </li>
            <li className="hover:text-white hover:bg-main-color p-2">
              <a href="#">Databas</a>
            </li>
            <li className="hover:text-white hover:bg-main-color p-2">
              <a href="#">Kontakt</a>
            </li>
          </ul>
        </div>
      )}
    </>
    //visuella
  );
}
