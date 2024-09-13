import daysOfWeek from "../constants/daysOfWeek";

export default function getCurrentDay() {
  const currentDate = new Date();
  const currentDay = daysOfWeek[currentDate.getDay()];
  return currentDay;
}
