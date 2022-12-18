import { getUnixTime, add } from "date-fns";

type calculateTimeStampType = {
  type: "MONTHS" | "DAYS" | "WEEKS" | "HOURS";
  number: number;
};

export const calculateTimeStampFromDate = ({
  number,
  type,
}: calculateTimeStampType): number => {
  switch (type) {
    case "DAYS":
      const newDateAfterAddingDays = add(new Date(), { days: number });
      return getUnixTime(newDateAfterAddingDays);

    case "MONTHS":
      const newDateAfterAddingMonths = add(new Date(), { months: number });
      return getUnixTime(newDateAfterAddingMonths);

    case "WEEKS":
      const newDateAfterAddingWeeks = add(new Date(), { weeks: number });
      return getUnixTime(newDateAfterAddingWeeks);

    case "HOURS":
      const newDateAfterAddingHours = add(new Date(), { hours: number });
      return getUnixTime(newDateAfterAddingHours);

    default:
      return 0;
  }
};
