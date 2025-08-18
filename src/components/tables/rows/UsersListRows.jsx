import {
  Table,
  Text,
  Stack,
  keys,
  ActionIcon,
  Menu,
  Group,
} from "@mantine/core";

// modals
import ChangePasswordModal from "../../modals/ChangePasswordModal";
import DeactivateAccountModal from "../../modals/DeactivateAccountModal";
import RemoveUserModal from "../../modals/RemoveUserModal";
import RestoreAccountModal from "../../modals/RestoreAccountModal";

import { IconDotsVertical } from "@tabler/icons-react";

const ROLES = {
  admin: "Admin",
  vendor: "Vendor",
  rnd: "R&D",
  super_admin: "Super Admin"
};

const VENDORS = {
  huawei: "Huawei",
  nokia: "Nokia",
  zte: "ZTE",
};

export default function UsersListRows({ items, currentTable }) {
  // numeric strings will be returned first in the array followed by strings.
  // the order of string keys is based on the order they appear in the object
  const itemKeys = items?.length > 0 && keys(items[0]);
  const skippedKeys = ["id", "role", "name"];

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

  return items?.map((user) => (
    <Table.Tr key={user.id}>
      <Table.Td>
        <Stack gap={0}>
          <Text fz="xs">{user.name.fullName}</Text>
          <Text fz="xs" c="dimmed">
            {user.name.username}
          </Text>
        </Stack>
      </Table.Td>

      {itemKeys?.map((key) => {
        if (skippedKeys.includes(key)) return;

        return (
          <Table.Td key={`${user.id}_${key}`}>
            <Text fz="xs">{user[key]}</Text>
          </Table.Td>
        );
      })}

      <Table.Td>
        <Stack gap={0}>
          <Text fz="xs">{ROLES[user.role?.name]}</Text>
          <Text fz="xs" c="dimmed">
            {VENDORS[user.role?.vendorType]}
          </Text>
        </Stack>
      </Table.Td>

      {/* action */}
      <Table.Td>
        <Group justify="flex-end">
          <ActionsBtn user={user} currentTable={currentTable} />
        </Group>
      </Table.Td>
    </Table.Tr>
  ));
}

function ActionsBtn({ user, currentTable }) {
  const actions = {
    active: (
      <>
        <ChangePasswordModal user={user} />
        <DeactivateAccountModal user={user} />
        <Menu.Divider />
        <RemoveUserModal user={user} />
      </>
    ),
    archive: (
      <>
        <RestoreAccountModal user={user} />
        <Menu.Divider />
        <RemoveUserModal user={user} />
      </>
    ),
  };

  return (
    <>
      <Menu shadow="md">
        <Menu.Target>
          <ActionIcon variant="subtle" size={30} radius="md">
            <IconDotsVertical size={20} stroke={2} />
          </ActionIcon>
        </Menu.Target>

        <Menu.Dropdown>{actions[currentTable]}</Menu.Dropdown>
      </Menu>
    </>
  );
}
