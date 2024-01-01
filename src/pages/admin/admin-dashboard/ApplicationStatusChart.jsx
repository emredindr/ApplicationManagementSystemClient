import { Doughnut } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const ApplicationStatusChart = ({ data }) => {
  const datas = {
    labels: ["Pending", "Accepted", "Rejected"],
    datasets: [
      {
        data: [data.pending, data.accepted, data.rejected],
        backgroundColor: ["#3498db", "#4CAF50", "#e74c3c"],
        hoverBackgroundColor: ["#2980b9", "#45a049", "#c0392b"],
      },
    ],
  };

  return <Doughnut data={datas} />;
};

export default ApplicationStatusChart;
