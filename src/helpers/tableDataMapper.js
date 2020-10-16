import React from 'react';
import moment from 'moment'
import { STAFF_ROLES, FORM_MASTER_STATUS, PG_EG_MASTER_STATUS } from './variables'
import { formatDate } from 'helpers/momentHelpers'
import { formatToINR, moneyFormatBySymbolExact, getPercentage } from 'helpers'

let applicationDetail = {
  1: {
    type: 'PC',
    applicationName: 'Producer Collective',
    forms: {
      basicDetails: 'basicDetails',
      details: 'pcDetails'
    },
    enterpriseName: "pcName"
  },
  2: {
    type: 'PG',
    applicationName: 'Producer Group',
    forms: {
      basicDetails: 'basicDetails',
      details: "pgDetails"
    },
    enterpriseName: "pgName"
  },
  3: {
    type: 'EG',
    applicationName: 'Enterprise Group',
    forms: {
      basicDetails: 'basicDetails'
    },
    enterpriseName: "egName"
  },
  4: {
    type: 'SYMR',
    applicationName: 'Youth Migrant',
    forms: {
      basicDetails: 'basicDetails'
    },
    enterpriseName: "fatherName"
  }
}
export let PublicUser_submittedApplicationList = {
  columns: [
    {
      header: "APPLICATION_SUBMITTED_DATE",
      multilingual: true,
      Cell: ({ appSubmitDate }) => (
        formatDate(appSubmitDate)
      )
    },
    {
      header: "CATEGORY",
      multilingual: true,
      Cell: (data) => {
        let appDetail = applicationDetail[data.type]
        return appDetail.type
      }
    },
    {
      header: "APPLICATION_ID",
      multilingual: true,
      Cell: ({ formId }) => {
        return formId
      }
    },
    {
      header: "APPLICANT_NAME",
      multilingual: true,
      Cell: ({ basicDetails }) => {
        return basicDetails?.name || "-"
      }
    },
    {
      header: "ENTERPRISE_NAME",
      multilingual: true,
      Cell: (data) => {
        let entName = applicationDetail[data.type].enterpriseName;
        let details = data?.basicDetails
        // console.log(data, details ? details[entName]:"","data--------------------------------|||")
        return details ? details[entName] || "-" : "-"
      }
    },
    {
      header: "ENTERPRISE_ACTIVITY",
      Cell: (data) => {
        let appDetail = applicationDetail[data.type]
        return (<>
          <span>{appDetail.type == "PG" ? data.pgDetails ? data.pgDetails["pgTypes"].map((item)=>(item.pgTypesData.label)).join() : '-' : ''}</span>
          <span>{appDetail.type == "EG" ? data.egDetails ? data.egDetails["egTypes"].map((item)=>(item.egTypesData.label)).join() : '-' : ''}</span>
          <span>{appDetail.type == "PC" ? data.pcDetails ? data.pcDetails["pcTypes"].map((item)=>(item.pcTypesData.label)).join() : '-' : ''}</span>
          <span>{appDetail.type == "SYMR" ? data.symrEnterprise ? data.symrEnterprise["symrTypes"].map((item)=>(item.symrTypesData.label)).join() : '-' : ''}</span>
        </>
        )
      },
      multilingual: true
    },
    {
      header: "MOBILE_NUMBER",
      Cell: ({ basicDetails }) => <span>{basicDetails ? basicDetails?.mobileNumber : '-'}</span>,
      multilingual: true
    },
    {
      header: "BANK_DETAILS",
      multilingual: true,
      Cell: (data) => {
        let appDetail = applicationDetail[data.type]
        return (<>
          <span>{appDetail.type == "PG" ? data.pgFormBankDetails ? data.pgFormBankDetails?.bnkName : '' : ''}</span>
          <span>{appDetail.type == "PC" ? data.pcFormBankDetails ? data.pcFormBankDetails?.bnkName : '' : ''}</span>
          <span>{appDetail.type == "EG" ? data.egFormBankDetails ? data.egFormBankDetails?.bnkName : '' : ''}</span>
          <span>{appDetail.type == "SYMR" ? data.symrBankDetails ? data.symrBankDetails?.bnkName : '' : ''}</span>
        </>
        )
      },
      Cell: (data) => {
        let appType = data.type == 1 ? "pcFormBankDetails" : data.type == 2 ? "pgFormBankDetails" : data.type == 3 ? "egFormBankDetails" : data.type === 4 ? "symrBankDetails" : "";
        let bankDetails = data[appType];
        return <span>{bankDetails?.bnkName || "-"}</span>
      },
    },
    {
      header: "LOAN_AMOUNT",
      Cell: ({ totalAmount }) => <span>{
        totalAmount ?
          parseInt(totalAmount).toLocaleString('en-IN')
          : '-'
      }</span>,
      multilingual: true
    },
    {
      header: "STATUS",
      accessor: 'status',
      multilingual: true,
      Cell: (data) =>{
        let _type = applicationDetail[data.type].type;
        let statusObj = (_type == "PG" || _type == "EG") ? PG_EG_MASTER_STATUS : FORM_MASTER_STATUS;
        return <div className={`text-status text-status-${data.status == 2 ? 'primary' : 'warning'}`}>
          {/* {console.log(data,"in tabel")} */}
          {statusObj.find(status => status.value === data.status)?.label}
        </div>
      }
    }
  ],
  rows: []
}
export let AdminUserListTable = {
  columns: [
    {
      header: "Created Date",
      accessor: "createdAt",
      Cell: ({ createdAt }) => {
        return moment(createdAt).format("DD / MM / YYYY");
      },
    },
    {
      header: "User ID",
      accessor: "userName"
    },
    {
      header: "Role",
      accessor: "role",
      Cell: ({ role }) => {
        return STAFF_ROLES.find(data => data.value === role)['label']
      }
    },
    {
      header: "Location",
      accessor: "location",
      Cell: ({ address }) => {
        let district = address?.district?.districtName
        return district ? district : '-'
      }
    },
    {
      header: "Email ID",
      accessor: "emailId",
    },
    {
      header: "Mobile Number",
      accessor: "mobileNumber",
    },
    {
      header: "Status",
      accessor: "status",
      Cell: ({ isActive }) => {
        return isActive ? 'Active' : 'Inactive'
      }
    },
  ],
  rows: [],
};


