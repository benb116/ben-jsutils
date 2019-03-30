var date = {};

var moment = require('moment-timezone');

// Return a date object representing the next occurance of a time on a specific weekday
// dayOfWeek = 0 -> Sunday
date.nextDayAndTime = function(dayOfWeek, hour, minute) {
    var now = new Date();
    var result = new Date(
                 now.getFullYear(),
                 now.getMonth(),
                 now.getDate() + (7 + dayOfWeek - now.getDay()) % 7,
                 hour,
                 minute);

    if (result < now) {
        result.setDate(result.getDate() + 7);
    }
    return result;
};

// Return a date object representing the previous occurance of a time on a specific weekday
// dayOfWeek = 0 -> Sunday
date.prevDayAndTime = function(dayOfWeek, hour, minute) {
    var now = new Date();
    var result = new Date(
                 now.getFullYear(),
                 now.getMonth(),
                 now.getDate() + (-7 + dayOfWeek - now.getDay()) % 7,
                 hour,
                 minute);

    if (result > now) {
        result.setDate(result.getDate() - 7);
    }
    return result;
};

date.toEastern = function(ds) {
    if (!ds.toISOString) {
        ds = new Date(ds);
    }
    return new Date(moment(moment.utc(ds).toDate()).local().format('YYYY-MM-DDTHH:mm:ss')+'Z');
};

module.exports = date;