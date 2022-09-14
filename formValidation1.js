function validate()
{
    var username = document.getElementById("uname");
    var password = document.getElementById("pass");

    if(username.value.trim() =="" || password.value.trim() =="")
    {
        alert("No blanks is allow!!");
        return false;
    }
    else{
        true;
    }
}