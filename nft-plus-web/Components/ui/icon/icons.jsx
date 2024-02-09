import Image from "next/image";

export function IcoDownload(){
    return (
        <Image  src='/download_icon.svg' width="24px" height="24px" alt="download_icon"/>
    )
}

export function DownIcon( { isClicked } ) {
    return (
        <Image  
            src={'/downIcon.svg'} 
            width={26} 
            height={26} 
            alt="downChevron" 
            className={`${ isClicked ? 'rotate-180' : 'rotate-0' }`} 
        />
    )
}