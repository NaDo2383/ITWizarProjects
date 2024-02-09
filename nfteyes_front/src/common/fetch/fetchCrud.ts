// const BASE_URL = 'https://jsonplaceholder.typicode.com'

// export type ApiResponse<T> = {
//     //   data?: T;
// }

type ApiError = {
    message: string
}

// async function handleResponse<T>(response: Response) {
//     if (!response.ok) {
//         const errorData: ApiError = await response.json()
//         throw new Error(errorData.message || 'ямар нэгэн алдаа гарлаа')
//     }
//     const responseData = await response.json()
//     return responseData as T
// }

// export async function fetchItems<T>(url: string, token?:string) {

//     const response = await fetch(BASE_URL + url, {
//         method: 'GET',
//     })
//     return await handleResponse<T>(response)
// }

// export async function createItem<T>(data: T, token?:string) {
//     const response = await fetch(BASE_URL, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     return await handleResponse<T>(response)
// }

// export async function updateItem<T>(id: number, data: T, token?:string) {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//         method: 'PUT',
//         headers: {
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify(data),
//     })
//     return await handleResponse<T>(response)
// }

// export async function deleteItem(id: number, token?:string): Promise<void> {
//     const response = await fetch(`${BASE_URL}/${id}`, {
//         method: 'DELETE',
//     })
//     await handleResponse(response)
// }

export class ApiClient {
    private readonly BASE_URL: string
    constructor(baseUrl?: string) {
        this.BASE_URL = baseUrl ?? 'https://jsonplaceholder.typicode.com'
    }

    private async handleResponse<T>(response: Response): Promise<T> {
        if (!response.ok) {
            const errorData: ApiError = await response.json()
            throw new Error(errorData.message || 'ямар нэгэн алдаа гарлаа')
        }
        const responseData: T = await response.json()
        return responseData
    }

    public async fetchItems<T>(url: string, token?: string): Promise<T> {
        const response = await fetch(this.BASE_URL + url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
        })
        return await this.handleResponse<T>(response)
    }

    public async createItem<T>(data: T, token?: string): Promise<T> {
        const response = await fetch(this.BASE_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(data),
        })
        return await this.handleResponse<T>(response)
    }

    public async updateItem<T>(id: number, data: T, token?: string): Promise<T> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
            body: JSON.stringify(data),
        })
        return await this.handleResponse<T>(response)
    }

    public async deleteItem<T>(id: number, token?: string): Promise<void> {
        const response = await fetch(`${this.BASE_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                Authorization: token ? `Bearer ${token}` : '',
            },
        })
        await this.handleResponse<T>(response)
    }
}
