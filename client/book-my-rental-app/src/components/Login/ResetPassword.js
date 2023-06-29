import Axios from "axios";

const ResetPassword = (email) => {
    return new Promise((resolve) => {
        // console.log(loginData);
        let serverLink = "http://localhost:3001/api/login/forgot-password/"

        Axios.get(serverLink, { params : {
            email: email
        }}).then((response) => {
            console.log(response.data);
            resolve(response.data);
        }).catch(error => {
            console.log(error.message);
        });
    })
};

export default ResetPassword;