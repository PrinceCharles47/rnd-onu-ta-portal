import { modals } from "@mantine/modals";

export const openModal = ({ title, children, props }) =>
  modals.open({
    title: title,
    centered: true,
    children: children,
    withCloseButton: false,
    ...props,
  });
