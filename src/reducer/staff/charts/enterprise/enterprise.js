import { getEnterpiseChart } from 'service/actionType'

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
        case getEnterpiseChart.UPDATE_ENTERPRISE_CHART_TAB_1:
            return {
                ...payload
            }
        default:
            return state
    }

}