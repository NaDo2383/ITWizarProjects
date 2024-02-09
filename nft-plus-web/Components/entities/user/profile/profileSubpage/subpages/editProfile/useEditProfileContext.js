/**
 * @createdBy duka 2023/5/18
 */
import React, { createContext, useState, useContext } from "react";

const EditProfileContext = createContext({});
const EditProfileProvider = ({ children }) => {
  const [profileDesc, setProfileDesc] = useState(null);
  const [nickName, setNickName] = useState("");
  const [desc, setDesc] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);
  const [sendEmail, setSendEmail] = useState(false);
  const [editLoading, setEditLoading] = useState(false);
  const [resendToken, setResendToken] = useState("");

  return (
    <EditProfileContext.Provider
      value={{
        profileDesc,
        setProfileDesc,
        nickName,
        setNickName,
        desc,
        setDesc,
        editLoading,
        setEditLoading,
        sendEmail,
        setSendEmail,
        checkEmail,
        setCheckEmail,
        resendToken,
        setResendToken
      }}>
      {children}
    </EditProfileContext.Provider>
  );
};

const useEditProfileContext = () => useContext(EditProfileContext);

export { EditProfileContext, EditProfileProvider, useEditProfileContext };
