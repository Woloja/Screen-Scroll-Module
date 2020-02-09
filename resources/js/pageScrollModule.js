import debounce from "lodash.debounce"
import {scrollToElem} from "./delta-functions";

export default class PageScroll {
    constructor(data) {
        this.options = {
            wrapper: data.hasOwnProperty('wrapper') ? (data.wrapper instanceof HTMLElement ? data.wrapper : document.querySelector(data.wrapper)) : false,
            sections: data.hasOwnProperty('sections') ? (data.sections instanceof Array ? data.wrapper : document.querySelectorAll(data.sections)) : false,
            startIndex: data.hasOwnProperty('startIndex') ? data.startIndex : 0,
            speed: data.hasOwnProperty('speed') ? data.speed : 2000,
            easing: data.hasOwnProperty('easing') ? data.easing : 'ease',
            offScroll: data.hasOwnProperty('offScroll') ? data.offScroll : false,
            toggleScroll: data.hasOwnProperty('toggleScroll') ? data.toggleScroll : 1000,
            onInit: data.hasOwnProperty('onInit') ? data.onInit : false,
            onResize: data.hasOwnProperty('onResize') ? data.onResize : false,
            onScroll: data.hasOwnProperty('onScroll') ? data.onScroll : false,
            beforeScroll: data.hasOwnProperty('beforeScroll') ? data.beforeScroll : false,
            afterScroll: data.hasOwnProperty('afterScroll') ? data.afterScroll : false,
            pagination: data.hasOwnProperty('pagination') ? (data.pagination instanceof HTMLElement ? data.pagination : document.querySelector(data.pagination)) : false
        };
    
        this.build();
    }
    
    build() {
        if (!this.options.wrapper) throw Error('Initialize without container');
        if (!this.options.sections || this.options.sections.length === 0) throw Error('Initialize without sections');
        
        this.settings();
        this.sizes();
        this.events = this.options.wrapper;
        
        this.onInit().then(() => {
            if (this.options.onInit) this.options.onInit(this, this.options.sections[this.data.currentIndex]);
            if (this.options.afterScroll) this.options.afterScroll(this, this.options.sections[this.data.currentIndex], null);
        });
    }
    
    settings() {
        this.data = {};
        this.data.hash = 'screen';
        this.data.inScroll = false;
        this.data.transition = false;
        
        if('ontransitionend' in window) {
            this.data.transition = 'transitionend';
        } else if('onwebkittransitionend' in window) {
            this.data.transition = 'webkitTransitionEnd';
        } else if('onotransitionend' in this.options.wrapper || navigator.appName === 'Opera') {
            this.data.transition = 'oTransitionEnd';
        }
        
    }
    
    async onInit() {
        let self = this;
        return new Promise((resolve, reject) => {
            this.hash;
            this.params = this.options.toggleScroll;
            this.wheelHandlerCharacter = this.bindWheel.bind(this);
            this.wheelHandlerCharacterTriggered = false;
            this.scrollStartStopHandler(function () {
                self.off();
            }, function () {
                self.on();
            });
            this.updatePagination();
            resolve();
        });
    }
    
    
    set events(wrapper) {
        let self = this;
        
        if(window.innerWidth > this.options.toggleScroll && !self.wheelHandlerCharacterTriggered) {
            setTimeout(() => {
                self.wheelHandlerCharacterTriggered = true;
                window.addEventListener('wheel', self.wheelHandlerCharacter, true);
            }, 100);
        }
        
        if (this.data.transition) {
            this.options.wrapper.addEventListener(this.data.transition, () => {
                if (document.body.style.position === 'fixed') {
                    document.body.style.position = '';
                    document.body.style.top = '';
                    document.body.style.left = '';
                    document.body.style.right = '';
                    document.body.style.bottom = '';
                }
            });
        }
        
        
        window.addEventListener('resize', (e) => {
            this.onResize();
            if (this.options.onResize) {
                this.options.onResize(this);
            }
        });
        
        window.addEventListener('scroll', (e) => {
            this.onScroll();
        });
        
        
        window.addEventListener('keyup', (e) => {
            
            if (this.inScroll) return;
            
            switch (e.keyCode) {
                case 40:
                    this.scrollToSection('down');
                    break;
                case 38:
                    this.scrollToSection('up');
                    break;
            }
        }, true);
        
        
        if (this.options.pagination) {
            
            this.options.sections.forEach((item, i) => {
                let index = i + 1;
                let name = item.hasAttribute('data-name') ? item.getAttribute('data-name') : index < 10 ? '0'+index : index;

                if (name) {
                    item.setAttribute('id', `scroll-to-${index}`);
                    this.options.pagination.insertAdjacentHTML('beforeend', `<a class="scroll-link" href="#${this.data.hash}=${index}" data-id="scroll-to-${index}">${name}</a>`);
                }});
            
            this.options.pagination.querySelectorAll('.scroll-link').forEach((item) => {
                
                item.addEventListener('click', function (event) {
                    let index = parseInt(this.getAttribute('href').slice(1, this.getAttribute('href').length).split('=')[1]) - 1;
    
                    if (self.options.beforeScroll) {
                        self.options.beforeScroll(self, self.options.sections[index], null);
                    }
    
                    if (window.innerWidth < self.options.toggleScroll) {
                        scrollToElem(`#${this.getAttribute('data-id')}`, window.site.headerHeight).then(() => {
                            document.querySelector('.scroll-link.active').classList.remove('active');
                            this.classList.add('active');
                            // self.afterScroll(index, null);
                        });
                    } else {
                        if (index === self.data.currentIndex) return false;
                        if (index > self.data.currentIndex) {
                            self.performTransition(index, 'down', event);
                        } else {
                            self.performTransition(index, 'up', event);
                        }
                    }
                    
                }, false);
            });
        }
        
    }
    
