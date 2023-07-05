import { debounce } from '@mui/material/utils';
import { Dispatch, SetStateAction } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface Props{
   setSearchTerm: Dispatch<SetStateAction<string>>  
}
export default function Search({setSearchTerm}: Props) {
  const handleSearchInputChange = debounce((value: string) => {
    setSearchTerm(value);
  }, 300);

  return (
    <div className="mb-2 mt-[2px] flex flex-row">
     <input
       type="text"
       placeholder="Search products..."
       onChange={(e) => handleSearchInputChange(e.target.value)}
       className='border-[1px] border-black rounded-l-sm w-full pl-1 '
     />
     <div className='w-[30px] translate-x-[-2px] rounded-r-sm bg-black'>
       <SearchIcon className='text-white scale-60 ml-[1.5px]' sx={{scale: "0.8"}}/>
     </div>
  </div>
  )
}
