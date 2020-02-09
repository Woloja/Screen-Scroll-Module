
import AxiosGet from "./AxiosGet";
import AxiosPost from "./AxiosPost";
import Cookie from "./Cookie";

export default class ProductAction {
    
    constructor(props, callback) {
        
        this.data = Object.assign({
            url: null,
            options: false,
            headers: null,
            button: false,
            type: false,
            getData: false
        }, props);
        
        if (!this.data.getData) {
            this.update();
            this.send(callback);
        }
        
    }
    
    getCart() {
        
        this.cart = {
            items: document.querySelectorAll(`[data-cart-item="${this.data.options.id}"]`),
            quantity: document.querySelectorAll('[data-cart-quantity]') ? document.querySelectorAll('[data-cart-quantity]') : false,
            totalPrice: document.querySelectorAll('[data-cart-total]') ? document.querySelectorAll('[data-cart-total]') : false
        };
    }
    
    getComparison() {
        this.comparison = {
            items: document.querySelectorAll(`[data-comparison-item="${this.data.options.id}"]`),
            quantity: document.querySelectorAll('[data-comparison-quantity]') ? document.querySelectorAll('[data-comparison-quantity]') : false,
            link: document.querySelectorAll('[data-comparison-link]') ? document.querySelectorAll('[data-comparison-link]') : false
        };
    }
    
    getFavorite() {
        this.favorite = {
            items: document.querySelectorAll(`[data-favorite-item="${this.data.options.id}"]`),
            quantity: document.querySelectorAll('[data-favorite-quantity]') ? document.querySelectorAll('[data-favorite-quantity]') : false
        };
    }
    
    update() {
        this.getCart();
        this.getComparison();
        this.getFavorite();
    }
    
    send(callback) {
        if (!this.data.url) throw new Error('Can`t send request without url');
        if (!this.data.button) throw new Error('Can`t send request without link element');
        if (!this.data.options) throw new Error('Can`t send request without any options');
        if (!this.data.type) throw new Error('Can`t send request without request type');
        
        let self = this;
        let headers = {...this.data.headers, ...{
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json"
            }};
    
        let onAlways = () => {
            if (typeof this.data.button === "object") {
                this.data.button.classList.remove('disabled');
            }
        };
        
        let onComplete = (instance, response) => {
            
            self.canReloadPage(response);
        
            if (response.hasOwnProperty("compare_url")) {
                self.updateLinks(response);
            }
        
            if (self.data.type === 'delete') {
                self.removeElements();
            }
            callback(self, response);
        };
        
        if (typeof this.data.button === "object") {
            this.data.button.classList.add('disabled');
        }
        
        if (this.data.type.toUpperCase() === "GET") {
            new AxiosGet({
                initiator: this.data.button,
                url: this.data.url,
                options: this.data.options,
                headers: headers,
                complete: onComplete,
                always: onAlways
            });
        } else {
            new AxiosPost({
                initiator: this.data.button,
                url: this.data.url,
                options: this.data.options,
                type: this.data.type.toUpperCase(),
                complete: onComplete,
                always: onAlways
            });
        }
    }
    
    canReloadPage(response) {
        if (Number.isInteger(response.quantity) && response.quantity === 0 && this.data.type === 'delete' && response.hasOwnProperty('modals') && this[this.data.action].items.length !== 0) {
            // location.reload();
        }
    }
    
    toggleActionState() {
        let clickStr = this.data.button.getAttribute('onclick');
        let buttons = document.querySelectorAll(`[href*="${this.data.action}"][onclick*="${clickStr}"]`);
        
        if (this.data.type === 'post') {
            clickStr = clickStr.replace('post', 'delete');
            this.data.button.classList.add('active');
        } else if(this.data.type === 'delete') {
            clickStr = clickStr.replace('delete', 'post');
            this.data.button.classList.remove('active');
            buttons.forEach((button) => {
                button.setAttribute('onclick', clickStr);
                button.classList.remove('active');
            });
        }
        this.data.button.setAttribute('onclick', clickStr);
    }
    
    removeElements() {
        if (this.data.type === 'delete' && this.hasOwnProperty(this.data.action) && this[this.data.action].items) {
            this[this.data.action].items.forEach((item) => {
                item.parentElement.removeChild(item);
            });
            this.update();
        }
    }
    
    updateLinks(response) {
        if (this.comparison.link) {
            this.comparison.link.forEach((link) => {
                if (response.quantity === 1) {
                    link.style.opacity = '';
                    link.classList.add('soft-disabled');
                } else if (response.quantity > 1) {
                    link.style.opacity = '';
                    link.classList.remove('soft-disabled');
                } else if (response.quantity === 0) {
                    link.style.opacity = 0;
                    link.classList.add('soft-disabled');
                }
                link.setAttribute('href', response.compare_url);
            });
        }
        
        if (response.compare_url) {
            new Cookie({name: window.templateTriggers.cookie.comparisonLink, value: response.compare_url, days: 2}).create();
        }
        
        if (Number.isInteger(response.quantity)) {
            new Cookie({name: window.templateTriggers.cookie.comparisonQuantity, value: response.quantity, days: 2}).create();
        }
    }
    
    updateQuantity(quantity = false, type = false) {
    
        if (type && Number.isInteger(quantity)) {
            
            this[type].quantity.forEach((item) => {
                if (quantity > 0) {
                    item.classList.add('active');
                } else if(quantity === 0) {
                    item.classList.remove('active');
                }
                item.textContent = quantity;
            });
            
            if (type === 'cart') {
                new Cookie({name: window.templateTriggers.cookie.cartQuantity, value: quantity, days: 2}).create();
            } else if (type === 'favorite') {
                new Cookie({name: window.templateTriggers.cookie.favoriteQuantity, value: quantity, days: 2}).create();
            }
        }
    }
    
    updateTotalInCart(total) {
        let deliveryPrice = null;
        
        let trigger = window.templateTriggers.attributes.checkout.deliveryPrice;
        if (trigger.startsWith('[') && trigger.endsWith(']')) {
            deliveryPrice = document.querySelector(trigger) ? parseFloat(document.querySelector(trigger).textContent) : false;
        } else {
            deliveryPrice = document.querySelector(trigger) ? parseFloat(document.querySelector(trigger).textContent) : false;
        }
    
        if (total && this.cart.totalPrice.length > 0) {
            this.cart.totalPrice.forEach((item) => {
                item.textContent = Math.round(total) + deliveryPrice;
                item.setAttribute('data-cart-total', Math.round(total));
            });
        }
    }
    
    updateSumInProduct(input) {
        if (this.cart.items) {
            let count = parseInt(input.value);
            this.cart.items.forEach((cart) => {
                cart.querySelectorAll('[data-cart-summary]').forEach((item) => {
                    let price = Math.round(parseFloat(item.getAttribute('data-cart-summary')));
                    item.textContent = price * count;
                });
            })
        }
    }
    
}