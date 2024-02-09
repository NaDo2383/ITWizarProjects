import {useState, useEffect} from "react";
import {MdVisibility} from "react-icons/md";
import {MdVisibilityOff} from "react-icons/md";

export default function Input({placeholder, id, onChange, type, value, isReg, className, onInput, onKeyPress, isPassword , onKeyUp}) {
    const [passwordType, setPasswordType] = useState("password");
    const [focus , setFocus] = useState(false);
    const [showEye , setShowEye] = useState(false);

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text");
            return;
        }
        setPasswordType("password");
    };

    useEffect(() => {
        if(value.trim() !== "" && isPassword){
            setShowEye(true);
        } else {
            setShowEye(false);
        }
    } , [value , isPassword])

    return (
        <div className={`${className} w-full flex mb-4 border overflow-hidden rounded-lg ${focus && 'border-[#ff00e4]'}`}>
            <input
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onInput={onInput}
                onKeyPress={onKeyPress}
                className={`px-4 ${isReg ? "py-4" : "py-5"} ${isPassword ? "border-r-0 rounded-l-lg" : "rounded-lg"} input`}
                placeholder={placeholder}
                id={id}
                onChange={onChange}
                type={isPassword ? passwordType : type}
                value={value}
                onKeyUp={onKeyUp}
            />
            {(isPassword && showEye) && (
                <label className={`input-label`}>
                    <div onClick={togglePassword}>{passwordType === "password" ? <MdVisibilityOff className="text-[16px] text-[#666]" /> : <MdVisibility className="text-[16px] text-[#666]" />}</div>
                </label>
            )}
        </div>
    );
}
