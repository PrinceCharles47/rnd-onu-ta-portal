import { LoadingOverlay, Center, Stack, Loader, Text } from "@mantine/core";

export default function Loading({ loading, message }) {
  return (
    <>
      <LoadingOverlay
        visible={loading}
        zIndex={1000}
        overlayProps={{ blur: 4, color: "gray.2" }}
        loaderProps={{ type: null }}
      />
      {loading && (
        <Center
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            zIndex: 1001,
            pointerEvents: "none",
          }}
        >
          <Stack align="center">
            <Loader size="md" type="bars" />
            <Text fw={700} c="dimmed">
              {message}
            </Text>
          </Stack>
        </Center>
      )}
    </>
  );
}
