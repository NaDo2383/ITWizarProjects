import React from 'react'
import { TTodo } from '../useTodo'
import { useRouter } from 'next/navigation'
import tw from 'tailwind-styled-components'

function TodoItem(props: TTodo) {
    const { name, id } = props
    const { push } = useRouter()

    return (
        <TodoItemLi onClick={() => push('/todos/' + id)}>
            <h4>{name}</h4>
        </TodoItemLi>
    )
}
const TodoItemLi = tw.li`
    cursor-pointer
    py-10
    hover:bg-gray-300
`

export default TodoItem
