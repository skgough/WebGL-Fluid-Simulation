class ScrollSelect extends HTMLElement {
    constructor() {
        super();
        let index = [...document.querySelectorAll('scroll-select')].indexOf(this);

        if (this.querySelector('scroll-option[selected]')) {
            let selected = this.querySelector('scroll-option[selected]');
                selected.addEventListener('click', this.listenForSelection.bind(this));
            this.value = selected.getAttribute('value');
        } else {
            let prompt = document.createElement('scroll-option');
                prompt.innerText = 'Select...';
                prompt.setAttribute('prompt', '');
                prompt.addEventListener('click', this.listenForSelection.bind(this));
            this.prepend(prompt);
        }
        
        console.log(`Registered ScrollSelect ${index + 1}`)
    }
    listenForSelection () {
        this.setAttribute('open','');
        let options = this.querySelectorAll('scroll-option:not([prompt])');
        options.forEach(option => {
            option.addEventListener('click', () => {
                if (this.querySelector('[selected]')) this.querySelector('[selected]').removeAttribute('selected');
                if (this.querySelector('[prompt]')) this.removeChild(this.querySelector('[prompt]'));
                option.setAttribute('selected','');
                option.addEventListener('click', this.listenForSelection.bind(this));
                this.value = option.value;
                this.removeAttribute('open');
            })
        })
    }
}
customElements.define('scroll-select', ScrollSelect);

class ScrollOption extends HTMLElement {
    constructor() {
        super();

        let select = this.parentElement;
        let selectIndex = [...document.querySelectorAll('scroll-select')].indexOf(select);

        let index = [...select.children].indexOf(this);        

        console.log(`Registered ScrollOption ${index + 1} of ScrollSelect ${selectIndex + 1}`)
    }
}
customElements.define('scroll-option', ScrollOption);
