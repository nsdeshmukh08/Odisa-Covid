import { getApplicationCharts } from 'service/actionType'

const initialState = {
    "graphData": {
        "data": [],
        "totalTarget": null,
        "totalAchieved": null
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
        case getApplicationCharts.UPDATE_APPLICATION_CHART_TAB_1:
            return {
                ...payload
            }
        default:
            return state
    }

}