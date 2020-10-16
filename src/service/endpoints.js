let endpoints = {
	LOGIN : '/auth/login',
	REGISTER : '/auth/registerUser',
	SEND_OTP : '/auth/getOTP',
	REGISTER_SEND_OTP : '/auth/checkUser',
	VALIDATE_OTP : '/auth/validateOTP',
	FORGOT_PASSWORD : '/auth/forgotpassword',
	CHANGE_PASSWORD : '/auth/changePassword',
	//ADMIN
	STAFF_LOGIN : '/auth/staffLogin',
	FORGOT_USER_NAME : '/admin/forgotUserName',
	FORGOT_STAFF_PASSWORD : '/admin/forgotUserPassword',
	STAFF_CHANGE_PASSWORD : '/admin/changeStaffPassword',
	GET_STAFF_LIST : '/admin/getStaffList',
	// DASHBOARD_STATISTICS: '/application/dashboard/statistics',
	ACTIVATE_OR_DEACTIVE_STAFF : '/admin/activeOrDeactiveStaff',
	UPDATE_STAFF : '/admin/updateStaff',
	GET_DISTRICT_LIST : '/admin/getDistrictList',
	GET_BLOCK_LIST : '/admin/getBlockList',
	GET_PANCHAYAT_LIST : '/admin/getPanchayatList',
	CREATE_STAFF : '/admin/createStaff',

	//application
	GENERATE_FORM_ID : '/application/pcFormCreate',
	GENERATE_PG_FORM_ID : '/application/pgFormCreate',
	GENERATE_EG_FORM_ID : '/application/egFormCreate',
	EG_FORM_FILL : '/application/egFormFill',
	GET_EG_FORM : '/application/getEgForm',
	SUBMIT_EG_FORM : '/application/submitEgForm',
	GET_APPLICATION_LIST : '/application/getUserApplications',
	PC_FORM_FILL : '/application/pcFormFill',
	PG_FORM_FILL : '/application/pgFormFill',
	GET_PC_DETAILS_OPTIONS : '/application/getPCMasters',
	UPLOAD_DOC : '/application/uploadDoc',
	GET_PC_FORM : '/application/getPcForm',
	GET_PG_FORM : '/application/getPgForm',
	SUBMIT_FORM : '/application/submitPcForm',
	SUBMIT_PG_FORM : '/application/submitPgForm',
	GET_ACTIVITY_TYPES: "/application/getActivityTypes",
	GET_SECTOR_TYPES: "/application/getSectorTypes",
	GET_COMMODITY_TYPES: "/application/getCommodityTypes",

	// IE
	GENERATE_IE_FORM_ID: "/application/ieFormCreate",
	IE_FORM_FILL : '/application/ieFormFill',
	GET_IE_FORM: "/application/getIeForm",
	SUBMIT_IE_FORM: "/application/submitIeForm",
	GET_IE_DETAILS_OPTIONS:"/application/getIeMasters",


	// IA
	GENERATE_IA_FORM_ID: "/application/iaFormCreate",
	IA_FORM_FILL : '/application/iaFormFill',
	GET_IA_FORM: "/application/getIaForm",
	SUBMIT_IA_FORM: "/application/submitIaForm",
	GET_IA_DETAILS_OPTIONS:"/application/getIaMasters",

	//
	//INTERNAL PC APPLICATION
	GET_PC_APPLICATION_STATUS : '/application/getPcApplicationStatus',
	GET_STAFF_APPLICATION_LIST : '/application/getPcApplication',
	UPDATE_OPEN_APPLICATION_STATUS : '/application/updateOpenApplication',
	UPDATE_FIRST_TRANCHE_APPROVAL : '/application/updateFirstTranche',
	UPDATE_SECOND_TRANCHE_APPROVAL : '/application/updateSecondTranche',
	UPDATE_SECOND_TRACHE_UC_APPROVAL : '/application/updateSecondTrancheUc',
	START_ASSESSMENT_AND_GET_OPTIONS : '/application/startAssesment',
	SUBMIT_ASSESSMENT : '/application/submitAssesment',
	GET_ASSEMENT_DETAILS : '/application/getAssesment',
	SUBMIT_PC_SERVICE : '/application/pcServiceArea',
	GET_PC_SERVICE : '/application/getPcServiceArea',
	SUBMIT_PC_COVERAGE : '/application/pcCoverageArea',
	GET_PC_COVERAGE : '/application/getPcCoverageArea',

	// INTERNAL PG APPLICATION
	GET_PG_APPLICATION_STATUS : '/application/getPGApplicationStatus',
	GET_PG_APPLICATION_LIST : '/application/getPgApplication',
	// START_PG_ASSESSMENT_AND_GET_OPTIONS : '/application/startPgAssesment',
	// GET_PG_ASSESSMENT_DETAILS: '/application/getPgAssesment',
	SUBMIT_PG_ASSESSMENT : '/application/submitPgAssesment',
	UPDATE_PG_DISBURSMENT_UC : "/application/updateDisbursmentUc",
	UPDATE_PG_AMOUNT_DISBURSMENT : "/application/updateAmountDisbursment",
	UPDATE_DMMU_OPEN_APPLICATION : "/application/updateDmpuOpenApplication",
	UPDATE_BMMU_OPEN_APPLICATION : "/application/updateBmpuOpenApplication",


	//INTERNAL SYMR APPLICATION
	GET_SYMR_APPLICATION_STATUS : '/application/getSymrApplicationStatus',
	GET_SYMR_APPLICATION_LIST : '/application/getSymrApplication',
	SYMR_UPDATE_OPEN_APPLICATION_STATUS : '/application/symrUpdateOpenApplication',
	SYMR_AMOUNT_DISBURSMENT : '/application/updateSymrAmountDisbursment',
	SYMR_UC_DISBURSEMENT : '/application/updateSymrDisbursmentUc',
	SYMR_START_ASSESSMENT_AND_GET_OPTIONS : '/application/startSymrAssesment',
	SYMR_GET_ASSESSMENT_DETAILS : '/application/getSymrAssesment',
	SYMR_SUBMIT_ASSESSMENT : '/application/submitSymrAssesment',

	//INTERNAL Enterprise APPLICATION
	GET_EG_APPLICATION_STATUS : '/application/getEgApplicationStatus',
	GET_EG_APPLICATION_LIST : '/application/getEgApplication',
	EG_UPDATE_BMPU_OPEN_APPLICATION_STATUS : '/application/updateEgBmpuOpenApplication',
	EG_UPDATE_DMPU_OPEN_APPLICATION_STATUS : '/application/updateEgDmpuOpenApplication',
	EG_AMOUNT_DISBURSMENT : '/application/updateEgAmountDisbursment',
	EG_UC_DISBURSEMENT : '/application/updateEgDisbursmentUc',
	EG_START_ASSESSMENT_AND_GET_OPTIONS : '/application/startEgAssesment',
	SUBMIT_EG_ASSESSMENT : '/application/submitEgAssesment',
	GET_ASSEMENT_EG__DETAILS : '/application/getEgAssesment',
	
	//CHARTS
	GET_FUND_CHARTS : '/dashboard/dashboardFunds',
	GET_ENTERPRISE_CHARTS : '/dashboard/dashboardEnterprises',
	GET_BENIFICIARY_CHARTS : '/dashboard/dashboardBeneficiary',
	GET_APPLICATION_CHARTS : '/dashboard/application',

	//common
	VERIFY_TOKEN : '/auth/verifyToken',
	VERIFY_STAFF_TOKEN : '/admin/getProfile',
	GET_SYMR_FORM_ID:'/application/symrFormCreate',
	GET_SYMR_FORM_DETAILS:'/application/getSymrForm',
	UPDATE_SYMR_FORM_DETAILS:'/application/symrFormFill',
	GET_SYMR_FORM_MASTER_DATA:'/application/getSymrMasters',
	GET_SYMR_FORM_SUBMIT:'/application/submitSymrForm',

	//Reports
	DISTRICT_WISE_REPORT : '/districtWiseReport',
	BLOCK_WISE_REPORT : '/blockWiseReport'
}

