import { ReactNode, useCallback, useEffect } from 'react'
import { fetchCurrentUser } from '../Configs/Redux/accountSlice';
import { fetchBasketAsync } from '../Configs/Redux/basketSlice';
import { useAppDispatch } from '../Configs/Redux/store';
import Footer from './Footer';
import Navbar from './Navbar';
import Cookies from 'js-cookie';

interface Children {
    children: ReactNode;
}

const Layout = ({children}: Children) => {
  const dispatch = useAppDispatch();

  const initApp = useCallback(async()=>{
    const cookieUser = Cookies.get('user');
    if(cookieUser){
      try {
        await dispatch(fetchCurrentUser());
        await dispatch(fetchBasketAsync());
      } catch (error: any) {
        console.log(error)
      }
     }
     else{
      await dispatch(fetchBasketAsync());
     }
  },[dispatch])

  useEffect(()=>{
    initApp();
  },[initApp])
  
  return (
    <div className="min-h-screen bg-white"> 
      <Navbar/>
      <div className='h-[65px]'/>
        {children}
        <Footer/>
    </div>
    
  )
}

export default Layout;

