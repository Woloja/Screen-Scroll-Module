import AxiosGet from "./AxiosGet";
import SystemAlert from "./SystemAlert";
import Cookie from "./Cookie";

export default class Filter {
    
    constructor(props) {
        
        this.pagination = props.hasOwnProperty('pagination') ? (props.pagination instanceof HTMLElement ? props.pagination : document.querySelector(props.pagination)) : false;
        this.loaders = props.hasOwnProperty('loaders') ? (typeof props.loaders === "string" ? document.querySelectorAll(props.loaders) : props.loaders) : false;
        this.tags = props.hasOwnProperty('tags') ? (props.tags instanceof HTMLElement ? props.tags : document.querySelector(props.tags)) : false;
        
        this.products = props.hasOwnProperty('products') ? (props.products instanceof HTMLElement ? props.products : document.querySelector(props.products)) : false;
        this.totalCounters = props.hasOwnProperty('totalCounters') ? (typeof props.totalCounters === "string" ? document.querySelectorAll(props.totalCounters) : props.totalCounters) : false;
        
        this.linksCounter = (props.hasOwnProperty('linksCounter') && typeof props.linksCounter === "string") ? props.linksCounter : false;
        
        this.sort = (props.hasOwnProperty('sort') && typeof props.sort === "object") ? props.sort : false;
        
        this.beforeSend = (props.hasOwnProperty('beforeSend') && typeof props.beforeSend === "function") ? props.beforeSend : false;
        this.afterSend = (props.hasOwnProperty('afterSend') && typeof props.afterSend === "function") ? props.afterSend : false;
        
        this.options = {
            disabledClass: 'disabled',
            activeClass: 'active',
        };
        
        this.options.linksID = (props.hasOwnProperty('linksID') && typeof props.linksID === "string") ? props.linksID : false;
        this.options.url = null;
        this.options.props = props;
        
        this.bindSend = this.sendEvent.bind(this);
        this.bindSort = this.sortEvent.bind(this);
        this.initialise();
        // console.log(this);
    }
    
    initialise() {
        this.initialiseLinks();
        this.initialiseRanges();
        this.initialiseSort();
        this.checkSortCookies();
    }
    
    initialiseSort() {
        if (this.sort && this.sort.hasOwnProperty('event') && this.sort.hasOwnProperty('items')) {
            this.sort.items = typeof this.sort.items === "string" ? document.querySelectorAll(this.sort.items) : this.sort.items;
            if (this.sort.items instanceof NodeList) {
                let self = this;
                this.sort.items.forEach(item => {
                    if (!item.hasAttribute('data-ajax')) {
                        item.addEventListener(this.sort.event, self.bindSort.bind(event, item), false);
                        item.setAttribute('data-ajax', true);
                    }
                });
            } else {
                new SystemAlert().error('this.sort.items NOT instanceof NodeList. Filter.js')
            }
        }
    }
    
    initialiseLinks() {
        let self = this;
        
        this.links = this.options.props.hasOwnProperty('links') ? (typeof this.options.props.links === "string" ? document.querySelectorAll(this.options.props.links) : this.options.props.links) : false;
        
        this.links.forEach(item => {
            if (!item.hasAttribute('data-ajax')) {
                item.addEventListener('click', self.bindSend.bind(event, item), false);
                item.setAttribute('data-ajax', true);
            }
        });
    }
    
    initialiseRanges() {
        this.ranges = Object.assign({});
        
        let ranges = (this.options.props.hasOwnProperty('ranges') && typeof this.options.props.ranges === "object") ? this.options.props.ranges : false;
        
        if (ranges && ranges.hasOwnProperty('slider') && ranges.hasOwnProperty('param')) {
            let sliders = document.querySelectorAll(ranges.slider);
            let param = ranges.param.startsWith('[') ? ranges.param.substring(1, ranges.param.length-1) : ranges.param;
            
            sliders.forEach((slider) => {
                if (slider.hasAttribute(param)) {
                    this.ranges[slider.getAttribute(param)] = {
                        wrapper: slider,
                        min: slider.querySelector(ranges.min),
                        max: slider.querySelector(ranges.max)
                    }
                }
            });
        }
    }
    
    updateEvents() {
        this.initialiseLinks();
    }
    
