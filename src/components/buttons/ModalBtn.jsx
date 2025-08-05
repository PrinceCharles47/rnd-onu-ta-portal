import { Button, Modal } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";

export default function ModalBtn({
  children,
  btnLabel,
  title,
  defaultOpen = false,
  props
}) {
  const [opened, { open, close }] = useDisclosure(defaultOpen);
  return (
    <>
      <Modal size="lg" opened={opened} onClose={close} title={title} centered>
        {children}
      </Modal>
      <Button size="xs" radius="md" onClick={open} {...props}>
        {btnLabel}
      </Button>
    </>
  );
}
