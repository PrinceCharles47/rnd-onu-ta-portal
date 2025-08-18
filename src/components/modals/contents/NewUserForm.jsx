import {
  Stack,
  Divider,
  Group,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
import { useState } from "react";
import { modals } from "@mantine/modals";
import { useUserActions } from "../../../hooks/user/useUserActions";
import {
  newUserFormConfig,
  newUserFormFields,
} from "../../../utils/forms/newUser";
import { useForm } from "@mantine/form";

export default function NewUserForm() {
  const [hiddenFields, setHiddenFields] = useState(["vendorType"]);
  const { createUser, isCreateUserPending: isPending } = useUserActions();
  const form = useForm(newUserFormConfig);

  const handleCreateUser = (values) => {
    if (values.roleName !== "vendor") {
      values.vendorType = "";
    }
    createUser(values);
    closeForm();
  };

  // show/hide fields
  const toggleFieldVisibility = (fieldKey, shouldShow) => {
    setHiddenFields((prev) =>
      shouldShow
        ? prev.filter((item) => item !== fieldKey)
        : prev.includes(fieldKey)
        ? prev
        : [...prev, fieldKey]
    );
    form.setFieldValue(fieldKey, "");
  };

  // for fields with additional logic that must run on event trigger
  const fieldDependencies = {
    roleName: (val) => toggleFieldVisibility("vendorType", val === "vendor"),
  };

  const getTextField = ({ type, formkey, onChange, ...rest }) => {
    const { onChange: mantineOnChange, ...mantineProps } =
      form.getInputProps(formkey);

    const handleChange = (val) => {
      mantineOnChange(val);
      if (fieldDependencies[formkey]) fieldDependencies[formkey](val);
      if (onChange) onChange(val);
    };

    const commonProps = {
      ...mantineProps,
      ...rest,
      onChange: handleChange,
    };

    const hiddenStyle =
      hiddenFields.includes(formkey) && type === "select"
        ? { display: "none" }
        : undefined;

    const components = {
      text: <TextInput key={form.key(formkey)} {...commonProps} />,
      select: (
        <Select key={form.key(formkey)} {...commonProps} style={hiddenStyle} />
      ),
    };

    return (
      components[type] || <TextInput key={form.key(formkey)} {...commonProps} />
    );
  };

  const closeForm = () => {
    form.reset();
    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleCreateUser(values))}>
      <Stack>
        {newUserFormFields.map(getTextField)}
        <Divider />
        <Group grow>
          <Button variant="default" disabled={isPending} onClick={closeForm}>
            Close
          </Button>
          <Button type="submit" loading={isPending}>
            Create
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
