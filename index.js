import{a as L,i as S,S as v}from"./assets/vendor-DnVuFECx.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))n(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const c of r.addedNodes)c.tagName==="LINK"&&c.rel==="modulepreload"&&n(c)}).observe(document,{childList:!0,subtree:!0});function i(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerPolicy&&(r.referrerPolicy=o.referrerPolicy),o.crossOrigin==="use-credentials"?r.credentials="include":o.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function n(o){if(o.ep)return;o.ep=!0;const r=i(o);fetch(o.href,r)}})();const w="https://pixabay.com/api/",q="48986485-6ea1696c08190fb3e366663c0";async function M(e,t=1,i=40){try{return(await L.get(w,{params:{key:q,q:e,image_type:"photo",orientation:"horizontal",safesearch:"true",page:t,per_page:i}})).data}catch(n){throw console.error("Error fetching images:",n),n}}function E(e,t){if(!e||e.length===0){u("No images found!");return}const i=e.map(({webformatURL:n,largeImageURL:o,tags:r,likes:c,views:p,comments:g,downloads:b})=>`
    <a class="gallery-item" href="${o}" data-title="${r}">
      <img src="${n}" alt="${r}" loading="lazy"/>
      <div class="info">
        <p><b>Likes:</b> ${c}</p>
        <p><b>Views:</b> ${p}</p>
        <p><b>Comments:</b> ${g}</p>
        <p><b>Downloads:</b> ${b}</p>
      </div>
    </a>
  `).join("");t.insertAdjacentHTML("beforeend",i)}function u(e,t="topRight"){try{S.show({message:e,position:t,timeout:3e3})}catch(i){console.error("Error displaying notification:",i)}}function P(){const e=document.querySelector(".gallery-item");if(!e)return;const{height:t}=e.getBoundingClientRect();window.scrollBy({top:t*2,behavior:"smooth"})}function $(){const e=document.querySelector(".loader");e&&(e.style.display="block")}function B(){const e=document.querySelector(".loader");e&&(e.style.display="none")}function f(e){const t=document.querySelector(".load-more");t&&(t.style.display=e?"block":"none",e&&t.scrollIntoView({behavior:"smooth",block:"end"}))}let d="",a=1,s=0;const l=40,I=document.querySelector(".form"),y=document.querySelector(".gallery"),m=document.querySelector(".load-more"),O=new v(".gallery a",{captionsData:"alt",captionDelay:250});I.addEventListener("submit",A);m.addEventListener("click",N);function A(e){e.preventDefault(),d=e.currentTarget.elements.query.value.trim(),d&&(a=1,s=0,H(),m.style.display="none",h())}function H(){a=1,s=0,y.innerHTML=""}function N(){a++,h()}async function h(){$(),f(!1);try{const{hits:e,totalHits:t}=await M(d,a,l);x(e,t)}catch{u("Failed to load images. Please try again later.")}finally{B()}}function x(e,t){if(a===1&&(s=t,!s)){u("Sorry, there are no images matching your search query. Please try again!");return}E(e,y),O.refresh(),D(e),a>1&&event instanceof MouseEvent&&P()}function D(e){const t=e.length===l&&a*l<s;f(t),!t&&a*l>=s&&u("We're sorry, but you've reached the end of search results.")}
//# sourceMappingURL=index.js.map
