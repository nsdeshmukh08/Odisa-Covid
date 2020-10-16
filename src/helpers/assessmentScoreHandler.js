
let fieldName={
    //PC
    NoOfMembers : 'NoOfMembers',
    membersInSHG:'membersInSHG',
    NoOfWomenMembership:'NoOfWomenMembership',
    businessTurnover:'businessTurnover',
    selfSufficient:'selfSufficient',
    auditedFinancialStatement :'auditedFinancialStatement',
    numberageOfEquityRaised:'numberageOfEquityRaised',
    businessCycle:'businessCycle',
    noOfFinancialLinkage:'noOfFinancialLinkage',
    noOfMarketLinkage:'noOfMarketLinkage',
    noOfConvergenceEstablished : 'noOfConvergenceEstablished',
    noOfPartnerShip:'noOfPartnerShip',

    //PG
    noOfYearsGroupInvolvedInTheActivity: "noOfYearsGroupInvolvedInTheActivity",
    noOfActiveMembers: "noOfActiveMembers",
    membersInShgAndShgHouseholds: "membersInShgAndShgHouseholds",
    noOfWomenMembershipInPg: "noOfWomenMembershipInPg",
    bankTransactionsAndOperations:"bankTransactionsAndOperations",
    inputServiceProvisionAndSupport: "inputServiceProvisionAndSupport",
    aggrigationAndMarketLinkages:"aggrigationAndMarketLinkages",
    specialProducerGroup:"specialProducerGroup",
    areTheBooksOfRecordsMaintained: "areTheBooksOfRecordsMaintained",

    //EG
    noOfYearsEGGroupInvolvedInTheActivity: "noOfYearsGroupInvolvedInTheActivityEg",
    noOfActiveEgMembers: "noOfActiveMembersEg",
    noOfWomenMembershipInEg: "noOfWomenMembershipInEg",
    membersInEgShgAndShgHouseholds: "membersInShgAndShgHouseholds",
    areTheBooksOfRecordsEgMaintained: "areTheBooksOfRecordsMaintainedEg",
    percentageCaptialReceivedMembers:"percentageofShareCapitalReceivedfromtheMembersEg",
    UtilizationCommonInfrastaucture: "UtilizationofCommonInfrastauctureEg",
    BankTransactionOpertaions:"bankTransactionOpertaionsEg",
    ProfitSharingDistributionsAmongMember:"profitSharingDistributionsAmongMemberEg",
    PortionOperatingCosting:"portionoftheOperatingCostingEg",
    numberofPartnershipMade:"numberofpartnershpmadeEg",
    
    //SYMR
    memberType : 'memberType',
    migrantReturnEarning : 'migrantReturnEarning',
    membersForSociallyDisadvantagedSections : 'membersForSociallyDisadvantagedSections',
    completedOrRegisteredForSociallyDisadvantaged : 'completedOrRegisteredForSociallyDisadvantaged',
    completedEDPProgrames : 'completedEDPProgrames',
    alreadyAppliedNewBusinessActivityLoan : 'alreadyAppliedNewBusinessActivityLoan',
    experienceOfSkilledYouth : 'experienceOfSkilledYouth',
    repaymentOfExistingLoan : 'repaymentOfExistingLoan',
    proposedEnterpriseLocationMaster : 'proposedEnterpriseLocationMaster',
    activityEnterpriseProposed : 'activityEnterpriseProposed',
    numberOfPersonExpectedToGetJob : 'numberOfPersonExpectedToGetJob',
    partnershipCreatedAndEstablished : 'partnershipCreatedAndEstablished',
    // CLFVerificationStatus : 'CLFVerificationStatus'

    //IE
    ageoftheEnterprise:"ageoftheEnterprise",
    womenHeadedEntrepreneur:"womenHeadedEntrepreneur",
    memberfromSociallyDisadvantagedSections:"memberfromSociallyDisadvantagedSections",
    financialTransactionthroughBank:"financialTransactionthroughBank",
    noOfFinancialLinkagesFromBanksShgAndGPLF:"noOfFinancialLinkagesFromBanksShgAndGPLF",
    enterpriseBelongToSpecialGreenSocial:"enterpriseBelongToSpecialGreenSocial",
}

