/** 
 * Return a date object representing the next occurance of a local time on a specific weekday
 * i.e. if today is Tuesday, April 2nd, nextDayAndTime({dayOfWeek: 5, hour: 3, minute: 30, second: 0}) => Friday, April 5 at 3:30
 * dayOfWeek = 0 -> Sunday
 */
export function nextDayAndTime(input: {
  dayOfWeek: number, 
  hour: number,
  minute: number, 
  second: number,
  now?: Date
}) {


  const now = (input.now || new Date())
  const dayOfWeek = (input.dayOfWeek || 0)
  const hour = (input.hour || 0);
  const minute = (input.minute || 0);
  const second = (input.second || 0);

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

/** Return a date object representing the previous occurance of a time on a specific weekday
 * i.e. if today is Tuesday, April 2nd, prevDayAndTime({dayOfWeek: 5, hour: 3, minute: 30, second: 0}) => Friday, May 29 at 3:30
 * dayOfWeek = 0 -> Sunday
 */
export function prevDayAndTime(input: {
  dayOfWeek: number, 
  hour: number,
  minute: number, 
  second: number,
  now?: Date
}) {


  const now = (input.now || new Date())
  const dayOfWeek = (input.dayOfWeek || 0)
  const hour = (input.hour || 0);
  const minute = (input.minute || 0);
  const second = (input.second || 0);

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

/** Shift a date so that it's UTC date is its original local date
 * I.e. if current time in Philly is 4pm (UTC 8pm), this shifts so the UTC time is 4pm (EDT = 12pm)
 */
export function shiftTZ(d: Date) {
  if (!d.toISOString) { d = new Date(d); }
  return new Date(d.getTime() - d.getTimezoneOffset() * 60 * 1000);
};

/** Run a function at a specific date */
export function runAt(endpt: Date, fn: Function) {
  const now = new Date();
  const te = endpt.getTime() - now.getTime();
  setTimeout(fn, te);
};
