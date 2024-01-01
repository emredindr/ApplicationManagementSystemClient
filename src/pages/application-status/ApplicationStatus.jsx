import { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { getApplicationById } from "../../services/api";
import { Form, Input, Button, Divider, message } from "antd";
import withLoading from "../../hoc/withLoading";
import ApplicationDetailCard from "../../components/ApplicationDetailCard.jsx";
import PersonalInformationCard from "../../components/PersonalInformationCard.jsx";
import ApplicationDocumentCard from "../../components/ApplicationDocumentCard.jsx";

const ApplicationStatus = ({ loading, setLoading }) => {
  const [application, setApplication] = useState(null);

  const formik = useFormik({
    initialValues: {
      applicationTrackingCode: "",
    },
    validationSchema: Yup.object().shape({
      applicationTrackingCode: Yup.string().required().min(10),
    }),
    onSubmit: async (values, { resetForm }) => {
      try {
        setLoading(true);
        const response = await getApplicationById(values.applicationTrackingCode);
        setApplication(response.result);
        message.success(response.message);
      } catch (error) {
        message.error(error?.response?.data?.responseException?.exceptionMessage);
      } finally {
        setLoading(false);
      }
    },
  });

  return (
    <div>
      <Form
        onFinish={formik.handleSubmit}
        initialValues={formik.initialValues}
        style={{
          padding: "20px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1px",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <Form.Item style={{ flex: 1 }} name="applicationTrackingCode" rules={[{ required: true, message: "Please enter your application tracking code" }]}>
            <Input
              size="large"
              placeholder="Enter your application tracking code"
              onPressEnter={() => console.log("asdas")}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.applicationTrackingCode}
              autoFocus={true}
            />
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit" size="large" block loading={loading}>
              Check
            </Button>
          </Form.Item>
        </div>
      </Form>

      {application && <Divider style={{ margin: "0px" }}>Search Result</Divider>}

      <div className="application-detail-container">
        <ApplicationDetailCard application={application} />

        <PersonalInformationCard application={application} />

        <ApplicationDocumentCard application={application} />
      </div>
    </div>
  );
};

export default withLoading(ApplicationStatus);
