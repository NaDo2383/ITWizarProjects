import React from "react";

export function Wrapper({ children }) {
  return (
    <div className="tf-section-3 discover-item ">
      <div className="themesflat-container">
        <div className="row">{children}</div>
      </div>
    </div>
  );
}
