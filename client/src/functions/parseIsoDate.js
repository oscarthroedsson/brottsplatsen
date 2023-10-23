import months from "../data/dates.js";

function parseIsoDate(value) {
  let parsedMonthToNum;

  //* | If month = true find the num of month and give back the first and last day of the month
  if (typeof value === "string") {
    parsedMonthToNum = months.indexOf(value.toString()) + 1;

    const currentYear = new Date().getFullYear();
    const firstDayOfMonth = new Date(currentYear, parsedMonthToNum - 1, 1);
    const lastDayOfMonth = new Date(currentYear, parsedMonthToNum, +1);
    const dateRange = {
      fromDate: firstDayOfMonth.toISOString(),
      toDate: lastDayOfMonth.toISOString(),
    };

    return dateRange;
  } else if (typeof value === "object" && value !== null) {
    let updatedValue = {};

    Object.keys(value).forEach((key) => {
      updatedValue[key] = new Date(value[key]).toISOString();
    });

    console.log("updatedValue: ", updatedValue);

    return updatedValue;
  }
}
export default parseIsoDate;
