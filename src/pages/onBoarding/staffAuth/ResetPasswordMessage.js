import React,{ useState,useEffect } from 'react'
import { Button,UncontrolledAlert } from 'reactstrap';
import SimpleCard from 'component/Cards/onBoarding/SimpleCard'
// import { Row, Col,UncontrolledAlert } from 'reactstrap';

// import FormInput from 'component/inputs/FormInput'
// import { Link } from 'react-router-dom'
// import validate from 'helpers/validation';
import { axios,API,API_BOOK } from 'service'
// import toast from 'helpers/Toast';

// const DEFAULT_COUNTRY_CODE='91'

// const { SESSION_API } = API_BOOK.ADMIN_MANAGEMENT

export const StaffResetPasswordMessage = ({ history }) => {

    // const [userName,setUserName] = useState()
    // const [errors,setErrors] = useState({})
    // const [loading,setLoading] = useState(false)
    const [cancelToken,setCancelToken] = useState(
        axios.CancelToken.source()
    )
    
    //LIFECYCLE

    useEffect(() => {
		return () => {
			cancelToken.cancel(); //CANCEL THE API REQUEST
		};
    },[])


    const onSubmit = async (e) => {
        e.preventDefault()
        history.push({
            pathname : 'login',
            // search : `?message=${response.data.message}`
        })
    }
    
    return (
        <SimpleCard  className="reset-password">
            {
                new URLSearchParams(history.location.search).get('message') ?
                    <UncontrolledAlert toggle={() => history.replace('login')}className=" d-flex close-btn align-items-center">
                        <i class="icon-success mr-2"></i>
                        <small>{new URLSearchParams(history.location.search).get('message')}</small>
                    </UncontrolledAlert >
                    : ''
            }
            <form onSubmit={onSubmit}>
                <div className="mt-4 px-5 py-3">
                    
                    <h2 className="mb-4">
                        Kindly Reset your Password Through The Link
                    </h2>
                    <Button 
                        color="primary w-100" 
                        className="mb-3 border-none fw-600 fs-18"
                        // disabled={loading}
                    >
                        Home
                    </Button>
                </div>
            </form>
        </SimpleCard>
    );
}