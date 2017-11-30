function verifyMail(mail){
    var regex = /^[a-zA-Z0-9._-]+@[a-z0-9._-]{2,}\.[a-z]{2,4}$/;
    if(!regex.test(mail)){
        return false;
    }
    return true;
}