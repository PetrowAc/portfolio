<!-- Fonts -->
<link rel="preconnect" href="https://fonts.gstatic.com">
<link href="https://fonts.googleapis.com/css2?family=Roboto:wght@100;300;400;500;700;900&display=swap" rel="stylesheet">

<!-- Style css -->
<link rel="stylesheet" href="css/bootstrap.min.css">
<link rel="stylesheet" href="css/main.min.css?v=<?php echo $css_version;?>">
<?php if(isset($table)){ echo '<link rel="stylesheet" href="css/table.min.css?v='.$css_version.'">';} ?>
<?php if(isset($hotels)){ echo '<link rel="stylesheet" href="css/hotels.min.css?v='.$css_version.'">';} ?>

<!-- Favicons -->
<link rel="apple-touch-icon" sizes="180x180" href="images/favicons/apple-touch-icon.png">
<link rel="icon" type="image/png" sizes="32x32" href="images/favicons/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="images/favicons/favicon-16x16.png">
<link rel="manifest" href="images/favicons/site.webmanifest">
<link rel="mask-icon" href="images/favicons/safari-pinned-tab.svg" color="#5bbad5">
<link rel="shortcut icon" href="images/favicons/favicon.ico">
