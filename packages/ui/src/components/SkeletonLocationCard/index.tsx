import React from "react";

import { Skeleton } from "../ui/skeleton";
import { Card, CardContent, CardHeader } from "../ui/card";

interface SkeletonLocationCard {
  imageHeight?: number;
}

const SkeletonLocationCard = ({ imageHeight = 340 }: SkeletonLocationCard) => {
  return (
    <Card className="w-full h-full p-0">
      <CardHeader className="p-0" style={{ height: imageHeight }}>
        <Skeleton className="w-full" style={{ height: imageHeight }} />
      </CardHeader>
      <CardContent className="px-7.5 pt-4 pb-6">
        <Skeleton className="w-full h-7" />
        <Skeleton className="w-full h-6 mt-3" />
        <Skeleton className="w-full h-6 mt-4" />
      </CardContent>
    </Card>
  );
};

export default SkeletonLocationCard;
