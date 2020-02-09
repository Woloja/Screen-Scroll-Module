
import AxiosGet from "./AxiosGet";
import AxiosPost from "./AxiosPost";

export default class FormController {
    
    
    constructor(props) {
        this.data = Object.assign({
            ajaxTrigger: 'data-ajax',
            el: undefined,
            submitOnchange: false,
            errorClass: 'error',
            completeClass: 'done',
            disabledClass: 'disabled',
            excludeFieldsClear: null,
            complete: undefined
        }, props);
        
        this.forms = [];
        
        if (this.data.el) {
            this.init();
        }
        
    }

    send(formObject) {

        let self = this;
        let formData = new FormData(formObject.element);
        let method = formObject.element.hasAttribute('method') ? formObject.element.getAttribute('method').toUpperCase() : false;
        let action = formObject.element.getAttribute('action');
        let hiddenMethod = formObject.element.querySelector('[name="_method"]');

        if (hiddenMethod) {
            method = hiddenMethod.value.toUpperCase();
        }

        formObject.submitBtn.classList.add(this.data.disabledClass);
        if (formObject.beforeSend) {
            formObject.beforeSend();
        }
        
        if (['PATCH', 'PUT', 'POST', 'DELETE'].includes(method)) {

            new AxiosPost({
                initiator: formObject.element,
                url: action,
                options: formData,
                complete(instance, response) {
                    self.clearFields(formObject);
                    formObject.callback(self, response);
                },
                fail(data) {
                    console.log('FormController->AxiosPost->fail->data', data);
                },
                always(instance, response) {
                    console.log('FormController->AxiosPost->always->response', response);
                    formObject.submitBtn.classList.remove(self.data.disabledClass);
                }
            });
            
        } else {
            let getParams = Object.assign({});
    
            for (let key of formData.keys()) {
                getParams[key] = formData.get(key);
            }
            
            new AxiosGet({
                initiator: formObject.element,
                url: action,
                options: getParams,
                complete(instance, response) {
                    console.log(response);
                    self.clearFields(formObject);
                    formObject.callback(self, response, response);
                },
                fail(data) {
                    console.log('FormController->AxiosGet->fail->data', data);
                },
                always(instance, response) {
                    console.log('FormController->AxiosGet->always->response', response);
                    formObject.submitBtn.classList.remove(self.data.disabledClass);
                }
            });
        }
    }

    init() {
        let self = this;
        document.querySelectorAll(this.data.el).forEach((item) => {
            if (!item.hasAttribute(this.data.ajaxTrigger)) {

                let submitButton = item.querySelector('[type="submit"]');
                if (!submitButton) throw new Error(`This form ${item.id} not have submit trigger`);
                
                this.forms.push({
                    element: item,
                    id: item.id,
                    submitBtn: submitButton,
                    fields: item.querySelectorAll('[name]:not([type="hidden"])'),
                    required: item.querySelectorAll('[required]'),
                    callback: this.data.complete,
                    beforeSend() {
                        
                        this.element.querySelectorAll(`.${self.data.errorClass}`).forEach((item) => {
                            item.classList.remove(self.data.errorClass);
                        });
                        
                        this.element.querySelectorAll('.errors-wrapper').forEach((item) => {
                            item.parentElement.removeChild(item);
                        });
                        
                    }
                });
                
                this.sendOnChange(item);
                
                item.setAttribute(this.data.ajaxTrigger, "on");
            }
        });
        this.bindAjaxSubmit();
    }

    bindAjaxSubmit() {
        let self = this;
        this.forms.forEach((item) => {
            if (item.element.hasAttribute(this.data.ajaxTrigger) && item.element.getAttribute(this.data.ajaxTrigger) === 'off') {
                return;
            }
            item.element.addEventListener('submit', function (e) {
                e.stopPropagation();
                e.preventDefault();
                let state = self.checkRequiredField(item);

                if (state) {
                    self.send(item);
                }
                return false;
            })
        });
    }

    checkRequiredField(formObject) {
        let send = true;
        formObject.required.forEach((item) => {
            if (item.value) {
                this.removeError(item);
            } else {
                this.addError(item);
                send = false;
            }
        });
        return send;
    }

    addError(field) {
        field.classList.add(this.data.errorClass);
    }

    removeError(field) {
        field.classList.remove(this.data.errorClass);
    }
    
    clearFields(form) {
        if (this.data.excludeFieldsClear && !this.data.excludeFieldsClear.some(name => form.element === document.querySelector(name) )) {
            form.fields.forEach((item) => {
                if (item) {
                    if (item.type !== 'password') {
                        item.setAttribute('placeholder', item.value);
                        item.value = '';
                    } else {
                        item.value = '';
                    }
                }
            });
        }
    }
    
    sendOnChange(form) {
        form.querySelectorAll(this.data.submitOnchange).forEach((field) => {
            field.addEventListener('change', () => {
                let formData = new FormData(form);
                let options = Object.assign({'current': field.getAttribute('name')});
    
                for (let key of formData.keys()) {
                    options[key] = formData.get(key);
                }
    
                new AxiosGet({
                    url: `${location.origin}${location.pathname}`,
                    options: options,
                    fail: function () {
                        
                    }
                });
            });
        });
    }
}
