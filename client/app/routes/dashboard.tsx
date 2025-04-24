import PrivateRoutes from "~/components/PrivateRoutes";

const Dashboard = () => {
  return (
    <PrivateRoutes>
      <div>Dashboard</div>
    </PrivateRoutes>
  );
};

export default Dashboard;
