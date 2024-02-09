import useTodo from '../useTodo'
import { useMutation, useQuery } from '@tanstack/react-query'

interface ITodoDetailCache {
    todoId: number
}

function useTodoDetailCache({ todoId }: ITodoDetailCache) {
    const { getTodoDetail, editTodoDetail, deleteTodoDetail } = useTodo()

    const { isPending, error, data } = useQuery({
        queryKey: ['todoDetail', todoId],
        queryFn: async () => await getTodoDetail(todoId),
    })

    const todoEditMutation = useMutation({
        mutationFn: editTodoDetail,
    })

    const todoDeleteMutation = useMutation({
        mutationFn: deleteTodoDetail,
    })

    return {
        isPending,
        error,
        data,
        todoEditMutation,
        todoDeleteMutation,
    }
}

export default useTodoDetailCache
