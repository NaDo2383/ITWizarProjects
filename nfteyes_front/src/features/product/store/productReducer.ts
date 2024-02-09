export type TProduct = {
    id: number
    name: string
    code: string
    slug?: string
    initialPrice: number | string
    price: number | string
    seen?: number | string
    photo?: string
    author: string
    video_length: string
    description: string
    purchaseCount: number
    lessonCount: number
    avgRate?: number
    totalRateCount?: number
    createdAt?: string
    updatedAt?: string
    deletionDate?: string | null
    categoryId: number
    adminId: number
    // data?: any
}

export type TProductRes = TPaginatedState<TProduct[]>

export type TProductState = {
    products: TProductRes
    productDetail: TProduct | null
}

export type TUserAction =
    | {
          type: 'SET'
          payload: TProductRes
      }
    | {
          type: 'ADD'
          payload: TProduct
      }
    | {
          type: 'EDIT'
          payload: TProduct
      }
    | {
          type: 'DELETE'
          payload: number
      }
    | {
          type: 'GET'
      }
    | {
          type: 'GET_BY_ID'
          payload: number
      }

export function productReducer(state: TProductState, action: TUserAction): TProductState {
    const { products } = state
    const { type } = action
    switch (type) {
        case 'SET':
            console.info('dispatched:: PRODUCTS_SET')
            return {
                ...state,
                products: {
                    result: action.payload.result,
                    pagination: action.payload.pagination,
                },
            }
        case 'ADD':
            console.info('dispatched:: PRODUCT_ADD')
            return {
                ...state,
                products: {
                    result: [...state.products.result, action.payload],
                },
            }
        case 'EDIT':
            console.info('dispatched:: PRODUCT_EDIT')
            const userToUpdate = products.result.find((products) => products.id === action.payload.id)
            if (!userToUpdate) return state

            const updatedUsers: TProduct[] = products.result.map((products) =>
                products.id === userToUpdate.id ? action.payload : products
            )

            return {
                ...state,
                products: {
                    result: updatedUsers,
                },
            }
        case 'DELETE':
            console.info('dispatched:: PRODUCT_DELETE')
            const filteredUsers: TProduct[] = products.result.filter((products) => products.id !== action.payload)
            return {
                ...state,
                products: {
                    result: filteredUsers,
                },
            }
        case 'GET':
            console.info('dispatched:: PRODUCTS_GET')
            return {
                ...state,
            }
        case 'GET_BY_ID':
            console.info('dispatched:: PRODUCT_GET_BY_ID')
            const productById = products.result.find((products) => products.id === action.payload)
            return {
                ...state,
                productDetail: productById || null,
            }
        default:
            return state
    }
}
