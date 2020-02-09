/*********************
 * Section import vanilla JS libs
 * Import examples:
 *********************/

import debounce from "lodash.debounce";
import {TweenMax, TimelineMax} from "gsap/TweenMax";
import ScrollToPlugin from "gsap/ScrollToPlugin";
import DrawSVGPlugin from "./DrawSVGPlugin";

import Swiper from 'swiper';

const plugins = [ScrollToPlugin, DrawSVGPlugin];// <--- for production!

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


/*********************
 * Section for creating in file function
 * eg:
 *      rendering custom html from json,
 *      load and resize some specific elements on page,
 *      and other
 * Initialize examples:
 *********************/


async function getPageParams() {
    
    let headerRect = document.querySelector('header').getBoundingClientRect();
    let canResolve = true;
    
    return new Promise((resolve, reject) => {
        
        if (window.hasOwnProperty('site')) {
            window.site.scrollBarWidth = window.innerWidth - document.body.scrollWidth;
            window.site.headerHeight = headerRect.height;
        }
        
        let checkResizeDiff = setInterval(() => {
            headerRect = document.querySelector('header').getBoundingClientRect();
            
            window.site.scrollBarWidth = window.innerWidth - document.body.scrollWidth;
            window.site.headerHeight = headerRect.height;
            
            if (window.site.scrollBarWidth !== window.innerWidth - document.body.scrollWidth) canResolve = false;
            if (window.site.headerHeight !== headerRect.height) canResolve = false;
            
            
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
function readyAndResize(e) {
    getPageParams().then(() => {
        let max700 = window.matchMedia( '(max-width:700px)' );
        if (!max700) {
            max700 = window.innerWidth  < 700 ? max700.matches = true :  max700.matches = false
        }
        
        let letters = document.querySelector('.screen-4 .line-1');
        if (max700.matches) {
            let slideBottom = document.querySelector('.gallery-main .swiper-slide:first-child').offsetHeight;
            letters.style.top = `${slideBottom}px`;
        } else {
            letters.style.top = ``;
        }
        
    });
}


/*********************
 * initialize some site properties
 *********************/

createEvent(window, 'DOMContentLoaded', debounce(readyAndResize, 100));
createEvent(window, 'resize', debounce(readyAndResize, 100));

let pageScrollInstance = null;

createEvent(document, 'DOMContentLoaded', function(e) {
    
    
    
    let mobileMenuTL = new TimelineMax({paused: true});
    let activePanel = document.querySelector('.active-panel');
    pageScrollInstance = new PageScroll({
        wrapper: '.main-sections',
        sections: '.main-sections .section',
        pagination: '.scroll-pagination',
        speed: window.site.isSafari ? 1200 : 700,
        easing: 'cubic-bezier(0.45, 0.05, 0.55, 0.95)',
        startIndex: 0,
        offScroll: '.departments, .menu, .case-left',
        toggleScroll: 1000,
        onInit(instance, section) {
            document.body.classList.add('loaded');
            activePanel.textContent = section.getAttribute('data-name');
            
            isExist('.swiper-container',() => {
                
        
                let galleryThumbs = new Swiper('.gallery-thumbs', {
                    spaceBetween: 20,
                    slidesPerView: 'auto',
                    loop: false,
                    freeMode: true,
                    noSwiping: true,
                    onlyExternal: true,
                    allowTouchMove: false,
                    watchSlidesVisibility: true,
                    watchSlidesProgress: true
                });
                
                responsiveInitSwiper('(max-width:700px)', '.gallery-main', {
                    spaceBetween: 0,
                    slidesPerView: 1,
                    loop:true,
                    thumbs: {
                        swiper: galleryThumbs,
                    }
                });
        
            });
            
            document.querySelector('.active-section').innerHTML = section.hasAttribute('data-name') ? section.getAttribute('data-name') : '';
            
            mobileMenuTL
                .set('.wrap-mobile', {pointerEvents: "all"})
                .to('.wrap-mobile', 0.35, {x: 0, y:0, opacity: 1})
                .staggerTo('.wrap-mobile a', 0.4, {x: 0, y: 0, opacity: 1}, -0.05)
                .to('.wrap-mobile path', 0.4, {opacity: 1});
            
            createEvent('.burger-button', 'click', function () {
                this.classList.toggle('active');
        
                if (this.classList.contains('active')) {
                    mobileMenuTL.timeScale(1).play();
                } else {
                    mobileMenuTL.timeScale(1).reverse();
                }
            });
            
        },
        onScroll(instance, panel) {
            let output = document.querySelector('.active-section');
            let scrollTop = window.scrollY || window.pageYOffset;
            
            if (panel) {
                output.innerHTML = panel.hasAttribute('data-name') ? panel.getAttribute('data-name') : '';
            }
            
            if (scrollTop > 10 && window.innerWidth <= 700) {
                TweenMax.to('.logo', 0.35, {opacity: 0});
            } else {
                TweenMax.to('.logo', 0.35, {opacity: 1});
            }
            
        },
        onResize() {
            let scrollTop = window.scrollY || window.pageYOffset;
            if (scrollTop > 10 && window.innerWidth <= 700) {
                TweenMax.to('.logo', 0.35, {opacity: 0});
            } else {
                TweenMax.to('.logo', 0.35, {opacity: 1});
            }
        },
        
        beforeScroll(inst, next, current) {
            
            if (window.innerWidth <= 700) {
                mobileMenuTL.timeScale(2).reverse();
                document.querySelector('.burger-button').classList.remove('active');
            }
            
            activePanel.textContent = next.getAttribute('data-name');
            let svg = next.querySelectorAll('.big-letters path');
        },
        afterScroll(inst, current, prev) {
            // let svg = current.querySelectorAll('.big-letters path');
            // TweenMax.staggerFrom(svg, 0.7, {
            //     drawSVG: 0,
            //     onStart() {
            //         this.target.style.strokeOpacity = 1;
            //     }
            // }, 0.6);
        }
    });
    
    createEvent('.flex-button', 'click', function () {
        let id = this.dataset.video ? this.dataset.video : false;
        let video = document.querySelector(`video[id="${id}"]`);
        if (id && video) {
            let isPause = video.paused;
            console.log(video);
            if (isPause) {
                video.play();
                TweenMax.to('.video-holder', 0.3, {opacity:0, y: '-5%', pointerEvents: 'none'});
            } else {
                video.pause();
                TweenMax.to('.video-holder', 0.3, {opacity:1, y: '0%', pointerEvents: 'all'});
            }
        }
    });
    let video = document.querySelector(`#video-1`);
    
    video.onpause = function () {
    }
    
    
});

createEvent(window, 'load', function () {});

createEvent(document, 'scroll', function () {});








function responsiveInitSwiper(query, selector, options) {
    let breakpoint = window.matchMedia( query );
    let slider;
    
    const breakpointChecker = function(event) {
        
        event = event || breakpoint;
        
        if ( event.matches === true ) {
            if ( slider !== undefined ) slider.destroy( true, true );
            
            return false;
        } else {
            
            return slider = new Swiper(selector, options);
        }
        
    };
    
    breakpoint.addListener(breakpointChecker);
    slider = breakpointChecker();
    return slider;
}