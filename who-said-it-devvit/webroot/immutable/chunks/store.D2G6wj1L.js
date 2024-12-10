import{a8 as E,$ as T,a9 as P,A as O,aa as V,ab as Y,ac as $,J as B,ad as R,v as C,ae as z,af as F,ag as m,R as y,z as D,q as J,y as h,ah as G,ai as K,aj as Q,ak as U,al as X,am as Z,w as x,M as ee,p as re,o as S,j as te,c as ae,n as N,b as ne,a7 as se,g as ie,F as ue}from"./runtime.D2felEhh.js";import{b as oe}from"./disclose-version.Doy5IeW9.js";let I=!1;function fe(){I||(I=!0,document.addEventListener("reset",e=>{Promise.resolve().then(()=>{var r;if(!e.defaultPrevented)for(const a of e.target.elements)(r=a.__on_r)==null||r.call(a)})},{capture:!0}))}function j(e){var r=P,a=O;E(null),T(null);try{return e()}finally{E(r),T(a)}}function ge(e,r,a,n=a){e.addEventListener(r,()=>j(a));const s=e.__on_r;s?e.__on_r=()=>{s(),n()}:e.__on_r=n,fe()}const ce=new Set,M=new Set;function le(e,r,a,n){function s(t){if(n.capture||p.call(r,t),!t.cancelBubble)return j(()=>a.call(this,t))}return e.startsWith("pointer")||e.startsWith("touch")||e==="wheel"?Y(()=>{r.addEventListener(e,s,n)}):r.addEventListener(e,s,n),s}function ye(e,r,a,n,s){var t={capture:n,passive:s},o=le(e,r,a,t);(r===document.body||r===window||r===document)&&V(()=>{r.removeEventListener(e,o,t)})}function p(e){var k;var r=this,a=r.ownerDocument,n=e.type,s=((k=e.composedPath)==null?void 0:k.call(e))||[],t=s[0]||e.target,o=0,v=e.__root;if(v){var l=s.indexOf(v);if(l!==-1&&(r===document||r===window)){e.__root=r;return}var d=s.indexOf(r);if(d===-1)return;l<=d&&(o=l)}if(t=s[o]||e.target,t!==r){$(e,"currentTarget",{configurable:!0,get(){return t||a}});var L=P,f=O;E(null),T(null);try{for(var i,u=[];t!==null;){var c=t.assignedSlot||t.parentNode||t.host||null;try{var _=t["__"+n];if(_!==void 0&&!t.disabled)if(B(_)){var[H,...W]=_;H.apply(t,[e,...W])}else _.call(t,e)}catch(g){i?u.push(g):i=g}if(e.cancelBubble||c===r||c===null)break;t=c}if(i){for(let g of u)queueMicrotask(()=>{throw g});throw i}}finally{e.__root=r,delete e.currentTarget,E(L),T(f)}}}const de=["touchstart","touchmove"];function _e(e){return de.includes(e)}function we(e,r){var a=r==null?"":typeof r=="object"?r+"":r;a!==(e.__t??(e.__t=e.nodeValue))&&(e.__t=a,e.nodeValue=a==null?"":a+"")}function ve(e,r){return q(e,r)}function Ee(e,r){R(),r.intro=r.intro??!1;const a=r.target,n=S,s=h;try{for(var t=C(a);t&&(t.nodeType!==8||t.data!==z);)t=F(t);if(!t)throw m;y(!0),D(t),J();const o=q(e,{...r,anchor:t});if(h===null||h.nodeType!==8||h.data!==G)throw K(),m;return y(!1),o}catch(o){if(o===m)return r.recover===!1&&Q(),R(),U(a),y(!1),ve(e,r);throw o}finally{y(n),D(s)}}const b=new Map;function q(e,{target:r,anchor:a,props:n={},events:s,context:t,intro:o=!0}){R();var v=new Set,l=f=>{for(var i=0;i<f.length;i++){var u=f[i];if(!v.has(u)){v.add(u);var c=_e(u);r.addEventListener(u,p,{passive:c});var _=b.get(u);_===void 0?(document.addEventListener(u,p,{passive:c}),b.set(u,1)):b.set(u,_+1)}}};l(X(ce)),M.add(l);var d=void 0,L=Z(()=>{var f=a??r.appendChild(x());return ee(()=>{if(t){re({});var i=ae;i.c=t}s&&(n.$$events=s),S&&oe(f,null),d=e(f,n)||{},S&&(O.nodes_end=h),t&&te()}),()=>{var c;for(var i of v){r.removeEventListener(i,p);var u=b.get(i);--u===0?(document.removeEventListener(i,p),b.delete(i)):b.set(i,u)}M.delete(l),A.delete(d),f!==a&&((c=f.parentNode)==null||c.removeChild(f))}});return A.set(d,L),d}let A=new WeakMap;function Te(e){const r=A.get(e);r&&r()}function be(e,r,a){if(e==null)return r(void 0),N;const n=ne(()=>e.subscribe(r,a));return n.unsubscribe?()=>n.unsubscribe():n}let w=!1;function Le(e,r,a){const n=a[r]??(a[r]={store:null,source:se(void 0),unsubscribe:N});if(n.store!==e)if(n.unsubscribe(),n.store=e??null,e==null)n.source.v=void 0,n.unsubscribe=N;else{var s=!0;n.unsubscribe=be(e,t=>{s?n.source.v=t:ue(n.source,t)}),s=!1}return ie(n.source)}function me(e,r){return e.set(r),r}function Re(){const e={};return V(()=>{for(var r in e)e[r].unsubscribe()}),e}function Se(e){var r=w;try{return w=!1,[e(),w]}finally{w=r}}export{we as a,Le as b,Se as c,fe as d,ye as e,me as f,Ee as h,ge as l,ve as m,Re as s,Te as u};
