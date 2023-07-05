import { ChangeEvent, Dispatch, SetStateAction, useState } from "react";
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Collapse from '@mui/material/Collapse';
import { bgLogic, headerTextLogic } from "./MenuStyles";
import { useAppSelector } from "../../../Configs/Redux/store";

interface Props{
    selectedTypes: string[];
    setSelectedTypes: Dispatch<SetStateAction<string[]>>;
}

export default function FilterByType({selectedTypes, setSelectedTypes}: Props) {
    const { types } = useAppSelector(state=>state.catalog);

    const [openTypes, setOpenTypes] = useState(false);
  return (
    <div className="border-b-[0.05rem] border-gray-400/40">
       <div className={`${bgLogic}`} onClick={() => setOpenTypes(!openTypes)}>
          <p className={headerTextLogic}>&nbsp;Filter by type:</p>
          {openTypes ? (
            <KeyboardArrowUpIcon className="translate-y-[4px] translate-x-[-2px]" />
          ) : (
            <KeyboardArrowDownIcon className="translate-y-[4px] translate-x-[-2px]" />
          )}
        </div>
   
        <Collapse in={openTypes}>
          <div className={`${bgLogic} flex flex-col ml-2 mb-1`}>
          { 
            types && types?.map((type, index) => (
              <div key={index}>
                <input
                  type="checkbox"
                  style={{ transform: 'scale(1.3)', marginRight: '5px' ,marginLeft: '3px' }}
                  id={`type-${index}`}
                  value={type}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => setSelectedTypes(e.target.checked ? [...selectedTypes, type] : selectedTypes.filter(item => item !== type))}
                  checked={selectedTypes.includes(type)}
                />
                <label htmlFor={`type-${index}`}>{type}</label>
              </div>
            ))
          }
          </div>
        </Collapse>
    </div>
  )
}
