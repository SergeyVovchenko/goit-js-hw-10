import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const dateTime = document.querySelector('#datetime-picker');
const btnStart = document.querySelector('button[data-start]');
const timerDays = document.querySelector('span[data-days]');
const timerHours = document.querySelector('span[data-hours]');
const timerMinutes = document.querySelector('span[data-minutes]');
const timerSeconds = document.querySelector('span[data-seconds]');

btnStart.addEventListener('click', btnHandleClick);
let userSelectedDate = null;
btnStart.disabled = true;

function btnHandleClick() {
    let intervalId = null;
    btnStart.disabled = true;
    dateTime.disabled = true;
    btnStart.classList.remove('btn-is-active');

    intervalId = setInterval(() => {
        const currentTime = Date.now();
        const deltaTime = userSelectedDate - currentTime;
        if (deltaTime < 1000) {
            btnStart.disabled = false;
            dateTime.disabled = false;
            clearInterval(intervalId);
            timerSeconds.textContent = '00';
            return;
        }
        const time = convertMs(deltaTime);
        updateTimerFace(time);
    }, 1000);
}

function convertMs(ms) {
    const second = 1000;
    const minute = second * 60;
    const hour = minute * 60;
    const day = hour * 24;

    const days = padStart(Math.floor(ms / day));
    const hours = padStart(Math.floor((ms % day) / hour));
    const minutes = padStart(Math.floor(((ms % day) % hour) / minute));
    const seconds = padStart(
        Math.floor((((ms % day) % hour) % minute) / second)
    );

    console.log({ days, hours, minutes, seconds });
    return { days, hours, minutes, seconds };
}

function padStart(value) {
    return String(value).padStart(2, '0');
}

function updateTimerFace({ days, hours, minutes, seconds }) {
    timerDays.textContent = `${days}`;
    timerHours.textContent = `${hours}`;
    timerMinutes.textContent = `${minutes}`;
    timerSeconds.textContent = `${seconds}`;
}

const options = {
    enableTime: true,
    time_24hr: true,
    defaultDate: new Date(),
    minuteIncrement: 1,
    onClose(selectedDates) {
        const dateNow = Date.now();
        const userDate = selectedDates[0];
        const userDateMs = userDate.getTime();
        if (dateNow > userDateMs) {
            btnStart.disabled = true;
            btnStart.classList.remove('btn-is-active');
            // return alert('Please choose a date in the future');
            return iziToast.show({
                message: `&#9888 Please choose a date in the future`,
                backgroundColor: '#FFA000',
                messageColor: '#FFF',
                messageSize: '16px',
                position: 'topRight',
            });
        } else {
            btnStart.disabled = false;
            btnStart.classList.add('btn-is-active');
            userSelectedDate = userDateMs;
        }
    },
};

flatpickr(dateTime, options);
