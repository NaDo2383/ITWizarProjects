/**
 * @createdBy Phill Anderson 2022/4/19
 */
import { useRef, useEffect } from "react";
import { useLicenseContext, tomDate } from "./useLicenseContext";
import useCrud from "common/axios/crud";
import useMessageFactory from "common/message/useMessageFactory";
import getDaysInMonth from "date-fns/getDaysInMonth";
import usePopup from "Components/ui/popup/usePopup";
import { useGlobalContext } from "common/global/useGlobalContext";
import { apis } from "utils/libs";
import moment from "moment";

function getRandomNumber(min, max) {
  return Math.round(Math.random() * (max - min) + min);
}

function fakeFetch(date, { signal }) {
  return new Promise((resolve, reject) => {
    const timeout = setTimeout(() => {
      const daysInMonth = getDaysInMonth(date);
      const daysToHighlight = [1, 2, 3].map(() =>
        getRandomNumber(1, daysInMonth)
      );

      resolve({ daysToHighlight });
    }, 500);

    signal.onabort = () => {
      clearTimeout(timeout);
      reject(new DOMException("aborted", "AbortError"));
    };
  });
}
function useLicenseForm() {
  const requestAbortController = useRef(null);
  const { setGlobalLoading, globalItems } = useGlobalContext()
  const { handleShowModal, MODAL_TYPES } = usePopup()
  const { postModel } = useCrud()
  const { calcMessage } = useMessageFactory()
  const artDetail = globalItems?.artDetail
  const {
    licenseForm,
    setLicenseForm,
    licenseFormError,
    setLicenseFormError,
    datePickerState,
    setDatePickerState,
  } = useLicenseContext()

  async function sendLicenseRequest(data) {
    setGlobalLoading(true)
    try {
      const res = await postModel(apis.licenseRequestRegister, data, true)
      return res
    } catch (e) {
      console.error(e.code)
      if (e?.response?.status) {
        return calcMessage(e?.response?.code)
      }
    } finally {
      setGlobalLoading(false)
    }
  }

  function handleMonthChange(date) {
    if (requestAbortController.current) {
      requestAbortController.current.abort()
    }
    setDatePickerState((prev) => ({ ...prev, highlightedDays: [], isLoading: true }))
    fetchHighlightedDays(date)
  }

  function fetchHighlightedDays(date) {
    const controller = new AbortController();
    fakeFetch(date, {
      signal: controller.signal,
    })
      .then(({ daysToHighlight }) => {
        setDatePickerState((prev) => ({ ...prev, highlightedDays: daysToHighlight, isLoading: false }))
      })
      .catch((error) => {
        if (error.name !== "AbortError") {
          throw error;
        }
      });
    requestAbortController.current = controller;
  };

  function handleStartDate(newValue) {
    setLicenseForm((prev) => ({ ...prev, licenseStart: newValue }))
  }

  function handleEndDate(newValue) {
    setLicenseForm((prev) => ({ ...prev, licenseEnd: newValue }))
  }

  function handleChangeInput(e) {
    const { name, value } = e.target
    setLicenseForm((prev) => ({ ...prev, [name]: value }))
    setLicenseFormError((prev) => ({ ...prev, [name]: null }))
  }

  function handleChangePaymentAmount(e) {
    setLicenseForm((prev) => ({ ...prev, paymentAmount: e.target.value.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1") }))
    setLicenseFormError((prev) => ({ ...prev, paymentAmount: null }))
  }

  function handleSelectRight(el) {
    const cloneRights = [...licenseForm.rights]
    const isChosenRightExisted = cloneRights.some(right => right.id === el.id)
    if (isChosenRightExisted) {
      const removedChosenItemArray = cloneRights.filter(right => right.id !== el.id)
      setLicenseForm((prev) => ({ ...prev, rights: removedChosenItemArray }))
      return
    }

    const uniqueRight = {
      id: el.id,
      code: el.code,
      forSell: el.forSell,
      regDate: el.regDate
    }
    setLicenseForm((prev) => ({ ...prev, rights: [...prev.rights, uniqueRight] }))
    setLicenseFormError((prev) => ({ ...prev, rights: null }))
  }

  function handleChangeContact(e) {
    // мөнх-эрдэнэ энэ дээр юу бичсэн бэ?
    //@createdBy Munh-Erdene
    if (/\D/g.test(e.target.value)) {
      e.target.value = e.target.value.replace(
        /[a-zA-Z\ a-яА-Я\ \u3131-\u314e|\u314f-\u3163|\uac00-\ud7a3\ !@#$%^&*()₮"№,.[';`?\-\]\ө\Ө\Ү\ү\ё\Ё\=\+_{}\/]/g,
        ""
      )
    }
    setLicenseForm((prev) => ({ ...prev, applicantContact: e.target.value }))
    setLicenseFormError((prev) => ({ ...prev, applicantContact: null }))
  }

  //@createdBy Narada 0927
  const formatDate = (date) => {
    return date
      .replaceAll(". ", "-")
      .replace(".", "")
      .split("-")
      .map((el) => {
        let current = el;
        if (current.length < 2) {
          current = "0" + current;
        }
        return current;
      })
      .join("-");
  };

  //@createdBy Narada 0927
  const formatDate1 = (date) => {
    let d = new Date(date);
    d.setDate(d.getDate() - 1);
    return d
      .toLocaleDateString("ko-KR")
      .replaceAll(". ", "-")
      .replace(".", "")
      .split("-")
      .map((el) => (el.length < 2 ? "0" + el : el))
      .join("-");
  };

  async function checkLicenseFormValues() {
    const { applicantName, applicantAddress, applicantContact, purpose, rights, paymentAmount } = licenseForm
    applicantName === '' && setLicenseFormError((prev) => ({ ...prev, applicantName: 'Please enter your full name.' }))
    applicantAddress === '' && setLicenseFormError((prev) => ({ ...prev, applicantAddress: 'Please enter your address.' }))
    applicantContact === '' && setLicenseFormError((prev) => ({ ...prev, applicantContact: 'Please enter your contact information.' }))
    paymentAmount === '' && setLicenseFormError((prev) => ({ ...prev, paymentAmount: 'Please enter the payment amount.' }))
    purpose === '' && setLicenseFormError((prev) => ({ ...prev, purpose: 'Please enter the purpose of use.' }))
    rights.length === 0 && setLicenseFormError((prev) => ({ ...prev, rights: 'please select at least one' }))
  }

  async function handleClickApply(artworkId) {
    await checkLicenseFormValues()
    const isFormNoErrors = Object.values(licenseFormError).every(error => {
      if (error === null) {
        return true
      }
      return false
    })
    if (!isFormNoErrors) {
      const firstTruthyErrorKey = Object.keys(licenseFormError).find(i => licenseFormError[i] !== null)
      const firstTruthyError = (licenseFormError[firstTruthyErrorKey] && licenseFormError[firstTruthyErrorKey]) || 'Please select the target right.'
      handleShowModal(MODAL_TYPES.ALERT, { message: firstTruthyError, width: 450 })
      return
    }
    const data = {
      ...licenseForm,
      paymentAmount: +licenseForm.paymentAmount,
      licenseEnd: moment(licenseForm.licenseEnd).format('YYYY-MM-DD'),
      licenseStart: moment(licenseForm.licenseStart).format('YYYY-MM-DD'),
      artworkId: +artworkId,
    }
    //  const res = await sendLicenseRequest(data)
    //   if(res?.message === 'failed.license.request.register' ) {
    //      alert('something went wrong during send license request!')
    //   }
    handleShowModal(MODAL_TYPES.LICENSE_REQUEST, { artwork: artDetail, licenseForm, formatDate1, sendLicenseRequest, data })
  }

  useEffect(() => {
    fetchHighlightedDays(tomDate)
    return () => requestAbortController.current?.abort();
  }, [])

  return {
    handleStartDate,
    handleEndDate,
    handleChangeInput,
    handleChangeContact,
    handleMonthChange,
    handleChangePaymentAmount,
    handleSelectRight,
    licenseForm,
    licenseFormError,
    setLicenseFormError,
    datePickerState,
    sendLicenseRequest,
    tomDate,
    formatDate,
    formatDate1,
    handleClickApply,
  }
}

export default useLicenseForm