const RobotCardSkeleton = () => {
    return (
        <div className="p-4 border rounded-xl bg-white shadow-md w-full animate-pulse">

            <div className='flex flex-col item-center mb-4'>
                <div className='flex flex-row justify-between mb-2'>

                    <div className="flex items-center gap-2">
                        <div className="w-3.5 h-3.5 rounded-full bg-gray-300 mt-1"></div>
                        <div className="h-4 w-24 bg-gray-300 rounded"></div>
                    </div>

                    <div className='flex items-center gap-x-2'>
                        <div className='w-5 h-5 bg-gray-300 rounded'></div>
                        <div className='w-5 h-5 bg-gray-300 rounded'></div>
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className='h-5 w-20 bg-gray-300 rounded-lg'></div>
                    <div className='h-4 w-16 bg-gray-300 rounded'></div>
                </div>
            </div>
            <ul className="list-none text-xs space-y-3">
                <li className="flex justify-between items-center">
                    <div className="h-3 w-20 bg-gray-300 rounded"></div>
                    <div className="h-3 w-14 bg-gray-300 rounded"></div>
                </li>
                <li className="flex justify-between items-center">
                    <div className="h-3 w-24 bg-gray-300 rounded"></div>
                    <div className="h-3 w-16 bg-gray-300 rounded"></div>
                </li>
                <li className="flex justify-between items-center">
                    <div className='flex w-1/2 gap-3 items-center'>
                        <div className="w-5 h-5 bg-gray-300 rounded mr-1"></div>
                        <div className="h-3 w-16 bg-gray-300 rounded"></div>
                    </div>
                    <div className='flex w-1/2 gap-3 justify-end items-center'>
                        <div className="w-5 h-5 bg-gray-300 rounded"></div>
                        <div className="h-3 w-12 bg-gray-300 rounded"></div>
                    </div>
                </li>
            </ul>
        </div>
    );
};

export default RobotCardSkeleton;
