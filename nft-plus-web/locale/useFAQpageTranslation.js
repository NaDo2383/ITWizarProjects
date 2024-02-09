import React from "react";
import { useIntl } from "react-intl";

function useFAQpageTranslation() {
  const intl = useIntl();
  const title = intl.formatMessage({
    id: "page.uguide.title"
  });
  const tab1Title = intl.formatMessage({
    id: "page.uguide.tab1.title"
  });
  const tab2Title = intl.formatMessage({
    id: "page.uguide.tab2.title"
  });
  const tab3Title = intl.formatMessage({
    id: "page.uguide.tab3.title"
  });
  const selectboxOp1 = intl.formatMessage({
    id: "page.uguide.selectbox.option1"
  });
  const selectboxOp2 = intl.formatMessage({
    id: "page.uguide.selectbox.option2"
  });
  const selectboxOp3 = intl.formatMessage({
    id: "page.uguide.selectbox.option3"
  });
  const tableH1 = intl.formatMessage({
    id: "page.uguide.table.th1"
  });
  const tableH2 = intl.formatMessage({
    id: "page.uguide.table.th2"
  });
  const tableH3 = intl.formatMessage({
    id: "page.uguide.table.th3"
  });
  const tableH4 = intl.formatMessage({
    id: "page.uguide.table.th4"
  });
  const tableNoData = intl.formatMessage({
    id: "page.uguide.table.nodata"
  });

  const allI18 = intl.formatMessage({
    id: "page.uguide.all"
  });
  const inquiryDetailsI18 = intl.formatMessage({
    id: "page.uguide.inquiryDetails"
  });
  const contactUsI18 = intl.formatMessage({
    id: "page.uguide.contactUs"
  });
  const answerCompleteI18 = intl.formatMessage({
    id: "page.uguide.answerComplete"
  });
  const contactUsTableH1I18 = intl.formatMessage({
    id: "page.uguide.contactUsTable.H1"
  });

  const contactUsTableH2I18 = intl.formatMessage({
    id: "page.uguide.contactUsTable.H2"
  });
  const contactUsTableH3I18 = intl.formatMessage({
    id: "page.uguide.contactUsTable.H3"
  });
  const contactUsTableH4I18 = intl.formatMessage({
    id: "page.uguide.contactUsTable.H4"
  });
  const contactUsTableH5I18 = intl.formatMessage({
    id: "page.uguide.contactUsTable.H5"
  });
  const waitingforAnswersI18 = intl.formatMessage({
    id: "page.uguide.waitingforAnswers"
  });
  const listI18 = intl.formatMessage({
    id: "page.uguide.list"
  });
  const thisIsPrivateInquiryI18 = intl.formatMessage({
    id: "page.uguide.thisIsPrivateInquiry"
  });
  const passwordPlaceholderI18 = intl.formatMessage({
    id: "page.uguide.input.passwordPlaceholder"
  });
  const passwordErrorI18 = intl.formatMessage({
    id: "page.uguide.input.passwordError"
  });
  const confirmI18 = intl.formatMessage({
    id: "page.uguide.confirm"
  });
  const loginErrorI18 = intl.formatMessage({
    id: "page.uguide.loginError"
  });
  const gotoLoginScreenI18 = intl.formatMessage({
    id: "page.uguide.gotoLoginScreen"
  });
  const disclosureI18 = intl.formatMessage({
    id: "page.uguide.disclosure"
  });
  const openI18 = intl.formatMessage({
    id: "page.uguide.open"
  });
  const privateTextI18 = intl.formatMessage({
    id: "page.uguide.private"
  });
  const selectI18 = intl.formatMessage({
    id: "page.uguide.select"
  });
  const subjectPlaceholderI18 = intl.formatMessage({
    id: "page.uguide.input.subjectPlaceholder"
  });
  const textareaPlaceholderI18 = intl.formatMessage({
    id: "page.uguide.textarea.placeholder"
  });
  const categoryI18 = intl.formatMessage({
    id: "page.uguide.category"
  });
  const titleI18 = intl.formatMessage({
    id: "page.uguide.subtitle"
  });
  const editI18 = intl.formatMessage({
    id: "page.uguide.edit"
  });
  const askQnaI18 = intl.formatMessage({
    id: "page.uguide.askQna"
  });
  
  return {
    title,
    tab1Title,
    tab2Title,
    tab3Title,
    selectboxOp1,
    selectboxOp2,
    selectboxOp3,
    tableH1,
    tableH2,
    tableH3,
    tableH4,
    tableNoData,
    allI18,
    inquiryDetailsI18,
    contactUsI18,
    answerCompleteI18,
    contactUsTableH1I18,
    contactUsTableH2I18,
    contactUsTableH3I18,
    contactUsTableH4I18,
    contactUsTableH5I18,
    waitingforAnswersI18,
    listI18,
    thisIsPrivateInquiryI18,
    passwordPlaceholderI18,
    passwordErrorI18,
    confirmI18,
    loginErrorI18,
    gotoLoginScreenI18,
    disclosureI18,
    openI18,
    privateTextI18,
    selectI18,
    subjectPlaceholderI18,
    textareaPlaceholderI18,
    categoryI18,
    titleI18,
    editI18,
    askQnaI18
  };
}

export default useFAQpageTranslation;
