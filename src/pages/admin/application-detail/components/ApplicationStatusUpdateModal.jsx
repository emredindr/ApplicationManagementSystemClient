import { Modal, Select, Input, Form } from "antd";
import Status from "../../../../constants/Status";
const { TextArea } = Input;
import { useFormik } from "formik";
import * as Yup from "yup";
import { useEffect } from "react";

const ApplicationStatusUpdateModal = ({ editedApplication, isVisible, handleOk, handleCancel }) => {
  const formik = useFormik({
    initialValues: {
      status: editedApplication.status,
      response: editedApplication.response,
    },
    validationSchema: Yup.object().shape({
      response: Yup.string().required().min(10),
    }),

    onSubmit: (values) => {
      const updateInput = {
        ...values,
        id: editedApplication.id,
      };
      handleOk(updateInput);
    },
  });

  useEffect(() => {
    formik.setValues({
      status: editedApplication.status,
      response: editedApplication.response,
    });
  }, [editedApplication]);

  return (
    <Modal title="Update Status" open={isVisible} onCancel={handleCancel} onOk={formik.submitForm}>
      {editedApplication && (
        <>
          <Form onFinish={formik.handleSubmit} initialValues={formik.initialValues} layout="vertical">
            <Form.Item label="Status" name="status">
              <Select value={formik.values.status} onChange={(value) => formik.setFieldValue("status", value)} onBlur={formik.handleBlur} style={{ width: "100%" }}>
                <Select.Option value={Status.Pending}>Pending </Select.Option>
                <Select.Option value={Status.Accepted}>Accepted</Select.Option>
                <Select.Option value={Status.Rejected}>Rejected </Select.Option>
              </Select>
            </Form.Item>

            <Form.Item
              label="Response"
              name="response"
              rules={[
                {
                  required: true,
                  message: "Please enter reason",
                },
                {
                  min: 10,
                  message: "Reason must be at least 10 characters",
                },
              ]}
            >
              <TextArea
                value={formik.values.response}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                autoSize={{
                  minRows: 4,
                  maxRows: 10,
                }}
              />
            </Form.Item>
          </Form>
        </>
      )}
    </Modal>
  );
};

export default ApplicationStatusUpdateModal;
