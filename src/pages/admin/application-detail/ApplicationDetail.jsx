import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getApplicationById } from "../../../services/api";
import { Button } from "antd";
import withLoading from "../../../hoc/withLoading";
import { ArrowLeftOutlined, EditOutlined } from "@ant-design/icons";
import ApplicationStatusUpdateModal from "./components/ApplicationStatusUpdateModal";
import { updateApplicationStatus } from "../../../services/api";
import ApplicationDetailCard from "../../../components/ApplicationDetailCard.jsx";
import PersonalInformationCard from "../../../components/PersonalInformationCard.jsx";
import ApplicationDocumentCard from "../../../components/ApplicationDocumentCard.jsx";
import Loading from "../../../components/Loading.jsx";

const initialApplication = {
  id: 0,
  status: 1,
  response: "",
};

const ApplicationDetail = ({ loading, setLoading }) => {
  const [visibleUpdateApplication, setVisibleUpdateApplication] = useState(false);
  const navigate = useNavigate();
  const [application, setApplication] = useState();
  const [editedApplication, setEditedApplication] = useState(initialApplication);

  const { id } = useParams();

  const getApplicationDetail = async () => {
    try {
      setLoading(true);
      const response = await getApplicationById(id);
      setApplication(response.result);
      setEditedApplication(response.result);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const showModal = () => {
    setEditedApplication(application);
    setVisibleUpdateApplication(true);
  };

  const handleOk = async (values) => {
    try {
      setLoading(true);
      const response = await updateApplicationStatus(values);
      if (response.statusCode == 200) {
        await getApplicationDetail();
        setVisibleUpdateApplication(false);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setVisibleUpdateApplication(false);
  };

  useEffect(() => {
    getApplicationDetail();
  }, [id]);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <div style={{ display: "flex", padding: "20px", justifyContent: "space-between", alignItems: "center", marginBottom: "10px" }}>
        <Button onClick={() => navigate("/admin/application-list")} type="primary" icon={<ArrowLeftOutlined />}>
          Back
        </Button>

        <Button onClick={showModal} type="primary" icon={<EditOutlined />}>
          Edit
        </Button>
      </div>

      <div className="application-detail-container">
        <ApplicationDetailCard application={application} />
        <PersonalInformationCard application={application} />
        <ApplicationDocumentCard application={application} />
      </div>

      <ApplicationStatusUpdateModal editedApplication={editedApplication} isVisible={visibleUpdateApplication} handleOk={handleOk} handleCancel={handleCancel} />
    </div>
  );
};

export default withLoading(ApplicationDetail);
