import React from 'react';
const Loader = ({ className }) => {
    return ( 
        <div className={`d-flex align-items-center justify-content-center loader ${className}`}>
            <div class="lds-ripple"><div></div><div></div></div> 
        </div>
    );
    return ''
}
 
export default Loader;