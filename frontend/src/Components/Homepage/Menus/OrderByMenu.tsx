import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { bgLogic, headerTextLogic } from "./MenuStyles";

interface Props {
    selectedOrder: string;
    setSelectedOrder: Dispatch<SetStateAction<string>>;
}

export default function Order({selectedOrder, setSelectedOrder}: Props) {
    const [openOrder, setOpenOrder] = useState(false);
  return (
    <div className="border-b-[0.05rem] border-gray-400/40">
        <div className={`${bgLogic}`} onClick={() => setOpenOrder(!openOrder)}>
          <p className={headerTextLogic}>&nbsp;Order by:</p>
          {openOrder ? (
            <KeyboardArrowUpIcon className="translate-y-[4px] translate-x-[-2px]" />
          ) : (
            <KeyboardArrowDownIcon className="translate-y-[4px] translate-x-[-2px]" />
          )}
        </div>
        <Collapse in={openOrder}>
          <div className={`${bgLogic} flex flex-col ml-2 mb-1`}>
          {
            [
              { label: "Name (A-Z)", value: "name" },
              { label: "Price (Low to High)", value: "price" },
              { label: "Price (High to Low)", value: "priceDesc" },
            ].map((option, index) => (
              <div key={index} className="bg-white my-[1px]">
                <input
                  type="radio"
                  style={{ transform: 'scale(1.3)', marginRight: '5px' ,marginLeft: '3px' }}
                  id={`order-${index}`}
                  name="order"
                  value={option.value}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedOrder(e.target.value)
                  }
                  checked={selectedOrder === option.value}
                />
                <label htmlFor={`order-${index}`}>{option.label}</label>
              </div>
            ))
          }
          </div>
        </Collapse>
    </div>
  )
}
