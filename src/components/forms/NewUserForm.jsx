import {
  Stack,
  Divider,
  Group,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useState } from "react";
import { modals } from "@mantine/modals";
import { useCreateUser } from "../../hooks/user/useCreateUser";
import {
  newUserFormFields,
  newUserFormConfig,
} from "../../utils/forms/newUser";

export default function NewUserForm() {
  const { createUser, isPending } = useCreateUser();
  const [hiddenFields, setHiddenFields] = useState(["vendorType"]);
  const form = useForm(newUserFormConfig);

  const handleCreateUser = () => {
    const payload = form.getValues();
    if (payload.roleName !== "vendor") {
      payload.vendorType = "";
    }
    createUser(payload);
    modals.closeAll();
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
      key: form.key(formkey),
      onChange: handleChange,
    };

    const hiddenStyle =
      hiddenFields.includes(formkey) && type === "select"
        ? { display: "none" }
        : undefined;

    const components = {
      text: <TextInput {...commonProps} />,
      select: <Select {...commonProps} style={hiddenStyle} />,
    };

    return components[type] || <TextInput {...commonProps} />;
  };

  return (
    <form onSubmit={form.onSubmit(handleCreateUser)}>
      <Stack>
        {newUserFormFields.map(getTextField)}
        <Divider />
        <Group grow>
          <Button
            variant="default"
            disabled={isPending}
            onClick={() => modals.closeAll()}
          >
            Close
          </Button>
          <Button type="submit" color="teal" loading={isPending}>
            Create
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
