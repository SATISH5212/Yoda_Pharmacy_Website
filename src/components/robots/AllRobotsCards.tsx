import { IAllRobotsCardsProps } from '@/lib/interfaces/robots';
import { useNavigate } from '@tanstack/react-router';
import { BatteryFull, Clock, MapPin, Wifi } from 'lucide-react';
import { FC } from 'react';

const AllRobotsCards: FC<IAllRobotsCardsProps> = (props) => {
  const naviagate = useNavigate();
  const { robots, searchString, } = props;

  if (!robots) {
    return <div className="text-center text-gray-500 mt-50">No robots available</div>;
  }

  const filteredRobots = searchString
    ? robots.filter((robot) =>
      robot.robot_name.toLowerCase().includes(searchString.toLowerCase())
    )
    : robots;

  if (filteredRobots.length === 0) {
    return (
      <div className="text-center text-gray-500 mt-50">
        No robots found for "{searchString}"
      </div>
    );
  }



  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredRobots.map((robot) => (<div
        key={robot.id}
        className="p-4 border rounded-xl bg-white shadow-md w-full hover:shadow-lg transition-shadow cursor-pointer"
        onClick={() => {
          naviagate({ to: `/robots/${robot.id}` });
        }}
      >
        <div className='flex flex-col item-center mb-4'>
          <div className='flex flex-row justify-between'>
            <div className="flex">
              <span className='flex items-center mr-2 bg-green-400 w-3.5 h-3.5 rounded-full mt-1'></span>
              <span className='font-DM sans text-sm font-bold text- #4F4F4F-400 tracking-wider'>{robot.robot_name}</span>
            </div>
            <div className='flex items-center gap-x-2' >
              <span className=''><img src="/public/assets/robots/robotNotifications.svg" alt="Robot" className="w-5 h-5" /></span>
              <span className=''><img src="/public/assets/robots/robotNetwork.svg" alt="Robot" className="w-5 h-5" /></span>
            </div>
          </div>
          <div className="flex justify-between mt-1">
            <span className='flex items-center text-xs font-semibold text-green-800 bg-gray-200 rounded-lg h-4.5 w-20 justify-center'>
              Harvester
            </span>
            <span className='flex items-center text-xs font-semibold text-gray-800'>{robot.ip_address}</span>
          </div>
        </div>

        <ul className="list-none text-xs space-y-3">
          <li className="flex justify-between">
            <span className="flex items-center gap-1 font-normal"><MapPin size={12} /> Location</span>
            <span>Field A-1</span>
          </li>
          <li className="flex justify-between">
            <span className="flex items-center gap-1 font-normal"><Clock size={12} /> Last Active</span>
            <span>2h 55m ago</span>
          </li>
          <li className="flex justify-between items-center">
            <span className='flex w-1/2 gap-3'>
              <span className="flex flex-row items-center justify-center font-normal">
                <img src="/public/assets/robots/battery.svg" alt="Robot" className="w-5 h-5 mr-1" /> Battery</span>
              <span className='flex items-center text-sm font-normal '>85%</span>
            </span>

            <span className='flex w-1/2 gap-3 justify-end items-center'>
              <span className="flex flex-row font-semibold"><img src="/public/assets/robots/efficiency.svg" alt="Robot" className="w-5 h-5" />
                <span className='flex items-center gap-1 font-normal'>Efficiency</span>
              </span>
              <span>94%</span>

            </span>
          </li>
        </ul>

      </div>

      ))
      }
    </div >
  );
};

export default AllRobotsCards
