import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import { createApplication, uploadDocuments } from "../../services/api";
import { Form, Input, Button, DatePicker, Upload, message } from "antd";
import { InboxOutlined } from "@ant-design/icons";
const { Dragger } = Upload;
const { TextArea } = Input;

const ApplicationCreate = () => {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      birthday: "",
      identityNumber: "",
      reason: "",
      address: "",
      documents: [],
    },

    validationSchema: Yup.object().shape({
      firstName: Yup.string().required(),
      lastName: Yup.string().required(),
      email: Yup.string().required(),
      birthday: Yup.string().required(),
      identityNumber: Yup.string().required(),
      reason: Yup.string().required(),
      address: Yup.string().required(),
      documents: Yup.array().required().min(1).max(10),
    }),

    onSubmit: async (values) => {
      try {
        const response = await createApplication(values);
        navigate(`/application-success/${response.result.id}`);
      } catch (error) {
        console.log(error);
      }
    },
  });

  const draggerProps = {
    name: "documents",
    multiple: true,
    customRequest: async ({ file, onSuccess, onError }) => {
      console.log(file);
      try {
        const response = await uploadDocuments([file]);

        const currentDocuments = formik.values.documents || [];

        currentDocuments.push({
          id: response.result[0].id,
          name: response.result[0].name,
          contentType: response.result[0].contentType,
          url: response.result[0].url,
        });

        formik.setFieldValue("documents", currentDocuments);
        onSuccess(response.result);
        message.success(`${file.name} file uploaded successfully`);
      } catch (error) {
        onError(error);
        console.log(error);
        message.error(`${file.name} file upload failed.`);
      }
    },
  };

  return (
    <div className="create-application-container">
      <Form layout="vertical" onFinish={formik.handleSubmit} initialValues={formik.initialValues} encType="multipart/form-data">
        <div className="create-application-input-row-container">
          <Form.Item label="First Name" name="firstName" rules={[{ required: true, message: "Please enter your first name" }]} style={{ flex: 1 }}>
            <Input style={{ minWidth: "150px" }} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.firstName} autoFocus={true} />
          </Form.Item>

          <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]} style={{ flex: 1 }}>
            <Input style={{ minWidth: "150px" }} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.lastName} />
          </Form.Item>

          <Form.Item label="Birthday" name="birthday" rules={[{ required: true, message: "Please enter your birthday" }]} style={{ flex: 1 }}>
            <DatePicker style={{ minWidth: "150px" }} onChange={(date, dateString) => formik.setFieldValue("birthday", dateString)} value={formik.values.birthday} />
          </Form.Item>
        </div>

        <div className="create-application-input-row-container">
          <Form.Item label="Email" name="email" rules={[{ required: true, message: "Please enter your email" }]} style={{ flex: 1 }}>
            <Input style={{ minWidth: "150px" }} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email} />
          </Form.Item>
          <Form.Item label="Identity Number" name="identityNumber" rules={[{ required: true, message: "Please enter your identity number" }]} style={{ flex: 1 }}>
            <Input style={{ minWidth: "150px" }} onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.identityNumber} />
          </Form.Item>
        </div>

        <div className="create-application-input-row-container">
          <Form.Item label="Address" name="address" rules={[{ required: true, message: "Please enter your address" }]} style={{ flex: 1 }}>
            <TextArea
              style={{ minWidth: "150px" }}
              onChange={formik.handleChange}
              value={formik.values.address}
              onBlur={formik.onBlur}
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
            />
          </Form.Item>
          <Form.Item label="Reason" name="reason" rules={[{ required: true, message: "Please enter your reason" }]} style={{ flex: 1 }}>
            <TextArea
              style={{ minWidth: "150px" }}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.reason}
              autoSize={{
                minRows: 2,
                maxRows: 6,
              }}
            />
          </Form.Item>
        </div>

        <Form.Item name="documents" label="Documents" rules={[{ required: true, message: "Please upload at least one document" }]}>
          <Dragger {...draggerProps}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">Click or drag file to this area to upload</p>
            <p className="ant-upload-hint">Support for a single or bulk upload.</p>
          </Dragger>
        </Form.Item>

        <Form.Item style={{ textAlign: "center" }}>
          <Button style={{ minWidth: "150px" }} type="primary" htmlType="submit" size="large">
            Apply
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default ApplicationCreate;
