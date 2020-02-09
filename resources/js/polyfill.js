
import "core-js/es/reflect"
import "core-js/es/array/from"
import "core-js/es/array/find"
import "core-js/es/array/keys"
import "core-js/es/string/pad-start"
import "core-js/es/string/pad-end"
import "core-js/es/string/repeat"
import "core-js/es/string/starts-with"
import "core-js/es/promise/finally"
import "core-js/es/object/keys"


import {fetch} from 'whatwg-fetch';
require('formdata-polyfill');
let Promise = require("native-promise-only");

if (!window.fetch) {
    window.fetch = fetch;
}
if (!window.Promise) {
    window.Promise = Promise;
}

//POLYFILL`s
/* global CreateMethodProperty */
(function () {
    var call = Function.prototype.call;
    var prototypeOfObject = Object.prototype;
    var owns = call.bind(prototypeOfObject.hasOwnProperty);
    
    var lookupGetter;
    var lookupSetter;
    var supportsAccessors;
    if ((supportsAccessors = owns(prototypeOfObject, "__defineGetter__"))) {
        lookupGetter = call.bind(prototypeOfObject.__lookupGetter__);
        lookupSetter = call.bind(prototypeOfObject.__lookupSetter__);
    }
    function doesGetOwnPropertyDescriptorWork(object) {
        try {
            object.sentinel = 0;
            return Object.getOwnPropertyDescriptor(
                object,
                "sentinel"
            ).value === 0;
        } catch (exception) {
            // returns falsy
        }
    }
    if (Object.defineProperty) {
        var getOwnPropertyDescriptorWorksOnObject =
            doesGetOwnPropertyDescriptorWork({});
        var getOwnPropertyDescriptorWorksOnDom = typeof document == "undefined" ||
            doesGetOwnPropertyDescriptorWork(document.createElement("div"));
        if (!getOwnPropertyDescriptorWorksOnDom ||
            !getOwnPropertyDescriptorWorksOnObject
        ) {
            var getOwnPropertyDescriptorFallback = Object.getOwnPropertyDescriptor;
        }
    }
    
    if (!Object.getOwnPropertyDescriptor || getOwnPropertyDescriptorFallback) {
        var ERR_NON_OBJECT = "Object.getOwnPropertyDescriptor called on a non-object: ";
        
        CreateMethodProperty(Object, 'getOwnPropertyDescriptor', function getOwnPropertyDescriptor(object, property) {
            if ((typeof object != "object" && typeof object != "function") || object === null) {
                throw new TypeError(ERR_NON_OBJECT + object);
            }
            if (getOwnPropertyDescriptorFallback) {
                try {
                    return getOwnPropertyDescriptorFallback.call(Object, object, property);
                } catch (exception) {
                
                }
            }
            if (!owns(object, property)) {
                return;
            }
            var descriptor = { enumerable: true, configurable: true };
            if (supportsAccessors) {
                var prototype = object.__proto__;
                object.__proto__ = prototypeOfObject;
                
                var getter = lookupGetter(object, property);
                var setter = lookupSetter(object, property);
                object.__proto__ = prototype;
                
                if (getter || setter) {
                    if (getter) {
                        descriptor.get = getter;
                    }
                    if (setter) {
                        descriptor.set = setter;
                    }
                    return descriptor;
                }
            }
            descriptor.value = object[property];
            descriptor.writable = true;
            return descriptor;
        });
    }
}());

// Production steps of ECMA-262, Edition 5, 15.4.4.18
// Reference: http://es5.github.io/#x15.4.4.18
if (!Array.prototype.forEach) {
    
    Array.prototype.forEach = function(callback/*, thisArg*/) {
        
        var T, k;
        if (this == null) {throw new TypeError('this is null or not defined');}
        var O = Object(this);
        var len = O.length >>> 0;
        if (typeof callback !== 'function') {
            throw new TypeError(callback + ' is not a function');
        }
        if (arguments.length > 1) {
            T = arguments[1];
        }
        k = 0;
        while (k < len) {
            var kValue;
            if (k in O) {
                kValue = O[k];
                callback.call(T, kValue, k, O);
            }
            k++;
        }
    };
}
if (window.NodeList && !NodeList.prototype.forEach) {
    NodeList.prototype.forEach = Array.prototype.forEach;
}
if (!Element.prototype.closest) {
    Element.prototype.closest = function(s) {
        var el = this;
        
        do {
            if (el.matches(s)) return el;
            el = el.parentElement || el.parentNode;
        } while (el !== null && el.nodeType === 1);
        return null;
    };
}
(function(e) {
    var matches = e.matches || e.matchesSelector || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector;
    !matches ? (e.matches = e.matchesSelector = function matches(selector) {
        var matches = document.querySelectorAll(selector);
        var th = this;
        return Array.prototype.some.call(matches, function(e) {
            return e === th;
        });
    }) : (e.matches = e.matchesSelector = matches);
})(Element.prototype);

