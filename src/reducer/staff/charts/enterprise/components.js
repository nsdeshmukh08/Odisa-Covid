import { getEnterpiseChart } from 'service/actionType'

const initialState = {
    "graphData": {
        "data": [],
        "masterList": [],
        "totalTarget": null,
        "totalAchieved": null
    },
    "forms": [],
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
        case getEnterpiseChart.UPDATE_ENTERPRISE_CHART_TAB_5:
            return {
                ...payload
            }
        default:
            return state
    }

}