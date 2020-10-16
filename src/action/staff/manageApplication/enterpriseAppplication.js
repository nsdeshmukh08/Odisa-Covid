import { StaffActionType, loaders, AdminActionType } from 'service/actionType'
import { EG_FORM_MASTER_STATUS, STAFF_ROLE_ID } from 'helpers/variables'
export const getApplicationList = (payload, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { profile, staff } = getState()

        if(profile.role === STAFF_ROLE_ID.DMMU)
            payload['districtId'] = profile?.address?.district?.value

        if(profile.role === STAFF_ROLE_ID.BMMU)
            payload['blockId'] = profile?.address?.block?.value
            
        if(profile.role === STAFF_ROLE_ID.CLF || profile.role === STAFF_ROLE_ID.GPLF)
            payload['panchayatId'] = profile?.address?.panchayat?.value

        //LOADER

        dispatch({ type: loaders.IS_FETCHING_APPLICATION_LIST, payload: true })

        let { EG_APPLICATION_LIST_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...EG_APPLICATION_LIST_API,
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

        } else {
            let data = {
                list: [],
                pagination: {
                    page: 0,
                    total_pages: 0,
                    count: 0
                },
                applicationCount: {
                    approvedApplication: 0,
                    rejectedApplication: 0,
                    totalApplication: 0

                }
            }
            dispatch({
                type: StaffActionType.GET_STAFF_APPLICATION_LIST,
                payload: data
            })
            toast(response.data.message, 'error')
        }


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
        await getEGApplicationStatus(payload.formId)(dispatch, getState, others)
        getEGApplicationDetail(payload.formId)(dispatch, getState, others)
    }

export const getEGApplicationStatus = (formId, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {
        let { EG_GET_APPLICATION_STATUS_API } = API_BOOK.APPLICATION
        let requestPayload = {
            ...EG_GET_APPLICATION_STATUS_API,
            params: {
                formId
            },
            cancelToken: cancelToken
        }
        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_STATUS, payload: true })

        let response = await API(requestPayload)
        // console.log(response)
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

export const getEGApplicationDetail = (formId, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {

        let { GET_EG_FORM_API } = API_BOOK.APPLICATION

        let requestPayload = {
            ...GET_EG_FORM_API,
            params: {
                formId
            },
            cancelToken: cancelToken
        }

        dispatch({ type: loaders.IS_FETCHING_PC_APPLICATION_DETAIL, payload: true })

        let response = await API(requestPayload)
        // console.log("106",response)
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
            EG_UPDATE_BMPU_OPEN_APPLICATION_STATUS_API,
        } = API_BOOK.APPLICATION

        let statusAPIMapper = {
            [EG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION]: EG_UPDATE_BMPU_OPEN_APPLICATION_STATUS_API,
            [EG_FORM_MASTER_STATUS.DECLINED]: EG_UPDATE_BMPU_OPEN_APPLICATION_STATUS_API
        }

        let {
            selectedApplicationId,
            list,
            selectedApplicationStatus,
            pagination,
            applicationCount
        } = getState().staff.applications
        data['formId'] = selectedApplicationId

        let APIDetail = statusAPIMapper[data.applicationStatus]


        let requestPayload = {
            ...APIDetail,
            data,
            cancelToken: cancelToken
        }
        // console.log(requestPayload)
        dispatch({ type: loaders.IS_FETCHING_UPDATE_OPEN_APPLICATION, payload: true })
        let response = await API(requestPayload)
        // console.log(response)
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

export const updateDmpuOpenApplicationStatus = (data, cancelToken) =>
    async (dispatch, getState, {
        API,
        API_BOOK,
        toast
    }) => {
        // console.log(data)
        let {
            EG_UPDATE_DMPU_OPEN_APPLICATION_STATUS_API,
            EG_AMOUNT_DISBURSMENT_API,
            EG_UC_DISBURSEMENT_API
        } = API_BOOK.APPLICATION

        let statusAPIMapper = {
            [EG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION]: EG_UPDATE_DMPU_OPEN_APPLICATION_STATUS_API,
            [EG_FORM_MASTER_STATUS.PENDING]: EG_UPDATE_DMPU_OPEN_APPLICATION_STATUS_API,
            [EG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT]: EG_AMOUNT_DISBURSMENT_API,
            [EG_FORM_MASTER_STATUS.SUBMIT_UC]: EG_UC_DISBURSEMENT_API
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
            EG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION,
            EG_FORM_MASTER_STATUS.SUBMIT_UC,
            EG_FORM_MASTER_STATUS.PENDING
        ]

        let requestPayload = {
            ...APIDetail,
            data,
            cancelToken: cancelToken
        }
        // console.log(APIDetail)
        // console.log(data, "in actions ------------ EG", "requestPayload",requestPayload)
        dispatch({ type: loaders.IS_FETCHING_UPDATE_OPEN_APPLICATION, payload: true })
        
        console.log(requestPayload,"requestPayload")

        let response = await API(requestPayload)
        // console.log(response)
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