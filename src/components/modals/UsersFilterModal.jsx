import FilterForm from "./contents/FilterForm";
import IconBtn from "../buttons/IconBtn";
import { IconFilter2 } from "@tabler/icons-react";

import {
  usersFilterFormConfig,
  usersFilterFormFields,
} from "../../utils/forms/usersFilter";
import { openModal } from "../../utils/modal";
import { useForm } from "@mantine/form";

export default function UsersFilterModal({ onFilter }) {
  const form = useForm(usersFilterFormConfig);

  return (
    <IconBtn
      tooltip="Filter"
      icon={IconFilter2}
      props={{ variant: "filled"}}
      onClick={() =>
        openModal({
          children: (
            <FilterForm
              onFilter={onFilter}
              form={form}
              fields={usersFilterFormFields}
            />
          ),
        })
      }
    />
  );
}
