
<?php include "php/prepare.php";?>
<?php include "php/data.php";?>

<!DOCTYPE html>
<html lang="ua">

    <head>
        <meta charset="UTF-8">
        <title>Нахаба. Креативна агенція. Айдентика, брендинг, рекламна кампанія</title>
        <meta name="description" content="">

        <!-- Favicon -->
<!-- TODO favicon -->
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
        <meta name="google-site-verification" content="vGKnuvF--xInmOBFoWPiz1pqzXZLRaRGd2fu4DjFisA">

        <!-- Custom Browsers Color Start -->
<!-- TODO color -->
        <meta name="msapplication-TileColor" content="#ffffff">
        <meta name="msapplication-tap-highlight" content="no">

        <!-- CSS -->
        <link rel="stylesheet" href="css/app.css">

        <!-- from back end -->
        <script type="text/javascript">
            window.site = {
                language: 'ua',
                isExplorer: false,
                isSafari: false,
                link: 'current-link'
            }
        </script>
        <!-- Global site tag (gtag.js) - Google Analytics -->
        <script async src="https://www.googletagmanager.com/gtag/js?id=UA-157740975-1"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'UA-157740975-1');
        </script>
    </head>

    <body class="<?=$devise_type;?> <?=$old_browser_class;?>">

        <div class="main-sections">

            <div data-name="Про нас" class="section screen-1">
                <header>
                    <div class="logo"><?php include "svg/logo.html";?></div>

                    <div class="wrap-mobile">
                        <nav class="scroll-pagination"></nav>
                        <div class="lang">
                            <a href="#" class="active" style="pointer-events: none;">укр</a>
