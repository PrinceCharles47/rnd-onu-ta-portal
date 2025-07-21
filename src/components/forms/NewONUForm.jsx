import {
  Drawer,
  Group,
  Select,
  Text,
  TextInput,
  Stack,
  Button,
  Divider,
  SimpleGrid,
} from "@mantine/core";

import { useForm, isNotEmpty } from "@mantine/form";
import { addONUFormFields } from "../../utils/forms";

export default function NewONUForm({ opened, onClose }) {
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

  const getTextField = (props) => {
    const { type, formkey } = props;
    const commonProps = {
      ...form.getInputProps(formkey),
      ...props,
    };

    switch (type) {
      case "text":
        return <TextInput key={form.key(formkey)} {...commonProps} />;
      case "select":
        return <Select key={form.key(formkey)} {...commonProps} />;
      default:
        return <TextInput key={form.key(formkey)} {...commonProps} />;
    }
  };

  const validate = () => {
    console.log(form.getValues());
  };

  return (
    <>
      <Drawer
        opened={opened}
        onClose={onClose}
        title={
          <Text fz="xl" fw={500}>
            Add ONU
          </Text>
        }
        position="right"
        size="xl"
      >
        <form onSubmit={form.onSubmit(validate)}>
          <Stack>
            <SimpleGrid spacing="xl" cols={{ base: 1, md: 2 }}>
              {addONUFormFields.map((field) => getTextField(field))}
            </SimpleGrid>

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
