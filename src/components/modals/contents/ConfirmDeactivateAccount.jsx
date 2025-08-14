import { Stack, Text, Divider, Group, Button } from "@mantine/core";
import { useUserActions } from "../../../hooks/user/useUserActions";
import { modals } from "@mantine/modals";

export default function ConfirmDeactivateAccount({
  userId,
  username,
  fullName,
}) {
  const { deactivateAccount, isDeactivateAccountPending: isPending } =
    useUserActions();

  const handleDeactivateAccount = () => {
    deactivateAccount({ userId });
    modals.closeAll();
  };

  return (
    <Stack gap="xl">
      <Text fz="sm">
        Are you sure you want to deactivate this account? Deactivation will
        archive the account and must be restored to be used again.
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
        <Divider mb="md" />
        <Group grow>
          <Button variant="default" onClick={() => modals.closeAll()}>
            Cancel
          </Button>
          <Button
            color="red"
            loading={isPending}
            onClick={handleDeactivateAccount}
          >
            Deactivate
          </Button>
        </Group>
      </div>
    </Stack>
  );
}
