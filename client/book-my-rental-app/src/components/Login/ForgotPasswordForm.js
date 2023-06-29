import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './ForgotPasswordForm.css';
import LoginCard from '../UI/LoginCard';
import ResetPassword from './ResetPassword';

const ForgotPassword = () => {
    const [enteredEmailReset, setEnteredEmailReset] = useState("");
    const [isVerifiedReset, setIsVerifiedReset] = useState(false);
    const [isErrorReset, setIsErrorReset] = useState(false);
    const [customError, setError] = useState("");
    const [successMessage, setSuccessMessage] = useState(false);
    const [isResetButtonPressed, setResetButtonPressed] = useState(false);
    const navigate = useNavigate();

    const resetHandler = (event) => {
        event.preventDefault();
        // console.log(enteredEmailReset);
        ResetPassword(enteredEmailReset).then(verified => {
            if (verified[0] === true) {
                setResetButtonPressed(verified[0]);
                setIsVerifiedReset(true);
            } else {
                setIsErrorReset(true);
                setError(verified[1]);
            }
        }).catch(error => {
            console.log(error.message);
        });

        setEnteredEmailReset("");
    };

    useEffect(() => {
        if(isResetButtonPressed) {
            if(isVerifiedReset) {
                setSuccessMessage(true);
            } else {
                setIsErrorReset(true);
                setError("Invalid Email ID");
            }
        }
    }, [isResetButtonPressed, isVerifiedReset, setIsErrorReset]);

    const loginButtonHandler = (event) => {
        navigate("/");
    };

    return(
        <LoginCard>
            <div className="loginForm">
                <form onSubmit={resetHandler}>
                    <div className="heading">
                        Resend Password
                    </div>

                    <div>
                        <label> E-mail </label>
                        <br /> <input 
                                    type="text" 
                                    placeholder="Enter E-mail ID" 
                                    onChange={event => setEnteredEmailReset(event.target.value)}
                                    value={enteredEmailReset} 
                                />
                    </div>
                    <div className="resendPasswordLoginDiv">
                        <p> <button type="button" className="resendPasswordLogin" onClick={loginButtonHandler}> Go To Login Page </button> </p>
                    </div>
                    {isErrorReset && !successMessage && <span className="error"> {customError} </span>}
                    {successMessage && <span className="success"> Temporary Password succesfully sent </span>}
                    {successMessage && <span className="success"> to registered Email ID </span>}
                    <div className="alignDiv">
                        <p> <button type="submit" className="submitButton"> Resend Password </button>  </p>
                    </div>
                </form>
            </div>
        </LoginCard>
    );
};

export default ForgotPassword;