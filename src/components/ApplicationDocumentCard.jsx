import { Typography } from "antd";
import { FileImageOutlined, FilePdfOutlined, FileWordOutlined, FileTextOutlined, FileOutlined, DownloadOutlined } from "@ant-design/icons";
import { List, Space, Button } from "antd";

const ApplicationDocumentCard = ({ application }) => {
  const getFileIcon = (contentType) => {
    switch (contentType) {
      case "image/jpeg":
      case "image/png":
        return <FileImageOutlined style={{ fontSize: "150%" }} />;
      case "application/pdf":
        return <FilePdfOutlined style={{ fontSize: "150%" }} />;
      case "application/vnd.openxmlformats-officedocument.wordprocessingml.document":
      case "application/msword":
        return <FileWordOutlined style={{ fontSize: "150%" }} />;
      case "text/plain":
        return <FileTextOutlined style={{ fontSize: "150%" }} />;
      default:
        return <FileOutlined />;
    }
  };

  return (
    <>
      {application && (
        <div style={{ padding: "10px", minWidth: "200px", boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px", flex: 1 }}>
          <Typography.Title style={{ textAlign: "center" }} level={4}>
            Documents
          </Typography.Title>
          <List
            dataSource={application.documents}
            renderItem={(file) => (
              <List.Item>
                <Space direction="vertical">
                  <span>
                    <Typography.Title level={5}>
                      {getFileIcon(file.contentType)}
                      {file.name}
                    </Typography.Title>
                  </span>
                  <Button type="link" href={file.url} target="_blank" download icon={<DownloadOutlined />}>
                    Download
                  </Button>
                </Space>
              </List.Item>
            )}
          />
        </div>
      )}
    </>
  );
};

export default ApplicationDocumentCard;

// {
//   "id": 27,
//   "name": "Screenshot_1-347.png",
//   "contentType": "image/png",
//   "url": "https://firebasestorage.googleapis.com/v0/b/archive-ed.appspot.com/o/application-documents%2FScreenshot_1-347.png?alt=media&token=3166f1df-5e43-495c-b700-e1b71fa33f1e"
// },
// {
//   "id": 28,
//   "name": "resume-516.pdf",
//   "contentType": "application/pdf",
//   "url": "https://firebasestorage.googleapis.com/v0/b/archive-ed.appspot.com/o/application-documents%2Fresume-516.pdf?alt=media&token=58efb101-b1ab-41bf-a041-73cc1eb37aac"
// },
// {
//   "id": 29,
//   "name": "Yeni Microsoft Word Belgesi-216.docx",
//   "contentType": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//   "url": "https://firebasestorage.googleapis.com/v0/b/archive-ed.appspot.com/o/application-documents%2FYeni%20Microsoft%20Word%20Belgesi-216.docx?alt=media&token=611e3290-3b4d-4b50-9f64-e841b80cef4e"
// },
// {
//   "id": 30,
//   "name": "Yeni Metin Belgesi-197.txt",
//   "contentType": "text/plain",
//   "url": "https://firebasestorage.googleapis.com/v0/b/archive-ed.appspot.com/o/application-documents%2FYeni%20Metin%20Belgesi-197.txt?alt=media&token=ef0f7c61-b899-48a1-bf51-9f5b5454b437"
// }
