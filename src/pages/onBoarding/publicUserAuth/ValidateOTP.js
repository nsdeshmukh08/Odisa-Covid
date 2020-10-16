import React, { useEffect, useState, useContext } from "react";
import { Button } from "reactstrap";
import { Link } from "react-router-dom";
import SimpleCard from "component/Cards/onBoarding/SimpleCard";
import FormInput from "component/inputs/FormInput";
import validate from "helpers/validation";
import { axios, API, API_BOOK } from "service";
import toast from "helpers/Toast";
import { ThemeContext } from "helpers";

const { SESSION_API } = API_BOOK.USER_MANAGEMENT;

export const ValidateOTP = ({ history, location }) => {
  const [otp, setOtp] = useState("");
  const [mobile, setMobile] = useState();
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const theme = useContext(ThemeContext);
  const [cancelToken, setCancelToken] = useState(axios.CancelToken.source());

  useEffect(() => {
    const { state } = location;
    if (!state) history.push("/auth/user/login");
    else if (!mobile) {
      setMobile(state.mobile);
    }
    return () => {
      cancelToken.cancel(); //CANCEL THE API REQUEST
    };
  }, []);

  useEffect(() => {
    setErrors({});
  }, [otp]);

  const onSuccess = () => {
    let { state } = location;
    let pathname = "";
    if (state.flow === "FORGOT_PASSWORD")
      pathname = "/auth/user/changePassword";
    else pathname = "/auth/user/setPassword";
    history.push({
      pathname,
      state: {
        mobile: state.mobile,
      },
    });
  };

  //RESET

  const reset = () => {
    setOtp();
  };

  //ON SUBMIT

  const onSubmit = async (e) => {
    e.preventDefault();
    let params = { otp, mobile };
    const notValid = validate(params, inputValidations);
    if (notValid) {
      setErrors({ ...notValid });
    } else {
      setLoading(true);
      let requestPayload = {
        ...SESSION_API.VALIDATE_OTP,
        params,
        cancelToken: cancelToken.token,
      };
      let response = await API(requestPayload);
      if (response.status === 200) {
        onSuccess();
      } else {
        toast(response.data.message, "error");
        reset();
      }
      setLoading(false);
    }
  };

  const resendOTP = async (e) => {
    e.preventDefault();
    let data = { mobile };
    let { state } = location;
    let requestPayload = {};
    if (state.flow === "FORGOT_PASSWORD") {
      requestPayload = { ...SESSION_API.FORGOT_PASSWORD, data };
    } else {
      requestPayload = { ...SESSION_API.SEND_OTP, params: { mobile } };
    }
    setLoading(true);
    requestPayload = {
      ...requestPayload,
      cancelToken: cancelToken.token,
    };
    let response = await API(requestPayload);
    if (response.status === 200) {
      toast(response.data.message, "success");
      setLoading(false);
    }
  };

  return (
    <SimpleCard>
      <form onSubmit={onSubmit}>
        <div className="d-flex align-items-center justify-content-between flex-wrap">
          <h5 className="text-darkGrey-2 mb-4 position-relative">
            {theme["OTP_HAS_BEEN_SENT_TO"]}&nbsp;
            <b className="text-darkGrey-2">{mobile}</b>
          </h5>
          <Link
              href="#"
              className={`${loading ? "pointer-event-none mb-4" : "mb-4"}`}
              onClick={resendOTP}
              disabled={loading}
            >
              {theme["RESENT_OTP"]}
            </Link>
        </div>

        <FormInput
          type="number"
          label="OTP"
          name="otp"
          onChange={(name, value) => setOtp(value)}
          value={otp}
          maxLength="5"
          error={errors["otp"]}
        />
        <div className="mt-5">
          <Button
            color="primary w-100"
            className="mb-3 border-none fw-600 fs-18"
            type="submit"
            disabled={loading}
          >
            {theme["VERIFY"]}
          </Button>
          <Button
            color="link w-100"
            className="fs-18"
            onClick={() => history.push("Register")}
            disabled={loading}
          >
            {theme["CHANGE_NUMBER"]}
          </Button>
        </div>
      </form>
    </SimpleCard>
  );
};

const inputValidations = {
  otp: {
    presence: {
      allowEmpty: false,
      message: "^OTP number can't be blank",
    },
    length: {
      minimum: 5,
      maximum: 5,
      message: "^Enter valid OTP",
    },
  },
};
