import logo from "../icons/logo.svg";
import compIcon from "../icons/compIcon.svg";
import menuIcon from "../icons/menuIcon.svg";
import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

//Adjust the nav depending on the size of the screen
export default function Nav() {
  //Controll if the drop-down nav is visible
  const [menuVisible, setMenuVisible] = useState(false);
  const menuRef = useRef(null);

  //show dropdown when clicked
  const handleMenuIconClick = () => {
    setMenuVisible(!menuVisible);
  };

  //hide dropdown when clicked outside
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
  }, [menuVisible]); //! se över deps array

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
          <button>
            <img
              src={menuIcon}
              alt=""
              onClick={handleMenuIconClick}
              className="w-9 xl:hidden"
            />
          </button>
        </div>
      </nav>
    </>
  );
}
