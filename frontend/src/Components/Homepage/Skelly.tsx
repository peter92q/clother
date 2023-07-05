
export default function Skelly() {
    return (
        <div className="rounded-sm shadow-md h-[40vh] xl:h-[345px] xl:w-[270px] flex flex-col items-bottom justify-end relative ">
            <div className="shimmer h-[100%] w-[100%] object-cover pointer-events-none bg-gray-400/20"/>
            <div className="shimmer xl:w-[270px] h-[60px] bg-white flex flex-col justify-start pl-[10px] pt-[12px]"
            > 
            <div className="flex flex-col">
              <span className="flex flex-row justify-between w-full">
                <div className="shimmer bg-gray-400/20 w-[40%] h-[0.5rem] rounded-xl"/>  
                <div className="shimmer bg-gray-400/20 w-[30px] h-[10px] mr-[10px] translate-y-[-1px] rounded-md"/>
              </span> 
               <div className="shimmer bg-gray-400/20 w-[20%] h-[0.4rem] rounded-xl mt-[17px] absolute"/> 
            </div>
            </div>
        </div>
    )
}