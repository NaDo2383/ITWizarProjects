 import Image from "next/image";
import pointer from "public/pointer.png";
import idea from "public/idea.png";
import wallet from "public/wallet.png";
import pen from "public/pen.png";
import useMainPageTranslation from "locale/useMainPageTranslation";

const Service = () => {
  const {
    registrationRights,
    registrationRightsText,
    ownershipTransaction,
    ownershipTransactionText,
    copyrightTransaction,
    copyrightTransactionText,
    depositWithdrawalManage,
    depositWithdrawalManageText,
  } = useMainPageTranslation();

  return (
    <div className="service-container">
        <h3 className="title">NFT Service</h3>
        <div className="service">
        <div className="w-full flex flex-col items-center">
            <div className="service-img">
            <Image src={pointer} alt="service" />
            </div>
            <h3 style={{lineHeight: '1.35em'}} className="service-title">
            {registrationRights}
            </h3>
            <p className="text-[#5C5C5C] font-medium">{registrationRightsText}</p>
        </div>
        <div className="w-full flex flex-col items-center">
            <div className="service-img">
            <Image src={idea} alt="service" />
            </div>
            <h3 style={{lineHeight: '1.35em'}} className="service-title">
            {ownershipTransaction}
            </h3>
            <p className="text-[#5C5C5C] font-medium">{ownershipTransactionText}</p>
        </div>
        <div className="w-full flex flex-col items-center">
            <div className="service-img">
            <Image src={pen} alt="service" />
            </div>
            <h3 style={{lineHeight: '1.35em'}} className="service-title">
            {copyrightTransaction}
            </h3>
            <p className="text-[#5C5C5C] font-medium">{copyrightTransactionText}</p>
        </div>
        <div className="w-full flex flex-col items-center">
            <div className="service-img mb-5">
            <Image src={wallet} alt="service" />
            </div>
            <h3 style={{lineHeight: '1.35em'}} className="service-title">
            {depositWithdrawalManage}
            </h3>
            <p className="text-[#5C5C5C] font-medium">
            {depositWithdrawalManageText}
            </p>
        </div>
        </div>
    </div>
  );
};

export default Service;
