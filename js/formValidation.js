const form = document.getElementById("form");
const email = document.getElementById("email");
const password = document.getElementById("password");
const confirmpassword = document.getElementById("confirmpassword");
const fullname = document.getElementById("fullname");

form.addEventListener("input", validateInputs);

const setError = (element, message) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = message;
    inputControl.classList.add("error");
    inputControl.classList.remove("success");
};

const setSuccess = (element) => {
    const inputControl = element.parentElement;
    const errorDisplay = inputControl.querySelector(".error");
    errorDisplay.innerText = "";
    inputControl.classList.add("success");
    inputControl.classList.remove("error");
};

const isValidEmail = (email) => {
    const re = /^[A-Za-z][\w$.]*[^\W_.$-]{5,255}@[^\W_.$-][\w]+\.\w+$/;
    return re.test(String(email).toLowerCase());
};

function validateInputs() {
    const emailValue = email.value.trim();
    const passwordValue = password.value.trim();

    // Kiểm tra email
    if (emailValue === "") {
        setError(email, "This is a required field");
    } else if (!isValidEmail(emailValue)) {
        setError(email, "Please enter a valid email address");
    } else {
        setSuccess(email);
    }

    // Kiểm tra password
    if (passwordValue === "") {
        setError(password, "This is a required field");
    } else if (
        passwordValue.length < 8 ||
        passwordValue.length > 15 ||
        !passwordValue.match(/[A-Z]/) ||
        !passwordValue.match(/[a-z]/) ||
        !passwordValue.match(/[0-9]/) ||
        !passwordValue.match(/[!@#$%^&*]/))
    {
        setError(password,"Password must be between 8 to 15 characters and include at least 1 uppercase letter, 1 lowercase letter, 1 number, and 1 special character in (!@#$%^&*)");
    } else {
        setSuccess(password);
    }

    // Kiểm tra trang đăng ký (register)
    if (document.body.classList.contains("register-page")) {
        const confirmpasswordValue = confirmpassword.value.trim();
        const fullnameValue = fullname.value.trim();

        // Kiểm tra confirmpassword
        if (confirmpasswordValue === "") {
            setError(confirmpassword, "This is a required field");
        } else if (confirmpasswordValue !== passwordValue) {
            setError(confirmpassword, "Password does not match");
        } else {
            setSuccess(confirmpassword);
            window.location.href = "#otp-dialog";
        }

        // Kiểm tra fullname
        if (fullnameValue.trim() === "") {
            setError(fullname, "This is a required field");
        } else if (fullnameValue.match(/[0-9!@#$%^&*]/)) {
            setError(fullname, "Your full name must not contain numbers and special characters");
        } else if (fullnameValue.length < 2 || fullnameValue.length > 64) {
            setError(fullname, "Your full name must be between 2 and 64 characters");
        } else if (fullname.value !== fullnameValue) {
            setError(fullname, "Full name should not start or end with spaces");
        } else {
            setSuccess(fullname);
        }
    }
}

// Gọi hàm validateInputs lần đầu tiên để kiểm tra ban đầu
validateInputs();