import { Table, Text, keys, Group } from "@mantine/core";

import GenericBtn from "../../buttons/GenericBtn";
import IconBtn from "../../buttons/IconBtn";
import StatusChip from "../../chips/StatusChip";

import { IconEye } from "@tabler/icons-react";
import { useNavigate } from "react-router";
import { useCurrentUser } from "../../../hooks/user/useCurrentUser";

export default function ONUListRows({ items }) {
  const { currentUser } = useCurrentUser();
  const navigate = useNavigate();
  const redirect = (path) => {
    navigate(path);
  };

  // numeric strings will be returned first in the array followed by strings.
  // the order of string keys is based on the order they appear in the object
  const itemKeys = items?.length > 0 && keys(items[0]);
  const skippedKeys = ["id", "status"];

  if (items?.length === 0) {
    return (
      <Table.Tr>
        <Table.Td colSpan={5}>
          <Text fz="sm" fw={700} ta="center">
            Nothing found
          </Text>
        </Table.Td>
      </Table.Tr>
    );
  }

  return items?.map((onu) => (
    <Table.Tr key={onu.id}>
      {itemKeys?.map((key) => {
        if (skippedKeys.includes(key)) return;

        return (
          <Table.Td key={`${onu.id}_${key}`}>
            <Text fz="xs">{onu[key]}</Text>
          </Table.Td>
        );
      })}

      <Table.Td>
        <StatusChip status={onu.status} />
      </Table.Td>

      {/* action */}
      <Table.Td>
        <Group justify="flex-end">
          <ActionsBtn onu={onu} user={currentUser} onClick={redirect} />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
}

function ActionsBtn({ onu, user, onClick }) {
  const userType = user?.data?.profile?.role?.name; // :)
  const allowedActions = {
    vendor: ["readyForTA", "ongoingTA"],
    rnd: ["pendingIOF", "readyForTA", "ongoingTA"],
    admin: ["pendingIOF", "readyForTA", "ongoingTA"],
  };
  const actions = {
    pendingIOF: (
      <GenericBtn
        label="View Request"
        props={{ w: 140 }}
        onClick={() => onClick(`/pending-iof/${onu.id}`)}
      />
    ),
    readyForTA: (
      <GenericBtn
        label="Start Test"
        props={{ w: 140 }}
        onClick={() => onClick(`/services/${onu.id}`)}
      />
    ),
    ongoingTA: (
      <GenericBtn
        label="Continue Test"
        props={{ w: 140, color: "yellow" }}
        onClick={() => onClick(`/services/${onu.id}`)}
      />
    ),
    typeApproved: null,
  };

  return (
    <Group justify="flex-end" gap="xs">
      {allowedActions[userType].includes(onu.status) && actions[onu.status]}
      <IconBtn
        tooltip="View Details"
        icon={IconEye}
        props={{ variant: "light" }}
      />
    </Group>
  );
}
