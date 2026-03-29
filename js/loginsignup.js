var signinTab = document.getElementById("signinTab");
var signupTab = document.getElementById("signupTab");

var signinForm = document.getElementById("signinForm");
var signupForm = document.getElementById("signupForm");

var toggleButtons = document.querySelectorAll(".toggle-password");

function showSignin() {
  signinTab.classList.add("active");
  signupTab.classList.remove("active");

  signinForm.classList.add("active-form");
  signupForm.classList.remove("active-form");

  clearAllErrors();
}

function showSignup() {
  signupTab.classList.add("active");
  signinTab.classList.remove("active");

  signupForm.classList.add("active-form");
  signinForm.classList.remove("active-form");

  clearAllErrors();
}

signinTab.addEventListener("click", showSignin);
signupTab.addEventListener("click", showSignup);

toggleButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    var targetId = button.getAttribute("data-target");
    if (!targetId) return;

    var input = document.getElementById(targetId);

    if (input.type === "password") {
      input.type = "text";
      button.textContent = "🙈";
    } else {
      input.type = "password";
      button.textContent = "👁";
    }
  });
});

function setError(inputId, errorId, message) {
  var input = document.getElementById(inputId);
  var error = document.getElementById(errorId);

  input.classList.add("invalid");
  error.textContent = message;
}

function clearError(inputId, errorId) {
  var input = document.getElementById(inputId);
  var error = document.getElementById(errorId);

  input.classList.remove("invalid");
  error.textContent = "";
}

function clearAllErrors() {
  clearError("signinEmail", "signinEmailError");
  clearError("signinPassword", "signinPasswordError");
  clearError("fullName", "fullNameError");
  clearError("signupEmail", "signupEmailError");
  clearError("signupPassword", "signupPasswordError");
  clearError("mobileNumber", "mobileNumberError");
}

function isValidEmail(email) {
  var emailRegex = /^(?=.*\d)[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
  return emailRegex.test(email);
}

function isValidPassword(password) {
  var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+={[}\]|\\:;"'<,>.?/`~]).{8,}$/;
  return passwordRegex.test(password);
}

function isValidFullName(fullName) {
  return fullName.trim().length >= 8;
}

function isValidMobileNumber(mobileNumber) {
  var mobileRegex = /^\d{10}$/;
  return mobileRegex.test(mobileNumber);
}

signinForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearAllErrors();

  var email = document.getElementById("signinEmail").value.trim();
  var password = document.getElementById("signinPassword").value;

  var isValid = true;

  if (!isValidEmail(email)) {
    setError("signinEmail", "signinEmailError", "Enter a valid email with @, . and at least one digit.");
    isValid = false;
  }

  if (!isValidPassword(password)) {
    setError(
      "signinPassword",
      "signinPasswordError",
      "Password must be 8+ chars with uppercase, lowercase, digit, and special symbol."
    );
    isValid = false;
  }

  if (!isValid) return;

  console.log("Sign In Data:", { email: email, password: password });
  alert("Login form submitted");
});

signupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  clearAllErrors();

  var fullName = document.getElementById("fullName").value.trim();
  var email = document.getElementById("signupEmail").value.trim();
  var password = document.getElementById("signupPassword").value;
  var mobileNumber = document.getElementById("mobileNumber").value.trim();

  var isValid = true;

  if (!isValidFullName(fullName)) {
    setError("fullName", "fullNameError", "Full name must be at least 8 characters.");
    isValid = false;
  }

  if (!isValidEmail(email)) {
    setError("signupEmail", "signupEmailError", "Enter a valid email with @, . and at least one digit.");
    isValid = false;
  }

  if (!isValidPassword(password)) {
    setError(
      "signupPassword",
      "signupPasswordError",
      "Password must be 8+ chars with uppercase, lowercase, digit, and special symbol."
    );
    isValid = false;
  }

  if (!isValidMobileNumber(mobileNumber)) {
    setError("mobileNumber", "mobileNumberError", "Mobile number must be exactly 10 digits.");
    isValid = false;
  }

  if (!isValid) return;

  console.log("Sign Up Data:", {
    fullName: fullName,
    email: email,
    password: password,
    mobileNumber: mobileNumber
  });

  alert("Signup form submitted");
});