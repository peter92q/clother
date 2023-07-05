import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../../Configs/Redux/accountSlice";
import { clearBasket } from "../../../Configs/Redux/basketSlice";
import { useAppDispatch, useAppSelector } from "../../../Configs/Redux/store";
import AccountBoxIcon from '@mui/icons-material/AccountBox';

export default function SignedInMenu() {
  const dispatch = useAppDispatch();
  const [menu, setMenu] = useState(false);
  const { user } = useAppSelector((state) => state.account);
  const menuRef = useRef(null);

  const handleClick = () => {
    setMenu(prev=>!prev);
  };

  return (
    <>
      <button
        className="text-[#45494c] text-[20px] pt-[2px] focus:outline-none"
        onClick={handleClick}
      >
        <span>{user?.email}<AccountBoxIcon className="translate-y-[-1px] ml-[2px]"/></span>
      </button>
      {menu && (
        <div
          ref={menuRef}
          className="absolute translate-x-4 translate-y-20 lg:translate-y-14 w-50 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5"
        >
          <div className="py-1">
            <Link 
              to="orders" 
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
              onClick={()=>setMenu(!menu)}
              >
              My orders
            </Link>
            <button
              className="block w-full text-left px-4 py-2 
              text-sm text-gray-700 hover:bg-gray-100"
              onClick={() => {
                dispatch(signOut());
                dispatch(clearBasket());
                handleClick();
              }}
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
}
