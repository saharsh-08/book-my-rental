const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mysql = require('mysql');
const nodemailer = require('nodemailer');
const functions = require('firebase-functions');

app.listen(3001, () => {
    // console.log("Listening from port 3001");
});

const db = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'saharsh',
    database: 'book_my_rental'
});

// db.connect(function (err) {
//     if (err) {
//         console.log("Error occurred while connecting to database!" + err.message);
//     }

//     else {
//         console.log("Successfully connected to database!");
//     }
// });

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.json());

// Testing API
// app.get("/", (req, res) => {
//     // console.log("Hello World!");
//     const sqlSelect = "SELECT * FROM login";
//     db.query(sqlSelect, (err, result) => {
//         console.log(result);
//     });
//     res.send("Hello World!");
// });

// Verification of Login Credentials
// UserVerification.js
app.get("/api/login/", (req, res) => {
    // console.log("Hello World!");
    const enteredEmail = req.query.email;
    const enteredPassword = req.query.password;
    // console.log(enteredEmail);
    // console.log(enteredPassword);

    const sqlFind = "SELECT * FROM login WHERE email=? AND password=?";
    const sqlUpdate = "UPDATE login SET online='YES' WHERE email=?";
    db.query(sqlFind, [enteredEmail, enteredPassword], (err, result) => {
        if (Object.keys(result).length === 1) {
            // console.log(result[0].phone);
            res.send([
                true, {   
                number: result[0].phone,
                email: result[0].email,
                name: result[0].name,
                online: "yes" 
                }, 
                err
            ]);

            db.query(sqlUpdate, [result[0].email]);
        }
        else
            res.send([false, err]);
    });
});

// Resend Password
// ForgotPasswordVerification.js
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'saharshkhunt1@gmail.com',
      pass: 'qvtlkkmccxbfekyv'
    },
});

// Verifying transporter options
// transporter.verify((err, success) => {
//     if (err) console.error(err);
//     console.log('Your config is correct');
// });

const generatePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let password = '';
    
    for (let i = 0; i < 8; i++) {
        const randomIndex = Math.floor(Math.random() * charset.length);
        password += charset[randomIndex];
    }
    
    return password;
}

const sendPasswordResetEmail = async (email, password) => {
    const mailOptions = {
        from: 'saharshkhunt1@gmail.com',
        to: email,
        subject: 'Password Reset',
        text: `Your temporary password is: ${password}`
    };
    
    transporter.sendMail(mailOptions).then(() => { 
        console.log('Password reset email sent successfully') 
    }).catch(error => {
        console.error('Error sending password reset email: ', error.message);
    });
}

app.get("/api/login/forgot-password", (req, res) => {
    // const enteredEmailFP = req.query.email;
    
    const email = req.query.email;

    const sqlFindFP = "SELECT * FROM login WHERE email=?";
    const sqlUpdateFP = "UPDATE login SET password=? WHERE email=?";

    db.query(sqlFindFP, [email], (err, result) => {
        // console.log(result);
        // console.log(err);

        if (Object.keys(result).length === 1) {
            const randomPassword = generatePassword();
            // console.log(randomPassword);
            sendPasswordResetEmail(email, randomPassword).then(() => {
                
                db.query(sqlUpdateFP, [randomPassword, email], (innerErr, innerResult) => {
                    // console.log(innerResult);
                    if (innerErr !== null) {
                        res.send([false, "Error in setting new password"]);
                        console.log(innerErr);
                    } else {
                        res.send([true, ""]);
                    }
                })
            }).catch(error => {
                res.send([false, "Internal Server Error"]);
                console.log(error.message);
            });
        }
        else
            res.send([false, "Enter valid login credentials"]);
    });
});