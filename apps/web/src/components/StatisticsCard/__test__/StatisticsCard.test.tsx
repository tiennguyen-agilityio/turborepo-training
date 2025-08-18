import { render } from "@testing-library/react";

import StatisticsCard from "..";
import { STATISTICS_BY_SERVICES } from "@repo/constants/common";

describe("StatisticsCard component", () => {
  const props = {
    ...STATISTICS_BY_SERVICES[0],
  };

  it("should render correctly", () => {
    const { container } = render(<StatisticsCard {...props} />);

    expect(container).toMatchSnapshot();
  });
});
