<html>
<head>
    <title>Login</title>
    <link href="login.css" rel="stylesheet" type="text/css">
</head>
<body>
<div class="login">
    <?php if (isset($_GET['logout']) && $_GET['logout'] == 'success') {
        echo "<p>Logout successful!</p>";
    } ?>
    <form method="post" action="" class="form-container">
        <div id="div_login">
            <h1>Login</h1>
            <div>
                <label for="txt_uname">Username</label>
                <input type="text" class="textbox" id="txt_uname" name="txt_uname" placeholder="Username" />
            </div>
            <div>
                <label for="txt_pwd">Password</label>
                <input type="password" class="textbox" id="txt_pwd" name="txt_pwd" placeholder="Password"/>
            </div>
            <div>
                <input type="submit" value="Submit" name="but_submit" id="but_submit" />
            </div>
            <p class="link">Don't have an account? <a href="registration.php">Register Now</a></p>
        </div>
    </form>
</div>
</body>
</html>
