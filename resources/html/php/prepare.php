<?php
/**
 * Created by PhpStorm.
 * User: Vladimir
 * Date: 29.01.2020
 * Time: 11:09
 */

include "agent.php";
require_once "Mobile_Detect.php";
$detect = new Mobile_Detect;

$ua_info = parse_user_agent();
$is_old_bool = false;

$iOS_Version = $detect->version('iPhone');

if (!$iOS_Version) {
    $iOS_Version = $detect->version('iPad');
}

if (mb_strtolower($ua_info['browser']) === 'safari') {
    $is_old_bool = version_compare($ua_info['version'], '10.0.3', '<=');
}

if (mb_strtolower($ua_info['browser']) === 'msie') {
    $is_old_bool = version_compare($ua_info['version'], '11.0', '<=');
}

if (mb_strtolower($ua_info['platform']) === 'iphone' || mb_strtolower($ua_info['platform']) === 'ipad') {
    $is_old_bool = version_compare($iOS_Version, '10_9_9', '<=');
}


$devise_type = $detect->isMobile() ? 'mobile' : 'desktop';
$old_browser_class = $is_old_bool ? 'old-browser' : '';