import { AdminActionType } from 'service/actionType'

const initialState = {
    search : '',
    list : [],
    pagination : {
        limit: 10,
        page: 1,
        count: null,
        total_pages: null,        
    },
    selectedStaffId : 0,
    default : {
        limit: 10,
        page: 1,
        count: null,
        total_pages: null
    },
    showStaffDetails : false,
    isFetching : false
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case AdminActionType.GET_STAFF_LIST:
            return {
                ...state,
                list : payload.staffList,
                pagination : payload.meta.pagination
            }
        case AdminActionType.UPDATE_STAFF_LIST:
            return {
                ...state,
                list : [...payload.list]
            }
        case AdminActionType.RESET_STAFF_LIST:
            return {
                ...state,
                list : [],
                pagination : state.default
            }
        case AdminActionType.IS_FETCHING:
            return {
                ...state,
                isFetching : payload
            }
        case AdminActionType.TOGGLE_STAFF_DETAILS:
            return {
                ...state,
                showStaffDetails : !state.showStaffDetails
            }   
        case AdminActionType.GET_STAFF_DETAILS:
            return {
                ...state,
                selectedStaffId : payload.staffId
            }
        default:
            return state
    }

}