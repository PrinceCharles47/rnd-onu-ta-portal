import ConfirmDeactivateAccount from "./contents/ConfirmDeactivateAccount";
import { Menu } from "@mantine/core";
import { openModal } from "../../utils/modal";
import { IconArchive } from "@tabler/icons-react";

export default function DeactivateAccountModal({ user }) {
  const { username, fullName } = user.name;
  return (
    <Menu.Item
      leftSection={<IconArchive size={14} />}
      onClick={() =>
        openModal({
          title: "Deactivate account",
          children: (
            <ConfirmDeactivateAccount
              userId={user.id}
              username={username}
              fullName={fullName}
            />
          ),
        })
      }
    >
      Deactivate account
    </Menu.Item>
  );
}
