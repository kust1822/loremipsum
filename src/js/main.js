// Для плавного перехода по якорям
class SmoothScroll {
    constructor(offset = 160) {
        this.offset = offset;
        this.init();
    }

    init() {
        document.addEventListener('click', this.handleClick.bind(this));
    }

    handleClick(event) {
        const target = event.target.closest('a[href^="#"]');
        
        if (target && target.hash) {
            event.preventDefault();
            this.scrollToTarget(target.hash);
        }
    }

    scrollToTarget(id) {
        const element = document.querySelector(id);
        
        if (element) {
            const top = element.getBoundingClientRect().top + window.pageYOffset - this.offset;
            window.scrollTo({
                top: top,
                behavior: 'smooth'
            });
        } else {
            console.error(`Элемент с идентификатором ${id} не найден.`);
        }
    }
}

// Обработка загрузки файлов
class FileInputHandler {
    constructor() {
        this.inputs = document.querySelectorAll(".attach-file__input");
        this.init();
    }

    init() {
        this.inputs.forEach(input => {
            const label = input.nextElementSibling;
            const labelText = label.querySelector(".attach-file__input-button-text");
            const defaultText = labelText.innerText;

            input.addEventListener("change", () => {
                const filesCount = input.files?.length || 0;
                labelText.innerText = filesCount 
                    ? `Выбрано файлов: ${filesCount}` 
                    : defaultText;
            });
        });
    }
}

// Обработка range input
class RangeHandler {
    constructor() {
        this.rangeInputs = document.querySelectorAll(".range__input");
        this.init();
    }

    init() {
        this.rangeInputs.forEach(range => {
            range.addEventListener("input", this.handleRangeInput.bind(this));
            // Инициализация при загрузке
            this.handleRangeInput({ target: range });
        });
    }

    handleRangeInput(event) {
        const value = event.target.value;
        const parentContainer = event.target.closest('.range');
        
        if (parentContainer) {
            parentContainer.style.setProperty("--value", value);
        }
        
        const output = event.target.nextElementSibling;
        if (output) {
            output.value = value;
        }
    }
}

// Кастомный select
class CustomSelect {
    constructor(selector = '.select') {
        this.selects = document.querySelectorAll(selector);
        this.init();
    }

    init() {
        this.selects.forEach(select => {
            const header = select.querySelector('.select__header');
            const arrow = select.querySelector('.select__arrow');
            const options = select.querySelector('.select__options');
            const optionItems = select.querySelectorAll('.select__option');
            const placeholder = select.querySelector('.select__placeholder');

            header?.addEventListener('click', (e) => {
                e.stopPropagation();
                header.classList.toggle('active');
                arrow?.classList.toggle('active');
                options?.classList.toggle('active');
            });

            optionItems?.forEach(option => {
                option.addEventListener('click', () => {
                    optionItems.forEach(opt => opt.classList.remove('selected'));
                    option.classList.add('selected');
                    
                    if (placeholder) {
                        placeholder.textContent = option.textContent;
                    }
                    
                    this.closeSelect(header, arrow, options);
                });
            });
        });

        document.addEventListener('click', () => {
            this.selects.forEach(select => {
                this.closeSelect(
                    select.querySelector('.select__header'),
                    select.querySelector('.select__arrow'),
                    select.querySelector('.select__options')
                );
            });
        });
    }

    closeSelect(header, arrow, options) {
        header?.classList.remove('active');
        arrow?.classList.remove('active');
        options?.classList.remove('active');
    }
}

// Инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    new SmoothScroll();
    new FileInputHandler();
    new RangeHandler();
    new CustomSelect();
});