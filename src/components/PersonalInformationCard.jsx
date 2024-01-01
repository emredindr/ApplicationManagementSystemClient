import { Input, Typography } from "antd";
import moment from "moment";
const { TextArea } = Input;

const PersonalInformationCard = ({ application }) => {
  return (
    <>
      {application && (
        <div style={{ padding: "10px", minWidth: "200px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", flex: 1 }}>
          <Typography.Title level={4} style={{ textAlign: "center" }}>
            Personal Information
          </Typography.Title>

          <Typography.Title level={5}>
            First Name: <Input style={{ backgroundColor: "#fff", color: "black" }} disabled value={application.firstName} />
          </Typography.Title>

          <Typography.Title level={5}>
            Last Name: <Input style={{ backgroundColor: "#fff", color: "black" }} disabled value={application.lastName} />
          </Typography.Title>

          <Typography.Title level={5}>
            Email: <Input style={{ backgroundColor: "#fff", color: "black" }} disabled value={application.email} />
          </Typography.Title>

          <Typography.Title level={5}>
            Age: <Input style={{ backgroundColor: "#fff", color: "black" }} disabled value={moment().diff(application.birthday, "years")} />
          </Typography.Title>

          <Typography.Title level={5}>
            Identity Number <Input style={{ backgroundColor: "#fff", color: "black" }} disabled value={application.identityNumber} />
          </Typography.Title>

          <Typography.Title level={5}>
            Address <TextArea style={{ backgroundColor: "#fff", color: "black" }} autoSize disabled value={application.address} />
          </Typography.Title>
        </div>
      )}
    </>
  );
};

export default PersonalInformationCard;
