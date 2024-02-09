import wallet from "public/addwal.png";
import Image from "next/image";
import useMypageTranslation from "locale/useMypageTranslation";

const AddWalletBtn = ({ onClick, loading }) => {
  const { addWalletI18 } = useMypageTranslation();

  return (
    <button
      onClick={onClick}
      disabled={loading}
      className={`${
        loading && "cursor-wait bg-opacity-60"
      } rounded-md text-white py-3 px-10 bg-[#333] flex items-center gap-2`}
    >
      <Image src={wallet} alt="wallet" />
      {addWalletI18}
    </button>
  );
};

export default AddWalletBtn;