let assessmentInputType = {
    text : 'text',
    radio : 'radio',
    select : 'select',
    percentage : 'percent',
    isYesOrNo : 'isYesOrNo',
    SelectWithIsYesOrNo : 'SelectWithIsYesOrNo',
    number : 'number',
    percentageWithIcon: "percentageWithIcon"
}
export let IeFieldList = [
    {
        fieldKeyName: fieldName.ageoftheEnterprise,
        inputField: { 
            type: assessmentInputType.number,
            label: `Age of the Enterprise`,
            option : 'ageoftheEnterprise'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 1,
                        max: 2
                    },
                    score: 5
                },
                {
                    range: {
                        min: 3
                    },
                    score: 10
                },
            ]
        }
    },
    {
		fieldKeyName: fieldName.memberType,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            // option : 'shgMemberTypeMaster',
            label: 'Member Type'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 5,
                    value : 0
                },
                {
                    score : 10,
                    value : 1
                }
            ]
        }
    },
    {
		fieldKeyName: fieldName.womenHeadedEntrepreneur,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            // option : 'shgMemberTypeMaster',
            label: 'Women headed entrepreneur'
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 0
                },
                {
                    score : 5,
                    value : 1
                }
            ]
        }
    },
    {
		fieldKeyName: fieldName.memberfromSociallyDisadvantagedSections,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            // option : 'shgMemberTypeMaster',
            label: 'Member from Socially Disadvantaged Sections ( ST/SC/Differently abled / Transgender / Vulnerable/Elderly )'
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 0
                },
                {
                    score : 5,
                    value : 1
                }
            ]
        }
    },
    {
		fieldKeyName: fieldName.financialTransactionthroughBank,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            // option : 'shgMemberTypeMaster',
            label: 'Financial Transaction through Bank'
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 0
                },
                {
                    score : 5,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.noOfFinancialLinkagesFromBanksShgAndGPLF,
        inputField: { 
            type: assessmentInputType.number,
            label: `No. Of Financial Linkages from banks, SHG & GPLF`,
            // option : 'symrExperienceMaster'
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        max: 1
                    },
                    score: 3
                },
                {
                    range: {
                        min: 2
                    },
                    score: 5
                },
            ]
        }
    },
    {
        fieldKeyName: fieldName.repaymentOfExistingLoan,
        inputField: { 
            type: assessmentInputType.select,
            label: `Repayment of existing loan`,
            // option : 'Repayment of existing loan'
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 5,
                    value : 1
                },
                {
                    score : 3,
                    value : 2
                },
                {
                    score : 0,
                    value : 3
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.enterpriseBelongToSpecialGreenSocial ,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            label: `Enterprise belong to Special/Green/Social`
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 0
                },
                {
                    score : 5,
                    value : 1
                }
            ]
        }
    },
]

