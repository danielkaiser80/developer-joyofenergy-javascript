const {
  getPricePlan,
  getUsageDataForLastWeek,
} = require("./weekly-costs-controller");
const { readings } = require("../readings/readings");
const { meters } = require("../meters/meters");
describe(getPricePlan, () => {
  it("should throw error message when no price plan exists", () => {
    expect(() => getPricePlan("smart-meter-3")).toThrow("No price plan found");
  });

  it("should return the plan, when it exists", () => {
    expect(getPricePlan("smart-meter-0")).toEqual({
      supplier: "Dr Evil's Dark Energy",
      rate: 10,
    });
  });
});

describe(getUsageDataForLastWeek, () => {
  it("should find usage data", function () {
    const { getReadings } = readings({
      [meters.METER0]: [
        { time: new Date("2023/05/07").valueOf(), reading: 0.26785 },
        { time: new Date("2023/05/06").valueOf(), reading: 0.25 },
        { time: new Date("2023/05/05").valueOf(), reading: 0.24 },
        { time: new Date("2023/04/30").valueOf(), reading: 0.24 },
      ],
    });

    expect(getUsageDataForLastWeek(getReadings(meters.METER0))).toEqual([
      { reading: 0.26785, time: 1683410400000 },
      { reading: 0.25, time: 1683324000000 },
      { reading: 0.24, time: 1683237600000 },
    ]);
  });
});
