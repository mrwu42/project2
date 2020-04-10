$(document).ready(function() {
  // Getting references to our form and inputs
  var loginForm = $("form.login");
  var userInput = $("#userinput");
  var passwordInput = $("input#password-input");

  // When the form is submitted, we validate there's an email and password entered
  loginForm.on("submit", function(event) {
    event.preventDefault();
    var userData = {
      username: userInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.username || !userData.password) {
      return;
    }

    // If we have an email and password we run the loginUser function and clear the form
    loginUser(userData.username, userData.password);
    userInput.val("");
    passwordInput.val("");
  });

  // loginUser does a post to our "api/login" route and if successful, redirects us the the members page
  function loginUser(user, password) {
    $.post("/api/login", {
      username: user,
      password: password
    })
      .then(function() {
        window.location.replace("/members");
      })
      // If there's an error, log the error
      .catch(handleLoginErr)
  }

  function handleLoginErr(err) {
    $("#alert .msg").text("Invalid Password.  Try again!");
    $("#alert").fadeIn(500);
  }
});
