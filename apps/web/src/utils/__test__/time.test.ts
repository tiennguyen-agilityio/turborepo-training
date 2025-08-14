import { formatMinutes } from "../time";

describe("formatMinutes", () => {
  it("should return 'Invalid time' for negative values", () => {
    expect(formatMinutes(-5)).toBe("Invalid time");
  });

  it("should format minutes less than 60", () => {
    expect(formatMinutes(1)).toBe("1 minute");
    expect(formatMinutes(30)).toBe("30 minutes");
    expect(formatMinutes(0)).toBe("0 minutes");
  });

  it("should format hours without days", () => {
    expect(formatMinutes(60)).toBe("1 hour");
    expect(formatMinutes(125)).toBe("2 hours 5 minutes");
  });

  it("should format days without hours", () => {
    expect(formatMinutes(1440)).toBe("1 day");
    expect(formatMinutes(2880)).toBe("2 days");
  });

  it("should format days with hours and minutes", () => {
    expect(formatMinutes(1501)).toBe("1 day 1 hour 1 minute");
    expect(formatMinutes(2895)).toBe("2 days 15 minutes");
    expect(formatMinutes(3005)).toBe("2 days 2 hours 5 minutes");
  });

  it("should handle pluralization correctly", () => {
    expect(formatMinutes(1)).toBe("1 minute");
    expect(formatMinutes(2)).toBe("2 minutes");
    expect(formatMinutes(60)).toBe("1 hour");
    expect(formatMinutes(120)).toBe("2 hours");
    expect(formatMinutes(1440)).toBe("1 day");
    expect(formatMinutes(2880)).toBe("2 days");
  });
});
