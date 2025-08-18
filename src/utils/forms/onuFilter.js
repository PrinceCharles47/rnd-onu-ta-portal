export const onuFilterFormFields = [
  // { label: "Status", type: "text", formkey: "status" },
  {
    label: "Status",
    type: "select",
    formkey: "status",
    data: [
      { value: "pending_iof", label: "Pending IOF" },
      { value: "ready_for_ta", label: "Ready for TA" },
      { value: "ongoing_ta", label: "Ongoing TA" },
      { value: "type_approved", label: "Type Approved" },
    ],
  },
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
];

export const onuFilterFormConfig = {
  mode: "uncontrolled",
  initialValues: {
    status: "",
    wifiType: "",
    ontType: "",
  },
};
