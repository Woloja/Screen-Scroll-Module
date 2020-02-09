//css-libs
import "./_system-classes/css/system.css"
import "./_system-classes/css/sweetalert2.css"

//js-libs
import Swal from 'sweetalert2/dist/sweetalert2'
const queryString = require('query-string');


global.queryString = queryString;
global.Swal = Swal;

global.isDomainLink = function (link) {
    return link.indexOf(location.origin) === 0 || link.startsWith("/");
};

document.addEventListener('DOMContentLoaded', function () {});
