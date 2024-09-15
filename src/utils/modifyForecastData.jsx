import daysOfWeek from "../constants/daysOfWeek";

/*data = [
  {
    day: "Sobota",
    min_temp: 1,
    max_temp: 2,
    interval: [
      {
        time: "00:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
*/

export default function modifyForecastData(data) {
  const groupedData = [];

  data.map((entry) => {
    const dayNumber = new Date(entry.dt_txt).getDay();
    const dayName = daysOfWeek[dayNumber];
    const findDay = groupedData.findIndex(({ day }) => dayName === day);
    if (findDay === -1) {
      groupedData.push({ day: dayName, intervals: [entry] });
    } else {
      groupedData[findDay].intervals.push(entry);
    }
  });

  const finalData = groupedData.map((group) => {
    const maxTemps = group.intervals.map((interval) => interval.main.temp_max);
    const minTemps = group.intervals.map((interval) => interval.main.temp_min);
    const intervals = group.intervals.map((interval) => {
      return {
        time: new Date(interval.dt_txt).getHours(),
        temp: interval.main.temp,
        icon: interval.weather[0].icon,
        description: interval.weather[0].description,
      };
    });

    return {
      day: group.day,
      maxTemp: Math.max(...maxTemps),
      minTemp: Math.min(...minTemps),
      intervals,
    };
  });

  return finalData;
}

/*  const groupedByDay = {};

  data.list.forEach((entry) => {
    const day = entry.dt_txt;
    const time = entry.dt_txt;

    if (!groupedByDay[day]) {
      groupedByDay[day] = {
        day: day,
        min_temp: entry.main.temp_min,
        max_temp: entry.main.temp_max,
        interval: [],
      };
    } else {
      groupedByDay[day].min_temp = Math.min(
        groupedByDay[day].min_temp,
        entry.main.temp_min
      );
      groupedByDay[day].max_temp = Math.max(
        groupedByDay[day].max_temp,
        entry.main.temp_max
      );
    }

    groupedByDay[day].interval.push({
      time: time,
      temp: entry.main.temp,
      icon: entry.weather[0].icon,
      description: entry.weather[0].description,
    });
  });
  return gr
}


data = [
  {
    day: "Sobota",
    min_temp: 1,
    max_temp: 2,
    interval: [
      {
        time: "00:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
      {
        time: "03:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
      {
        time: "06:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
      {
        time: "09:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
      {
        time: "12:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
      {
        time: "15:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
      {
        time: "18:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
      {
        time: "21:00",
        temp: 1,
        icon: "string",
        description: "string",
      },
    ],
  },
];
*/
