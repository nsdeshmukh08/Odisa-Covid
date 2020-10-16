import React from 'react'
import { ThemeContext } from 'helpers'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Switch } from 'component/inputs'
import * as themeActions from 'action/theme'

const LanguageTogglerClass = ({ updateLanguage, languageSelected }) => {

    let toggleLanguage = (languageSelected === 'ENGLISH') ? 'ODISHA' : 'ENGLISH'

    return (
        <div className="d-none d-md-block">
            <div className="d-flex align-items-center">
            {toggleLanguage === "ENGLISH" ? <strong>ଓଡ଼ିଆ &nbsp;</strong> : <strong>English &nbsp;</strong>}
                <Switch
                    checked={languageSelected === 'ODISHA'}
                    onClick={() => {
                        // updateLanguage(toggleLanguage)
                    }}
                />
            </div>
        </div>
    );
}


LanguageTogglerClass.contextType = ThemeContext;

const mapStateToProps = (state) => {
    return state.theme
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(themeActions, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LanguageTogglerClass)