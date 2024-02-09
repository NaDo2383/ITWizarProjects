import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { PickersDay } from "@mui/x-date-pickers";
import { DatePicker } from "@mui/x-date-pickers";
import { CalendarPickerSkeleton } from "@mui/x-date-pickers";
import getDaysInMonth from "date-fns/getDaysInMonth";
import DateTimePickerIcon from "public/dateTimePicker.svg";
import TextField from "@mui/material/TextField";
import { useState, useRef } from "react";
import DateIcon from "./DateIco";
import Image from "next/image";

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

function CustomDatePicker(props) {
	const { dateValue, onChange, name } = props;
	const [highlightedDays, setHighlightedDays] = useState([1, 2, 15]);
	const [dateLoading, setDateLoading] = useState(false);
	const requestAbortController = useRef(null);

	async function handleMonthChange(date) {
		setDateLoading(true);
		try {
			if (requestAbortController.current)
				requestAbortController.current.abort();
			setHighlightedDays([]);
			fetchHighlightedDays(date);
		} catch (e) {
			console.error(e);
		} finally {
			setDateLoading(false);
		}
	}

	function handleDate(newValue) {
		onChange(newValue, name);
	}

	function fetchHighlightedDays(date) {
		const controller = new AbortController();
		fakeFetch(date, {
			signal: controller.signal
		})
			.then(({ daysToHighlight }) => {
				setHighlightedDays(daysToHighlight);
				setGlobalLoading(false);
			})
			.catch((error) => {
				if (error.name !== "AbortError") throw error;
			});
		requestAbortController.current = controller;
	}

	return (
		<div className="createArtwork flex ins justify-center items-center mt-2 sm:mt-0 text-[16px] font-[600]">
			<LocalizationProvider dateAdapter={AdapterDateFns}>
				<DatePicker
					value={dateValue}
					loading={dateLoading}
					inputFormat="yyyy/MM/dd"
					mask="____/__/__"
					onChange={(newValue) => handleDate(newValue)}
					onMonthChange={handleMonthChange}
					renderInput={(params) => {
						let a = params?.inputProps?.value || new Date();
						return (
							<>
								<div className="relative">
									<span className=" absolute top-1/2 -translate-y-1/2 right-[13px] mt-[1.75px]">
										<Image
											className="w-full h-full"
											src={DateTimePickerIcon}
											alt="DateTimePickerIcon"
										/>
									</span>
									<div className="sm:text-[16px] text-[10px]">
									<TextField
										{...params}
										sx={{
											width: "206px",
											paddingLeft: "0px !important",
											fontSize: "16px"
										}}
									/>
									</div>
								</div>
							</>
						);
					}}
					renderLoading={() => <CalendarPickerSkeleton />}
					renderDay={(day, _value, DayComponentProps) => {
						const isSelected =
							!DayComponentProps.outsideCurrentMonth &&
							highlightedDays.indexOf(day.getDate()) > 0;
						return <PickersDay {...DayComponentProps} />;
					}}
				/>
			</LocalizationProvider>
		</div>
	);
}

export default CustomDatePicker;
