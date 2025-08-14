import { formatAmount } from "../common";

describe("formatAmount", () => {
  it("should format integer numbers with commas", () => {
    expect(formatAmount(1000)).toBe("1,000");
    expect(formatAmount(1234567)).toBe("1,234,567");
  });

  it("should format floating numbers with 2 decimal places", () => {
    expect(formatAmount(1234.5)).toBe("1,234.50");
    expect(formatAmount(9876.54321)).toBe("9,876.54");
  });

  it("should return '0' for 0", () => {
    expect(formatAmount(0)).toBe("0");
  });

  it("should handle negative integers", () => {
    expect(formatAmount(-5000)).toBe("-5,000");
  });

  it("should handle negative floats", () => {
    expect(formatAmount(-1234.567)).toBe("-1,234.57");
  });
});
