import { loaders,profileActionType } from 'service/actionType'

export const updateProfile = (cancelToken) => async (dispatch,getState,{ API_BOOK,toast,API }) => {

    let { VERIFY_TOKEN_API } = API_BOOK.USER_MANAGEMENT.SESSION_API

    let requestPayload = {
        ...VERIFY_TOKEN_API,
        cancelToken
    }
    dispatch({ type : loaders.IS_FETCHING_PROFILE_DETAILS,payload:true })
    let response = await API(requestPayload)
    if(response.status === 200){
        dispatch({
            type : profileActionType.UPDATE_PROFILE_DETAILS,
            payload : response.data.data
        })
    }else
        toast(response.data.message,'error')
    dispatch({ type : loaders.IS_FETCHING_PROFILE_DETAILS,payload:false })
}

export const updateAdminProfile = (cancelToken) => async (dispatch,getState,{ API_BOOK,toast,API }) => {

    let { VERIFY_TOKEN_API } = API_BOOK.ADMIN_MANAGEMENT.SESSION_API

    let requestPayload = {
        ...VERIFY_TOKEN_API,
        cancelToken
    }
    dispatch({ type : loaders.IS_FETCHING_PROFILE_DETAILS,payload:true })
     let response = await API(requestPayload)
    if(response.status === 200){
        dispatch({
            type : profileActionType.UPDATE_PROFILE_DETAILS,
            payload : response.data.data
        })
    }else
        toast(response.data.message,'error')
    dispatch({ type : loaders.IS_FETCHING_PROFILE_DETAILS,payload:false })
}