import {
  Stack,
  Divider,
  Group,
  Button,
  TextInput,
  Select,
} from "@mantine/core";
import { modals } from "@mantine/modals";

export default function FilterForm({ form, fields, onFilter }) {
  const handleFilter = () => {
    const payload = form.getValues();
    onFilter(payload);
    modals.closeAll();
  };

  const getTextField = ({ type, formkey, onChange, ...rest }) => {
    const props = {
      type,
      ...form.getInputProps(formkey),
      ...rest,
    };
    const fields = {
      text: <TextInput key={form.key(formkey)} {...props} />,
      select: <Select key={form.key(formkey)} {...props} />,
    };

    return fields[type];
  };

  const resetFilters = () => {
    onFilter(null);
    form.reset();
    modals.closeAll();
  };

  return (
    <form onSubmit={form.onSubmit(handleFilter)}>
      <Stack>
        {fields.map(getTextField)}
        <Divider />
        <Group grow>
          <Button variant="default" onClick={resetFilters}>
            Reset
          </Button>
          <Button type="submit">
            Filter
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
