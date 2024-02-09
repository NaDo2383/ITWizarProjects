export default function Button ({onClick , type , value , light , width , padding , disabled , loader, red, none}) {
    return <button disabled={disabled} onClick={onClick} type={type} className={`detailBtn w-full h-[47px] ${light ? 'text-[#fff] bg-[#6D6E94]' :  red ? 'bg-gradient-to-r from-[#FE8243] via-[#FF5675] to-[#FE25D5] text-white' : none ? 'bg-none text-[#000] border-2 border-[#FE25D5]' : 'bg-gradient-to-r from-[#FE8243] via-[#FF5675] to-[#FE25D5] text-white'} ${width ? width : 'w-[250px]'} ${loader && 'bg-opacity-60 cursor-wait'} rounded-md ${padding ? padding : 'py-2 px-4'}`}>
        <p className="truncate">{value}</p>
    </button>
}