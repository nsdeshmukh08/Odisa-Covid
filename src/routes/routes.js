const routers = [
  {
    path: '/',
    redirect: 'user',
    exact: true,
  },
  {
    component: 'StaticLayout',
    path: '/auth/user',
    auth: false,
    exact: false,
    redirect: '/auth/user/login',
    childrens: [
      {
        component: 'Login',
        path: '/login',
        auth: false,
        exact: true,
      },
      {
        component: 'Register',
        path: '/register',
        auth: false,
        exact: true,
      },
      {
        component: 'ForgotPassword',
        path: '/forgotPassword',
        auth: false,
        exact: true,
      },
      {
        component: 'ValidateOTP',
        path: '/validateOTP',
        auth: false,
        exact: true,
      },
      {
        component: 'ChangePassword',
        path: '/changePassword',
        auth: false,
        exact: true,
      },
      {
        component: 'SetPassword',
        path: '/setPassword',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'StaticLayout',
    path: '/auth/staff',
    auth: false,
    exact: false,
    redirect: '/auth/staff/login',
    childrens: [
      {
        component: 'StaffLogin',
        path: '/login',
        auth: false,
        exact: true,
      },
      {
        component: 'StaffVerifyDetails',
        path: '/verifyDetails',
        auth: false,
        exact: true,
      },
      {
        component: 'StaffPasswordReset',
        path: '/passwordReset',
        auth: false,
        exact: true,
      },
      {
        component: 'StaffSentResetPassword',
        path: '/sentResetPasswordLink',
        auth: false,
        exact: true,
      },
      {
        component: 'StaffForgotPassword',
        path: '/forgotPassword',
        auth: false,
        exact: true,
      },
      {
        component: 'StaffResetPasswordMessage',
        path: '/resetPasswordMessage',
        auth: false,
        exact: true,
      },
      {
        component: 'StaffForgotUserId',
        path: '/forgotUserId',
        auth: false,
        exact: true,
      },
      {
        component: 'GenerateOtp',
        path: '/generateotp',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'UserLayout',
    path: '/user',
    redirect: '/auth/user/login',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'UserDashboard',
        path: '/dashboard',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'UserApplicationLayout',
    path: '/application/productiveCollective',
    redirect: '/application/productiveCollective/section/1',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'ProductiveCollectiveForm',
        path: '/section/:stage',
        auth: false,
        exact: false,
      },
      {
        component: 'ProductiveCollectiveReview',
        path: '/review',
        auth: false,
        exact: true,
      },
      {
        component: 'View',
        path: '/view/:formId',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'UserApplicationLayout',
    path: '/application/symr',
    redirect: '/application/symr/section/1',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'SYMRProductiveCollectiveForm',
        path: '/section/:stage',
        auth: false,
        exact: false,
      },
      {
        component: 'SYMRProductiveCollectiveReview',
        path: '/review',
        auth: false,
        exact: true,
      },
      {
        component: 'SYMRView',
        path: '/view/:formId',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'UserApplicationLayout',
    path: '/application/individualEnterprise',
    redirect: '/application/individualEnterprise/section/1',
    auth: true,
    exact: false,
    childrens: [
      // {
      //     component: 'UnderConstruction',
      //     path: '/comingSoon',
      //     auth: false,
      //     exact: false
      // }
      {
        component: 'IndividualEnterpriseForm',
        path: '/section/:stage',
        auth: false,
        exact: false,
      },
      {
        component: 'IndividualEnterpriseReview',
        path: '/review',
        auth: false,
        exact: true,
      },
      {
        component: 'ieView',
        path: '/view/:formId',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'UserApplicationLayout',
    path: '/application/diffabledVulnerable',
    redirect: '/application/diffabledVulnerable/section/1',
    auth: true,
    exact: false,
    childrens: [
      // {
      //     component: 'UnderConstruction',
      //     path: '/comingSoon',
      //     auth: false,
      //     exact: false
      // }
      {
        component: 'DiffabledVulnerableForm',
        path: '/section/:stage',
        auth: false,
        exact: false,
      },
      {
        component: 'DiffabledVulnerableReview',
        path: '/review',
        auth: false,
        exact: true,
      },
      {
        component: 'diffabledView',
        path: '/view/:formId',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'UserApplicationLayout',
    path: '/application/producerGroup',
    redirect: '/application/producerGroup/section/1',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'ProducerGroupForm',
        path: '/section/:stage',
        auth: false,
        exact: false,
      },
      {
        component: 'ProducerGroupReview',
        path: '/review',
        auth: false,
        exact: true,
      },
      {
        component: 'PgView',
        path: '/view/:formId',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'UserApplicationLayout',
    path: '/application/enterpriseGroup',
    redirect: '/application/enterpriseGroup/section/1',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'EnterpriseGroupForm',
        path: '/section/:stage',
        auth: false,
        exact: false,
      },
      {
        component: 'EnterpriseGroupReview',
        path: '/review',
        auth: false,
        exact: true,
      },
      {
        component: 'egView',
        path: '/view/:formId',
        auth: false,
        exact: true,
      },
    ],
  },
  {
    component: 'StaffLayout',
    path: '/staff',
    auth: false,
    exact: false,
    childrens: [
      {
        component: 'StaffDashboard',
        path: '/dashboard',
        auth: true,
        exact: true,
      },
      {
        component: 'Funds',
        path: '/dashboard/funds/chartSection/:tabNumber',
        auth: true,
        exact: false,
      },
      {
        component: 'Enterprises',
        path: '/dashboard/enterprises/chartSection/:tabNumber',
        auth: true,
        exact: false,
      },
      {
        component: 'Beneficiaries',
        path: '/dashboard/beneficiaries/chartSection/:tabNumber',
        auth: true,
        exact: false,
      },
      {
        component: 'Applications',
        path: '/dashboard/applications/chartSection/:tabNumber',
        auth: true,
        exact: false,
      },
      {
        component: 'Home',
        path: '/home',
        auth: true,
        exact: false,
      },
      {
        component: 'Reports',
        path: '/reports',
        auth: true,
        exact: false,
      },
      {
        component: 'UserManagement',
        path: '/userManagement',
        auth: true,
        exact: false,
      },
      {
        component: 'ProducerCollectiveApplication',
        path: '/application/producer-collective',
        auth: true,
        exact: false,
      },
      {
        component: 'SYMRApplication',
        path: '/application/SYMR',
        auth: true,
        exact: false,
      },
      {
        component: 'ProducerGroupApplication',
        path: '/application/producer-group',
        auth: true,
        exact: false,
      },
      {
        component: 'UnderConstruction',
        path: '/underConstruction',
        auth: true,
        exact: false,
      },
      {
        component: 'EnterpriseGroupApplication',
        path: '/application/enterpriseGroup',
        auth: true,
        exact: false,
      },
      {
        component: 'IndividualEnterpriseApplication',
        path: '/application/individualEnterprise',
        auth: true,
        exact: false,
      },
    ],
  },
  {
    component: 'StaticLayout',
    path: '/add',
    auth: true,
    exact: false,
    childrens: [
      {
        component: 'Assessment',
        path: '/assessment/:type/:formId',
        auth: true,
        exact: true,
      },
      {
        component: 'PcServiceAndBlockMembers',
        path: '/PC-service/:formId',
        auth: true,
        exact: true,
      },
      {
        component: 'ProjectCoverageAndMembers',
        path: '/PC-coverage/:formId',
        auth: true,
        exact: true,
      },
      {
        component: 'CreateUser',
        path: '/user',
        auth: false,
        exact: true,
      },
      {
        component: 'FirstLevelAssessment',
        path: '/firstlevelassessment',
        auth: true,
        exact: true
    },
    ],
  },
];
       

export default routers;
