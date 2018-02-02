const initialState = [];

export function test(state = initialState, action) {
    if (action.type === 'ADD_TEST') {
        return [
            ...state,
            action.payload
        ]
    }
}