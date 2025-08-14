import React from "react";
import Heading from "../Heading";

interface StatisticsCardProps {
  title: string;
  value: string;
}

const StatisticsCard = ({ title, value }: StatisticsCardProps) => {
  return (
    <div className="w-full">
      <Heading as="h6" className="font-primary mb-4">
        {title}
      </Heading>
      <span className="mt-4 text-3xl lg:text-[70px] lg:leading-[65px]">{value}</span>
    </div>
  );
};

export default StatisticsCard;
