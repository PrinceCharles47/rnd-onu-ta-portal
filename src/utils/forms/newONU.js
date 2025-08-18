import { isNotEmpty } from "@mantine/form";

export const newONUFormFields = [
  { label: "Name", type: "text", formkey: "name" },
  { label: "Model", type: "text", formkey: "model" },
  {
    label: "WiFi Type",
    type: "select",
    formkey: "wifiType",
    data: [
      { value: "wifi6", label: "WiFi 6" },
      { value: "wifi5_bida", label: "WiFi 5 (BIDA)" },
      { value: "wifi5_s2s", label: "WiFi 5 (S2S)" },
      { value: "wifi5", label: "WiFi 5 (BIDA and S2S)" },
    ],
  },
  { label: "Firmware", type: "text", formkey: "firmware" },
  {
    label: "ONT Type",
    type: "select",
    formkey: "ontType",
    data: [
      { value: "gpon", label: "GPON" },
      { value: "epc", label: "EPC" },
      { value: "xgpon", label: "XG-PON" },
    ],
  },
  { label: "Product ID", type: "text", formkey: "productId" },
  { label: "Vendor ID", type: "text", formkey: "vendorId" },
  { label: "Equipment ID", type: "text", formkey: "equipmentId" },
  { label: "SN Format", type: "text", formkey: "snFormat" },
  { label: "Software Version", type: "text", formkey: "softwareVersion" },
  { label: "PON Chipset", type: "text", formkey: "ponChipset" },
  { label: "ONT Interface", type: "text", formkey: "ontInterface" },
  { label: "TCONT Numbers", type: "number", formkey: "tcontNumbers" },
  { label: "QOS Queue Numbers", type: "number", formkey: "qosQueueNumbers" },
  { label: "IGMP Version", type: "text", formkey: "igmpVersion" },
  { label: "VOIP Protocol", type: "text", formkey: "voipProtocol" },
  {
    label: "Third Party OLT Support",
    type: "select",
    formkey: "thirdPartyOltSupport",
    data: [
      { value: "yes", label: "Yes" },
      { value: "no", label: "No" },
    ],
  },
];

const validate = {
  name: isNotEmpty("ONU name is required."),
  model: isNotEmpty("Model is required."),
  wifiType: isNotEmpty("WiFi type is required."),
  firmware: isNotEmpty("Firmware is required."),
  ontType: isNotEmpty("ONT type is required."),
  productId: isNotEmpty("Product ID is required."),
  vendorId: isNotEmpty("Vendor ID is required."),
  equipmentId: isNotEmpty("Equipment ID is required."),
  snFormat: isNotEmpty("SN format is required."),
  softwareVersion: isNotEmpty("Software version is required."),
  ponChipset: isNotEmpty("PON chipset is required."),
  ontInterface: isNotEmpty("ONT interface is required."),
  tcontNumbers: (value) =>
    !value || value <= 0 ? "TCONT numbers are required." : null,
  qosQueueNumbers: (value) =>
    !value || value <= 0 ? "QOS Queue Numbers are required." : null,
  igmpVersion: isNotEmpty("IGMP version is required."),
  voipProtocol: isNotEmpty("VOIP protocol is required."),
};

export const newONUFormConfig = {
  mode: "uncontrolled",
  initialValues: {
    name: "",
    model: "",
    wifiType: "",
    firmware: "",
    ontType: "",
    productId: "",
    vendorId: "",
    equipmentId: "",
    snFormat: "",
    softwareVersion: "",
    ponChipset: "",
    ontInterface: "",
    tcontNumbers: 0,
    qosQueueNumbers: 0,
    igmpVersion: "",
    voipProtocol: "",
    thirdPartyOltSupport: "no",
  },
  validate,
};
