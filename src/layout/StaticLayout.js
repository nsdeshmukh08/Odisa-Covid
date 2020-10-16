import React, { Component } from 'react'

export class StaticLayout extends Component {

    render() {

        let { children } = this.props

        return (
            <>
                {children}
            </>
        )
    }
}
