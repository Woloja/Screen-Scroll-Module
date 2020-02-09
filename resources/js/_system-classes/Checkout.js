import SystemAlert from "./SystemAlert";
import AxiosGet from "./AxiosGet";

export default class Checkout {
    constructor(props) {
        
        this.parseDelivery(props);
        this.parsePayments(props);
        
        this.install();
    }
    
    install() {
        // console.log(this);
    }
    
    parseDelivery(props) {
        delete this.parseDelivery;
        this.delivery = {
            items: props.hasOwnProperty('delivery') ? (props.delivery instanceof HTMLElement ? props.delivery : document.querySelectorAll(props.delivery)) : false,
            active: false,
            priceContainers: props.hasOwnProperty('deliveryPrice') ? (props.deliveryPrice instanceof HTMLElement ? props.deliveryPrice : document.querySelectorAll(props.deliveryPrice)) : false,
            price: 0,
            cartPrice: document.querySelector('[data-cart-total]') ? parseFloat(document.querySelector('[data-cart-total]').getAttribute('data-cart-total')) : false
        };
    
        this.delivery.items.forEach((node) => {
            if (node.querySelector('input[type="radio"]')) {
                let id = parseInt(node.querySelector('input[type="radio"]').value);
                this.delivery[id] = {
                    trigger: node.querySelector('input[type="radio"]'),
                    options: JSON.parse(node.getAttribute('data-options')),
                    id: id,
                    wrapper: node.querySelector('[data-delivery="wrapper"]')
                };
                this.delivery[id].options.payments = JSON.parse(this.delivery[id].options.payments);
                this.clearNames(id);
                this.bindEvents(id);
                
            } else {
                new SystemAlert().error('Delivery must have input[type="radio"] with names');
                throw new Error('Delivery must have input[type="radio"] with names');
            }
        });
    }
    
    parsePayments(props) {
        delete this.parsePayments;
        this.payments = {
            items: props.hasOwnProperty('payments') ? (props.payments instanceof HTMLElement ? props.payments : document.querySelectorAll(props.payments)) : false,
            active: false
        };
        this.payments.items.forEach((node) => {
            if (node.querySelector('input[type="radio"]')) {
                let id = parseInt(node.querySelector('input[type="radio"]').value);
                this.payments[id] = {
                    trigger: node.querySelector('input[type="radio"]'),
                    wrapper: node
                };
            } else {
                new SystemAlert().error('Delivery must have input[type="radio"] with names');
                throw new Error('Delivery must have input[type="radio"] with names');
            }
        });
    }
    
    
    clearNames(id) {
        this.delivery[id].wrapper.querySelectorAll('[name]').forEach((item) => {
            item.setAttribute('data-name', item.getAttribute('name'));
            item.removeAttribute('name');
        });
    }
    
    restoreNames(id) {
        
        if (this.delivery.active === id) return;
        
        if (Number.isInteger(this.delivery.active)) {
            this.delivery[this.delivery.active].wrapper.querySelectorAll('[name]').forEach((item) => {
                item.setAttribute('data-name', item.getAttribute('name'));
                item.removeAttribute('name');
            });
        }
        
        this.delivery[id].wrapper.querySelectorAll('[data-name]').forEach((item) => {
            item.setAttribute('name', item.getAttribute('data-name'));
            item.removeAttribute('data-name');
        });
    }
    
    bindEvents(id) {
        delete this.bindEvents;
        this.onSelect = this.selectDelivery.bind(this, this.delivery[id]);
        this.delivery[id].trigger.addEventListener('change', this.onSelect, false);
        
        this.delivery[id].wrapper.querySelectorAll('[data-change]').forEach((item) => {
            this.onChange = this.changeDelivery.bind(this, this.delivery[id], item);
            item.addEventListener('change', this.onChange, false)
        });
    }
    
    selectDelivery(target) {
        this.restoreNames(target.id);
        this.availablePayments(target.id);
        this.deliveryPrice = target.options.price ? target.options.price : 0;
        this.delivery.active = target.id;
    }
    
    set deliveryPrice(price) {
        let cartTotalOut = null;
        let trigger = window.templateTriggers.attributes.cart.total;
        
        if (trigger.startsWith('[') && trigger.endsWith(']')) {
            cartTotalOut = document.querySelectorAll(trigger);
        } else {
            cartTotalOut = document.querySelectorAll(`[${trigger}]`);
        }
        
        this.delivery.price = parseFloat(price);
        
        if (this.delivery.cartPrice) {
            this.delivery.cartPrice = parseFloat(document.querySelector('[data-cart-total]').getAttribute('data-cart-total'));
        }
        
        this.delivery.priceContainers.forEach((item) => {
            item.textContent = this.delivery.price;
        });
        
        cartTotalOut.forEach((item) => {
            item.textContent = this.delivery.price + this.delivery.cartPrice;
        });
        
        
        
    }
    
    changeDelivery(obj, target) {
        
        
        let data = JSON.parse(target.getAttribute('data-change'));
        let next = document.querySelector(`[data-step="${data.step}"`);
        
        if (data.clear) {
            obj.wrapper.querySelectorAll('[data-step] select').forEach((item) => {
                item.innerHTML = '';
            });
        }
    
        if (next) {
            new AxiosGet({
                url: data.url + target.value,
                complete(self, response) {
                    if (response) {
                        let options = '';
                        next.style.display = 'flex';
                        for (let idx in response) {
                            options += `<option value="${idx}">${response[idx]}</option>`;
                        }
                        next.querySelector('select').innerHTML = options;
                    }
                }
            });
            return false;
        }
        
    }
    
    
    availablePayments(id) {
        let actives = this.delivery[id].options.payments;
        this.disablePayments();
        
        actives.forEach((id) => {
            this.payments[id].wrapper.classList.remove('disabled');
        });
    }
    
    disablePayments() {
        this.payments.items.forEach((item) => {
            item.classList.add('disabled');
            item.classList.remove('focused');
            item.querySelector('input[type="radio"]').checked = false;
            item.querySelector('input[type="radio"]').removeAttribute('checked');
        });
    }
    
}