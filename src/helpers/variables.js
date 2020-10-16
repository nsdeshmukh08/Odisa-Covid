export const PC_FORM_MASTER_STATUS = {
    DRAFT: 1,
    OPEN_APPLICATION: 2,
    PENDING: 3,
    FIRST_TRANCHE: 4,
    SECOND_TRANCHE: 5,
    SECOND_TRANCHE_UC: 6,
    APPROVED: 7,
    DECLINED: 8,
};
export const FORM_MASTER_STATUS = [
    {
        label: 'Draft',
        value: 1
    },
    {
        label: 'Open application',
        value: 2
    },
    {
        label: 'Pending',
        value: 3
    },
    {
        label: 'Disbursement',
        value: 4
    },
    {
        label: 'Approved',
        value: 5
    },
    {
        label: 'Declined',
        value: 6
    },
    {
        label: 'Closed',
        value: 7
    }
]


export const PG_EG_MASTER_STATUS = [
    {
        label: 'Draft',
        value: 1
    },
    {
        label: 'Open application',
        value: 2
    },
    {
        label: 'Open application',
        value: 3
    },
    {
        label: 'Approved',
        value: 4
    },
    {
        label: 'Approved',
        value: 5
    },
    {
        label: 'Closed',
        value: 6
    },
    {
        label: 'Pending',
        value: 7
    },
    {
        label: 'Declined',
        value: 8
    }
]


export const DISBURSEMENT_STATE = {
    FIRST_TRANCHE: 1,
    SECOND_TRANCHE: 2,
    SECOND_TRANCHE_UC: 3,
};

export const IS_TRUE = [
    {
        label: 'Yes',
        value: true
    },
    {
        label: 'No',
        value: false
    }
]

export const IS_TRUE_Bool = [
    {
        label: 'Yes',
        value: 1
    },
    {
        label: 'No',
        value: 0
    }
]

export const ACTIVITY_CATEGORY = [
    {
        label: 'Red',
        value: 1
    },
    {
        label: 'White',
        value: 2
    },
    {
        label: 'Green',
        value: 4
    },
    {
        label: 'Orange',
        value: 3
    },
]

//ROLE

export const STAFF_ROLE_ID = {
    ADMIN: 1,
    SMMU: 2,
    DMMU: 3,
    BMMU: 4,
    GPLF: 5,
    CLF: 6,
    ALL: 7,
    PUBLIC: 8,
};

export const STAFF_ROLES = [
    {
        label: "All",
        value: STAFF_ROLE_ID.ALL,
    },
    {
        label: "SMMU",
        value: STAFF_ROLE_ID.SMMU,
    },
    {
        label: "DMMU",
        value: STAFF_ROLE_ID.DMMU,
    },
    {
        label: "BMMU",
        value: STAFF_ROLE_ID.BMMU,
    },
    {
        label: "GPLF",
        value: STAFF_ROLE_ID.GPLF,
    },
    {
        label: "CLF",
        value: STAFF_ROLE_ID.CLF,
    },
    {
        label: "Administrator",
        value: STAFF_ROLE_ID.ADMIN
    },
    {
        label: "User",
        value: STAFF_ROLE_ID.PUBLIC
    }
];

export const ORDER = [
    {
        label: 'Last First',
        value: 0
    },
    {
        label: 'Recent First',
        value: 1
    }
]

export const STATUS = [
    {
        label: 'All',
        value: 2
    },
    {
        label: 'Active',
        value: 1
    },
    {
        label: 'Inactive',
        value: 0
    },
]

export let APPLICATION_TABS = [
    {
        label: 'Open',
        value: [2],
        icon: 'icon-doc-color'
    },
    {
        label: 'Disbursement',
        value: [4, 5, 6]
    },
    {
        label: 'Recommended & Pending',
        value: [3]
    },
    {
        label: 'Closed',
        value: [7, 8]
    }
]


export const PG_FORM_MASTER_STATUS = {
    DRAFT: 1,
    BMPU_OPEN_APPLICATION: 2,
    DMPU_OPEN_APPLICATION: 3,
    AMOUNT_DISBURSMENT: 4,
    SUBMIT_UC: 5,
    APPROVED: 6,
    PENDING: 7,
    DECLINED: 8,
};

export const PG_DMPU_APPLICATION_TABS = [
    {
        label: 'Open',
        value: [
            PG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION
        ],
        icon: 'icon-doc-color'
    },
    {
        label: 'Disbursement',
        value: [
            PG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
            PG_FORM_MASTER_STATUS.SUBMIT_UC,
        ]
    },
    {
        label: 'Recommended & Pending',
        value: [PG_FORM_MASTER_STATUS.PENDING]
    },
    {
        label: 'Closed',
        value: [
            PG_FORM_MASTER_STATUS.DECLINED,
            PG_FORM_MASTER_STATUS.APPROVED
        ]
    },
]
export const PG_BMPU_APPLICATION_TABS = [
    {
        label: 'Open',
        value: [
            PG_FORM_MASTER_STATUS.BMPU_OPEN_APPLICATION
        ],
        icon: 'icon-doc-color'
    },
    {
        label: 'Recommended',
        value: [
            PG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION,
            PG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
            PG_FORM_MASTER_STATUS.SUBMIT_UC,
            PG_FORM_MASTER_STATUS.APPROVED,
            PG_FORM_MASTER_STATUS.PENDING,
        ]
    },
    {
        label: 'Rejected',
        value: [PG_FORM_MASTER_STATUS.DECLINED]
    },
]


