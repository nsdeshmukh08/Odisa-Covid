import { StaffActionType, loaders,common, AdminActionType } from 'service/actionType'
import { SYMR_FORM_MASTER_STATUS,STAFF_ROLE_ID } from 'helpers/variables'

export const getApplicationList = (payload, cancelToken) =>
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

        let { SYMR_APPLICATION_LIST_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...SYMR_APPLICATION_LIST_API,
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
                type: StaffActionType.GET_STAFF_APPLICATION_LIST,
                payload: data
            })
        } 
        else
            toast(response.data.message, 'error')

        dispatch({ type: loaders.IS_FETCHING_APPLICATION_LIST, payload: false })
    }

export const getApplicationDetails = (payload, cancelToken) =>
    async (dispatch, getState, others) => {
        dispatch({
            type: StaffActionType.GET_STAFF_APPLICATION_DETAIL,
            payload
        })
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: false })
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_STATUS, payload: false })
        await getPCApplicationStatus(payload.formId)(dispatch, getState, others)
        getSYMRApplicationDetail(payload.formId)(dispatch, getState, others)
    }

export const getPCApplicationStatus = (formId, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { SYMR_GET_APPLICATION_STATUS_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...SYMR_GET_APPLICATION_STATUS_API,
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

export const getSYMRApplicationDetail = (formId, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { GET_SYMR_FORM_DETAILS } = API_BOOK.APPLICATION

        let requestPayload = {
            ...GET_SYMR_FORM_DETAILS,
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
            SYMR_UPDATE_OPEN_APPLICATION_STATUS_API,
            SYMR_AMOUNT_DISBUSEMENT_API,
            SYMR_UC_DISBURSEMENT_API
        } = API_BOOK.APPLICATION

        let statusAPIMapper = {
            [SYMR_FORM_MASTER_STATUS.OPEN_APPLICATION] : SYMR_UPDATE_OPEN_APPLICATION_STATUS_API,
            [SYMR_FORM_MASTER_STATUS.PENDING] : SYMR_UPDATE_OPEN_APPLICATION_STATUS_API,
            [SYMR_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT]: SYMR_AMOUNT_DISBUSEMENT_API,
            [SYMR_FORM_MASTER_STATUS.SUBMIT_UC]: SYMR_UC_DISBURSEMENT_API
        }

        let {
            selectedApplicationId,
            list,
            selectedApplicationStatus,
            pagination,
            applicationCount
        } = getState().staff.applications

        data['formId'] = selectedApplicationId

        let APIDetail = statusAPIMapper[selectedApplicationStatus.status]

        let applicationTabChangingStatus = [
            SYMR_FORM_MASTER_STATUS.OPEN_APPLICATION,
            SYMR_FORM_MASTER_STATUS.SUBMIT_UC,
            SYMR_FORM_MASTER_STATUS.PENDING
        ]

        let requestPayload = {
            ...APIDetail,
            data,
            cancelToken: cancelToken
        }

        dispatch({ type: loaders.IS_FETCHING_UPDATE_OPEN_APPLICATION, payload: true })

        let response = await API(requestPayload)

        let newList = list

        if (applicationTabChangingStatus.includes(selectedApplicationStatus.status))
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