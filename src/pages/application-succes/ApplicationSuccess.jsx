import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getApplicationById } from "../../services/api";
import { Link } from "react-router-dom";
import submitted from "../../assets/submitted.json";
import Lottie from "lottie-react";

const ApplicationSuccess = () => {
  const { id } = useParams();
  const [applicationInfo, setApplicationInfo] = useState();

  const getApplicationInfo = async () => {
    try {
      const response = await getApplicationById(id);
      setApplicationInfo(response.result);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getApplicationInfo();
  }, [id]);

  return (
    <div className="application-success-container">
      {applicationInfo && (
        <div
          style={{
            backgroundColor: "#fff",
            padding: "20px",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            boxShadow: "rgba(0, 0, 0, 0.3) 0px 19px 38px, rgba(0, 0, 0, 0.22) 0px 15px 12px",
          }}
        >
          <h2>Congratulations</h2>
          <p>Your application has been successfully submitted.</p>
          <div style={{ maxWidth: "200px", maxHeight: "200px" }}>
            <Lottie animationData={submitted} loop={false} />
          </div>
          <p>
            Tracking code: <strong>{applicationInfo.id}</strong>
          </p>
          <Link to="/">Go Home</Link>
        </div>
      )}
    </div>
  );
};

export default ApplicationSuccess;
