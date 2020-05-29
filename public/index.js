
//rootRef.orderByChild('email').equalTo(userEmail).on("value", function(snapshot) {
//    snapshot.forEach((function(child) { console.log(parent.key) }));
//});

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        //document.getElementById("user").innerHTML = "You have signed in as " + user.email;
        document.getElementById("logged-in").style.display = "inline";
        document.getElementById("login").style.display = "none";
        document.getElementById("signup").style.display = "none";
        db.collection('users').doc(user.uid).get().then(doc => {
            var userName = document.getElementById('user-name').innerHTML = "Name : " + doc.data().name;
            var userEmail = document.getElementById('user-email').innerHTML = "Email : " + doc.data().email;
            var userName = document.getElementById('user-age').innerHTML = "Age : " + doc.data().age;
            var userName = document.getElementById('user-major').innerHTML = "Bio : " + doc.data().major;
        });

        // User is signed in.
        if (user != null) {
            console.log("signed-in as " + user.email);
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
    var signupMajor = document.getElementById("signup-major").value;

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
                major: signupMajor
            });
        })
    }
    else {
        alert("Passwords do not match!")
    }
}

function logOut() {
    firebase.auth().signOut();
    var userName = document.getElementById('user-name').innerHTML = "Name : " + doc.data().name;
    document.getElementById('user-email').innerHTML = "";
    document.getElementById('user-age').innerHTML = "";
    document.getElementById('user-major').innerHTML = "";
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
    document.getElementById("signup-major").value = "";

}