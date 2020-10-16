import React from 'react'
import { Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import SimpleCard from 'component/Cards/onBoarding/SimpleCard'
import FormInput from 'component/inputs/FormInput'

export const Register = () => {
    return (
        <SimpleCard heading="Create New Account">
            <form>
                <FormInput type="mobile" label="Mobile Number" />
                <div className="mt-4">
                    <Link to="generateotp">
                        <Button color="primary w-100" className="mb-3 border-none fw-600 fs-18">Continue</Button>
                    </Link>
                    <Link to="login">
                        <Button color="link" className="text-primary w-100">Already have an Account?</Button>
                    </Link>
                </div>
            </form>
        </SimpleCard>
    );
}