    customPriceChange(event, ui, param = false) {
        if (ui && this.ranges && param) {
            this.sendChange(ui.values, param);
        }
    }
    
    sendEvent(actionElement, e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (actionElement.classList.contains(this.options.disabledClass)) return false;
        if (!actionElement.hasAttribute('href')) throw new Error('Filter link must have href attribute');
        
        let sendOptions = {};
        sendOptions.url = actionElement.getAttribute('href').indexOf('?') > -1 ?
            actionElement.getAttribute('href').slice(0, actionElement.getAttribute('href').indexOf('?')) :
            actionElement.getAttribute('href');
        
        if (location.search) {
            sendOptions.url = sendOptions.url + location.search;
        }
        
        this.options.url = sendOptions.url;
        
        this.send();
    }
    
    sortEvent(actionElement) {
        this.options.url = this.parseQuery(actionElement);
        this.options.url = decodeURIComponent(this.options.url);
        this.send();
    }
    
    sendChange(priceArray, param) {
        this.options.url = this.parseQuery(`${param}=${priceArray[0]}${window.site.filterDelimiters.inGroup}${priceArray[1]}`);
        this.options.url = decodeURIComponent(this.options.url);
        this.send();
    }
    
    send() {
        this.beforeSend ? this.beforeSend() : this.loading();
        
        let self = this;
        
        new AxiosGet({
            url: this.options.url,
            complete(instance, response) {
                self.parseResponse(response).then(() => {
                    if (self.afterSend) {
                        self.afterSend(response);
                    }
                });
            },
            always() {
                self.loaded();
            }
        });
    }
    
    loading() {
        if (this.loaders) {
            this.loaders.forEach((loader) => {
                loader.style.transition = 'opacity 0.2s ease-in-out';
                loader.style.opacity = '0.3';
                loader.style.pointerEvents = 'none';
            });
        }
    }
    
    loaded() {
        if (this.loaders) {
            this.loaders.forEach((loader) => {
                loader.style.opacity = '';
                loader.style.pointerEvents = '';
                loader.style.transition = '';
            });
        }
    }
    
    async parseResponse(filterData) {
        return new Promise((resolve, b) => {
            if (filterData.hasOwnProperty('filters')) {
                this.updateLinks(filterData.filters);
                this.updateRanges(filterData.filters);
            }
    
            if (filterData.hasOwnProperty('quantity')) {
                this.updateCounters(filterData.quantity);
            }
    
            if (filterData.hasOwnProperty('products')) {
                this.updateProducts(filterData.products);
            }
    
            if (filterData.hasOwnProperty('active_filters')) {
                this.updateTags(filterData.active_filters);
            }
    
            this.updatePagination(filterData.pagination);
    
            this.updateBrowserUrl();
    
            this.updateEvents();
            
            resolve();
        });
    }
    
    parseQuery(param) {
        
        
        let url = location.pathname,
            currentValue = queryString.parse(location.search);
        
        
        let ajaxPagination = url.split(/page-\d+$/);
        
        if (ajaxPagination.length === 2 && ajaxPagination[1] === "") {
            url = ajaxPagination[0];
        }
        
        if (typeof param === "string") {
            
            let newValue = queryString.parse(param),
                value = Object.assign(currentValue, newValue),
                str = queryString.stringify(value);
    
            return `${url}?${str}`;
            
        } else if (param.nodeName && param.nodeName === "SELECT" && param instanceof HTMLElement) {
            
            let newValue = queryString.parse(param.value);
    
            Array.from(param.options).forEach((option) => {
                let name = option.value.split('=')[0];
                if (currentValue[name]) {
                    delete currentValue[name];
                }
            });
    
            let value = Object.assign(currentValue, newValue);
            this.createSortCookies(param, value);
            
            let str = queryString.stringify(value);
    
            return `${url}?${str}`;
            
        } else if (param instanceof HTMLElement && param.nodeName === "INPUT" && param.type === 'radio') {
            
            let newValue = queryString.parse(param.value);
            
            document.querySelectorAll(`input[name="${param.name}"]`).forEach((item) => {
                let name = item.value.split('=')[0];
                if (currentValue[name]) {
                    delete currentValue[name];
                }
            });
            
            let value = Object.assign(currentValue, newValue);
            this.createSortCookies(param, value);
            
            let str = queryString.stringify(value);
    
            return `${url}?${str}`;
        }
    }
    
