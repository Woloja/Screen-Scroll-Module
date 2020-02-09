let defaultConsole = console.warn;
console.warn = function (message) {
    if (typeof message === "string" && arguments.length === 1){
        defaultConsole.apply(console, ["%c"+message, "background: #222; color: #bada55; padding: 3px 10px; font-size: 15px;"]);
    } else {
        defaultConsole.apply(console, arguments);
    }
};



/**
 *  height`s per row
 *  only ready
 *  @param container {string}
 **/
export function equalRowHeight(container) {
    let currentTallest = 0,
        topPosition = 0,
        currentRowStart = 0,
        rowDivs = [];
    
    getElements(container).forEach((item) => {
        
        
        item.style.height = 'auto';
        topPosition = item.offsetTop;
        
        if (currentRowStart !== topPosition) {
            for (let currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
                rowDivs[currentDiv].style.height = `${currentTallest}px`;
            }
            
            rowDivs.length = 0; // empty the array
            currentRowStart = topPosition;
            currentTallest = item.getBoundingClientRect().height;
            rowDivs.push(item);
        } else {
            rowDivs.push(item);
            currentTallest = (currentTallest < item.getBoundingClientRect().height) ? (item.getBoundingClientRect().height) : (currentTallest);
        }
        
        for (let currentDiv = 0; currentDiv < rowDivs.length; currentDiv++) {
            rowDivs[currentDiv].style.height = `${currentTallest}px`;
        }
        
    });
    
}

/*********************
 *** Check parameter on string or DOM object/objects and return Array of object
 or false is not find element on page
 * @param {string | Element | NodeList | Document | Window} parameter - Function to execute when ready
 * @returns {boolean | Array}
 *********************/
export const getElements = (parameter) => {
    if ((typeof parameter === "string" && typeof parameter !== "object") || parameter.constructor === String) {
        try {
            if (document.querySelectorAll(parameter).length > 0) {
                return Array.from(document.querySelectorAll(parameter));
            } else {
                return false;
            }
        } catch(e) {
            console.warn(e);
            return false
        }
    } else {
        if (parameter.constructor === NodeList) {
            return Array.from(parameter);
        } else {
            return Array.from([parameter]);
        }
    }
};

/*********************
 *** any addEventListener
 * @param elements  - Function to execute when ready
 * @param {string} event - Event tpe
 * @param {function} callback - Execute function when triggered event
 * @returns {Element}
 *********************/
export const createEvent = (elements, event, callback) => {
    elements = getElements(elements);
    if (elements) {
        elements.forEach((item) => {
            return item.addEventListener(event, callback, false);
        });
    }
};

/*********************
 *** Check device gesture
 * @returns {boolean}
 *********************/
export function isTouchDevice() {

    let prefixes = " -webkit- -moz- -o- -ms- ".split(" ");
    let mq = function (query) {
        return window.matchMedia(query).matches;
    };

    if (("ontouchstart" in window) || window.DocumentTouch && document instanceof window.DocumentTouch) {
        return true;
    }
    let query = ["(", prefixes.join("touch-enabled),("), "heartz", ")"].join('');
    console.log(query);
    return mq(query);
}

/*********************
 * @param event {object} - DOM event
 * @param block {string} - css selector of container
 * @param button {string} - css selector of button
 * @param activeClass {string} - class for check button and block state
 * @returns {void}
 *********************/
export function closeOnOutsideClick(event, block, button, activeClass)  {
    if (typeof TweenMax === "undefined") throw new Error('for execute need <a href="https://www.npmjs.com/package/gsap">TweenMax</a>');

    block = getElements(block);
    button = getElements(button);

    if (!block || !button) return false;

    let isTargetBlock = checkOutsideClick(event, block, button, activeClass);
    if (isTargetBlock) {
        block.classList.remove(activeClass);
        button.classList.remove(activeClass);
    }
}

/*********************
 *** Check if click out of active block and active button
 * @param event {object} - DOM event
 * @param block {string} - css selector of container
 * @param button {string} - css selector of button
 * @param activeClass {string} - class for check button and block state
 * @returns {boolean}
 *********************/
function checkOutsideClick(event, block, button, activeClass) {
    return (
        block.classList.contains(activeClass) &&
        button.classList.contains(activeClass) &&
        !block.contains(event.target) &&
        !button.contains(event.target)
    );
}

/*********************
 *** Replace image to background-image if not support object-fit property
 * @param elements
 * @param size
 * @param needed
 * @returns {undefined}
 *********************/
export function objectFitImages(elements, size, needed) {
    if (needed) {
        getElements(elements).forEach((item)=>{
            let src = item.getAttribute("src");
            if (src.length) {
                item.cssText = `background-image: url(${src});
                                background-size: ${size};
                                background-position: center;
                                background-repeat: no-repeat;`;
                item.setAttribute('src', '');
                item.setAttribute('alt', '');
            }
        })
    }
}

export function getSiblings(elem) {
    // Setup siblings array and get the first sibling
    let siblings = [];
    let sibling = elem.parentNode.firstChild;
    // Loop through each sibling and push to the array
    while (sibling) {
        if (sibling.nodeType === 1 && sibling !== elem) {
            siblings.push(sibling);
        }
        sibling = sibling.nextSibling
    }
    return siblings;
}

export function isExist(elements, callback) {
    // if elements = its a "css sting"
    if (typeof elements === "string") {
        elements = document.querySelectorAll(elements);
    }

    if (!elements) return false;

    if (elements.length > 0) {
        return callback(elements);
    } else {
        return false;
    }
}

export function isExistEach(elements, callback) {
    // if elements = its a "css sting"
    if (typeof elements === "string") {
        elements = document.querySelectorAll(elements);
    }
    
    if (!elements) return false;
    
    if (elements.length > 0) {
        elements.forEach((item, i, arr) => {
            return callback(item, i, arr);
        });
    } else {
        return false;
    }
}

export function decOfNum(number, titles) {
    let cases = [2, 0, 1, 1, 1, 2];
    return titles[ (number%100>4 && number%100<20)? 2 : cases[(number%10<5)?number%10:5] ];
}


if (!Element.prototype.horizontallyScroll) {
    Element.prototype.horizontallyScroll = function() {
        let scrollPos = 0;
        function scrollHorizontally(elem, e) {
            e = window.event || e;
            let delta = Math.max(-1, Math.min(1, (e.wheelDelta || -e.detail)));
            
            if (elem) {
                elem.scrollLeft -= (delta*40);
                if (!(elem.scrollLeft === 0 && elem.scrollLeft <= scrollPos) && !((elem.offsetWidth + elem.scrollLeft === elem.scrollWidth) && elem.scrollLeft >= scrollPos)) {
                    e.preventDefault();
                } else {
                    console.log("default scroll")
                }
                scrollPos = elem.scrollLeft;
            }
        }
        if (this.addEventListener) {
            // IE9, Chrome, Safari, Opera
            this.addEventListener("mousewheel", scrollHorizontally.bind(this, this), false);
            // Firefox
            this.addEventListener("DOMMouseScroll", scrollHorizontally.bind(this, this), false);
        } else {
            // IE 6/7/8
            this.attachEvent("onmousewheel", scrollHorizontally);
        }
    };
}