const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z0-9]{8,}$/;

let loginInputEmail = document.querySelector('.login .email');

let loginInputPswd = document.querySelector('.login .pswd');

let registerInputUserName = document.querySelector('.register .txt');

let registerInputEmail = document.querySelector('.register .email');

let registerInputPswd = document.querySelector('.register .pswd');

let loginBtn = document.querySelector('.login a');

let registerBtn = document.querySelector('.register a');

let loginExistedParagraph = document.querySelector('.login .exsited');

let registerExistedParagraph = document.querySelector('.register .exsited');

var mainDiv = document.querySelector('.main');

var registerDiv = document.querySelector('.register');

let logoutBtn = document.querySelector('.logout');

let paragraph = document.querySelector('.fs-5');

let div = document.querySelector('.mainD');

let registerInputs = [];

if (localStorage.getItem('inputsData') != null) {
    registerInputs = JSON.parse(localStorage.getItem('inputsData'));
}

function getTheDataFromTheLocalStorage() {
    let alreadyExists = false;
    for (let i = 0; i < registerInputs.length; i++) {
        if (loginInputEmail.value === registerInputs[i].email
            && loginInputPswd.value === registerInputs[i].password) {
                alreadyExists = true;
                paragraph.innerHTML = `Welcome ${registerInputs[i].name}`;
                break;
            }
    }
    if (alreadyExists) {
        mainDiv.classList.replace('d-block', 'd-none');
        div.classList.replace('d-none', 'd-block');
        clearForm();
    } else if (loginInputEmail.value == '' || loginInputPswd.value == '') {
        emptyFiledsCheckOrInCorrectDataEnteredInTheLogin();
        loginExistedParagraph.innerHTML = 'all the data are required';
        clearForm();
    } else if ( !emailRegex.test(loginInputEmail.value) && !passwordRegex.test(loginInputPswd.value) ) {
        emptyFiledsCheckOrInCorrectDataEnteredInTheLogin();
        loginExistedParagraph.innerHTML = 'Invalid Password & Email format';
        clearForm();
    } else if (!emailRegex.test(loginInputEmail.value)) {
        emptyFiledsCheckOrInCorrectDataEnteredInTheLogin();
        loginExistedParagraph.innerHTML = 'Invalid email format';
        clearForm();
    } else if (!passwordRegex.test(loginInputPswd.value)) {
        emptyFiledsCheckOrInCorrectDataEnteredInTheLogin();
        loginExistedParagraph.innerHTML = 'Invalid Password format';
        clearForm();
    }
}

function addTheDataToTheLocalStorage() {
    let inputsData = {
        name: registerInputUserName.value,
        email: registerInputEmail.value,
        password: registerInputPswd.value,
    }

    let alreadyExists = false;
    for (let i = 0; i < registerInputs.length; i++) {
        if (registerInputEmail.value === registerInputs[i].email
            && registerInputPswd.value === registerInputs[i].password
            && registerInputUserName.value === registerInputs[i].name) {
                alreadyExists = true;
                break;
            }
    }

    if (alreadyExists) {
        emptyFiledsCheckOrInCorrectDataEntered();
        registerExistedParagraph.innerHTML = 'these data are already existed';
        clearForm();
    } else if (registerInputEmail.value == '' || registerInputPswd.value == '' || registerInputUserName.value == '') {
        emptyFiledsCheckOrInCorrectDataEntered();
        clearForm();
    } else if ( !emailRegex.test(registerInputEmail.value) && !passwordRegex.test(registerInputPswd.value) ) {
        emptyFiledsCheckOrInCorrectDataEntered();
        registerExistedParagraph.innerHTML = 'Invalid Password & Email format';
        clearForm();
    } else if (!emailRegex.test(registerInputEmail.value)) {
        emptyFiledsCheckOrInCorrectDataEntered();
        registerExistedParagraph.innerHTML = 'Invalid email format';
        clearForm();
    } else if (!passwordRegex.test(registerInputPswd.value)) {
        emptyFiledsCheckOrInCorrectDataEntered();
        registerExistedParagraph.innerHTML = 'Invalid Password format must include sympols & letters & numbers';
        registerInputPswd.value = '';
        mainDiv.style.maxHeight = '520px';
    } else {
        registerInputs.push(inputsData);
        localStorage.setItem('inputsData', JSON.stringify(registerInputs));
        registerExistedParagraph.classList.replace('d-flex', 'd-none');
        registerDiv.classList.remove('active');
        mainDiv.style.maxHeight = '450px';
        clearForm();
        emptyFiledsCheckOrInCorrectDataEntered();
        registerExistedParagraph.innerHTML = 'success';
        if (registerExistedParagraph.innerHTML == 'success') {
            registerDiv.classList.add('preactive')
        }
    }
}


loginBtn.addEventListener('click', getTheDataFromTheLocalStorage);

registerBtn.addEventListener('click', addTheDataToTheLocalStorage);

function clearForm() {
    registerInputEmail.value = '';
    registerInputPswd.value = '';
    registerInputUserName.value = '';

    loginInputEmail.value = '';
    loginInputPswd.value = '';
}

function emptyFiledsCheckOrInCorrectDataEntered() {
    registerExistedParagraph.classList.replace('d-none', 'd-flex');
    registerExistedParagraph.innerHTML = 'all Input are required';
    if (registerExistedParagraph.classList.contains('d-flex')) {
        mainDiv.style.maxHeight = '500px';
        registerDiv.classList.add('active');
    }
}

function emptyFiledsCheckOrInCorrectDataEnteredInTheLogin() {
    loginExistedParagraph.classList.replace('d-none', 'd-flex');
    loginExistedParagraph.innerHTML = 'all Input are required';
    if (loginExistedParagraph.classList.contains('d-flex')); {
        mainDiv.style.maxHeight = '480px';
    }
}

logoutBtn.addEventListener('click', function() {
    mainDiv.classList.replace('d-none', 'd-block');
    div.classList.replace('d-block', 'd-none')
});