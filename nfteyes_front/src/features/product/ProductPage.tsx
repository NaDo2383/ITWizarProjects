import React from 'react'
import ProductList from './ProductList'
import Flex from 'components/ui/containers/flex/Flex'

const ProductPage = () => {
    return (
        <Flex gap={10}>
            <ProductList />
        </Flex>
    )
}

export default ProductPage
