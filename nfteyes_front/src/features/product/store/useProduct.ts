import { useProductCtx } from './useProductCtx'
import { TProduct, TProductRes } from './productReducer'

function useUser() {
    const { productState, productDispatch } = useProductCtx()

    function setProductsIntoCtx(product: TProductRes): void {
        productDispatch({ type: 'SET', payload: { result: product.result, pagination: product.pagination } })
    }

    async function addProduct(user: TProduct): Promise<void> {
        productDispatch({ type: 'ADD', payload: user })
    }

    async function editProduct(editedUser: TProduct): Promise<TProduct | undefined> {
        productDispatch({ type: 'EDIT', payload: editedUser })
        return productState.products.result.find((user: TProduct) => user.id === editedUser.id)
    }

    async function deleteProduct(id: number): Promise<void> {
        productDispatch({ type: 'DELETE', payload: id })
    }

    async function getProducts(): Promise<TProduct[]> {
        productDispatch({ type: 'GET' })
        return productState.products.result
    }

    async function getProductById(id: number): Promise<TProduct | null> {
        productDispatch({ type: 'GET_BY_ID', payload: id })
        return productState.productDetail
    }

    return {
        setProductsIntoCtx,
        addProduct,
        getProducts,
        getProductById,
        editProduct,
        deleteProduct,
        productState,
    }
}

export default useUser
