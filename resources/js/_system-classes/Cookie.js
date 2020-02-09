export default class Cookie {
    
    constructor(data) {
        this.name = data.name;
        this.value = data.value;
        this.days = data.days;
        
        return this;
    }
    
    create() {
        let expires = "";
        if (this.days) {
            let date = new Date();
            date.setTime(date.getTime() + (this.days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = this.name + "=" + this.value + expires + "; path=/";
        return this;
    }
    
    read() {
        let nameEQ = this.name + "=";
        let ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === " ") c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return false;
    }
    
    erase() {
        this.create(this.name, "", -1);
    }
    
}