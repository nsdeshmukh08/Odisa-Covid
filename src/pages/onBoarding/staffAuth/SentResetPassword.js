import React, { Component } from 'react'
import { Button } from 'reactstrap';
import SimpleCard from 'component/Cards/onBoarding/SimpleCard'
import FormInput from 'component/inputs/FormInput'
import { Alert   } from 'reactstrap';

export class SentResetPassword extends Component {
    render() {
        return (
            <SimpleCard heading="Kindly reset your password through the link" successMessage="Reset link has been sent to ****j89@gmail.com ">
                <Button color="primary" block onClick={() => this.props.history.push('passwordReset')}>
                    home
                </Button>
            </SimpleCard>
        )
    }
}