export const StaffFullApplicationList = {
  columns: [
    {
      header: "Application Date",
      accessor: "applicationDate",
      Cell: ({ appSubmitDate }) => {
        return formatDate(appSubmitDate)
      }
    },
    {
      header: "Application ID",
      accessor: "formId",
    },
    {
      header: "Location",
      accessor: "location",
      Cell: ({ basicDetails }) => {
        return basicDetails?.block?.label
      }
    },
    {
      header: "Commodities",
      Cell: ({ pcDetails }) => {
        return pcDetails?.pcCommodityTypes?.length === 1 ? "Single" : "Multiple";
      }
    },
    {
      header: "PC Name",
      Cell: ({ basicDetails }) => {
        return basicDetails?.pcName
      }
    },
    {
      header: "Contact Name",
      accessor: "contactName",
      Cell: ({ basicDetails }) => {
        return basicDetails?.name
      }
    },
    {
      header: "Mobile Number",
      accessor: "mobileNumber",
      Cell: ({ basicDetails }) => {
        return basicDetails?.mobileNumber || "-"
      }
    },
    {
      header: "Total Required Amount",
      accessor: "amount",
      Cell: ({ totalAmount }) => {
        return `Rs ${formatToINR(totalAmount)}`
      },
    }
  ],
  rows: [],
};


export let StaffShortApplicationList = {
  columns: [
    {
      header: "Application Date",
      accessor: "applicationDate",
      Cell: ({ appSubmitDate }) => {
        return formatDate(appSubmitDate)
      }
    },
    {
      header: "Application ID",
      accessor: "formId",
    },
    {
      header: "Location",
      accessor: "location",
      Cell: ({ basicDetails }) => {
        return basicDetails?.block?.label
      }
    },
    {
      header: "Total Required Amount",
      accessor: "amount",
      Cell: ({ totalAmount }) => {
        return `Rs ${formatToINR(totalAmount)}`
      },
    }
  ],
  rows: [],
};

