import { Button } from "@mantine/core";

export default function GenericBtn({ label, onClick, props }) {
  return (
    <Button size="sm" radius="md" onClick={onClick} {...props}>
      {label}
    </Button>
  );
}
