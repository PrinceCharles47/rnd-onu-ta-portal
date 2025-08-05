import {
  Table,
  Paper,
  Checkbox,
  Select,
  Text,
  Menu,
  ActionIcon,
  ScrollArea,
  Group,
  Stack,
} from "@mantine/core";
import {
  IconDotsVertical,
  IconSettings,
  IconLogout,
  IconTrash,
  IconPlus,
} from "@tabler/icons-react";

import GenericBtn from "../buttons/GenericBtn";
import IconBtn from "../buttons/IconBtn";
import TableRowAction from "../buttons/TableRowAction";
import DefaultTable from "./DefaultTable";
import { TEST_CASES } from "../../utils/staticTestData";
import { useEffect } from "react";

const tableHeaders = [
  { name: "", withSort: false },
  { name: "", withSort: false },
];

export default function TestSelectionTable({ subtests }) {
  const tableItems = subtests.map((subtest) => {
    return {
      // subtest: (
      //   <Group>
      //     <Checkbox onClick={() => onSelect(subtest.id)} />
      //     <Text fz="xs">{subtest.label}</Text>
      //   </Group>
      // ),
      subtest: subtest.label,
      action: (
        <TableRowAction disableView>
          <GenericBtn
            label={subtest.required ? "Required" : "Not required"}
            onClick={() => {}}
            props={{ variant: subtest.required ? "filled" : "light", w: 110 }}
          />
          <IconBtn
            icon={IconTrash}
            tooltip="Remove subtest"
            props={{ color: "red" }}
          />
        </TableRowAction>
      ),
    };
  });

  return (
    // <Paper radius="lg">
    //   <Group align="center" justify="space-between">
    //     <div>
    //       <Text fw={500}>{testCase.label}</Text>
    //       <Text fz="xs" c="dimmed">{`Pre-requisite: ${
    //         testCase.requisite ? testCase.requisite.label : "None"
    //       }`}</Text>
    //     </div>
    //     <IconBtn
    //       icon={IconPlus}
    //       tooltip="Add a subtest"
    //       onClick={() => {}}
    //       props={{ variant: "filled", radius: "md", size: "lg" }}
    //     />
    //   </Group>
    //   <Paper mt="md" radius="lg">
    <DefaultTable
      items={tableItems}
      headers={[]}
      subtitle="Subtests"
      disableSearch
    />
      //   </Paper>
    // </Paper>
  );
}

function AddSubtestBtn({}) {
  return (
    // <IconBtn
    //   icon={IconPlus}
    //   tooltip="Add a subtest"
    //   onClick={() => {}}
    //   props={{ variant: "filled", radius: "xl", size: "lg" }}
    // />

    <GenericBtn label="Add subtest" onClick={() => {}} />
  );
}
