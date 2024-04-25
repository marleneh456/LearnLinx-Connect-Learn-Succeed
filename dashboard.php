<?php
session_start();

$servername = "localhost"; 
$username = "root"; 
$password = ""; 
$database = "tutorial"; 

$conn = mysqli_connect($servername, $username, $password, $database);

	// Check connection
	
	if (!$conn) {
		die("Connection failed: " . mysqli_connect_error());
	}

// Check user login or not
if(!isset($_SESSION['name'])){
    header('Location: index.php');
}


// Logout
if (isset($_POST['but_logout'])) {
    session_destroy();
    header('Location: index.php?logout=success');
    exit;
}

?>
<!DOCTYPE html>
<head>
    <title>Learn Linx Home page</title>
    <link href="Home.css" type="text/css" rel ="stylesheet">
	<link href='https://fonts.googleapis.com/css?family=Oswald' rel='stylesheet'>
	<a id="top"></a>
</head>
<body>
    
    <!-- Navigation Bar - Method 2 -->
    <div class="navigationbar">
	<img src="logo.png" alt="Learn Linx Logo">
        <ul>
            <li><a href="dashboard.php" target = "_blank">Home</a></li>
            <li><a href="Video.html" target = "_self" >Courses</a></li>
			<li><a href= "mailto:email@example.com, secondemail@example.com, thirdemail@example.com, fourthmail@example.com, fifthmail@example.com" target="_blank" >Support</a></li>
            <li><a href="index.php" target = "_blank">Login/Signup</a></li>
        </ul>
    </div>
    
	<br>
	
    <!-- Main Content -->
    <div class="main-content">
	<form method="post">
            <input type="submit" value="Logout" name="but_logout">
        </form>
        <h1>Welcome Back, <?php echo $_SESSION['name']; ?>!</h1>
		<br>
		<p> The Learning Management System (LMS) project aims to revolutionize the online learning experience by
        providing a comprehensive platform for users to access, engage with, and successfully complete courses
        in various programming languages. Designed with simplicity and effectiveness in mind, our LMS offers a
        user-friendly interface accessible through a web browser.
		</p>
    </div>
	
	<!-- Another image -->
	<div class = "second-image">
		<img src = "second_image.jpeg" alt = "Second Image">
	</div>
	
	<!-- Bookmark to go the top -->     
<a href="#top">Go to the top</a>
	
</body>
</html>