<!--                            <a href="#">eng</a>-->
                        </div>
                        <div class="absolute-image"><?php include "svg/screen1-absolute-image.html";?></div>
                    </div>

                    <div class="mobile-header">
                        <p class="active-section"></p>
                        <div class="burger-button"><?php include "svg/burger-button.html";?></div>
                    </div>
                </header>
                <div class="screen-page">

                    <div class="big-letters-marquee line-1">
                        <div class="big-letters"><?php include "svg/screen1-line1.html";?></div>
                        <div class="big-letters"><?php include "svg/screen1-line1.html";?></div>
                        <div class="big-letters"><?php include "svg/screen1-line1.html";?></div>
                    </div>

                    <div class="big-letters-marquee line-2">
                        <div class="big-letters"><?php include "svg/screen1-line2.html";?></div>
                        <div class="big-letters"><?php include "svg/screen1-line2.html";?></div>
                    </div>

                    <div class="section-content">
                        <div class="bordered-content">
                            <p>Ми з'явилися, щоб врятувати вас від шестизначних  цифр на медійку. Щоб створювати  рекламу, яку хочеться
                                надсилати друзям у месенджері і обговорювати в ліжку.  Щоб забрати тротуари у білбордів і віддати їх пішоходам. </p>
                            <p>&nbsp;</p>
                            <p>&nbsp;</p>
                            <p><b>Бо хорошій рекламі не потрібно багато місця і грошей, їй потрібна влучна нахабна ідея.</b></p>
                            <div class="absolute-image"><?php include "svg/screen1-absolute-image.html";?></div>
                        </div>
                    </div>
                    <div class="big-letters line-3">
                        <div class="absolute-image"><?php include "svg/screen1-absolute-image.html";?></div>
                        <?php include "svg/screen1-line3.html";?>
                    </div>
                </div>
            </div>

            <div data-name="Про ідею" class="section screen-2">

                <div class="screen-page">

                    <div class="big-letters-marquee line-1">
                        <div class="big-letters"><?php include "svg/screen2-line1.html";?></div>
                        <div class="big-letters"><?php include "svg/screen2-line1.html";?></div>
                        <div class="big-letters"><?php include "svg/screen2-line1.html";?></div>
                    </div>

                    <div class="big-letters-marquee line-2">
                        <div class="big-letters"><?php include "svg/screen2-line2.html";?></div>
                        <div class="big-letters"><?php include "svg/screen2-line2.html";?></div>
                        <div class="big-letters"><?php include "svg/screen2-line2.html";?></div>
                    </div>


                    <div class="section-content">
                        <div class="bordered-content">
                            <p>Нахабі Малевичу знадобилося кілька годин <br>  <span class="inverse">і лише один колір,</span>  щоб створити картину  про яку знають усі.</p>
                            <p class="show-1000">&nbsp;</p>
                            <p class="show-1000">&nbsp;</p>
                            <p>Четвірці нахаб із Beatles –</p>
                            <p class="big-text weight-7">13 годин і 400 фунтів,</p>
                            <p>щоб записати перший платиновий альбом.</p>
                            <p class="hide-1000">&nbsp;</p>
                            <p class="hide-1000">&nbsp;</p>
                            <div class="absolute-text"><?php include "svg/screen2-absolute-text.html";?></div>
                        </div>
                        <div class="section-2-text">
                            <p class="georgia weight-7">Будьте нахабою — реалізовуйте ідеї, <br>  на які не вистачить духу у конкурентів.</p>
                        </div>
                    </div>

                </div>

            </div>

            <div data-name="Послуги" class="section screen-3">

                <div class="big-letters-marquee line-1">
                    <div class="big-letters"><?php include "svg/screen3-line1.html";?></div>
                    <div class="big-letters"><?php include "svg/screen3-line1.html";?></div>
                </div>

                <div class="section-content">

                    <div class="section-3-text">
                        <p class="weight-7 georgia">Рекламна  кампанія</p>
                        <p class="weight-7 pink">Бренд повинен бути другом, а не продавцем.</p>
                        <p>&nbsp;</p>
                        <p class="weight-3">Друга завжди приємно зустріти на вулиці, отримати від нього повідомлення,  його легко пробачити. І для того щоб потоваришувати не потрібно бути багатим  і тусуватись зі знаменитостями. Потрібно бути цікавим, чесним і не намагатися  йому весь час щось впарити. </p>
                        <p>&nbsp;</p>
                        <p class="hide-500">&nbsp;</p>
                        <p class="weight-3">Щоб ви подружилися з клієнтом, ми спочатку спілкуємося з ним самі.  Цікавимося, що його хвилює, де він буває і як приймає рішення.  Зануди це називають стратегією. Потім знаходимо нестандартне рішення  для того, щоб ваша зустріч пройшла цікаво і не банально: іноді допомагаємо йому,  іноді підтримуємо, а іноді просто викликаємо нові емоції. І там, де інші розігрують  чашки та розміщують білборди, ми створюємо для нього цінність. </p>
                        <p>&nbsp;</p>
                        <p class="hide-500">&nbsp;</p>
                        <p class="weight-6">Можемо реалізувати одну деталь в ансамблі  вашої комунікації, можемо побудувати з фундаменту  або реконструювати – все у ваших руках. </p>
                    </div>

                    <div class="bordered-content">
                        <p class="weight-7 georgia">Айдентика</p>
                        <p class="weight-7 pink">Бренд без айдентики – це людина без обличчя.</p>
                        <p>&nbsp;</p>
                        <p class="weight-3">Його неможливо впізнати. Йому щоразу доводиться представлятися.  Коли він говорить у натовпі, його слова плутають зі словами інших.  Йому доводиться витрачати більше грошей і часу на те, щоб його почули. </p>

                        <p>&nbsp;</p>
                        <p class="hide-500">&nbsp;</p>
                        <p class="hide-500">&nbsp;</p>
                        <p class="weight-5">Ми створюємо айдентику, яку можна не лише показати,  але і розповісти. В ній є історія, що резонує з філософією бренду  і стиль, який впізнають лише по фрагменту.  Зробіть себе впізнаваним і вам не доведеться повторювати двічі.</p>
                    </div>

                </div>

            </div>

            <div data-name="Нахаби" class="section screen-4">

                <div class="big-letters-marquee line-1">
                    <div class="big-letters"><?php include "svg/screen4-line1.html";?></div>
                    <div class="big-letters"><?php include "svg/screen4-line1.html";?></div>
                </div>



                <div class="section-content">

                    <div class="swiper-container gallery-main">
                        <div class="swiper-wrapper">

                            <?php for($i = 0; $i < count($slider); $i++) { ?>
                                <div class="swiper-slide">
                                    <h3 class="georgia weight-7 show-700"><?= $slider[$i]['name'];?></h3>
                                    <div class="slide-image">
                                        <div class="absolute-text"><?php include($slider[$i]['svg']);?></div>
                                        <img src="<?= $slider[$i]['image'];?>" alt="">
                                    </div>
                                    <div class="slide-content">
                                        <h3 class="georgia weight-7 hide-700"><?= $slider[$i]['name'];?></h3>
                                        <p class="weight-7 pink"><?= $slider[$i]['career'];?></p>
                                        <p class="weight-3"><?= $slider[$i]['text'];?></p>
                                    </div>
                                </div>
                            <?php }?>

                        </div>
                    </div>

                    <div class="swiper-container gallery-thumbs">
                        <div class="swiper-wrapper">
                            <?php for($i = 0; $i < count($slider); $i++) { ?>
                                <div class="swiper-slide">
                                    <a href="#" onclick="return false;">
                                        <img src="<?= $slider[$i]['preview'];?>" alt="<?= $slider[$i]['name'];?> - <?= $slider[$i]['career'];?>">
                                    </a>
                                </div>
                            <?php }?>
                        </div>
                    </div>

                </div>

            </div>

            <div data-name="Портфоліо" class="section screen-5">

                <div class="big-letters-marquee line-1">
                    <div class="big-letters"><?php include "svg/screen5-line1.html";?></div>
                    <div class="big-letters"><?php include "svg/screen5-line1.html";?></div>
                </div>

                <div class="section-content">
                    <div class="video-wrap">
                        <div class="video-case">
                            <div class="video-holder" style="background: url(/video/poster.jpg) center/cover no-repeat">
                                <div class="flex-button" data-video="video-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 275.8 390.3">
                                        <polygon points="0 0 0 390.3 275.8 195.1 0 0"></polygon>
                                    </svg>
                                </div>
                            </div>
                            <video playsinline preload="metadata" id="video-1" poster="/video/poster.jpg" controls>
                                <source src="/video/showreel.mp4" type="video/mp4">
                            </video>
                        </div>
                        <a href="https://www.behance.net/nahaba_agency" target="_blank" class="button-main">
                            <span>ПЕРЕЙТИ ДО ПОРТФОЛІО</span>
                            <svg class="arrow-btn"><use xlink:href="#arrow-btn"></use></svg>
                        </a>
                    </div>

