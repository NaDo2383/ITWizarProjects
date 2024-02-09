import React from 'react'
import useTodoListCache from './useTodoListCache'
// import { TTodo } from '../useTodo'
// import TodoItem from './TodoItem'

function TodoList(): JSX.Element {
    const {
        isPending,
        error,
        // data
    } = useTodoListCache()

    if (isPending) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>Post татахад алдаа гарлаа: {error.message}</p>
    }

    return <ul>{/* {data.res.map((todo: TTodo, idx: number) => <TodoItem key={'todo-' + idx} {...todo} />)} */}</ul>
}

export default TodoList
