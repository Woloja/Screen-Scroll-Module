
import ParseResponse from "./ParseResponse";

export default class AxiosPost {
    
    constructor(props) {
        this.data = Object.assign({
            initiator: false,
            url: null,
            options: false,
            headers: null,
            type: 'post',
            always: false,
            complete: false,
            fail: false
        }, props);
        
        this.send();
    }
    
    
    send() {
        if (!this.data.url) throw new Error('Can`t send get request without url');
        
        let self = this;
    
        let headers = {...this.data.headers, ...{
                'Content-Type': 'application/json;charset=UTF-8',
                "Access-Control-Allow-Origin": "*",
                "Accept": "application/json",
            }};
        
        axios({
            method: this.data.type.toUpperCase(),
            url: this.data.url,
            data: this.data.options,
            headers: headers
        })
            .then( response => {
                new ParseResponse(response, this.data.initiator).then(() => {
                    if (this.data.complete && typeof this.data.complete === "function") {
                        this.data.complete(self, response.data);
                    }
                });
            })
            .catch( error  => {
                if(error.response) {
                    new ParseResponse(error.response, this.data.initiator).then(() => {
                        if (this.data.fail && typeof this.data.fail === "function") {
                            this.data.fail(self, error.response);
                        }
                    });
                } else {
                    console.warn(error);
                }
                return false;
            })
            .finally( response => {
                if (this.data.always && typeof this.data.always === "function") {
                    this.data.always(self, response);
                }
            });
    
    }
}
