<html>
<head>
    <title>Reset Password</title>
    <link href="login.css" rel="stylesheet" type="text/css">
</head>
<body>
<?php
session_start();

// Direct database connection setup
$servername = "localhost";
$username = "root";
$password = ""; // Your database password
$database = "learn_linx"; // Your database name

$conn = mysqli_connect($servername, $username, $password, $database);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

if (isset($_POST['but_reset'])) {
    $uname_email = mysqli_real_escape_string($conn, $_POST['txt_uname_email']);
    $new_password = mysqli_real_escape_string($conn, $_POST['txt_new_pwd']); // Get new password from form
    $hashed_password = password_hash($new_password, PASSWORD_DEFAULT); // Hash the new password

    // Update the user's password
    $sql_query = "UPDATE users SET password = '$hashed_password' WHERE username = '$uname_email' OR email = '$uname_email'";
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
                <label for="txt_new_pwd">New Password</label>
				<br>
				<br>
                <input type="password" class="textbox" id="txt_new_pwd" name="txt_new_pwd" placeholder="New Password"/>
            </div>
			<br>
            <div>
                <input type="submit" value="Reset" name="but_reset" id="but_reset" />
            </div>
			
			<div>
			<p class="link">Go back to the <a href="index.php">Login</a></p>
			</div>
	</div>		
    </form>
</div>
</body>
</html>
