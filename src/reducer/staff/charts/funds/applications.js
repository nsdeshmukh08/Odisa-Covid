import { getFundChart } from 'service/actionType'

const initialState = {
    "graphData": {
        "data": [],
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
        case getFundChart.UPDATE_FUND_CHART_TAB_2:
            return {
                ...payload
            }
        default:
            return state
    }
}