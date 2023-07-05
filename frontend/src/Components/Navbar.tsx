import { IconButton, Badge, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import SignedInMenu from './Homepage/Menus/SignedInMenu';
import { useAppSelector } from '../Configs/Redux/store';
import BurgerMenu from './Homepage/Menus/BurgerMenu';
import { button, outlinedButton } from '../Utils/Button';

export default function Navbar() {
  const {user} = useAppSelector(state=>state.account);
  const {basket} = useAppSelector(state=>state.basket);
  const itemCount = basket?.items.reduce((sum, item)=>sum+item.quantity,0)
  const isMobileScreen = useMediaQuery("(max-width: 640px)");
  const navigate = useNavigate();
  
  return (
    <div className='fixed z-[100] bg-white/70 
    w-full h-[7vh] flex flex-row px-[13px] font-thin 
    justify-between items-center pb-8 pt-8 z-100'>
    <Link to='/'>
      <img src="/logo.jpg" alt="Clother_logo" className='h-[60px]'/>
    </Link> 
    <div className='flex flex-row justify-center items-center gap-2'>
    <IconButton 
      component={Link} 
      to='/basket' 
      size='medium' 
      sx={{color: 'ActiveBorder'}} 
      disabled={!itemCount}
      >  
       <Badge badgeContent={itemCount} color='error'>
        <ShoppingBagIcon className='text-[#45494c]'/>
       </Badge> 
     </IconButton>
     {/*Menu if defined by 2 factors: is the user logged in, is the screen small*/}
    {!isMobileScreen
    ? 
      user?
      <SignedInMenu/> 
      :
      <>
      <button 
       className={button} 
       onClick={()=>navigate('/register')}
      >
       Register
      </button>
      <button 
        className={outlinedButton}
        onClick={()=>navigate('/login')}
        >
          Login
        </button>
      </>
    : 
     <BurgerMenu/>
    } 
    </div>
  </div>
  )
}
