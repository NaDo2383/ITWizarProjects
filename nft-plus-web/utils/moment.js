import moment from "moment";

export function formatDate(dateString, locale = 'en') {
       
    moment.updateLocale(locale, {
        relativeTime: {
            future:  locale === 'ko' ? "%s 후" : "in %s",
            past: locale === 'ko' ? "%s 전" : "%s ago",
            sm:  locale === 'ko' ? '몇 초' : 'a few seconds',
            ss:  locale === 'ko' ? '%d 초' : '%d seconds',
            m: locale === 'ko' ? "1분" : "a minute",
            mm: locale === 'ko' ? "%d 분" : "%d minutes",
            h: locale === 'ko' ? "1시간" : "an hour",
            hh: locale === 'ko' ? "%d 시간" : "%d hours",
            d: locale === 'ko' ? "1일" : "a day",
            dd: locale === 'ko' ? "%d 일" : "%d days",
            w:  locale === 'ko' ? "1주일" : "a week",
            ww: locale === 'ko' ? "%d 주일" : "%d weeks",
            M: locale === 'ko' ? "1개월" : "a month",
            MM: locale === 'ko' ? "%d 개월" : "%d months",
            y: locale === 'ko' ? "1년" : "a year",
            yy: locale === 'ko' ? "%d 년" : "%d years"
          }
    })
    
    const formattedDate = moment(dateString).fromNow()

    return formattedDate
}