if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,s,c)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const d={uri:location.origin+r.slice(1)};return Promise.all(s.map(r=>{switch(r){case"exports":return i;case"module":return d;default:return e(r)}})).then(e=>{const r=c(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-2952c233"],(function(e){"use strict";importScripts("workbox-sw.js"),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.clientsClaim(),e.precacheAndRoute([{url:"icon_128x128.a1a705e773ed122a8181a98bfb8f2f3c.png",revision:"a1a705e773ed122a8181a98bfb8f2f3c"},{url:"icon_192x192.241942c049a2b89dbda290a014997360.png",revision:"241942c049a2b89dbda290a014997360"},{url:"icon_250x250.acbc6b80265619c55e754d7e0bdbbace.png",revision:"acbc6b80265619c55e754d7e0bdbbace"},{url:"icon_96x96.d95388d4e7388d2189ef18554db4f798.png",revision:"d95388d4e7388d2189ef18554db4f798"},{url:"index.html",revision:"6ec9d72712d3f7c51e5ee0d0d22b5d36"},{url:"main.7e6d114a34d2bd6bf71e.css",revision:"30ae8b3e8a74efa5d1970c2e4bfdaaa1"},{url:"main.js",revision:"25b71f774b105f98fef9938329474202"},{url:"manifest.a5cd1eeeea1c992b4202edd2de99bcce.json",revision:"a5cd1eeeea1c992b4202edd2de99bcce"},{url:"workbox-sw.js",revision:"3a6c9aac0a6156700b9629b586e60225"}],{})}));
