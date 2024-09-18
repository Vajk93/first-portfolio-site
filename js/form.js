function validateNameAndEmail(){
  var firstName = document.getElementById('fromName');
  var email = document.getElementById('fromEmail');


  let nameErrorMsg = document.getElementById('nameErrorMsg');
  let emailErrorMsg = document.getElementById('emailErrorMsg');
  //name error handling
  if(firstName.value === "") {
    nameErrorMsg.innerHTML = "please, enter a name!";
    nameErrorMsg.style.height = "20px";
    firstName.style.border = "2px solid red";
  } else if(firstName.value.length > 0 && firstName.value.length <2){
    nameErrorMsg.innerHTML = "please, enter a valid name!";
    nameErrorMsg.style.height = "20px";
    firstName.style.border = "2px solid red";
  } else {
    firstName.style.border = "2px solid transparent";
    nameErrorMsg.innerHTML = "";
    nameErrorMsg.style.height = "0px";
    //email error handling
    var email = document.getElementById('fromEmail');
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

    if(email.value.match(validRegex)){
      email.style.border = "2px solid transparent";
      sendMail();
    } else{
      emailErrorMsg.style.height = "20px";
      email.style.border = "2px solid red";
      emailErrorMsg.innerHTML = "plese, enter a valid email";
    }
  }
};



// send me an email
function sendMail(params) {
  var tempParams = {
    from_name: document.getElementById('fromName').value,
    from_email: document.getElementById('fromEmail').value,
    message: document.getElementById('msg').value
  };

  //after sending - make empty the input fields
  document.getElementById('fromName').value = "";
  document.getElementById('fromEmail').value = "";
  document.getElementById('msg').value = "";
  document.getElementById('contact').innerHTML = `
    <div class="container" style="margin-top:100px;">
      <div class="title-container">
        <h1 style="text-align:center">I removed email sending function from this site. So i won't get any email. This is an old project. (made in 2022)</h1>
      </div>
    </div>`;

  // i removed service and template ID. This site don't need email sending, this is just an old project, nobody use this:
  emailjs.send('i_removed_service_id','i_removed_template_id',tempParams)
  .then(function(res){
    console.log("succes", res.status);
  })
}
