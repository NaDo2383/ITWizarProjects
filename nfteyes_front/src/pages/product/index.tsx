import React from 'react'
import { NextPage } from 'next'
import { ProductProvider } from 'features/product/store/useProductCtx'
import ProductPage from 'features/product/ProductPage'
import { PopupProvider } from 'common/popup/usePopupCtx'

const Product: NextPage = () => {
    return (
        <PopupProvider>
            <ProductProvider>
                <ProductPage />
            </ProductProvider>
        </PopupProvider>
    )
}

export default Product
