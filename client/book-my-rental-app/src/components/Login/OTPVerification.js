import { useEffect, useState, useRef, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import "./OTPVerification.css";
import LoginCard from "../UI/LoginCard";
import { useUserAuth } from '../../context/UserAuthContext';

const OTPForm = () => {
    const [enteredOTP, setEnteredOTP] = useState(['', '', '', '', '', '']);
    const inputRef = useRef([]);
    const [isVerified, setIsVerified] = useState(false);
    const [isError, setIsError] = useState(false);
    const [customError, setError] = useState("");
    const [isLoginButtonPressed, setLoginButtonPressed] = useState(false);
    const [recaptchaVerified, setRecaptchaVerified] = useState(false);
    const [recaptchaResponse, setRecaptchaResponse] = useState(null);
    const { setUpRecaptcha } = useUserAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const userDetails = location.state.userDetails;
    const phonenumber = location.state?.userDetails.number;
    // console.log(userDetails);

    const loginHandler = async (event) => {
        event.preventDefault();

        const otp = enteredOTP.join("");
        // console.log(otp);
        setError("");

        if (otp === "" || otp === null || otp.length < 6) {
            setIsError(true);
            setError("Invalid OTP");
        }
        try {
            await recaptchaResponse.confirm(otp);
            setLoginButtonPressed(true);
            setIsVerified(true);
            
        } catch (err) {
            setError(err.message);
        }
    };

    const otpChangeHandler = (value, index) => {
        setEnteredOTP(previousValue => {
            const newValue = [...previousValue];
            newValue[index] = value;
            return newValue;
        });

        if (value !== "" && index < enteredOTP.length - 1) {
            inputRef.current[index + 1].focus();
        }
    };

    const backspaceHandler = (event, index) => {
        // Condition to check if the key pressed if the backspace key or not
        if (event.keyCode === 8 && index > 0 && enteredOTP[index] === "" ) {
            inputRef.current[index - 1].focus();
        }
    };

    const getOTP = useCallback(async () => {
        setUpRecaptcha(phonenumber).then((response) => {
            setRecaptchaVerified(true)
            setRecaptchaResponse(response);
        }).catch(error => {
            setIsError(true);
            setError("Invalid OTP");
        });
    }, [setError, phonenumber, setUpRecaptcha]);

    useEffect(() => {
        if (!recaptchaVerified) {
            getOTP();
        }
        if (isLoginButtonPressed) {
            if (isVerified) {
                navigate("/dashboard", {state: {userDetails}});
            } else {
                setIsError(true);
                setError("Invalid OTP");
            }
        }
    }, [isVerified, isLoginButtonPressed, navigate, getOTP, recaptchaVerified, userDetails]);

    return(
        <LoginCard>
                <div className="loginForm">
                    <form onSubmit={loginHandler}>
                        <div className="mainheading">
                            Verify Phone Number
                        </div>
                        <div>
                            <br /> 
                            <span className="content"> Enter the code sent to your </span> 
                            <span className="content"> mobile phone number {phonenumber} to login </span>
                        </div>
                        <br />
                        <div id="recaptcha-container" className="alignDiv" style={{display: recaptchaVerified ? "none" : "flex"}}></div>
                        <br />
                        <div className="alignDiv" style={{ display: recaptchaVerified ? "flex" : "none" }}>
                            {enteredOTP.map((value, index) => {
                                return(
                                    <input
                                        className="inputnum"
                                        key={index}
                                        type="text"
                                        value={value}
                                        onChange={event => otpChangeHandler(event.target.value, index)}
                                        onKeyDown={event => backspaceHandler(event, index)}
                                        maxLength={1}
                                        ref={ref => (inputRef.current[index] = ref)} 
                                        autoComplete="new-password"
                                    />
                                );
                            })}
                        </div>
                        <br /> {isError && <span className="error"> {customError} </span>}
                        <div className="alignDiv">
                            <p> <button type="submit" className="submitButton"> Login </button>  </p>
                        </div>
                    </form>
                </div>
        </LoginCard>
    );
};

export default OTPForm;