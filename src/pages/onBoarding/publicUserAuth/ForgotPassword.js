import React,{ useState,useEffect,useContext } from 'react'
import { Button } from 'reactstrap';
import SimpleCard from 'component/Cards/onBoarding/SimpleCard'
import FormInput from 'component/inputs/FormInput'
import { Link } from 'react-router-dom'
import validate from 'helpers/validation';
import { axios,API,API_BOOK } from 'service'
import toast from 'helpers/Toast';
import { ThemeContext } from 'helpers'

const DEFAULT_COUNTRY_CODE='91'

const { SESSION_API } = API_BOOK.USER_MANAGEMENT

export const ForgotPassword = ({ history }) => {

    const [mobile,setMobile] = useState('')
    // const [countryCode,setCountryCode] = useState(DEFAULT_COUNTRY_CODE)
    const [errors,setErrors] = useState({})
    const [loading,setLoading] = useState(false)
    const theme = useContext(ThemeContext)
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
        if(errors.mobile)
        setErrors({})
    },[mobile])

    //RESET

    const reset = () => {
        setMobile()
        setErrors({})
    }
    
    //ON SUBMIT

    const onSubmit = async (e) => {
        e.preventDefault()
        let data = { mobile }
        const notValid = validate(data, inputValidations);
        if(notValid){
            setErrors({...notValid})
            toast('Enter the mobile number','error')
        }else{
            setLoading(true)
            data['mobile'] = data['mobile']
            let requestPayload = {
                ...SESSION_API.FORGOT_PASSWORD,
                data,
                cancelToken:cancelToken.token
            }
            let response = await API(requestPayload)
            if(response.status === 200){
                history.push({
                    pathname : '/auth/user/validateOTP',
                    state : {
                        mobile: data.mobile,
                        flow : 'FORGOT_PASSWORD'
                    }
                })
            }else{
                toast(response.data.message,'error')
                reset()
            }
        }
    }
    
    return (
        <SimpleCard heading={theme['FORGOT_PASSWORD']}>
            <form onSubmit={onSubmit}>
                <FormInput 
                    type="mobile" 
                    label="Mobile Number" 
                    onCountryCodeChange={
                        (value) => this.handleChange(
                            'countryCode',
                            value
                        )
                    }
                    error={errors.mobile}
                    placeholder="Enter Mobile number"
                    value={mobile}  
                    onChange={(name,value) => setMobile(value)}
                    maxLength={10}
                />
                <div className="mt-4">
                    <Button color="primary w-100" className="mb-3 border-none fw-600 fs-18">
                        {
                            theme["CONTINUE"]
                        }
                    </Button>
                </div>
            </form>
        </SimpleCard>
    );
}

const inputValidations = {
    mobile: {
        presence: {
            allowEmpty: false,
            message: "^Mobile Number can't be blank"
        },
        numericality: {
            onlyInteger: true,
            message: "^Provide a valid Mobile Number"
        },
        length: {
            minimum: 10,
            maximum: 10,
            message: "^Provide a valid Mobile Number"
        },
    }
  };