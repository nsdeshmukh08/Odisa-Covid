import { StaffActionType, loaders, AdminActionType,common } from 'service/actionType'
import { STAFF_ROLE_ID } from 'helpers/variables'

export const getPgApplicationList = (payload, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { profile } = getState()

        if(profile.role === STAFF_ROLE_ID.DMMU)
            payload['districtId'] = profile?.address?.district?.value
        if(profile.role === STAFF_ROLE_ID.BMMU)
            payload['blockId'] = profile?.address?.block?.value
        if(profile.role === STAFF_ROLE_ID.CLF || profile.role === STAFF_ROLE_ID.GPLF)
            payload['panchayatId'] = profile?.address?.panchayat?.value

        dispatch({ type : common.RESET_APPLICATION_DETAIL})
        //LOADER

        dispatch({ type: loaders.IS_FETCHING_APPLICATION_LIST, payload: true })

        let { GET_PG_STAFF_APPLICATION_LIST_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...GET_PG_STAFF_APPLICATION_LIST_API,
            data: payload,
            cancelToken: cancelToken
        }
        let response = await API(requestPayload)



        if (response.status === 200) {
            let data = {
                list: response.data.data.list,
                pagination: response.data.data.meta.pagination,
                applicationCount: response.data.data.applicationCount
            }
            dispatch({
                type: StaffActionType.GET_PG_BMMU_STAFF_APPLICATION_LIST,
                payload: data
            })

        } else
            toast(response.data.message, 'error')

        dispatch({ type: loaders.IS_FETCHING_APPLICATION_LIST, payload: false })
    }

export const getApplicationDetails = (payload, cancelToken) =>
    // console.log(payload,"payload in action getApplicationDetails")
    async (dispatch, getState, others) => {
    // console.log(payload,"payload in action getApplicationDetails")

        dispatch({
            type: StaffActionType.GET_STAFF_APPLICATION_DETAIL,
            payload
        })
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: false })
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_STATUS, payload: false })
        await getPGApplicationStatus(payload.formId)(dispatch, getState, others)
        getPGApplicationDetail(payload.formId)(dispatch, getState, others)
    }

export const getPGApplicationStatus = (formId, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { GET_PG_STAFF_APPLICATION_STATUS_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...GET_PG_STAFF_APPLICATION_STATUS_API,
            params: {
                formId
            },
            cancelToken: cancelToken
        }

        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_STATUS, payload: true })

        let response = await API(requestPayload)

        if (response.status === 200)
            dispatch({
                type: StaffActionType.GET_PC_APPLICATION_STATUS,
                payload: response.data.data
            })
        else
            toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_STATUS, payload: false })
        return
    }

export const getPGApplicationDetail = (formId, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { GET_PG_FORM_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...GET_PG_FORM_API,
            params: {
                formId
            },
            cancelToken: cancelToken
        }

        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: true })

        let response = await API(requestPayload)

        if (response.status === 200)
            dispatch({
                type: StaffActionType.GET_PC_APPLICATION_DETAIL,
                payload: response.data.data
            })
        else
            toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: false })
    }

export const updateOpenApplicationStatus = (data, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {
 
        let {
            selectedApplicationId,
            list,
            selectedApplicationStatus,
            pagination,
            applicationCount
        } = getState().staff.applications
        let { UPDATE_BMMU_OPEN_APPLICATION_API } = API_BOOK.APPLICATION

        data['formId'] = selectedApplicationId

        let requestPayload = {
            ...UPDATE_BMMU_OPEN_APPLICATION_API,
            data,
            cancelToken: cancelToken
        }

        // console.log(requestPayload,"requestPayload in actions")

        dispatch({ type: loaders.IS_FETCHING_UPDATE_OPEN_APPLICATION, payload: true })

        let response = await API(requestPayload)

        let newList = list

        newList = list.filter(data => data.formId !== selectedApplicationId)

        if (response.status === 200) {

            dispatch({ type: AdminActionType.TOGGLE_STAFF_DETAILS, payload: false })

            toast(response.data.message, 'success')

            let payload = {
                list: newList,
                pagination,
                applicationCount
            }

            dispatch({
                type: StaffActionType.GET_STAFF_APPLICATION_LIST,
                payload: payload
            })
        }
        else
            toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_FETCHING_UPDATE_OPEN_APPLICATION, payload: false })
        
}

export const updateDMMUOpenApplicationStatus = (data, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {
 
        let {
            selectedApplicationId,
            list,
            selectedApplicationStatus,
            pagination,
            applicationCount
        } = getState().staff.applications
        let { UPDATE_DMMU_OPEN_APPLICATION_API } = API_BOOK.APPLICATION

        data['formId'] = selectedApplicationId

        let requestPayload = {
            ...UPDATE_DMMU_OPEN_APPLICATION_API,
            data,
            cancelToken: cancelToken
        }

        dispatch({ type: loaders.IS_FETCHING_UPDATE_OPEN_APPLICATION, payload: true })

        let response = await API(requestPayload)

        let newList = list

        newList = list.filter(data => data.formId !== selectedApplicationId)

        if (response.status === 200) {

            dispatch({ type: AdminActionType.TOGGLE_STAFF_DETAILS, payload: false })

            toast(response.data.message, 'success')

            let payload = {
                list: newList,
                pagination,
                applicationCount
            }

            dispatch({
                type: StaffActionType.GET_STAFF_APPLICATION_LIST,
                payload: payload
            })
        }
        else
            toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_FETCHING_UPDATE_OPEN_APPLICATION, payload: false })
    }
    
    export const updatePgAmountDisbursment = (data, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { UPDATE_PG_AMOUNT_DISBURSMENT_API } = API_BOOK.APPLICATION
        let {
            selectedApplicationId,
            list,
            selectedApplicationStatus,
            pagination,
            applicationCount
        } = getState().staff.applications

        data['formId'] = selectedApplicationId;
        let requestPayload = {
            ...UPDATE_PG_AMOUNT_DISBURSMENT_API,
            data,
            cancelToken: cancelToken
        }

        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: true })

        let response = await API(requestPayload)

        let newList = list

        newList = list.filter(data => data.formId !== selectedApplicationId)

        if (response.status === 200) {

            dispatch({ type: AdminActionType.TOGGLE_STAFF_DETAILS, payload: false })

            toast(response.data.message, 'success')

        }
        else
            toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: false })
    }

    export const updatePgUcDisbursment = (data, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { UPDATE_PG_DISBURSMENT_UC_API } = API_BOOK.APPLICATION
        let {
            selectedApplicationId,
            list,
            selectedApplicationStatus,
            pagination,
            applicationCount
        } = getState().staff.applications

        data['formId'] = selectedApplicationId;
        let requestPayload = {
            ...UPDATE_PG_DISBURSMENT_UC_API,
            data,
            cancelToken: cancelToken
        }
        // console.log(requestPayload,"requestPayload for on amount approve")
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: true })

        let response = await API(requestPayload)

        let newList = list

        newList = list.filter(data => data.formId !== selectedApplicationId)

        if (response.status === 200) {

            dispatch({ type: AdminActionType.TOGGLE_STAFF_DETAILS, payload: false })

            toast(response.data.message, 'success')

            let payload = {
                list: newList,
                pagination,
                applicationCount
            }

            dispatch({
                type: StaffActionType.GET_STAFF_APPLICATION_LIST,
                payload: payload
            })
        }
        else
            toast(response.data.message, 'error')
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: false })
    }