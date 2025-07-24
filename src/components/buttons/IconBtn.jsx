import { Tooltip, ActionIcon } from "@mantine/core";

export default function IconBtn({ tooltip, icon: Icon, onClick, props }) {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon
        variant="light"
        size={30}
        onClick={onClick}
        radius="md"
        {...props}
      >
        <Icon size={20} stroke={1.5} />
      </ActionIcon>
    </Tooltip>
  );
}