export let PCFieldList = [
    {
		"fieldKeyName": fieldName.businessTurnover,
        inputField: {
            type: assessmentInputType.number,
            label: 'Business Turnover'
        },
        scoreField: {
            maxText: '10',
            max : 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 2500000
                    },
                    score: 3
                },
                {
                    range: {
                        min: 2500001,
                        max: 5000000
                    },
                    score: 5
                },
                {
                    range: {
                        min: 5000000
                    },
                    score: 10
                }
            ]
        }
    },
    {
		fieldKeyName: fieldName.selfSufficient,
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            label: 'Self Sufficiency (%)',
            max:100
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 50
                    },
                    score: 3
                },
                {
                    range: {
                        min: 50,
                        max: 80
                    },
                    score: 5
                },
                {
                    range: {
                        min: 80
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.NoOfMembers,
        initialKeyName : 'totalMembers',
        //Assesment Field
        inputField: { 
            type: assessmentInputType.number,
            disabled: false,
            label: 'No of Members',
            max: 1500
        },
        //Score Field
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 300
                    },
                    score: 2
                },
                {
                    range: {
                        min: 300,
                        max: 1000
                    },
                    score: 3
                },
                {
                    range: {
                        min: 1000,
                        max: 1501
                    },
                    score: 5
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.membersInSHG,
        initialKeyName : 'membersInShgAndShgHouseHoldInPercent',
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            disabled: false,
            max: 100,
            label: 'Members in SHG and SHG HouseHold (%)'
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 40
                    },
                    score: 0
                },
                {
                    range: {
                        min: 40,
                        max: 60
                    },
                    score: 2
                },
                {
                    range: {
                        min: 60,
                        max: 80
                    },
                    score: 3
                },
                {
                    range: {
                        min: 80,
                        max: 101
                    },
                    score: 5
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.auditedFinancialStatement,
        inputField: {
            type: assessmentInputType.select,
            max : 100,
            label: 'Audited financial statement',
            option: 'auditYearMaster'
        },
        scoreField: {
            maxText: '05',
            max:5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 1
                },
                {
                    score : 5,
                    value : 2
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.numberageOfEquityRaised,
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            max : 100,
            label: 'Percentage of equity raised'
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 25
                    },
                    score: 0
                },
                {
                    range: {
                        min: 25,
                        max: 75
                    },
                    score: 3
                },
                {
                    range: {
                        min: 75,
                        max:101
                    },
                    score: 5
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.NoOfWomenMembership,
        initialKeyName : 'noOfFemaleInPercent',
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            disabled: false,
            max : 100,
            label: 'No of Women Membership'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 25
                    },
                    score: 0
                },
                {
                    range: {
                        min: 25,
                        max: 50
                    },
                    score: 5
                },
                {
                    range: {
                        min: 50,
                        max: 101
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.businessCycle,
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            max : 100,
            label: 'Business Cycle and Benefit to shareholders (%)'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max:50
                    },
                    score: 3
                },
                {
                    range: {
                        min: 50,
                        max: 70
                    },
                    score: 5
                },
                {
                    range: {
                        min: 70,
                        max: 101
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.noOfFinancialLinkage,
        inputField: {
            type: assessmentInputType.select,
            max : 10,
            label: 'No of Financial linkages Established (Loans)',
            option: 'financialLinkageMaster'
        },
        scoreField: {
            maxText: '10',
            max:10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 1
                },
                {
                    score : 5,
                    value : 2
                },
                {
                    score : 10,
                    value : 3
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.noOfMarketLinkage,
        inputField: {
            type: assessmentInputType.select,
            max : 10,
            label: 'No of Market linkages established',
            option: 'linkageMaster'
        },
        scoreField: {
            maxText: '10',
            max:10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 1
                },
                {
                    score : 5,
                    value : 2
                },
                {
                    score : 10,
                    value : 3
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.noOfConvergenceEstablished,
        inputField: {
            type: assessmentInputType.select,
            max : 10,
            label: 'No of Convergence Established',
            option: 'convergenceMaster'
        },
        scoreField: {
            maxText: '10',
            max:10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 1
                },
                {
                    score : 5,
                    value : 2
                },
                {
                    score : 10,
                    value : 3
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.noOfPartnerShip,
        inputField: {
            type: assessmentInputType.select,
            max : 10,
            label: 'No of partnerships Established',
            option: 'partnershipMaster'
        },
        scoreField: {
            maxText: '10',
            max:10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 1
                },
                {
                    score : 5,
                    value : 2
                },
                {
                    score : 10,
                    value : 3
                }
            ]
        }
    }
]

export let SYMRFieldList = [
    {
		fieldKeyName: fieldName.memberType,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            // option : 'shgMemberTypeMaster',
            label: 'Is the applicant, member of an SHG'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 5,
                    value : 0
                },
                {
                    score : 10,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.migrantReturnEarning,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            label: `Migrant returnee an earning member of the household`
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 5,
                    value : 0
                },
                {
                    score : 10,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.membersForSociallyDisadvantagedSections,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            label: `Member from socially disadvantaged sections / ST / SC / Differently abled / Transgender / Vulnerable`
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 0,
                    value : 0
                },
                {
                    score : 5,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.completedOrRegisteredForSociallyDisadvantaged,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            label: `Completed or registered for skill training / EDI program score`
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 5,
                    value : 0
                },
                {
                    score : 10,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.completedEDPProgrames,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            label: `Completed any EDP programmes`
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 0,
                    value : 0
                },
                {
                    score : 5,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.alreadyAppliedNewBusinessActivityLoan,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            label: `Already applied for new business activity loan under existing schemes like Mudra/DIC/etc.`
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 0,
                    value : 0
                },
                {
                    score : 5,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.experienceOfSkilledYouth,
        inputField: { 
            type: assessmentInputType.number,
            label: `Experience of the skilled youth migrant returnee in the proposed trade (in any job role)`,
            option : 'symrExperienceMaster'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 1,
                        max: 3
                    },
                    score: 5
                },
                {
                    range: {
                        min: 3
                    },
                    score: 10
                },
            ]
        }
    },
    {
        fieldKeyName: fieldName.repaymentOfExistingLoan,
        inputField: { 
            type: assessmentInputType.select,
            label: `Repayment of existing Loans (if applicable)*`,
            option : 'symrRepayOfExistingLoanMaster'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 10,
                    value : 1
                },
                {
                    score : 5,
                    value : 2
                },
                {
                    score : 0,
                    value : 3
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.proposedEnterpriseLocationMaster,
        inputField: { 
            type: assessmentInputType.select,
            label: `Proposed enterprise location`,
            option : 'symrProposedEnterpriseLocationMaster'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 2,
                    value : 3
                },
                {
                    score : 5,
                    value : 2
                },
                {
                    score : 10,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.activityEnterpriseProposed ,
        inputField: { 
            type: assessmentInputType.isYesOrNo,
            label: `Activity enterprise proposed : Special / Green / Social enterprises (mask, sanitizer, gloves, sanitary napkin, bio fertilizers, nutritional products, herbal, health products, NTFP, tribal products)`
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 5,
                    value : 0
                },
                {
                    score : 10,
                    value : 1
                }
            ]
        }
    },
    {
        fieldKeyName: fieldName.numberOfPersonExpectedToGetJob,
        inputField: { 
            type: assessmentInputType.percentage,
            max:100,
            label: `Number of persons expected to be provided jobs. Other than entrepreneur`
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 1,
                        max: 2
                    },
                    score: 3
                },
                {
                    range: {
                        min: 2
                    },
                    score: 5
                },
            ]
        }
    },
    {
        fieldKeyName: fieldName.proposedEnterpriseLocationMaster,
        inputField: { 
            type: assessmentInputType.number,
            label: `Partnership created or established/identifed for marketing, raw material, input supply.`
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 1
                    },
                    score: 0
                },
                {
                    range: {
                        min: 1,
                        max: 2
                    },
                    score: 5
                },
                {
                    range: {
                        min: 2
                    },
                    score: 10
                },
            ]
        }
    },
    // {
    //     fieldKeyName: fieldName.CLFVerificationStatus,
    //     inputField: { 
    //         type: assessmentInputType.select,
    //         label: `CLF verification status`,
    //         option : 'CLFVerificationStatus'
    //     },
    //     scoreField: {
    //         maxText: '10',
    //         max: 10
    //     },
    //     scoreCalc: {
    //         type: assessmentInputType.select,
    //         scoreType: [
    //             {
    //                 score : 10,
    //                 value : 1
    //             },
    //             {
    //                 score : 5,
    //                 value : 2
    //             },
    //             {
    //                 score : 0,
    //                 value : 3
    //             }
    //         ]
    //     }
    // }
]


