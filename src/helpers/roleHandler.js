import { STAFF_ROLES } from './variables'
import { history } from 'helpers'
//STAFF

//SIDEBAR
const TotalLinks = [
    {
        name: "Dashboard",
        routeName: '/dashboard',
        // desc: "Funds Released - 2.5 Cr",
        iconClass: "icon-dashboard",
        activeFilterName: 'dashboard'
    },
    {
        name: "CAP Applications",
        // desc: 'Open - 06',
        iconClass: "icon-doc",
        isNew: false,
        routeName: '/application/producer-collective',
        activeFilterName: 'application',
        togglerName: "/application",
        subContent: [],
    },
    {
        name: 'Grievance Redressal',
        // desc: 'Open - 06',
        iconClass: 'icon-email',
        activeFilterName: 'grievance'
    },
    {
        name: 'Reports',
        // desc: 'Target - 75%',
        routeName: '/reports',
        activeFilterName: 'reports',
        iconClass: 'icon-sales'
    },
    {
      name: 'Home',
      routeName: '/home',
      activeFilterName: 'home',
      iconClass: 'fa fa-home'
    },
    {
      name: 'Settings',
      iconClass: 'icon-settings',
      activeFilterName: 'settings',
      routeName: '#',
      active: false,
    },
    {
        name: "User Management",
        iconClass: "icon-profile",
        active: true,
        routeName: '/userManagement',
        activeFilterName: 'userManagement'
    },
    {
        name: "Logout",
        className: "mt-auto",
        iconClass: "fa fa-sign-out",
        activeFilterName: 'logout',
        onClick: () => {
            localStorage.clear();
            history.replace("/auth/staff/login");
        },
    },
]


let roleBasedCADLinks = {
    2 : [
      {
        name: "Producer Collectives",
        iconClass: "icon-eye",
        routeName: "/application/producer-collective",
      },
      {
        name: "Producer Group",
        iconClass: "icon-eye",
        routeName: "/application/producer-group",
      },
      {
        name: "Individual Enterprise",
        iconClass: "icon-eye",
        routeName: "/application/individualEnterprise",
      },
      {
        name: "Enterprise Group",
        iconClass: "icon-eye",
        routeName: "/application/enterpriseGroup",
      },
      // {
      //   name: "Vulnerable/DA",
      //   iconClass: "icon-eye",
      //   routeName: "/application/DA",
      // },
      {
        name: "Skilled Youth Migrant",
        iconClass: "icon-eye",
        routeName: "/application/SYMR",
      },
    ],
    3 : [
        {
          name: "Producer Collectives",
          iconClass: "icon-premium",
          routeName: "/application/producer-collective",
        },
        {
          name: "Producer Group",
          iconClass: "icon-premium",
          routeName: "/application/producer-group",
        },
        // {
        //   name: "Individual Enterprise",
        //   iconClass: "icon-eye",
        //   routeName: "/application/individualEnterprise",
        // },
        {
          name: "Enterprise Group",
          iconClass: "icon-premium",
          routeName: "/application/enterpriseGroup",
        },
        // {
        //   name: "Vulnerable/DA",
        //   iconClass: "icon-eye",
        //   routeName: "/application/DA",
        // },
        {
          name: "Skilled Youth Migrant",
          iconClass: "icon-eye",
          routeName: "/application/SYMR",
        },
      ],
    4 : [
        {
          name: "Producer Collectives",
          iconClass: "icon-eye",
          routeName: "/application/producer-collective",
        },
        {
          name: "Producer Group",
          iconClass: "icon-premium",
          routeName: "/application/producer-group",
        },
        // {
        //   name: "Individual Enterprise",
        //   iconClass: "icon-eye",
        //   routeName: "/application/individualEnterprise",
        // },
        {
          name: "Enterprise Group",
          iconClass: "icon-premium",
          routeName: "/application/enterpriseGroup",
        },
        // {
        //   name: "Vulnerable/DA",
        //   iconClass: "icon-eye",
        //   routeName: "/application/DA",
        // },
        {
          name: "Skilled Youth Migrant",
          iconClass: "icon-eye",
          routeName: "/application/SYMR",
        },
      ],
      5 : [
        {
          name: "Individual Enterprise",
          iconClass: "icon-eye",
          routeName: "/application/individualEnterprise",
        },
      ],
      6 : [
        // {
        //   name: "Vulnerable/DA",
        //   iconClass: "icon-premium",
        //   routeName: "#",
        // },
        {
          name: "Skilled Youth Migrant",
          iconClass: "icon-premium",
          routeName: "/application/SYMR",
        },
      ],
      get : function(roleId) {
        if(this[roleId])
            return this[roleId]
        else return []
    }
}

let roleBasedLinks = {
    1 : ['profile','userManagement','logout'],
    5 : ['profile',"reports",'application','logout'],
    6 : ['profile',"reports",'application','logout'],
    "home":['profile','home',"settings",'logout'],
    'default' : ['profile','dashboard','application','reports','logout'],
    get : function(roleId) {
      // console.log(roleId,":" ,this[roleId])
        if(this[roleId])
            return this[roleId]
        else return this['default']
    }
}
 

export const getLinksBasedOnRoleId = (roleId=1) => {
  // console.log(roleId,"*************")
    let links = roleBasedLinks.get(roleId)
    console.log(links,"links")
    let filteredLink = TotalLinks.filter(data => links.includes(data.activeFilterName))
    if(roleBasedCADLinks.get(roleId).length){
        let CADApplicationIndex = filteredLink.findIndex(data => data.activeFilterName === 'application')
        if(CADApplicationIndex >= 0){
          filteredLink[CADApplicationIndex].subContent = roleBasedCADLinks.get(roleId)
          filteredLink[CADApplicationIndex]['routeName'] = filteredLink[CADApplicationIndex].subContent[0].routeName
        }
    }
    return filteredLink
}

//END SIDEBAR