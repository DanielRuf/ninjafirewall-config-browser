if(!self.define){const e=e=>{"require"!==e&&(e+=".js");let r=Promise.resolve();return i[e]||(r=new Promise(async r=>{if("document"in self){const i=document.createElement("script");i.src=e,document.head.appendChild(i),i.onload=r}else importScripts(e),r()})),r.then(()=>{if(!i[e])throw new Error(`Module ${e} didn’t register its module`);return i[e]})},r=(r,i)=>{Promise.all(r.map(e)).then(e=>i(1===e.length?e[0]:e))},i={require:Promise.resolve(r)};self.define=(r,c,s)=>{i[r]||(i[r]=Promise.resolve().then(()=>{let i={};const d={uri:location.origin+r.slice(1)};return Promise.all(c.map(r=>{switch(r){case"exports":return i;case"module":return d;default:return e(r)}})).then(e=>{const r=s(...e);return i.default||(i.default=r),i})}))}}define("./sw.js",["./workbox-a5798ee2"],(function(e){"use strict";importScripts("workbox-sw.js"),self.addEventListener("message",e=>{e.data&&"SKIP_WAITING"===e.data.type&&self.skipWaiting()}),e.clientsClaim(),e.precacheAndRoute([{url:"icon_128x128.a1a705e773ed122a8181a98bfb8f2f3c.png",revision:"a1a705e773ed122a8181a98bfb8f2f3c"},{url:"icon_192x192.241942c049a2b89dbda290a014997360.png",revision:"241942c049a2b89dbda290a014997360"},{url:"icon_250x250.acbc6b80265619c55e754d7e0bdbbace.png",revision:"acbc6b80265619c55e754d7e0bdbbace"},{url:"icon_96x96.d95388d4e7388d2189ef18554db4f798.png",revision:"d95388d4e7388d2189ef18554db4f798"},{url:"index.html",revision:"97115cfbe68f57477d3f4bbb70626c80"},{url:"main.546704d8fad6728bf722.css",revision:"c9034c6f36c39b9b137d3934875ab73a"},{url:"main.js",revision:"a200bd30ef01201bcdb16d20c4e1e6f5"},{url:"manifest.a5cd1eeeea1c992b4202edd2de99bcce.json",revision:"a5cd1eeeea1c992b4202edd2de99bcce"},{url:"workbox-sw.js",revision:"a3219bbb2b7f4fc864090a77cd2839e8"}],{})}));
