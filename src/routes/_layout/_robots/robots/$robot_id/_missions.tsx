
import RobotMissionsPage from "@/components/robots/RobotDetails/robotMissions";
import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/_layout/_robots/robots/$robot_id/_missions")(
  {
    component: RobotMissionsPage,
  }
);
