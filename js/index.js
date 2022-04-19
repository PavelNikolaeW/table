function createFilter() {
    if (!formInput.value)
        return 'filter=' + formSelectField.value + "__" + formSelectCondition.value + '=0'
    else
        return 'filter=' + formSelectField.value + "__" + formSelectCondition.value + '=' + formInput.value
}

function putOutTheBacklight() {
    paginationsArea.childNodes.forEach(item => {
        if (item.classList.contains(classColorBtnPressed)) {
            item.classList.remove(classColorBtnPressed);
            item.classList.add(classColorBtnDefault);
        }
    })
}

function turnOnTheBacklight(btn) {
    btn.classList.add(classColorBtnPressed);
    btn.classList.remove(classColorBtnDefault);
}

function createUrlWithParams() {
    let rez = url;

    if (filterParams !== "") {
        rez += "/" + filterParams;
    }
    if (orderByParams !== "") {
        rez += "/" + orderByParams;
    }
    if (currentOffset !== 0) {
        rez += "/" + currentOffset;
    }

    return rez;
}

function createRow(data) {
    const row = templateRow.querySelector('tr').cloneNode(true);
    const rowNodeList = row.querySelectorAll('td');
    let n = 0;

    for (const item in data) {
        rowNodeList[n++].textContent = data[item];
    }

    return row
}

function createPaginations(counter) {
    let step = (counter / 10) | 0; // division without remainder
    if (step < 10) step = 10;

    for (let i = 0; i < counter; i += step) {
        const newBtn = templateBtn.querySelector('button').cloneNode(true);
        newBtn.textContent = i;
        newBtn.value = i
        if (i === 0) turnOnTheBacklight(newBtn);
        paginationsArea.append(newBtn);
    }
}

function render(data) {
    tableBody.innerHTML = '';
    const counter = data['counter'];

    for (const key in data) {
        if (typeof data[key] === 'object') {
            tableBody.append(createRow(data[key]));
        }
    }
    if (counter > 10 && !paginationsArea.childNodes.length) {
        createPaginations(counter)
    }
}

function viewTable(url) {
    fetch(url)
        .then(res => {
            if (res.ok) {
                formInput.classList.remove('is-invalid')
                return res.json();
            } else {
                formInput.classList.add('is-invalid')
                throw Error;
            }
        })
        .then(data => {
            render(data);
        })
        .catch(error => {
            console.log(error);
        })
}


function main() {
    viewTable(url);
    tableHeadItems.forEach(item => {
        item.addEventListener('click', (e) => {
            let fieldName = item.getAttribute('id');
            if (item.getAttribute('id') !== 'date') {
                if (orderByParams.includes(fieldName) && !orderByParams.includes('-')) {
                    fieldName = '-' + fieldName;
                }
                orderByParams = 'order_by=' + fieldName;
                viewTable(createUrlWithParams());
            }
        })
    })
    form.addEventListener('submit', (e) => {
        filterParams = createFilter();
        orderByParams = "";
        currentOffset = 0;
        paginationsArea.innerHTML = "";
        viewTable(createUrlWithParams());
        e.preventDefault();
    })
    paginationsArea.addEventListener('click', (evt) => {
        const target = evt.target;
        currentOffset = target.value;
        putOutTheBacklight();
        turnOnTheBacklight(target);
        viewTable(createUrlWithParams());
    })
}


let url = "http://127.0.0.1:8000";
let currentOffset = 0;
let orderByParams = "";
let filterParams = "";

const form = document.querySelector('.select-form');
const formSelectField = form.querySelector('.select-field');
const formSelectCondition = form.querySelector('.select-condition');
const formInput = form.querySelector('.input-param');

const tableHeadItems = document.querySelectorAll('.table-head');

const tableBody = document.querySelector('#tableBody');
const paginationsArea = document.querySelector('#paginations');
const classColorBtnPressed = 'btn-secondary';
const classColorBtnDefault = 'btn-outline-secondary';

const templateRow = document.querySelector('#row').content;
const templateBtn = document.querySelector('#btn').content;


main();