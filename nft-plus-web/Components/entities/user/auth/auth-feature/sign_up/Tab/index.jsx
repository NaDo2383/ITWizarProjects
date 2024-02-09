/**
 * @createdBy Narada0927 2022
 */
import Tab from "./items";
import useCommonTranslation from "locale/useCommonTranslation";

const Tabs = ({ indx }) => {
  const { tab1TitleI18, tab2TitleI18, tab3TitleI18, tab4TitleI18 } =
    useCommonTranslation();
  const tabItems = [tab1TitleI18, tab2TitleI18, tab3TitleI18, tab4TitleI18];
  
  return (
    <div className="w-full flex items-center mb-8 justify-between">
      {tabItems.map((title, index) => (
        <Tab
          indx={indx}
          key={`${title}-${index}`}
          title={title}
          index={index}
        />
      ))}
    </div>
  );
};

export default Tabs;
