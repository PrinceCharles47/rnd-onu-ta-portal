import { Stack, Divider, Group, Button, TextInput } from "@mantine/core";
import { useUserActions } from "../../../hooks/user/useUserActions";
import { modals } from "@mantine/modals";
import { useForm } from "@mantine/form";
import {
  changePasswordFormFields,
  changePasswordFormConfig,
} from "../../../utils/forms/changePassword";

export default function ChangePasswordForm({ userId }) {
  const { changePassword, isChangePasswordPending: isPending } =
    useUserActions();
  const form = useForm(changePasswordFormConfig);

  const handleChangePassword = () => {
    const payload = form.getValues();
    changePassword({ userId, payload });
    modals.closeAll();
  };

  const getTextField = ({ type, formkey, onChange, ...rest }) => (
    <TextInput
      key={form.key(formkey)}
      type={type}
      {...form.getInputProps(formkey)}
      {...rest}
    />
  );

  return (
    <form onSubmit={form.onSubmit(handleChangePassword)}>
      <Stack>
        {changePasswordFormFields.map(getTextField)}
        <Divider />
        <Group grow>
          <Button variant="default" onClick={() => modals.closeAll()}>
            Close
          </Button>
          <Button type="submit" loading={isPending}>
            Submit
          </Button>
        </Group>
      </Stack>
    </form>
  );
}
