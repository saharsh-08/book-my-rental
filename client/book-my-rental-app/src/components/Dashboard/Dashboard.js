import { useLocation } from "react-router-dom";
import LoginCard from "../UI/LoginCard";

const Dashboard = () => {
    const location = useLocation();

    const userDetails = location.state?.userDetails;
    console.log(userDetails);
    const userName = userDetails.name;

    return(
        <LoginCard>
            <h1 style={{color: "white"}}>Hello, {userName}!</h1> 
        </LoginCard>
    );
};

export default Dashboard;