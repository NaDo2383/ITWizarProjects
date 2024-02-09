/**
 * @createdBy Phill Anderson 2022/4/3
 */
import React, { createContext, useState, useContext } from "react";

const LicenseContext = createContext({});

const initialDate = new Date();
export const tomDate = new Date(
  initialDate.getFullYear(),
  initialDate.getMonth(),
  initialDate.getDate() + 1
);
const initialLicenseForm = {
    rights: [],
    applicantName: '',
    applicantAddress: '',
    applicantContact: '',
    licenseEnd: tomDate,
    licenseStart: tomDate,
    paymentAmount: '', // getLicenseIssuance - ийг дуудаж тооцоолсон утга бга байх
    purpose: '',
}

const LicenseProvider = ({ children }) => {
    const [ licenseRequests, setLicenseRequests ] = useState([])
    const [ paidLicenses, setPaidLicenses ] = useState([])
    const [ licensePagination, setLicensePagination ] = useState({
        page: 1,
        size: 3
    })
    const [ licenseForm , setLicenseForm ] = useState(initialLicenseForm)
    const [ licenseFormAlertMsg, setLicenseFormAlertMsg ] = useState(null)
    const [ licenseFormError, setLicenseFormError ] = useState({ 
      ...initialLicenseForm, 
      licenseEnd:null, 
      licenseStart: null, 
      rights: null
    })
    const [datePickerState, setDatePickerState ] = useState({
      highlightedDays: [1, 2, 15],
      isLoading: false,
    })
  return (
    <LicenseContext.Provider
      value={{
         licenseRequests,
         setLicenseRequests,
         licensePagination, 
         setLicensePagination,
         paidLicenses, 
         setPaidLicenses,
         licenseForm, 
         setLicenseForm,
         licenseFormError, 
         setLicenseFormError,
         datePickerState, 
         setDatePickerState,
         licenseFormAlertMsg, 
         setLicenseFormAlertMsg   
      }}>
      { children }
    </LicenseContext.Provider>
  );
};

const useLicenseContext = () => useContext(LicenseContext);

export { LicenseContext, LicenseProvider, useLicenseContext };