
import { loaders } from 'service/actionType'
import { history } from 'helpers'

export const getFundsCharts = (data,cancelToken) => async (dispatch,getState,{ API_BOOK,toast,API }) => {

    let { GET_FUND_CHARTS_API } = API_BOOK.APPLICATION

    let { tabNumber,payload } = data
    
    let requestPayload = {
        ...GET_FUND_CHARTS_API,
        data : payload,
        params : {
            tabNumber
        }
    }

    dispatch({ type : loaders.IS_FETCHING_CHART_DATA,payload:true })

    let response = await API(requestPayload)

    if(response.status === 200){
        
        dispatch({
            type : `UPDATE_FUND_CHART_TAB_${tabNumber}`,
            payload : response.data.data
        })
        // history.push(`/staff/dashboard/funds/chartSection/${tabNumber}`)
    }else{
        toast(response.data.message,'error')
    }
    dispatch({ type : loaders.IS_FETCHING_CHART_DATA,payload:false })
}