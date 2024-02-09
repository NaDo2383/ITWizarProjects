/**
 * @createdBy Phill Anderson 2022/3/30
 */
import React, { createContext, useState, useContext } from "react";

const TableContext = createContext({});

const TableProvider = ({ children }) => {
   

  return (
    <TableContext.Provider
      value={{
       
      }}>
      { children }
    </TableContext.Provider>
  );
};

const useTableContext = () => useContext(TableContext);

export { TableContext, TableProvider, useTableContext };
