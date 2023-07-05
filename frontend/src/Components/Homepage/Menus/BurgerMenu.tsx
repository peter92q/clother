import MenuIcon from '@mui/icons-material/Menu';
import { useAppDispatch, useAppSelector } from '../../../Configs/Redux/store';
import { useState } from 'react';
import { signOut } from '../../../Configs/Redux/accountSlice';
import { clearBasket } from '../../../Configs/Redux/basketSlice';
import { useNavigate } from 'react-router-dom';
import CloseIcon from '@mui/icons-material/Close';
import AccountBoxIcon from '@mui/icons-material/AccountBox';
import ProductMenu from './ProductMenu';

export default function BurgerMenu() {
  const [menu, setMenu] = useState(false);
  const { user } = useAppSelector((state) => state.account);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const textLogic =
    'w-full text-[25px] px-4 py-2 text-gray-700 hover:bg-gray-100 text-center';

  return (
    <>
      <MenuIcon onClick={() => setMenu(!menu)} />
      <div
        className={`py-1 absolute z-10 top-0 right-0 bg-white
         w-[100vw] h-[100vh] overflow-y-auto flex justify-top flex-col menuWrapper ${
           !menu ? 'menuHidden' : ''
         }`}
      >
        <div
          className="w-full absolute flex justify-end items-end translate-y-[15px] translate-x-[-10px]"
          onClick={() => setMenu(!menu)}
        >
          <CloseIcon />
        </div>
        <div className="h-[20px]" />
        {user && (
          <>
            <div className="w-full text-[25px] font-normal px-4 py-2 text-gray-700 text-center">
              {user.email}
              <AccountBoxIcon className="translate-y-[-1px] ml-[2px]" />
            </div>
            <div className="w-full h-[0.01rem] bg-gray-700/40 z-10" />
            <button
              className={textLogic}
              onClick={() => {
                setMenu(!menu);
                navigate('/orders');
              }}
            >
              My orders
            </button>
          </>
        )}
        {!user && (
          <div className="flex flex-col ">
            <button
              onClick={() => {
                navigate('/register');
                setMenu(!menu);
              }}
              className={textLogic}
            >
              Register
            </button>
            <button
              className={textLogic}
              onClick={() => {
                navigate('/login'), { state: { from: '/' } };
                setMenu(!menu);
              }}
            >
              Login
            </button>
          </div>
        )}
        {user && (
          <button
            className={textLogic}
            onClick={() => {
              dispatch(signOut());
              dispatch(clearBasket());
              setMenu(!menu);
            }}
          >
            Logout
          </button>
        )}
        <div className="w-[80%] mx-auto">
          <ProductMenu/>
        </div> 
      </div>
    </>
  );
}
