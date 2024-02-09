/**
 * @createdBy Phill Anderson 2022/07/01
 */
import React, { createContext, useState, useContext } from "react";

export const FormContext = createContext({});

export const FormProvider = ({ children }) => {
	const [ form, setForm ] = useState({});

    
	return (
		<FormContext.Provider
			value={{
				form, 
                setForm,
			}}>
			{children}
		</FormContext.Provider>
	);
};

export const useFormContext = () => useContext(FormContext);
