import { dateInDaysUntilToday } from "helpers";

describe("dateInDaysUntilToday", () => {
  it("should return diference of days until now", () => {
    const d = new Date();
    d.setDate(d.getDate() - 2);
    expect(dateInDaysUntilToday(d)).toBe(2);
  });

  it("should fail if the diference from today is not 2", () => {
    const d = new Date();
    d.setDate(d.getDate() - 3);
    expect(dateInDaysUntilToday(d)).not.toBe(2);
  });
});
