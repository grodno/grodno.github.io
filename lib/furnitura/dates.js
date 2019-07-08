
const today = 'сегодня';
const tomorrow = 'завтра';
const pad = (x, size = 2) => {
    let s = String(x);
    while (s.length < (size)) { s = `0${s}`; }
    return s;
};
let currentYear = (new Date()).getFullYear();

export const years = Array.from({ length: 100 }, () => `${(currentYear--)}`);

export const dateLocales = {
    ru: {
        monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
        monthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июня', 'Июля', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
        monthNamesDeclination: ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
        dayNames: ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'],
        dayNamesShort: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
        bookMonthNamesShort: ['Янв', 'Фев', 'Март', 'Апр', 'Май', 'Июнь', 'Июль', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек']
    }
};
export const months = dateLocales.ru.monthNamesShort;

export const getMonthName = (d, mode = '') => {
    if (!d) {
        return '';
    }
    const isValidMode = dateLocales.ru[`monthNames${mode}`];

    return isValidMode ? isValidMode[d.getMonth()] : dateLocales.ru.monthNames[d.getMonth()];
};

/* eslint-disable complexity, no-param-reassign */

export function parseISO8601String(x) {
    if (typeof x !== 'string') {
        throw new Error(`parseISO8601String: not a string: ${x}`);
    }
    if (x.length < 11) {
        x += 'T12:00';
    }
    const timebits = /^([0-9]{4})-([0-9]{2})-([0-9]{2})[ T]([0-9]{2}):([0-9]{2})(?::([0-9]*)(\.[0-9]*)?)?Z?(?:([+-])([0-9]{2})([0-9]{2}))?/;
    const m = timebits.exec(`${x}`);
    if (!m) {
        return null;
    }
    // utcdate is milliseconds since the epoch
    const utcdate = Date.UTC(
        parseInt(m[1]),
        parseInt(m[2]) - 1, // months are zero-offset (!)
        parseInt(m[3]),
        parseInt(m[4]), parseInt(m[5]), // hh:mm
        ((m[6] && parseInt(m[6])) || 0), // optional seconds
        ((m[7] && parseFloat(m[7]))) || 0
    );
    // optional timezone offset
    if (m[9] && m[10]) {
        let offsetMinutes = (parseInt(m[9]) * 60) + parseInt(m[10]);
        return new Date(utcdate + ((m[8] === '+' ? -60000 : +60000) * offsetMinutes));
    }
    return new Date(utcdate);
}
/**
 * Universal all-weather converter to Date.
 *
 * @param {*} x any value to be converted to date
 * @returns Date instance or null
 */
export const toDate = (x) => {
    const type = typeof x;
    if (x == null) {
        return null;
    }
    if (type === 'number') {
        return new Date(x);
    }
    if (type === 'object') {
        // Date-like
        if (x.getTime) {
            return x;
        }
        // firestore.Timestamp
        if (x.toDate) {
            return x.toDate();
        }
        // firestore timestamp for web
        if (x.seconds && x.nanoseconds != null) {
            return new Date((x.seconds * 1000) + x.nanoseconds);
        }
    }
    return parseISO8601String(x);
};

// return date in format dd.mm.yyyy
export const formatDate = (x) => {
    if (!x) {
        return '';
    }
    const date = toDate(x);
    const day = date.getDate();
    const dayWithZero = day < 10 ? `0${day}` : day;
    const month = date.getMonth() + 1;
    const monthWithZero = month < 10 ? `0${month}` : month;
    const year = date.getFullYear();
    return `${dayWithZero}.${monthWithZero}.${year}`;
};

// return date in format yyyy-mm-dd
export const formatFullDate = (x) => {
    if (!x) {
        return '';
    }
    const date = toDate(x);
    return date.toISOString().slice(0, 10);
};

export const formatDateLong = (x, withTime, tz, withTimezone) => {
    if (!x) { return ''; }
    const date = toDate(x);
    const visitYear = date.getFullYear();
    const day = date.getDate();
    const monthName = getMonthName(date, 'Short');
    const str = `${day} ${monthName} ${visitYear}`;
    return withTime ? [`${str}`, formatTime(date, tz, withTimezone)].join(' в ') : str;
};

export const todayOrTomorrow = (date) => {
    if (!date) {
        return null;
    }
    const now = new Date();
    if (date.getFullYear() === now.getFullYear() && date.getMonth() === now.getMonth()) {
        const day = date.getDate();
        const currentDay = now.getDate();
        if (day === currentDay) { return today; }
        if (day === currentDay + 1) { return tomorrow; }
    }
    return null;
};

export const formatDateShort = (x) => {
    if (!x) { return ''; }
    const date = toDate(x);
    return todayOrTomorrow(date) || `${date.getDate()} ${getMonthName(date, 'Declination')}`;
};

export const sinceDateAndMonth = (x) => {
    if (!x) {
        return null;
    }
    const date = toDate(x);
    const monthName = dateLocales.ru.monthNamesDeclination[date.getMonth()].toLowerCase();
    return todayOrTomorrow(date) || `C ${date.getDate()} ${monthName}`;
};

export const formatTime = (x, tz, withTimezone) => {
    if (!x) { return ''; }
    const date = adjustTimeZone(toDate(x), tz);
    const minutes = date.getMinutes();
    return `${date.getHours()}:${pad(minutes)} ${withTimezone ? formatTimezone(tz) : ''}`.trim();
};

export const MinskTimeZoneOffsetMinutes = 3 * 60;

export const getTimeZoneDiffMinutes = tz => tz ? Number(tz) + new Date().getTimezoneOffset() : null;

export const formatTimezone = (tzOffset) => {
    const toNumber = Number(tzOffset);
    return toNumber ?
        `(GMT ${toNumber >= 0 ?
            `+${pad(toNumber / 60)}:${pad(toNumber % 60)}` :
            `-${pad(-toNumber / 60)}:${pad(-toNumber % 60)}`})` :
        null;
};

export const adjustTimeZone = (d, tz) => {
    const diff = tz + d.getTimezoneOffset();
    if (diff) {
        return new Date(d.getTime() + (diff * 60 * 1000));
    }
    return d;
};

// yyyy-mm-dd day with zero, toISOString works wrong in some cases
export const getIsoFormattedDate = (adjastedDate) => {
    const day = adjastedDate.getDate() > 9 ? adjastedDate.getDate() : `0${adjastedDate.getDate()}`;
    const month = (adjastedDate.getMonth() + 1) > 9 ? adjastedDate.getMonth() + 1 : `0${adjastedDate.getMonth() + 1}`;
    return `${adjastedDate.getFullYear()}-${month}-${day}`;
};

export const daysInMonth = (month, year) => months.includes(month) && year ?
    Array.from(
        { length: new Date(Number(year), months.indexOf(month) + 1, 0).getDate() },
        (v, k) => `${k + 1}`
    ) : null;

export const parseToDdMmYyyy = (date) => {
    if (!date || typeof date === 'number') { return ''; }
    return date.split('-').reverse().join('-');
};
