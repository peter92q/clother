import { LocalShipping, AccessTime } from '@mui/icons-material';
import ForestIcon from '@mui/icons-material/Forest';

const DeliveryBanner = () => {
  return (
    <div className="rounded-sm shadow-md bg-gray-200/50 mb-5 relative z-10 max-w-[80%] mx-auto">
      <div className="p-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center items-center">
          <div className="text-center">
            <div className="flex justify-center">
              <LocalShipping fontSize="large" />
            </div>
            <h2 className="font-semibold text-lg mt-2">
              Free delivery for orders above 90$
            </h2>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <AccessTime fontSize="large" />
            </div>
            <h2 className="font-semibold text-lg mt-2">
              Express delivery in 2-3 business days
            </h2>
          </div>
          <div className="text-center">
            <div className="flex justify-center">
              <ForestIcon fontSize="large" />
            </div>
            <h2 className="font-semibold text-lg mt-2">
              All deliveries come in eco friendly packages
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryBanner;
