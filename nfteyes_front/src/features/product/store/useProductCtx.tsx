import React, { createContext, useReducer, useContext, FC, Dispatch } from 'react'
import { TProductState, TUserAction, productReducer } from './productReducer'

interface IProductCtx {
    productState: TProductState
    productDispatch: Dispatch<TUserAction>
}

const ProductContext = createContext<IProductCtx>({} as IProductCtx)

const initialUserState: TProductState = {
    products: {
        result: [],
    },
    productDetail: null,
}

const ProductProvider: FC<JsxChildren> = ({ children }) => {
    const [productState, productDispatch] = useReducer(productReducer, initialUserState)

    return (
        <ProductContext.Provider
            value={{
                productState,
                productDispatch,
            }}
        >
            {children}
        </ProductContext.Provider>
    )
}

const useProductCtx = () => useContext(ProductContext)

export { ProductContext, ProductProvider, useProductCtx }
