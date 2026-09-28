var loginBtn = document.getElementById("login");
var email = document.getElementById("email");
var password = document.getElementById("password");

loginBtn.addEventListener("click", async function () {
  try {
    // Sign in with Firebase Auth
    const login = await firebase.auth().signInWithEmailAndPassword(email.value, password.value);
    console.log("UID:", login.user.uid);

    // Fetch user data from Realtime Database
    const snapshot = await firebase.database().ref("user").child(login.user.uid).get();
    if (snapshot.exists()) {
      console.log("User data:", snapshot.val());
      localStorage.setItem("loginUser", login.user.uid);
    } else {
      console.log("No user data found in DB");
    }

    alert("Login Successfully");

    setTimeout(() => {
      window.location.replace("dashboard.html");
    }, 2000);

  } catch (err) {
    console.error("Login error:", err.message);
    alert(err.message);
  }
});
