/* eslint-disable no-param-reassign */
const date = {};

// Return a date object representing the next occurance of a local time on a specific weekday
// i.e. if today is Tuesday, April 2nd, nextDayAndTime(5, 3, 30, 0) => Friday, April 5 at 3:30
// dayOfWeek = 0 -> Sunday
date.nextDayAndTime = function nextDayAndTime(dayOfWeek, hour, minute, second, extra) {
  let now;
  if (dayOfWeek.getSeconds) { // If we passed in a date as our "now"
    now = dayOfWeek;
    dayOfWeek = hour;
    hour = minute;
    minute = second;
    second = extra;
  } else { // If not, use right now
    now = new Date();
  }

  hour = (hour || 0);
  minute = (minute || 0);
  second = (second || 0);
  const result = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + ((7 + dayOfWeek - now.getDay()) % 7),
    hour,
    minute,
    second,
  );

  if (result <= now) {
    result.setDate(result.getDate() + 7);
  }
  return result;
};

// Return a date object representing the previous occurance of a time on a specific weekday
// i.e. if today is Tuesday, April 2nd, prevDayAndTime(5, 3, 30, 0) => Friday, May 29 at 3:30
// dayOfWeek = 0 -> Sunday
date.prevDayAndTime = function prevDayAndTime(dayOfWeek, hour, minute, second, extra) {
  let now;
  if (dayOfWeek.getSeconds) { // If we passed in a date as our "now"
    now = dayOfWeek;
    dayOfWeek = hour;
    hour = minute;
    minute = second;
    second = extra;
  } else { // If not, use right now
    now = new Date();
  }

  hour = (hour || 0);
  minute = (minute || 0);
  second = (second || 0);
  const result = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + ((-7 + dayOfWeek - now.getDay()) % 7),
    hour,
    minute,
    second,
  );

  if (result >= now) {
    result.setDate(result.getDate() - 7);
  }
  return result;
};

// Shift a date so that it's UTC date is its original local date
// I.e. if current time in Philly is 4pm (UTC 8pm), this shifts so the UTC time is 4pm (EDT = 12pm)
date.shiftTZ = function shiftTZ(d) {
  if (!d.toISOString) { d = new Date(d); }
  return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
};

date.runAt = function runAt(endpt, fn) {
  const now = new Date();
  const te = endpt - now;
  setTimeout(() => {
    fn();
  }, te);
};

module.exports = date;
