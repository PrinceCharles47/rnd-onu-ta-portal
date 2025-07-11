import { IconCoin, IconReceipt2, IconUserPlus } from "@tabler/icons-react";
import { SimpleGrid, Container } from "@mantine/core";
import AnalyticsCard from "../../components/cards/AnalyticsCard";

const icons = {
  user: IconUserPlus,
  discount: IconUserPlus,
  receipt: IconReceipt2,
  coin: IconCoin,
};

const data = [
  { title: "Revenue", icon: "receipt", value: "13,456", diff: 34 },
  { title: "Profit", icon: "coin", value: "4,145", diff: -13 },
  { title: "Coupons usage", icon: "discount", value: "745", diff: 18 },
  { title: "New customers", icon: "user", value: "188", diff: -30 },
];

export default function OngoingTAPage({}) {
  return (
    <Container fluid>
      <div>
        <SimpleGrid cols={{ base: 1, xs: 2, md: 4 }}>
          {data.map((item) => (
            <AnalyticsCard
              key={item.title}
              title={item.title}
              value={item.value}
              icon={icons[item.icon]}
            />
          ))}
        </SimpleGrid>
      </div>
    </Container>
  );
}
