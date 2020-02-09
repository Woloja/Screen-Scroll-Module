
export default class SystemAlert {
    constructor(info) {
        this.data = info;
        this.errorClass = 'error';
    }
    
    error(info) {
        let notify = (info.data && info.data.notifications) ? info.data.notifications : false;
        
        if (typeof info === "string") {
            return Swal.fire({
                type: "error",
                title: info,
                confirmButtonText: 'Зрозуміло'
            });
            
        }
        
        if (notify) {
            notify.forEach((notice) => {
                console.log(notice);
                if ([401, 501, 405, 500, 404, 410].includes(info.status)) {
                    //title <a target="_blank" href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Status/${info.status}">Info about - ${info.status}</a>
                    return Swal.fire({
                        title: notice.message ? `${notice.message}<br>` : "! Empty message !",
                        type: notice.message ? notice.type : "error",
                        confirmButtonText: 'Зрозуміло'
                    });
                }
            });
        } else {
            alert('system response not have data.notifications messages');
            if ([401, 501, 405, 500, 404, 422].includes(info.status)) {
                return Swal.fire({
                    type: "error",
                    title: info.status,
                    text: info.statusText,
                    confirmButtonText: 'Зрозуміло'
                });
            }
        }
    }
    
    notify(message) {
        Swal.fire({
            title: message ? message : "! Empty message !",
            type: "success",
            confirmButtonText: 'Зрозуміло'
        });
    }
    
}