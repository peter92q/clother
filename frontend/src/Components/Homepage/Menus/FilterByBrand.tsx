import { bgLogic, headerTextLogic } from './MenuStyles'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { ChangeEvent, Dispatch, SetStateAction, useState } from 'react';
import { useAppSelector } from '../../../Configs/Redux/store';

interface Props{
    selectedBrands: string[];
    setSelectedBrands: Dispatch<SetStateAction<string[]>>;
}

export default function FilterByBrand({selectedBrands, setSelectedBrands}:Props) {
    const [openBrands, setOpenBrands] = useState(false);
    const {brands} = useAppSelector(state=>state.catalog);
    
  return (
    <div className="border-b-[0.05rem] border-gray-400/40">
      <div
          className={`${bgLogic}`}
          onClick={() => setOpenBrands(!openBrands)}
        >
          <p className={headerTextLogic}>&nbsp;Filter by brand:</p>
          {openBrands ? (
            <KeyboardArrowUpIcon className="translate-y-[4px] translate-x-[-2px]" />
          ) : (
            <KeyboardArrowDownIcon className="translate-y-[4px] translate-x-[-2px]" />
          )}
        </div>
     
        <Collapse in={openBrands}>
          <div className={`${bgLogic} flex flex-col ml-2 mb-1`}>
          {
            brands && brands?.map((brand, index) => (
              <div key={index}>
                <input
                  style={{ transform: 'scale(1.3)', marginRight: '5px' ,marginLeft: '3px' }}
                  type="checkbox"
                  id={`brand-${index}`}
                  value={brand}
                  onChange={(e: ChangeEvent<HTMLInputElement>) =>
                    setSelectedBrands(
                      e.target.checked
                        ? [...selectedBrands, brand]
                        : selectedBrands.filter((item) => item !== brand)
                    )
                  }
                  checked={selectedBrands.includes(brand)}
                />
                <label htmlFor={`brand-${index}`}>{brand}</label>
              </div>
            ))
          }
          </div>
        </Collapse>
    </div>
  )
}
