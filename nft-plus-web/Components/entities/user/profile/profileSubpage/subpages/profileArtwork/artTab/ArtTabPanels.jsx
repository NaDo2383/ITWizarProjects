/**
 * @createdBy Phill Anderson 2023/3/21
 */
import useTab from "Components/ui/tab/useTab";
import React from "react";
import FavoritedPanel from "./panelFavorited/PanelFavorited";
import HoldingPanel from "./panelHolding/PanelHolding";
import OnSalePanel from "./panelOnsale/PanelOnSale";

const panels = [
  <HoldingPanel key={1} />,
  <OnSalePanel key={2} />,
  <FavoritedPanel key={3} />
];

function ArtTabPanels() {
  const { activeTabId } = useTab();
  return <div>{panels[activeTabId]}</div>;
}

export default ArtTabPanels;
