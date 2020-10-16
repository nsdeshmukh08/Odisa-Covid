import moment from 'moment'
import config from 'config'

export const calculateAge = (value = '') => {
    let date = moment(value)
    let ageText = ''
    let months = null
    let days = null
    let years = moment().diff(date, 'years');
    let calculatedYear = date.add(years, 'Y')
    months = moment().diff(moment(calculatedYear), 'months')
    if (months === 0)
        days = moment().diff(moment(calculatedYear), 'days')
    ageText = `${years ? years + ' Years ' : ''}${months ? months + ' Months' : ''}${days ? days + ' Days' : ''}`
    return ageText
}

export const formatDate = (value) => {
    return moment(value).format(config.DEFAULT_DATE_FORMAT)
}

export const getFutureDate = (currentDate, startingDate) => {
    // startingDate = "2020-09-20T12:57:50.000Z"
    // console.log(currentDate,startingDate,"in helpers");
        return moment(currentDate, config.DEFAULT_DATE_FORMAT)
        .isAfter(
            moment(startingDate).subtract(1, 'days'),
            config.DEFAULT_DATE_FORMAT
        )
}

export const calcAgeInYear = (value,returnOnlyValue=false) => {
    let age = moment().diff(value, 'years')
    if (age)
        return returnOnlyValue ? age : 'Age '+ age
    return returnOnlyValue ? age : 'Age 0'
}
