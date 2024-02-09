import { Button } from 'components/ui/button/Button'
import React from 'react'
import useTodoDetailCache from './useTodoDetailCache'
import { useRouter } from 'next/router'
import { useQueryClient } from '@tanstack/react-query'

function TodoDetail() {
    const router = useRouter()
    const queryClient = useQueryClient()
    const todoId = router?.query?.id
    const previousTodo = queryClient.getQueryData(['todoDetail'], { param: '1' })
    console.log('queryClient', queryClient)
    const { data, todoEditMutation, todoDeleteMutation } = useTodoDetailCache({ todoId })

    function handleEditTodo() {
        const editedTodo = {
            id: todoId,
            name: '110 edited todo immediately changes variables',
            description: 'edited todo description',
            isCompleted: true,
        }
        todoEditMutation.mutate(editedTodo, {
            // onMutate: async (newTodo) => {
            //     console.log('newTodo', newTodo)
            //     await queryClient.cancelQueries({ queryKey: ['todoDetail'] })
            //     queryClient.setQueryData(['todoDetail'], (old) => [...old, newTodo])
            //     return { previousTodo }
            // },
            onSuccess: (data, variables, context) => {
                console.log('onSuccess', data, variables, context)
                const previousTodo = queryClient.getQueryData(['todoDetail'])
                queryClient.setQueryData(['todoDetail'], (old) => [...old, ...variables])
                queryClient.invalidateQueries({ queryKey: ['todoDetail'] })
                queryClient.invalidateQueries({ queryKey: ['todos'] })
                return { previousTodo }
            },
            onError: (error, variables, context) => {
                queryClient.setQueryData(['todoDetail'], context.previousTodos)
                console.error('onError', error, variables, context)
            },
            // onSettled: () => {
            //     queryClient.invalidateQueries({ queryKey: ['todoDetail'] })
            //   },
        })
    }

    function handleDeleteTodo() {
        todoDeleteMutation.mutate(todoId, {
            onSuccess: () => {
                queryClient.invalidateQueries({ queryKey: ['todoDetail'] })
                router.push('/todos')
            },
            onError: (error, variables, context) => {
                console.error('onError', error, variables, context)

                // I will fire second!
            },
            onSettled: (data, error, variables, context) => {
                console.error('onSettled', error, variables, context)

                // I will fire second!
            },
        })
    }

    return (
        <div>
            <h2>TodoDetail: {data?.name || previousTodo?.name}</h2>
            <div className="flex gap-10 py-10">
                <Button onClick={handleEditTodo}>
                    {todoEditMutation.isError && '... засахад алдаа гарлаа'}
                    {todoEditMutation.isPending && '... уншиж байна'}
                    {todoEditMutation.isSuccess && '... засагдсан'}
                    {todoEditMutation.isIdle && 'засах'}
                </Button>
                <Button onClick={handleDeleteTodo}>
                    {todoDeleteMutation.isError && '... устгахад алдаа гарлаа'}
                    {todoDeleteMutation.isPending && '... уншиж байна'}
                    {todoDeleteMutation.isIdle && 'устгах'}
                </Button>
            </div>
        </div>
    )
}

export default TodoDetail
