import useMyPageTranslation from 'locale/useMypageTranslation';
import React, { useRef } from 'react'
import IC_CALEDAR from "public/IC_CALEDAR.png";
import { LocalizationProvider, DatePicker, PickersDay, CalendarPickerSkeleton } from "@mui/x-date-pickers";
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns'
import getDaysInMonth from "date-fns/getDaysInMonth";
import TextField from "@mui/material/TextField";
import Image from 'next/image';
import TdcItem from './TdcItem';
import { useGlobalContext } from 'common/global/useGlobalContext';
import useOwnership from './useOwnership';
import useArtwork from 'Components/entities/artwork/useArtwork';

function TransactionDateChecker({ isMobile }) {
  const requestAbortController = useRef(null)
  const { allI18, dayI18, monthI18, yearI18, lookupI18 } = useMyPageTranslation()
  const { globalLoading, setGlobalLoading } = useGlobalContext()
  const { dateQuery, setDateQuery, extraQuery } = useOwnership()
  const { getOwnedArtworks } = useArtwork()
  const dateOptions = [
    {
      id: 0,
      text: allI18,
      type: 'all'
    },
    {
      id: 1,
      text: `7${dayI18}`,
      type: 'week'
    },
    {
      id: 2,
      text: `1${monthI18}`,
      type: 'month'
    },
    {
      id: 3,
      text: `1${yearI18}`,
      type: 'year'
    },
  ]

  function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min);
  }

  function fakeFetch(date, { signal }) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        const daysInMonth = getDaysInMonth(date);
        const daysToHighlight = [1, 2, 3].map(() =>
          getRandomNumber(1, daysInMonth)
        );

        resolve({ daysToHighlight });
      }, 500);

      signal.onabort = () => {
        clearTimeout(timeout);
        reject(new DOMException("aborted", "AbortError"));
      };
    });
  }

  const fetchHighlightedDays = (date) => {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setDateQuery(prev => ({ ...prev, highlightedDays: daysToHighlight }))
        setGlobalLoading(false);
      })
      .catch((error) => {
        // ignore the error if it's caused by `controller.abort`
        if (error.name !== "AbortError") {
          throw error;
        }
      });

    requestAbortController.current = controller;
  };

  async function handleMonthChange(date) {
    setGlobalLoading(true)
    try {
      fetchHighlightedDays()
    } catch (e) {
      throw new Error(e)
    } finally {
      setGlobalLoading(false)
    }
  }

  function handleStartDate(newValue) {
    setDateQuery(prev => ({ ...prev, startDate: newValue, isClickDateButtons: true }))
  }

  function handleEndDate(newValue) {
    setDateQuery(prev => ({ ...prev, endDate: newValue, isClickDateButtons: true }))
  }

  function handleSearch() {
    getOwnedArtworks(extraQuery)
  }
  return (
    <div className="flex tracking-[-1px] justify-center md:border md:bg-[#f5f5f5] rounded-[10px] md:h-[72px]">
      <div className={`${isMobile ? "flex flex-col" : "flex xl:flex-row md:flex-row flex-col mt-2 sm:mt-0 items-center"}`}>
        <div className="pr-6">
          <ul className="w-[240px] h-[35px] border border-[#666666] flex text-[15px] font-[300]   text-center">
            {
              dateOptions.map((dateOption, idx) => (
                <TdcItem key={'date-item-' + idx} {...dateOption} />
              ))
            }
          </ul>
        </div>
        <div className="flex items-center md:mt-2 md:mb-2 my-6">
          <div className="pr-2">
            <Image src={IC_CALEDAR} alt="IC_CALEDAR" />
          </div>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={dateQuery.startDate}
              loading={globalLoading}
              inputFormat="yyyy/MM/dd"
              mask="____/__/__"
              onChange={handleStartDate}
              onMonthChange={handleMonthChange}
              renderInput={(params) => <TextField {...params} />}
              renderLoading={() => <CalendarPickerSkeleton />}
              renderDay={(day, _value, DayComponentProps) => {
                const isSelected =
                  !DayComponentProps.outsideCurrentMonth &&
                  dateQuery.highlightedDays.indexOf(day.getDate()) > 0;
                return <PickersDay {...DayComponentProps} />;
              }}
            />
          </LocalizationProvider>

          <span className="mx-2">~</span>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              value={dateQuery.endDate}
              loading={globalLoading}
              inputFormat="yyyy/MM/dd"
              mask="____/__/__"
              onChange={handleEndDate}
              onMonthChange={handleMonthChange}
              renderInput={(params) => <TextField {...params} />}
              renderLoading={() => <CalendarPickerSkeleton />}
              renderDay={(day, _value, DayComponentProps) => {
                const isSelected =
                  !DayComponentProps.outsideCurrentMonth &&
                  dateQuery.highlightedDays.indexOf(day.getDate()) > 0;

                return <PickersDay {...DayComponentProps} />;
              }}
            />
          </LocalizationProvider>
        </div>
        <div className="flex items-center pl-1">
          <button
            onClick={() => handleSearch()}
            className="w-[55px] h-[36px] rounded-[10px] bg-[#333] text-white cursor-pointer text-center"
          >
            {lookupI18}
          </button>
        </div>
      </div>
    </div>
  )
}

export default TransactionDateChecker