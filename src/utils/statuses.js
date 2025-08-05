/*
  ONU/ONT
  -pendingIOF
  -readyForTA
  -ongoingTA
  -typeApproved

  service
  -ongoing
  -complete

  olt
  -ongoing
  -complete
  -forApproval
  -approved

  test cases
  -ongoing
  -complete

  documents
  -unavailable
  -forRequest
  -pending
  -provided
  -available
  -forApproval
  -approved
*/

// leave color as empty string for default (shade of blue)
export const statusProps = {
  pendingIOF: { label: "Pending IOF", color: "gray" },
  ongoingTA: { label: "Ongoing TA", color: "orange" },
  readyForTA: { label: "Ready for TA", color: "blue" },
  typeApproved: { label: "Type Approved", color: "teal" },
  ongoing: { label: "Ongoing", color: "orange" },
  complete: { label: "Complete", color: "green" },
  pending: { label: "Pending", color: "gray" },
  unavailable: { label: "Unavailable", color: "gray" },
  forRequest: { label: "For request", color: "orange" },
  pendingRequest: { label: "Pending Request", color: "gray" },
  available: { label: "Available", color: "green" },
  provided: { label: "Provided", color: "green" },
  forApproval: { label: "For Approval", color: "violet" },
  approved: { label: "Approved", color: "teal" },
};
