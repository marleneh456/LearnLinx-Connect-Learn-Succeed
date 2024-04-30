<!-- registration.php -->

<!-- This is for the new user account -->

<!DOCTYPE html>
<html>
<head>
    <title>Registration</title>
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

$conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

if (isset($_POST['but_submit'])) {
    $uname = htmlspecialchars($_POST['txt_uname']);
    $name = htmlspecialchars($_POST['name']);
    $password = htmlspecialchars($_POST['txt_pwd']);
    $email = htmlspecialchars($_POST['email']);
    $password = preg_replace("/[^a-zA-Z0-9]/", "", $password);

    $errors = array();

    // Check if any required field is empty
    if (empty($uname)) {
        $errors[] = "Username is required.";
    }
    if (empty($name)) {
        $errors[] = "Name is required.";
    }

    // Display error messages if there are any
    if (!empty($errors)) {
        foreach ($errors as $error) {
            echo "<div class='error-field'>
                  <h1>$error</h1><br>
                  <p class='page-link'>Click here to <a href='registration.php'>register</a> again.</p>
                  </div>";
        }
    } else {
        $query = "INSERT INTO Users (username, name, password, email) VALUES ('$uname', '$name', '$password', '$email')";
        $result = mysqli_query($conn, $query);
        if ($result) {
            echo "<div class='form'>
                  <h1>You are registered successfully.</h1><br>
                  <p class='page-link'>Click here to <a href='index.php'>Login</a></p>
                  </div>";
        }
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
            <input type="password" id="txt_pwd" name="txt_pwd" placeholder="Password" required/>
            <br>
            <br>
            <input type="checkbox" id="show-password" onclick="togglePasswordVisibility()">Show Password
        </div>
		
        <br>
		
        <div id="password-validation">
                <h3>Password must contain the following:</h3>
				<p id="capital" class="invalid">A <b>uppercase</b> letter</p>
                <p id="letter" class="invalid">A <b>lowercase</b> letter</p>
                <p id="number" class="invalid">A <b>number</b></p>
				<p id="length" class="invalid">At least <b>8 characters</b></p>
        </div>
			
            <div>
                <input type="submit" value="Submit" name="but_submit" id="but_submit"/>
            </div>
			
             <p class="link">Already have an account? <a href="index.php">Login here</a></p>
			 
    </div>
		
    </form>
	
<?php
}
?>

</div>

<script src="password-validation.js"></script>

</body>

</html>
