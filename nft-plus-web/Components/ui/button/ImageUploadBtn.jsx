import React, { forwardRef } from 'react'

const ImageUploadBtn = forwardRef(({ name, onChange, color, text, width, height }, ref) => {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        onChange(file, name);
    };

    const style = {
        width: width ?? 'auto',
        height: height ?? '37px',
        backgroundColor: color,
    }
    return (
        <div>
            <input
                ref={ref}
                type="file"
                name={name}
                accept="image/*"
                onChange={handleFileChange}
                className='hidden'
            />
            <button onClick={() => ref.current?.click()} style={style} className='text-[16px] whitespace-nowrap font-[500] py-1 px-[15px] rounded-[5px]'>
                {text}
            </button>
        </div>
    )
})

export default ImageUploadBtn