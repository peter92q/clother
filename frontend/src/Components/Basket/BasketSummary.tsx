import { TableContainer, Paper, Table, TableBody, TableRow, TableCell } from '@mui/material'
import { Basket } from '../../Configs/Types/Basket';

type Props = {
    basket: Basket;
}

export default function BasketSummary({basket}: Props) {
  
  const subtotal = basket?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
  const deliveryFee = subtotal > 100 || subtotal < 1 ? 0 : 5;
  return (
    <TableContainer component={Paper} variant={'outlined'}>
        <Table className='border-[0.01rem] border-gray-700/40 z-[-10px]'>
            <TableBody>
                <TableRow>
                    <TableCell colSpan={2}>Subtotal</TableCell>
                    <TableCell align="right">{subtotal}.00$</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Delivery fee*</TableCell>
                    <TableCell align="right">{deliveryFee}.00$</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell colSpan={2}>Total</TableCell>
                    <TableCell align="right">{(subtotal + deliveryFee)}.00$</TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <span style={{ fontStyle: 'italic' }}>*Orders over $100 qualify for free delivery</span>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    </TableContainer>
  )
}
