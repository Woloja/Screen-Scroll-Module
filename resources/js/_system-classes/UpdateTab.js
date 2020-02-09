import Cookie from "./Cookie";

export default class UpdateTab {
    constructor(data){
        this.data = Object.assign({}, data);
        
        this.hidden = '';
        this.name = '';
        this.state = false;
        
        this.listen();
    }
    
    update() {
        return new Promise((resolve) => {
            let cookie;
            
            if (typeof this.data.cookie === "object") {
                cookie = this.updateCookie();
            }
            resolve({cookie});
        });
    }
    
    
    updateCookie() {
        let temp = {};
        for (let type in this.data.cookie) {
            if (this.data.cookie.hasOwnProperty(type)) {
                let elements = this.data.cookie[type].hasOwnProperty('elements') ? document.querySelectorAll(this.data.cookie[type].elements) : false;
                let buttons = this.data.cookie[type].hasOwnProperty('buttons') ? document.querySelectorAll(this.data.cookie[type].buttons) : false;
                let link = this.data.cookie[type].hasOwnProperty('link') ? new Cookie({name: this.data.cookie[type].link}).read() : false;
                let nameValue = this.data.cookie[type].hasOwnProperty('name') ? new Cookie({name: this.data.cookie[type].name}).read() : false;
                
                if (link && link.length && buttons.length > 0) {
                    buttons.forEach( item => item.setAttribute('href', decodeURIComponent(link)));
                }
                
                if (typeof nameValue !== "undefined") {
                    elements.forEach( element => element.innerHTML = nameValue.toString());
                }
                
                temp[type] = {elements, buttons, link, value: nameValue};
            }
        }
        return temp;
    }
    
    listen() {
        
        if (typeof document.hidden !== "undefined") {
            this.hidden = "hidden";
            this.name = "visibilitychange";
        } else if (typeof document.msHidden !== "undefined") {
            this.hidden = "msHidden";
            this.name = "msvisibilitychange";
        }
        
        this.event = this.visibilityChange.bind(this);
        document.addEventListener(this.name, this.event, false);
    }
    
    visibilityChange() {
        if(this.state !== document[this.hidden]) {
            if(!document[this.hidden]) {
                this.update().then((data) => {
                    if (typeof this.data.afterUpdate === "function") {
                        this.data.afterUpdate(data);
                    }
                });
            }
            this.state = document[this.hidden];
        }
    }
    
}