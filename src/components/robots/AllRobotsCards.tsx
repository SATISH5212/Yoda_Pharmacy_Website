import { IAllRobotsCardsProps } from '@/lib/interfaces/robots';
import { useNavigate } from '@tanstack/react-router';
import { BatteryFull, MapPin } from 'lucide-react';
import { FC } from 'react';

const AllRobotsCards: FC<IAllRobotsCardsProps> = (props) => {
  const naviagate = useNavigate();
  const { robots, searchString} = props;

  if (!robots) {
    return <div className="text-center text-gray-500">Loading...</div>;
  }

  const filteredRobots = searchString
    ? robots.filter((robot) =>
      robot.robot_name.toLowerCase().includes(searchString.toLowerCase())
    )
    : robots;

  if (filteredRobots.length === 0) {
    return (
      <div className="text-center text-gray-500">
        No robots found for "{searchString}"
      </div>
    );
  }


  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {filteredRobots.map((robot) => (
        <div
          key={robot.id}
          className="p-4 border rounded-xl"
          onClick={() => {
            naviagate({ to: `/robots/${robot.id}` });
          }}
        >
          <ul className="list-none text-sm space-y-3">
            <li><span className="font-bold">{robot.robot_name}</span></li>
            <li className="flex justify-between">
              <span className="font-semibold text-[10px]">IP Address</span>
              <span className="text-xs">{robot.ip_address}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold"><MapPin size={12} /></span>
              <span className="text-xs">Hyderabad</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold"><BatteryFull size={12} /></span>
              <span className="text-xs">75%</span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
};

export default AllRobotsCards
