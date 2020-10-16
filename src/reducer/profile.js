const { profileActionType, common } = require('service/actionType')
const initialState = {
    "userId": null,
    "role": localStorage.getItem("role"),
    "userName": null,
    "mobileNumber": null,
    "emailId": null,
    address : null
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case profileActionType.UPDATE_PROFILE_DETAILS:
            console.log(payload,"payload")
            return {
                ...initialState,
                ...payload
            }
        case common.RESET_STAFF_DETAILS:
            return {
                ...initialState
            }
        default:
            return state
    }

}