export let API_BOOK = {
	USER_MANAGEMENT : {
		SESSION_API : {
			LOGIN : {
				url : endpoints.LOGIN,
				method : 'POST',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			REGISTER : {
				url : endpoints.REGISTER,
				method : 'POST',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			REGISTER_SEND_OTP : {
				url : endpoints.REGISTER_SEND_OTP,
				method : 'GET',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {
					mobile : ''
				},
				set query(params){
					this.params.mobile=params.mobile
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			SEND_OTP : {
				url : endpoints.SEND_OTP,
				method : 'GET',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {
					mobile : ''
				},
				set query(params){
					this.params.mobile=params.mobile
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			VALIDATE_OTP : {
				url : endpoints.VALIDATE_OTP,
				method : 'GET',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {
					mobile : '123123123',
					otp : ''
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			CHANGE_PASSWORD : {
				url : endpoints.CHANGE_PASSWORD,
				method : 'POST',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			FORGOT_PASSWORD : {
				url : endpoints.FORGOT_PASSWORD,
				method : 'POST',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			VERIFY_TOKEN_API : {
				url : endpoints.VERIFY_TOKEN,
				method : 'GET',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {},
				baseUrlType : 'AUTH_API_BASE_URL'
			}
		}
	},
	APPLICATION : {
		EG_APPLICATION_LIST_API : {
			url : endpoints.GET_EG_APPLICATION_LIST,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}	
		},
		EG_GET_APPLICATION_STATUS_API : {
			url : endpoints.GET_EG_APPLICATION_STATUS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		
		EG_UPDATE_BMPU_OPEN_APPLICATION_STATUS_API : {
			url : endpoints.EG_UPDATE_BMPU_OPEN_APPLICATION_STATUS,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		EG_UPDATE_DMPU_OPEN_APPLICATION_STATUS_API : {
			url : endpoints.EG_UPDATE_DMPU_OPEN_APPLICATION_STATUS,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		EG_AMOUNT_DISBURSMENT_API : {
			url : endpoints.EG_AMOUNT_DISBURSMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		EG_UC_DISBURSEMENT_API : {
			url : endpoints.EG_UC_DISBURSEMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		START_EG_ASSESSMENT_AND_GET_OPTIONS_API : {
			url : endpoints.EG_START_ASSESSMENT_AND_GET_OPTIONS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_EG_ASSESSMENT_DETAILS_API : {
			url : endpoints.GET_ASSEMENT_EG__DETAILS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_EG_ASSESSMENT_API : {
			url : endpoints.SUBMIT_EG_ASSESSMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		//SYMR INTERNAL API
		SYMR_APPLICATION_LIST_API : {
			url : endpoints.GET_SYMR_APPLICATION_LIST,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}	
		},
		SYMR_GET_APPLICATION_STATUS_API : {
			url : endpoints.GET_SYMR_APPLICATION_STATUS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SYMR_UPDATE_OPEN_APPLICATION_STATUS_API : {
			url : endpoints.SYMR_UPDATE_OPEN_APPLICATION_STATUS,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SYMR_AMOUNT_DISBUSEMENT_API : {
			url : endpoints.SYMR_AMOUNT_DISBURSMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SYMR_UC_DISBURSEMENT_API : {
			url : endpoints.SYMR_UC_DISBURSEMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SYMR_START_ASSESSMENT_API : {
			url : endpoints.SYMR_START_ASSESSMENT_AND_GET_OPTIONS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SYMR_GET_ASSESSMENT_DETAIL_API : {
			url : endpoints.SYMR_GET_ASSESSMENT_DETAILS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SYMR_SUBMIT_ASSESSMENT_API : {
			url : endpoints.SYMR_SUBMIT_ASSESSMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		//SYMR END
		GET_PC_SERVICE_API : {
			url : endpoints.GET_PC_SERVICE,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_PC_SERVICE_API : {
			url : endpoints.SUBMIT_PC_SERVICE,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_PC_COVERAGE_API : {
			url : endpoints.GET_PC_COVERAGE,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_PC_COVERAGE_API : {
			url : endpoints.SUBMIT_PC_COVERAGE,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GENERATE_FORM_ID_API : {
			url : endpoints.GENERATE_FORM_ID,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GENERATE_PG_FORM_ID_API : {
			url : endpoints.GENERATE_PG_FORM_ID,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GENERATE_IE_FORM_ID_API : {
			url : endpoints.GENERATE_IE_FORM_ID,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_IE_DETAILS_OPTIONS_API : {
			url : endpoints.GET_IE_DETAILS_OPTIONS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		IE_FORM_FILL_API : {
			url : endpoints.IE_FORM_FILL,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GENERATE_IA_FORM_ID_API : {
			url : endpoints.GENERATE_IA_FORM_ID,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		IA_FORM_FILL_API : {
			url : endpoints.IA_FORM_FILL,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_IA_FORM_API : {
			url : endpoints.GET_IA_FORM,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_IE_FORM_API : {
			url : endpoints.GET_IE_FORM,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_IA_FORM_API : {
			url : endpoints.SUBMIT_IA_FORM,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_IA_DETAILS_OPTIONS_API : {
			url : endpoints.GET_IA_DETAILS_OPTIONS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_STAFF_APPLICATION_LIST_API : {
			url : endpoints.GET_STAFF_APPLICATION_LIST,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_PG_STAFF_APPLICATION_LIST_API : {
			url : endpoints.GET_PG_APPLICATION_LIST,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_PG_STAFF_APPLICATION_STATUS_API : {
			url : endpoints.GET_PG_APPLICATION_STATUS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		UPDATE_DMMU_OPEN_APPLICATION_API : {
			url : endpoints.UPDATE_DMMU_OPEN_APPLICATION,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		UPDATE_BMMU_OPEN_APPLICATION_API : {
			url : endpoints.UPDATE_BMMU_OPEN_APPLICATION,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		UPDATE_PG_AMOUNT_DISBURSMENT_API : {
			url : endpoints.UPDATE_PG_AMOUNT_DISBURSMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		UPDATE_PG_DISBURSMENT_UC_API : {
			url : endpoints.UPDATE_PG_DISBURSMENT_UC,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_APPLICATION_LIST_API : {
			url : endpoints.GET_APPLICATION_LIST,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		START_ASSEMENT_AND_GET_OPTIONS_API : {
			url : endpoints.START_ASSESSMENT_AND_GET_OPTIONS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		START_PG_ASSESSMENT_AND_GET_OPTIONS_API : {
			url : endpoints.START_PG_ASSESSMENT_AND_GET_OPTIONS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_PG_ASSESSMENT_DETAILS_API : {
			url : endpoints.GET_PG_ASSESSMENT_DETAILS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_PG_ASSESSMENT_API : {
			url : endpoints.SUBMIT_PG_ASSESSMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_ASSEMENT_DETAILS_API : {
			url : endpoints.GET_ASSEMENT_DETAILS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_ASSESSMENT_API : {
			url : endpoints.SUBMIT_ASSESSMENT,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_PC_APPLICATION_STATUS_API : {
			url : endpoints.GET_PC_APPLICATION_STATUS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_FORM_API : {
			url : endpoints.SUBMIT_FORM,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_EG_FORM_API : {
			url : endpoints.SUBMIT_EG_FORM,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		SUBMIT_PG_FORM_API : {
			url : endpoints.SUBMIT_PG_FORM,
			method : 'POST',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GENERATE_EG_FORM_ID_API : {
			url : endpoints.GENERATE_EG_FORM_ID,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_EG_FORM_API : {
			url : endpoints.GET_EG_FORM,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		EG_FORM_FILL_API : {
			url : endpoints.EG_FORM_FILL,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_PC_DETALS_OPTIONS_API : {
			url : endpoints.GET_PC_DETAILS_OPTIONS,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_PC_FORM_API : {
			url : endpoints.GET_PC_FORM,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		GET_PG_FORM_API : {
			url : endpoints.GET_PG_FORM,
			method : 'GET',
			baseUrlType : 'APP_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		},
		PC_FORM_FILL_API : {
			url : endpoints.PC_FORM_FILL,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		PG_FORM_FILL_API : {
			url : endpoints.PG_FORM_FILL,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		UPDATE_OPEN_APPLICATION_API : {
			url : endpoints.UPDATE_OPEN_APPLICATION_STATUS,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		UPDATE_FIRST_TRANCHE_APPROVAL_API : {
			url : endpoints.UPDATE_FIRST_TRANCHE_APPROVAL,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		UPDATE_SECOND_TRANCHE_APPROVAL_API : {
			url : endpoints.UPDATE_SECOND_TRANCHE_APPROVAL,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		UPDATE_SECOND_TRANCHE_UC_APPROVAL_API : {
			url : endpoints.UPDATE_SECOND_TRACHE_UC_APPROVAL,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		UPLOAD_DOC_API : {
			url : endpoints.UPLOAD_DOC,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_SYMR_FORM_ID:{
			url : endpoints.GET_SYMR_FORM_ID,
			method: 'GET',
			data: null,
			headers: {
				authorization: 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params: {},
			baseUrlType: 'APP_API_BASE_URL'
		},
		GET_PRODUCER_GROUP_TYPES: {
			url : endpoints.GET_ACTIVITY_TYPES,
			method : 'GET',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_SYMR_FORM_DETAILS:{
			url : endpoints.GET_SYMR_FORM_DETAILS,
			method : 'GET',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		UPDATE_SYMR_FORM_DETAILS:{
			url : endpoints.UPDATE_SYMR_FORM_DETAILS,
			method: 'POST',
			data: null,
			headers: {
				authorization: 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params: {},
			baseUrlType: 'APP_API_BASE_URL'
		},
		GET_SYMR_FORM_SUBMIT:{
			url : endpoints.GET_SYMR_FORM_SUBMIT,
			method: 'POST',
			data: null,
			headers: {
				authorization: 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params: {},
			baseUrlType: 'APP_API_BASE_URL'
		},
		SECTOR_TYPES: {
			url : endpoints.GET_SECTOR_TYPES,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_SYMR_FORM_MASTER_DATA:{
			url : endpoints.GET_SYMR_FORM_MASTER_DATA,
			method : 'GET',
			data: null,
			headers: {
				authorization: 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params: {},
			baseUrlType: 'APP_API_BASE_URL'
		},
		COMMODITY_TYPES:{
			url : endpoints.GET_COMMODITY_TYPES,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_STATISTICS_API : {
			url : endpoints.DASHBOARD_STATISTICS,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_FUND_CHARTS_API : {
			url : endpoints.GET_FUND_CHARTS,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {
				tabNumber : 1
			},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_ENTERPRISE_CHARTS_API : {
			url : endpoints.GET_ENTERPRISE_CHARTS,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {
				tabNumber : 1
			},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_BENIFICIARY_CHARTS_API : {
			url : endpoints.GET_BENIFICIARY_CHARTS,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {
				tabNumber : 1
			},
			baseUrlType : 'APP_API_BASE_URL'
		},
		GET_APPLICATION_CHARTS_API : {
			url : endpoints.GET_APPLICATION_CHARTS,
			method : 'POST',
			data : null,
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			},
			params : {
				tabNumber : 1
			},
			baseUrlType : 'APP_API_BASE_URL'
		},
		
	},
	ADMIN_MANAGEMENT : {
		SESSION_API : {
			VERIFY_TOKEN_API : {
				url : endpoints.VERIFY_STAFF_TOKEN,
				method : 'GET',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {},
				baseUrlType : 'ADMIN_API_BASE_URL'
			},
			STAFF_LOGIN_API : {
				url : endpoints.STAFF_LOGIN,
				method : 'POST',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			FORGOT_USER_NAME_API : {
				url : endpoints.FORGOT_USER_NAME,
				method : 'GET',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			STAFF_FORGOT_PASSWORD : {
				url : endpoints.FORGOT_STAFF_PASSWORD,
				method : 'GET',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			CHANGE_STAFF_PASSWORD_API : {
				url : endpoints.STAFF_CHANGE_PASSWORD,
				method : 'POST',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {},
				baseUrlType : 'AUTH_API_BASE_URL'
			}
		},
		CORE_API : {
			GET_STAFF_LIST_API : {
				url : endpoints.GET_STAFF_LIST,
				method : 'POST',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {},
				baseUrlType : 'ADMIN_API_BASE_URL'
			},
			ACTIVATE_OR_DEACTIVE_STAFF : {
				url : endpoints.ACTIVATE_OR_DEACTIVE_STAFF,
				method : 'GET',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			UPDATE_STAFF_API : {
				url : endpoints.UPDATE_STAFF,
				method : 'GET',
				data : null,
				params:{},
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'AUTH_API_BASE_URL'
			},
			GET_DISTRICT_LIST_API : {
				url : endpoints.GET_DISTRICT_LIST,
				method : 'GET',
				data : null,
				params:{},
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'ADMIN_API_BASE_URL'
			},
			GET_BLOCK_LIST_API : {
				url : endpoints.GET_BLOCK_LIST,
				method : 'GET',
				data : null,
				params:{},
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'ADMIN_API_BASE_URL'
			},
			GET_PANCHAYAT_LIST_API : {
				url : endpoints.GET_PANCHAYAT_LIST,
				method : 'GET',
				data : null,
				params:{},
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				baseUrlType : 'ADMIN_API_BASE_URL'
			},
			CREATE_STAFF_API : {
				url : endpoints.CREATE_STAFF,
				method : 'POST',
				data : null,
				headers : {
					authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
				},
				params : {},
				baseUrlType : 'AUTH_API_BASE_URL'
			}
		}
	},
	REPORTS : {
		DISTRICT_WISE_REPORT_API : {
			url : endpoints.DISTRICT_WISE_REPORT,
			method : 'GET',
			baseUrlType : 'REPORT_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}	
		},
		BLOCK_WISE_REPORT_API : {
			url : endpoints.BLOCK_WISE_REPORT,
			method : 'GET',
			baseUrlType : 'REPORT_API_BASE_URL',
			headers : {
				authorization : 'Bearer 106e8c34d8d7cf03bef7ef69678fAC03'
			}
		}
	}
}
