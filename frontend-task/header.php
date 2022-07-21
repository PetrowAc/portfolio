<?php include 'helpers/svg_icon.php'; ?>
<?php 
    //---- CSS & JS versions
    $css_version = "1.09"; 
    $js_version = "1.09"; 
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <?php include 'config/header_links.php'; ?>
    <?php include 'config/meta_tags.php'; ?>
</head>
<body>
    <header class="header">
        <nav class="navbar nav navbar-expand-lg navbar-light bg-light">
            <div class="container-fluid page-wrapper">
                <!-- <a class="navbar-brand header__logo" href="#">Logo is here</a> -->
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse nav__content" id="navbarNav">
                    <ul class="navbar-nav">
                        <?php include 'components/nav.php'; ?>
                    </ul>
                </div>
            </div>
        </nav>
    </header>