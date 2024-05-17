import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputDelay = document.querySelector('input[name="delay"]');
const btnCreate = document.querySelector('button');
const radioBtn = document.querySelector('fieldset');

inputDelay.addEventListener('input', handleInput);
btnCreate.addEventListener('click', handleCreate);
radioBtn.addEventListener('input', handleRadio);

let userDelay = 0;
let userRadio = '';

function handleInput(event) {
    userDelay = event.target.value;
}

function handleRadio(event) {
    userRadio = event.target.value;
}

const queueCreate = [];
function handleCreate(event) {
    event.preventDefault();
    queueCreate.push({ delay: `${userDelay}`, value: `${userRadio}` });

    const prom = new Promise((resolve, reject) => {
        setTimeout(() => {
            if (queueCreate[0].value === 'fulfilled') {
                resolve(
                    `&#10004 Fulfilled promise in ${queueCreate[0].delay}ms`
                );
                queueCreate.splice(0, 1);
            } else if (queueCreate[0].value === 'rejected') {
                reject(`&#10006 Rejected promise in ${queueCreate[0].delay}ms`);
                queueCreate.splice(0, 1);
            }
        }, queueCreate[0].delay);
    });
    prom.then(value => {
        console.log(value);
        return iziToast.show({
            message: `${value}`,
            backgroundColor: '#59A10D',
            messageColor: '#FFF',
            messageSize: '16px',
            position: 'topRight',
        });
    }).catch(error => {
        console.log(error);
        return iziToast.show({
            message: `${error}`,
            backgroundColor: '#EF4040',
            messageColor: '#FFF',
            messageSize: '16px',
            position: 'topRight',
        });
    });
}
