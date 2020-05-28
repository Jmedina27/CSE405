
//rootRef.orderByChild('email').equalTo(userEmail).on("value", function(snapshot) {
//    snapshot.forEach((function(child) { console.log(parent.key) }));
//});


firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        document.getElementById("user").innerHTML = "You have signed in as " + user.email;
        document.getElementById("logged-in").style.display = "inline";
        document.getElementById("login").style.display = "none";
        document.getElementById("signup").style.display = "none";
        /*
        db.collection('users').doc(user.uid).get().then(doc => {
            var userName, userEmail, userAge, userBio = document.createElement('p');
            userName.innerHTML = "Name : " + doc.data().name;
            document.getElementById("logged-in").appendChild(userName);
        })*/

        // User is signed in.
        if (user != null) {
            console.log("signed-in as " + user.email)
        }
    } else {
        // No user is signed in.
    }
});


function loginPage() {
    document.getElementById("signup").style.display = "none";
    document.getElementById("login").style.display = "inline";
}

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

function signUpPage() {
    document.getElementById("signup").style.display = "inline";
    document.getElementById("login").style.display = "none";
}

function signUp() {
    var signupEmail = document.getElementById("signup-email").value;
    var signupPassword = document.getElementById("signup-password").value;
    var signupRetypePassword = document.getElementById("signup-retype-password").value;
    var signupName = document.getElementById("signup-name").value;
    var signupAge = document.getElementById("signup-age").value;
    var signupBio = document.getElementById("signup-bio").value;

    if (signupPassword == signupRetypePassword) {

        var prom = firebase.auth().createUserWithEmailAndPassword(signupEmail, signupPassword);
        prom.catch(function (error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            window.alert("Error : " + errorMessage);
        });
        prom.then(cred => {
            return db.collection('users').doc(auth.currentUser.uid).set({
                name: signupName,
                email: signupEmail,
                age: signupAge,
                bio: signupBio
            });
        })
    }
    else {
        alert("Passwords do not match!")
    }
}

function logOut() {
    firebase.auth().signOut();
    document.getElementById("logged-in").style.display = "none";
    document.getElementById("login").style.display = "inline";
    console.log("signed-out")
    document.getElementById("email").value = "";
    document.getElementById("password").value = "";
    document.getElementById("signup-email").value = "";
    document.getElementById("signup-password").value = "";
    document.getElementById("signup-retype-password").value = "";
    document.getElementById("signup-name").value = "";
    document.getElementById("signup-age").value = "";
    document.getElementById("signup-bio").value = "";
}