import React from 'react'

export const Switch = ({checked=false,onClick}) => {
    return ( 
        <label class="custom-switch" >
            <input type="checkbox" checked={checked} onChange={onClick}/>
            <span className="slider round"></span>
        </label>
    );
}