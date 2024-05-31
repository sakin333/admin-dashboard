import dayjs from "dayjs";

const filterDeal = (deal) =>
  deal?.groupBy?.closeDateMonth && deal.groupBy.closeDateYear;

const mapDeals = (deals = [], state) => {
  return deals.filter(filterDeal).map((deal) => {
    const { closeDateMonth, closeDateYear } = deal.groupBy || {};

    const date = dayjs(`${closeDateYear}-${closeDateMonth}-01`);

    return {
      timeUnix: date.unix(),
      timeText: date.format("MMM YYYY"),
      value: deal.sum?.value || 0,
      state,
    };
  });
};

export const mapDealsData = (dealStages = []) => {
  const won = dealStages.find((stage) => stage.title === "WON");
  const wonDeals = mapDeals(won?.dealsAggregate, "Won");

  const lost = dealStages.find((stage) => stage.title === "LOST");
  const lostDeals = mapDeals(lost?.dealsAggregate, "Lost");

  return [...wonDeals, ...lostDeals].sort((a, b) => a.timeUnix - b.timeUnix);
};
