import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllApplicationList } from "../../../services/api.js";
import Status from "../../../constants/Status.js";
import moment from "moment";
import withLoading from "../../../hoc/withLoading";
import { Button, Select, Table } from "antd";
import { ArrowRightOutlined } from "@ant-design/icons";

const ApplicationList = ({ loading, setLoading }) => {
  const navigate = useNavigate();
  const [applications, setApplications] = useState([]);

  const getApplications = async () => {
    try {
      setLoading(true);
      const response = await getAllApplicationList();
      setApplications(response.result.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      render: (text, record) => (
        <a>
          {record.firstName} {record.lastName}
        </a>
      ),
      sorter: (a, b) => a.firstName.localeCompare(b.firstName),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a, b) => a.email.localeCompare(b.email),
    },
    {
      title: "Application Date",
      dataIndex: "creationTime",
      key: "creationTime",
      render: (text) => <div>{moment(text).format("DD/MM/YYYY")}</div>,
      sorter: (a, b) => a.creationTime.localeCompare(b.creationTime),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text, record) => (
        <Select defaultValue={record.status} style={{ width: 120 }} disabled>
          <Select.Option value={Status.Pending}>Pending</Select.Option>
          <Select.Option value={Status.Accepted}>Accepted</Select.Option>
          <Select.Option value={Status.Rejected}>Rejected</Select.Option>
        </Select>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      render: (text, record) => (
        <div style={{ display: "flex", flexDirection: "column" }}>
          <Button style={{ maxWidth: "90px", padding: "5px 0" }} type="primary" size="middle" onClick={() => navigate(`/admin/application/${record.id}`)} icon={<ArrowRightOutlined />}>
            Detail
          </Button>
        </div>
      ),
    },
  ];

  useEffect(() => {
    getApplications();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <Table
        dataSource={applications}
        columns={columns}
        tableLayout="fixed"
        footer={() => `Total (${applications.length}) items`}
        pagination={{ pageSize: 6, position: ["bottomCenter"] }}
        rowKey={(record) => record.id}
        loading={loading}
        scroll={{ x: 768 }}
      />
    </div>
  );
};

export default withLoading(ApplicationList);
