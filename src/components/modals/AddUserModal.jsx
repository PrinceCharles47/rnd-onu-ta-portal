import NewUserForm from "./contents/NewUserForm";
import IconBtn from "../buttons/IconBtn";
import { IconPlus } from "@tabler/icons-react";
import { openModal } from "../../utils/modal";

export default function AddUserModal() {
  return (
    <IconBtn
      tooltip="Add user"
      icon={IconPlus}
      props={{ size: 40, variant: "filled" }}
      onClick={() =>
        openModal({
          title: "Add a new user",
          children: <NewUserForm />,
          props: { size: "lg" },
        })
      }
    />
  );
}
