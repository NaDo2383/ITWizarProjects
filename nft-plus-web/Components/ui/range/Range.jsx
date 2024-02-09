import React, { useEffect, useState, useCallback, forwardRef } from "react";

import Slider from "../swiper/Swiper";
import "rc-slider/assets/index.css";

const { createSliderWithTooltip } = Slider;
const Range = createSliderWithTooltip(Slider.Range);
const defMin = 0;
const defMax = 20;
const MultiRangeSlider = forwardRef(({ minValue, maxValue, setVals }, ref) => {
    const [minValueSlider, setMinValueSlider] = useState(minValue);
    const [maxValueSlider, setMaxValueSlider] = useState(maxValue);
    const [text, setText] = useState("");
    const marks = {};
    const onReset = useCallback(() => {
        setMinValueSlider(minValue);
        setMaxValueSlider(maxValue);
    }, [minValue, maxValue]);

    useEffect(() => {
        ref.current = onReset;
    }, [ref, onReset]);

    marks[minValue ? minValue : defMin] = minValue ? minValue : defMin;
    marks[maxValue ? maxValue : defMax] = maxValue ? maxValue : defMax;
    
    return (
        <div className="sliderArea">
            <Range
                marks={marks}
                min={minValue ? +minValue : defMin}
                max={maxValue ? +maxValue : defMax}
                onChange={(value) => (setMinValueSlider(value[0]), setMaxValueSlider(value[1]), setVals(value[0], value[1]))}
                step={0.1}
                //defaultValue={[+minValue, +maxValue]}
                value={[+minValueSlider, +maxValueSlider]}
            />
            <div className="w-full flex items-center gap-2 mt-8 text-xs justify-between">
                <div className="w-full">
                    <input
                        onChange={(e) => {
                            setMinValueSlider((prev) => e.target.value), setVals(minValueSlider, maxValueSlider);
                            if (+e.target.value < 0) {
                                setMinValueSlider(0);
                            } else {
                                if (+e.target.value > 0 && e.target.value.length >= 2 && e.target.value[0] === "0") {
                                    setMinValueSlider(e.target.value.trim().slice(1));
                                } else {
                                    if (e.target.value.trim().length > 9) {
                                        setMinValueSlider(e.target.value.trim().slice(0, 12));
                                    } else {
                                        setMinValueSlider(e.target.value);
                                    }
                                }
                            }
                        }}
                        type="number"
                        className="w-full border py-2 px-4 rounded-md"
                        value={minValueSlider || 0}
                    />
                </div>
                <p className="text-base">~</p>
                <div className="w-full">
                    <input
                        onChange={(e) => {
                            setMaxValueSlider((prev) => e.target.value), setVals(minValueSlider, maxValueSlider);
                            if (+e.target.value < 0) {
                                setMaxValueSlider(0);
                            } else {
                                if (+e.target.value > 0 && e.target.value.length >= 2 && e.target.value[0] === "0") {
                                    setMaxValueSlider(e.target.value.trim().slice(1));
                                } else {
                                    if (e.target.value.trim().length > 9) {
                                        setMaxValueSlider(e.target.value.trim().slice(0, 12));
                                    } else {
                                        setMaxValueSlider(e.target.value);
                                    }
                                }
                            }
                        }}
                        type="number"
                        className="w-full border py-2 px-4 rounded-md"
                        value={maxValueSlider || 0}
                    />
                </div>
            </div>
        </div>
    );
});

MultiRangeSlider.displayName = "MultiRangeSlider";
export default MultiRangeSlider;