    scrollStartStopHandler(onStart, onStop) {
        let handleOnStart = debounce(function() {
            onStart && onStart();
        }, 250, {'leading': true, 'trailing': false});
        
        let handleOnStop = debounce(function() {
            onStop && onStop();
        }, 250);
        
        window.addEventListener('wheel', handleOnStart);
        window.addEventListener('wheel', handleOnStop);
        
        function destroy() {
            window.removeEventListener('wheel', handleOnStart);
            window.removeEventListener('wheel', handleOnStop);
        }
        
        return {
            destroy: destroy,
        };
    }
    
    set params(trigger) {
        this.data.currentIndex = this.options.startIndex;
        this.options.sections[this.data.currentIndex].classList.add('active');
        document.body.setAttribute('data-section', `section-${this.data.currentIndex}`);
        
        if (window.innerWidth <= trigger) {
            this.clearTransform();
            this.hash = -1;
        } else {
            this.setTransform(this.data.currentIndex);
        }
    }
    
    clearTransform() {
        this.options.wrapper.style.transform = '';
        this.options.wrapper.style.transitionProperty = '';
        this.options.wrapper.style.transitionDuration = '';
        this.options.wrapper.style.transitionTimingFunction = '';
    }
    
    setTransform(idx) {
        this.options.wrapper.style.transitionProperty = 'transform';
        this.options.wrapper.style.transform = `translateY(${-idx * 100}%)`;
        this.options.wrapper.style.transitionDuration = `${this.options.speed}ms`;
        this.options.wrapper.style.transitionTimingFunction = this.options.easing;
    }
    
    beforeScroll(section, current, next) {
        this.options.sections[this.data.currentIndex].classList.remove('active');
        document.body.setAttribute('data-section', `section-${next}`);
        section.classList.add('active');
    }
    
    afterScroll() {
        this.hash = this.data.currentIndex;
        this.startIndex = this.data.currentIndex;
    }
    
    scrollToSection(direction, event) {
        if (window.innerWidth <= this.options.toggleScroll) return false;
        
        let indexes = this.indexes;
        
        switch (direction) {
            case 'up':
                this.performTransition(indexes.prev, direction, event);
                break;
            case 'down':
                this.performTransition(indexes.next, direction, event);
                break;
        }
    }
    
    performTransition(index, direction, event) {
        const position = `${-index * 100}%`;
        if (this.inScroll || index === false) return;
        let nextIndex = index,
            prevIndex = this.data.currentIndex;
        
        this.inScroll = true;
        if (this.options.beforeScroll) {
            this.options.beforeScroll(this, this.options.sections[index], this.options.sections[prevIndex]);
        }
        this.beforeScroll(this.options.sections[index], prevIndex, nextIndex);
        
        this.options.wrapper.style.transform = `translateY(${position})`;
        //TODO check if transition end
        setTimeout(() => {
            this.inScroll = false;
            
            if (event && event.type === 'click') {
                this.indexes = index;
            } else {
                if (direction === 'down') {
                    this.indexes = ++this.data.currentIndex;
                } else {
                    this.indexes = --this.data.currentIndex;
                }
    
            }
            
            if (this.options.afterScroll) {
                this.options.afterScroll(this, this.options.sections[index], this.options.sections[prevIndex]);
                this.afterScroll(prevIndex, nextIndex);
            }
            this.updatePagination();
            
        }, this.options.speed * 1.2);
        
    }
    
