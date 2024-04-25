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
    $password = mysqli_real_escape_string($conn, $_POST['txt_pwd']);
    $email = mysqli_real_escape_string($conn, $_POST['email']);
    $password = password_hash($password, PASSWORD_DEFAULT); // Hash the password before storing it

    $query = "INSERT INTO `users` (username, name, password, email) VALUES ('$uname', '$name', '$password', '$email')";
    $result = mysqli_query($conn, $query);
    if ($result) {
        echo "<div class='form'>
              <h3>You are registered successfully.</h3><br/>
              <p class='link'>Click here to <a href='index.php'>Login</a></p>
              </div>";
    } else {
        echo "<div class='form'>
              <h3>Required fields are missing.</h3><br/>
              <p class='link'>Click here to <a href='registration.php'>register</a> again.</p>
              </div>";
    }
} else {
?>
<div class="background">
    <img src="bg.jpg" alt="sample image" class="blur">
</div>
<div class="reg">
    <form action="" method="post">
    <div id="div_reg">
        <h1 class="registration-title">Registration</h1>
		<div>
            <label for="email">Email</label>
			<br>
			<br>
            <input type="email" class="textbox" id="email" name="email" placeholder="Email" required />
        </div>
		<div>
            <label for="name">Name</label>
			<br>
			<br>
            <input type="text" class="login-input" name="name" placeholder="Name">
        </div>
        <div>
            <label for="txt_uname">Username</label>
			<br>
			<br>
            <input type="text" class="textbox" id="txt_uname" name="txt_uname" placeholder="Username" />
        </div>
        <div>
            <label for="txt_pwd">Password</label>
			<br>
			<br>
            <input type="password" class="textbox" id="txt_pwd" name="txt_pwd" placeholder="Password"/>
        </div>
		<br>
        <div>
            <input type="submit" value="Submit" name="but_submit" id="but_submit" />
        </div>
        <p class="link">Already have an account? <a href="index.php">Login here</a></p>
    </div>
    </form>
<?php
}
?>
</div>
</body>
</html>
