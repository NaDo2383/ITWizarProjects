export function formReducer(state, action) {
    switch (action.type) {
        case 'CHANGE':
            console.info('dispatched::CHANGE action')
            return {
                ...state,
                [action.payload.fieldName]: {
                    ...state[action.payload.fieldName],
                    value: action.payload.value,
                    error: null,
                },
            }
        default:
            return state
    }
}
