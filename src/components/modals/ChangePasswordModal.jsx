import ChangePasswordForm from "./contents/ChangePasswordForm";
import { Menu } from "@mantine/core";
import { openModal } from "../../utils/modal";
import { IconKey } from "@tabler/icons-react";

export default function ChangePasswordModal({ user }) {
  return (
    <Menu.Item
      leftSection={<IconKey size={14} />}
      onClick={() =>
        openModal({
          title: "Change password",
          children: <ChangePasswordForm userId={user.id} />,
        })
      }
    >
      Change password
    </Menu.Item>
  );
}
