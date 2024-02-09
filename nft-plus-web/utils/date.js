import moment from "moment";

export function dateSimplify(date) {
    const simplifiedDate = moment(date).format("YYYY-MM-DD")
    return simplifiedDate
}

export function displayDate(dateString, lang) {
  if(dateString) {
    const year = dateString.split(" ")[0].split("-")[0];
    const month = dateString.split(" ")[0].split("-")[1];
    const day = dateString.split(" ")[0].split("-")[2];
    let fullYear =
      lang === "en" ? `${year}-${month}-${day}` : `${year}년 ${month}월 ${day}일`;
    return fullYear;
  }
  return
}

export function displayBetweenDates(datesString, lang = "kr") {
    if(datesString) {
      const arr = datesString?.split("~");
      const fromDate = arr[0];
      const toDate = arr[1]; 
      const fromLangDate = getFullYear(fromDate ,lang);
      const toLangDate = getFullYear(toDate ,lang);
      const betweenDates = `${fromLangDate}${
        lang === "en" ? "to" : "부터"
      } ${toLangDate}`;
      return betweenDates;
    }
    return
}

export function getFullYear(date, lang){
  const year = date.split("-")[0];
  const month = date.split("-")[1];
  const day = date.split("-")[2];
  const krYear=year.trim()+'년';
  const krMonth=month.trim()+'월';
  const krDay=day.trim()+'일';
  let fullYear = lang === "en" ? `${year}-${month}-${day}` : `${krYear} ${krMonth} ${krDay}`;

  return fullYear;
}

export function getDateFromNow( days ) {
  
    if(!days) {
      alert('getDateFromNow функц руу өдөрөө дамжуулна уу!')
      return
    } 
    const dateBeforeFromNow = new Date(new Date().setDate(new Date().getDate() - days));
    return dateBeforeFromNow
  }

  export function formattedDate(date) {
   const formattedDate = date.toLocaleDateString('ko-KR', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    }).replace(/\./g, '-');
  }

export const  delay = (time) =>  {
    return new Promise(resolve => setTimeout(resolve, time));
  }
  