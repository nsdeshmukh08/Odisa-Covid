import { common } from 'service/actionType'

//Loaders
export const IsCreateAppLoader = (payload) => (dispatch) => {

    dispatch({ type: common.IS_CREATE_APP_FETCHING,payload })
}