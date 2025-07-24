import { Modal, FileInput, Button } from "@mantine/core";

export default function UploadDocsDialog({ isOpen, onClose, fileId }) {
  return (
    <Modal
      opened={isOpen}
      onClose={onClose}
      title="Upload a document"
      centered
      radius="lg"
    >
      {`${fileId.service} - ${fileId.olt}`}
    </Modal>
  );
}
