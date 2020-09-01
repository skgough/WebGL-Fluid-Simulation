class ScrollSelect extends HTMLElement {
    constructor() {
        super();
        
        if (this.querySelector('scroll-label')) {
            this.value = undefined;
        } else if (!this.querySelector('scroll-option[selected]')) {
            this.value = this.querySelector('scroll-option:first-child').getAttribute('value');
            this.querySelector('scroll-option:first-child').setAttribute('selected','');
        }
        
        this.addEventListener('click', () => {
            this.setAttribute('open','');
            let position = this.getBoundingClientRect();
            this.style.top = position.top;
        });
    }
}
customElements.define('scroll-select', ScrollSelect);

class ScrollOption extends HTMLElement {
    constructor() {
        super();
        let select = this.parentElement;
        if (this.hasAttribute('selected')) {
            select.value = this.getAttribute('value');
        }
    }
}
customElements.define('scroll-option', ScrollOption);

class ScrollLabel extends HTMLElement {
    constructor() {
        super();
    }
}
customElements.define('scroll-label', ScrollLabel);
