import React from 'react'
import PostList from 'features/todo/list/TodoList'
import useTodoListCache from 'features/todo/list/useTodoListCache'
import { Button } from 'components/ui/button/Button'
function Todo() {
    const { todoListMutation } = useTodoListCache()

    function handleAddTodo() {
        todoListMutation.mutate({
            name: 'my added todo name',
            description: 'added todo description',
            isCompleted: false,
        })
    }

    return (
        <div>
            <PostList />
            <Button onClick={handleAddTodo}>Add New Post</Button>
        </div>
    )
}

export default Todo
