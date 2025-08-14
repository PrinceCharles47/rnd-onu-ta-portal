import ConfirmRestoreAccount from "./contents/ConfirmRestoreAccount";
import { Menu } from "@mantine/core";
import { openModal } from "../../utils/modal";
import { IconUserSquare } from "@tabler/icons-react";

export default function RestoreAccountModal({ user }) {
  const { username, fullName } = user.name;
  return (
    <Menu.Item
      leftSection={<IconUserSquare size={14} />}
      onClick={() =>
        openModal({
          title: "Restore account",
          children: (
            <ConfirmRestoreAccount
              userId={user.id}
              username={username}
              fullName={fullName}
            />
          ),
        })
      }
    >
      Restore account
    </Menu.Item>
  );
}
