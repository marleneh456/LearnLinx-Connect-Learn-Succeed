<?php
session_start();

$servername = "localhost";
$username = "root";
$password = "";
$database = "learn_linx";

$conn = mysqli_connect($servername, $username, $password, $database);

if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['but_submit'])) {
    $uname = htmlspecialchars($_POST['txt_uname']);
    $email = htmlspecialchars($_POST['txt_email']);
	$password = $_POST['txt_pwd']; // Assuming this is the password entered by the user
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

    if ($uname != "" && $password != "" && $email != "") {
        $sql_query = "SELECT * FROM Users WHERE username = '$uname' AND email = '$email'";
        $result = mysqli_query($conn, $sql_query);
        $row = mysqli_fetch_array($result);

        if ($row) {
            if ($password === $row['password']) {
                $_SESSION['uname'] = $uname;
                $_SESSION['name'] = $row['name'];
                header('Location: dashboard.php');
                exit;
            }
        } else {
            echo "<p class='error'>Invalid Username, Email or Password! <br> Please Try Again!</p>";
        }
    }
}
?>
<html>
<head>
    <title>Login</title>
    <link href="login.css" rel="stylesheet" type="text/css">
	<link href='https://fonts.googleapis.com/css?family=Overpass' rel='stylesheet'>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>

</head>
<body>
<div class="background">
    <img src="bg.jpg" alt="sample image" class="blur">
</div>
<div class="login">
    <form method="post" action="">
        <div id="div_login">
            <h1>Login</h1>
            <?php if (isset($_GET['logout']) && $_GET['logout'] == 'success') {
                echo "<p>Logout successful!</p>";
            } ?>
            <div>
                <label for="txt_email">Email</label>
                <br>
                <br>
                <input type="email" class="textbox" id="txt_email" name="txt_email" placeholder="Email" required/>
            </div>
            <div>
                <label for="txt_uname">Username</label>
                <br>
                <br>
                <input type="text" class="textbox" id="txt_uname" name="txt_uname" placeholder="Username" required/>
            </div>
            <div>
                <label for="txt_pwd">Password</label>
                <br>
                <br>
                <input type="password" id="txt_pwd" name="txt_pwd" placeholder="Password" required/>
                <br>
                <br>
                <input type="checkbox" id="show-password" onclick="togglePasswordVisibility()">Show Password
            </div>
            <div id="password-validation">
                <h3>Password must contain the following:</h3>
                <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
                <p id="capital" class="invalid">A <b>capital (uppercase)</b> letter</p>
                <p id="number" class="invalid">A <b>number</b></p>
				<p id="length" class="invalid">At least <b>8 characters</b></p>
            </div>
            <div>
                <input type="submit" value="Submit" name="but_submit" id="but_submit"/>
            </div>
            <p class="link">Don't have an account? <a href="registration.php">Register Now</a></p>
            <p class="link">Forgot<a href="reset_password.php"> password?</a></p>
        </div>
    </form>
</div>

<script src="password-validation.js"></script>


</body>
</html>
