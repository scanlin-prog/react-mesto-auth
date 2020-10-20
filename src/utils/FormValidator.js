export default class FormValidator {
    constructor(formElement) {
        this._options = {
            formSelector: '.popup__container',
            inputSelector: '.popup__input',
            submitButtonSelector: '.popup__button-create',
            inactiveButtonClass: 'popup__button-create_inactive',
            inputErrorClass: 'popup__input_type_error',
            activeErrorClass: 'popup__input-error_active'
        };
        this._formElement = formElement;
    }

    _showInputError(inputElement, errorMessage) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.add(this._options.inputErrorClass);
        errorElement.classList.add(this._options.activeErrorClass);
        errorElement.textContent = errorMessage;
    }

    _hideInputError(inputElement) {
        const errorElement = this._formElement.querySelector(`#${inputElement.id}-error`);
        inputElement.classList.remove(this._options.inputErrorClass);
        errorElement.classList.remove(this._options.activeErrorClass);
        errorElement.textContent = '';
    }

    _checkInputValidity(inputElement) {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage)
        } else {
            this._hideInputError(inputElement)
        }
    }

    _hasInvalidInput(inputList) {
        return inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    }

    _toggleButtonState(inputList, buttonElement) {
        if (this._hasInvalidInput(inputList)) {
            buttonElement.classList.add(this._options.inactiveButtonClass);
            buttonElement.setAttribute('disabled', true);
        } else {
            buttonElement.classList.remove(this._options.inactiveButtonClass);
            buttonElement.removeAttribute('disabled');
        }
    }

    _setEventListeners() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
                this._checkInputValidity(inputElement);
                this._toggleButtonState(inputList, buttonElement);
            })
        })
    }

    resetValidationErrors() {
        const inputList = Array.from(this._formElement.querySelectorAll(this._options.inputSelector));
        const buttonElement = this._formElement.querySelector(this._options.submitButtonSelector);

        this._toggleButtonState(inputList, buttonElement);

        inputList.forEach((inputElement) => {
            if (inputElement.value !== '') {
                this._checkInputValidity(inputElement);
            } else {
                this._hideInputError(inputElement)
            }
        })

    }

    enableValidation() {
        this._setEventListeners();
    }
}