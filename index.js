firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        window.open("home.html");
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