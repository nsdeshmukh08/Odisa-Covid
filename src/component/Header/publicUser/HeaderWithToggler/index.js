import React from 'react'
import Toggler from 'component/LanguageToggler'

const Heading = ({ name }) => <h1 className="fw-900 mb-3">{name}</h1>

const FlexContainer = ({ children }) => {
    return (
        <div className="d-flex justify-content-between align-content-center mb-3">
            {children}
        </div>
    )
}

export const HeaderWithToggler = ({ withFlexContainer=false, name, showToggler=false }) => {
    return (
        withFlexContainer ?
            <FlexContainer>
                <Heading name={name} />
                {showToggler ? <Toggler/>  : ''}
            </FlexContainer>
            : <Heading name={name} />
    );
}
