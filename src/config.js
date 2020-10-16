let env = process.env

let config = {
    api : {
        'AUTH_API_BASE_URL' : env.REACT_APP_AUTH_API_BASE_URL,
        'ADMIN_API_BASE_URL' : env.REACT_APP_ADMIN_API_BASE_URL,
        'APP_API_BASE_URL' : env.REACT_APP_APP_API_BASE_URL,
        'REPORT_API_BASE_URL' : env.REACT_APP_APP_REPORT_BASE_URL
    },
    DEFAULT_DATE_FORMAT : 'DD / MM / YYYY'
}

export default config