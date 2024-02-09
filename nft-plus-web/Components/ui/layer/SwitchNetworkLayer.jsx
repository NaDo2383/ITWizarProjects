import Layer from "./Layer";
import useCheckNetwork from "../../../../hooks/useCheckNetwork";
import useAlertTranslation from "../../../../locale/useAlertTranslation";

const SwitchNetworkLayer = ({
  switchNetworkLayer,
  setSwitchNetworkLayer,
  chainId,
  currency,
}) => {
  const { setMetaMasksnetworkI18, setMetaMasksMainnetI18 } =
    useAlertTranslation();
  const { switchNetwork } = useCheckNetwork();

  const closeLayer = () => {
    setSwitchNetworkLayer(false);
  };

  const switchNetworkHandler = async () => {
    try {
      await switchNetwork(chainId);
      closeLayer();
    } catch (error) {
      alert(error);
    }
  };

  return (
    <Layer
      layer={switchNetworkLayer}
      title={"네트워크 변경"}
      closeLay={() => closeLayer()}
      noPadding={true}
      width={"w-[568px]"}
    >
      <div className="tracking-tighter w-full">
        <div className="full relative">
          <div className="flex justify-center items-center  font-medium text-[20px]">
            {currency === "EYES"
              ? setMetaMasksMainnetI18
              : setMetaMasksnetworkI18}
          </div>
        </div>
        <div className="flex w-full  text-[15px] text-white mt-12">
          <button
            className="w-full text-center capitalize bg-[#333] false font-light py-4"
            onClick={() => switchNetworkHandler()}
          >
            switch network
          </button>
        </div>
      </div>
    </Layer>
  );
};

export default SwitchNetworkLayer;
