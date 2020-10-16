import React,{ useState,useEffect } from 'react'
import { Button } from 'reactstrap';
import SimpleCard from 'component/Cards/onBoarding/SimpleCard'
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom'
import validate from 'helpers/validation';
import { axios,API,API_BOOK } from 'service'
import toast from 'helpers/Toast';

const DEFAULT_COUNTRY_CODE='91'

const { SESSION_API } = API_BOOK.ADMIN_MANAGEMENT

export const ForgotUserId = ({ history }) => {

    const [emailId,setEmailId] = useState()
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)
    const [cancelToken,setCancelToken] = useState(
        axios.CancelToken.source()
    )
    
    //LIFECYCLE

    useEffect(() => {
		return () => {
			cancelToken.cancel(); //CANCEL THE API REQUEST
		};
    },[])

    useEffect(() => {
        if(errors.emailId)
        setErrors({})
    },[emailId])

    //RESET

    const reset = () => {
        setEmailId()
        setErrors({})
    }
    
    //ON SUBMIT

    const onSubmit = async (e) => {
        e.preventDefault()
        let data = { emailId }
        const notValid = validate(data, inputValidations);
        if(notValid){
            setErrors({...notValid})
        }else{
            setLoading(true)
            let requestPayload = {
                ...SESSION_API.FORGOT_USER_NAME_API,
                params:data,
                cancelToken:cancelToken.token
            }
            let response = await API(requestPayload)
            if(response.status === 200){
                history.push({
                    pathname : 'login',
                    search : `?message=${response.data.message}`
                })
            }else{
                toast(response.data.message,'error')
                reset()
            }
        }
    }
    
    return (
        <SimpleCard heading="Forgot User Id">
            <form onSubmit={onSubmit}>
                <FormInput 
                    type="email" 
                    label="Linked Email Id" 
                    name="emailId"
                    error={errors.emailId}
                    value={emailId}  
                    onChange={(name,value) => setEmailId(value)}
                />
                <div className="mt-4">
                    <Button color="primary w-100" className="mb-3 border-none fw-600 fs-18">Continue</Button>
                </div>
            </form>
        </SimpleCard>
    );
}

const inputValidations = {
    emailId: {
        presence: {
            allowEmpty: false,
            message: "^Email id can't be blank"
        },
        email: true
    }
  };