import React from "react";
import TransactionHistory from "Components/entities/artwork/detail/TransactionHistory";

function ProjectTransaction() {

    return (
        <div className="sm:mt-8 mt-[15px] w-full h-full rounded-xl bg-[#252525] sm:p-[30px] p-[15px]">
          <TransactionHistory/>
        </div>
    );
}

export default ProjectTransaction;
