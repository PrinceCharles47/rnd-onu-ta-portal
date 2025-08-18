import { Indicator } from "@mantine/core";
import FilterForm from "./contents/FilterForm";
import IconBtn from "../buttons/IconBtn";
import { IconFilter2 } from "@tabler/icons-react";

import {
  onuFilterFormConfig,
  onuFilterFormFields,
} from "../../utils/forms/onuFilter";
import { openModal } from "../../utils/modal";
import { useForm } from "@mantine/form";

export default function ONUFilterModal({ onFilter, isEmpty }) {
  const form = useForm(onuFilterFormConfig);

  return (
    <Indicator
      disabled={isEmpty}
      inline
      color="yellow"
      size={15}
      withBorder
      processing
      zIndex={1}
    >
      <IconBtn
        tooltip="Filter"
        icon={IconFilter2}
        props={{ size: 40, variant: "filled" }}
        onClick={() =>
          openModal({
            children: (
              <FilterForm
                onFilter={onFilter}
                form={form}
                fields={onuFilterFormFields}
              />
            ),
          })
        }
      />
    </Indicator>
  );
}
