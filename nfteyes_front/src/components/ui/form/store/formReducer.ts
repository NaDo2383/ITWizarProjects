export type TFormValue = {
    [x: string]: any
    value: string | null
    error: string | null
}

export type TFormFileValue = {
    value: File | null
    error: string | null
}

export type TFormState = {
    [key: string]: TFormValue
}

export type TFormList = {
    [key: string]: TFormValue[]
}

export type TExtendedFormState = TFormState & {
    [key: string]: TFormFileValue
}

export type TFormAction =
    | {
          type: 'CHANGE'
          payload: {
              fieldName: keyof TFormState
              value: string | null
          }
      }
    | {
          type: 'CHECKBOX_GROUP_CHANGE'
          payload: {
              groupName: keyof TFormState
              fieldName: keyof TFormState // The field name of the specific checkbox
              value: string | null
          }
      }
    | {
          type: 'INIT_FORM_STATE'
          payload: Partial<TFormState>
      }
    | {
          type: 'SET_ERRORS'
          payload: Record<keyof TFormState, any>
      }
    | {
          type: 'RESET_FORM_FIELD'
          payload: { fieldName: keyof TFormState }
      }
    | {
          type: 'SET_ERROR_FIELD'
          payload: {
              fieldName: keyof TFormState
              error: string
          }
      }
    | {
          type: 'SET_VALUE_FIELD'
          payload: {
              fieldName: keyof TFormState
              value: string
          }
      }
    | {
          type: 'ADD_LIST'
          payload: {
              fieldName: keyof TFormState
              value: TFormValue[]
          }
      }
    | {
          type: 'MINUS_LIST'
          payload: {
              fieldName: keyof TFormState
              value: any
          }
      }
    | {
          type: 'UPDATE_LIST'
          payload: {
              listName: string
              idx: number
              fieldName: keyof TFormState
              value: TFormValue
          }
      }
    | {
          type: 'RESET_LIST'
          payload: { fieldName: keyof TFormState }
      }

export function formReducer(state: TFormState, action: TFormAction): TFormState | any {
    switch (action.type) {
        case 'CHANGE':
            console.info('dispatched::CHANGE event')
            return {
                ...state,
                [action.payload.fieldName]: {
                    ...state[action.payload.fieldName],
                    value: action.payload.value,
                    error: null,
                },
            }
        case 'RESET_FORM_FIELD':
            console.info('dispatched::RESET_FORM_FIELD event')
            return {
                ...state,
                [action.payload.fieldName]: { value: null, error: null },
            }
        case 'CHECKBOX_GROUP_CHANGE':
            console.info('dispatched::CHECKBOX_GROUP_CHANGE event')
            return {
                ...state,
                [action.payload.groupName]: {
                    ...state[action.payload.groupName],
                    [action.payload.fieldName]: {
                        value: action.payload.value,
                        error: null,
                    },
                },
            }
        case 'INIT_FORM_STATE':
            console.info('dispatched::INIT_FORM_STATE event')
            return {
                ...state,
                ...(action.payload as TFormState),
            }
        case 'SET_ERRORS':
            console.info('dispatched::SET_ERRORS event')
            console.log('action.payload', action.payload)
            for (const fieldName in action.payload) {
                if (fieldName) {
                    state[fieldName] = {
                        ...state[fieldName],
                        error: action.payload[fieldName],
                    }
                }
            }
            return {
                ...state,
            }
        case 'SET_ERROR_FIELD':
            console.info('dispatched::SET_ERROR_FIELD action')
            return {
                ...state,
                [action.payload.fieldName]: { value: null, error: action.payload.error },
            }
        case 'SET_VALUE_FIELD':
            console.info('dispatched::SET_VALUE_FIELD action')
            return {
                ...state,
                [action.payload.fieldName]: { value: action.payload.value, error: null },
            }
        case 'ADD_LIST':
            console.info('dispatched::ADD_LIST action')
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            }
        case 'MINUS_LIST':
            console.info('dispatched::MINUS_LIST action')
            return {
                ...state,
                [action.payload.fieldName]: action.payload.value,
            }
        case 'UPDATE_LIST':
            console.info('dispatched::UPDATE_LIST action')
            const updatedFormState: any = { ...state }

            const currentList: any = updatedFormState[action.payload.listName]

            const currentListItem = currentList[action.payload.idx]

            const updatedCurrentListItem = {
                ...currentListItem,
                [action.payload.fieldName]: {
                    ...currentListItem[action.payload.fieldName],
                    value: action.payload.value,
                    error: null,
                },
            }

            const updatedCurrentList = [...currentList]
            updatedCurrentList[action.payload.idx] = updatedCurrentListItem

            updatedFormState[action.payload.listName] = updatedCurrentList

            return updatedFormState
        case 'RESET_LIST':
            console.info('dispatched::RESET_LIST action')
            return {
                ...state,
                [action.payload.fieldName]: null,
            }
        default:
            return state
    }
}
