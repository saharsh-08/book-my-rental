import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
// import { auth } from "../../firebase";

import LoginCard from '../UI/LoginCard';
import UserVerification from './UserVerification';


const LoginForm = () => {
    const [enteredEmail, setEnteredEmail] = useState("");
    const [enteredPassword, setEnteredPassword] = useState("");
    const [userDetails, setUserDetails] = useState({});
    const [isVerified, setIsVerified] = useState(false);
    const [isError, setIsError] = useState(false);
    const [customError, setError] = useState("");
    const [isSubmitButtonPressed, setSubmitButtonPressed] = useState(false);
    const navigate = useNavigate();

    const emailChangeHandler = (event) => {
        setEnteredEmail(event.target.value);
    }

    const pwdChangeHandler = (event) => {
        setEnteredPassword(event.target.value);
    }

    const submitHandler = (event) => {
        event.preventDefault();

        const loginData = {
            email: enteredEmail,
            password: enteredPassword
        };

        // console.log(loginData);
        // console.log(UserVerification(loginData));

        UserVerification(loginData).then(verified => {
            // verified[1] contains details of user returned from server
            // console.log(verified[1].number);
            setIsVerified(verified[0]);
            setUserDetails(verified[1]);
            setSubmitButtonPressed(true);
            setEnteredPassword("");
        }).catch(error => {
            console.log(error.message);
            setIsError(true);
            setError("Invalid Login Credentials");
        });

        // console.log(isVerified);
    };

    useEffect(() => {
        if (isSubmitButtonPressed) {
            if(isVerified) {
                setEnteredEmail("");
                navigate("/otp-verification", {state: {userDetails}});
            } else {
                setIsError(true);
                setError("Invalid Login Credentials");
            } 
        }
    }, [isVerified, isSubmitButtonPressed, userDetails, navigate]);

    const resetPasswordHandler = (event) => {
        navigate("/forgot-password");
    };

    return(
        <LoginCard>
            <div className="loginForm">
                <form onSubmit={submitHandler}>
                    <div className="heading">
                        Login
                    </div>
                    <div>
                        <label> E-mail </label>
                        <br /> <input type="text" placeholder="Enter E-mail ID" onChange={emailChangeHandler} value={enteredEmail} />

                        <br />
                        <br />

                        <label> Password </label>
                        <br /> <input type="password" placeholder="Enter password" onChange={pwdChangeHandler} value={enteredPassword} />
                    </div>
                    <div className="resendPasswordLoginDiv">
                        <p> <button type="button" className="resendPasswordLogin" onClick={resetPasswordHandler}> Resend Temporary Password </button> </p>
                    </div>
                    {isError && <span className="error"> {customError} </span>}
                    <br />
                    <div className="alignDiv">
                        <p> <button type="submit" className="submitButton"> Submit </button>  </p>
                    </div>
                </form>
            </div>
        </LoginCard>
    );
};

export default LoginForm;