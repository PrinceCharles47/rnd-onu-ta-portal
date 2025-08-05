import { Group, ActionIcon, Button } from "@mantine/core";
import { IconEye } from "@tabler/icons-react";

export default function TableRowAction({
  onView = () => {},
  disableView = false,
  children,
}) {
  return (
    <Group gap="xs" justify="end" wrap="nowrap">
      {children}
      {!disableView && (
        <ActionIcon
          variant="light"
          size={30}
          onClick={onView}
          radius="md"
          aria-label="View ONU details"
        >
          <IconEye size={20} stroke={1.5} />
        </ActionIcon>
      )}
    </Group>
  );
}
