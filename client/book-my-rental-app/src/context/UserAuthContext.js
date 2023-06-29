import { createContext, useContext } from "react";
import { RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";
import { auth } from "../firebase";

const userAuthContext = createContext();

export const UserAuthContextProvider = ({ children }) => {
    // const [user, setUser] = useState({});

    const setUpRecaptcha = (number) => {
        const recaptchaVerifier = new RecaptchaVerifier(
        "recaptcha-container",
        {},
        auth)
        recaptchaVerifier.render();
        
        return signInWithPhoneNumber(auth, number, recaptchaVerifier, { timeout: 240000});
    }

    return (
        <userAuthContext.Provider
        value={{
            setUpRecaptcha
        }}
        >
        {children}
        </userAuthContext.Provider>
    );
}


export function useUserAuth() {
  return useContext(userAuthContext);
}