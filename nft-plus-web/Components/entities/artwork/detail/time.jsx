import Layer from "Components/ui/layer/Layer";
import useCommonTranslation from "locale/useCommonTranslation";

const TimeCheck = ({ open, setOpen }) => {
  const { actionClosedI18 } = useCommonTranslation();
  
  return (
    <Layer layer={open} errorLay={true} width={"w-[568px]"} noPadding>
      <div className="tracking-tighter w-full relative">
        <div
          onClick={() => setOpen(false)}
          className="w-7 cursor-pointer h-7 absolute right-3 top-6">
          <div className="relative h-px w-full bg-black transform rotate-45 before:absolute before:transform before:w-full before:h-full before:bg-black before:rotate-90 before:left-0"></div>
        </div>
        <div className="full py-12 flex justify-center items-center">
          <h5 className="tracking-[-1px] text-[16px] text-center mx-[50x] px-[20px]">
            {actionClosedI18}
          </h5>
        </div>
      </div>
    </Layer>
  );
};

export default TimeCheck;
