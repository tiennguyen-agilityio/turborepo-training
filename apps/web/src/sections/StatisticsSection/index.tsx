import React from "react";

import { STATISTICS_BY_SERVICES } from "@/constants/common";

import StatisticsCard from "@/components/StatisticsCard";

const StatisticsSection = () => {
  return (
    <section className="container mx-auto flex justify-between flex-wrap md:flex-nowrap my-20 px-5">
      {STATISTICS_BY_SERVICES.map(({ title, value }) => (
        <div key={title} className="w-1/2 md:w-1/4">
          <StatisticsCard title={title} value={value} />
        </div>
      ))}
    </section>
  );
};

export default StatisticsSection;
