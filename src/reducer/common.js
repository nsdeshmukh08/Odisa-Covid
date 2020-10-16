import { common } from 'service/actionType'

const initialState = {
    applicatonStagesCompletedList : [],
    symrMasterData:{},
    pcMasterData :{},
    iaMasterData: {},
    ieMasterData: {},
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case common.UPDATE_APPLICATION_STAGES:
            return {
                ...state,
                applicatonStagesCompletedList : [...payload]
            }
            case common.UPDATE_SYMR_MASTER_DATA:
            return {
                ...state,
                symrMasterData : payload
            }
            case common.UPDATE_PC_MASTER_DATA:
            return {
                ...state,
                pcMasterData : payload
            }
            case common.UPDATE_IA_MASTER_DATA:
            return {
                ...state,
                iaMasterData : payload
            }
            case common.UPDATE_IE_MASTER_DATA:
            return {
                ...state,
                ieMasterData : payload
            }
            case common.APPLICATION_FORM_RESET:
            return {
                ...state,
                applicatonStagesCompletedList : []
            }
        default:
            return state
    }

}