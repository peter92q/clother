import { Grid } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import BasketSummary from '../Components/Basket/BasketSummary';
import BasketTable from '../Components/Basket/BasketTable';
import { useAppSelector } from '../Configs/Redux/store';
import { button } from '../Utils/Button';

export default function BasketPage() {
  const { user } = useAppSelector((state) => state.account);
  const { basket } = useAppSelector((state) => state.basket);
  const navigate = useNavigate();

  function proceed() {
    if (user) {
      navigate('/checkout');
    } else {
      navigate('/login', { state: { from: '/basket' } });
    }
  }

  if (!basket)
    return (
      <h1 className="h-[100vh] text-black text-[30px] flex justify-center items-center">
        Your basket is empty
      </h1>
    );

  return (
    <div className=" lg:px-10 px-5 pt-2">
      <BasketTable items={basket.items} />
      <Grid container>
        <Grid item xs={12} md={6} />
        <Grid item xs={12} md={6}>
          <BasketSummary basket={basket} />
          <button className={`${button} w-full`} onClick={proceed}>
            Checkout
          </button>
        </Grid>
      </Grid>
    </div>
  );
}
