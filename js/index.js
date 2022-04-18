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

function createRow(data) {
    const row = templateRow.querySelector('tr').cloneNode(true);
    const rowNodeList = row.querySelectorAll('td');

    rowNodeList[0].textContent = data.date;
    rowNodeList[1].textContent = data.title;
    rowNodeList[2].textContent = data.number;
    rowNodeList[3].textContent = data.distance;
    return row
}

function createPaginations(counter) {
    let step = (counter / 10) | 0; // division without remainder
    if (step < 10) step = 10;
    for (let i = 0; i < counter; i += step) {
        const newBtn = templateBtn.querySelector('button').cloneNode(true);

        newBtn.textContent = i;
        newBtn.value = i
        newBtn.addEventListener('click', () => {
            currentOffset = i;
            putOutTheBacklight();
            turnOnTheBacklight(newBtn);
            if (params !== "") viewTable(url + params + '/' + i);
            else viewTable(url + i)
        });
        paginationsArea.append(newBtn);
    }
}

function render(data) {
    tableBody.innerHTML = '';
    for (const key in data) {
        if (typeof data[key] === 'object') {
            tableBody.append(createRow(data[key]));
        }
    }

    const counter = data['counter'];
    if (counter > 10 && !paginationsArea.childNodes.length) {
        createPaginations(counter)
    }
}

function viewTable(url) {
    console.log(url);
    fetch(url)
        .then(res => {
            if (res.ok) {
                return res.json();
            } else {
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
            let fieldName = item.getAttribute('id')
            if (item.getAttribute('id') !== 'date') {
                if (params.includes(fieldName) && !params.includes('-')) { fieldName = '-' + fieldName }
                params = 'order_by=' + fieldName;
                viewTable(url + params + '/' + currentOffset)
            }
        })
    })

    form.addEventListener('submit', (e) => {
        console.log(e);
    })
}


let url = "http://127.0.0.1:8000/";
let params = ""
let currentOffset = 0;

const form = document.querySelector('.sortForm');
const formSelectField = form.querySelector('.select-field');
const formSelectCondition = form.querySelector('.select-condition');
const formInput = form.querySelector('.input-param');

const tableHeadItems = document.querySelectorAll('.table-head');

const tableBody = document.querySelector('#tableBody');
const paginationsArea = document.querySelector('#paginations');
const classColorBtnPressed = 'btn-secondary'
const classColorBtnDefault = 'btn-outline-secondary'

const templateRow = document.querySelector('#row').content;
const templateBtn = document.querySelector('#btn').content;


main();