const TEST_CASES_RAW = [
  {
    label: "Manual Provisioning via CLI",
    status: "ongoing",
    required: true,
    subtests: [
      {
        label: "OMCI Activation (Automated)",
        type: "checklist",
        status: "complete",
        required: true,
      },
      {
        label: "CLI Config (Automated)",
        type: "checklist",
        status: "ongoing",
        required: false,
      },
      {
        label: "NMS WAN (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "ONU WAN Status (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: false,
      },
      {
        label: "ONU WAN Config (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: false,
      },
      {
        label: "Speedtest Wired (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
  {
    label: "Activation via UMP",
    status: "ongoing",
    required: true,
    subtests: [
      {
        label: "Speedtest Wired (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: false,
      },
    ],
  },
  {
    label: "Change Package via UMP",
    status: "ongoing",
    required: false,
    subtests: [
      {
        label: "ONU WAN Status (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "ONU WAN Config (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: false,
      },
      {
        label: "Speedtest Wired (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
  {
    label: "Suspend and Resume via UMP",
    status: "ongoing",
    required: true,
    subtests: [
      {
        label: "OMCI Activation (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "CLI Config (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
  {
    label: "Reboot ONT and Clear BRAS",
    status: "ongoing",
    required: true,
    subtests: [
      {
        label: "OMCI Activation (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "CLI Config (Automated)",
        type: "checklist",
        status: "ongoing",
        required: false,
      },
      {
        label: "ONU WAN Status (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "ONU WAN Config (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wired (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: false,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
  {
    label: "Factory Reset ONU",
    status: "ongoing",
    required: false,
    subtests: [
      {
        label: "OMCI Activation (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "CLI Config (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "NMS WAN (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
  {
    label: "Terminate via UMP",
    status: "ongoing",
    required: true,
    subtests: [
      {
        label: "OMCI Activation (Automated)",
        type: "checklist",
        status: "ongoing",
        required: false,
      },
      {
        label: "CLI Config (Automated)",
        type: "checklist",
        status: "ongoing",
        required: false,
      },
      {
        label: "NMS WAN (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "ONU WAN Config (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wired (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: false,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
  {
    label: "IPv6 Test",
    status: "ongoing",
    required: false,
    subtests: [
      {
        label: "ONU WAN Status (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: false,
      },
      {
        label: "ONU WAN Config (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wired (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
  {
    label: "Customer Care View",
    status: "ongoing",
    required: true,
    subtests: [
      {
        label: "OMCI Activation (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "CLI Config (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "NMS WAN (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wired (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wireless (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
  {
    label: "Activation via JOMOBILE",
    status: "ongoing",
    required: true,
    subtests: [
      {
        label: "OMCI Activation (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "CLI Config (Automated)",
        type: "checklist",
        status: "ongoing",
        required: true,
      },
      {
        label: "NMS WAN (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "ONU WAN Status (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "ONU WAN Config (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
      {
        label: "Speedtest Wired (Upload Screenshot)",
        type: "upload",
        status: "ongoing",
        required: true,
      },
    ],
  },
];

export const TEST_CASES = TEST_CASES_RAW.map((test, index) => {
  const subtests = test.subtests.map((subtest) => {
    subtest.id = Math.floor(Math.random() * 10000);
    return subtest;
  });

  test.subtests = subtests;
  test.id = index + 1;
  return test;
});

export const SERVICES = {
  fttx: {
    service: "FTTX",
    description: "FiberX",
    status: "ongoing",
    olt: [
      {
        olt: "Nokia ISAM FX-4 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
      {
        olt: "ZTE C650 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
      {
        olt: "ZTE C320 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
      {
        olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
      {
        olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
    ],
  },
  cielo: {
    service: "Cielo",
    description: "SkyCable",
    status: "ongoing",
    olt: [
      {
        olt: "Nokia ISAM FX-4 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
      {
        olt: "ZTE C650 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
      {
        olt: "ZTE C320 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
      {
        olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
      {
        olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
      },
    ],
  },
  fast: {
    service: "FAST",
    description: "",
    status: "ongoing",
    olt: [
      {
        olt: "Nokia ISAM FX-4 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "complete",
        document: {
          status: "forRequest",
        },
      },
      {
        olt: "ZTE C650 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "forApproval",
        document: {
          status: "pending",
        },
      },
      {
        olt: "ZTE C320 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "ongoing",
        document: {
          status: "unavailable",
        },
      },
      {
        olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "complete",
        document: {
          status: "forApproval",
        },
      },
      {
        olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "approved",
        document: {
          status: "available",
        },
      },
    ],
  },
  ibiz: {
    service: "IBIZ",
    description: "",
    status: "complete",
    olt: [
      {
        olt: "Nokia ISAM FX-4 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "complete",
      },
      {
        olt: "ZTE C650 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "complete",
      },
      {
        olt: "ZTE C320 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "complete",
      },
      {
        olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "complete",
      },
      {
        olt: "Huawei MA5800-X2 (NOKIA-TLAB00)",
        bras: "ZTE ZXR100 M6000-S (TLAB-BRAS02)",
        status: "complete",
      },
    ],
  },
};
