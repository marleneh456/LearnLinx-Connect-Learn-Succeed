<!DOCTYPE html>
<html>
<head>
    <title>Registration</title>
    <link rel="stylesheet" href="login.css"/>
</head>
<body>
<?php
session_start();

$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "learn_linx"; 

$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['but_submit'])) {
    $uname = mysqli_real_escape_string($conn, $_POST['txt_uname']);
    $name = mysqli_real_escape_string($conn, $_POST['name']);
    $email = mysqli_real_escape_string($conn, $_POST['email']); // Capture email from the form and sanitize
    $password = mysqli_real_escape_string($conn, $_POST['txt_pwd']);
    $password = password_hash($password, PASSWORD_DEFAULT); // Hash password

    // SQL query to insert the user data into the database
    $query = "INSERT INTO `users` (username, name, email, password) VALUES ('$uname', '$name', '$email', '$password')";
    $result = mysqli_query($conn, $query);
    if ($result) {
        echo "<div class='form'>
              <h3>You are registered successfully.</h3><br/>
              <p class='link'>Click here to <a href='index.php'>Login</a></p>
              </div>";
    } else {
        echo "<div class='form'>
              <h3>Required fields are missing.</h3><br/>
              <p class='link'>Click here to <a href='registration.php'>registration</a> again.</p>
              </div>";
    }
} else {
?>
    <form class="form" action="" method="post">
    <div id="div_reg">
        <h1 class="registration-title">Registration</h1>
        
        <div>
        <label for="txt_uname">Username</label>
        <br><br>
        <input type="text" class="textbox" id="txt_uname" name="txt_uname" placeholder="Username" />
        <br>
        </div>
        
        <div>
        <label for="name">Name</label>
        <br><br>
        <input type="text" class="login-input" id="name" name="name" placeholder="Name">
        <br><br>

        <label for="email">Email</label>
        <br><br>
        <input type="email" class="textbox" id="email" name="email" placeholder="Email">
        <br><br>

        <label for="txt_pwd">Password</label>
        <br><br>
        <input type="password" class="textbox" id="txt_pwd" name="txt_pwd" placeholder="Password"/>
        <br>
        </div>
        
        <div>
        <br>
        <input type="submit" value="Submit" name="but_submit" id="but_submit" />
        </div>
        <p class="link">Already have an account? <a href='index.php'>Login here</a></p>
    </div>
    </form>
<?php
}
?>
</body>
</html>
