<html>
<head>
    <title>Reset Password</title>
    <link href="login.css" rel="stylesheet" type="text/css">
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>
<?php
session_start();

$servername = "localhost";
$username = "root";
$password = ""; 
$database = "learn_linx"; 

$conn = new mysqli($servername, $username, $password, $database);

	// Check connection
	
	if ($conn->connect_error) {
		die("Connection failed: " . $conn->connect_error);
	}

if (isset($_POST['but_reset'])) {
    $uname_email = htmlspecialchars($_POST['txt_uname_email']);
    $new_password = htmlspecialchars($_POST['txt_new_pwd']);

    $new_password = preg_replace("/[^a-zA-Z0-9]/", "", $new_password); // Store only the numbers from the password

    $sql_query = "UPDATE Users SET password = '$new_password' WHERE username = '$uname_email' OR email = '$uname_email'";
    $result = mysqli_query($conn, $sql_query);

    if (mysqli_affected_rows($conn) > 0) {
        echo "Password has been reset successfully.";
    } else {
        echo "Failed to reset password. Please check the username or email provided.";
    }
}
?>

<div class="background">
    <img src="bg.jpg" alt="sample image" class="blur">
</div>

<div class="forgot">
    <form method="post" action="reset_password.php">
        <div id="div_forgot">
		<h1 class="forgot-title">Forgot Password?</h1>
            <div>
                <label for="txt_uname_email">Username or Email</label>
				<br>
				<br>
                <input type="text" class="textbox" id="txt_uname_email" name="txt_uname_email" placeholder="Email or Username"/>
            </div>
			<br>
            <div>
                <label for="txt_pwd">New Password</label>
				<br>
				<br>
                <input type="password" class="textbox" id="txt_pwd" name="txt_new_pwd" placeholder="New Password"/>
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
                <input type="submit" value="Reset" name="but_reset" id="but_reset" />
            </div>
			
			<div>
			<p class="link">Go back to the <a href="index.php">Login</a></p>
			</div>
	</div>		
    </form>
</div>
<script src="password-validation.js"></script>
</body>
</html>
