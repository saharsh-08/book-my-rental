import Axios from "axios";

const UserVerification = (loginData) => {
    return new Promise((resolve, reject) => {
        // console.log(loginData);
        let serverLink = "http://localhost:3001/api/login/"

        Axios.get(serverLink, { params : {
            ...loginData
        }}).then((response) => {
            // console.log(response.data[0]);
            if (response.data[0] === true)
                resolve([true, response.data[1]]);
            else
                resolve([false]);
        }).catch(error => {
            reject(error);
        });
    })
};

export default UserVerification;