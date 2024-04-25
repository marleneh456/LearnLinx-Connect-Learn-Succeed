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
    $uname = mysqli_real_escape_string($conn, $_POST['txt_uname']);
    $password = $_POST['txt_pwd']; // Get the password as plain text
    $email = mysqli_real_escape_string($conn, $_POST['txt_email']);

    if ($uname != "" && $password != "" && $email != "") {
        $sql_query = "SELECT * FROM users WHERE username = '$uname' AND email = '$email'";
        $result = mysqli_query($conn, $sql_query);
        $row = mysqli_fetch_array($result);

        if ($row) {
            if ($password === $row['password']) {
                $_SESSION['uname'] = $uname;  
                $_SESSION['name'] = $row['name'];  
                header('Location: dashboard.php');
                exit;
            } else {
                echo "Invalid username, email, and/or password";
            }
        } else {
            echo "Invalid username, email, and/or password";
        }
    }
}
?>
<html>
<head>
<title>Login</title>
    <link href="login.css" rel="stylesheet" type="text/css">
	<script src="password-verification.js"></script>
</head>
<body>
<div class="background">
    <img src="bg.jpg" alt="sample image" class="blur">
</div>
<div class="login">
    <form method="post" action="">
        <div id="div_login">
            <h1>Login</h1>
			<div>
			<?php if (isset($_GET['logout']) && $_GET['logout'] == 'success') {
        echo "<p>Logout successful!</p>";
    } ?>
                <label for="txt_email">Email</label>
				<br>
				<br>
                <input type="email" class="textbox" id="txt_email" name="txt_email" placeholder="Email"/>
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
                <input type="password" id="txt_pwd" name="txt_pwd" placeholder="Password" />
				<br>
				<br>
				
				<input type="checkbox" onclick="myFunction()">Show Password
            </div>
            <div>
                <input type="submit" value="Submit" name="but_submit" id="but_submit" />
            </div>
            <p class="link">Don't have an account? <a href="registration.php">Register Now</a></p>
			<p class="link">Forgot<a href="reset_password.php"> password?</a></p>
			
        </div>
		
    </form>
</div>

<script>
function myFunction() {
  var x = document.getElementById("txt_pwd");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}
</script>

</body>
</html>
