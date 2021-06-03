export const TOGGLE = 'TOGGLE'
const initialState = {
    value:false
}
export const toggleAction = () => {
    return {
        type: TOGGLE,     
    }
}
export const toggleReducer = (state=initialState, action) => {
    switch (action.type) {
        case TOGGLE:
        return {
           value:!state.value
            }
        default:
            return state
    }
}