import { Delete } from '@mui/icons-material';
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  IconButton,
  CircularProgress,
} from '@mui/material';
import {
  removeBasketItemAsync,
  addBasketItemAsync,
} from '../../Configs/Redux/basketSlice';
import { useAppSelector, useAppDispatch } from '../../Configs/Redux/store';
import { BasketItem } from '../../Configs/Types/Basket';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface Props {
  items: BasketItem[];
  isBasket?: boolean;
}

export default function BasketTable({ items, isBasket = true }: Props) {
  const { status } = useAppSelector((state) => state.basket);
  const dispatch = useAppDispatch();
  return (
    <TableContainer
      component={Paper}
      className="border-[0.01rem] border-gray-700/40"
    >
      <Table sx={{ minWidth: 650 }}>
        <TableHead>
          <TableRow>
            <TableCell>Product</TableCell>
            <TableCell align="right">Price</TableCell>
            <TableCell align="center">Quantity</TableCell>
            <TableCell align="center">Size</TableCell>
            <TableCell align="right">Subtotal</TableCell>
            {isBasket && <TableCell align="right"></TableCell>}
          </TableRow>
        </TableHead>
        <TableBody>
          {items && items.map((item, index: number) => (
            <TableRow
              key={`${item.productId}+${index}`}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                <Box display="flex" alignItems="center">
                  <img
                    src={item.mainpic}
                    alt="itemPic"
                    style={{ height: 50, marginRight: 20 }}
                  />
                  <span>{item.name}</span>
                </Box>
              </TableCell>
              <TableCell align="right">${item.price}</TableCell>
              <TableCell align="center">
                {isBasket && (
                  <IconButton
                    className="h-[50px] w-[50px] absolute"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          size: item.size,
                          name: 'rem',
                        })
                      )
                    }
                  >
                    {status ===
                    'pendingRemoveItem' + item.size + item.productId + 'rem' ? (
                      <CircularProgress sx={{ padding: '10px' }} />
                    ) : (
                      <RemoveIcon />
                    )}
                  </IconButton>
                )}
                {item.quantity}
                {isBasket && (
                  <IconButton
                    className="h-[50px] w-[50px] absolute"
                    onClick={() =>
                      dispatch(
                        addBasketItemAsync({
                          productId: item.productId,
                          quantity: 1,
                          size: item.size,
                        })
                      )
                    }
                  >
                    {status ===
                    'pendingAddItem' + item.size + item.productId ? (
                      <CircularProgress sx={{ padding: '10px' }} />
                    ) : (
                      <AddIcon />
                    )}
                  </IconButton>
                )}
              </TableCell>
              <TableCell align="center">{item.size}</TableCell>
              <TableCell align="right">${item.price * item.quantity}</TableCell>
              {isBasket && (
                <TableCell align="right">
                  <IconButton
                    className="h-[50px] w-[50px] absolute"
                    onClick={() =>
                      dispatch(
                        removeBasketItemAsync({
                          productId: item.productId,
                          quantity: item.quantity,
                          size: item.size,
                          name: 'del',
                        })
                      )
                    }
                  >
                    {status ===
                    'pendingRemoveItem' + item.size + item.productId + 'del' ? (
                      <CircularProgress sx={{ padding: '10px' }} />
                    ) : (
                      <Delete />
                    )}
                  </IconButton>
                </TableCell>
              )}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
