/*********************
 * Section import vanilla JS libs
 * Import examples:
 *********************/

import debounce from "lodash.debounce";
import PageScroll from "./pageScrollModule";

/*********************
 * Section import custom functions
 * Import examples:
 *********************/
import {
    createEvent,
    isExist,
    isExistEach,
    equalRowHeight,
    gsapToggleHeight,
    scrollToElem
} from "./delta-functions";

async function getPageParams() {

    let canResolve = true;
    
    return new Promise((resolve, reject) => {
        
        if (window.hasOwnProperty('site')) {
            window.site.scrollBarWidth = window.innerWidth - document.body.scrollWidth;
        }
        
        let checkResizeDiff = setInterval(() => {
            window.site.scrollBarWidth = window.innerWidth - document.body.scrollWidth;
            if (window.site.scrollBarWidth !== window.innerWidth - document.body.scrollWidth) canResolve = false;
            
            
            if (canResolve) {
                clearInterval(checkResizeDiff);
                resolve();
            }
            
        }, 300);
    });
}

/**
 *
 * @param {Event} e
 */
createEvent(window, 'DOMContentLoaded', debounce(readyAndResize, 100));
createEvent(window, 'resize', debounce(readyAndResize, 100));
function readyAndResize(e) {
    getPageParams().then(() => {
        console.log('ready and resize');
    });
}

let pageScrollInstance = null;
createEvent(document, 'DOMContentLoaded', function(e) {
    pageScrollInstance = new PageScroll({
        wrapper: '.main-sections',
        sections: '.main-sections .section',
        pagination: '.scroll-pagination',
        speed: 700,
        easing: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        startIndex: 0,
        offScroll: '.departments, .menu, .case-left',
        toggleScroll: 1000,
        onInit(instance, section) {
            document.body.classList.add('loaded');
        },
        onResize() {},
        onScroll(instance, panel) {},
        beforeScroll(inst, next, current) {},
        afterScroll(inst, current, prev) {}
    });
});

function random(min, max) {
    return Math.floor(min + Math.random() * (max + 1 - min));
}