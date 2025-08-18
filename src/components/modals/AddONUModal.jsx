import NewONUForm from "./contents/NewONUForm";
import IconBtn from "../buttons/IconBtn";
import { IconPlus } from "@tabler/icons-react";
import { openModal } from "../../utils/modal";

export default function AddONUModal() {
  return (
    <IconBtn
      tooltip="Add user"
      icon={IconPlus}
      props={{ size: 40, variant: "filled" }}
      onClick={() =>
        openModal({
          title: "Add a new ONU",
          children: <NewONUForm />,
          props: { size: "lg" },
        })
      }
    />
  );
}
