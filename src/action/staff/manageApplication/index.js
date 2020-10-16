import { StaffActionType, loaders, AdminActionType } from 'service/actionType'
import { PC_FORM_MASTER_STATUS,STAFF_ROLE_ID } from 'helpers/variables'

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



        //LOADER

        dispatch({ type: loaders.IS_FETCHING_APPLICATION_LIST, payload: true })

        let { GET_STAFF_APPLICATION_LIST_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...GET_STAFF_APPLICATION_LIST_API,
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

        } else
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
        getPCApplicationDetail(payload.formId)(dispatch, getState, others)
    }

export const getPCApplicationStatus = (formId, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { GET_PC_APPLICATION_STATUS_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...GET_PC_APPLICATION_STATUS_API,
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

export const getPCApplicationDetail = (formId, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { GET_PC_FORM_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...GET_PC_FORM_API,
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
            UPDATE_OPEN_APPLICATION_API,
            UPDATE_FIRST_TRANCHE_APPROVAL_API,
            UPDATE_SECOND_TRANCHE_APPROVAL_API,
            UPDATE_SECOND_TRANCHE_UC_APPROVAL_API
        } = API_BOOK.APPLICATION

        let statusAPIMapper = {
            2: UPDATE_OPEN_APPLICATION_API,
            3: UPDATE_OPEN_APPLICATION_API,
            4: UPDATE_FIRST_TRANCHE_APPROVAL_API,
            5: UPDATE_SECOND_TRANCHE_APPROVAL_API,
            6: UPDATE_SECOND_TRANCHE_UC_APPROVAL_API
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
            PC_FORM_MASTER_STATUS.OPEN_APPLICATION, 
            PC_FORM_MASTER_STATUS.SECOND_TRANCHE_UC,
            PC_FORM_MASTER_STATUS.PENDING
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