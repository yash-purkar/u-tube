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

mongodb+srv://yashpurkar7079:6fLv7F4wqdg03Ifz@personalprojects.xzcaoft.mongodb.net/?retryWrites=true&w=majority&appName=PersonalProjects

mongodb+srv://yashpurkar7079:<password>@personalprojects.xzcaoft.mongodb.net/

*/