import ConfirmRemoveAccount from "./contents/ConfirmRemoveAccount";
import { Menu } from "@mantine/core";
import { openModal } from "../../utils/modal";
import { IconTrash } from "@tabler/icons-react";

export default function RemoveUserModal({ user }) {
  const { username, fullName } = user.name;
  return (
    <Menu.Item
      color="red"
      leftSection={<IconTrash size={14} />}
      onClick={() =>
        openModal({
          title: "Remove account",
          children: (
            <ConfirmRemoveAccount
              userId={user.id}
              username={username}
              fullName={fullName}
            />
          ),
        })
      }
    >
      Remove user
    </Menu.Item>
  );
}
