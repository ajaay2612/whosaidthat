import{S as T,B as V,C as J,D as P,E as Q,F as m,U as c,G as N,g as h,A as F,H as W,I as X,J as k,K as p,L as Y,M as U,N as G,o as x,q as ee,O as ae,P as ne,Q as re,z as te,R as H,y as fe,V as ie,W as se,X as ue,Y as le,b as q,Z as _e,_ as ve,$ as K,a0 as de,a1 as z,a2 as ce,a3 as oe,a4 as ye,f as Z,a5 as be,a6 as ge,a7 as me,c as C,a as he}from"./runtime.CXJ1GHQm.js";import{c as Pe}from"./store.CammLAri.js";function I(n,i=null,b){if(typeof n!="object"||n===null||T in n)return n;const g=X(n);if(g!==V&&g!==J)return n;var s=new Map,_=k(n),v=P(0);_&&s.set("length",P(n.length));var d;return new Proxy(n,{defineProperty(f,e,a){(!("value"in a)||a.configurable===!1||a.enumerable===!1||a.writable===!1)&&Q();var r=s.get(e);return r===void 0?(r=P(a.value),s.set(e,r)):m(r,I(a.value,d)),!0},deleteProperty(f,e){var a=s.get(e);if(a===void 0)e in f&&s.set(e,P(c));else{if(_&&typeof e=="string"){var r=s.get("length"),t=Number(e);Number.isInteger(t)&&t<r.v&&m(r,t)}m(a,c),$(v)}return!0},get(f,e,a){var o;if(e===T)return n;var r=s.get(e),t=e in f;if(r===void 0&&(!t||(o=N(f,e))!=null&&o.writable)&&(r=P(I(t?f[e]:c,d)),s.set(e,r)),r!==void 0){var u=h(r);return u===c?void 0:u}return Reflect.get(f,e,a)},getOwnPropertyDescriptor(f,e){var a=Reflect.getOwnPropertyDescriptor(f,e);if(a&&"value"in a){var r=s.get(e);r&&(a.value=h(r))}else if(a===void 0){var t=s.get(e),u=t==null?void 0:t.v;if(t!==void 0&&u!==c)return{enumerable:!0,configurable:!0,value:u,writable:!0}}return a},has(f,e){var u;if(e===T)return!0;var a=s.get(e),r=a!==void 0&&a.v!==c||Reflect.has(f,e);if(a!==void 0||F!==null&&(!r||(u=N(f,e))!=null&&u.writable)){a===void 0&&(a=P(r?I(f[e],d):c),s.set(e,a));var t=h(a);if(t===c)return!1}return r},set(f,e,a,r){var R;var t=s.get(e),u=e in f;if(_&&e==="length")for(var o=a;o<t.v;o+=1){var E=s.get(o+"");E!==void 0?m(E,c):o in f&&(E=P(c),s.set(o+"",E))}t===void 0?(!u||(R=N(f,e))!=null&&R.writable)&&(t=P(void 0),m(t,I(a,d)),s.set(e,t)):(u=t.v!==c,m(t,I(a,d)));var y=Reflect.getOwnPropertyDescriptor(f,e);if(y!=null&&y.set&&y.set.call(r,a),!u){if(_&&typeof e=="string"){var S=s.get("length"),O=Number(e);Number.isInteger(O)&&O>=S.v&&m(S,O+1)}$(v)}return!0},ownKeys(f){h(v);var e=Reflect.ownKeys(f).filter(t=>{var u=s.get(t);return u===void 0||u.v!==c});for(var[a,r]of s)r.v!==c&&!(a in f)&&e.push(a);return e},setPrototypeOf(){W()}})}function $(n,i=1){m(n,n.v+i)}function Ee(n){throw new Error("lifecycle_outside_component")}function Se(n,i,b,g=null,s=!1){x&&ee();var _=n,v=null,d=null,f=null,e=s?ae:0;p(()=>{if(f===(f=!!i()))return;let a=!1;if(x){const r=_.data===ne;f===r&&(_=re(),te(_),H(!1),a=!0)}f?(v?Y(v):v=U(()=>b(_)),d&&G(d,()=>{d=null})):(d?Y(d):g&&(d=U(()=>g(_))),v&&G(v,()=>{v=null})),a&&H(!0)},e),x&&(_=fe)}function j(n){for(var i=F,b=F;i!==null&&!(i.f&(_e|ve));)i=i.parent;try{return K(i),n()}finally{K(b)}}function Oe(n,i,b,g){var M;var s=(b&de)!==0,_=!z||(b&ce)!==0,v=(b&oe)!==0,d=(b&ge)!==0,f=!1,e;v?[e,f]=Pe(()=>n[i]):e=n[i];var a=T in n||ye in n,r=((M=N(n,i))==null?void 0:M.set)??(a&&v&&i in n?l=>n[i]=l:void 0),t=g,u=!0,o=!1,E=()=>(o=!0,u&&(u=!1,d?t=q(g):t=g),t);e===void 0&&g!==void 0&&(r&&_&&ie(),e=E(),r&&r(e));var y;if(_)y=()=>{var l=n[i];return l===void 0?E():(u=!0,o=!1,l)};else{var S=j(()=>(s?Z:be)(()=>n[i]));S.f|=se,y=()=>{var l=h(S);return l!==void 0&&(t=void 0),l===void 0?t:l}}if(!(b&ue))return y;if(r){var O=n.$$legacy;return function(l,w){return arguments.length>0?((!_||!w||O||f)&&r(w?y():l),l):y()}}var R=!1,B=!1,D=me(e),A=j(()=>Z(()=>{var l=y(),w=h(D);return R?(R=!1,B=!0,w):(B=!1,D.v=l)}));return s||(A.equals=le),function(l,w){if(arguments.length>0){const L=w?h(A):_&&v?I(l):l;return A.equals(L)||(R=!0,m(D,L),o&&t!==void 0&&(t=L),q(()=>h(A))),l}return h(A)}}function Ae(n){C===null&&Ee(),z&&C.l!==null?Re(C).m.push(n):he(()=>{const i=q(n);if(typeof i=="function")return i})}function Re(n){var i=n.l;return i.u??(i.u={a:[],b:[],m:[]})}export{I as a,Se as i,Ae as o,Oe as p};
