/**
 * @createdBy Narada0927 
 */
import { BsCheckLg } from "react-icons/bs";

const Checkbox = ({ id, checked, onChange, onClick, isRadio, name, value }) => {
	return (
		<div className="checkbox cursor-pointer">
			<input
				hidden
				type={`${isRadio ? "radio" : "checkbox"}`}
				name={name}
				id={id}
				onClick={onClick}
				checked={checked}
				onChange={onChange}
				value={value}
			/>
			<label htmlFor={id}>
				{checked ? (
					<BsCheckLg
						style={{
							color: "#C2C2C2",
							border: "1px solid #C2C2C2",
							padding: "2px",
							width: "18px",
							height: "18px",
							borderRadius: "3px",
							cursor: "pointer"
						}}
					/>
				) : (
					<div
						className={`sm:w-[18px] sm:h-[18px] w-[15px] h-[15px] border border-[#C2C2C2] overflow-hidden flex justify-center items-center cursor-pointer rounded-[3px]`}></div>
				)}
			</label>
		</div>
	);
};
export default Checkbox;
