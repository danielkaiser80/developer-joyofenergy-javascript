const { usageCost } = require("../usage/usage");
const { meterPricePlanMap } = require("../meters/meters");

const oneWeek = 7 * 24 * 60 * 60 * 1000;
const getWeeklyCosts = (getData, req) => {
  const meter = req.params.smartMeterId;

  const pricePlan = getPricePlan(meter);

  const usageData = getUsageDataForLastWeek(getData(meter));

  return usageCost(usageData, pricePlan.rate);
};

const getPricePlan = (smartMeterId) => {
  const pricePlan = meterPricePlanMap[smartMeterId];

  if (!pricePlan) {
    throw new Error("No price plan found");
  }

  return pricePlan; // object
};

const getUsageDataForLastWeek = (readings) => {
  const currentTime = Date.now();
  return readings.filter((reading) => {
    const diff = currentTime - reading.time;
    return diff < oneWeek;
  });
};

module.exports = { getWeeklyCosts, getPricePlan, getUsageDataForLastWeek };
