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

export const ForgotPassword = ({ history }) => {

    const [userName,setUserName] = useState()
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
        if(errors.userName)
        setErrors({})
    },[userName])

    //RESET

    const reset = () => {
        setUserName()
        setErrors({})
    }
    
    //ON SUBMIT

    const onSubmit = async (e) => {
        e.preventDefault()
        let data = { userName }
        const notValid = validate(data, inputValidations);
        if(notValid){
            setErrors({...notValid})
        }else{
            setLoading(true)
            let requestPayload = {
                ...SESSION_API.STAFF_FORGOT_PASSWORD,
                params:data,
                cancelToken:cancelToken.token
            }
            let response = await API(requestPayload)
            if(response.status === 200){
                history.push({
                    pathname : 'resetPasswordMessage',
                    search : `?message=${response.data.message}`
                })
            }else{
                toast(response.data.message,'error')
                reset()
            }
        }
    }
    
    return (
        <SimpleCard heading="Forgot Password">
            <form onSubmit={onSubmit}>
                <FormInput 
                    type="text" 
                    label="User Id" 
                    error={errors.userName}
                    value={userName}  
                    onChange={(name,value) => setUserName(value)}
                />
                <div className="mt-4">
                    <Button 
                        color="primary w-100" 
                        className="mb-3 border-none fw-600 fs-18"
                        disabled={loading}
                    >
                        Continue
                    </Button>
                </div>
            </form>
        </SimpleCard>
    );
}

const inputValidations = {
    userName: {
        presence: {
            allowEmpty: false,
            message: "^User Id can't be blank"
        }
    }
  };