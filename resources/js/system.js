//css-libs
import "./_system-classes/css/system.css"
import "./_system-classes/css/sweetalert2.css"

//js-libs
import Swal from 'sweetalert2/dist/sweetalert2'
import axios from "axios"
import IMask from "imask"
import debounce from "lodash.debounce"
const queryString = require('query-string');

//system_js-libs
import SystemAlert from "./_system-classes/SystemAlert"
import AxiosGet from "./_system-classes/AxiosGet"
import AxiosPost from "./_system-classes/AxiosPost"
import UpdateTab from "./_system-classes/UpdateTab"
import FormController from "./_system-classes/FormController";


global.IMask = IMask;
global.queryString = queryString;
global.Swal = Swal;
global.axios = axios;
window.axios.defaults.headers.common = {
    'X-Requested-With': 'XMLHttpRequest'
};



global.templateTriggers = {
    attributes: {
        checkout: {
            delivery: '[data-checkout="delivery"]',
            payments: '[data-checkout="payments"]',
            deliveryPrice: '[data-delivery-price]'
        },
        comparison: {
            link: 'data-comparison-link',
            quantity: 'data-comparison-quantity',
            item: 'data-comparison-item'
        },
        cart: {
            quantity: 'data-cart-quantity',
            total: 'data-cart-total',
            summary: 'data-cart-summary',
            item: 'data-cart-item'
        },
        favorite: {
            quantity: 'data-favorite-quantity',
            item: 'data-favorite-item'
        },
        filter: {
            products: '[data-filter="products"]',
            tags: '[data-filter="tags"]',
            totalCounters: '[data-filter="counter"]',
            loaders: '[data-filter="loading"]',
            links: '[data-filter="href"]',
            linksID: '#filter-item-',
            linksCounter: '[data-filter="href-count"]',
            pagination: '[data-filter="pagination"]',
            ranges: {
                slider: '[data-filter="range"]',
                param: '[data-filter-param]',
                min: '[data-filter="range-min"]',
                max: '[data-filter="range-max"]'
            },
            sort: {
                event: 'change',
                items: '[data-filter="sort"]'
            }
        },
        forms: {
            el: 'form[action]',
            excludeFieldsClear: ['.form-wrap form'],
            submitOnchange: '[data-send-onchange]',
            phoneMask: 'label input[type="tel"]'
        },
        pagination: {
            list: '[data-pagination="products"]',
            wrapper: '[data-pagination="wrapper"]',
            wantToUpdate: ['products', 'articles']
        }
    },

    cookie: {
        comparisonLink: 'compare_url',
        comparisonQuantity: 'compare_quantity',
        cartQuantity: 'cart_quantity',
        favoriteQuantity: 'favorite_quantity'
    }

};


global.isDomainLink = function (link) {
    return link.indexOf(location.origin) === 0 || link.startsWith("/");
};

global.phoneMask = function (target) {
    if (document.querySelector(target)) {
        document.querySelectorAll(target).forEach(function (item) {
            new IMask(item, {
                mask: 'start (`zero`99) 999-99-99',
                definitions: {
                    '9': /[0-9]/
                },
                blocks: {
                    zero: {
                        mask: IMask.MaskedRange,
                        maxLength: 1,
                        from: 0,
                        to: 0
                    },
                    start: {
                        mask: '{+38 }'
                    }
                }
            });
        });
    }
};

global.onOpenModal = function (selectors = null) {
    document.querySelector('html').style.overflow = 'hidden';
    document.querySelector('body').style.overflow = 'hidden';
    document.querySelector('html').style.marginRight = window.site.scrollBarWidth + 'px';
    document.querySelector('header').style.marginRight = window.site.scrollBarWidth + 'px';
    

    if (selectors) {
        document.querySelectorAll(selectors).forEach((item) => {
            item.style.right = window.site.scrollBarWidth + "px";
            console.log(getComputedStyle(item).width);
            if (parseFloat(getComputedStyle(item).width) === window.innerWidth) {
                item.style.width = "auto";
            }
        });
    }
};

global.onCloseModal = function (selectors) {
    document.querySelector('html').style.overflow = "";
    document.querySelector('body').style.overflow = "";
    document.querySelector('html').style.marginRight = "";
    document.querySelector('header').style.marginRight = "";

    document.querySelectorAll(selectors).forEach((item) => {
        item.style.right = "";
        if (parseFloat(getComputedStyle(item).width) === window.innerWidth) {
            item.style.width = "";
        }
    });
};

global.formControllerInit = function () {
    phoneMask(window.templateTriggers.attributes.forms.phoneMask);

    new FormController({
        el: window.templateTriggers.attributes.forms.el,
        excludeFieldsClear: window.templateTriggers.attributes.forms.excludeFieldsClear,
        submitOnchange: window.templateTriggers.attributes.forms.submitOnchange,
        complete(formController, response) {
            let form = this;
            // console.log('target: formController - ', formController);
            // console.log('target: response - ', response);
            console.log('target: form object - ', form);

            if (this.element.id === 'remove_favorite') {
                this.element.parentElement.removeChild(this.element);
            }
        }
    });
};

global.callModal = async function (src) {
    let type = 'html';
    if (src.startsWith('#')) {
        type = 'inline';
    }
    console.log('callModal', src);
};


document.addEventListener('DOMContentLoaded', function () {
    
    new UpdateTab({
        cookie: {
            comparison: {
                link: window.templateTriggers.cookie.comparisonLink,
                name: window.templateTriggers.cookie.comparisonQuantity,
                buttons: '[data-comparison-link]',
                elements: '[data-comparison-quantity]'
            },
            cart: {
                name: window.templateTriggers.cookie.cartQuantity,
                elements: '[data-cart-quantity]'
            },
            favorite: {
                name: window.templateTriggers.cookie.favoriteQuantity,
                elements: '[data-favorite-quantity]'
            }
        },
        afterUpdate(data) {
            if (data) {
                console.log('UpdateTab->afterUpdate', data);
            }
        }
    });

    formControllerInit();

});
