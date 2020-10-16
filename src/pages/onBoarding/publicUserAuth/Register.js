import React, { useState, useEffect,useContext } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import SimpleCard from "component/Cards/onBoarding/SimpleCard";
import FormInput from "component/inputs/FormInput";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { ThemeContext } from 'helpers'

// const DEFAULT_COUNTRY_CODE = "91";

const { SESSION_API } = API_BOOK.USER_MANAGEMENT;

export const Register = ({ history }) => {
  const [mobile, setMobile] = useState('');
  // const [countryCode, setCountryCode] = useState(DEFAULT_COUNTRY_CODE);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());
  const theme = useContext(ThemeContext)
  //LIFECYCLE

  useEffect(() => {
    return () => {
      cancelToken.cancel(); //CANCEL THE API REQUEST
    };
  }, []);

  useEffect(() => {
    if (errors.mobile) setErrors({});
  }, [mobile]);

  //RESET
  const reset = () => {
    setErrors({});
    setMobile();
    setLoading(false);
  };

  //ON SUBMIT

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = { mobile };
    const notValid = validate(data, inputValidations);
    if (notValid) {
      setErrors({ ...notValid });
      toast("Enter the mobile number", "error");
    } else {
      setLoading(true);
      data["mobile"] =  data["mobile"];
      let requestPayload = {
        ...SESSION_API.REGISTER_SEND_OTP,
        params:data,
        cancelToken: cancelToken.token,
      };
      let response = await API(requestPayload);
      if (response.status === 200) {
        history.push({
          pathname: "/auth/user/validateOTP",
          state: {
            mobile: data.mobile,
            flow: "REGISTER",
          },
        });
      } else {
        toast(response.data.message, "error");
        reset();
      }
    }
  };



  return (
    <SimpleCard heading={theme["CREATE_NEW_ACCOUNT"]}>
      <form onSubmit={onSubmit}>
        <FormInput
          type="mobile"
          label="Mobile Number"
          // onCountryCodeChange={setCountryCode}
          error={errors.mobile}
          placeholder="Enter Mobile number"
          value={mobile}
          onChange={(name, value) => setMobile(value)}
          maxLength={10}
        />
        <div className="mt-4">
          <Button
            color="primary w-100"
            type="submit"
            className="mb-3 border-none fw-600"
          >
            { theme["CONTINUE"] }
          </Button>
          <Link to="login">
            <Button color="link" className="text-primary w-100">
  {theme["ALREADY_HAVE_AN_ACCOUNT"]}?
            </Button>
          </Link>
        </div>
      </form>
    </SimpleCard>
  );
};

const inputValidations = {
  mobile: {
    presence: {
      allowEmpty: false,
      message: "^Mobile Number can't be blank",
    },
    numericality: {
      onlyInteger: true,
      message: "^Provide a valid Mobile Number",
    },
    length: {
      minimum: 10,
      maximum: 10,
      message: "^Provide a valid Mobile Number",
    },
  },
};
