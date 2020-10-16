import { FORM_TYPES } from 'helpers/variables'
import { API_BOOK } from 'service/endpoints.js'

let { REPORTS } = API_BOOK

const reports = [
    {
        name: "District-wise Progress",
        service : REPORTS.DISTRICT_WISE_REPORT_API,
        report: [
            {
                reportName: "1-Individual enterprise",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.IE_FORM
                    }
                }
            },
            {
                reportName: "2a-Producer Group",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.PG_FORM
                    }
                }
            },
            {
                reportName: "2b-Enterprise Group",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.EG_FORM
                    }
                }
            },
            {
                reportName: "3-Producer Collective",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.PC_FORM
                    }
                }
            },
            {
                reportName: "4a-Individual Assitence",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.IA_FORM
                    }
                }
            },
            {
                reportName: "4b-Skilled Youth Migrant Worker",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.SYMR_FORM
                    }
                }
            },
        ]
    },
    {
        name: " Block-wise Progress",
        service : REPORTS.BLOCK_WISE_REPORT_API,
        report: [
            {
                reportName: "1-Individual enterprise",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.IE_FORM
                    }
                }
            },
            {
                reportName: "2a-Producer Group",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.PG_FORM
                    }
                }
            },
            {
                reportName: "2b-Enterprise Group",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.EG_FORM
                    }
                }
            },
            {
                reportName: "3-Producer Collective",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.PC_FORM
                    }
                }
            },
            {
                reportName: "4a-Individual Assitence",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.IA_FORM
                    }
                }
            },
            {
                reportName: "4b-Skilled Youth Migrant Worker",
                additionalRequestPayload:{
                    params : {
                        formType : FORM_TYPES.SYMR_FORM
                    }
                }
            },
        ]
    },
    // {
    //     name: "Beneficiary Details",
    //     report: [
    //         {
    //             reportName: "1-Individual enterprise",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "4a-Individual Assitence",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "4b-Skilled Youth Migrant Worker",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //     ]
    // },
    // {
    //     name: "Activity Details",
    //     report: [
    //         {
    //             reportName: "1-Individual enterprise",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "4a-Individual Assitence",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "4b-Skilled Youth Migrant Worker",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //     ]
    // },
    // {
    //     name: "Target Vs Achievement Report",
    //     report: [
    //         {
    //             reportName: "1-Individual enterprise",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "2a-Producer Group",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "2b-Enterprise Group",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "3-Producer Collective",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "4a-Individual Assitence",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "4b-Skilled Youth Migrant Worker",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //     ]
    // },
    // {
    //     name: "World Bank- Weekly Status",
    //     report: [
    //         {
    //             reportName: "1-Individual enterprise",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "2a-Producer Group",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "2b-Enterprise Group",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "3-Producer Collective",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "4a-Individual Assitence",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //         {
    //             reportName: "4b-Skilled Youth Migrant Worker",
    //             downloadCsv: false,
    //             downloadPdf: false,
    //         },
    //     ]
    // },
]

export default reports