    checkSortCookies() {
        let limit = new Cookie({name: 'limit'}).read();
        let sort = new Cookie({name: 'sort'}).read();
        
        if (limit) {
            this.sort.cookie = {limit: limit};
        }
        
        if (sort) {
            this.sort.cookie = {limit: sort};
        }
    }
    
    createSortCookies(param, value) {
        for (let cook in value) {
            if (cook === 'limit') {
                new Cookie({name: 'limit', value: value[cook] ? `${cook}=${value[cook]}` : `${cook}` , days: 365}).create();
                this.sort.cookie = {limit: value[cook] ? `${cook}=${value[cook]}` : cook};
            } else {
                new Cookie({name: 'sort', value: `${cook}=${value[cook]}` , days: 365}).create();
                this.sort.cookie = {sort: value[cook] ? `${cook}=${value[cook]}` : cook};
            }
        }
    
        if (param.options && param.options[param.selectedIndex].hasAttribute('data-default')) {
            new Cookie({name: 'limit'}).erase();
            delete value.limit;
        } else if (param.type && param.type === 'radio' && param.hasAttribute('data-default')) {
            new Cookie({name: 'limit'}).erase();
            delete value.limit;
        }
    }
    
    updateLinks(filters) {
        
        if (!this.options.linksID) throw new Error('Filter initialization must have "linksID" param. This is a filter link id!');
        
        let prefix = this.options.linksID.startsWith('#') ? this.options.linksID : `#${this.options.linksID}`;
        
        for (let catID in filters) {
            
            
            if (filters[catID].hasOwnProperty('param')) {
                continue;
            }
    
            for (let itemId in filters[catID].items){
        
                let filter = filters[catID].items[itemId];
                let filterItem = document.querySelector(`${prefix}${catID}${filter.id}`);
        
                if (filterItem) {
                    filterItem.setAttribute('href', filter.url);
                }
        
                if (filter.disabled) {
                    filterItem.classList.add(this.options.disabledClass);
                } else {
                    filterItem.classList.remove(this.options.disabledClass);
                }
        
                if (filter.active) {
                    filterItem.classList.add(this.options.activeClass);
                } else {
                    filterItem.classList.remove(this.options.activeClass);
                }
        
                if (filterItem.querySelector(this.linksCounter)) {
                    filterItem.querySelector(this.linksCounter).textContent = filter.count;
                }
            }
            
        }
        
    }
    
    updateCounters(count) {
        this.totalCounters.forEach((item) => {
            item.innerHTML = count;
        });
    }
    
    updateRanges(filters) {
        for (let i in filters) {
            if (filters.hasOwnProperty(i) && filters[i].hasOwnProperty('param')) {
                let response = filters[i];
                
                if (response.items.filtered_min){
                    this.ranges[filters[i].param].min.value = response.items.filtered_min;
                }
                if (response.items.filtered_max){
                    this.ranges[filters[i].param].max.value = response.items.filtered_max;
                }
                if (window.jQuery && this.ranges[filters[i].param]) {
                    if (this.hasOwnProperty('afterUpdate') && typeof this.afterUpdate === "function") {
                        this.afterUpdate(response);
                    }
                }
            }
        }
    }
    
    updateProducts(products) {
        if (this.products) {
            this.products.innerHTML = products;
        }
    }
    
    updateTags(tags) {
        if (this.tags && tags) {
            this.tags.innerHTML = tags;
        }
    }
    
    updatePagination(pagination) {
        this.pagination = this.options.props.hasOwnProperty('pagination') ? (this.options.props.pagination instanceof HTMLElement ? this.options.props.pagination : document.querySelector(this.options.props.pagination)) : false;
        if (this.pagination) {
            this.pagination.insertAdjacentHTML('afterend', pagination);
            this.pagination.parentElement.removeChild(this.pagination);
        }
    }
    
    updateBrowserUrl() {
        if (this.options.url.endsWith('?')) {
            this.options.url = this.options.url.slice(0, -1);
        }
        history.pushState({filter: 'update-' + this.options.url}, 'filter-update', this.options.url);
    }
    
}