export const StaffIeList = {
  full: {
    columns: [
      {
        header: "Application Received",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          // return basicDetails?.block?.label
          return "location"
        }
      },
      {
        header: "Differently Abled",
        Cell: ({ appSubmitDate }) => {
          // return formatDate(appSubmitDate)
          return '2000'
        }
      },
      {
        header: "Enterprise Name",
        Cell: ({ appSubmitDate }) => {
          // return formatDate(appSubmitDate)
          return "Enterprise name"
        }
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
        Cell: ({ basicDetails }) => {
          return basicDetails?.mobileNumber || "-"
        }
      },
      {
        header: "Requested Amount",
        Cell: ({ appSubmitDate }) => {
          // return formatDate(appSubmitDate)
          return '2000'
        }
      },
    ],
    rows: [],
  },
  short: {
    columns: [
      {
        header: "Application Received",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          // return basicDetails?.block?.label
          return "location"
        }
      },
      {
        header: "Enterprise Name",
        Cell: ({ appSubmitDate }) => {
          // return formatDate(appSubmitDate)
          return "Enterprise name"
        }
      },
      {
        header: "Requested Amount",
        Cell: ({ appSubmitDate }) => {
          // return formatDate(appSubmitDate)
          return '2000'
        }
      },
    ],
    rows: [],
  }
}