export let PgAssessmentFieldList = [
    {
		"fieldKeyName": fieldName.noOfYearsGroupInvolvedInTheActivity,
        initialKeyName : 'ageOfActvity',
        //Assesment Field
        inputField: { 
            type: assessmentInputType.number,
            label: 'S/he herself is a SHG member or belongs to a SHG household'
        },
        //Score Field
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 1
                    },
                    score: 0
                },
                {
                    range: {
                        min: 1,
                        max: 2
                    },
                    score: 5
                },
                {
                    range: {
                        min: 2
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.noOfActiveMembers,
        initialKeyName : 'noOfActiveMembersInPecent',
        inputField: {
            type: assessmentInputType.number,
            disabled: false,
            label: 'Number of active members (%)'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 10,
                        max: 60
                    },
                    score: 0
                },
                {
                    range: {
                        min: 60,
                        max: 80
                    },
                    score: 5
                },
                {
                    range: {
                        min: 80
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.membersInShgAndShgHouseholds,
        initialKeyName : 'membersInShgAndShgHouseHoldInPercent',
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            disabled: false,
            max : 100,
            label: 'Members in SHG and SHG Households (%)'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 25
                    },
                    score: 0
                },
                {
                    range: {
                        min: 25,
                        max: 50
                    },
                    score: 3
                },
                {
                    range: {
                        min: 50,
                        max: 70
                    },
                    score: 5
                },
                {
                    range: {
                        min: 70,
                        max: 101
                    },
                    score: 10
                }
            ]
        }
    },
    {
        "fieldKeyName": fieldName.noOfWomenMembershipInPg,
        initialKeyName : 'noOfFemaleInPercent',
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            label: 'Total Female members (%)',
            disabled: false,
        },
        scoreField: {
            maxText: '10',
            max : 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 25
                    },
                    score: 0
                },
                {
                    range: {
                        min: 25,
                        max: 50
                    },
                    score: 3
                },
                {
                    range: {
                        min: 50,
                        max: 70
                    },
                    score: 5
                },
                {
                    range: {
                        min: 70,
                        max: 101
                    },
                    score: 10
                }
            ]
        }
    },
    {
		fieldKeyName: fieldName.bankTransactionsAndOperations,
        inputField: {
            type: assessmentInputType.number,
            max:10,
            label: 'No. of bank transactions & operations'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 2
                    },
                    score: 3
                },
                {
                    range: {
                        min: 3,
                        max: 5
                    },
                    score: 6
                },
                {
                    range: {
                        min: 6,
                        max: 11
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.inputServiceProvisionAndSupport,
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            max:100,
            label: 'Input & service provision and support (%)'
        },
        scoreField: {
            maxText: '10',
            max:10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 50
                    },
                    score: 3
                },
                {
                    range: {
                        min: 50,
                        max: 70
                    },
                    score: 5
                },
                {
                    range: {
                        min: 70,
                        max: 101
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.aggrigationAndMarketLinkages,
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            max : 100,
            label: 'Aggregation and market linkages (%)'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 50
                    },
                    score: 3
                },
                {
                    range: {
                        min: 50,
                        max: 70
                    },
                    score: 5
                },
                {
                    range: {
                        min: 70,
                        max: 101
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.specialProducerGroup,
        inputField: {
            type: assessmentInputType.SelectWithIsYesOrNo,
            max : 100,
            label: 'Special producer group (tribal / women headed household / differently abled / green enterprise Mask, Sanitizer, Gloves, Sanitary napkins, Biofertilizers, Herbal products, Nutritional products, NTFP, Tribal produces, Solar etc.., based)'
        },
        scoreField: {
            maxText: '20',
            max: 20
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 10,
                    value : 0
                },
                {
                    score : 20,
                    value : 1
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.areTheBooksOfRecordsMaintained,
        inputField: {
            type: assessmentInputType.isYesOrNo,
            label: 'Are the books of records maintained properly ?',
            option: 'areTheBooksOfRecordsMaintained'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 5,
                    value : 0
                },
                {
                    score : 10,
                    value : 1
                }
            ]
        }
    },
]

