import { StaffActionType,common } from 'service/actionType'

const initialState = {
    search: '',
    list: [],
    pagination: {
        limit: 10,
        page: 1,
        count: null,
        total_pages: null,
    },
    applicationCount: {},
    selectedApplicationId: 0,
    pgBmpuApplicationStatus :{},
    pgDmpuApplicationStatus :{},
    egBmpuApplicationStatus :{},
    egDmpuApplicationStatus :{},
    selectedApplicationStatus: {},
    showApplicationDetails: false,
    applicationDetail: null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case StaffActionType.GET_STAFF_APPLICATION_LIST:
            return {
                ...state,
                list: payload.list,
                pagination: payload.pagination,
                applicationCount: payload.applicationCount
            }
        case StaffActionType.GET_STAFF_APPLICATION_DETAIL:
            return {
                ...state,
                selectedApplicationId: payload.formId
            }
        case StaffActionType.GET_PC_APPLICATION_STATUS:
            return {
                ...state,
                selectedApplicationStatus: payload
            }
        case StaffActionType.GET_PC_APPLICATION_DETAIL:
            return {
                ...state,
                applicationDetail: payload
            }
        case StaffActionType.GET_ENTERPRISE_APPLICATION_STATUS:
            return {
                ...state,
                selectedApplicationStatus: payload
            }
        case StaffActionType.GET_ENTERPRISE_APPLICATION_DETAIL:
            return {
                ...state,
                applicationDetail: payload
            }
        case StaffActionType.GET_PG_BMMU_STAFF_APPLICATION_LIST:
            return {
                ...state,
                list : payload.list,
                pagination : payload.pagination,
                applicationCount : payload.applicationCount
            }
        case common.RESET_APPLICATION_DETAIL:
            return {
                ...state,
                list : [],
                selectedApplicationStatus : {},
                selectedApplicationId : null
            }
        default:
            return state
    }

}