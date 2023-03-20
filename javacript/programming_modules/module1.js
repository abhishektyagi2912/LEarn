// Function for post request
if(localStorage.getItem("u_id"))
{
  document.getElementById("l1").style.display = "none"
  document.getElementById("l2").style.display = "none"
}
else{
  document.getElementById("l3").style.display = "none"
}
async function postData(url = "", data = {}) {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  let rdata = await response.json(); // parses JSON response into native JavaScript objects
  return rdata;
}
// Function to validate email
function ValidateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true
  }
  return false
}

document.getElementById("login").addEventListener('click', async () => {
  let data = {
    email: document.getElementById('login_email_id').value,
    password: document.getElementById('login_password').value
  }
  if (data.email == "" && data.password == "") {
    document.getElementById("login_email_error").innerText = "*Please Enter Email"
    document.getElementById("login_pass_error").innerText = "*Please Enter PassWord"
    document.getElementById("login_credentials_error").innerText = ""
    return;
  }
  else if (data.email == "") {
    document.getElementById("login_email_error").innerText = "*Please Enter Email"
    document.getElementById("login_password").value = ""
    document.getElementById("login_pass_error").innerText = ""
    document.getElementById("login_credentials_error").innerText = ""
    return;
  }
  else if (data.password == "") {
    document.getElementById("login_email_error").innerText = ""
    ocument.getElementById("login_credentials_error").innerText = ""
    document.getElementById("login_pass_error").innerText = "*Please Enter Password"
    return;
  }
  else {
    document.getElementById("login_email_error").innerText = ""
    document.getElementById("login_pass_error").innerText = ""
    if (!ValidateEmail(data.email)) {
      document.getElementById("login_email_error").innerText = "*Not a Valid Email"
      return
    }
    else {
      let resp = await postData('/login', data);
      console.log(resp)
      if (resp.success == 0) {
        document.getElementById("login_credentials_error").innerText = "*No user with this email exist"
        return
      }
      else if (resp.success == 1) {
        document.getElementById("login_credentials_error").innerText = "*PassWord Incorrect"
        return
      }
      else if (resp.success == 3) {
        document.getElementById("login_credentials_error").innerText = "Email Incorrect"
        return
      }
      else {
        localStorage.setItem("u_id", resp.token);
        location.reload();
      }
    }

  }
})
let sent_otp
document.getElementById("signup").addEventListener('click', async () => {
  let data = {
    name: document.getElementById('signup_name').value,
    email: document.getElementById('signup_email').value,
    password: document.getElementById('signup_pass').value,
  }
  if (data.email == "" && data.name == "" && data.password == "") {
    document.getElementById("signup_email_error").innerText = "*Please Enter Email"
    document.getElementById("signup_name_error").innerText = "*Please Enter Name"
    document.getElementById("signup_pass_error").innerText = "*Please Enter Password"
    return
  }
  else if (data.email == "" && data.name == "") {
    document.getElementById("signup_email_error").innerText = "*Please Enter Email"
    document.getElementById("signup_name_error").innerText = "*Please Enter Name"
    document.getElementById("signup_pass_error").innerText = ""
    return
  }
  else if (data.email == "" && data.password == "") {
    document.getElementById("signup_email_error").innerText = "*Please Enter Email"
    document.getElementById("signup_name_error").innerText = ""
    document.getElementById("signup_pass_error").innerText = "*Please Enter Password"
    return
  }
  else if (data.password == "" && data.name == "") {
    document.getElementById("signup_email_error").innerText = ""
    document.getElementById("signup_name_error").innerText = "*Please Enter Name"
    document.getElementById("signup_pass_error").innerText = "*Please Enter Password"
    return
  }
  else if (data.password == "") {
    document.getElementById("signup_email_error").innerText = ""
    document.getElementById("signup_name_error").innerText = ""
    document.getElementById("signup_pass_error").innerText = "*Please Enter Password"
    return
  }
  else if (data.name == "") {
    document.getElementById("signup_email_error").innerText = ""
    document.getElementById("signup_name_error").innerText = "*Please Enter Name"
    document.getElementById("signup_pass_error").innerText = ""
    return
  }
  else if (data.email == "") {
    document.getElementById("signup_email_error").innerText = "*Please Enter Email"
    document.getElementById("signup_name_error").innerText = ""
    document.getElementById("signup_pass_error").innerText = ""
    return
  }
  else {
    if (!ValidateEmail(data.email)) {
      document.getElementById("signup_email_error").innerText = "*Not a Valid Email"
      document.getElementById("signup_pass_error").innerText = ""
      document.getElementById("signup_name_error").innerText = ""
      return
    }
    else {
      let res = await postData('/signup', data)
      if (res.success == 0) {
        document.getElementById("signup_credentials_error").innerText = "*User Already Exists"
        return
      }
      else if (res.success == 1) {
        document.getElementById("signup_credentials_error").innerText = "*No Such Email"
        return
      }
      else if (res.success == 2) {
        // OTP will remain valid for 2 mins only
        sent_otp = res.otp
        setTimeout(() => {
          sent_otp = 0
        }, 120000)

        document.getElementById("id02").style.display = "none"
        document.getElementById("id03").style.display = "block"
      }
    }
  }
})
document.getElementById("verify_otp").addEventListener('click', async () => {
  let data = {
    name: document.getElementById('signup_name').value,
    email: document.getElementById('signup_email').value,
    password: document.getElementById('signup_pass').value,
    otp: document.getElementById('otp').value
  }
  // console.log(sent_otp)
  if (data.otp == "") {
    document.getElementById("otp_valid_error").innerText = "Please Enter OTP"
  }
  else if (sent_otp == 0) {
    document.getElementById("otp_valid_error").innerText = "OTP Expired"
  }
  else if (data.otp != sent_otp) {
    document.getElementById("otp_valid_error").innerText = "Incorrect OTP"
  }
  else {
    let res = await postData('/verify', data)
    if (res.success == 1) {
      document.getElementById("otp_valid_error").innerText = "Server Error"
    }
    else {
      localStorage.setItem("u_id", res.token);
      location.reload()
    }
  }

})
document.getElementById("resend").addEventListener('click', async () => {
  console.log("Inside resent")
  let result = await postData('/resend', { email: document.getElementById('signup_email').value })
  if (result.success == 1) {
    document.getElementById("otp_valid_error").innerText = "Internal Server Error"
  }
  else {
    sent_otp = result.otp
    setTimeout(() => {
      sent_otp = 0
    }, 120000)
    document.getElementById("otp_valid_error").innerText = "OTP Sent Successfully"
  }
})
document.getElementById("l3").addEventListener('click',()=>{
  document.getElementById("id04").style.display = "block"
  document.getElementById("id03").style.display = "none"

})
document.getElementById("l4").addEventListener('click',()=>{
  localStorage.removeItem("u_id")
  location.reload()
})
document.getElementById("l5").addEventListener('click',()=>{
  document.getElementById("id04").style.display = "none"
  document.getElementById("id03").style.display = "none"
})

