import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import useTodo from '../useTodo'

function useTodoListCache() {
    const { getTodos, addTodo } = useTodo()
    const queryClient = useQueryClient()
    const { isPending, error, data } = useQuery({
        queryKey: ['todos'],
        queryFn: async () => await getTodos({ page: 1, limit: 10 }),
    })

    const todoListMutation = useMutation({
        mutationFn: addTodo,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['todos'] })
        },
    })

    return {
        isPending,
        error,
        data,
        todoListMutation,
    }
}

export default useTodoListCache
