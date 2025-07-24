import { Button } from "@mantine/core";

export default function GenericBtn({ label, onClick, props }) {
  return (
    <Button size="xs" radius="md" onClick={onClick} {...props}>
      {label}
    </Button>
  );
}
