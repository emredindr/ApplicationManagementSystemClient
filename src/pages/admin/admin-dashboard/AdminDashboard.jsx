import ApplicationStatusChart from "./ApplicationStatusChart";
import { useEffect, useState } from "react";
import { getApplicationStatusRatio } from "../../../services/api";
import withLoading from "../../../hoc/withLoading";
import Loading from "../../../components/Loading";

const AdminDashboard = ({ loading, setLoading }) => {
  const [applicationStatusData, setApplicationStatusData] = useState({});

  const getApplicationStatusData = async () => {
    try {
      setLoading(true);
      const response = await getApplicationStatusRatio();
      setApplicationStatusData(response.result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getApplicationStatusData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="admin-dashboard-container">
      <div className="admin-dashboard-chart-container">
        <ApplicationStatusChart data={applicationStatusData} />
      </div>
    </div>
  );
};

export default withLoading(AdminDashboard);
