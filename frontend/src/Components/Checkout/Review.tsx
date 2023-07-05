import { Typography, Grid } from '@mui/material';
import { useAppSelector } from '../../Configs/Redux/store';
import BasketSummary from '../Basket/BasketSummary';
import BasketTable from '../Basket/BasketTable';

export default function Review() {
  const { basket } = useAppSelector((state) => state.basket);
  return (
    <>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      {basket && <BasketTable items={basket.items} isBasket={false} />}
      <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
          {basket && <BasketSummary basket={basket} />}
        </Grid>
      </Grid>
    </>
  );
}
