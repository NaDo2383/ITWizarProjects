
import { RiCheckboxBlankCircleFill } from "react-icons/ri";

const CheckboxRounded = ({
  id,
  checked,
  onChange,
  onClick,
  rounded,
  isRadio,
  name,
  value
}) => {
  
  return (
    <div className="checkbox cursor-pointer relative">
      <input
        // hidden
        type={`${isRadio ? "radio" : "checkbox"}`}
        name={name}
        id={id}
        onClick={onClick}
        checked={checked}
        onChange={onChange}
        value={value}
        className="opacity-0 absolute top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]"
      />
      <label htmlFor={id}>
        {checked ?
          <RiCheckboxBlankCircleFill style={{ color: '#B0B0B0', border: '1px solid #B0B0B0', borderRadius: '50%', padding: '2px', width: '15px', height: '15px' }} />
          : 
          <div
            className={`w-[15px] h-[15px] border border-[#B0B0B0] text-black ${rounded ? "rounded-full" : "rounded-sm"
              } overflow-hidden flex justify-center items-center cursor-pointer `}>
          </div>
        }
      </label>
    </div>
  );
};
export default CheckboxRounded;
