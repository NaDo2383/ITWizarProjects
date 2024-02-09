import { useCrud } from 'common/axios/useCrud'

export type TFilter = {
    page?: number
    limit?: number
}
export type TTodo = {
    id: number
    name: string
    photo?: string
    description: string
    isCompleted?: boolean
    createdAt?: string
    updatedAt?: string
    deletionDate?: null | string
}

function useTodo() {
    const { getData, postData, putData, deleteData } = useCrud()

    async function getTodos(payload: TFilter) {
        const { page, limit } = payload

        const res = await getData<TTodo[]>('/todos' + `?page=${page}&limit=${limit}&sort=-createdAt`)
        return res
    }

    async function addTodo(payload: Partial<TTodo>) {
        const res = await postData('/todos', payload)
        return res
    }

    async function getTodoDetail(id: number) {
        console.log('getTodoDetail', id)
        const res = await getData('/todos/' + id)
        return res
    }

    async function editTodoDetail(payload: Partial<TTodo>) {
        const res = await putData('/todos/' + payload.id, payload)
        return res
    }

    async function deleteTodoDetail(id: number) {
        const res = await deleteData('/todos/' + id)
        return res
    }

    return {
        getTodos,
        addTodo,
        getTodoDetail,
        editTodoDetail,
        deleteTodoDetail,
    }
}

export default useTodo