export let EgAssessmentFieldList = [
    {
        "fieldKeyName": fieldName.noOfYearsEGGroupInvolvedInTheActivity,
        initialKeyName : 'ageOfActvity',
        //Assesment Field
        inputField: { 
            type: assessmentInputType.number,
            disabled: false,
            label: 'No of years the group is involved in the activity'
        },
        //Score Field
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 0,
                        max: 1
                    },
                    score: 0
                },
                {
                    range: {
                        min: 1,
                        max: 2
                    },
                    score: 5
                },
                {
                    range: {
                        min: 2
                    },
                    score: 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.noOfActiveEgMembers,
        initialKeyName : 'noOfActiveMembersInPecent',
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            disabled: false,
            label: 'Number of active members (%)'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range: {
                        min: 30,
                        max: 60
                    },
                    score: 3
                },
                {
                    range: {
                        min: 60,
                        max: 80
                    },
                    score: 5
                },
                {
                    range: {
                        min: 80
                    },
                    score: 10
                }
            ]
        }
    },
    {
		fieldKeyName: fieldName.percentageCaptialReceivedMembers,
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            max : 100,
            label: 'Share capital received from the member (%):'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range : {
                        min : 0,
                        max : 50
                    },
                    score : 5
                },
                {
                    range : {
                        min : 50,
                        max : 70
                    },
                    score : 7
                },
                {
                    range : {
                        min : 70
                    },
                    score : 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.areTheBooksOfRecordsEgMaintained,
        inputField: {
            type: assessmentInputType.isYesOrNo,
            label: 'Are the books of records maintained properly ?',
            option: 'areTheBooksOfRecordsMaintained'
        },
        scoreField: {
            maxText: '5',
            max: 5
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 0
                },
                {
                    score : 5,
                    value : 1
                }
            ]
        }
    },
    {
        "fieldKeyName": fieldName.noOfWomenMembershipInEg,
        initialKeyName : 'noOfFemaleInPercent',
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            label: 'Women led enterprises (%)',
            max:100,
            disabled: false,
        },
        scoreField: {
            maxText: '10',
            max : 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range : {
                        min : 0,
                        max : 25
                    },
                    score : 0
                },
                {
                    range : {
                        min : 25,
                        max : 50
                    },
                    score : 3
                },
                {
                    range : {
                        min : 50,
                        max : 100
                    },
                    score : 5
                },
                {
                    range : {
                        min : 100
                    },
                    score : 5
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.membersInEgShgAndShgHouseholds,
        initialKeyName : 'membersInShgAndShgHouseHoldInPercent',
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            disabled: false,
            max:100,
            label: 'Members in SHG and SHG Households (%)'
        },
        scoreField: {
            maxText: '05',
            max: 5
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range : {
                        min : 0,
                        max : 100
                    },
                    score : 3
                },
                {
                    range : {
                        min : 100
                    },
                    score : 5
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.UtilizationCommonInfrastaucture,
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            max:100,
            label: 'Utilization of Common Infrastructure (%)'
        },
        scoreField: {
            maxText: '10',
            max:10
        },
        scoreCalc: {
            type: "range",
            rangeValidation: [
                {
                    range : {
                        min : 0,
                        max : 1
                    },
                    score : 0
                },
                {
                    range : {
                        min : 1,
                        max : 25
                    },
                    score : 3
                },
                {
                    range : {
                        min : 25,
                        max : 50
                    },
                    score : 5
                },
                {
                    range : {
                        min : 50,
                        max : 101
                    },
                    score : 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.numberofPartnershipMade,
        inputField: {
            type: assessmentInputType.percentage,
            max : 10,
            label: 'Number of Partnerships made (procurement of raw materials, technical support, market etc.)'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range : {
                        min : 0,
                        max : 1
                    },
                    score : 0
                },
                {
                    range : {
                        min : 1,
                        max : 3
                    },
                    score : 3
                },
                {
                    range : {
                        min : 3,
                        max : 5
                    },
                    score : 5
                },
                {
                    range : {
                        min : 5,
                        max : 11
                    },
                    score : 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.BankTransactionOpertaions,
        inputField: {
            type: assessmentInputType.percentage,
            max : 10,
            label: 'No. of Bank transactions & operations'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range : {
                        min : 1,
                        max : 3
                    },
                    score : 3
                },
                {
                    range : {
                        min : 3,
                        max : 5
                    },
                    score : 5
                },
                {
                    range : {
                        min : 5,
                        max : 11
                    },
                    score : 10
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.ProfitSharingDistributionsAmongMember,
        inputField: {
            type: assessmentInputType.select,
            max : 10,
            option : 'profitSharing',
            label: 'Is there any Profit sharing/ dividend distribution among members as on 31/03/2020'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: assessmentInputType.select,
            scoreType: [
                {
                    score : 3,
                    value : 1
                },
                {
                    score : 5,
                    value : 2
                },
                {
                    score : 10,
                    value : 3
                }
            ]
        }
    },
    {
		"fieldKeyName": fieldName.PortionOperatingCosting,
        inputField: {
            type: assessmentInputType.percentageWithIcon,
            max : 100,
            label: 'What portion of the operating cost is being made from business revenues ? (%)'
        },
        scoreField: {
            maxText: '10',
            max: 10
        },
        scoreCalc: {
            type: 'range',
            rangeValidation: [
                {
                    range : {
                        min : 0,
                        max : 50
                    },
                    score : 0
                },
                {
                    range : {
                        min : 50,
                        max : 70
                    },
                    score : 3
                },
                {
                    range : {
                        min : 70,
                        max : 100
                    },
                    score : 5
                },
                {
                    range : {
                        min : 100
                    },
                    score : 10
                }
            ]
        }
    }
]