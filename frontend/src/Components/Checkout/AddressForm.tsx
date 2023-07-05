import { TextField, CircularProgress } from '@mui/material';
import axios from 'axios';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { clearBasket } from '../../Configs/Redux/basketSlice';
import { useAppDispatch } from '../../Configs/Redux/store';
import Success from './Success';
import PaymentForm from './PaymentForm';
import StepsWidget from './StepsWidget';
import { button, outlinedButton } from '../../Utils/Button';

interface SubmitOrderRequest {
  FullName: string;
  Address1: string;
  Address2: string;
  City: string;
  Country: string;
  Zip: string;
}

export default function AddressForm() {
  const dispatch = useAppDispatch();
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState();
  const [loading, setLoading] = useState<boolean>(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<SubmitOrderRequest>({
    mode: 'onBlur',
  });

  const submitOrder = async (data: SubmitOrderRequest) => {
    setLoading(true);
    const response = await axios.post('https://app.peter92.com:30001/api/Order', data);
    setStep(step + 1);
    setOrder(response.data);
    setLoading(false);
    dispatch(clearBasket());
    reset();
  };

  return (
    <>
      <StepsWidget step={step} />
      <form
        onSubmit={handleSubmit(submitOrder)}
        className="flex flex-col w-4/5 lg:w-[60vw] mx-auto gap-3 mt-2"
      >
        {step === 0 && (
          <>
            <TextField
              label="Full Name"
              {...register('FullName', { required: 'Full name is required' })}
              error={!!errors.FullName}
              helperText={errors.FullName?.message}
            />
            <TextField
              label="Address 1"
              {...register('Address1', { required: 'Address 1 is required' })}
              error={!!errors.Address1}
              helperText={errors.Address1?.message}
            />
            <TextField label="Address 2" {...register('Address2')} />
            <TextField
              label="City"
              {...register('City', { required: 'City is required' })}
              error={!!errors.City}
              helperText={errors.City?.message}
            />
            <TextField
              label="Country"
              {...register('Country', { required: 'Country is required' })}
              error={!!errors.Country}
              helperText={errors.Country?.message}
            />
            <TextField
              label="Zip"
              {...register('Zip', { required: 'Zip required' })}
              error={!!errors.Zip}
              helperText={errors.Zip?.message}
            />
          </>
        )}
        {step === 1 && <PaymentForm />}
        {step === 2 && step === 2 && order && <Success order={order} />}
        {step < 1 ? (
          <div className="flex flex-row w-full justify-end gap-2">
            <button
              className={`${button} ${
                !isValid && 'bg-gray-300 pointer-events-none'
              }`}
              onClick={() => setStep(step + 1)}
              disabled={!isValid}
            >
              Next
            </button>
          </div>
        ) : (
          step === 1 && (
            <div className="flex flex-row w-full justify-end gap-2 text-white">
              <button
                className={outlinedButton}
                onClick={() => setStep(step - 1)}
              >
                Back
              </button>
              <button className={`${button} w-[120px] py-1`} type="submit">
                {loading ? (
                  <CircularProgress color="info" size={20} />
                ) : (
                  'Send order'
                )}
              </button>
            </div>
          )
        )}
      </form>
    </>
  );
}
