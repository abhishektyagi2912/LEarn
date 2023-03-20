const express = require('express');
const app = express();
const path = require("path");
const hbs = require("hbs");
const user_login=require('./user_login');
const user_data=require('./user_data');
const templatepath = path.join(__dirname, './views')
const { groupCollapsed } = require('console');
const {signup , login ,  verify , resend } = require('./authorisation')


app.set("view engine", "hbs");
app.set("views", templatepath);
app.use(express.static(__dirname));

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Major Endpints to render web pages
app.get('/', (req, res) => {
   res.render("front");
});
app.get('/home', (req, res) => {
   res.render("home");
});
app.get('/courses', (req, res) => {
   res.render("courses");
});
app.get('/discussion', (req, res) => {
   res.render("discussion");
});
app.get('/compile', (req, res) => {
   res.render("compile");
});
// Endpoints to serve all courses
app.get('/programming', (req, res) => {
   res.render("programming");
});
app.get('/dsa', (req, res) => {
   res.render("dsa");
});
app.get('/c', (req, res) => {
   res.render("c");
});
app.get('/cplus', (req, res) => {
   res.render("cplus");
});
app.get('/python', (req, res) => {
   res.render("python");
});
app.get('/web', (req, res) => {
   res.render("web");
});
app.get('/android', (req, res) => {
   res.render("android");
});

app.get('/ml', (req, res) => {
   res.render("ml");
});
app.get('/devops', (req, res) => {
   res.render("devops");
});
// Endpoints to serve programming pages
app.get('/prog_m_1',(req,res)=>{
   res.render('./programming_modules/module1');
})
app.get('/prog_m_2',(req,res)=>{
   res.render('./programming_modules/module2');
})
app.get('/prog_m_3',(req,res)=>{
   res.render('./programming_modules/module3');
})
// Endpoints to serve api's

// Signup Process comes from authorisation.js
app.post('/signup', signup)
// Login Process comes from authorisation.js
app.post('/login',login)
// Verify otp sent 
app.post('/verify' , verify)
// TO Rsend OTP
app.post("/resend",resend)

// Listening on port 3000
app.listen(3000, () => {
   console.log("Port 3000 Connected successfully");
})