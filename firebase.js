import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.2/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-auth.js";
import { getDatabase, update, get, ref, set, child} from "https://www.gstatic.com/firebasejs/10.7.2/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyDJI52NSFui7EAzOfdJfx3AVKv0wnX4vG8",
    authDomain: "login-c38df.firebaseapp.com",
    projectId: "login-c38df",
    storageBucket: "login-c38df.appspot.com",
    messagingSenderId: "544898313893",
    appId: "1:544898313893:web:612c02acae708d9ad0a74c",
    measurementId: "G-59908472MG",
    databaseURL: "https://login-c38df-default-rtdb.firebaseio.com/",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);
const dbref = ref(db);

const signup = document.getElementById("signup");
const signin = document.getElementById("signin");

function RegisterUser(evt) {
    evt.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const username = document.getElementById("username").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((usercredential) => {
        const user = usercredential.user;
        set(ref(db, 'users/' + user.uid),{
          username: username
        })
      })
      .catch((error) => {
        console.log(error);
        console.log({email, password})
      });
};
signup.addEventListener('submit', RegisterUser);

function Signin(evt){
  evt.preventDefault();
  const nemail = document.getElementById("nemail").value;
  const npassword = document.getElementById("npassword").value;
  const username = document.getElementById("username").value;
  signInWithEmailAndPassword(auth, nemail, npassword)
    .then((usercredential) => {
      const user = usercredential.user;
      const dt = new Date();
      update(ref(db, 'users/' + user.uid),{
        last_login: dt,
      })
      location.replace("home.html")
    })
    .catch((error) => {
      console.log(error);
      console.log({email, password})
    });
}
signin.addEventListener('submit', Signin);

/*
// Your web app's Firebase configuration

// Initialize Firebase
// Initialize variables
const auth = firebase.auth()
const database = firebase.database()

// Set up our register function
function register () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value
  full_name = document.getElementById('full_name').value
  favourite_song = document.getElementById('favourite_song').value
  milk_before_cereal = document.getElementById('milk_before_cereal').value
 
  // Move on with Auth
  auth.createUserWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      email : email,
      full_name : full_name,
      favourite_song : favourite_song,
      milk_before_cereal : milk_before_cereal,
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).set(user_data)

    // DOne
    alert('User Created!!')
  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}

// Set up our login function
function login () {
  // Get all our input fields
  email = document.getElementById('email').value
  password = document.getElementById('password').value

  // Validate input fields
  if (validate_email(email) == false || validate_password(password) == false) {
    alert('Email or Password is Outta Line!!')
    return
    // Don't continue running the code
  }

  auth.signInWithEmailAndPassword(email, password)
  .then(function() {
    // Declare user variable
    var user = auth.currentUser

    // Add this user to Firebase Database
    var database_ref = database.ref()

    // Create User data
    var user_data = {
      last_login : Date.now()
    }

    // Push to Firebase Database
    database_ref.child('users/' + user.uid).update(user_data)

    // DOne
    alert('User Logged In!!')

  })
  .catch(function(error) {
    // Firebase will use this to alert of its errors
    var error_code = error.code
    var error_message = error.message

    alert(error_message)
  })
}




// Validate Functions
function validate_email(email) {
  expression = /^[^@]+@\w+(\.\w+)+\w$/
  if (expression.test(email) == true) {
    // Email is good
    return true
  } else {
    // Email is not good
    return false
  }
}

function validate_password(password) {
  // Firebase only accepts lengths greater than 6
  if (password < 6) {
    return false
  } else {
    return true
  }
}

function validate_field(field) {
  if (field == null) {
    return false
  }

  if (field.length <= 0) {
    return false
  } else {
    return true
  }
}
*/
