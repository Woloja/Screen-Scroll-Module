
import ParseResponse from "./ParseResponse";


/**
 * @class AxiosGet
 * @description Send fetch/XML request with get method
 * @param callback [onSuccess] success callback
 */
export default class AxiosGet {

    constructor(props, callback) {
        this.data = Object.assign({
            initiator: false,
            url: null,
            options: false,
            always: false,
            complete: false,
            fail: false
        }, props);
        this.send(callback)
    }
    
    
    send(callback) {
    
    
        if (this.data.url.startsWith(location.origin)) {
            this.data.url = this.data.url.replace(`${location.origin}`, '');
            console.log(this.data.url);
        }
        
        if (this.data.url.endsWith('?')) {
            this.data.url = this.data.url.slice(0, -1);
        }
        
        if (this.data.url.startsWith(`/${window.site.language}/`)) {
            this.data.url = this.data.url.replace(`/${window.site.language}/`, `/api/${window.site.language}/`);
        } else if (!this.data.url.startsWith(`/api/`)) {
            this.data.url = `/api${this.data.url}`;
        }
        
        if (!this.data.url) throw new Error('Can`t send get request without url');
        
        
        let self = this;
        
        let options = {};
        
        if (this.data.options) {
            options = {
                params: this.data.options,
                headers: {"Accept": "application/json"}
            };
        } else {
            options = {
                headers: {"Accept": "application/json"}
            };
        }
        
        
        axios.get(encodeURI(this.data.url), options)
            .then((response) => {
                new ParseResponse(response).then(() => {
                    if (this.data.complete && typeof this.data.complete === "function") {
                        this.data.complete(self, response.data);
                    } else if (callback && typeof callback === "function") {
                        callback(self, response.data);
                    }
                });
            })
            .catch((error) => {
                if(error.response) {
                    new ParseResponse(error.response, this.data.initiator).then(() => {
                        if (this.data.fail && typeof this.data.fail === "function") {
                            this.data.fail(self, error.response);
                        } else if (callback && typeof callback === "function") {
                            callback(self, error.response);
                        }
                    });
                } else {
                    console.warn(error);
                }
                return false;
            })
            .finally((data) => {
                if (this.data.always && typeof this.data.always === "function") {
                    this.data.always(data);
                } else if (callback && typeof callback === "function") {
                    callback(self, data);
                }
            });


    }
}
