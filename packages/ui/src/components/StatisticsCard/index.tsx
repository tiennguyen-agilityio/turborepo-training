import { Stack, Text, H6 } from "tamagui";

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
      </Text>
    </Stack>
  );
};

export default StatisticsCard;
