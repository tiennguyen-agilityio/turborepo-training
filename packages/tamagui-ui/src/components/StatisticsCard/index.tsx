import { Stack, Text, H6 } from "tamagui";
import { Plus } from "@tamagui/lucide-icons";

interface StatisticsCardProps {
  title: string;
  value: string;
}

const StatisticsCard = ({ title, value }: StatisticsCardProps) => {
  return (
    <Stack width="100%">
      <H6 fontSize="$sm" $md={{ fontSize: "$md", marginBottom: "$2" }}>
        {title}
      </H6>
      <Text
        fontSize={30}
        lineHeight="$sx"
        $md={{
          fontSize: 70,
          lineHeight: 74,
        }}
      >
        {value}
        <Plus fontWeight={700} display="inline" $md={{ size: 40 }} />
      </Text>
    </Stack>
  );
};

export default StatisticsCard;
