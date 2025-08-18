import {
  Stack,
  Divider,
  Group,
  Button,
  TextInput,
  Text,
  Select,
  NumberInput,
  Switch,
} from "@mantine/core";
import { modals } from "@mantine/modals";
import { useONUActions } from "../../../hooks/onu/useONUActions";
import {
  newONUFormConfig,
  newONUFormFields,
} from "../../../utils/forms/newONU";
import { useForm } from "@mantine/form";

export default function NewONUForm() {
  const { createONU, isCreateONUPending: isPending } = useONUActions();
  const form = useForm(newONUFormConfig);

  const handleCreateONU = (values) => {
    console.log(values);
    values.thirdPartyOltSupport =
      values.thirdPartyOltSupport === "yes" ? true : false;

    console.log(values);
    createONU(values);
    modals.closeAll();
  };

  const getTextField = ({ type, formkey, onChange, ...rest }) => {
    const props = {
      type: type === "number" ? "text" : type, // looks dumb but the NumberInput only accepts text when using increment/decrement buttons
      ...form.getInputProps(formkey),
      ...rest,
    };
    const fields = {
      text: <TextInput key={form.key(formkey)} {...props} />,
      select: <Select key={form.key(formkey)} {...props} />,
      number: (
        <NumberInput allowNegative={false} key={form.key(formkey)} {...props} />
      ),
    };

    return fields[type] || <TextInput key={form.key(formkey)} {...props} />;
  };

  return (
    <form onSubmit={form.onSubmit((values) => handleCreateONU(values))}>
      <Stack>
        {newONUFormFields.map(getTextField)}
        <Divider />
        <Group grow>
          <Button
            variant="default"
            disabled={isPending}
            onClick={() => modals.closeAll()}
          >
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
