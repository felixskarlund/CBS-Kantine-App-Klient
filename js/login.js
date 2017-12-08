$(document).ready( () => {
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

    $("#newUserButton").on('click', () => {
        window.location.href = "createUser.html";
    });
});

loadUser = () => {
    if (!SDK.Storage.load("isPersonel")) {
        window.location.href = "student.html";
    }
    else {
        window.location.href = "staff.html";
    }
};

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