import { Badge } from "@mantine/core";
import { statusProps } from "../../utils/statuses";

export default function StatusChip({ status }) {
  return (
    <Badge variant="outline" color={statusProps[status].color}>
      {statusProps[status].label}
    </Badge>
  );
}
