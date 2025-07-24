import { Badge, Text } from "@mantine/core";
import { statusProps } from "../../utils/statuses";

export default function StatusChip({ status }) {
  return (
    // <Badge variant="transparent" color={statusProps[status].color}>
    //   {statusProps[status].label}
    // </Badge>
    <Text fz={11} fw={700} c={statusProps[status].color}>
      {statusProps[status].label.toUpperCase()}
    </Text>
  );
}
