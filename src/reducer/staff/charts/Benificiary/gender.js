import { getBeneficiaryCharts } from 'service/actionType'

const initialState = {
    "graphData": {
        "graphList": [],
        "masterData": []
    },
    "location": [],
    "meta": {
        "pagination": {
            "limit": 30,
            "page": 1,
            "total_pages": null
        }
    }
}

export default (state = Object.assign({}, initialState), { type, payload }) => {
    switch (type) {
        case getBeneficiaryCharts.UPDATE_BENIFICIARY_CHART_TAB_2:
            return {
                ...payload
            }
        default:
            return state
    }

}