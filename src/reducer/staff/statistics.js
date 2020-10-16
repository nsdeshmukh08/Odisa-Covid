import { AdminActionType } from 'service/actionType'

const initialState = {
    isFetching: false,
    statistics: {}
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case AdminActionType.STATISTICS_IS_FETCHING:
            return {
                ...state,
                isFetching: payload
            }
        case AdminActionType.GET_STATISTICS:
            return {
                ...state,
                statistics: payload
            }
        default:
            return state
    }
}
