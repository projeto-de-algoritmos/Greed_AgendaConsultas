const firebaseErrors = (code) => {
    if(code == "auth/user-not-found") 
        return "This email is not registered"
    else if(code == "auth/wrong-password") 
        return "The password is invalid"
    else if(code == "auth/email-already-in-use")
        return "Email address is already in use"
    else
        return "Something went wrong, please try again later"
}

export default firebaseErrors;