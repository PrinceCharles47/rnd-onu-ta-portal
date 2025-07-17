import {
  Drawer,
  Group,
  ScrollArea,
  Text,
  TextInput,
  Stack,
  Button,
  Divider,
} from "@mantine/core";

import { useForm, isNotEmpty } from "@mantine/form";

const textFields = [
  { name: "ONU Name", type: "text", key: "onuName" },
  { name: "Model", type: "text", key: "model" },
  { name: "WiFi Type", type: "text", key: "wifiType" },
  { name: "Firmware", type: "text", key: "firmware" },
  { name: "ONT Type", type: "text", key: "ontType" },
  { name: "Product ID", type: "text", key: "productID" },
  { name: "Vendor ID", type: "text", key: "vendorID" },
  { name: "Equipment ID", type: "text", key: "equipmentID" },
  { name: "SN Format", type: "text", key: "snFormat" },
  { name: "Software Version", type: "text", key: "softwareVersion" },
  { name: "PON Chipset", type: "text", key: "ponChipset" },
  { name: "ONT Interface", type: "text", key: "ontInterface" },
  { name: "TCONT Numbers", type: "text", key: "tcontNumbers" },
  { name: "QOS-Queue Numbers", type: "text", key: "qosQueueNumbers" },
  { name: "IGMP Version", type: "text", key: "igmpVersion" },
  { name: "VOIP Protocol", type: "text", key: "voipProtocol" },
  { name: "3rd Party OLT Support", type: "text", key: "thirdPartyOLTSupport" },
];

export default function AddONUDialog({ opened, onClose }) {
  const form = useForm({
    mode: "uncontrolled",
    initialValues: {
      onuName: "",
      model: "",
      wifiType: "",
      firmware: "",
      ontType: "",
      productID: "",
      vendorID: "",
      equipmentID: "",
      snFormat: "",
      softwareVersion: "",
      ponChipset: "",
      ontInterface: "",
      tcontNumbers: "",
      qosQueueNumbers: "",
      igmpVersion: "",
      voipProtocol: "",
      thirdPartyOLTSupport: "",
    },
    validate: {
      onuName: isNotEmpty("ONU name is required."),
      model: isNotEmpty("Model is required."),
      wifiType: isNotEmpty("WiFi type is required."),
      firmware: isNotEmpty("Firmware is required."),
      ontType: isNotEmpty("ONT type is required."),
      productID: isNotEmpty("Product ID is required."),
      vendorID: isNotEmpty("Vendor ID is required."),
      equipmentID: isNotEmpty("Equipment ID is required."),
      snFormat: isNotEmpty("SN format is required."),
      softwareVersion: isNotEmpty("Software version is required."),
      ponChipset: isNotEmpty("PON chipset is required."),
      ontInterface: isNotEmpty("ONT interface is required."),
      tcontNumbers: isNotEmpty("TCONT numbers are required."),
      qosQueueNumbers: isNotEmpty("QOS-Queue numbers are required."),
      igmpVersion: isNotEmpty("IGMP version is required."),
      voipProtocol: isNotEmpty("VOIP protocol is required."),
      thirdPartyOLTSupport: isNotEmpty("3rd party OLT support is required."),
    },
  });

  const validate = () => {
    console.log(form.getValues());
  };

  return (
    <>
      <Drawer
        offset={8}
        radius="md"
        opened={opened}
        onClose={onClose}
        title={
          <Text fz="xl" fw={500}>
            Add ONU
          </Text>
        }
        position="right"
        scrollAreaComponent={ScrollArea.Autosize}
      >
        <form onSubmit={form.onSubmit(validate)}>
          <Stack>
            {textFields.map((field) => (
              <TextInput
                label={field.name}
                key={form.key(field.key)}
                type={field.type}
                {...form.getInputProps(field.key)}
              />
            ))}

            <Divider mt="md" />

            <Group justify="space-between" mb="md">
              <Button flex={1} variant="outline" color="red">
                Cancel
              </Button>
              <Button flex={1} type="submit">
                Submit
              </Button>
            </Group>
          </Stack>
        </form>
      </Drawer>
    </>
  );
}

function TextField({ label, type, props }) {
  return (
    <Group justify="space-between">
      <Text>{label}</Text>
      <TextInput type={type} {...props} />
    </Group>
  );
}
