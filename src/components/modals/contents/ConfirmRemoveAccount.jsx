import { Stack, Text, Divider, Group, Button } from "@mantine/core";
import { useUserActions } from "../../../hooks/user/useUserActions";
import { modals } from "@mantine/modals";

export default function ConfirmRemoveAccount({ userId, username, fullName }) {
  const { removeAccount, isRemoveAccountPending: isPending } = useUserActions();

  const handleRemoveAccount = () => {
    removeAccount({ userId });
    modals.closeAll();
  };

  return (
    <Stack gap="xl">
      <Text fz="sm">
        Are you sure you want to remove this account? This action is permanent.
      </Text>
      <div>
        <Text fz="sm" fw={500}>
          {username}
        </Text>
        <Text fz="xs" c="dimmed">
          {fullName}
        </Text>
      </div>

      <div>
        <Divider mb="md"/>
        <Group grow>
          <Button variant="default" onClick={() => modals.closeAll()}>
            Cancel
          </Button>
          <Button color="red" loading={isPending} onClick={handleRemoveAccount}>
            Remove
          </Button>
        </Group>
      </div>
    </Stack>
  );
}
