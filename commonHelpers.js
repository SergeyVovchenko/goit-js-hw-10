import"./assets/modulepreload-polyfill-3cfb730f.js";/* empty css                      */import{f,i as h}from"./assets/vendor-77e16229.js";const r=document.querySelector("#datetime-picker"),e=document.querySelector("button[data-start]"),p=document.querySelector("span[data-days]"),b=document.querySelector("span[data-hours]"),y=document.querySelector("span[data-minutes]"),l=document.querySelector("span[data-seconds]");e.addEventListener("click",S);let m=null;e.disabled=!0;function S(){let t=null;e.disabled=!0,r.disabled=!0,e.classList.remove("btn-is-active"),t=setInterval(()=>{const o=Date.now(),s=m-o;if(s<1e3){e.disabled=!1,r.disabled=!1,clearInterval(t),l.textContent="00";return}const n=v(s);C(n)},1e3)}function v(t){const c=a(Math.floor(t/864e5)),i=a(Math.floor(t%864e5/36e5)),d=a(Math.floor(t%864e5%36e5/6e4)),u=a(Math.floor(t%864e5%36e5%6e4/1e3));return console.log({days:c,hours:i,minutes:d,seconds:u}),{days:c,hours:i,minutes:d,seconds:u}}function a(t){return String(t).padStart(2,"0")}function C({days:t,hours:o,minutes:s,seconds:n}){p.textContent=`${t}`,b.textContent=`${o}`,y.textContent=`${s}`,l.textContent=`${n}`}const D={enableTime:!0,time_24hr:!0,defaultDate:new Date,minuteIncrement:1,onClose(t){const o=Date.now(),n=t[0].getTime();if(o>n)return e.disabled=!0,e.classList.remove("btn-is-active"),h.show({message:"&#9888 Please choose a date in the future",backgroundColor:"#FFA000",messageColor:"#FFF",messageSize:"16px",position:"topRight"});e.disabled=!1,e.classList.add("btn-is-active"),m=n}};f(r,D);
//# sourceMappingURL=commonHelpers.js.map