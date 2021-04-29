function validate()
            {
                var name=document.getElementById("name");
                var nameformat=/^[A-z ]+$/;
                if(name.value.match(nameformat))
                {
                    document.getElementById("name1").innerHTML = "";
                }
                else if(name.value.length === 0)
                {
                    document.getElementById("name1").innerHTML = "*Enter your name*";
                    return false;
                }
                else
                {
                    document.getElementById("name").innerHTML = "*Enter a proper name*";
                    return false;
                }
                var number=document.getElementById("number");
                if(number.value.length === 0)
                {
                    document.getElementById("number1").innerHTML = "*Please enter your Aadhar No*";
                    return false;
                }
                else
                {
                    document.getElementById("number1").innerHTML = "";
                }
                var email=document.getElementById("email");
                var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
                if (email.value.match(mailformat)) 
                {
                    document.getElementById("email1").innerHTML = "";
                } 
                else if(email.value.length === 0)
                {
                    document.getElementById("email1").innerHTML = "*Please enter a mail-id*";
                    return false;
                }
                else 
                {
                    document.getElementById("email1").innerHTML = "*Please enter a valid email*";
                    return false;
                }
                var password=document.getElementById("pass");
                if(password.value.length === 0)
                {
                    document.getElementById("pass1").innerHTML = "*Please enter a password*";
                    return false;
                }
                else if(password.value.length < 9)
                {
                    document.getElementById("pass1").innerHTML = "*Please enter a password of atleast length 8*";
                    return false;
                }
                else
                {
                    document.getElementById("pass1").innerHTML = "";
                }
                var cpassword=document.getElementById("cpass")
                if(cpassword.value.length === 0)
                {
                    document.getElementById("cpass1").innerHTML = "*Please enter a password to Confirm*";
                    return false;
                }
                else
                {
                    document.getElementById("cpass1").innerHTML = "";
                }
                if(password.value === cpassword.value)
                {
                    alert("You have successfully registered!!!")
                }
                else
                {
                    alert("Sorry,your pass word doesn't match...");
                    return false;
                }
            }