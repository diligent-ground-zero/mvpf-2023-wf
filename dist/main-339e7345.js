function r(){const t='[fs-hacks-element="footer-year"]',e=document.querySelector(t);if(!e)return;const n=new Date().getFullYear();e.innerText=n.toString()}function c(){const t=document.querySelectorAll('input[name="pathname-field"]');for(let e=0;e<t.length;e++)t[e].value=location.href}function u(){let t;window.addEventListener("resize",function(){clearTimeout(t),t=setTimeout(function(){e()},50)});const e=()=>{document.querySelector("nav[data-nav-menu-open]")&&document.querySelector(".nav-hamburger-icon").click()}}function i(){const t=["utm_source","utm_medium","utm_campaign","utm_content"],e=new URLSearchParams(window.location.search),n=new URLSearchParams;for(const[a,o]of e)t.includes(a)&&(sessionStorage.setItem(a,o),n.append(a,o));s(n)}function s(t){const e=t.toString();document.querySelectorAll('input[type="text"][name="utm-parameters"].utm-parameters').forEach(n=>{n.value=e}),document.querySelectorAll('input[type="text"][name="pathname-field"].pathname-field').forEach(n=>{n.value=window.location.pathname})}document.addEventListener("DOMContentLoaded",()=>{r(),c(),u(),i()});