export const StaffSYMRList = {
  full: {
    columns: [
      {
        header: "Application Received",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ symrEnterprise }) => {
          return symrEnterprise?.location
        }
      },
      {
        header: "Commodities",
        Cell: ({ symrEnterprise }) => {
          return symrEnterprise?.symrCommodityTypes?.length === 1 ? "Single" : "Multiple";
        }
      },
      {
        header: "Youth Name",
        accessor: "contactName",
        Cell: ({ basicDetails }) => {
          return basicDetails?.name
        }
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
        Cell: ({ basicDetails }) => {
          return basicDetails?.mobileNumber || "-"
        }
      },
      // {
      //   header: "Enterprise Name",
      //   Cell: ({ symrEnterprise }) => {
      //     return symrEnterprise?.name
      //   }
      // },
      {
        header: "Requested Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  },
  short: {
    columns: [
      {
        header: "Application Received",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ symrEnterprise }) => {
          return symrEnterprise?.location
        }
      },
      {
        header: "Enterprise Name",
        accessor: "contactName"
      },
      {
        header: "Requested Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  }
}

export const PgStaffBMMU = {
  full: {
    columns: [
      {
        header: "Application Date",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          return basicDetails?.block?.label
        }
      },
      {
        header: "Commodities",
        Cell: ({ pgDetails }) => {
          return pgDetails?.pgCommodityTypes?.length === 1 ? "Single" : "Multiple";
        }
      },
      {
        header: "PG Name",
        accessor: "contactName",
        Cell: ({ basicDetails }) => {
          return basicDetails?.pgName
        }
      },
      {
        header: "Contact Name",
        Cell: ({ basicDetails }) => {
          return basicDetails?.name
        }
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
        Cell: ({ basicDetails }) => {
          return basicDetails?.mobileNumber || "-"
        }
      },
      {
        header: "Total Required Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  },
  short: {
    columns: [
      {
        header: "Application Date",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          return basicDetails?.block?.label
        }
      },
      {
        header: "Total Required Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  }
}


export const PgStaffDMMU = {
  full: {
    columns: [
      {
        header: "Application Received",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      // {
      //   header: "DMMU verification Status",
      //   accessor: "verificationstatus",
      //   // Cell: ({ appSubmitDate }) => {
      //   //   return formatDate(appSubmitDate)
      //   // }
      // },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          return basicDetails?.block?.label
        }
      },
      {
        header: "Commodities",
        Cell: ({ pgDetails }) => {
          return pgDetails?.pgCommodityTypes?.length === 1 ? "Single" : "Multiple";
        }
      },
      {
        header: "PG Name",
        accessor: "contactName",
        Cell: ({ basicDetails }) => {
          return basicDetails?.pgName
        }
      },
      {
        header: "Contact Name",
        Cell: ({ basicDetails }) => {
          return basicDetails?.name
        }
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
        Cell: ({ basicDetails }) => {
          return basicDetails?.mobileNumber || "-"
        }
      },
      {
        header: "Approved Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  },
  short: {
    columns: [
      {
        header: "Application Received",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          return basicDetails?.block?.label
        }
      },
      {
        header: "Approved Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  }
}


export const DMMUEnterpriseApplicationList = {
  full: {
    columns: [
      {
        header: "Application Date",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      // {
      //   header: "DMMU Verification Status",
      //   accessor: "verificationstatus",
      // },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          return basicDetails?.block?.label
        }
      },
      {
        header: "Commodities",
        Cell: ({ pcDetails }) => {
          return pcDetails?.pcCommodityTypes?.length === 1 ? "Single" : "Multiple";
        }
      },
      {
        header: "EG Name",
        Cell: ({ basicDetails }) => {
          return basicDetails?.egName
        }
      },
      {
        header: "Contact Name",
        Cell: ({ basicDetails }) => {
          return basicDetails?.name
        }
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
        Cell: ({ basicDetails }) => {
          return basicDetails?.mobileNumber || "-"
        }
      },
      {
        header: "Approved Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  },
  short: {
    columns: [
      {
        header: "Application Received",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          return basicDetails?.block?.label
        }
      },
      {
        header: "Approved Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  }

};

export const BMMUEnterpriseApplicationList = {
  full: {
    columns: [
      {
        header: "Application Date",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          return basicDetails?.block?.label
        }
      },
      {
        header: "Commodities",
        Cell: ({ egDetails }) => {
          return egDetails?.egCommodityTypes?.length === 1 ? "Single" : "Multiple";
        }
      },
      {
        header: "EG Name",
        Cell: ({ basicDetails }) => {
          return basicDetails?.egName
        }
      },
      {
        header: "Mobile Number",
        accessor: "mobileNumber",
        Cell: ({ basicDetails }) => {
          return basicDetails?.mobileNumber || "-"
        }
      },
      {
        header: "Contact Name",
        accessor: "contactName",
        Cell: ({ basicDetails }) => {
          return basicDetails?.name
        }
      },
      {
        header: "Total Required Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  },
  short: {
    columns: [
      {
        header: "Application Received",
        accessor: "applicationDate",
        Cell: ({ appSubmitDate }) => {
          return formatDate(appSubmitDate)
        }
      },
      {
        header: "Application ID",
        accessor: "formId",
      },
      {
        header: "Location",
        accessor: "location",
        Cell: ({ basicDetails }) => {
          return basicDetails?.block?.label
        }
      },
      {
        header: "Total Required Amount",
        accessor: "amount",
        Cell: ({ totalAmount }) => {
          return `Rs ${formatToINR(totalAmount)}`
        },
      }
    ],
    rows: [],
  }
};

export let DMMUHeader = {
  columns: [
    {
      header: "Open Application",
    },
    {
      header: "Disbursement",
    },
    {
      header: "Pending Application",
    },
    {
      header: "Closed Application",
    }
  ],
  rows: [],
};

export let BMMUHeader = {
  columns: [
    {
      header: "Open Application",
    },
    {
      header: "Recommended",
    },
    {
      header: "Rejected",
    },
  ],
  rows: [],
};


export const fund_TargetAndAchieved = {
  district: {
    columns: [
      {
        header: <span>District Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'Target',
        Cell: ({ target }) => moneyFormatBySymbolExact(target)
      },
      {
        header: 'Achieved',
        Cell: ({ achieved }) => moneyFormatBySymbolExact(achieved)
      }
    ],
    rows: []
  },
  block: {
    columns: [
      {
        header: <span>Block Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'Achieved',
        Cell: ({ achieved }) => moneyFormatBySymbolExact(achieved)
      },
      // {
      //   header: 'Target',
      //   Cell: ({ target }) => moneyFormatBySymbolExact(target)
      // }
    ],
    rows: []
  },
  panchayat: {
    columns: [
      {
        header: <span>Panchayat Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => labelLong,
        disabled: true
      },
      {
        header: 'Achieved',
        Cell: ({ achieved }) => moneyFormatBySymbolExact(achieved)
      },
      // {
      //   header: 'Target',
      //   Cell: ({ target }) => moneyFormatBySymbolExact(target)
      // }
    ],
    rows: []
  }
}
export const beneficiary_TargetAndAchieved = {
  district: {
    columns: [
      {
        header: <span>District Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <span className="mb-0">{labelLong}</span>
      },
      {
        header: 'Target',
        Cell: ({ target }) => moneyFormatBySymbolExact(target)
      },
      {
        header: 'Achieved',
        Cell: ({ achieved }) => moneyFormatBySymbolExact(achieved)
      }
    ],
    rows: []
  },
}
export const beneficiary_Gender = {
  district: {
    columns: [
      {
        header: <span>District Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'Female',
        Cell: ({ female }) => female
      },
      {
        header: 'Male',
        Cell: ({ male }) => male
      },
      {
        header: 'Transgender',
        Cell: ({ transGender }) => transGender
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  },
  block: {
    columns: [
      {
        header: <span>Block Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'Female',
        Cell: ({ female }) => female
      },
      {
        header: 'Male',
        Cell: ({ male }) => male
      },
      {
        header: 'Transgender',
        Cell: ({ transGender }) => transGender
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  },
  panchayat: {
    columns: [
      {
        header: <span>Panchayat Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => labelLong,
        disabled: true
      },
      {
        header: 'Female',
        Cell: ({ female }) => female
      },
      {
        header: 'Male',
        Cell: ({ male }) => male
      },
      {
        header: 'Transgender',
        Cell: ({ transGender }) => transGender
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  }
}

export const beneficiary_community = {
  district: {
    columns: [
      {
        header: <span>District Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'BC',
        Cell: ({ BC }) => BC
      },
      {
        header: 'MBC',
        Cell: ({ MBC }) => MBC
      },
      {
        header: 'ST',
        Cell: ({ ST }) => ST
      },
      {
        header: 'SC',
        Cell: ({ SC }) => SC
      },
      {
        header: 'Others',
        Cell: ({ OTHERS }) => OTHERS
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  },
  block: {
    columns: [
      {
        header: <span>Block Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'BC',
        Cell: ({ BC }) => BC
      },
      {
        header: 'MBC',
        Cell: ({ MBC }) => MBC
      },
      {
        header: 'ST',
        Cell: ({ ST }) => ST
      },
      {
        header: 'SC',
        Cell: ({ SC }) => SC
      },
      {
        header: 'Others',
        Cell: ({ OTHERS }) => OTHERS
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  },
  panchayat: {
    columns: [
      {
        header: <span>Panchayat Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => labelLong,
        disabled: true
      },
      {
        header: 'BC',
        Cell: ({ BC }) => BC
      },
      {
        header: 'MBC',
        Cell: ({ MBC }) => MBC
      },
      {
        header: 'ST',
        Cell: ({ ST }) => ST
      },
      {
        header: 'SC',
        Cell: ({ SC }) => SC
      },
      {
        header: 'Others',
        Cell: ({ OTHERS }) => OTHERS
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  }
}

export const beneficiary_vulnerable = {
  district: {
    columns: [
      {
        header: <span>District Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'Differently abled',
        Cell: ({ differentlyAbled }) => differentlyAbled
      },
      {
        header: 'Widow',
        Cell: ({ widow }) => widow
      },
      {
        header: 'Dessituted',
        Cell: ({ destitued }) => destitued
      },
      {
        header: 'Desserted',
        Cell: ({ desserted }) => desserted
      },
      {
        header: 'Elderly',
        Cell: ({ elderly }) => elderly
      },
      {
        header: 'Transgender',
        Cell: ({ transGender }) => transGender
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  },
  block: {
    columns: [
      {
        header: <span>Block Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'Differently abled',
        Cell: ({ differentlyAbled }) => differentlyAbled
      },
      {
        header: 'Widow',
        Cell: ({ widow }) => widow
      },
      {
        header: 'Dessituted',
        Cell: ({ destitued }) => destitued
      },
      {
        header: 'Desserted',
        Cell: ({ desserted }) => desserted
      },
      {
        header: 'Elderly',
        Cell: ({ elderly }) => elderly
      },
      {
        header: 'Transgender',
        Cell: ({ transGender }) => transGender
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  },
  panchayat: {
    columns: [
      {
        header: <span>Panchayat Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => labelLong,
        disabled: true
      },
      {
        header: 'Differently abled',
        Cell: ({ differentlyAbled }) => differentlyAbled
      },
      {
        header: 'Widow',
        Cell: ({ widow }) => widow
      },
      {
        header: 'Dessituted',
        Cell: ({ destitued }) => destitued
      },
      {
        header: 'Desserted',
        Cell: ({ desserted }) => desserted
      },
      {
        header: 'Elderly',
        Cell: ({ elderly }) => elderly
      },
      {
        header: 'Transgender',
        Cell: ({ transGender }) => transGender
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  }
}

export const beneficiary_SHG = {
  district: {
    columns: [
      {
        header: <span>District Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'SHG',
        Cell: ({ SHG }) => SHG
      },
      {
        header: 'SHG HH',
        Cell: ({ SHGHH }) => SHGHH
      },
      {
        header: 'Non SHG HH',
        Cell: ({ NONSHGHH }) => NONSHGHH
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  },
  block: {
    columns: [
      {
        header: <span>Block Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header: 'SHG',
        Cell: ({ SHG }) => SHG
      },
      {
        header: 'SHG HH',
        Cell: ({ SHGHH }) => SHGHH
      },
      {
        header: 'Non SHG HH',
        Cell: ({ NONSHGHH }) => NONSHGHH
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  },
  panchayat: {
    columns: [
      {
        header: <span>Panchayat Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => labelLong,
        disabled: true
      },
      {
        header: 'SHG',
        Cell: ({ SHG }) => SHG
      },
      {
        header: 'SHG HH',
        Cell: ({ SHGHH }) => SHGHH
      },
      {
        header: 'Non SHG HH',
        Cell: ({ NONSHGHH }) => NONSHGHH
      },
      {
        header: 'Total',
        Cell: ({ total }) => total
      }
    ],
    rows: []
  }
}

export const chartWithLocationType = {
  district: {
    columns: [
      {
        header: <span>District Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      }
    ],
    rows: []
  },
  block: {
    columns: [
      {
        header: <span>Block Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      }
    ],
    rows: []
  },
  panchayat: {
    columns: [
      {
        header: <span>Panchayat Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => labelLong,
        disabled: true
      }
    ],
    rows: []
  }
}

export const chartWithComponents = {
  columns: [
    {
      header: 'Component Name',
      Cell: ({ label }) => label
    }
  ],
  rows: []
}

export const fund_components = {
  columns: [
    {
      header: 'Component Name',
      Cell: ({ label }) => label
    },
    {
      header: 'Target',
      Cell: ({ target }) => moneyFormatBySymbolExact(target)
    },
    {
      header: 'Achieved',
      Cell: ({ achieved }) => moneyFormatBySymbolExact(achieved)
    },

  ],
  rows: []
}

export const application_charts_status = {
  district: {
    columns: [
      {
        header: <span>District Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header : 'Approved',
        Cell : ({approvedApplication}) => formatToINR(approvedApplication)
      },
      {
        header : 'Rejected',
        Cell : ({rejectedApplication}) => formatToINR(rejectedApplication)
      },
      {
        header : 'Recommended/Pending',
        Cell : ({pendingApplication}) => formatToINR(pendingApplication)
      },
      {
        header : 'Total',
        Cell : ({
          approvedApplication,
          rejectedApplication,
          pendingApplication
        }) => formatToINR(
          approvedApplication + 
          rejectedApplication + 
          pendingApplication
        )
      }
    ],
    rows: []
  },
  block: {
    columns: [
      {
        header: <span>Block Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => <a href="javascript:void(0)">{labelLong}</a>
      },
      {
        header : 'Approved',
        Cell : ({approvedApplication}) => formatToINR(approvedApplication)
      },
      {
        header : 'Rejected',
        Cell : ({rejectedApplication}) => formatToINR(rejectedApplication)
      },
      {
        header : 'Recommended/Pending',
        Cell : ({pendingApplication}) => formatToINR(pendingApplication)
      },
      {
        header : 'Total',
        Cell : ({
          approvedApplication,
          rejectedApplication,
          pendingApplication
        }) => formatToINR(
          approvedApplication + 
          rejectedApplication + 
          pendingApplication
        )
      }
    ],
    rows: []
  },
  panchayat: {
    columns: [
      {
        header: <span>Panchayat Name<i className="icon-up-arrow mb-0 ml-1" aria-hidden="true" /></span>,
        Cell: ({ labelLong }) => labelLong,
        disabled: true
      },
      {
        header : 'Approved',
        Cell : ({approvedApplication}) => formatToINR(approvedApplication)
      },
      {
        header : 'Rejected',
        Cell : ({rejectedApplication}) => formatToINR(rejectedApplication)
      },
      {
        header : 'Recommended/Pending',
        Cell : ({pendingApplication}) => formatToINR(pendingApplication)
      },
      {
        header : 'Total',
        Cell : ({
          approvedApplication,
          rejectedApplication,
          pendingApplication
        }) => formatToINR(
          approvedApplication + 
          rejectedApplication + 
          pendingApplication
        )
      }
    ],
    rows: []
  }
}

export const application_chart_components = {
  columns: [
    {
      header: 'Component Name',
      Cell: ({ label }) => label
    },
    {
      header : 'Approved',
      Cell : ({approvedApplication}) => formatToINR(approvedApplication)
    },
    {
      header : 'Rejected',
      Cell : ({rejectedApplication}) => formatToINR(rejectedApplication)
    },
    {
      header : 'Recommended/Pending',
      Cell : ({pendingApplication}) => formatToINR(pendingApplication)
    },
    {
      header : 'Total',
      Cell : ({
        approvedApplication,
        rejectedApplication,
        pendingApplication
      }) => formatToINR(
        approvedApplication + 
        rejectedApplication + 
        pendingApplication
      )
    }

  ],
  rows: []
}