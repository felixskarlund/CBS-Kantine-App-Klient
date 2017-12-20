$(document).ready( () => {

    // When createUserButton is clicked check whether all requirements are fulfilled
    $("#createUserButton").on('click', () => {
        $username = $("#usernameField").val();
        $password = $("#passwordField").val();
        $repeatPassword = $("#repeatPasswordField").val();

        if ($username.length > 4 && $password.length > 4) {
            if ($password == $repeatPassword) {

                // If all requirements are fulfilled, create user with input values
                SDK.Users.createUser($username, $password, (error, data) => {
                    if (error) {
                        alert("Error. Could not create user.");
                        $(".inputGroup .inputField").addClass("formError");
                    }
                    else {
                        alert("User is created. You can now log in.");
                        window.location.href = "index.html";
                    }
                })
            }
            else {
                alert("Your passwords are not equal.");
                $(".inputGroup .passwordField").addClass("formError");
            }
        }
        else {
            alert("Username and password must be at least 5 characters.");
            $(".inputGroup .inputField").addClass("formError");
        }
    });
});

// Assign enter-key function in both inputs to function as clicks
$("#usernameField").keypress(function (e) {
    if (e.which == 13) {
        $("#createUserButton").click();
    }
});

$("#passwordField").keypress(function (e) {
    if (e.which == 13) {
        $("#createUserButton").click();
    }
});

$("#repeatPasswordField").keypress(function (e) {
    if (e.which == 13) {
        $("#createUserButton").click();
    }
});