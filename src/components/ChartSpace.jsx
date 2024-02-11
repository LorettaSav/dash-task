/* eslint-disable react/prop-types */
//import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { Chart } from "chart.js/auto";
import { Bar } from "react-chartjs-2";
import Data from "../data/data.json";
import { useEffect, useState } from "react";

function ChartSpace({ chart, option }) {
  //option: selection from Menu
  //chart: selection of type

  const [isSelected, setIsSelected] = useState(false);
  const [currentOption, setCurrentOption] = useState();

  console.log("CHART", chart);
  console.log("OPTION", option);

  useEffect(() => {
    if (!chart) {
      setIsSelected(false);
    } else {
      setIsSelected(true);
    }
    setCurrentOption(option);
  }, [chart, option]);

  const dateTimeNow = new Date();
  let dateNow = dateTimeNow.toLocaleDateString(); // get Date in 2/11/24 format
  let monthNow = dateTimeNow.toDateString().slice(4, 7);
  let dayNow = dateTimeNow.toDateString().slice(0, 3); //get Day
  let timeNow = dateTimeNow.getHours(); // get just hour without minutes
  //console.log("TODAY", dateNow, timeNow, dayNow, monthNow);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  let hours = [];
  for (let i = 0; i < 24; i++) {
    hours.push(`${i + 1}h`);
  }

  //------APPROPRIATE LABELS PER CHART

  let pastHours = hours.slice(timeNow).concat(hours.slice(0, timeNow));
  let ind = days.indexOf(dayNow);
  let pastDays = days.slice(ind + 1).concat(days.slice(0, ind + 1));
  ind = months.indexOf(monthNow);
  let pastMonths = months.slice(ind + 1).concat(months.slice(0, ind + 1));
  let pastWeeks = [
    "3 weeks ago",
    "2 weeks ago",
    "Previous week",
    "Current week",
  ];

  // for week
  let currentWeekNumber;
  const dayOfMonth = dateTimeNow.getDate();
  currentWeekNumber = Math.ceil(dayOfMonth / 7);
  const weeksData = [];
  for (let i = 0; i < 4; i++) {
    const weekStartDate = new Date(dateNow);
    weekStartDate.setDate(
      weekStartDate.getDate() - (currentWeekNumber - i - 1) * 7
    );
    weekStartDate.setHours(0, 0, 0, 0); // Set to the beginning of the day

    const weekEndDate = new Date(weekStartDate);
    weekEndDate.setDate(weekEndDate.getDate() + 6);
    weekEndDate.setHours(23, 59, 59, 999); // Set to the end of the day

    weeksData.push({
      startDate: new Date(weekStartDate).getTime(),
      endDate: new Date(weekEndDate).getTime(),
    });
  }

  let myLabels;
  if (chart === "hourly") {
    myLabels = pastHours;
  } else if (chart === "daily") {
    myLabels = pastDays;
  } else if (chart === "weekly") {
    for (let i = 0; i < 4; i++) {
      myLabels = pastWeeks;
    }
  } else if (chart === "monthly") {
    myLabels = pastMonths;
  } else {
    myLabels = ["1", "2", "3", "4"];
  }

  //------APPROPRIATE LABELS PER CHART

  //-----FREQUENCY BY HOUR, DAY OR MONTH

  // Initialize frequency arrays
  const frequencyByHour = new Array(24).fill(0);
  const frequencyByDay = new Array(7).fill(0);
  const frequencyByMonth = new Array(12).fill(0);

  function calculateFrequency(dataType, frequencyType) {
    const frequencyByHour = Array(24).fill(0);
    const frequencyByDay = Array(7).fill(0);
    const frequencyByMonth = Array(12).fill(0);
    let key, dateTimeKey;

    switch (dataType) {
      case "Users":
        key = null;
        dateTimeKey = "registration_time";
        break;
      case "Deposits":
        key = "deposits_withdrawals";
        dateTimeKey = "transaction_date_time";
        break;
      case "Trades":
        key = "trading_activity";
        dateTimeKey = "trade_date_time";
        break;
      default:
        return;
    }

    Data.forEach((item) => {
      const itemDateTime =
        key !== null
          ? new Date(item[key][0][dateTimeKey])
          : new Date(item.user_info.registration_date);

      const hour = itemDateTime.getHours();
      const day = itemDateTime.getDay();
      const month = itemDateTime.getMonth();

      frequencyByHour[hour]++;
      frequencyByDay[day]++;
      frequencyByMonth[month]++;
    });

    switch (frequencyType) {
      case "hourly":
        return frequencyByHour;
      case "daily":
        return frequencyByDay;
      case "monthly":
        return frequencyByMonth;
      default:
        return;
    }
  }

  //-----FREQUENCY BY HOUR, DAY OR MONTH
  console.log("CALC", calculateFrequency(option, chart));

  //-----FREQUENCY BY WEEK

  const frequencyByWeek = new Array(4).fill(0);
  function calculateTotalPerWeek(dataType) {
    let key, dateTimeKey;

    switch (dataType) {
      case "Users":
        key = null;
        dateTimeKey = "registration_time";
        break;
      case "Deposits":
        key = "deposits_withdrawals";
        dateTimeKey = "transaction_date_time";
        break;
      case "Trades":
        key = "trading_activity";
        dateTimeKey = "trade_date_time";
        break;
      default:
        return;
    }

    Data.forEach((item) => {
      const activities = key !== null ? item[key] : [item];
      activities.forEach((activity) => {
        const activityDate = new Date(activity[dateTimeKey]).getTime();
        weeksData.forEach((week, weekIndex) => {
          if (activityDate >= week.startDate && activityDate <= week.endDate) {
            frequencyByWeek[weekIndex]++;
          }
        });
      });
    });

    return frequencyByWeek;
  }

  //-----FREQUENCY BY WEEK

  console.log("totalPerWeek", calculateTotalPerWeek(option));

  //----- DATA SELECTED

  let myData;
  if (chart === "weekly") {
    myData = calculateTotalPerWeek(option);
  } else {
    myData = calculateFrequency(option, chart);
  }

  //----- DATA SELECTED

  return (
    <div className="h-screen">
      {!isSelected ? (
        <div className="h-screen">
          <div className="flex justify-between gap-2">
            <div className="one bg-indigo-950 flex-1 rounded-sm h-70 flex pt-5  w-1/2"></div>
            <div className="two bg-indigo-950 flex-1 rounded-sm h-60 justify-center w-1/2"></div>
          </div>
          <div className="flex justify-between gap-2 mt-2">
            <div className="three bg-indigo-950 flex-1 rounded-sm h-60 justify-center w-1/2"></div>
            <div className="four bg-indigo-950 flex-1 rounded-sm h-60 flex justify-center w-1/2"></div>
          </div>
        </div>
      ) : (
        <div className="h-screen">
          <div className="flex justify-between gap-2">
            <div className="one bg-indigo-950 flex-1 rounded-sm h-70 flex pt-5  w-1/2">
              <Bar
                data={{
                  labels: myLabels,
                  datasets: [
                    {
                      label: `${chart} - ${option}`,
                      data: myData,
                      animation:false,
                      backgroundColor: "#818cf8",
                    },
                  ],
                }}
              />
            </div>
            <div className="two bg-indigo-950 flex-1 rounded-sm h-60 justify-center w-1/2"></div>
          </div>
          <div className="flex justify-between gap-2 mt-2">
            <div className="three bg-indigo-950 flex-1 rounded-sm h-60 justify-center w-1/2"></div>
            <div className="four bg-indigo-950 flex-1 rounded-sm h-60 flex justify-center w-1/2"></div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ChartSpace;