    onResize() {
        this.params = this.options.toggleScroll;
        this.sizes();
    }
    
    onScroll() {
        let trigger = window.site.headerHeight || 0;
        let temp = [],
            activePanel = null;
        this.options.sections.forEach((item) => {
            if (trigger +10 > item.getBoundingClientRect().top) {
                temp.push(item);
            }
        });
        activePanel = temp[temp.length - 1];
        
        if (this.options.onScroll) {
            this.options.onScroll(this, activePanel);
        }
        
        if (activePanel) {
            document.querySelector('.scroll-link.active').classList.remove('active');
            document.querySelector(`[data-id="${activePanel.id}"]`).classList.add('active');
        }
    }
    
    sizes() {
        if (window.innerWidth <= this.options.toggleScroll) {
            document.body.removeAttribute('style');
            this.options.wrapper.style.width = '';
            this.options.wrapper.style.height = '';
            this.options.sections.forEach((item) => item.style.height = '');
            if(this.wheelHandlerCharacterTriggered) {
                this.wheelHandlerCharacterTriggered = false;
                window.removeEventListener('wheel', this.wheelHandlerCharacter, true);
            }
        } else {
            document.body.style.overflow = 'hidden';
            document.body.style.position = 'fixed';
            document.body.style.top = '0px';
            document.body.style.left = '0px';
            document.body.style.right = '0px';
            document.body.style.bottom = '0px';
            this.options.wrapper.style.width = `${window.innerWidth}px`;
            this.options.wrapper.style.height = `${window.innerHeight}px`;
    
            this.options.sections.forEach((item) => item.style.height = `${window.innerHeight}px`);
    
            if(!this.wheelHandlerCharacterTriggered) {
                this.wheelHandlerCharacterTriggered = true;
                window.addEventListener('wheel', this.wheelHandlerCharacter, true);
            }
        }
    }
    
    on() {
        window.addEventListener('wheel', this.wheelHandlerCharacter, true);
    }
    
    off() {
        window.removeEventListener('wheel', this.wheelHandlerCharacter, true);
    }
    
    bindWheel(e) {
        if (this.inScroll) return;
    
        if (this.options.offScroll && e.target.closest(this.options.offScroll)) return;
        
        if (e.deltaY > 0) {
            this.scrollToSection('down');
        } else {
            this.scrollToSection('up');
        }
    }
    
    
    updatePagination() {
        if (this.options.pagination) {
            
            let index = this.data.currentIndex + 1;
            
            if (this.options.pagination.querySelector('a.active')) {
                this.options.pagination.querySelector('a.active').classList.remove('active');
            }
            if(this.options.pagination.querySelector(`[href="#${this.data.hash}=${index}"]`)) {
                this.options.pagination.querySelector(`[href="#${this.data.hash}=${index}"]`).classList.add('active');
            }
        }
    }
    
    get hash() {
        if (location.hash.length) {
            let hash = location.hash.slice(1, location.hash.length).split('=')[0];
            let index = parseInt(location.hash.slice(1, location.hash.length).split('=')[1]) - 1;
            
            if (hash === this.data.hash && Number.isInteger(index) && index >= 0 && index < this.options.sections.length) {
                this.options.startIndex = index;
            } else {
                location.hash = "";
            }
            
        }
    }
    
    set hash(index) {
        if (index === -1) {
            location.hash = '';
        } else {
            location.hash = `#${this.data.hash}=${index + 1}`;
        }
    }
    
    get indexes() {
        let data = {};
        
        if (this.data.currentIndex === 0) {
            data.current = 0;
            data.next = 1;
            data.prev = false;
        } else if (this.data.currentIndex === this.options.sections.length - 1) {
            data.current = this.options.sections.length - 1;
            data.next = false;
            data.prev = this.options.sections.length - 2;
        } else {
            data.current = this.data.currentIndex;
            data.next = this.data.currentIndex + 1;
            data.prev = this.data.currentIndex - 1;
        }
        return data;
    }
    
    set indexes(newIndex) {
        this.data.currentIndex = newIndex;
    }
}

Number.isInteger = Number.isInteger || function (value) {
    return typeof value === 'number'
        && Number.isFinite(value)
        && !(value % 1);
};