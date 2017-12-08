$(document).ready( () => {
    $("#createUserButton").on('click', () => {
        $username = $("#usernameField").val();
        $password = $("#passwordField").val();
        $repeatPassword = $("#repeatPasswordField").val();

        if ($username.length > 4 && $password.length > 4) {
            if ($password == $repeatPassword) {
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