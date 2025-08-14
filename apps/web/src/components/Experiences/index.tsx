"use client";

import React, { Fragment, useState } from "react";

import { Experience } from "@/types/common";

import { Separator } from "../ui/separator";
import ExperienceItem from "../ExperienceItem";

interface ExperiencesProps {
  data: Experience[];
  onItemClick: (index: number) => void;
}

const Experiences = ({ data, onItemClick }: ExperiencesProps) => {
  const [indexActive, setIndexActive] = useState<number>();

  const length = data.length;

  return (
    <div className="flex min-w-full items-center justify-between sm:pr-3 lg:pr-10">
      {data?.map(({ label = "", title }, index) => {
        const isActive = indexActive === index;

        const handleClick = () => {
          if (indexActive === index) return;

          setIndexActive(index);
          onItemClick(index);
        };

        return (
          <Fragment key={index}>
            <ExperienceItem label={label} title={title} isActive={isActive} onClick={handleClick} />
            {index < length - 1 && (
              <Separator orientation="vertical" className="rotate-20 max-h-12 lg:max-h-17.5" />
            )}
          </Fragment>
        );
      })}
    </div>
  );
};

export default Experiences;
