import { themeActionType } from "service/actionType"

const initialState = {
    languageSelected : 'ENGLISH'
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case themeActionType.UPDATE_LANGUAGE:
            return {
                ...state,
                languageSelected: payload
            }
        default:
            return state
    }

}