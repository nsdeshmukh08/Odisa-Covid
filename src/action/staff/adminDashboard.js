import { AdminActionType } from 'service/actionType'


export const updateStaffList = (payload,cancelToken) => 
    async (dispatch, getState,{
    API,
    API_BOOK,
    toast
}) => {
    let { GET_STAFF_LIST_API } = API_BOOK.ADMIN_MANAGEMENT.CORE_API
    let data = {

        ...payload
    }
    let requestPayload = {
        ...GET_STAFF_LIST_API,
        data:payload,
        cancelToken:cancelToken
    }
    let response = await API(requestPayload)
    if(response.status === 200){
        dispatch({
            type : AdminActionType.GET_STAFF_LIST,
            payload : response.data.data
        })
    }else{
        toast(response.data.message,'error')
    }
}

export const getStaffDetails = (payload,cancelToken) => 
    async (dispatch) => {
        dispatch({
            type : AdminActionType.GET_STAFF_DETAILS,
            payload
        })
}

export const ActivateOrDeactivateStaff = (data,cancelToken) => async (dispatch,getState,{ API_BOOK,toast,API }) => {

    let { ACTIVATE_OR_DEACTIVE_STAFF } = API_BOOK.ADMIN_MANAGEMENT.CORE_API

    let { staffList } = getState().staff

    let staffDetails = staffList.list.find(data => data.staffId === staffList.selectedStaffId)

    if(!staffDetails)
    return
    let requestPayload = {
        ...ACTIVATE_OR_DEACTIVE_STAFF,
        params : {
            staffId : staffDetails.staffId,
            value : staffDetails.isActive ? 0 : 1
        },
        cancelToken
    }
    if(!window.confirm(`Are you sure you wanna ${staffDetails.isActive ? "deactivate" : "activate"} ${staffDetails.userName}`))
    return 
    dispatch({ type : AdminActionType.IS_FETCHING,payload:true })
    let response = await API(requestPayload)
    if(response.status === 200){
        
        let staffIndex = staffList.list.findIndex(data => data.staffId === staffDetails.staffId)

        if(staffIndex !== null)
            staffList.list[staffIndex].isActive = staffDetails.isActive ? 0 : 1
        dispatch({
            type : AdminActionType.UPDATE_STAFF_LIST,
            payload : staffList
        })
        toast(response.data.message,'success')
    }else{
        toast(response.data.message,'error')
    }
    dispatch({ type : AdminActionType.IS_FETCHING,payload:false })
}

export const updateStaffDetails = (params,cancelToken) => async (dispatch,getState,{ API_BOOK,toast,API }) => {

    let { UPDATE_STAFF_API } = API_BOOK.ADMIN_MANAGEMENT.CORE_API

    let { staffList } = getState().staff

    let requestPayload = {
        ...UPDATE_STAFF_API,
        params : {
            staffId : params.staffId,
            mobileNumber : params.mobileNumber,
            emailId : params.emailId
        },
        cancelToken
    }
    dispatch({ type : AdminActionType.IS_FETCHING,payload:true })
    let response = await API(requestPayload)
    if(response.status === 200){
        
        let staffIndex = staffList.list.findIndex(data => data.staffId === params.staffId)

        if(staffIndex !== null)
            staffList.list[staffIndex] = {
                ...staffList.list[staffIndex],
                ...params
            }

        dispatch({
            type : AdminActionType.UPDATE_STAFF_LIST,
            payload : staffList
        })
        dispatch({type : AdminActionType.TOGGLE_STAFF_DETAILS})
        toast(response.data.message,'success')
    }else{
        toast(response.data.message,'error')
    }
    dispatch({ type : AdminActionType.IS_FETCHING,payload:false })
}

export const toggleStaffDetails = () => async (dispatch,getState) => {
    dispatch({type : AdminActionType.TOGGLE_STAFF_DETAILS})
}

export const getStatisticsDetails = (payload, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { GET_STATISTICS_API } = API_BOOK.APPLICATION

        let data = {
            ...payload
        }

        let requestPayload = {
            ...GET_STATISTICS_API,
            data: payload,
            cancelToken: cancelToken
        }
        dispatch({ type: AdminActionType.STATISTICS_IS_FETCHING, payload: true })
        let response = await API(requestPayload);

        if (response.status === 200) {
            dispatch({
                type: AdminActionType.GET_STATISTICS,
                payload: response.data.data
            })
        } else {
            toast(response.data.message, 'error')
        }
        dispatch({ type: AdminActionType.STATISTICS_IS_FETCHING, payload: false })
    }
