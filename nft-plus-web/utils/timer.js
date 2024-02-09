export function timer(stop) {
  let period;
  let periodCounter = setTimeout(() => {
    period += 1;
  }, 1000);
  stop && clearTimeout(periodCounter);
  return period;
}

export const getCurrentDate = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();
  const time = newDate.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
  const seconds = newDate.getSeconds();

  return { date, time, seconds, month, year };
};

export function debounce(func, delay) {
  let timer;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
}
