import { useEffect, useState } from "react";

const useCountdown = (targetDate) => {
  const countDownDate = new Date(targetDate).getTime();

  const [countDown, setCountDown] = useState(
    new Date(targetDate).getTime() - new Date().getTime()
  );

  let sum = 0;
  useEffect(() => {
    if (countDownDate < Date.now()) return;
    getReturnValues(countDown).map((e) => (sum = sum + e));
    if (sum > 0) {
      const interval = setInterval(() => {
        setCountDown(countDownDate - new Date().getTime());
      }, 1000);

      return () => clearInterval(interval);
    } else return;
  }, [countDownDate]);

  useEffect(() => {
    setCountDown(new Date(targetDate).getTime() - new Date().getTime());
  },[targetDate])

  return getReturnValues(countDown);
};

const getReturnValues = (countDown) => {
  const days = Math.floor(countDown / (1000 * 60 * 60 * 24));

  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  days = days > 0 ? days : 0;
  hours = hours > 0 ? hours : 0;
  minutes = minutes > 0 ? minutes : 0;
  seconds = seconds > 0 ? seconds : 0;

  return [days, hours, minutes, seconds];
};

export { useCountdown };
