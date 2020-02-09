

<!DOCTYPE html>
<html lang="ua">

    <head>
        <meta charset="UTF-8">
        <title>by Woloja</title>
        <meta name="description" content="">

        <link rel="icon" type="image/x-icon" href="favicon.ico">

        <base src="/">
        <meta name="viewport" content="width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no">
<!-- TODO color -->
        <meta name="theme-color" content="#000000">
        <meta name="apple-mobile-web-app-capable" content="yes">
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
        <meta name="format-detection" content="telephone=no">
        <meta name="HandheldFriendly" content="true">

        <meta http-equiv="x-ua-compatible" content="ie=edge">
        <meta http-equiv="Content-Type" content="text/html">

        <!-- Custom Browsers Color Start -->
<!-- TODO color -->
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-tap-highlight" content="no">

        <!-- CSS -->
        <link rel="stylesheet" href="css/app.css">
        <script>window.site = {};</script>
    </head>
    <?php include "php/prepare.php";?>

    <body class="<?=$devise_type. ' ' .$old_browser_class;?>">

        <div class="main-sections">

            <div data-name="Про нас" class="section screen-1">1</div>

            <div data-name="Про ідею" class="section screen-2">2</div>

            <div data-name="Послуги" class="section screen-3">3</div>

            <div data-name="Нахаби" class="section screen-4">4</div>

            <div data-name="Портфоліо" class="section screen-5">5</div>

            <div data-name="Контакти" class="section screen-6">6</div>

        </div>

        <div class="fixed-panel">
            <div class="fixed-content">
                <p class="active-panel">про нас</p>
                <a href="https://www.behance.net/nahaba_agency" target="_blank">наші проекти</a>
            </div>
        </div>

        <div class="svg_container">
            <svg xmlns="http://www.w3.org/2000/svg">
                <!--
                <svg class="arrow-btn"><use xlink:href="#arrow-btn"></use></svg>
                -->
                <symbol id="arrow-btn" viewBox="0 0 6 9" fill="none">
                    <path fill="currentColor" d="M0.886374 8.14352C0.639245 8.14352 0.392115 8.04242 0.218001 7.84022C-0.102144 7.46953 -0.0628279 6.90787 0.307866 6.58773L3.19479 4.07712C1.90859 2.92011 0.667328 1.83049 0.425815 1.65076C0.032654 1.40363 -0.113377 0.903757 0.0944364 0.493747C0.313483 0.0556548 0.847058 -0.124075 1.28515 0.0949708C1.40872 0.156753 1.61653 0.263468 5.12689 3.4256C5.31786 3.59409 5.42457 3.84122 5.41896 4.09397C5.41896 4.34672 5.30662 4.58823 5.11566 4.75673L1.4705 7.92447C1.302 8.0705 1.09419 8.14352 0.886374 8.14352ZM0.431431 1.65076C0.459514 1.66761 0.476364 1.67884 0.493214 1.68446C0.470747 1.67323 0.448281 1.66199 0.431431 1.65076Z"></path>
                </symbol>

            </svg>
        </div>

        <?php if ($is_old_bool) {?>
            <script defer src="js/polyfill.js" type="text/javascript"></script>
        <?php }?>

        <script defer src="js/manifest.js" type="text/javascript"></script>
        <script defer src="js/vendor.js" type="text/javascript"></script>
        <script defer src="js/system.js" type="text/javascript"></script>
        <script defer src="js/app.js" type="text/javascript"></script>

    </body>

</html>