// For pop up logiin and signup form
// Get the modal
var modal = document.getElementById('id01');

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == id01) {
    id01.style.display = "none";
  }
  if (event.target == id02) {
    id02.style.display = "none";
  }
  if (event.target == id03) {
    id03.style.display = "none";
  }
  if (event.target == id04) {
    id04.style.display = "none";
  }
}
// When user clicks normal login btn
document.getElementById('login_btn').addEventListener('click', () => {
  document.getElementById('id01').style.display = 'block'
  // document.getElementById('id01').style.width = 'auto'
})
// when user clicks normal signup btn
document.getElementById('signup_btn').addEventListener('click', () => {
  document.getElementById('id02').style.display = 'block'
  // document.getElementById('id02').style.width = 'auto'
})
// When user clicks on login page of signup btn
document.getElementById('btn_login').addEventListener('click', () => {
  document.getElementById('id02').style.display = 'none'
  document.getElementById('id01').style.display = 'block'
  // document.getElementById('id01').style.width = 'auto'
})
// When user clicks on signup btn of loginpage
document.getElementById('btn_signup').addEventListener('click', () => {
  document.getElementById('id01').style.display = 'none'
  document.getElementById('id02').style.display = 'block'
  // document.getElementById('id02').style.width = 'auto'
})

// Pop up Login Form ans signup js ends here

