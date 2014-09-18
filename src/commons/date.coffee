###
==========================================================================
Axio: Working with Dates.
==========================================================================
###
((MAXD, CURR) ->
    _nn = String.to0N = (s) ->
        s and (s = "" + s) and ((if (s.length < 2) then ("0" + s) else s)) or "00"

    Date.PATTERN_PARSE = "yyyyMMdd"
    Date.PATTERN_FORMAT = "dd MMM yyyy"
    
    # @return zero-based month index
    Date.daysInMonth = (m, y) ->
        ((if (m is 1) and ((y % 4) is 0) then 1 else 0)) + MAXD[m]

    
    # @return current time zone
    Date.getTimeZone = ->
        l = -CURR.getTimezoneOffset()
        t = "" + Math.abs(l / 60)
        m = "" + Math.abs(l % 60)
        "GMT" + (((l is 0) and "") or ("%2" + ((if l > 0 then "B" else "D")) + _nn(t) + ":" + _nn(m)))

    Date.parse = (s, pattern) ->
        return null    unless s
        return s    if s instanceof Date
        d = new Date()
        d.setDate 1
        r = "" + (pattern or Date.PATTERN_PARSE)
        p = undefined
        if (p = r.indexOf("yyyy")) > -1
            d.setFullYear s.substr(p, 4)
        else d.setFullYear 2000 + s.substr(p, 2)    if (p = r.indexOf("yy")) > -1
        d.setMonth Number(s.substr(p, 2)) - 1    if (p = r.indexOf("MM")) > -1
        d.setDate Number(s.substr(p, 2))    if (p = r.indexOf("dd")) > -1
        d.setHours (if ((p = r.indexOf("HH")) > -1) then s.substr(p, 2) else 12)
        d.setMinutes (if ((p = r.indexOf("mm")) > -1) then s.substr(p, 2) else 0)
        d.setSeconds (if ((p = r.indexOf("ss")) > -1) then s.substr(p, 2) else 0)
        d

    Date.shifted = (d, lag) ->
        r = new Date()
        r.setTime (d or r).getTime() + ((lag or 0) * 86400000)
        r

    Date.days = (d) ->
        (if (d and d.getTime) then (d = d.getTime()
        (d - d % 86400000) / 86400000
        ) else 0)

    Date.compare = (x, y) ->
        (if (x and y) then ((if (x.getTime and y.getTime) then ((if x.getTime() > y.getTime() then 1 else -1)) else 0)) else ((if (not x and not y) then 0 else ((if !!x then 1 else -1)))))

    Date.monthName = (m, lang, id) ->
        String.localize.withLanguage(lang or String.LANGUAGE, id or "MONTH")["" + _nn(m + 1)]

    Date.format = (d, pattern, lng) ->
        r = ""
        if d and d.getFullYear
            r += (pattern or Date.PATTERN_FORMAT)
            r = r.replace("yyyy", "" + d.getFullYear())
            r = r.replace("yy", "" + d.getFullYear())
            r = r.replace("MMMM", Date.monthName(d.getMonth(), lng))
            r = r.replace("MMM", Date.monthName(d.getMonth(), lng, "MONTH_SHORT"))
            r = r.replace("MM", _nn(d.getMonth() + 1))
            r = r.replace("dd", _nn(d.getDate())) 
            r = r.replace("hh", _nn(d.getHours()))
            r = r.replace("mm", _nn(d.getMinutes()))
            r = r.replace("ss", _nn(d.getSeconds()))
        r

    String.localize.put "DOW",
        '1': "Su"
        '2': "Mo"
        '3': "Tu"
        '4': "We"
        '5': "Th"
        '6': "Fr"
        '7': "Sa"
    , "en"
    String.localize.put "MONTH_SHORT",
        '01': "Jan"
        '02': "Feb"
        '03': "Mar"
        '04': "Apr"
        '05': "May"
        '06': "Jun"
        '07': "Jul"
        '08': "Aug"
        '09': "Sep"
        '10': "Oct"
        '11': "Nov"
        '12': "Dec"
    , "en"
    String.localize.put "MONTH",
        '01': "January"
        '02': "February"
        '03': "March"
        '04': "April"
        '05': "May"
        '06': "June"
        '07': "July"
        '08': "August"
        '09': "September"
        '10': "October"
        '11': "November"
        '12': "December"
    , "en"
    return
) [    31,    28,    31,    30,    31,    30,    31,    31,    30,    31,    30,    31,    31], new Date()
