import React from 'react';
import {
    Nav, 
    NavItem, 
    NavLink,
  } from "reactstrap";


const checkIsActive = (selectedValue,activeTab) => {
    let checkIsArray = Array.isArray(selectedValue)
    if(checkIsArray){
        return selectedValue.join('') === activeTab.join('')
    }else return selectedValue === activeTab
}

const BasicTab = (props) => {
    return ( 
        <Nav tabs className={`${props.className}`}>
            {
                props.tabs.map(data => (
                <NavItem>
                    <NavLink
                    className={checkIsActive(data.value,props.activeTab) ? 'active' : ''}
                    onClick={() => props.onChange(props.name,data.value)}
                    >
                    {
                        data.icon ? <i className={`${data.icon} mr-2`}></i> : ''
                    }
                    {data.label}
                    </NavLink>
                </NavItem>
                ))
            }
        </Nav>
     );
}
 
export default BasicTab;

BasicTab.defaultProps={
    tabs:[],
    onChange : () => {},
    name:'',
    activeTab : [],
    className:'custom-tab-theme-1 px-3 '
}