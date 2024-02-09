/**
 * @createdBy Phill Anderson 2022/02/27
 */
import { useGlobalContext } from "common/global/useGlobalContext";
import { useEffect } from "react";
import { debounce } from "utils/timer";
function useWindow() {
	const { setBrowserWindow } = useGlobalContext()

	function handleWindowResize() {
		setBrowserWindow((prev) => ({
			...prev,
			innerWidth: window.innerWidth,
			innerHeight: window.innerHeight
		}));
	}
	useEffect(() => {
		handleWindowResize();
		const debouncedHandleWindowSize = debounce(() => handleWindowResize(), 500);
		window.addEventListener("resize", debouncedHandleWindowSize);
		return () =>
			window.removeEventListener("resize", debouncedHandleWindowSize);
	}, []);

}

export default useWindow;
