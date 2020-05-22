firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("user").innerHTML = "You have signed in as " + user.email;
        document.getElementById("logged-in").style.display = "inline";
        document.getElementById("login").style.display = "none";
        console.log(user.displayName)
        document.getElementBy
 
        // User is signed in.
        if (user != null)  {
            console.log("signed-in as " + user.email)

        }
    } else {
        // No user is signed in.
    }
});

function login() {
    var userEmail = document.getElementById("email").value;
    var userPassword = document.getElementById("password").value;
    
    firebase.auth().signInWithEmailAndPassword(userEmail, userPassword).catch(function (error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;

        window.alert("Error : " + errorMessage);

    });

}

function signUp() {
    var email = document.getElementById("email");
    var passwd = document.getElementById("password");

    const promise = auth.createUserWithEmailAndPassword(email.value, passwd.value);
    promise.catch( e => alert(e.message));

    alert("Signed Up");
}

function logOut() {
    firebase.auth().signOut();
    document.getElementById("logged-in").style.display = "none";
    document.getElementById("login").style.display = "inline";
    console.log("signed-out")
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
}