import React from "react";

export function PopupButton({ text, bgColor, onClick }) {
	return (
		<button
			onClick={onClick}
			className={`w-full text-white bg-[${bgColor}] py-4`}>
			{text}
		</button>
	);
}

  export function PopContainer({ maxWidth, children }) { 

    const style = {
      maxWidth: maxWidth || '100%'
    }
    return (
        <div style = { style } className='sm:p-[30px] p-[15px] rounded-lg'>
            { children }
        </div>
    );
  }
