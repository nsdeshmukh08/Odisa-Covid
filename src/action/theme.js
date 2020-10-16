import { themeActionType } from "service/actionType"

//THEME
export const updateLanguage = (language="ENGLISH") => (dispatch, getState, { api }) => {

    return new Promise((resolve, reject) => {

        dispatch({ type: themeActionType.UPDATE_LANGUAGE, payload: language })


    })
}