import SystemAlert from "./SystemAlert";

export default class ParseResponse {
    
    constructor(response, initiator = null) {
        
        this.response = Object.assign({
            domModifications: false,
            redirect: false,
            modals: false,
            checkout_form: false,
            errors: false
        }, response.data);
        
        this.errorWrapper = 'errors-wrapper';
        this.errorItem = 'error-msg';
        this.errorClass = 'error';
        this.initiator = initiator;
        
        return this.parse(response);
    }
    
    async parse(response) {
        if (this.initiator && this.initiator.tagName === 'FORM' && response.status === 422) {
            return new Promise((resolve, b) => {
                let error = response;
            
                if (error.status === 422) {
                    this.parseFields(this.initiator, error.data);
                } else {
                    console.error(error);
                    new SystemAlert().error(error.data);
                }
            
                resolve();
            });
        } else {
            return new Promise((resolve, b) => {
                if (this.response.modals !== false){
                    this.modals();
                }
            
                if (this.response.redirect !== false) {
                    this.redirect();
                }
            
                if (this.response.domModifications !== false) {
                    this.modifyDocument();
                }
            
                if (this.response.checkout_form !== false) {
                    this.submitIPay();
                }
            
                if (this.response.notifications) {
                    this.notification();
                }
            
                resolve();
            });
        }
    }
    
    parseFields(form, info){
        
        let fieldErrors = false;
        
        if (info.hasOwnProperty('data')) {
            fieldErrors = info.data.hasOwnProperty('errors') ? info.data.errors : false;
        } else if (info.hasOwnProperty('errors')) {
            fieldErrors = info.hasOwnProperty('errors') ? info.errors : false;
        }
        
        if (!fieldErrors && info.data.error && info.data.message) {
            fieldErrors = info.data.message;
        }
        
        if (fieldErrors) {
            for (let err in fieldErrors) {
                let field = form.querySelector(`[name="${err}"]`);
                
                if (form.querySelector(`.${err}`)) {
                    field = form.querySelector(`.${err}`);
                    
                    field.insertAdjacentHTML('beforeend', `<i class="${this.errorWrapper}"></i>`);
                    fieldErrors[err].forEach((item) => {
                        field.classList.add(this.errorClass);
                        field.querySelector('.errors-wrapper').insertAdjacentHTML('beforeend', `<sub class="${this.errorItem}">${item}</sub>`);
                    });
                    
                } else {
                    if (!field.parentElement.classList.contains(this.errorClass)) {
                        field.parentElement.classList.add(this.errorClass);
                        field.insertAdjacentHTML('afterend', `<i class="${this.errorWrapper}"></i>`);
                        fieldErrors[err].forEach((item) => {
                            field.classList.add(this.errorClass);
                            field.parentElement.querySelector('.errors-wrapper').insertAdjacentHTML('beforeend', `<sub class="${this.errorItem}">${item}</sub>`);
                        });
                    }
                }
            }
            return false;
        }
    }
    
    modals() {
        if (this.initiator && this.initiator.dataset.modals && this.initiator.dataset.modals === "false") {
            return;
        }
        
        this.response.modals.forEach((item) => {
            if ("callModal" in window) {
                callModal(item.content).then( modalInstance => {
                    let modal = modalInstance.current.$content[0];
                    formControllerInit();
                });
            } else {
                new SystemAlert().error("Error in JavaScript. Init please fallback for 'callModal' action");
            }
        });
    }
    
    redirect() {
        if (this.initiator && this.initiator.dataset.redirect && this.initiator.dataset.redirect === "false") {
            return;
        }
        
        if (typeof this.response.redirect.seconds === "boolean" && this.response.redirect.seconds) {
            location.assign(this.response.redirect.link);
        } else {
            setTimeout(() => {
                location.assign(this.response.redirect.link);
            }, this.response.redirect.seconds);
        }
    }
    
    modifyDocument() {
        for (let prop in this.response.domModifications) {
            let currentItem = this.response.domModifications[prop],
                el = document.querySelector(currentItem.domIdentifier);
        
            el.classList.add('done');
            if (!currentItem.method) {
                el.innerHTML = currentItem.content;
            } else {
                el.insertAdjacentHTML(currentItem.method, currentItem.content);
            }
        }
    }
    
    submitIPay() {
        if (this.response.redirect) {
            if(this.response.redirect.link.replace(/^\s+|\s+$/g, '').startsWith('<form')) {
                document.body.insertAdjacentHTML('beforeend', this.response.redirect.link);
                document.querySelector('#payment_form_liqpay').submit();
            } else {
                location.assign(this.response.redirect.link);
            }
        }
    }
    
    notification() {
        if (this.initiator && this.initiator.dataset.notification && this.initiator.dataset.notification === "false") {
            return;
        }
    
        let message = '<div class="notifications">';
        this.response.notifications.forEach((item) => {
            message += `<p class="${item.type}"><span class="icon"></span>${item.message}</p>`;
        });
        
        message += '</div>';
        new SystemAlert().notify(message);
    }
    
}
