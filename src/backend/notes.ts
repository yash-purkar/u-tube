// Setup backend
/*
Steps
1. Create backend folder
2. Initialize package .josn in it using 'npm init -y'
3. Install packages
express - to handle http request by sending to specific endpoint.
mongoose - to connect to database.
cors - to allow frontend to make api request to backend.
nodemon - to restart server if we make any changes.

4. In package.json in 'scripts' add:
'start' : 'nodemon index.ts'
so we can use npm start to start the server

5. Create databse in mongodb atlas and add connection string in mongodb compass
6. Connect to MONGODB
7. app.listen() to run server on specific port, so we can make api requests on that port.
8. Create User model
9. handle register request using app.post('register',(req,res) => {......});
    Check in this if email is already there, if yes send the error user already exist, otherwise add it in the db.


    JWT token

1. npm install jsonwebtoken

const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

For cookies
app.use(cookieParser());

then after successfully login, we'll generate the token.

const token = jwt.sign({
    email: user.email
}, "JWT_SECERET_KEY",{expireIn:"1d"});

sign method takes 3 parameters, 1st is the payload which we want to include in the token
2nd secret key it is used to verify generated token, later.
3rd is the optional which is expiration time. or there might me some more options

then set it in the cookies.
res.cookie("token",token);

If not working properly then we'll have to makes some changes

1. in app.use(cors({
    origin: ['http://localhost:3000'],
    methods: ['GET','POST'],
    credentials: true,
}));
origin - means requests are allowed from this origin/url
methods - methods are allowed for CORS request
credentials - means allows credentials in request such as cookies

then in login component before handleSubmit
axios.defaults.withCredentials = true; // Allows to send credentials in request such as cookies.

Now in pages we can check is token in the cookie or not, so we'll have api for that
e.g in Home
useEffect(() => {
    axios.get('http://localhost:3001/home')
    .then(result => {
        if(result.data !== "Success"){
            router.replace('/login')
        }
    })
},[]);

If it is not working properly, try using
axios.defaults.withCredentials = true. - Above useEffect.

Now we'll write the code for this home page
Here we will use middleware in that we will check token in that middleware

const verifyUser = (req,res,next) => {
    const token = req.cookies.token;

    if(!token) {
        return res.json("The token is not available.")
    } else{
        jwt.verify(token,"JWT_SECERET_KEY",(err,decoded) => {
            // We'll get the {email: email} in the decoded variable because we are passing it in the login route handler.
            if(error) {
               return res.json("Token is unvalid");
               next();
               // It will go back there where it was and move ahead with the next things.
            }
        })
    }

}
app.get('/home',verifyUser,(req,res) => {
return res.json("Success");
} )

*/