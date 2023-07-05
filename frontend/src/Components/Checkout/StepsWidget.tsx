interface Props {
  step: number;
}

export default function StepsWidget({ step }: Props) {
  const textStyle =
    'text-[20px] text-white font-thin rounded-full p-1 w-[50px] h-[30px] flex justify-center items-center';
  return (
    <div className="w-full mt-7 mb-4">
      <div className="flex flex-row items-center justify-center gap-8">
        <div className="flex flex-col justify-center items-center text-center z-10">
          <p className={`${textStyle} ${step <= 2 ? 'bg-black' : 'bg-gray-300'}`}>
            1
          </p>
          <p>Address</p>
         </div>
         <div
          className={`h-[3px] w-[60px] absolute mb-6 translate-x-[-50px] ${
            step >= 1 ? 'bg-black' : 'bg-gray-300'
          }`}
        />
        <div className="flex flex-col justify-center items-center text-center z-10">
        <p
          className={`${textStyle} ${step >= 1 ? 'bg-black' : 'bg-gray-300'} `}
        >
          2
        </p>
        <p>Payment</p>
        </div>
        <div
          className={`h-[3px] w-[60px] absolute mb-6 translate-x-[50px] ${
            step === 2 ? 'bg-black' : 'bg-gray-300'
          }`}
        />
        <div className="flex flex-col justify-center items-center text-center">
        <p
          className={`${textStyle} ${step === 2 ? 'bg-black' : 'bg-gray-300'}`}
        >
          3
        </p>
        <p>Confirm</p>
        </div>
      </div>
    </div>
  );
}