<!--                    <div class="portfolio-row">-->
<!--                        <div class="portfolio-left">-->
<!--                            <img src="image/1-1.png" alt="">-->
<!--                        </div>-->
<!--                        <div class="portfolio-right">-->
<!--                            <img class="half-image" src="image/1-2.png" alt="">-->
<!--                            <img class="half-image" src="image/1-2.png" alt="">-->
<!--                        </div>-->
<!--                    </div>-->
<!--                    <div class="portfolio-row">-->
<!--                        <div class="portfolio-left order-2">-->
<!--                            <a href="#" class="button-main">-->
<!--                                <span>ПЕРЕЙТИ ДО ПОРТФОЛІО</span>-->
<!--                                <svg class="arrow-btn"><use xlink:href="#arrow-btn"></use></svg>-->
<!--                            </a>-->
<!--                        </div>-->
<!--                        <div class="portfolio-right">-->
<!--                            <img src="image/2-1.png" alt="">-->
<!--                        </div>-->
<!--                    </div>-->
                </div>

            </div>

            <div data-name="Контакти" class="section screen-6">

                <div class="big-letters-marquee line-1">
                    <div class="big-letters"><?php include "svg/screen6-line1.html";?></div>
                    <div class="big-letters"><?php include "svg/screen6-line1.html";?></div>
                </div>

                <div class="section-content">

                    <div class="bordered-content">
                        <h4 class="georgia weight-7">Локація</h4>
                        <p class="weight-3">м. Київ, Дніпровська набережна , 26ж, офіс 48</p>
                        <hr>
                        <h4 class="georgia weight-7">Ми працюємо</h4>
                        <p class="weight-3">Понеділок-П`ятниця</p>
                        <p class="weight-3">10.00-19.00</p>
                        <hr>
                        <h4 class="georgia weight-7">Зв`яжіться з нами</h4>
                        <a class="weight-3" href="tel:+38 093 415 83 10">+38 093 415 83 10</a>
                        <a class="weight-3" href="mailto:nahaba@gmail.com">info@nahaba.agency</a>
                        <div class="absolute-image"><?php include "svg/screen6-absolute-image.html";?></div>
                        <div class="absolute-text"><?php include "svg/screen6-absolute-text.html";?></div>
                    </div>

                    <div class="form-wrap">
                        <p class="weight-7">Не хочу дзвонити, хочу щоб дзвонили мені!</p>
                        <form action="/php/mail.php" method="post">
                            <input type="hidden" name="recepient" value="info@nahaba.agency">
                            <label>
                                <input class="weight-3" name="name" type="text" placeholder="Ім`я *" required>
                            </label>
                            <label>
                                <input class="weight-3" name="phone" type="tel" placeholder="Телефон *" required>
                            </label>
                            <label>
                                <input class="weight-3" name="email" type="email" placeholder="E-mail">
                            </label>
                            <label class="button-main">
                                <input type="submit" value="ЗАЛИШИТИ ЗАЯВКУ">
                                <svg class="arrow-btn"><use xlink:href="#arrow-btn"></use></svg>
                            </label>
                        </form>
                    </div>
                </div>

            </div>

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