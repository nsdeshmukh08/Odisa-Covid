import React, { useState,useEffect } from "react";
import { Button } from "reactstrap";
import SimpleCard from "component/Cards/onBoarding/SimpleCard";
import FormInput from "component/inputs/FormInput";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";

const { SESSION_API } = API_BOOK.ADMIN_MANAGEMENT;

export const PasswordReset = ({ history,location }) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [userName, setUserName] = useState();
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false)
  const [cancelToken,setCancelToken] = useState(
    axios.CancelToken.source()
)

  //LIFECYCLE

  useEffect(() => {
    const { state } = location
  if (!state) history.push("/auth/staff/login");
  else if(!userName){
    setUserName(state.userName)
  }
  return () => {
    cancelToken.cancel(); //CANCEL THE API REQUEST
  };
}, []);

  const reset = () => {
      setPassword()
      setConfirmPassword()
      setErrors({})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = { password, confirmPassword,userName };
    const notValid = validate(data, inputValidations);
    if (notValid) {
      setErrors({ ...notValid });
    } else {
      setLoading(true);
      data['confirmPassword'] = undefined
      console.log(SESSION_API)
      let requestPayload = {
        ...SESSION_API.CHANGE_STAFF_PASSWORD_API,
        data,
        cancelToken: cancelToken.token,
      };
      let response = await API(requestPayload);
      if (response.status === 200) {
        setLoading(false)
        history.replace({
            pathname:`login`,
            search :`?message=${response.data.message}`
        })
      } else {
        toast(response.data.message, "error");
        reset();
      }
    }
  };

  console.log(location)

  return (
    <SimpleCard heading="Password Reset">
      <form onSubmit={onSubmit}>
        <FormInput
          type="password"
          label="Password"
          name="password"
          error={errors["password"]}
          onChange={(name, value) => setPassword(value)}
        />
        <FormInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          error={errors["confirmPassword"]}
          onChange={(name, value) => setConfirmPassword(value)}
        />
        <div className="mt-5">
          <Button
            color="primary w-100"
            className="mb-3 border-none fw-600 fs-18"
            type="submit"
            disabled={loading}
          >
            Reset
          </Button>
        </div>
      </form>
    </SimpleCard>
  );
};

const inputValidations = {
  password: {
    presence: {
      allowEmpty: false,
      message: "^Password can't be blank",
    },
    validateStaffPassword : true
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: "^Confirm password can't be blank",
    },
    equality: "password",
  },
};
