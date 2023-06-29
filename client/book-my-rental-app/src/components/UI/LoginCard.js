import './LoginCard.css';

const LoginCard = (props) => {
    const classes = "body " + props.className;   

    return(
        <div className={classes}> {props.children} </div>
    );
};

export default LoginCard;