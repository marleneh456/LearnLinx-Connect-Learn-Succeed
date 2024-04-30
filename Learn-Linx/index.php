<!-- Update index.php -->

<!-- Remove the password fields -->

<!DOCTYPE html>
<html>
<head>
    <title>Login</title>
    <link href="login.css" rel="stylesheet" type="text/css">
    <link href='https://fonts.googleapis.com/css?family=Overpass' rel='stylesheet'>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
</head>
<body>

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
    $password = $_POST['txt_pwd'];

    if ($uname != "" && $password != "" && $email != "") {
        $sql_query = "SELECT * FROM Users WHERE username = '$uname' AND email = '$email'";
        $result = mysqli_query($conn, $sql_query);
        $row = mysqli_fetch_array($result);

        if ($row) {
            if (password_verify($password, $row['password'])) {
                $_SESSION['uname'] = $uname;
                $_SESSION['name'] = $row['name'];
                header('Location: dashboard.php');
                exit;
            } else {
                echo "<p class='error'>Invalid Password! <br> Please Try Again!</p>";
            }
        } else {
            echo "<p class='error'>Invalid Username, Email or Password! <br> Please Try Again!</p>";
        }
    }
}
?>

<div class="background">
    <img src="bg.jpg" alt="sample image" class="blur">
</div>

<div class="login">
    <form method="post" action="">
        <div id="div_login">
            <h1>Login</h1>
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
            <div>
                <input type="submit" value="Submit" name="but_submit" id="but_submit"/>
            </div>
            <p class="link">Don't have an account? <a href="registration.php">Register Now</a></p>
            <p class="link">Forgot password?<a href="reset_password.php"> Reset Here</a></p>
			<p class="link">Go back to the <a href="Home.html"> Home Page</a></p>
        </div>
    </form>
</div>

<script src="password-validation.js"></script>

</body>
</html>
