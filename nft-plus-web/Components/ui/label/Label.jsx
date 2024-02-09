const Label = ({ htmlFor, label, layer }) => {
  return (
    <label
      className={`w-full text-[#B0B0B0] font-[400]
      tracking-[-1px] cursor-pointer whitespace-nowrap ${
        layer ? "" : "px-4"
      } py-1 sm:text-[16px] md:text-[16px] text-[14px]`}
      htmlFor={htmlFor}>
      {label}
    </label>
  );
};

export default Label;
