import React, { useState,useEffect,useContext } from "react";
import { Button } from "reactstrap";
import SimpleCard from "component/Cards/onBoarding/SimpleCard";
import FormInput from "component/inputs/FormInput";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { ThemeContext } from 'helpers'

const { SESSION_API } = API_BOOK.USER_MANAGEMENT;

export const ChangePassword = ({ history,location }) => {
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [mobile, setMobile] = useState();
  const [errors, setErrors] = useState({});
  const [loading,setLoading] = useState(false)
  const theme = useContext(ThemeContext)
  const [cancelToken,setCancelToken] = useState(
    axios.CancelToken.source()
)

  //LIFECYCLE

  useEffect(() => {
    const { state } = location
  if (!state) history.push("/auth/user/login");
  else if(!mobile){
          setMobile(state.mobile)
  }
  return () => {
    cancelToken.cancel(); //CANCEL THE API REQUEST
  };
}, []);

  useEffect(() => {
    const { state } = location
  if (!state) history.push("/auth/user/login");
  return () => {
    cancelToken.cancel(); //CANCEL THE API REQUEST
  };
}, []);

useEffect(() => {
  setErrors({})
}, [password,confirmPassword]);

  const reset = () => {
      setPassword()
      setConfirmPassword()
      setErrors({})
  }

  const onSubmit = async (e) => {
    e.preventDefault();
    let data = { password, confirmPassword,mobile };
    const notValid = validate(data, inputValidations);
    if (notValid) {
      setErrors({ ...notValid });
    } else {
      setLoading(true);
      data['confirmPassword'] = undefined
      let requestPayload = {
        ...SESSION_API.CHANGE_PASSWORD,
        data,
        cancelToken: cancelToken.token,
      };
      let response = await API(requestPayload);
      if (response.status === 200) {
        setLoading(false)
        toast(response.data.message,'success')
        history.replace('login')
      } else {
        toast(response.data.message, "error");
        reset();
      }
    }
  };

  return (
    <SimpleCard heading={theme["CHANGE_PASSWORD"]}>
      <form onSubmit={onSubmit}>
        <FormInput
          type="password"
          label="Password"
          name="password"
          maxLength="6"
          value={password}
          error={errors["password"]}
          onChange={(name, value) => setPassword(value)}
        />
        <FormInput
          type="password"
          label="Confirm Password"
          name="confirmPassword"
          value={confirmPassword}
          maxLength="6"
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
            {
              theme["VERIFY"]
            }
          </Button>
          <Button color="link w-100" className="fs-18" disabled={loading}>
            {
              theme["CHANGE_NUMBER"]
            }
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
    validatePassword : true
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: "^Confirm password can't be blank",
    },
    equality: "password",
    validatePassword : true
  },
};
