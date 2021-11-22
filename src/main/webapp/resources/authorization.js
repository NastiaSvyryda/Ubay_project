/**
 * shows smooth transform between signIn and signUp windows
 */
$(function() {
	$(".btn").click(function() {
	    $(".form-signin").toggleClass("form-signin-left");
        $(".form-signup").toggleClass("form-signup-left");
        $(".frame").toggleClass("frame-long");
        $(".signup-inactive").toggleClass("signup-active");
        $(".signin-active").toggleClass("signin-inactive");
        $(".forgot").toggleClass("forgot-left");
        $(this).removeClass("idle").addClass("active");
	});
});

/**
 * shows field for email
 */
$(function() {
    $(".forgot-button").click(function() {
        $(".forgot-form").toggleClass("hidden");
    });
});

/**
 * shows eye animation in passwords fields
 */
$(".toggle-password").click(function() {
    $(this).toggleClass("fa-eye fa-eye-slash");
    let input = $($(this).attr("toggle"));
    if (input.attr("type") === "password") {
        input.attr("type", "text");
    } else {
        input.attr("type", "password");
    }
});

// $(function () {
// 	$(".btn-signin").click(function() {
//         $(".btn-animate").toggleClass("btn-animate-grow");
//         $(".welcome").toggleClass("welcome-left");
//         $(".cover-photo").toggleClass("cover-photo-down");
//         $(".frame").toggleClass("frame-short");
//         $(".profile-photo").toggleClass("profile-photo-down");
//         $(".btn-goback").toggleClass("btn-goback-up");
//         $(".forgot").toggleClass("forgot-fade");
//         $(".welcome-block").toggleClass("welcome-block-up");
// 	});
// });
/**
 * shows email confirmation window
 */
function checkEmail() {
    let role = document.querySelector('#userRole').value;
    let balance = document.querySelector('#balance').value;
    let username = document.querySelector('#loginSignUp').value;
    let password = document.querySelector('#passwordSignUp').value;
    let cpassword = document.querySelector('#confirmpassword').value;
    let email = document.querySelector('#email').value;

    if (role && balance && username && password && cpassword && email) {
        document.querySelector('.nav').setAttribute('class', 'nav nav-up');
        document.querySelector('.form-signup-left')
            .setAttribute('class', 'form-signup-left form-signup-down');
        document.querySelector('.success').setAttribute('class', 'success success-left');
        document.querySelector('.frame').setAttribute('class', 'frame frame-short');
        document.querySelector('#check').setAttribute('class', 'checked');
    }
}

/**
 * check passwords match and prevents from submit if they are different
 */
let match = false;
function checkPass() {
    let password = $("#passwordSignUp").val();
    let confirmPassword = $("#confirmpassword").val();
    match = (password === confirmPassword);
}
$(document).ready(function () {
    $("#confirmpassword").keyup(checkPass);
});
function checkPasswordMatch() {
    if (match) {
        checkEmail();
    } else {
        $("#confirmpassword").val('');
        alert('Passwords do not match!');
        return;
    }
}


async function sendAuthorizationRequest() {
    const formData = new FormData();
    let login = document.getElementById("loginLogin").value;
    let pass = document.getElementById("passwordLogin").value;
    formData.append('login', login);
    formData.append('password', pass);
    let response = await fetch('authorization',{
        method: 'POST',
        body : formData,
    });
    if (response.ok) {
        location.replace(response.url);
    } else {
        console.log( response);
        alert("Wrong password or login not found");
        location.reload();
    }
}
