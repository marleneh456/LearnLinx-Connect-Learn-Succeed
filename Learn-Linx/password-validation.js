$(document).ready(function() {
    var myInput = $("#txt_pwd");
    var letter = $("#letter");
    var capital = $("#capital");
    var number = $("#number");
    var length = $("#length");

    myInput.focus(function() {
        $("#password-validation").css("display", "block");
    });
    myInput.blur(function() {
        $("#password-validation").css("display", "none");
    });
    myInput.keyup(function() {
        var lowerCaseLetters = /[a-z]/g;
        if (myInput.val().match(lowerCaseLetters)) {
            letter.removeClass("invalid").addClass("valid");
        } else {
            letter.removeClass("valid").addClass("invalid");
        }
        var upperCaseLetters = /[A-Z]/g;
        if (myInput.val().match(upperCaseLetters)) {
            capital.removeClass("invalid").addClass("valid");
        } else {
            capital.removeClass("valid").addClass("invalid");
        }
        var numbers = /[0-9]/g;
        if (myInput.val().match(numbers)) {
            number.removeClass("invalid").addClass("valid");
        } else {
            number.removeClass("valid").addClass("invalid");
        }
        if (myInput.val().length >= 8) {
            length.removeClass("invalid").addClass("valid");
        } else {
            length.removeClass("valid").addClass("invalid");
        }
    });

    $("#show-password").click(function() {
        var x = $("#txt_pwd");
        if (x.attr("type") === "password") {
            x.attr("type", "text");
        } else {
            x.attr("type", "password");
        }
    });
});