// IE 

export const IE_FORM_MASTER_STATUS = {
    DRAFT: 1,
    OPEN_APPLICATION: 2,
    PENDING: 3,
    AMOUNT_DISBURSMENT: 4,
    SUBMIT_UC: 5,
    APPROVED: 6,
    DECLINED: 7
};

export let IE_APPLICATION_TABS = [
    {
        label: 'Open',
        value: [
            IE_FORM_MASTER_STATUS.OPEN_APPLICATION
        ],
        icon: 'icon-doc-color'
    },
    {
        label: 'Disbursement',
        value: [
            IE_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT, 
            IE_FORM_MASTER_STATUS.SUBMIT_UC
        ]
    },
    {
        label: 'Recommended & Pending',
        value: [IE_FORM_MASTER_STATUS.PENDING]
    },
    {
        label: 'Closed',
        value: [
            IE_FORM_MASTER_STATUS.DECLINED, 
            IE_FORM_MASTER_STATUS.APPROVED
        ]
    }
]


//SYMR

export const SYMR_FORM_MASTER_STATUS = {
    DRAFT: 1,
    OPEN_APPLICATION: 2,
    PENDING: 3,
    AMOUNT_DISBURSMENT: 4,
    SUBMIT_UC: 5,
    APPROVED: 6,
    DECLINED: 7
};

export const SYMR_TABS = [
    {
        label: 'Open',
        value: [
            SYMR_FORM_MASTER_STATUS.OPEN_APPLICATION
        ],
        icon: 'icon-doc-color'
    },
    {
        label: 'Disbursement',
        value: [
            SYMR_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
            SYMR_FORM_MASTER_STATUS.SUBMIT_UC
        ]
    },
    {
        label: 'Pending',
        value: [SYMR_FORM_MASTER_STATUS.PENDING]
    },
    {
        label: 'Closed',
        value: [
            SYMR_FORM_MASTER_STATUS.DECLINED,
            SYMR_FORM_MASTER_STATUS.APPROVED
        ]
    }
]

//DISBURSMENT

export const SYMR_DISBURSEMENT_TABS = [
    SYMR_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
    SYMR_FORM_MASTER_STATUS.SUBMIT_UC,
    SYMR_FORM_MASTER_STATUS.APPROVED
]

//EG
export const EG_FORM_MASTER_STATUS = {
    DRAFT: 1,
    BMPU_OPEN_APPLICATION: 2,
    DMPU_OPEN_APPLICATION: 3,
    AMOUNT_DISBURSMENT: 4,
    SUBMIT_UC: 5,
    APPROVED: 6,
    PENDING: 7,
    DECLINED: 8,
};
export let BMMU_ENTERPRISE_APPLICATION_TABS = [
    {
        label: 'Open',
        value: [EG_FORM_MASTER_STATUS.BMPU_OPEN_APPLICATION],
        icon: 'icon-doc-color'
    },
    {
        label: 'Recommended',
        value: [
            EG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
            EG_FORM_MASTER_STATUS.SUBMIT_UC,
            EG_FORM_MASTER_STATUS.APPROVED,
            EG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION
        ]
    },
    {
        label: 'Rejected',
        value: [EG_FORM_MASTER_STATUS.DECLINED]
    }
]
export let DMMU_ENTERPRISE_APPLICATION_TABS = [
    {
        label: 'Open',
        value: [EG_FORM_MASTER_STATUS.DMPU_OPEN_APPLICATION],
        icon: 'icon-doc-color'
    },
    {
        label: 'Disbursement',
        value: [
            EG_FORM_MASTER_STATUS.AMOUNT_DISBURSMENT,
            EG_FORM_MASTER_STATUS.SUBMIT_UC,
        ]
    },
    {
        label: 'Recommended & Pending',
        value: [EG_FORM_MASTER_STATUS.PENDING]
    },
    {
        label: 'Closed',
        value: [
            EG_FORM_MASTER_STATUS.APPROVED,
            EG_FORM_MASTER_STATUS.DECLINED
        ]
    }
]



export const DASHBOARD_FILTERS = [
    {
        label: "All Districts",
        value: STAFF_ROLE_ID.SMMU
    },
    {
        label: "All Blocks",
        value: STAFF_ROLE_ID.DMMU
    },
    {
        label: "All panchayat",
        value: STAFF_ROLE_ID.BMMU
    }
]
// pg,pc,symr,eg
export const COMPONENT_FILTER = [
    {
        label: "Producer Collective",
        value: 1
    },
    {
        label: "Producer Group",
        value: 2
    },
    {
        label: "Enterprise Group",
        value: 3
    },
    {
        label: "Youth Migrant",
        value: 4
    }
]

export const ALL_COMPONENTS_SELECT = {
    container: (base) => ({
        ...base,
        width: '175px',
        marginLeft: '10px'
    })

}

export const FORM_TYPES = {
    PC_FORM: 1,
    PG_FORM: 2,
    EG_FORM: 3,
    SYMR_FORM: 4,
    IE_FORM: 5,
    IA_FORM: 6,
};
