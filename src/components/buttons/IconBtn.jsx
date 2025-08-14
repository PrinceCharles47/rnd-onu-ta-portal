import { Tooltip, ActionIcon } from "@mantine/core";

export default function IconBtn({ tooltip, icon: Icon, onClick, props }) {
  return (
    <Tooltip label={tooltip}>
      <ActionIcon
        variant="filled"
        size={36}
        onClick={onClick}
        radius="md"
        {...props}
      >
        <Icon size={20} />
      </ActionIcon>
    </Tooltip>
  );
}
