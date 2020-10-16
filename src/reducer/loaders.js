import { loaders } from "service/actionType"
import { common } from 'service/actionType'

const initialState = {
    isCreateAppFetching : false,
    isApplicationFetchingDraftDetails : false,
    isFetchingProfileDetails : true,
    isFetchingApplicationStatus : false,
    isFetchingApplicationDetail : false,
    isFetchingUpdateOpenApplication : false,
    isFetchingApplicationList : false,
    isFetchingChartData:false
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case loaders.IS_CREATE_APP_FETCHING:
            return {
                ...state,
                isCreateAppFetching: payload
            }
        case loaders.IS_CREATE_APP_GET_DRAFT_DETAILS_FETCHING:
            return {
                ...state,
                isApplicationFetchingDraftDetails : payload
            }
        case loaders.IS_FETCHING_APPLICATION_LIST:
            return {
                ...state,
                isFetchingApplicationList : payload
            }
        case loaders.IS_FETCHING_PROFILE_DETAILS:
            return {
                ...state,
                isFetchingProfileDetails : payload
            }
        case loaders.IS_FETCHING_PC_APPLICATION_STATUS:
            return {
                ...state,
                isFetchingApplicationStatus : payload
            }
        case loaders.IS_FETCHING_PC_APPLICATION_DETAIL:
            return {
                ...state,
                isFetchingApplicationDetail : payload
            }
        case loaders.IS_FETCHING_UPDATE_OPEN_APPLICATION:
            return {
                ...state,
                isFetchingUpdateOpenApplication : payload
            }
        case loaders.IS_FETCHING_CHART_DATA:
            return {
                ...state,
                isFetchingChartData : payload
            }
        case common.RESET_STAFF_DETAILS:
            return {
                ...initialState
            }
        default:
            return state
    }
}