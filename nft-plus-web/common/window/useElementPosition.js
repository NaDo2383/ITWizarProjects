/**
 * @createdBy Phill Anderson 2022/02/27
 */
import { useGlobalContext } from "common/global/useGlobalContext";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { debounce } from "utils/timer";

function useElementPosition(refObject, options={}) {
	const { globalName } = options
	const { locale } = useRouter()
	const { setGlobalItems } = useGlobalContext();
	const [refObjectData, setRefObjectData] = useState({
		clientRect: {
			top: null,
			bottom: null,
			left: null,
			right: null
		},
		offsets: {
			offsetHeight: null,
			offsetLeft: null,
			offsetTop: null,
			offsetWidth: null
		},
		clientData: {
			clientHeight: null,
			clientWidth: null,
			clientLeft: null
		}
	});
	const [positionRect, setPositionRect] = useState({
		top: null,
		bottom: null,
		left: null,
		right: null,
		elementName: null
	});

	const [positionOffset, setPositionOffset] = useState({
		offsetHeight: null,
		offsetLeft: null,
		offsetTop: null,
		offsetWidth: null,
		elementName: null
	});
	function handleElPosition(e) {
		const elementName = e.currentTarget.innerText;
		const { top, left, bottom, right } =
			e.currentTarget.getBoundingClientRect();
		setPositionRect((prev) => ({
			...prev,
			top,
			left,
			bottom,
			right,
			elementName
		}));

		const { offsetHeight, offsetLeft, offsetParent, offsetTop, offsetWidth } =
			e.currentTarget;
		setPositionOffset((prev) => ({
			...prev,
			offsetHeight,
			offsetLeft,
			offsetTop,
			offsetWidth,
			elementName
		}));
	}

	function handleDataGenerate(_globalName) {
		if (refObject?.current) {
			const { 
				offsetHeight, 
				offsetLeft, 
				offsetTop, 
				offsetWidth 
			} = refObject?.current;
			const { 
				top, 
				left, 
				bottom, 
				right 
			} = refObject?.current?.getBoundingClientRect();

			setRefObjectData((prev) => ({
				...prev,
				clientRect: {
					top,
					left,
					bottom,
					right
				},
				offsets: {
					offsetHeight: offsetHeight || 0,
					offsetLeft,
					offsetTop,
					offsetWidth
				},
				clientData: {
					clientHeight: refObject.current.clientHeight,
					clientWidth: refObject.current.clientWidth,
					clientLeft: refObject.current.clientLeft
				}
			}));
			if (_globalName) {
				setGlobalItems((prev) => ({
					...prev,
					[_globalName]: {
						clientRect: {
							top,
							left,
							bottom,
							right
						},
						offsets: {
							offsetHeight,
							offsetLeft,
							offsetTop,
							offsetWidth
						},
						clientData: {
							clientHeight: refObject.current?.clientHeight,
							clientWidth: refObject.current?.clientWidth,
							clientLeft: refObject.current?.clientLeft
						}
					}
				}));
			}
		}
	}

	useEffect(() => {
		if (refObject?.current) {
			const domObject = refObject.current
			const debouncedDataGenerate = debounce(() => handleDataGenerate(globalName),500);
			handleDataGenerate(globalName);
			
			window.addEventListener("resize", debouncedDataGenerate);
			domObject.addEventListener('scroll', debouncedDataGenerate);
			return () => {
				window.removeEventListener("resize", debouncedDataGenerate);
				domObject.removeEventListener('scroll', debouncedDataGenerate);
			};
		}
	}, [locale]);
	return { handleElPosition, positionRect, positionOffset, refObjectData, setRefObjectData };
}

export default useElementPosition;
