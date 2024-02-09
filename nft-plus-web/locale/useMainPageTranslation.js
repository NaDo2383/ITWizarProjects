import React from "react";
import { useIntl } from "react-intl";

function useMainPageTranslation() {
  const intl = useIntl();
  const registrationRights = intl.formatMessage({
    id: "page.main.service.registrationRights"
  });
  const registrationRightsText = intl.formatMessage({
    id: "page.main.service.registrationRightsText"
  });
  const ownershipTransaction = intl.formatMessage({
    id: "page.main.service.ownershipTransaction"
  });
  const ownershipTransactionText = intl.formatMessage({
    id: "page.main.service.ownershipTransactionText"
  });
  const copyrightTransaction = intl.formatMessage({
    id: "page.main.service.copyrightTransaction"
  });
  const copyrightTransactionText = intl.formatMessage({
    id: "page.main.service.copyrightTransactionText"
  });
  const depositWithdrawalManage = intl.formatMessage({
    id: "page.main.service.depositWithdrawalManage"
  });
  const depositWithdrawalManageText = intl.formatMessage({
    id: "page.main.service.depositWithdrawalManageText"
  }); 

  const applyBtn = intl.formatMessage({
    id: "page.main.applyBtn"
  }); 

  const applyDesc1 = intl.formatMessage({
    id: "page.main.applyDesc1"
  }); 

  const applyDesc2 = intl.formatMessage({
    id: "page.main.applyDesc2"
  }); 

  const recommendTitle1_1 = intl.formatMessage({
    id: "page.main.recommendTitle1_1"
  });

  const recommendTitle1_2 = intl.formatMessage({
    id: "page.main.recommendTitle1_2"
  });

  const recommendTitle2_1 = intl.formatMessage({
    id: "page.main.recommendTitle2_1"
  });
  const recommendTitle2_2 = intl.formatMessage({
    id: "page.main.recommendTitle2_2"
  });
  const recommendTitle3_1 = intl.formatMessage({
    id: "page.main.recommendTitle3_1"
  });
  const recommendTitle3_2 = intl.formatMessage({
    id: "page.main.recommendTitle3_2"
  });

  const recommendDesc1_1 = intl.formatMessage({
    id: "page.main.recommendDesc1_1"
  });
  const recommendDesc1_2 = intl.formatMessage({
    id: "page.main.recommendDesc1_2"
  });
  const recommendDesc1_3 = intl.formatMessage({
    id: "page.main.recommendDesc1_3"
  });

  const recommendDesc2_1 = intl.formatMessage({
    id: "page.main.recommendDesc2_1"
  });
  const recommendDesc2_2 = intl.formatMessage({
    id: "page.main.recommendDesc2_2"
  });
  const recommendDesc2_3 = intl.formatMessage({
    id: "page.main.recommendDesc2_3"
  });

  const recommendDesc3_1 = intl.formatMessage({
    id: "page.main.recommendDesc3_1"
  });
  const recommendDesc3_2 = intl.formatMessage({
    id: "page.main.recommendDesc3_2"
  });
  const recommendDesc3_3 = intl.formatMessage({
    id: "page.main.recommendDesc3_3"
  }); 

  const topBannerDesc = intl.formatMessage({
    id: "page.main.topBannerDesc"
  }); 

  return {
    registrationRights,
    registrationRightsText,
    ownershipTransaction,
    ownershipTransactionText,
    copyrightTransaction,
    copyrightTransactionText,
    depositWithdrawalManage,
    depositWithdrawalManageText,
    applyBtn,
    applyDesc1,
    applyDesc2,
    recommendTitle1_1,
    recommendTitle1_2,
    recommendTitle2_1,
    recommendTitle2_2,
    recommendTitle3_1,
    recommendTitle3_2,
    recommendDesc1_1,
    recommendDesc1_2,
    recommendDesc1_3,
    recommendDesc2_1,
    recommendDesc2_2,
    recommendDesc2_3,
    recommendDesc3_1,
    recommendDesc3_2,
    recommendDesc3_3,
    topBannerDesc
  };
}

export default useMainPageTranslation;
