$(document).ready( () => {

    // When loginButton is clicked, check whether the user is authorized or not
    $("#loginButton").on('click', () => {
        $username = $("#usernameBox").val();
        $password = $("#passwordBox").val();

        SDK.login($username, $password, (error, data) => {
            if (error && error.xhr.status !== 200) {
                alert("You have entered incorrect username or password.");
                $(".inputGroup .inputField").addClass("formError");
            }
            else {
                loadUser();
            }
        })
    });

    // When newUserButton is clicked, change location to createUser page
    $("#newUserButton").on('click', () => {
        window.location.href = "createUser.html";
    });
});

// Function to check whether a user is personnel or not
loadUser = () => {
    if (!SDK.Storage.load("isPersonel")) {
        window.location.href = "student.html";
    }
    else {
        window.location.href = "staff.html";
    }
};

// Enter-key function in both inputs
$("#usernameBox").keypress(function (e) {
    if (e.which == 13) {
        $("#loginButton").click();
    }
});

$("#passwordBox").keypress(function (e) {
    if (e.which == 13) {
        $("#loginButton").click();
    }
});