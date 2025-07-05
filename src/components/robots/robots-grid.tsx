import { RobotConfig } from '@/types/dataTypes';
import { BatteryFull, MapPin } from 'lucide-react';

export default function RobotGrid({ robots }: { robots: RobotConfig[] }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {robots.map((robot) => (
        <div key={robot.id} className="p-4 border rounded-xl">
          <ul className="list-none text-sm space-y-3">
            <li><span className="font-bold">{robot.robot_name}</span></li>
            <li className="flex justify-between">
              <span className="font-semibold text-[10px]">IP Address</span>
              <span className='text-xs'>{robot.ip_address}</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold"><MapPin size={12} /></span>
              <span className='text-xs'>Hyderabad</span>
            </li>
            <li className="flex justify-between">
              <span className="font-semibold"><BatteryFull size={12} /></span>
              <span className='text-xs'>75%</span>
            </li>
          </ul>
        </div>
      ))}
    </div>
  );
}
