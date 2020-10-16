
import React, { useState } from "react";
import { Badge, Collapse, Col } from "reactstrap";
import { toggleRootClassName, history } from 'helpers'
import { getLinksBasedOnRoleId } from 'helpers/roleHandler'
import { connect } from 'react-redux'
import { STAFF_ROLE_ID } from "helpers/variables"

let prefix = "/staff"

const Sidebar = ({ links, location, history, profile, isHomeSidebar }) => {
  const [collapseType, setcollapseType] = useState(false)
  const redirectTo = (pathName) => {
    history.push(prefix + pathName)
  }
  let role = isHomeSidebar ? "home" : profile.role
  // console.log(role,"%%%%%%")
  let filteredLinks = getLinksBasedOnRoleId(role)

  const handleLinkClick = (data, isCollapse) => {
    if (data.onClick) data.onClick();
    else redirectTo(data.routeName)
    if (isCollapse !== undefined) {
      toggleCollapse()
    }
  }
  const toggleCollapse = () => {
    //collapse open or close action
    setcollapseType(!collapseType)
  }

  let roleLevel = profile.role === STAFF_ROLE_ID.BMMU ? "BMMU" : profile.role === STAFF_ROLE_ID.DMMU ? "DMMU" : profile.role === STAFF_ROLE_ID.ADMIN ? "ADMIN" : profile.role === STAFF_ROLE_ID.SMMU ? "SMMU" : profile.role === STAFF_ROLE_ID.CLF ? "CLF" : "NO ROLE";
  let roleLocation = profile.role === STAFF_ROLE_ID.BMMU ? profile?.address?.block?.label : profile.role === STAFF_ROLE_ID.DMMU ? profile?.address?.district?.label : profile.role === STAFF_ROLE_ID.CLF ? profile?.address?.panchayat?.label : "";
  return (
    <>
      <Col md="auto" className="side-nav p-0">
        <aside className="w-100 d-flex flex-column">
          <div className="header">
            <ul className="w-100 list-unstyled">

              <li className="nav-list-menu border-bottom">
                <div className="nav-list-wrapper">
                  <div className="nav-view-icon pl-1">
                    <span className="img-circle"></span>
                  </div>
                  <div className="nav-view-content">
                    <h4 className="fw-800 mb-0 text-darkGrey">CAP - ODISHA</h4>
                    <small>{roleLocation ? roleLocation + "  -" : ""}  {roleLevel}</small>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <ul className="w-100 list-unstyled staff-sidebar custom-scrollbar flex-grow-1">
            <li
              className={`nav-list-menu profile `}
            >
              <div
                className={`nav-list-wrapper`}
              >
                <div className="nav-view-icon">
                  {/* <i className="fa fa-chevron-down small"></i> */}
                </div>
                <div className="nav-view-content">
                  <h5 className="name">{profile.userName}</h5>
                </div>
              </div>
            </li>
            {console.log(filteredLinks, 'filteredLinks')}
            {filteredLinks.map((data, i) => (
              <li
                id={data.togglerName}
                className={`nav-list-menu ${data.className} ${
                  location.pathname.includes(prefix + data.routeName) && !data.subContent && "active"
                  } `}
              >
                {data.subContent !== undefined && data.subContent.length > 0
                  ?
                  <div
                    onClick={() => handleLinkClick(data, true)}
                    className={`nav-list-wrapper ${location.pathname.includes(data.togglerName) ? "bg-primary text-white br-0" : "br-0"}`}
                    data-toggle={collapseType}
                  >
                    <div className="nav-view-icon">
                      <i className={data.iconClass} ></i>
                    </div>
                    <div className="nav-view-content">
                      <h5 className="name">{data.name}</h5>
                      <p className="desc">
                        <small>{data.desc}</small>
                        {data.isNew && (
                          <Badge color="secondary" className="br-1 px-2 px-1 ml-2">
                            New
</Badge>
                        )}
                      </p>
                    </div>
                    {
                      data.subContent ? <i className={`ml-3 fa arrow fa-chevron-${collapseType ? "up" : "down"} small`}></i> : ''
                    }
                  </div>
                  :
                  <div
                    onClick={() => handleLinkClick(data)}
                    className={`nav-list-wrapper ${location.pathname.includes(data.togglerName) ? "bg-primary text-white br-0" : "br-0"}`}
                  >
                    <div className="nav-view-icon">
                      <i className={data.iconClass} ></i>
                    </div>
                    <div className="nav-view-content">
                      <h5 className="name">{data.name}</h5>
                      <p className="desc">
                        <small>{data.desc}</small>
                        {data.isNew && (
                          <Badge color="secondary" className="br-1 px-2 px-1 ml-2">
                            New
                          </Badge>
                        )}
                      </p>
                    </div>
                    {
                      data.subContent ? <i className={`ml-3 fa arrow fa-chevron-${location.pathname.includes(data.togglerName) ? "up" : "down"} small`}></i> : ''
                    }
                  </div>
                }
                {data.subContent ? (
                  <Collapse isOpen={collapseType}>
                    <ul className={`list-unstyled sub-content`}>
                      {data.subContent.map((subData) => {
                        return (
                          <li
                            className={`${location.pathname.includes(subData.routeName) ? 'active' : ''} nav-list-menu`}
                            onClick={() => redirectTo(subData.routeName)}
                          >
                            <div className={`nav-list-wrapper`}>
                              <div className="nav-view-icon">
                                <i className={subData.iconClass}></i>
                              </div>
                              <div className="nav-view-content">
                                <h5 className="name">
                                  {subData.name}
                                  <i className={`ml-3 fa arrow fa-chevron-right small`}></i>
                                </h5>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                    </Collapse>
                ) : (
                    ""
                  )}
              </li>
            ))}
            <div className="modal-backdrop show d-none" onClick={() => toggleRootClassName("open-sidebar")}></div>
          </ul>
        </aside>
      </Col>
      <div className="modal-backdrop show d-none" onClick={() => toggleRootClassName("open-sidebar")}></div>
    </>
  );
}

const mapStateToProps = ({ profile }) => {
  return ({
    profile
  })
}

export default connect(mapStateToProps, null)(Sidebar)