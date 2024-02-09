import React, { useEffect } from 'react'
// import useFetchData from 'common/fetch/useFetchData'
import useProduct from './store/useProduct'
import { useProductCtx } from './store/useProductCtx'
// import ProductListItem from './ProductListItem'
import useAxiosData from 'common/axios/useAxiosData'
import { areEqual } from 'libs/utils/areEqual'
import { TProduct, TProductRes } from './store/productReducer'

function ProductList() {
    // const products = useFetchData<TProduct[]>('/users')
    const products = useAxiosData<TProduct[]>('/courses')
    const { setProductsIntoCtx } = useProduct()
    const { productState } = useProductCtx()

    useEffect(() => {
        if (products) {
            console.log('aaaaaa', products)
            setProductsIntoCtx(products as TProductRes)
        }
    }, [products])

    console.log('ProductList render hiilee', productState)

    return (
        <div className="border p-10">
            {/* {productState.products.data.map((user: TProduct, idx: number) => (
                <ProductListItem key={'user-item-' + idx} {...user} />
            ))} */}
        </div>
    )
}

export const ProductListCached = React.memo(ProductList, areEqual) // зарим тохиолдолд re-render хийгдэхгүй байгаа нь annoying болгож байна
export default ProductList
