let url = "http://127.0.0.1:8000/";

const form = document.querySelector('.sortForm');

const tableBody = document.querySelector('#tableBody');
const paginationsArea = document.querySelector('#paginations');

const templateRow = document.querySelector('#row').content;
const templateBtn = document.querySelector('#btn').content;

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
            viewTable(url + i);
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

function viewTable(url = "http://127.0.0.1:8000/") {
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
    form.addEventListener('submit', (e) => {
        console.log(e);
    })
}

main();