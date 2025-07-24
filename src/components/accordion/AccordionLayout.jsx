import { Stack, Text, Accordion, Group, Box } from "@mantine/core";
import { useMemo } from "react";

export default function AccordionLayout({ items, props }) {
  const accordionItems = useMemo(() => {
    return items.map((item) => (
      <Accordion.Item value={item.label} key={item.label}>
        <Accordion.Control>
          <AccordionLabel {...item} />
        </Accordion.Control>
        {item.panel && <Accordion.Panel>{item.panel}</Accordion.Panel>}
      </Accordion.Item>
    ));
  }, [items]);

  return (
    <Accordion
      defaultValue={items[0]?.label}
      variant="contained"
      chevronPosition="right"
      radius="lg"
      {...props}
    >
      {accordionItems}
    </Accordion>
  );
}

function AccordionLabel({ label, description, pill }) {
  return (
    <Group mr="md" justify="space-between">
      <Stack gap={0}>
        <Text fw={500}>{label}</Text>
        {typeof description === "string" ? (
          <Text fz="sm" c="dimmed">
            {description}
          </Text>
        ) : (
          <Box>{description}</Box>
        )}
      </Stack>

      {pill && pill}
    </Group>
  );
}
