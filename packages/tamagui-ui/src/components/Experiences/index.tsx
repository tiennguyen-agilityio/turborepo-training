"use client";

import { Fragment, useState } from "react";
import { XStack, Separator } from "tamagui";

// Types
import { Experience } from "@repo/types/common";

// Components
import ExperienceItem from "../ExperienceItem";

interface ExperiencesProps {
  data: Experience[];
  onItemClick: (index: number) => void;
}

const Experiences = ({ data, onItemClick }: ExperiencesProps) => {
  const [indexActive, setIndexActive] = useState<number>();
  const length = data.length;

  return (
    <XStack
      alignItems="center"
      justifyContent="space-between"
      $xs={{ paddingRight: "$3" }}
    >
      {data?.map(({ label = "", title }, index) => {
        const isActive = indexActive === index;

        const handleClick = () => {
          if (indexActive === index) return;
          setIndexActive(index);
          onItemClick(index);
        };

        return (
          <Fragment key={index}>
            <ExperienceItem
              label={label}
              title={title}
              isActive={isActive}
              onClick={handleClick}
            />

            {index < length - 1 && (
              <Separator
                vertical
                height="$12"
                backgroundColor="$border"
                $lg={{ height: 70 }}
                transform={[{ rotate: "20deg" }]}
              />
            )}
          </Fragment>
        );
      })}
    </XStack>
  );
};

export default Experiences;
