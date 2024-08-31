(()=>{"use strict";var e={baseUrl:"https://nomoreparties.co/v1/wff-cohort-21",headers:{authorization:"b0628161-c71c-4e52-9e26-a3e056174f00","Content-Type":"application/json"}},t=function(e){return e.ok?e.json():Promise.reject("Ошибка: ".concat(e.status))},r=function(r){return fetch("".concat(e.baseUrl,"/cards/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)})).catch((function(e){return console.error(e)}))},n=function(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"PUT",headers:e.headers}).then((function(e){return t(e)})).catch((function(e){return console.error(e)}))},o=function(r){return fetch("".concat(e.baseUrl,"/cards/likes/").concat(r),{method:"DELETE",headers:e.headers}).then((function(e){return t(e)})).catch((function(e){return console.error(e)}))},c=function(e){return fetch(e,{method:"HEAD"}).then((function(e){if(!e.ok)return!1;var t=e.headers.get("Content-Type");return!(!t||!t.startsWith("image/"))})).catch((function(){return!1}))},u=document.querySelector("#card-template").content;function a(e,t,r,n,o,c){var a=u.querySelector(".places__item").cloneNode(!0),i=a.querySelector(".card__title"),l=a.querySelector(".card__image"),s=a.querySelector(".card__like-counter");i.textContent=e.name,l.src=e.link,l.alt=e.name,s.textContent=e.likes.length,l.addEventListener("click",c);var d=a.querySelector(".card__delete-button");t?d.addEventListener("click",(function(){return n(a,e._id)})):d.remove();var p=a.querySelector(".card__like-button");return r&&p.classList.add("card__like-button_is-active"),p.addEventListener("click",(function(t){return o(t,s,e._id)})),a}function i(e,t){r(t).then((function(){return e.remove()}))}function l(e,t,r){(e.target.classList.contains("card__like-button_is-active")?o(r):n(r)).then((function(r){t.textContent=r.likes.length,e.target.classList.toggle("card__like-button_is-active")}))}function s(e){document.addEventListener("keydown",p),e.classList.add("popup_is-opened")}function d(e){document.removeEventListener("keydown",p),e.classList.remove("popup_is-opened")}function p(e){"Escape"===e.key&&d(document.querySelector(".popup_is-opened"))}function f(e){var t=e.currentTarget;(e.target===t||e.target.classList.contains("popup__close"))&&d(t)}function _(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector));e.querySelector(t.submitButtonSelector).classList.add(t.inactiveButtonClass),r.forEach((function(r){m(e,r,t.inputErrorClass,t.errorClass)}))}function y(e,t,r){!function(e){return e.some((function(e){return!e.validity.valid}))}(e)?t.classList.remove(r):t.classList.add(r)}function m(e,t,r,n){var o=e.querySelector(".".concat(t.id,"-error"));o.textContent="",o.classList.remove(n),t.classList.remove(r)}function v(e,t){(null==t||t>e.length)&&(t=e.length);for(var r=0,n=Array(t);r<t;r++)n[r]=e[r];return n}var h=document.querySelector(".places__list"),S=document.querySelector(".profile__edit-button"),b=document.querySelector(".profile__add-button"),q=document.querySelector(".profile__image"),g=document.querySelector(".profile__title"),C=document.querySelector(".profile__description"),E=document.querySelector(".popup_type_edit"),L=E.querySelector(".popup__input_type_name"),k=E.querySelector(".popup__input_type_description"),x=document.querySelector(".popup_type_new-card"),A=x.querySelector(".popup__input_type_card-name"),T=x.querySelector(".popup__input_type_url"),U=document.querySelector(".popup_type_image"),w=U.querySelector(".popup__image"),B=U.querySelector(".popup__caption"),j=document.querySelector(".popup_type_avatar"),O=j.querySelector(".popup__input_type_url"),I=document.querySelector(".popup_type_confirm-delete"),P={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error_visible"};function D(e){w.src=e.target.src,B.textContent=e.target.alt,s(U)}function M(e,t,r){var n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:"Неверная ссылка на изображение или файл не доступен.";t.textContent=n,t.classList.add(P.errorClass),e.classList.add(P.inputErrorClass),r.classList.toggle(P.inactiveButtonClass)}function N(r){r.preventDefault();var n,o,u=r.currentTarget,s=u.querySelector(".popup__button");if(s.textContent="Сохранение...",u===E)(n=L.value,o=k.value,fetch("".concat(e.baseUrl,"/users/me"),{method:"PATCH",headers:e.headers,body:JSON.stringify({name:n,about:o})}).catch((function(e){return console.error(e)}))).then((function(){g.textContent=L.value,C.textContent=k.value,d(u)})).finally((function(){return s.textContent="Сохранить"}));else if(u===x){var p=T.value;c(p).then((function(r){if(r){var n,o;(n=A.value,o=T.value,fetch("".concat(e.baseUrl,"/cards"),{method:"POST",headers:e.headers,body:JSON.stringify({name:n,link:o})}).then((function(e){return t(e)})).catch((function(e){return console.error(e)}))).then((function(e){var t=a(e,!0,!1,i,l,D);h.prepend(t),u.querySelector(".popup__form").reset(),_(u.querySelector(".popup__form"),P),d(u)}))}else{var c=x.querySelector(".link-input-error");M(T,c,s)}})).finally((function(){return s.textContent="Сохранить"}))}else if(u===j){var f=O.value;c(f).then((function(r){if(r)(function(r){return fetch("".concat(e.baseUrl,"/users/me/avatar"),{method:"PATCH",headers:e.headers,body:JSON.stringify({avatar:r})}).then((function(e){return t(e)})).catch((function(e){return console.error(e)}))})(f).then((function(){q.style.backgroundImage="url(".concat(f,")")})),d(u);else{var n=j.querySelector(".link-input-avatar-error");M(O,n,s)}})).finally((function(){return s.textContent="Сохранить"}))}}!function(e){Array.from(document.querySelectorAll(e.formSelector)).forEach((function(t){!function(e,t){var r=Array.from(e.querySelectorAll(t.inputSelector)),n=e.querySelector(t.submitButtonSelector);y(r,n,t.inactiveButtonClass),r.forEach((function(o){o.addEventListener("input",(function(){!function(e,t,r,n){t.validity.patternMismatch?t.setCustomValidity(t.dataset.errorMessage):t.setCustomValidity(""),t.validity.valid?m(e,t,r,n):function(e,t,r,n,o){var c=e.querySelector(".".concat(t.id,"-error"));c.textContent=r,c.classList.add(o),t.classList.add(n)}(e,t,t.validationMessage,r,n)}(e,o,t.inputErrorClass,t.errorClass),y(r,n,t.inactiveButtonClass)}))}))}(t,e)}))}(P),Promise.all([fetch("".concat(e.baseUrl,"/users/me"),{method:"GET",headers:e.headers}).then((function(e){return t(e)})).catch((function(e){return console.error(e)})),fetch("".concat(e.baseUrl,"/cards"),{method:"GET",headers:e.headers}).then((function(e){return t(e)})).catch((function(e){return console.error(e)}))]).then((function(e){var t,r,n=(r=2,function(e){if(Array.isArray(e))return e}(t=e)||function(e,t){var r=null==e?null:"undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"];if(null!=r){var n,o,c,u,a=[],i=!0,l=!1;try{if(c=(r=r.call(e)).next,0===t){if(Object(r)!==r)return;i=!1}else for(;!(i=(n=c.call(r)).done)&&(a.push(n.value),a.length!==t);i=!0);}catch(e){l=!0,o=e}finally{try{if(!i&&null!=r.return&&(u=r.return(),Object(u)!==u))return}finally{if(l)throw o}}return a}}(t,r)||function(e,t){if(e){if("string"==typeof e)return v(e,t);var r={}.toString.call(e).slice(8,-1);return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?v(e,t):void 0}}(t,r)||function(){throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()),o=n[0],c=n[1];q.style.backgroundImage="url(".concat(o.avatar,")"),g.textContent=o.name,C.textContent=o.about,c.forEach((function(e){var t=o._id===e.owner._id,r=e.likes.some((function(e){return e._id===o._id})),n=a(e,t,r,i,l,D);h.append(n)}))})),S.addEventListener("click",(function(){L.value=g.textContent,k.value=C.textContent,_(E.querySelector(".popup__form"),P),s(E)})),b.addEventListener("click",(function(){return s(x)})),q.addEventListener("click",(function(){var e=q.style.backgroundImage.replace(/url\(["']?(.*?)["']?\)/,"$1");O.value=e,_(j.querySelector(".popup__form"),P),s(j)})),E.addEventListener("click",f),E.addEventListener("submit",N),j.addEventListener("click",f),j.addEventListener("submit",N),x.addEventListener("click",f),x.addEventListener("submit",N),U.addEventListener("click",f),I.addEventListener("submit",N)})();
//# sourceMappingURL=main.js.map