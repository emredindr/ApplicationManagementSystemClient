import { Input, Typography, Select } from "antd";
import moment from "moment";
import Status from "../constants/Status.js";
const { TextArea } = Input;

const ApplicationDetailCard = ({ application }) => {
  return (
    <>
      {application && (
        <div style={{ padding: "10px", minWidth: "200px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", flex: 1 }}>
          <Typography.Title style={{ textAlign: "center" }} level={4}>
            Application Detail
          </Typography.Title>

          <Typography.Title level={5}>
            Application No: <Input style={{ backgroundColor: "#fff", color: "black" }} disabled value={application.id} />
          </Typography.Title>

          <Typography.Title level={5}>
            Application Date: <Input style={{ backgroundColor: "#fff", color: "black" }} value={moment(application.creationTime).format("DD/MM/YYYY")} disabled />
          </Typography.Title>

          <Typography.Title level={5}>
            Reason:
            <TextArea
              autoSize={{
                minRows: 4,
                maxRows: 8,
              }}
              style={{ backgroundColor: "#fff", color: "black" }}
              value={application.reason}
              disabled
            />
          </Typography.Title>

          <Typography.Title level={5}>
            Status:
            <br />
            <Select className="customDisableSelect" disabled value={application.status}>
              <Select.Option value={Status.Pending}>Pending </Select.Option>
              <Select.Option value={Status.Accepted}>Accepted</Select.Option>
              <Select.Option value={Status.Rejected}>Rejected </Select.Option>
            </Select>
            <br />
          </Typography.Title>

          <Typography.Title level={5}>
            Response: <TextArea style={{ backgroundColor: "#fff", color: "black" }} autoSize value={application.response} disabled />
          </Typography.Title>
        </div>
      )}
    </>
  );
};

export default ApplicationDetailCard;
