import Image from "next/image";
import Link from "next/link";

const Card = ({isFirst, thumbnail, title, id}) => {
    return (
        <Link passHref href={`/art/preview/${id}`}>
            <div className={`recommendedCard ${isFirst ? "col-start-1 row-start-1 lg:row-end-3 xl:row-end-3 col-end-3 h-64 md:h-96" : "h-36 md:h-64"}`}>
                <Image unoptimized priority objectFit="cover" layout="fill" src={thumbnail} alt={`art`} />
                <div className="recommended-title">
                    <h2 className={`${isFirst ? "text-lg md:text-2xl" : "text-base md:text-lg"} font-[600]`}>
                        <Link href={`/art/preview/${id}`}>{title}</Link>
                    </h2>
                </div>
            </div>
        </Link>
    );
};

export default Card;
