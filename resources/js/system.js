
global.isDomainLink = function (link) {
    return link.indexOf(location.origin) === 0 || link.startsWith("/");
};

document.addEventListener('DOMContentLoaded', function () {});