/**
 * Number.isFinite
 * Copyright (c) 2014 marlun78
 * MIT License, https://gist.github.com/marlun78/bd0800cf5e8053ba9f83
 *
 * Spec: http://people.mozilla.org/~jorendorff/es6-draft.html#sec-number.isfinite
 */
if (typeof Number.isFinite !== 'function') {
    Number.isFinite = function isFinite(value) {
        
        if (typeof value !== 'number') {
            return false;
        }
        
        if (value !== value || value === Infinity || value === -Infinity) {
            return false;
        }
        return true;
    };
}
if (!Object.hasOwnProperty('getOwnPropertyDescriptors')) {
    Object.defineProperty(
        Object,
        'getOwnPropertyDescriptors',
        {
            configurable: true,
            writable: true,
            value: function getOwnPropertyDescriptors(object) {
                return Reflect.ownKeys(object).reduce((descriptors, key) => {
                    return Object.defineProperty(
                        descriptors,
                        key,
                        {
                            configurable: true,
                            enumerable: true,
                            writable: true,
                            value: Object.getOwnPropertyDescriptor(object, key)
                        }
                    );
                }, {});
            }
        }
    );
}

// З https://github.com/latusinski/polyfill-array-includes/blob/master/array-includes.js
if (!Array.prototype.includes) {
    Object.defineProperty(Array.prototype, 'includes', {
        value: function(searchElement, fromIndex) {
            
            // 1. Нехай O дорівнює ? ToObject(this value).
            if (this == null) {
                throw new TypeError('"this" is null or not defined');
            }
            
            var o = Object(this);
            
            // 2. Нехай len дорівнює ? ToLength(? Get(O, "length")).
            var len = o.length >>> 0;
            
            // 3. Якщо len дорівнює 0, повернути false.
            if (len === 0) {
                return false;
            }
            
            // 4. Нехай n дорівнює ? ToInteger(fromIndex).
            //    (Якщо fromIndex дорівнює undefined, цей крок повертає 0.)
            var n = fromIndex | 0;
            
            // 5. Якщо n ≥ 0, тоді
            //  a. Нехай k дорівнює n.
            // 6. Інакше n < 0,
            //  a. Нехай k дорівнює len + n.
            //  b. Якщо k < 0, нехай k дорівнює 0.
            var k = Math.max(n >= 0 ? n : len - Math.abs(n), 0);
            
            function sameValueZero(x, y) {
                return x === y || (typeof x === 'number' && typeof y === 'number' && isNaN(x) && isNaN(y));
            }
            
            // 7. Повторювати, поки k < len
            while (k < len) {
                // a. Нехай elementK дорівнює результату ? Get(O, ! ToString(k)).
                // b. Якщо SameValueZero(searchElement, elementK) дорівнює true, повернути true.
                // c. Збільшити k на 1.
                if (sameValueZero(o[k], searchElement)) {
                    return true;
                }
                k++;
            }
            
            // 8. Повернути false
            return false;
        }
    });
}

if (typeof Object.assign != 'function') {
    Object.assign = function(target, varArgs) { // .length of function is 2
        'use strict';
        if (target == null) { // TypeError if undefined or null
            throw new TypeError('Cannot convert undefined or null to object');
        }
        
        var to = Object(target);
        
        for (var index = 1; index < arguments.length; index++) {
            var nextSource = arguments[index];
            
            if (nextSource != null) { // Skip over if undefined or null
                for (var nextKey in nextSource) {
                    // Avoid bugs when hasOwnProperty is shadowed
                    if (Object.prototype.hasOwnProperty.call(nextSource, nextKey)) {
                        to[nextKey] = nextSource[nextKey];
                    }
                }
            }
        }
        return to;
    };
}

/**
 * String.endsWith
 * Copyright (c) 2019 Woloja
 */
if (!String.prototype.endsWith) {
    Object.defineProperty(String.prototype, 'endsWith', {
        value: function(searchString, position) {
            var subjectString = this.toString();
            if (position === undefined || position > subjectString.length) {
                position = subjectString.length;
            }
            position -= searchString.length;
            var lastIndex = subjectString.indexOf(searchString, position);
            return lastIndex !== -1 && lastIndex === position;
        }
    });
}


//pollifil object-fit for IE
function changeImg(classElements, size) {
    let src = "";
    document.querySelectorAll(classElements).forEach(function (item) {
        
        src = item.getAttribute("src");
        if (src.length) {
            item.style.backgroundImage = `url(${src})`;
            item.style.backgroundSize = size;
            item.style.backgroundRepeat = 'no-repeat';
            item.style.backgroundPosition = 'center';
            
            item.setAttribute('data-width', item.naturalWidth);
            item.setAttribute('data-height', item.naturalHeight);
            
            item.setAttribute("src", "");
            item.setAttribute("alt", "");
            item.setAttribute("data-src", src);
        }
    });
}

document.addEventListener('DOMContentLoaded', function () {
    if(window.site.isInternetExplorer) {
        // changeImg('.default-slider img', 'cover');
    }
});

