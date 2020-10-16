import { createApplication,common } from 'service/actionType'

const initialState = []

export default (state = [...initialState], { type, payload }) => {
    switch (type) {
        case createApplication.UPDATE_PRODUCER_COLLECTIVE_FORM_STAGE_6:
            return [...payload]
        case common.APPLICATION_FORM_RESET:
            return [...initialState]
        default:
            return state
    }

}