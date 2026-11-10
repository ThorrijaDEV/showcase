var Mt=Object.defineProperty;var Et=(i,e,t)=>e in i?Mt(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var y=(i,e,t)=>Et(i,typeof e!="symbol"?e+"":e,t);(function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))s(n);new MutationObserver(n=>{for(const o of n)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&s(r)}).observe(document,{childList:!0,subtree:!0});function t(n){const o={};return n.integrity&&(o.integrity=n.integrity),n.referrerPolicy&&(o.referrerPolicy=n.referrerPolicy),n.crossOrigin==="use-credentials"?o.credentials="include":n.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(n){if(n.ep)return;n.ep=!0;const o=t(n);fetch(n.href,o)}})();const ze={strong:1,near:2,mid:3,far:4,weak:5,unknown:5};function Tt(i){return i==null?null:i>=2412&&i<=2484?i===2484?14:Math.floor((i-2407)/5):i>=5e3&&i<=5900?Math.floor((i-5e3)/5):i>=5925&&i<=7125?Math.floor((i-5925)/5):null}function _t(i){const e=["·","▂","▄","▆","█"],t=[-80,-70,-60,-50];if(i==null)return e[0];let s=0;for(const n of t)i>=n&&(s+=1);return e[s]}function oe(i,e){if(e<=0)return[i[0][1],i[0][2],i[0][3]];if(e>=1){const o=i[i.length-1];return[o[1],o[2],o[3]]}let t=i[0],s=i[i.length-1];for(const o of i){if(o[0]>=e){s=o;break}t=o}const n=s[0]===t[0]?0:(e-t[0])/(s[0]-t[0]);return[Math.round(t[1]+(s[1]-t[1])*n),Math.round(t[2]+(s[2]-t[2])*n),Math.round(t[3]+(s[3]-t[3])*n)]}function We(i){const e=Object.keys(Ce).sort(),t=Number(Me(i,0,0x50554C455454n,0)%BigInt(e.length));return e[t]}const Ce={neon:[[0,10,2,30],[.25,120,10,120],[.5,0,200,220],[.75,120,255,80],[1,250,250,200]],ocean:[[0,2,8,25],[.35,8,60,110],[.7,40,150,180],[1,220,240,245]],ember:[[0,10,5,4],[.3,90,20,10],[.6,220,70,10],[.8,255,180,40],[1,255,250,210]],forest:[[0,4,12,6],[.4,20,70,25],[.7,90,160,60],[1,240,250,170]],sunset:[[0,20,5,40],[.35,130,20,90],[.6,230,70,60],[.85,255,190,90],[1,255,250,230]],ice:[[0,4,8,20],[.35,20,60,110],[.65,110,180,230],[1,235,250,255]],toxic:[[0,5,10,5],[.3,30,90,20],[.6,120,220,40],[.85,220,255,110],[1,250,255,220]],mono:[[0,5,5,5],[.5,130,130,130],[1,255,255,255]]};function It(i,e,t=.4){return i===null?e:t*e+(1-t)*i}const Nt=/^[0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5}$/;function Oe(i){if(!Nt.test(i))throw new Error(`invalid MAC address: ${i}`);return i.toLowerCase()}function rt(i){return Oe(i)}const Rt=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];function at(i){let e=i.length,t=e+1;for(;t%64!==56;)t++;t+=8;const s=new Uint8Array(t);s.set(i),s[e]=128;const n=e*8;for(let u=0;u<8;u++)s[t-8+u]=n>>>56-u*8&255;let o=1779033703,r=3144134277,a=1013904242,l=2773480762,d=1359893119,c=2600822924,f=528734635,b=1541459225;for(let u=0;u<s.length;u+=64){const g=new Int32Array(64);for(let S=0;S<16;S++)g[S]=s[u+S*4]<<24|s[u+S*4+1]<<16|s[u+S*4+2]<<8|s[u+S*4+3];for(let S=16;S<64;S++){const E=(g[S-15]>>>7|g[S-15]<<25)^(g[S-15]>>>18|g[S-15]<<14)^g[S-15]>>>3,T=(g[S-2]>>>17|g[S-2]<<15)^(g[S-2]>>>19|g[S-2]<<13)^g[S-2]>>>10;g[S]=g[S-16]+E+g[S-7]+T|0}let v=o,k=r,x=a,I=l,w=d,h=c,A=f,M=b;for(let S=0;S<64;S++){const E=(w>>>6|w<<26)^(w>>>11|w<<21)^(w>>>25|w<<7),T=w&h^~w&A,N=M+E+T+Rt[S]+g[S]|0,L=(v>>>2|v<<30)^(v>>>13|v<<19)^(v>>>22|v<<10),B=v&k^v&x^k&x,$=L+B|0;M=A,A=h,h=w,w=I+N|0,I=x,x=k,k=v,v=N+$|0}o=o+v|0,r=r+k|0,a=a+x|0,l=l+I|0,d=d+w|0,c=c+h|0,f=f+A|0,b=b+M|0}const m=new Uint8Array(32),p=(u,g)=>{m[g]=u>>>24&255,m[g+1]=u>>>16&255,m[g+2]=u>>>8&255,m[g+3]=u&255};return p(o,0),p(r,4),p(a,8),p(l,12),p(d,16),p(c,20),p(f,24),p(b,28),m}function he(i,e=12){const t=new TextEncoder().encode(i.toLowerCase()),s=at(t);let n="";for(const o of s)n+=o.toString(16).padStart(2,"0");return n.slice(0,e)}function zt(i){const e=at(new TextEncoder().encode(i.toLowerCase()));return Number(new DataView(e.buffer).getUint16(0,!1))/65536*360}const Ct=0x9e3779b97f4a7c15n,lt=0xbf58476d1ce4e5b9n,Lt=0x94d049bb133111ebn,V=(1n<<64n)-1n;function dt(i){let e=i&V;return e^=e>>30n&V,e=e*lt&V,e^=e>>27n&V,e=e*Lt&V,e^e>>31n&V}function Ke(i,e){const t=i*lt+e*Ct&V;return dt(t)}function $t(i,e,t){return Ke(Ke(i,e),t)}function Me(i,e,t,s){return $t(BigInt(i)&V,BigInt(e)&V,t&V)^dt(BigInt(s)&V)}function Q(i,e,t,s){return Number(Me(i,e,t,s)>>11n)*(1/Number(1n<<53n))}function ne(i,e,t,s,n,o){return n+Number(Me(i,e,t,s)%BigInt(o-n))}const Dt=/^BSS /m,Pt=/^([0-9a-fA-F]{2}(:[0-9a-fA-F]{2}){5})/,Bt=/^freq:\s*([\d.]+)/,jt=/^signal:\s*(-?[\d.]+)/,Ot=/DS Parameter set: channel (\d+)/,Ht=/^RSN:/,qt=/^WPA:/,Ft=/Authentication suites/;function Ut(i,e,t){if(i){const s=/SAE|00-0f-ac:8/.test(i),n=/PSK|00-0f-ac:2/.test(i),o=/OWE|00-0f-ac:18/.test(i);if(s)return n?"wpa2/wpa3":"wpa3-sae";if(n)return"wpa2-psk";if(o)return"owe"}return e||t?"wpa":"open"}function Gt(i){var s;const e=[],t=i.split(Dt);for(let n=1;n<t.length;n++){const r=t[n].split(`
`),a=Pt.exec(r[0]);if(!a)continue;let l=null,d=null,c=null,f=null,b=!1,m=!1,p="";for(let g=1;g<r.length;g++){const v=r[g].trim();if(v.startsWith("freq:")){const k=Bt.exec(v);k&&(l=parseFloat(k[1]))}else if(v.startsWith("signal:")){const k=jt.exec(v);k&&(d=parseFloat(k[1]))}else if(v.startsWith("SSID:"))c=v.slice(5).trim()||null;else if(Ot.test(v)){const k=/channel (\d+)/.exec(v);k&&(f=parseInt(k[1],10))}else Ht.test(v)?(b=!0,m=!1):qt.test(v)?(b=!1,m=!0):b&&Ft.test(v)&&(p=((s=v.split(":",1)[1])==null?void 0:s.trim())??"")}l!==null&&f===null&&(f=Tt(l));const u=Ut(p,b,m);try{e.push({bssid:rt(a[1]),ssid:c,channel:f,frequency:l,signal:d===null?null:Math.round(d),security:u,backend:"iw",observedAt:0})}catch{continue}}return e}function Wt(i){const e=[];let t="",s=0;for(;s<i.length;){const n=i[s];if(n==="\\"&&s+1<i.length){t+=i[s+1],s+=2;continue}n===":"?(e.push(t),t=""):t+=n,s++}return e.push(t),e}function Kt(i){const e=[];for(const t of i.split(`
`)){if(!t.trim())continue;const s=Wt(t);if(s.length<6)continue;const[n,o,r,a,l,d]=s;try{e.push({bssid:rt(o),ssid:n||null,channel:/^\d+$/.test(r)?parseInt(r,10):null,frequency:/^\d+$/.test(a)?parseInt(a,10):null,signal:/^-?\d+$/.test(l)?parseInt(l,10):null,security:d?d.toLowerCase():null,backend:"nmcli",observedAt:0})}catch{continue}}return e}function Vt(i){const e=new Map;for(const t of i){const s=e.get(t.bssid);s?t.signal!==null&&(s.signal===null||t.signal>s.signal)&&e.set(t.bssid,{...t}):e.set(t.bssid,{...t})}return Array.from(e.values())}function Qt(i){const e=new Map;for(const t of i){let s=e.get(t.bssid);s||(s={bssid:t.bssid,ssid:t.ssid,firstSeen:t.observedAt,lastSeen:t.observedAt,timesSeen:0,avgSignal:null,bestSignal:null,lastChannel:t.channel},e.set(t.bssid,s)),s.timesSeen+=1,s.lastSeen=Math.max(s.lastSeen,t.observedAt),s.firstSeen=Math.min(s.firstSeen,t.observedAt),t.channel!==null&&(s.lastChannel=t.channel),t.signal!==null&&((s.bestSignal===null||t.signal>s.bestSignal)&&(s.bestSignal=t.signal),s.avgSignal=s.avgSignal===null?t.signal:Math.round((s.avgSignal*(s.timesSeen-1)+t.signal)/s.timesSeen)),t.ssid&&(s.ssid=t.ssid)}return Array.from(e.values()).sort((t,s)=>s.lastSeen-t.lastSeen)}function Jt(i){const e=new Map;for(const s of i){if(s.channel===null)continue;let n=e.get(s.channel);n||(n={count:0,signalSum:0,signalN:0},e.set(s.channel,n)),n.count+=1,s.signal!==null&&(n.signalSum+=s.signal,n.signalN+=1)}const t=[];for(const[s,n]of e)t.push({channel:s,count:n.count,avgSignal:n.signalN>0?Math.round(n.signalSum/n.signalN):null});return t.sort((s,n)=>n.count-s.count||s.channel-n.channel),t}const ce=["·","▂","▄","▆","█"];function Yt(i){return _t(i)}function Xt(i){const e=[60,120,300,600,900,1800,3600,7200,14400,21600,43200,86400];for(const t of e)if(i<=t)return t;return 86400}function Zt(i){return new Date(i*1e3).toISOString().substr(11,5)}function es(i,e=100,t=22,s=null,n=null,o=null,r=null){let a=i;if(o!==null&&(a=a.filter(h=>h.observedAt>=o)),r!==null&&(a=a.filter(h=>h.observedAt<=r)),a.length===0)return null;const l=Math.min(...a.map(h=>h.observedAt)),d=Math.max(...a.map(h=>h.observedAt)),c=Math.max(d-l,1);e=Math.max(20,Math.min(e,120));const f=s??Xt(c/e),b=Math.min(e,Math.floor(c/f)+1),m=new Map;for(const h of a){if(h.signal===null)continue;let A=m.get(h.bssid);A||(A={label:h.ssid??h.bssid,pts:[]},m.set(h.bssid,A)),A.pts.push({ts:h.observedAt,sig:h.signal})}if(m.size===0)return null;let p=Array.from(m.entries()).sort((h,A)=>A[1].pts.length-h[1].pts.length||h[0].localeCompare(A[0]));n!==null&&(p=p.slice(0,n)),p.sort((h,A)=>Math.min(...h[1].pts.map(M=>M.ts))-Math.min(...A[1].pts.map(M=>M.ts)));const u=l-l%f,g=h=>Math.min(Math.floor((h-u)/f),b-1),v=[];for(const[h,{label:A,pts:M}]of p){const S=[],E=new Map;for(const T of M){const N=g(T.ts);E.has(N)||E.set(N,[]),E.get(N).push(T.sig)}for(let T=0;T<b;T++){const N=E.get(T);S.push({column:T,glyph:N?Yt(Math.round(N.reduce((L,B)=>L+B,0)/N.length)):"·",avgSignal:N?Math.round(N.reduce((L,B)=>L+B,0)/N.length):null,observed:!!N})}v.push({bssid:h,label:A.slice(0,t-1),cells:S})}const k=[" ".repeat(t)];let x=null;for(let h=0;h<b;h++){const A=u+h*f;(h%5===0||h===b-1)&&x!==A?(k.push(Zt(A)),x=A):k.push(" ")}const I=`${ce[4]}≥-50 ${ce[3]}≥-60 ${ce[2]}≥-70 ${ce[1]}≥-80 ${ce[0]}weaker`,w=`buckets: ${f}s · glyphs: ${I} · blank = not observed`;return{bucketSeconds:f,startEpoch:u,nCols:b,rows:v,headerLabels:k,footer:w}}function ts(i,e=40){if(i.length===0)return null;const t=Math.min(...i),s=Math.max(...i),n=Math.max(s-t,1),o="▁▂▃▄▅▆▇█";let r;if(i.length<=e)r=[...i];else{const l=Math.floor(i.length/e);r=[];for(let d=0;d<i.length&&r.length<e;d+=l)r.push(i[d])}const a=r.map(l=>{const d=(l-t)/n,c=Math.min(7,Math.floor(d*8));return o[c]}).join("");return{values:[...i],width:e,rendered:a,min:t,max:s}}function ss(i,e=40){if(i.length===0)return null;const t=Math.max(1,...i.map(o=>o.value)),s=Math.max(...i.map(o=>o.label.length)),n=[];for(const{label:o,value:r,suffix:a}of i){const l=r===0?0:Math.max(1,Math.round(r/t*e)),d="█".repeat(l);n.push(`${o.padStart(s)}  ${d} ${r}${a}`)}return{items:[...i],maxLabel:s,maxValue:t,width:e,rendered:n.join(`
`)}}function is(i,e=!1){const t=i.map(s=>({observed_at:s.observedAt,address:e?he(s.bssid):s.bssid,name:s.ssid??"",rssi:s.signal,backend:s.backend}));return JSON.stringify(t,null,2)}function ns(i,e=!1){const t=`observed_at,address,name,rssi,backend
`;if(i.length===0)return t;const s=[t];for(const n of i){const o=e?he(n.bssid):n.bssid,r=(n.ssid??"").replace(/"/g,'""');s.push(`${n.observedAt},"${o}","${r}",${n.signal??""},${n.backend}`)}return s.join(`
`)}class os{constructor(){y(this,"name","wifi-time-machine");y(this,"version","1.0.0");y(this,"fidelity",{level:4,summary:"Direct algorithmic reproduction of WTM parsing, channel mapping, aggregation and rendering; I/O boundary (hardware scan, SQLite, terminal size) adapted to deterministic inputs.",details:["Reproduces parse_iw_dump (BSS block parsing, freq/signal/SSID/DS-channel extraction, AKM-based security inference).","Reproduces parse_nmcli (escaped colon-split tokenizer, unescape of \\: and \\\\).","Reproduces BSSID dedup (keep strongest signal per BSSID).","Reproduces freq_to_channel for 2.4 GHz, 5 GHz and 6 GHz bands.","Reproduces timeline heatmap (networks × time buckets, signal→glyph tiers, blank=absent).","Reproduces sparkline and horizontal bar-chart renderers.","Reproduces SHA-256-truncated BSSID sanitization for export.","Adapted: no iw/nmcli subprocess; synthetic scan fixtures are the input.","Adapted: in-memory record store instead of SQLite (same aggregate semantics)."]});y(this,"observations",[])}validate(e){const t=e;if(!t||typeof t!="object")throw new Error("WifiTimeMachineModel: input must be an object");const s=typeof t.iwDump=="string"&&t.iwDump.length>0,n=typeof t.nmcliText=="string"&&t.nmcliText.length>0;if(!s&&!n)throw new Error("WifiTimeMachineModel: provide iwDump and/or nmcliText");return{iwDump:t.iwDump,nmcliText:t.nmcliText,observedAt:t.observedAt??Math.floor(Date.now()/1e3),backend:t.backend??"demo",since:t.since??void 0,until:t.until??void 0,bucketSeconds:t.bucketSeconds??void 0,width:t.width??100,labelWidth:t.labelWidth??22,topN:t.topN??void 0,sanitize:!!t.sanitize}}run(e){const t=e.observedAt??Math.floor(Date.now()/1e3),s=[];if(e.iwDump){const w=Gt(e.iwDump);for(const h of w)s.push({...h,observedAt:t,backend:e.backend??"iw"})}if(e.nmcliText){const w=Kt(e.nmcliText);for(const h of w)s.push({...h,observedAt:t,backend:e.backend??"nmcli"})}const n={name:"raw observations",description:"Observations parsed from iw dump / nmcli fixtures (pre-dedup).",data:{count:s.length,sample:s.slice(0,5)}},o=Vt(s),r={name:"deduplication",description:"Duplicate BSS blocks for one AP are merged; strongest signal kept (parser must dedupe by BSSID).",data:{removed:s.length-o.length,kept:o.length}},a=Qt(o),l={name:"network aggregation",description:"Per-BSSID first/last seen, times seen, average/best signal, last channel.",data:a.slice(0,10)},d=Jt(o),c={name:"channel activity",description:"Observation count and average signal per 802.11 channel.",data:d},f=es(o,e.width,e.labelWidth,e.bucketSeconds,e.topN,e.since,e.until),b={name:"timeline heatmap",description:"Networks × time buckets; cell glyph = average signal in bucket; blank = not observed.",data:f?{nCols:f.nCols,nRows:f.rows.length,bucketSeconds:f.bucketSeconds}:null};let m=null;const p={name:"signal sparkline",description:"Per-network signal-over-time sparkline (block glyphs).",data:null};if(a.length>0){const w=a[0],h=o.filter(A=>A.bssid===w.bssid&&A.signal!==null).sort((A,M)=>A.observedAt-M.observedAt).map(A=>A.signal);if(h.length>0){const A=ts(h);A&&(m=A,p.data={network:w.ssid??w.bssid,values:h,rendered:A.rendered})}}let u=null;const g={name:"channel bar chart",description:"Horizontal bars: observation count per channel with average signal suffix.",data:null};if(d.length>0){const w=d.slice(0,10).map(h=>({label:`ch ${h.channel}`,value:h.count,suffix:` obs · avg ${h.avgSignal??"-"} dBm`}));u=ss(w,e.width??40),g.data=u}const v=[n,r,l,c,b,p,g],k=o.length>0?Math.min(...o.map(w=>w.observedAt)):null,x=o.length>0?Math.max(...o.map(w=>w.observedAt)):null,I={observations:o,networks:a,channelStats:d,timeline:f,sparkline:m,barChart:u,exportJson:is(o,e.sanitize),exportCsv:ns(o,e.sanitize),stats:{nNetworks:a.length,nObservations:o.length,firstObservation:k,lastObservation:x}};return{input:e,stages:v,final:I,determinism:{seed:null,reproducible:!0,note:"Fully deterministic: same fixtures → same parsed observations, aggregates, heatmap and charts. No randomness, no hardware, no clock."},complexity:"Parsing O(n) over scan text; aggregation O(n); timeline O(n × buckets); overall linear in the number of observations.",equations:["channel = floor((freq − 5000) / 5)  [5 GHz]","channel = floor((freq − 5925) / 5)  [6 GHz]","channel = floor((freq − 2407) / 5)  [2.4 GHz, except 2484 → 14]","avg_signal = Σ signal_i / n","glyph_tier = count of thresholds (−80, −70, −60, −50) exceeded by signal"]}}reset(){this.observations=[]}}const rs=[{name:"Smart-Bulb",baseRssi:-52,jitter:.6,life:null},{name:"Headphones",baseRssi:-38,jitter:.3,life:90},{name:"Fitness-Tracker",baseRssi:-64,jitter:.5,life:160},{name:"Beacon-01",baseRssi:-78,jitter:.4,life:null},{name:"Laptop",baseRssi:-44,jitter:.4,life:null},{name:"Chip-Tag",baseRssi:-88,jitter:.3,life:60},{name:"Speaker",baseRssi:-60,jitter:.5,life:null},{name:"Unknown-Dongle",baseRssi:-72,jitter:.4,life:120}];function as(i){const e=ls("SHA-256",new TextEncoder().encode(i));let t="";for(let s=0;s<6;s++)t+=e[s].toString(16).padStart(2,"0");return t.match(/.{2}/g).join(":")}function ls(i,e){var t;return typeof crypto<"u"&&((t=crypto.subtle)!=null&&t.digestSync)?crypto.subtle.digestSync(i,e):ds(e)}function ds(i){const e=[1116352408,1899447441,3049323471,3921009573,961987163,1508970993,2453635748,2870763221,3624381080,310598401,607225278,1426881987,1925078388,2162078206,2614888103,3248222580,3835390401,4022224774,264347078,604807628,770255983,1249150122,1555081692,1996064986,2554220882,2821834349,2952996808,3210313671,3336571891,3584528711,113926993,338241895,666307205,773529912,1294757372,1396182291,1695183700,1986661051,2177026350,2456956037,2730485921,2820302411,3259730800,3345764771,3516065817,3600352804,4094571909,275423344,430227734,506948616,659060556,883997877,958139571,1322822218,1537002063,1747873779,1955562222,2024104815,2227730452,2361852424,2428436474,2756734187,3204031479,3329325298];let t=i.length,s=t+1;for(;s%64!==56;)s++;s+=8;const n=new Uint8Array(s);n.set(i),n[t]=128;const o=t*8;for(let g=0;g<8;g++)n[s-8+g]=o>>>56-g*8&255;let r=1779033703,a=3144134277,l=1013904242,d=2773480762,c=1359893119,f=2600822924,b=528734635,m=1541459225;for(let g=0;g<n.length;g+=64){const v=new Int32Array(64);for(let E=0;E<16;E++)v[E]=n[g+E*4]<<24|n[g+E*4+1]<<16|n[g+E*4+2]<<8|n[g+E*4+3];for(let E=16;E<64;E++){const T=(v[E-15]>>>7|v[E-15]<<25)^(v[E-15]>>>18|v[E-15]<<14)^v[E-15]>>>3,N=(v[E-2]>>>17|v[E-2]<<15)^(v[E-2]>>>19|v[E-2]<<13)^v[E-2]>>>10;v[E]=v[E-16]+T+v[E-7]+N|0}let k=r,x=a,I=l,w=d,h=c,A=f,M=b,S=m;for(let E=0;E<64;E++){const T=(h>>>6|h<<26)^(h>>>11|h<<21)^(h>>>25|h<<7),N=h&A^~h&M,L=S+T+N+e[E]+v[E]|0,B=(k>>>2|k<<30)^(k>>>13|k<<19)^(k>>>22|k<<10),$=k&x^k&I^x&I,G=B+$|0;S=M,M=A,A=h,h=w+L|0,w=I,I=x,x=k,k=L+G|0}r=r+k|0,a=a+x|0,l=l+I|0,d=d+w|0,c=c+h|0,f=f+A|0,b=b+M|0,m=m+S|0}const p=new Uint8Array(32),u=(g,v)=>{p[v]=g>>>24&255,p[v+1]=g>>>16&255,p[v+2]=g>>>8&255,p[v+3]=g&255};return u(r,0),u(a,4),u(l,8),u(d,12),u(c,16),u(f,20),u(b,24),u(m,28),p}function cs(i,e,t){let s=i>>>0|1;const n=()=>(s=s*1664525+1013904223>>>0,s/4294967296),o=[];for(let r=e;r<=e+t;r++)for(const a of rs){const l=as(a.name);if(!(a.life===null||(r-e)%a.life<=a.life-20))continue;const c=Math.round(a.baseRssi+n()*a.jitter*40-a.jitter*20),f=Math.max(-95,Math.min(-25,c));o.push({address:l,name:a.name,rssi:f,seenAt:r,backend:"demo",mfgPresent:n()<.5,serviceUuids:[]})}return o}function ct(i){return i==null?"unknown":i>=-40?"strong":i>=-55?"near":i>=-70?"mid":i>=-85?"far":"weak"}function us(i){return`D-${he(i,12).slice(-4)}`}class ps{constructor(e,t){y(this,"address");y(this,"name");y(this,"rssi");y(this,"rawRssi");y(this,"appearedAt");y(this,"lastSeen");y(this,"timesSeen");y(this,"state");y(this,"trails");this.address=e,this.name=t,this.rssi=null,this.rawRssi=null,this.appearedAt=null,this.lastSeen=null,this.timesSeen=0,this.state="appeared",this.trails=[]}get angle(){return zt(this.address)}observe(e,t,s){this.appearedAt===null&&(this.appearedAt=t),this.state=this.lastSeen!==null?"active":"appeared",this.lastSeen=t,this.timesSeen+=1,s&&(this.name=s),this.rawRssi=e,e!==null&&(this.rssi=this.rssi===null?e:It(this.rssi,e,.4));const n=ct(e);this.trails.push({seenAt:t,angle:this.angle,band:n}),this.trails=this.trails.slice(-8)}advance(e){if(this.lastSeen===null)return;const t=e-this.lastSeen;t>30?this.state="disappeared":t>15?this.state!=="disappeared"&&(this.state="fading"):this.state==="disappeared"&&(this.state="appeared")}visible(e){return this.state!=="disappeared"&&this.lastSeen!==null&&e-this.lastSeen<=30}toModel(){return{address:this.address,name:this.name,rssi:this.rssi,rawRssi:this.rawRssi,appearedAt:this.appearedAt,lastSeen:this.lastSeen,timesSeen:this.timesSeen,state:this.state,trails:this.trails.slice(0,-1).map(e=>({seenAt:e.seenAt,angle:e.angle,band:e.band}))}}}class Ne{constructor(){y(this,"devices",new Map)}ingest(e){let t=this.devices.get(e.address);return t||(t=new ps(e.address,e.name),this.devices.set(e.address,t)),t.observe(e.rssi,e.seenAt,e.name),e.address}advance(e){for(const t of this.devices.values())t.advance(e)}labelFor(e){const t=this.devices.get(e);return t&&t.name?t.name:us(e)}snapshot(e){this.advance(e);const t=[];for(const s of this.devices.values())s.visible(e)&&t.push({address:s.address,label:this.labelFor(s.address),angle:s.angle,band:ct(s.rawRssi),state:s.state,trails:s.trails.map(n=>({angle:n.angle,band:n.band})),jitter:s.angle/360-.5,visible:!0});return t.sort((s,n)=>ze[s.band]-ze[n.band]),t}}const fs="·",hs="·",Ve="+",ms="·";function ge(i,e,t,s){const n=i*Math.PI/180,o=t+e*2*Math.cos(n),r=s-e*Math.sin(n);return{row:Math.round(r),col:Math.round(o)}}function Qe(i,e){const s=(ze[i]-1)/5,n=1/5;return(s+n*.5)*e}function vs(i,e,t,s,n=60){const o=Math.max(s,5),r=Math.max(t,11),a=Math.floor(r/2),l=Math.floor((o-1)/2);let d=Math.min(a/2,l)-1;d=Math.max(d,2);const c=[],f=(m,p,u,g,v,k=null)=>{if(!(m<0||m>=o||p<0||p>=r)){for(const x of c)if(x.row===m&&x.col===p&&!v)return;c.push({row:m,col:p,char:u,kind:g,device:k})}};for(let m=Math.max(0,a-2);m<Math.min(r,a+3);m++)f(l,m,Ve,"cross",!1);for(let m=Math.max(0,l-2);m<Math.min(o,l+3);m++)f(m,a,Ve,"cross",!1);for(let m=1;m<=5;m++){const p=m/5*d,u=Math.max(3,Math.floor(360/Math.max(12,p*2)));for(let g=0;g<360;g+=u){const{row:v,col:k}=ge(g,p,a,l);f(v,k,fs,"ring",!1)}}for(let m=0;m<Math.floor(n);m+=8){const p=e-m;for(const u of[.25,.5,.75,1]){const{row:g,col:v}=ge(p,d*u,a,l);f(g,v,hs,"sweep",!0)}}for(const m of i)for(const{angle:p,band:u}of m.trails){const{row:g,col:v}=ge(p,Qe(u,d),a,l);f(g,v,ms,"trail",!1)}for(const m of i){if(m.state==="disappeared")continue;const p=Qe(m.band,d)*(1+.18*m.jitter),{row:u,col:g}=ge(m.angle,p,a,l),v=m.label?m.label.slice(0,3):"·";f(u,g,v[0],"marker",!0,m.address);for(let k=1;k<v.length;k++)f(u,g+k,v[k],"marker",!1,m.address);f(u,g-1,"(","marker",!1,m.address)}return{cells:c,width:r,height:o,centerX:a,centerY:l,maxRadius:d,sweepAngle:e,legend:["rings: RSSI strength, NOT distance","strong≥-40 near≥-55 mid≥-70 far≥-85 weak else"]}}class gs{constructor(e,t=1,s){y(this,"observations");y(this,"speed");y(this,"replayT");y(this,"startT");y(this,"endT");y(this,"done");y(this,"cursor");if(e.length===0)throw new Error("ReplaySession: no observations to replay");this.observations=[...e].sort((n,o)=>n.seenAt-o.seenAt),this.speed=Math.max(.1,t),this.startT=this.observations[0].seenAt,this.endT=this.observations[this.observations.length-1].seenAt,this.replayT=s??this.startT,this.cursor=0,this.seek(this.replayT),this.done=this.replayT>=this.endT}get progress(){const e=Math.max(this.endT-this.startT,1);return Math.max(0,Math.min(1,(this.replayT-this.startT)/e))}advance(e,t){if(t!==void 0&&(this.speed=Math.max(.1,t)),this.done)return[];this.replayT+=e*this.speed,this.replayT>=this.endT&&(this.replayT=this.endT,this.done=!0);const s=[];for(;this.cursor<this.observations.length;){const n=this.observations[this.cursor];if(n.seenAt<=this.replayT)s.push(n),this.cursor++;else break}return s}seek(e){for(this.replayT=Math.max(this.startT,Math.min(this.endT,e)),this.cursor=0;this.cursor<this.observations.length&&this.observations[this.cursor].seenAt<this.replayT;)this.cursor++;this.done=this.replayT>=this.endT}}function bs(i,e=!1){const t=i.map(s=>({seen_at:s.seenAt,address:e?he(Oe(s.address)):s.address,name:s.name??"",rssi:s.rssi,backend:s.backend,mfg_present:s.mfgPresent}));return JSON.stringify(t,null,2)}function ys(i,e=!1){const t=`seen_at,address,name,rssi,backend,mfg_present
`;if(i.length===0)return t;const s=[t];for(const n of i){const o=e?he(Oe(n.address)):n.address;s.push(`${n.seenAt},"${o}","${n.name??""}",${n.rssi??""},${n.backend},${n.mfgPresent}`)}return s.join(`
`)}class xs{constructor(){y(this,"name","ble-radar");y(this,"version","1.0.0");y(this,"fidelity",{level:4,summary:"Direct algorithmic reproduction of the BLE Radar lifecycle state machine, EMA RSSI smoothing, band→ring mapping, hash→angle, radar frame geometry and replay cursor. I/O boundary (BLE hardware, curses, SQLite) adapted to deterministic inputs.",details:["Reproduces DeviceState observe/advance: appeared→active→fading→disappeared (ACTIVE_WINDOW=15s, GONE_WINDOW=30s).","Reproduces EMA RSSI smoothing (alpha=0.4).","Reproduces rssi_band: strong≥-40, near≥-55, mid≥-70, far≥-85, weak; documented as strength bands, NOT distance.","Reproduces stable_angle from SHA-256(address) — visual convention, not bearing.","Reproduces RadarEngine ingest/advance/snapshot and label/pseudonym logic.","Reproduces renderRadarFrame geometry: crosshair, rings, sweep+trail, markers with jitter, history trails (aspect-corrected polar coordinates).","Reproduces ReplaySession time-cursor with seek/speed/progress.","Reproduces SHA-256-truncated address sanitization for export.","Adapted: no bleak/BlueZ; observations are synthetic or replay fixtures.","Adapted: curses rendering replaced by geometry cell model for canvas UI."]});y(this,"engine",new Ne);y(this,"replay",null)}validate(e){const t=e;if(!t||typeof t!="object")throw new Error("BleRadarModel: input must be an object");const s=Array.isArray(t.observations)?t.observations:[];for(const n of s){if(typeof n.address!="string")throw new Error("BleRadarModel: each observation needs address");if(n.seenAt===void 0||n.seenAt===null)throw new Error("BleRadarModel: each observation needs seenAt")}return{observations:s.map(n=>({address:n.address,name:n.name??null,rssi:n.rssi??null,seenAt:n.seenAt,backend:n.backend??"demo",mfgPresent:!!n.mfgPresent,serviceUuids:n.serviceUuids??[]})),now:typeof t.now=="number"?t.now:1e9,demoSeconds:t.demoSeconds??void 0,demoSeed:t.demoSeed??7,width:t.width??60,height:t.height??24,sweepAngle:typeof t.sweepAngle=="number"?t.sweepAngle:0,speed:t.speed??1,seekTo:t.seekTo??void 0,sanitize:!!t.sanitize}}run(e){const t=e.now,s=new Ne;let n=[...e.observations];const o={name:"input observations",description:"Raw BLE observations ingested into the radar engine.",data:{count:n.length,sample:n.slice(0,3)}},r=e.demoSeconds??0;if(n.length===0&&r>0){const x=t;n=cs(e.demoSeed??7,x,r)}for(const x of n)s.ingest(x);const a={name:"device lifecycle",description:"Each observation advances its device's state machine: appeared→active→fading→disappeared (15s/30s windows). EMA RSSI smoothing applied (alpha=0.4).",data:{deviceCount:s.devices.size}},l=s.snapshot(t),d={name:"radar snapshot",description:"Visible devices converted to renderer input (angle, band, trails, jitter), sorted strongest-first.",data:l.map(x=>({address:x.address,label:x.label,band:x.band,state:x.state}))},c=e.sweepAngle??0,f=vs(l,c,e.width??60,e.height??24),b={name:"radar frame",description:"Deterministic cell grid: crosshair, concentric RSSI-strength rings, sweep line with trail, device markers, history trails.",data:{nCells:f.cells.length,width:f.width,height:f.height}},m={appeared:0,active:0,fading:0,disappeared:0};for(const x of l)x.state==="appeared"?m.appeared++:x.state==="active"?m.active++:x.state==="fading"?m.fading++:x.state==="disappeared"&&m.disappeared++;const p={name:"lifecycle summary",description:"Count of visible devices in each lifecycle state.",data:m};let u=null;const g={name:"replay session",description:"Time-cursor replays recorded observations into the same engine at configurable speed, with seek support.",data:null};n.length>0&&(this.replay=new gs(n,e.speed,e.seekTo),u={startT:this.replay.startT,endT:this.replay.endT,replayT:this.replay.replayT,progress:this.replay.progress,done:this.replay.done},g.data=u);const v=[o,a,d,b,p,g],k={devices:l.map(x=>{const I=s.devices.get(x.address);return I?I.toModel():{address:x.address,name:x.label,rssi:null,rawRssi:null,appearedAt:null,lastSeen:null,timesSeen:0,state:x.state,trails:x.trails.map(w=>({seenAt:0,angle:w.angle,band:w.band}))}}),snapshot:l,frame:f,lifecycleSummary:m,exportJson:bs(n,e.sanitize),exportCsv:ys(n,e.sanitize),replay:u};return{input:e,stages:v,final:k,determinism:{seed:e.demoSeed??null,reproducible:!0,note:"Fully deterministic: same observations + clock → same device states, snapshot, frame geometry and replay progress. Demo mode uses seed "+(e.demoSeed??7)+"."},complexity:"Ingestion O(n) over observations; snapshot O(d) over devices; frame O(cells + devices × trails). Linear in input size.",equations:["angle = SHA-256(address)[0:2] / 65536 × 360°","rssi_ema = 0.6 × prev + 0.4 × raw","band = strong(≥−40) / near(≥−55) / mid(≥−70) / far(≥−85) / weak","ring_radius = ((ring−1)/5 + 0.5/5) × max_radius","x = cx + radius × 2 × cos(angle); y = cy − radius × sin(angle)","fading if silence > 15s; disappeared if silence > 30s"]}}reset(){this.engine=new Ne,this.replay=null}}function ws(i,e,t,s,n){if(i===null||t<=0||s<=0||n<=0)return 0;const o=e-i;return o<0?0:o/(t*s*n)*100}function Ss(i,e){return Math.max(0,i)+Math.max(0,e)}const ks=2,As=5,Ms=.5,Je=50,Ye=30,Es=512;class Ts{constructor(e=100,t=1){y(this,"processes",new Map);y(this,"history",[]);y(this,"clkTick");y(this,"ncores");y(this,"tickIndex",0);y(this,"btime",0);y(this,"systemCpu",0);y(this,"systemRam",0);y(this,"load1",0);y(this,"prevSysBusy",null);y(this,"prevSysTotal",null);y(this,"graveyard",new Map);this.clkTick=e,this.ncores=t}update(e){const t={births:[],deaths:[],spikes:[],orphans:[],cpuPct:0,ramPct:0,alive:0},s=new Set,n=e.wallTime??this.tickIndex,o=e.intervalSec??.2;for(const r of e.snapshots){s.add(r.pid);let a=this.processes.get(r.pid);!a||a.starttime!==r.starttime?(a&&this.evict(a,t),a=this.spawn(r,t),this.processes.set(r.pid,a)):this.observe(a,r),this.applyCpu(a,r,o,t),this.applyMemory(a,r)}for(const r of[...this.processes.keys()]){const a=this.processes.get(r);if(s.has(r)){if(a.lifecycle==="new"){if(this.tickIndex-a.firstSeen<ks)continue;a.lifecycle=this.nextActiveIdle(a)}else a.lifecycle==="dying"?a.lifecycle=this.nextActiveIdle(a):a.lifecycle=this.nextActiveIdle(a);continue}if(a.lifecycle==="dying"){this.tickIndex-(a.dyingSince??this.tickIndex)+1>=As&&this.evict(a,t);continue}a.lifecycle="dying",a.dyingSince=this.tickIndex}return this.systemMetrics(e.system,t),this.buildTree(t),this.historyTick(n,t),this.tickIndex+=1,t}spawn(e,t){const s={pid:e.pid,starttime:e.starttime,comm:e.comm,lifecycle:"new",state:e.state,ppid:e.ppid,prevPpid:null,utime:e.utime,stime:e.stime,prevCpuTicks:null,cpuPct:0,rss:e.rss,vsize:e.vsize,numThreads:e.numThreads,user:e.user??null,firstSeen:this.tickIndex,lastSeen:this.tickIndex,dyingSince:null,spike:!1,orphan:!1,children:[],rssRing:[],cpuRing:[]};return t.births.push({pid:s.pid,comm:s.comm}),s}evict(e,t){for(const s of e.children){const n=this.processes.get(s);n&&(n.orphan=!0,t.orphans.push({pid:s,comm:n.comm}))}for(this.graveyard.set(e.pid,e.ppid);this.graveyard.size>Es;){const s=this.graveyard.keys().next().value;s!==void 0&&this.graveyard.delete(s)}t.deaths.push({pid:e.pid,comm:e.comm}),this.processes.delete(e.pid)}observe(e,t){e.comm=t.comm,e.state=t.state,e.ppid=t.ppid,e.utime=t.utime,e.stime=t.stime,e.numThreads=t.numThreads,e.vsize=t.vsize,e.rss=t.rss,e.lastSeen=this.tickIndex,e.lifecycle==="dying"&&(e.lifecycle="active",e.dyingSince=null)}applyCpu(e,t,s,n){const o=Ss(t.utime,t.stime),r=ws(e.prevCpuTicks,o,s,this.clkTick,this.ncores);e.prevCpuTicks=o,e.cpuPct=r,e.cpuRing.push(r),e.cpuRing.length>Ye&&e.cpuRing.shift(),r>=Je&&!e.spike?(e.spike=!0,n.spikes.push({pid:e.pid,comm:e.comm})):r<Je&&(e.spike=!1)}applyMemory(e,t){e.rss=t.rss,e.rssRing.push(t.rss),e.rssRing.length>Ye&&e.rssRing.shift()}nextActiveIdle(e){return e.state==="Z"||e.cpuPct>=Ms?"active":"idle"}systemMetrics(e,t){if(e){if(this.btime=e.btime,this.load1=e.load1,e.memTotal&&(this.systemRam=(e.memTotal-e.memAvailable)/e.memTotal*100),e.cpuTotalTicks>=(this.prevSysTotal??0)){const s=e.cpuBusyTicks-(this.prevSysBusy??0),n=e.cpuTotalTicks-(this.prevSysTotal??0);n>=this.ncores&&n>0&&(this.systemCpu=Math.min(100,s/n*100))}this.prevSysBusy=e.cpuBusyTicks,this.prevSysTotal=e.cpuTotalTicks,t.cpuPct=this.systemCpu,t.ramPct=this.systemRam,t.alive=this.processes.size}}buildTree(e){const t=new Set(this.processes.keys());for(const[s,n]of this.processes){const o=n.ppid;o!==0&&!t.has(o)&&!n.orphan&&(n.orphan=!0,e.orphans.push({pid:s,comm:n.comm})),o!==0&&t.has(o)&&(n.orphan=!1)}for(const s of this.processes.values())s.children=[];for(const[s,n]of this.processes){const o=this.processes.get(n.ppid);if(o){o.children.push(s);continue}if(n.orphan){const r=this.nearestLivingAncestor(n);r&&r.children.push(s)}}}nearestLivingAncestor(e){const t=new Set;let s=e.ppid;for(;s&&!t.has(s);){t.add(s);const n=this.processes.get(s);if(n)return n;s=this.graveyard.get(s)??0}return null}historyTick(e,t){const s=[...t.births.map(n=>({kind:"birth",pid:n.pid,comm:n.comm,wallTime:e})),...t.deaths.map(n=>({kind:"death",pid:n.pid,comm:n.comm,wallTime:e})),...t.spikes.map(n=>({kind:"spike",pid:n.pid,comm:n.comm,wallTime:e})),...t.orphans.map(n=>({kind:"orphan",pid:n.pid,comm:n.comm,wallTime:e}))];this.history.push({tickTime:e,cpuPct:this.systemCpu,ramPct:this.systemRam,births:t.births.length,deaths:t.deaths.length,alive:this.processes.size,events:s})}treeRoots(){const e=new Set(this.processes.keys());return[...this.processes.keys()].filter(t=>{const s=this.processes.get(t);return(s.ppid===0||s.ppid!==0&&!e.has(s.ppid))&&s.ppid!==2}).sort((t,s)=>t-s)}kernelThreads(){return[...this.processes.keys()].filter(e=>this.processes.get(e).ppid===2).sort((e,t)=>e-t)}childrenOf(e){const t=this.processes.get(e);return t?[...t.children].sort((s,n)=>s-n):[]}aliveCount(){return this.processes.size}reset(){this.processes.clear(),this.history=[],this.tickIndex=0,this.btime=0,this.prevSysBusy=null,this.prevSysTotal=null,this.graveyard.clear()}}class _s{constructor(){y(this,"name","process-ecosystem-monitor");y(this,"version","1.0.0");y(this,"fidelity",{level:4,summary:"Direct algorithmic reproduction of /proc parsing, CPU jiffie accounting, lifecycle state machine, tree building, orphan re-homing, PID-reuse detection and history. /proc filesystem I/O replaced by deterministic synthetic snapshots.",details:["Reproduces parse_stat (comm = first '(' to LAST ')', 22-field tail, utime/stime/num_threads/starttime/vsize/rss_pages).","Reproduces parse_statm (resident_pages, size_pages → RSS bytes).","Reproduces parse_system_stat (aggregate 'cpu' keyed -1, per-core rows, btime).","Reproduces system_cpu_pct = busy_delta/total_delta × 100; idle=idle+iowait; sub-jiffy windows keep previous value.","Reproduces process_cpu_pct = Δ(utime+stime)/(interval×CLK_TCK×ncores)×100; first sample → 0; counter reset → 0.","Reproduces identity = (pid, starttime); PID reuse → evict old, spawn new.","Reproduces lifecycle: NEW(2-tick grace)→ACTIVE/IDLE(CPU≥0.5%)→DYING(5 missing)→DEAD; zombies stay ACTIVE.","Reproduces tree building from ppid; missing parent → root (ppid==2 kernel threads excluded).","Reproduces orphan re-homing to nearest living ancestor via graveyard (max 512).","Reproduces bounded history rings (RING_LEN=30) for CPU and RSS per process.","Reproduces per-tick Diff: births, deaths, spikes (≥50% CPU), orphans, system CPU/RAM/alive.","Adapted: no real /proc reads; synthetic ProcSnapshot inputs drive the same engine.","Adapted: curses UI replaced by pure data output for the web renderer."]});y(this,"engine",new Ts)}validate(e){const t=e;if(!t||typeof t!="object")throw new Error("ProcessEcosystemModel: input must be an object");const s=Array.isArray(t.snapshots)?t.snapshots:[],n=[];for(const o of s){if(typeof o.pid!="number")throw new Error("ProcessEcosystemModel: snapshot needs pid");n.push({pid:o.pid,ppid:typeof o.ppid=="number"?o.ppid:0,comm:typeof o.comm=="string"?o.comm:"",state:typeof o.state=="string"?o.state:"S",utime:typeof o.utime=="number"?o.utime:0,stime:typeof o.stime=="number"?o.stime:0,numThreads:typeof o.numThreads=="number"?o.numThreads:1,starttime:typeof o.starttime=="number"?o.starttime:0,vsize:typeof o.vsize=="number"?o.vsize:0,rss:typeof o.rss=="number"?o.rss:0,user:o.user??null})}return{snapshots:n,system:t.system??null,intervalSec:t.intervalSec??.2,wallTime:typeof t.wallTime=="number"?t.wallTime:void 0,clkTick:t.clkTick??100,ncores:t.ncores??1}}run(e){const t=this.validate(e),s={name:"process snapshots",description:"Raw /proc-style process observations for this tick.",data:{count:t.snapshots.length,sample:t.snapshots.slice(0,5)}},n=this.engine.update(t),o={name:"ecosystem update",description:"Lifecycle transitions, CPU jiffie deltas, memory sampling, birth/death/spike/orphan detection.",data:{births:n.births.length,deaths:n.deaths.length,spikes:n.spikes.length,orphans:n.orphans.length,systemCpu:n.cpuPct,systemRam:n.ramPct,alive:n.alive}},r=[...this.engine.processes.values()].map(u=>({pid:u.pid,starttime:u.starttime,comm:u.comm,lifecycle:u.lifecycle,state:u.state,ppid:u.ppid,cpuPct:u.cpuPct,rss:u.rss,numThreads:u.numThreads,user:u.user,orphan:u.orphan,spike:u.spike,firstSeen:u.firstSeen,lastSeen:u.lastSeen,cpuRing:[...u.cpuRing],rssRing:[...u.rssRing],prevPpid:u.prevPpid,utime:u.utime,stime:u.stime,prevCpuTicks:u.prevCpuTicks,vsize:u.vsize,dyingSince:u.dyingSince,children:[...u.children]})),a={name:"process states",description:"Per-process living state: lifecycle, CPU%, RSS, orphan/spike flags.",data:r},l=this.engine.treeRoots(),d=this.engine.kernelThreads(),c={name:"process tree",description:"Tree built from ppid; missing parent → root; kernel threads (ppid==2) listed separately.",data:{roots:l,kernelThreads:d,nRoots:l.length}},b={name:"history tick",description:"Per-tick history entry with wall-time, system metrics and events.",data:this.engine.history.length?this.engine.history[this.engine.history.length-1]:null},m=[s,o,a,c,b],p={processes:r,diff:n,history:[...this.engine.history],treeRoots:l,kernelThreads:d,systemCpu:this.engine.systemCpu,systemRam:this.engine.systemRam,aliveCount:this.engine.aliveCount()};return{input:t,stages:m,final:p,determinism:{seed:null,reproducible:!0,note:"Fully deterministic: same snapshots + clock → same lifecycle states, CPU%, tree and history. No randomness, no /proc, no wall clock."},complexity:"Update O(p) over processes per tick; tree build O(p); nearest-ancestor walk bounded by graveyard depth. Linear in process count per tick.",equations:["cpu_pct_proc = Δ(utime+stime) / (interval × CLK_TCK × ncores) × 100","cpu_pct_sys = busy_delta / total_delta × 100  (idle = idle + iowait)","identity = (pid, starttime);  starttime change ⇒ PID reuse","ram_pct = (mem_total − mem_available) / mem_total × 100","NEW (2 ticks) → ACTIVE if cpu ≥ 0.5% else IDLE → DYING after 5 missing → DEAD","orphan ⇒ re-home to nearest living ancestor via graveyard"]}}reset(){this.engine.reset()}}class He{constructor(e,t,s){y(this,"w");y(this,"h");y(this,"pixels");y(this,"palette");if(e<1||t<1)throw new Error("canvas must be at least 1x1");this.w=e,this.h=t,this.pixels=new Uint8ClampedArray(e*t*3),this.palette=s??[[0,0,0,0],[1,255,255,255]]}setPixel(e,t,s){const n=(t*this.w+e)*3;this.pixels[n]=s[0],this.pixels[n+1]=s[1],this.pixels[n+2]=s[2]}setValue(e,t,s){const n=oe(this.palette,s);this.setPixel(e,t,n)}getPixel(e,t){const s=(t*this.w+e)*3;return[this.pixels[s],this.pixels[s+1],this.pixels[s+2]]}rows(){return Math.floor(this.h/2)}cells(){const e=[],t=this.pixels;for(let s=0;s<this.h-1;s+=2){const n=s/2;for(let o=0;o<this.w;o++){const r=(s*this.w+o)*3,a=[t[r],t[r+1],t[r+2]],l=((s+1)*this.w+o)*3,d=[t[l],t[l+1],t[l+2]];e.push([n,a,d])}}return e}clone(){const e=new He(this.w,this.h,this.palette);return e.pixels.set(this.pixels),e}fingerprintBytes(){const e=[];e.push(this.w&255,this.w>>8&255),e.push(this.h&255,this.h>>8&255);for(const t of new TextEncoder().encode(JSON.stringify(this.palette)))e.push(t);for(const t of this.pixels)e.push(t);return new Uint8Array(e)}}function Is(i){return{seed:i,particles:ne(i,0,0x464C4F57n,1,90,200),steps:ne(i,0,0x464C4F57n,2,24,56),drift:.25+Q(i,0,0x464C4F57n,3)*.5,zoom:1.8+Q(i,0,0x464C4F57n,4)*2.6,gain:.1+Q(i,0,0x464C4F57n,5)*.15,harmonics:ne(i,0,0x464C4F57n,6,2,5)}}function Ns(i,e,t){let s=0;for(let n=1;n<=t.harmonics;n++){const o=t.zoom*n*Math.PI,r=.61803398875*n;s+=Math.sin(o*i+r*2)+Math.cos(o*e+r*3)}return s}function Rs(i,e,t){const s=i.w,n=i.h,o=e.particles,r=e.steps,a=e.drift,l=e.gain,d=e.seed,c=i.pixels;for(let f=0;f<o;f++){let b=Q(d,0,0x464C4F57n,f*2+1),m=Q(d,0,0x464C4F57n,f*2+2);b=(f+.08+b*.84)/o,m=(f*31%o+.08+m*.84)/o;let p=(b*s+t*a*1.3)%s,u=(m*n+t*a)%n;for(let g=0;g<r&&!(p<0||p>=s||u<0||u>=n);g++){const v=Ns(p/s,u/n,e);p+=Math.cos(v)*1.4,u+=Math.sin(v)*1.4;const k=Math.floor(p),x=Math.floor(u);if(k<0||k>=s||x<0||x>=n)continue;const I=(x*s+k)*3,w=c[I];if(w<255){const h=Math.min(255,w+l*255);c[I]=h,c[I+1]=h,c[I+2]=h}}}zs(i,d,t)}function zs(i,e,t){const s=i.pixels,n=i.w*i.h;let o=1;for(let l=0;l<n;l++)s[l*3]>o&&(o=s[l*3]);if(o<=0)return;const r=1/o,a=i.palette;for(let l=0;l<n;l++){let d=s[l*3]*r,c,f,b;if(d<=0)[c,f,b]=oe(a,.02);else{const m=(Number(Me(e,t,0x0D17n,l))/Number(1n<<64n)-.5)*.05;d=.06+.94*Math.sqrt(d)+m,d>1?d=1:d<0&&(d=0),[c,f,b]=oe(a,d)}s[l*3]=c,s[l*3+1]=f,s[l*3+2]=b}}const Xe=["classic","rings","mandala","sweep"];function Cs(i){return{seed:i,formula:Xe[ne(i,0,0x504C4153n,1,0,Xe.length)],speed:.02+Q(i,0,0x504C4153n,2)*.06,zoom:.8+Q(i,0,0x504C4153n,3)*1.6,warp:Q(i,0,0x504C4153n,4)}}function Ls(i,e,t,s,n,o){const r=i*s,a=e*s;let l;if(o==="classic")l=Math.sin(r*3+t*2)*Math.cos(a*2.4-t*1.6)+Math.sin(r*1.5+a*2+t*.8);else if(o==="rings"){const d=Math.hypot(r-s/2,a-s/2);l=Math.sin(d*6-t*3)+.35*Math.cos((r+a)*3+t)}else if(o==="mandala"){const d=Math.atan2(a-s/2,r-s/2),c=Math.hypot(r-s/2,a-s/2);l=Math.sin(5*d+c*3.5-t*2)+.4*Math.sin(c*9-t*1.2)}else l=Math.sin(r*2-t*2.5)+Math.sin(a*2+t*1.7)+.5*Math.sin(r*5-a*3+t*.6);return n>0&&(l*=1-n*.25),l*.5+.5}function $s(i,e,t){const s=i.w,n=i.h,o=t*e.speed,r=e.zoom,a=e.warp,l=e.formula,d=i.pixels;let c=0;for(let f=0;f<n;f++){const b=f/n;for(let m=0;m<s;m++){const p=m/s,u=Ls(p,b,o,r,a,l),g=oe(i.palette,u);d[c]=g[0],d[c+1]=g[1],d[c+2]=g[2],c+=3}}}const Ds=["clifford","dejong"];function be(i,e){return(Q(i,0,BigInt(e),e*3+1)<.5?-1:1)*(1+Q(i,0,BigInt(e),e*3+2))}const Ps=3e3;function Bs(i,e,t,s,n){let o=.1,r=.1,a=1e9,l=1e9,d=-1e9,c=-1e9;for(let f=0;f<Ps;f++){if(n==="clifford"?[o,r]=[Math.sin(i*r)+t*Math.cos(i*o),Math.sin(e*o)+s*Math.cos(e*r)]:[o,r]=[Math.sin(i*r)-Math.cos(e*o),Math.sin(t*o)-Math.cos(s*r)],Math.abs(o)>100||Math.abs(r)>100)return null;o<a&&(a=o),o>d&&(d=o),r<l&&(l=r),r>c&&(c=r)}return[d-a,c-l,0]}function js(i,e){let t=null,s=null;for(let n=0;n<8;n++){const o=n*4,r=be(i,o+2),a=be(i,o+3),l=be(i,o+4),d=be(i,o+5),c=Bs(r,a,l,d,e);if(!c)continue;const[f,b,m]=c;if(f>=2&&f<=5&&b>=2&&b<=5&&m>=350)return[r,a,l,d];(!t||m>t[4])&&(t=[r,a,l,d,m]),f>=1.5&&f<=6&&b>=1.5&&b<=6&&(!s||m>s[4])&&(s=[r,a,l,d,m])}return s?[s[0],s[1],s[2],s[3]]:t?[t[0],t[1],t[2],t[3]]:[-1.7,1.7,1.3,-1.3]}function Os(i){const e=Ds[ne(i,0,0x41545452n,1,0,2)],[t,s,n,o]=js(i,e);return{seed:i,family:e,a:t,b:s,c:n,d:o,iterates:ne(i,0,0x41545452n,6,500,1400),gamma:1.6+Q(i,0,0x41545452n,7)*1.2}}class Le{constructor(e,t,s){y(this,"w");y(this,"h");y(this,"params");y(this,"x");y(this,"y");y(this,"frameN");y(this,"density");y(this,"scale");this.w=e,this.h=t,this.params=s,this.x=.1,this.y=.1,this.frameN=-1,this.density=new Float64Array(e*t),this.scale=Math.min(e,t)/5}advance(e=1){const t=this.w,s=this.h,n=this.params.iterates,o=this.params.family,r=this.params.a,a=this.params.b,l=this.params.c,d=this.params.d,c=this.scale,f=t/2,b=s/2,m=this.density;let p=this.x,u=this.y;for(let g=0;g<e*n;g++){if(o==="clifford"?[p,u]=[Math.sin(r*u)+l*Math.cos(r*p),Math.sin(a*p)+d*Math.cos(a*u)]:[p,u]=[Math.sin(r*u)-Math.cos(a*p),Math.sin(l*p)-Math.cos(d*u)],Math.abs(p)>100||Math.abs(u)>100){p=.1,u=.1;continue}const v=Math.floor(p*c+f),k=Math.floor(u*c+b);v>=0&&v<t&&k>=0&&k<s&&(m[k*t+v]+=1)}this.x=p,this.y=u,this.frameN+=e}render(e){const t=this.w,s=this.h,n=this.params.gamma,o=this.density;let r=1;for(let c=0;c<t*s;c++)o[c]>r&&(r=o[c]);const a=1/Math.log(1+r),l=e.palette,d=e.pixels;for(let c=0;c<t*s;c++){const f=o[c];let b,m,p;if(f<=0)[b,m,p]=oe(l,.015);else{let u=Math.log(1+f)*a;u=u**(1/n),u=.15+u*.85,u>1&&(u=1),[b,m,p]=oe(l,u)}d[c*3]=b,d[c*3+1]=m,d[c*3+2]=p}}}function Hs(i,e,t){const s=new Le(i.w,i.h,e);s.advance(t+1),s.render(i)}class qs{constructor(e,t,s){y(this,"buf");y(this,"mode");y(this,"params");y(this,"frameN");y(this,"attractorSim",null);this.buf=e,this.mode=t,this.params=s,this.frameN=0,t==="attractor"&&(this.attractorSim=new Le(e.w,e.h,s))}nextFrame(e=1){if(this.attractorSim){this.attractorSim.advance(e),this.attractorSim.render(this.buf),this.frameN=this.attractorSim.frameN;return}this.frameN+=e,Re(this.buf,this.mode,this.params,this.frameN)}redraw(){if(this.attractorSim){this.attractorSim.render(this.buf);return}Re(this.buf,this.mode,this.params,this.frameN)}seek(e){if(e<0&&(e=0),this.attractorSim){if(e===this.attractorSim.frameN)return;this.attractorSim=new Le(this.buf.w,this.buf.h,this.attractorSim.params),this.attractorSim.advance(e+1),this.attractorSim.render(this.buf),this.frameN=this.attractorSim.frameN;return}this.frameN=e,Re(this.buf,this.mode,this.params,e)}rewind(){this.seek(0)}}function Fs(i,e,t={}){let s;i==="flowfield"?s=Is(e):i==="plasma"?s=Cs(e):s=Os(e);for(const[n,o]of Object.entries(t))s[n]=o;return s}function Us(i){const e=["flowfield","plasma","attractor"];if(!e.includes(i))throw new Error(`unknown mode ${i} (choose from: ${e.join(", ")})`);return i}function Re(i,e,t,s){e==="flowfield"?Rs(i,t,s):e==="plasma"?$s(i,t,s):Hs(i,t,s)}function Gs(i,e,t,s){const n=[];n.push(e,String(s));for(const a of Object.keys(t).sort())n.push(a,String(t[a]),"\0");n.push(Array.from(i.fingerprintBytes()).map(a=>String.fromCharCode(a)).join(""));const o=n.join("");let r=2166136261;for(let a=0;a<o.length;a++)r^=o.charCodeAt(a),r=Math.imul(r,16777619)>>>0;return r.toString(16).padStart(8,"0")}class Ws{constructor(){y(this,"name","generative-engine");y(this,"version","1.0.0");y(this,"fidelity",{level:4,summary:"Direct algorithmic reproduction of the splitmix64 RNG, palettes, framebuffer geometry, all three render modes (flowfield, plasma, attractor), session seeking and fingerprint. Terminal/ANSI I/O and file export replaced by deterministic pixel output.",details:["Reproduces splitmix64-style RNG (mix64/mix2/mix3/rand_int/rand_float01/rand_range): pure function of (seed, frame, salt, index), no state, O(1) seekable.","Reproduces continuous 1-D palettes sampled by linear interpolation between stops.","Reproduces xterm-256 nearest-color mapping (16 ANSI + 6×6×6 cube + grayscale).","Reproduces Framebuffer (W×H pixels, half-block row pairs, cell encoding).","Reproduces flowfield: analytic sine-harmonic angle field, particle streamlines drifting linearly with frame, additive brightness accumulation, sqrt tone curve, per-pixel dither, palette mapping.","Reproduces plasma: closed-form per-pixel sinusoidal fields, 4 formulas (classic/rings/mandala/sweep), time/zoom/warp parameters.","Reproduces attractor: Clifford/Dejong map, seed-derived coefficients with deterministic probe for non-degenerate dynamics, incremental density accumulation, log+gamma tone curve, divergence guard reset to (0.1, 0.1).","Reproduces Session: O(1) seek for flowfield/plasma, incremental Sim for attractor, nextFrame/redraw/seek/rewind.","Reproduces world fingerprint: hash over mode + frame + params + framebuffer bytes.","Adapted: no terminal I/O or ANSI escapes; raw RGB pixels for canvas rendering.","Adapted: no GIF/PNG/ANS export; pixel array exported as data."]});y(this,"session",null)}validate(e){const t=e;if(!t||typeof t!="object")throw new Error("GenerativeEngineModel: input must be an object");const s=typeof t.seed=="number"?t.seed:0,n=t.mode?Us(t.mode):"flowfield",o=Math.max(8,Math.min(200,typeof t.width=="number"?t.width:100)),r=Math.max(4,Math.min(120,typeof t.height=="number"?t.height:40)),a=Math.max(0,typeof t.frame=="number"?t.frame:0),l=typeof t.palette=="string"?t.palette:void 0;return{seed:s,mode:n,width:o,height:r,frame:a,palette:l??We(s),overrides:t.overrides??{}}}run(e){const t=this.validate(e),{seed:s,mode:n,width:o,height:r,frame:a,palette:l,overrides:d}=t,c=n??"flowfield",f=l??We(s),b=Fs(c,s,d),m={name:"world identity",description:"Seed → mode parameters (all derived deterministically from the seed).",data:{seed:s,mode:c,params:b}},p=Ce[f]??Ce.neon,u=new He(o??100,(r??40)*2,p),g={name:"canvas",description:`W×H pixel canvas (${u.w}×${u.h} px = ${u.w}×${u.rows()} half-block cells), palette ${f}.`,data:{width:u.w,height:u.h,canvasPx:u.w*u.h,palette:f}},v=a??0;this.session=new qs(u,c,b),this.session.seek(v);const k={name:`render frame ${v}`,description:`Pure render of frame ${v} as a function of (seed, mode, params, frame). ${c==="attractor"?"Incremental attractor simulation.":"O(1) stateless frame."}`,data:{mode:c,frameN:this.session.frameN}},x=Gs(u,c,b,v),I={name:"world fingerprint",description:"Deterministic hash over mode + frame + params + pixel bytes — a shareable world ID.",data:{fingerprint:x}},w=u.pixels,h=[];for(let S=0;S<u.w*u.h;S++){const E=S%u.w,T=Math.floor(S/u.w);h.push({x:E,y:T,r:w[S*3],g:w[S*3+1],b:w[S*3+2]})}const A=[m,g,k,I],M={seed:s,mode:c,frame:v,width:u.w,height:u.rows(),palette:f,params:b,pixels:h,fingerprint:x,cellCount:u.rows()*u.w};return{input:t,stages:A,final:M,determinism:{seed:s,reproducible:!0,note:"Fully deterministic: same (seed, mode, params, frame) → identical pixels and fingerprint. No randomness at render time; all variation is seed-derived."},complexity:"Flowfield/plasma: O(pixels) per frame, O(1) seek. Attractor: O(iterates × frames) density accumulation; seeking replays from the initial state (fast for modest frame numbers).",equations:["angle_field(u,v) = Σₖ sin(zoom·k·π·u + φ·2) + cos(zoom·k·π·v + φ·3)","plasma_classic = sin(3u+2t)·cos(2.4v−1.6t) + sin(1.5u+2v+0.8t)","attractor_clifford: x' = sin(a·y) + c·cos(a·x), y' = sin(b·x) + d·cos(b·y)","density_tone = log(1+d)/log(1+maxd) ^ (1/γ), then 0.15 + v·0.85","fingerprint = hash(mode ∥ frame ∥ params ∥ pixels)"]}}reset(){this.session=null}}const ut=[0x6a09e667f3bcc908n,0xbb67ae8584caa73bn,0x3c6ef372fe94f82bn,0xa54ff53a5f1d36f1n,0x510e527fade682d1n,0x9b05688c2b3e6c1fn,0x1f83d9abfb41bd6bn,0x5be0cd19137e2179n],Ks=[[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15],[14,10,4,8,9,15,13,6,1,12,0,2,11,7,5,3],[11,8,12,0,5,2,15,13,10,14,3,6,7,1,9,4],[7,9,3,1,13,12,11,14,2,6,5,10,4,0,15,8],[9,0,5,7,2,4,10,15,14,1,11,12,6,8,3,13],[2,12,6,10,0,11,8,3,4,13,7,5,15,14,1,9],[12,5,1,15,14,13,4,10,0,7,6,3,9,2,8,11],[13,11,7,14,12,1,3,9,5,0,15,4,8,6,2,10],[6,15,14,9,11,3,0,8,12,2,13,7,1,4,10,5],[10,2,8,4,7,6,1,5,15,11,9,14,3,12,13,0]],U=0xffffffffffffffffn;function ye(i,e){return(i>>BigInt(e)|i<<BigInt(64-e))&U}function Vs(i,e){let t=0n;for(let s=0;s<8;s++)t|=BigInt(i[e+s])<<BigInt(8*s);return t}const Qs=[0,1,2,3],Js=[5,6,7,4],Ys=[10,11,8,9],Xs=[15,12,13,14];function Ze(i,e,t,s,n,o,r,a,l){i[s]=i[s]+i[n]+e[t[a]]&U,i[r]=ye(i[r]^i[s],32),i[o]=i[o]+i[r]&U,i[n]=ye(i[n]^i[o],24),i[s]=i[s]+i[n]+e[t[l]]&U,i[r]=ye(i[r]^i[s],16),i[o]=i[o]+i[r]&U,i[n]=ye(i[n]^i[o],63)}function Zs(i,e,t,s){const n=[];for(let o=0;o<16;o++)n[o]=0n;for(let o=0;o<8;o++)n[o]=i[o],n[o+8]=ut[o];n[12]^=t,n[13]^=t>>32n,s&&(n[13]=~n[13]&U);for(let o=0;o<12;o++){const r=Ks[o%10];for(let a=0;a<4;a++)Ze(n,e,r,a,a+4,a+8,a+12,2*a,2*a+1);for(let a=0;a<4;a++)Ze(n,e,r,Qs[a],Js[a],Ys[a],Xs[a],8+2*a,8+2*a+1)}for(let o=0;o<8;o++)i[o]=(i[o]^n[o])&U,i[o]=(i[o]^n[o+8])&U}function me(i,e){if(e<1||e>64)throw new Error("invalid blake2b outlen");const t=[...ut];t[0]^=BigInt(e)|BigInt(1)<<16n|BigInt(1)<<24n;for(let c=2;c<8;c++)t[c]=0n;const s=i.length;let n=s+1;for(;n%128!==112;)n++;n+=16;const o=new Uint8Array(n);o.set(i),o[s]=128;const r=BigInt(s)*8n;for(let c=0;c<16;c++)o[n-16+c]=Number(r>>BigInt(8*c)&255n);let a=0n;const l=n/128;for(let c=0;c<l;c++){const f=c*128,b=[];for(let p=0;p<16;p++)b[p]=0n;for(let p=0;p<16;p++)b[p]=Vs(o,f+p*8);const m=c===l-1;Zs(t,b,a,m),a+=128n}const d=new Uint8Array(e);for(let c=0;c<e;c++)d[c]=Number(t[c>>3]>>BigInt(8*(c%8))&255n);return d}function ie(i,e){const t=i.reduce((o,r)=>o+r.length,0)+Math.max(0,i.length-1),s=new Uint8Array(t);let n=0;for(let o=0;o<i.length;o++)o>0&&(s[n++]=31),s.set(i[o],n),n+=i[o].length;return me(s,e)}function z(i){return new TextEncoder().encode(i)}function pt(i){if(i===0)return z("0x0p+0");if(i===1/0)return z("inf");if(i===-1/0)return z("-inf");if(Number.isNaN(i))return z("nan");const e=i<0?1:0,t=Math.abs(i),s=new ArrayBuffer(8),n=new DataView(s);n.setFloat64(0,t);const o=n.getBigUint64(0,!1),r=Number(o>>52n&0x7ffn)-1023,a=o&0xfffffffffffffn,l=e?"-":"",d=r>=0?`+${r}`:String(r);if(a===0n)return z(`${l}0x1p${d}`);const c=a.toString(16).padStart(13,"0");return z(`${l}0x1.${c}p${d}`)}const ei=1,$e=2,fe=3,re=4,et=5;class j extends Error{constructor(e){super(e),this.name="KernelInvariantError"}}class xe{constructor(e,t=0,s,n=0){y(this,"id");y(this,"tag");y(this,"payload");y(this,"born");this.id=e,this.tag=t,this.payload=s,this.born=n}digest(){return ie([z("N"),z(String(this.id)),z(String(this.tag)),ft(this.payload),z(String(this.born))],16)}}class we{constructor(e,t,s,n=0,o=1,r=0){y(this,"id");y(this,"src");y(this,"dst");y(this,"tag");y(this,"w");y(this,"clock");this.id=e,this.src=t,this.dst=s,this.tag=n,this.w=o,this.clock=r}digest(){return ie([z("A"),z(String(this.id)),z(String(this.src)),z(String(this.dst)),z(String(this.tag)),pt(this.w),z(String(this.clock))],16)}}function ft(i){const e=new Uint8Array(i.byteLength);return e.set(new Uint8Array(i.buffer,i.byteOffset,i.byteLength)),e}function tt(i){return i.digest()}class se{constructor(e=4,t=null){y(this,"nodes",new Map);y(this,"arcs",new Map);y(this,"_nextId",0);y(this,"incSrc",new Map);y(this,"incDst",new Map);y(this,"_dim");y(this,"caps");y(this,"step",0);y(this,"retired",new Map);y(this,"_version",0);y(this,"_subCache",new Map);this._dim=e,this.caps={...t||{}}}_alloc(){const e=this._nextId;return this._nextId+=1,e}isNode(e){return this.nodes.has(e)}isArc(e){return this.arcs.has(e)}exists(e){return this.nodes.has(e)||this.arcs.has(e)}isRetired(e){return this.retired.has(e)}isWitnessed(e){var t,s;return(((t=this.incSrc.get(e))==null?void 0:t.size)??0)>0||(((s=this.incDst.get(e))==null?void 0:s.size)??0)>0}obj(e){const t=this.nodes.get(e);if(t)return t;const s=this.arcs.get(e);if(s)return s;throw new j(`no object with id ${e}`)}tagOf(e){const t=this.nodes.get(e);if(t)return t.tag;const s=this.arcs.get(e);if(s)return s.tag;throw new j(`no object with id ${e}`)}addNode(e=0,t=null,s=null){const n=this._alloc(),o=t??new Float64Array(this._dim);if(o.length!==this._dim)throw new j(`payload dim ${o.length} != ${this._dim}`);const r=new xe(n,e,new Float64Array(o),s??this.step);return this.nodes.set(n,r),this.incSrc.set(n,new Set),this.incDst.set(n,new Set),this._touch(),r}addArc(e,t,s=0,n=1,o=null,r=!1){if(!this.exists(e))throw new j(`arc src ${e} does not exist`);if(!this.exists(t))throw new j(`arc dst ${t} does not exist`);if(r){const d=this.incSrc.get(e);if(d)for(const c of d){const f=this.arcs.get(c);if(f.dst===t&&f.tag===s)return null}}const a=this._alloc(),l=new we(a,e,t,s,n,o??this.step);return this.arcs.set(a,l),this._touch(),this.incSrc.get(e).add(a),this.incDst.get(t).add(a),this.incSrc.set(a,new Set),this.incDst.set(a,new Set),l}hasArc(e,t,s="*"){const n=this.incSrc.get(e);if(!n)return!1;for(const o of n){const r=this.arcs.get(o);if(r.dst===t&&(s==="*"||r.tag===s))return!0}return!1}delArc(e,t=!0){var n,o;if(!this.arcs.has(e))return;const s=[e];for(;s.length>0;){const r=s.pop(),a=this.arcs.get(r);if(!a)continue;this.arcs.delete(r),(n=this.incSrc.get(a.src))==null||n.delete(r),(o=this.incDst.get(a.dst))==null||o.delete(r);let l=[];t&&(l=[...this.incSrc.get(r)??[],...this.incDst.get(r)??[]].filter(d=>d!==r)),this.incSrc.delete(r),this.incDst.delete(r),s.push(...l)}this._touch()}delNode(e,t=!0,s=[]){if(!this.nodes.has(e))return;const n=new Set(s),o=[...this.incSrc.get(e)??[],...this.incDst.get(e)??[]];for(const a of o){const l=this.arcs.get(a);l&&n.has(l.tag)||this.delArc(a,t)}this.nodes.delete(e),o.some(a=>{const l=this.arcs.get(a);return!!l&&n.has(l.tag)})?this.retired.set(e,{atStep:this.step,tags:[...n]}):(this.incSrc.delete(e),this.incDst.delete(e)),this._touch()}setNodeTag(e,t){const s=this.nodes.get(e);if(!s)throw new j(`no node ${e}`);s.tag=t,this._touch()}setNodePayload(e,t){const s=Float64Array.from(t);if(s.length!==this._dim)throw new j(`payload dim ${s.length} != ${this._dim}`);const n=this.nodes.get(e);if(!n)throw new j(`no node ${e}`);n.payload=s,this._touch()}setArc(e,t={}){const s=this.arcs.get(e);if(!s)throw new j(`no arc ${e}`);t.tag!==void 0&&(s.tag=t.tag,this._touch()),t.w!==void 0&&(s.w=t.w,this._touch()),t.clock!==void 0&&(s.clock=t.clock,this._touch())}moveArc(e,t={}){var r,a;const s=this.arcs.get(e);if(!s)throw new j(`no arc ${e}`);const n=t.src??s.src,o=t.dst??s.dst;if(!this.exists(n)||!this.exists(o))throw new j("move_arc to nonexistent endpoint");(r=this.incSrc.get(s.src))==null||r.delete(e),(a=this.incDst.get(s.dst))==null||a.delete(e),s.src=n,s.dst=o,this.incSrc.get(n).add(e),this.incDst.get(o).add(e)}outArcs(e){return this.incSrc.get(e)??new Set}inArcs(e){return this.incDst.get(e)??new Set}incArcs(e){const t=new Set(this.outArcs(e));for(const s of this.inArcs(e))t.add(s);return t}*endpoints(e){for(const t of this.outArcs(e))yield this.arcs.get(t).dst;for(const t of this.inArcs(e))yield this.arcs.get(t).src}outNodeArcs(e){const t=[];for(const s of this.outArcs(e)){const n=this.arcs.get(s).dst;this.isNode(n)&&t.push([n,this.arcs.get(s)])}return t}inNodeArcs(e){const t=[];for(const s of this.inArcs(e)){const n=this.arcs.get(s).src;this.isNode(n)&&t.push([n,this.arcs.get(s)])}return t}outNodes(e){return this.outNodeArcs(e).map(([t])=>t)}inNodes(e){return this.inNodeArcs(e).map(([t])=>t)}ball(e,t){const s=new Map([[e,0]]);let n=[e];for(let o=1;o<=t;o++){const r=[];for(const a of n)for(const l of this.endpoints(a))s.has(l)||(s.set(l,o),r.push(l));if(n=r,n.length===0)break}return s}validate(){const e=new Set;for(const r of this.nodes.keys()){if(e.has(r))throw new j(`I1 duplicate node id ${r}`);e.add(r)}const t=new Set(this.retired.keys()),s=[...e].filter(r=>t.has(r));if(s.length>0)throw new j(`I1 id ${Math.min(...s)} is both live and retired`);for(const[r,a]of this.arcs.entries()){if(e.has(r))throw new j(`I1 duplicate id ${r}`);e.add(r);for(const c of[a.src,a.dst])if(!e.has(c)&&!t.has(c))throw new j(`I2 dangling arc ${r}: ${a.src}->${a.dst}`);const l=this.incSrc.get(a.src);if(!l||!l.has(r))throw new j(`inc_src index desync on arc ${r}`);const d=this.incDst.get(a.dst);if(!d||!d.has(r))throw new j(`inc_dst index desync on arc ${r}`)}for(const[r,a]of this.nodes.entries())if(a.payload.length!==this._dim)throw new j(`I4 node ${r} payload ${a.payload.length}`);const n=this.caps.maxNodes;if(n!==void 0&&this.nodes.size>n)throw new j(`I3 nodes ${this.nodes.size} > cap ${n}`);const o=this.caps.maxArcs;if(o!==void 0&&this.arcs.size>o)throw new j(`I3 arcs ${this.arcs.size} > cap ${o}`)}graphHash(){const e=[z(`box/v1/dim${this._dim}`)];for(const n of[...this.nodes.keys()].sort((o,r)=>o-r))e.push(tt(this.nodes.get(n)));for(const n of[...this.arcs.keys()].sort((o,r)=>o-r))e.push(tt(this.arcs.get(n)));for(const n of[...this.retired.keys()].sort((o,r)=>o-r))e.push(z(`retired:${n}`));const t=new Uint8Array(e.reduce((n,o)=>n+o.length,0));let s=0;for(const n of e)t.set(n,s),s+=n.length;return J(me(t,32))}structuralDigest(e,t=2){const s=this.ball(e,t),n=[z("S"),z(String(s.size))],o=[];for(const[l,d]of s.entries())o.push({sub:this._subDigest(l,t),d,x:l});o.sort((l,d)=>{const c=J(l.sub),f=J(d.sub);return c<f?-1:c>f?1:l.d-d.d});for(const l of o)n.push(l.sub),n.push(z(String(l.d)));const r=new Uint8Array(n.reduce((l,d)=>l+d.length,0));let a=0;for(const l of n)r.set(l,a),a+=l.length;return ie([r],16)}_subDigest(e,t){const s=this._subCache,n=s.get(e);if(n&&n.version===this._version)return n.digest;let o;if(this.nodes.has(e)){const r=this.nodes.get(e);o=ie([z("n"),z(String(r.tag)),ft(r.payload)],16)}else if(this.arcs.has(e)){const r=this.arcs.get(e);o=ie([z("a"),z(String(r.tag)),pt(r.w)],16)}else o=ie([z("r")],16);return s.set(e,{version:this._version,digest:o}),o}_touch(){this._version+=1}toDict(){return{dim:this._dim,caps:this.caps,nodes:[...this.nodes.values()].sort((e,t)=>e.id-t.id).map(e=>({id:e.id,tag:e.tag,payload:[...e.payload],born:e.born})),arcs:[...this.arcs.values()].sort((e,t)=>e.id-t.id).map(e=>({id:e.id,src:e.src,dst:e.dst,tag:e.tag,w:e.w,clock:e.clock})),retired:[...this.retired.entries()].sort((e,t)=>e[0]-t[0]).map(([e,t])=>({id:e,...t}))}}static fromDict(e){const t=new se(e.dim??4,e.caps??{});for(const s of e.nodes??[]){const n=Number(s.id);t.nodes.set(n,new xe(n,Number(s.tag),Float64Array.from(s.payload),Number(s.born??0))),t.incSrc.set(n,new Set),t.incDst.set(n,new Set),t._nextId=Math.max(t._nextId,n+1)}for(const s of e.arcs??[]){const n=Number(s.id),o=new we(n,Number(s.src),Number(s.dst),Number(s.tag),Number(s.w??1),Number(s.clock??0));t.arcs.set(n,o),t.incSrc.get(o.src).add(n),t.incDst.get(o.dst).add(n),t.incSrc.set(n,new Set),t.incDst.set(n,new Set),t._nextId=Math.max(t._nextId,n+1)}for(const s of e.retired??[])t.retired.set(Number(s.id),{atStep:s.atStep,tags:s.tags}),t._nextId=Math.max(t._nextId,Number(s.id)+1);return t}copy(){const e=new se(this._dim,{...this.caps});for(const[t,s]of this.nodes.entries())e.nodes.set(t,new xe(t,s.tag,Float64Array.from(s.payload),s.born)),e.incSrc.set(t,new Set(this.incSrc.get(t)??[])),e.incDst.set(t,new Set(this.incDst.get(t)??[]));for(const[t,s]of this.arcs.entries())e.arcs.set(t,new we(t,s.src,s.dst,s.tag,s.w,s.clock)),e.incSrc.set(s.src,new Set(this.incSrc.get(s.src)??[])),e.incDst.set(s.dst,new Set(this.incDst.get(s.dst)??[])),e.incSrc.set(t,new Set),e.incDst.set(t,new Set);e._nextId=this._nextId;for(const[t,s]of this.retired.entries())e.retired.set(t,{...s});return e.step=this.step,e.validate(),e}static random(e,t,s=4,n=0,o=1,r=null){const a=new st(n),l=new se(s,r),d=[];for(let b=0;b<e;b++){const m=Math.floor(a.next()*o),p=new Float64Array(s);for(let u=0;u<s;u++)p[u]=a.next()*.25;d.push(l.addNode(m,p).id)}let c=0;const f=40*t+100;for(;l.arcs.size<t&&c<f;){c+=1;const b=d[Math.floor(a.next()*d.length)],m=d[Math.floor(a.next()*d.length)];if(b!==m)if(a.next()<.08&&l.arcs.size>0){const p=[...l.arcs.keys()],u=p[Math.floor(a.next()*p.length)];l.addArc(b,u,0,a.next(),0)}else l.addArc(b,m,0,a.next(),0)}return l.validate(),l}relabel(e){const t=[...this.nodes.keys(),...this.arcs.keys(),...this.retired.keys()].sort((a,l)=>a-l),s=new st(e);for(let a=t.length-1;a>0;a--){const l=Math.floor(s.next()*(a+1));[t[a],t[l]]=[t[l],t[a]]}const n=new Map;t.forEach((a,l)=>n.set(a,l));const o=new se(this._dim,{...this.caps});for(const a of t){const l=n.get(a);if(this.nodes.has(a)){const d=this.nodes.get(a);o.nodes.set(l,new xe(l,d.tag,Float64Array.from(d.payload),d.born)),o.incSrc.set(l,new Set),o.incDst.set(l,new Set),o._nextId=Math.max(o._nextId,l+1)}}for(const a of[...this.arcs.keys()].sort((l,d)=>l-d)){const l=this.arcs.get(a),d=n.get(a);o.arcs.set(d,new we(d,n.get(l.src),n.get(l.dst),l.tag,l.w,l.clock)),o.incSrc.get(n.get(l.src)).add(d),o.incDst.get(n.get(l.dst)).add(d),o.incSrc.set(d,new Set),o.incDst.set(d,new Set),o._nextId=Math.max(o._nextId,d+1)}for(const[a,l]of this.retired.entries())o.retired.set(n.get(a),{...l});const r=Math.max(o._nextId,...n.values())+1;return o._nextId=r,o.step=this.step,o.validate(),{state:o,mapping:n}}}function J(i){let e="";for(const t of i)e+=t.toString(16).padStart(2,"0");return e}class st{constructor(e){y(this,"state");this.state=(BigInt(e)&U)+0x9e3779b97f4a7c15n}next(){this.state=this.state+0x9e3779b97f4a7c15n&U;let e=this.state;return e=(e^e>>30n)&U,e=e*0xbf58476d1ce4e5b9n&U,e=(e^e>>27n)&U,e=e*0x94d049bb133111ebn&U,e=(e^e>>31n)&U,Number(e>>11n)*(1/Number(1n<<53n))}}function ke(i,e,t,s,n=null){const o=[z(`${i}|${e}|${t}`)];for(const c of s)n!==null?o.push(n.structuralDigest(c,1)):o.push(z(String(c)));const r=new Uint8Array(o.reduce((c,f)=>c+f.length,0));let a=0;for(const c of o)r.set(c,a),a+=c.length;const l=me(r,8);return new DataView(l.buffer,l.byteOffset,l.byteLength).getUint32(0,!1)/4294967296}function ht(i){if(!i.channel)throw new Error("predicate missing channel");const e=Object.entries(i).filter(([t])=>t!=="channel").sort((t,s)=>t[0].localeCompare(s[0]));return{channel:i.channel,spec:e}}function Z(i,e,t=void 0){for(const[s,n]of i.spec)if(s===e)return n;return t}function mt(i){const e=i.distinctFrom,t=Array.isArray(e)?e:e!==void 0?[e]:[];return{role:i.role,pool:i.pool,tag:i.tag??"*",excludeAnchor:!!i.excludeAnchor,distinctFrom:t,within:i.within===void 0?null:Number(i.within)}}function ti(i){return{id:i.id,match:(i.match??[]).map(ht),select:(i.select??[]).map(mt),effect:i.effect??[],weight:Number(i.weight??1),desc:i.desc??""}}class qe{constructor(e=null,t=null){y(this,"rules",[]);y(this,"enabled",new Map);y(this,"namedTagMax",null);this.rules=e?[...e]:[],this.namedTagMax=t;for(const s of this.rules)this.enabled.set(s.id,!0)}add(e,t=null){if(this.rules.some(s=>s.id===e.id))throw new Error(`duplicate rule id ${e.id}`);t===null?this.rules.push(e):this.rules.splice(t,0,e),this.enabled.set(e.id,!0)}remove(e){this.rules=this.rules.filter(t=>t.id!==e),this.enabled.delete(e)}setEnabled(e,t){if(!this.enabled.has(e))throw new Error(`unknown rule ${e}`);this.enabled.set(e,t)}active(){return this.rules.filter(e=>this.enabled.get(e.id)!==!1)}get(e){for(const t of this.rules)if(t.id===e)return t;throw new Error(`unknown rule ${e}`)}get ids(){return this.rules.map(e=>e.id)}toDict(){return{namedTagMax:this.namedTagMax,rules:this.rules.map(e=>({id:e.id,desc:e.desc,weight:e.weight,match:e.match.map(t=>({channel:t.channel,...Object.fromEntries(t.spec)})),select:e.select.map(t=>({role:t.role,pool:t.pool,tag:t.tag,excludeAnchor:t.excludeAnchor,...t.distinctFrom.length>0?{distinctFrom:[...t.distinctFrom]}:{}})),effect:e.effect.map(t=>({...t}))})),enabled:Object.fromEntries(this.enabled)}}contentHash(){const e=JSON.stringify(this.toDict());return J(me(z(e),16))}static fromDict(e){const t=new qe((e.rules??[]).map(ti),e.namedTagMax??null);for(const[s,n]of Object.entries(e.enabled??{}))t.enabled.set(s,!!n);return t}}function ue(i,e,t){return e==="*"?!0:e==="same"?t!==null&&i===t:i===Number(e)}function pe(i,e){const t=Z(e,"min"),s=Z(e,"max");return!(t!==void 0&&i<Number(t)||s!==void 0&&i>Number(s))}function vt(i,e,t){const s=new Set(i.inNodes(e));if(s.size<t)return[];const n=[];for(const o of i.outNodes(e)){const r=new Set(i.inNodes(o));let a=0;for(const l of s)r.has(l)&&a++;a>=t&&n.push(o)}return n.sort((o,r)=>o-r)}function si(i,e){const t=i.nodes.get(e).tag;return i.outNodeArcs(e).filter(([s,n])=>n.tag===$e&&i.nodes.get(s).tag===t).map(([s])=>s).sort((s,n)=>s-n)}function ii(i,e,t){if(!i.isNode(t))return!1;const s=i.nodes.get(t);for(const n of e.match){const o=n.channel,r=s.tag;let a=0,l=!1;if(o==="out_arcs")a=[...i.outArcs(t)].filter(d=>ue(i.arcs.get(d).tag,Z(n,"tag","*"),r)).length;else if(o==="in_arcs")a=[...i.inArcs(t)].filter(d=>ue(i.arcs.get(d).tag,Z(n,"tag","*"),r)).length;else if(o==="inc_arcs")a=[...i.incArcs(t)].filter(d=>ue(i.arcs.get(d).tag,Z(n,"tag","*"),r)).length;else if(o==="out_nodes")a=i.outNodeArcs(t).filter(([d])=>ue(i.nodes.get(d).tag,Z(n,"tag","*"),r)).length;else if(o==="in_nodes")a=i.inNodeArcs(t).filter(([d])=>ue(i.nodes.get(d).tag,Z(n,"tag","*"),r)).length;else if(o==="node_tag"){const d=Z(n,"equals");if(d!=null&&s.tag!==Number(d))return!1;l=!0}else if(o==="payload_norm"){const d=Math.hypot(...Array.from(s.payload));if(!pe(d,n))return!1;l=!0}else if(o==="age"){if(!pe(i.step-s.born,n))return!1;l=!0}else if(o==="since_inflow"){const d=i.inArcs(t);let c=s.born;for(const f of d){const b=i.arcs.get(f);b.clock>c&&(c=b.clock)}if(!pe(i.step-c,n))return!1;l=!0}else if(o==="co_in_nodes"){const d=Number(Z(n,"k",2));a=vt(i,t,d).length}else if(o==="common_in"){const d=Number(Z(n,"k",2)),c=new Set(i.inNodes(t));let f=0;for(const b of i.outNodes(t)){const m=new Set(i.inNodes(b));let p=0;for(const u of c)m.has(u)&&p++;p>=d&&f++}a=f}else if(o==="payload_close"){let d=null;for(const[c]of i.outNodeArcs(t)){if(i.nodes.get(c).tag!==s.tag)continue;let f=0;for(let b=0;b<s.payload.length;b++){const m=i.nodes.get(c).payload[b]-s.payload[b];f+=m*m}f=Math.sqrt(f),(d===null||f<d)&&(d=f)}if(d===null||!pe(d,n))return!1;l=!0}else if(o==="child_tag_match")a=i.inNodeArcs(t).filter(([d])=>i.nodes.get(d).tag===s.tag).length;else if(o==="free_nodes"){const d=i.caps.maxNodes;d===void 0?l=!0:a=d-i.nodes.size}else if(o==="free_arcs"){const d=i.caps.maxArcs;d===void 0?l=!0:a=d-i.arcs.size}else throw new Error(`unknown predicate channel ${o}`);if(!l&&!pe(a,n))return!1}return!0}function ni(i,e,t){if(e.pool==="out_nodes")return i.outNodeArcs(t).map(([s])=>s);if(e.pool==="in_nodes")return i.inNodeArcs(t).map(([s])=>s);if(e.pool==="out_arcs")return[...i.outArcs(t)];if(e.pool==="in_arcs")return[...i.inArcs(t)];if(e.pool==="co_in_nodes"){const s=typeof e.tag=="number"?e.tag:2;return vt(i,t,s)}if(e.pool==="bond_same")return si(i,t);if(e.pool==="clones"){const s=[],n=i.nodes.get(t).tag;for(const[o]of i.outNodeArcs(t))i.nodes.get(o).tag===n&&s.push(o);if(e.within!==null){const o=i.nodes.get(t).payload;return s.filter(r=>{const a=i.nodes.get(r).payload;let l=0;for(let d=0;d<o.length;d++){const c=a[d]-o[d];l+=c*c}return Math.sqrt(l)<=e.within})}return s}if(e.pool==="new"||e.pool==="none")return[];throw new Error(`unknown pool ${e.pool}`)}function De(i,e,t){if(typeof e=="object"&&e!==null){if(e.anchor)return t.anchor;if("role"in e){const s=t.roles.get(e.role);if(s==null)throw new Error(`role ${e.role} unresolved in ${t.ruleId}@${t.anchor}`);return s}}return e}function Se(i,e,t){if(typeof e=="object"&&e!==null&&"inherit"in e){const s=e.inherit;let n;if(typeof s=="object"&&s!==null)if(s.anchor)n=t.anchor;else if("role"in s){if(n=t.roles.get(s.role),n==null)throw new Error(`inherit from unresolved role ${s.role} in ${t.ruleId}@${t.anchor}`)}else throw new Error(`malformed inherit spec ${JSON.stringify(s)}`);else if(n=t.roles.get(String(s)),n==null)throw new Error(`inherit from unresolved role ${s} in ${t.ruleId}@${t.anchor}`);return i.tagOf(n)}return Number(e)}function gt(i,e,t,s,n,o=0){const r=new Map;for(const a of e.select){if(a.pool==="new"){r.set(a.role,null);continue}let l=ni(i,a,t);for(const b of a.distinctFrom){const m=r.get(b);m!=null&&l.includes(m)&&(l=l.filter(p=>p!==m))}if(l.length===0)return null;if(l.length===1){r.set(a.role,l[0]);continue}let d=null,c=-1;const f=`${e.id}:${a.role}`;for(const b of l){const m=ke(s,n,f,[b],i);m>c&&(d=b,c=m)}r.set(a.role,d)}return{ruleId:e.id,anchor:t,roles:r,payloadSeed:n}}function oi(i,e,t){const s=[];for(const n of e.effect)n.op==="add_node"&&it(i,e,t,n,new Map,s);for(const n of e.effect){if(n.op==="add_node")continue;const o=new Map;for(const[r,a]of Object.entries(n))typeof a=="object"&&a!==null&&o.set(r,De(i,a,t));it(i,e,t,n,o,s)}return s}function it(i,e,t,s,n,o){const r=s.op;if(r==="nop")return;const a=r==="add_node"?l=>De(i,l,t):l=>{for(const[d,c]of Object.entries(s))if(c===l)return n.get(d);return De(i,l,t)};if(r==="add_arc"){const l=a(s.src),d=a(s.dst),c=i.addArc(l,d,Se(i,s.tag??0,t),Number(s.w??1),t.payloadSeed,!!s.unique);o.push({op:"add_arc",args:{id:c===null?null:c.id,src:l,dst:d,tag:c===null?0:c.tag,w:c===null?0:c.w,deduped:c===null}})}else if(r==="del_arc"){const l=a(s.arc);i.isArc(l)&&(i.delArc(l),o.push({op:"del_arc",args:{id:l}}))}else if(r==="del_node"){const l=a(s.node);if(i.isNode(l)){const d=(s.preserveArcTags??[]).map(f=>Number(f)),c=i.isWitnessed(l)&&d.length>0;i.delNode(l,!0,d),o.push({op:"del_node",args:{id:l,retired:c}})}}else if(r==="set_node_tag"){const l=a(s.node),d=i.nodes.get(l).tag,c=Se(i,s.tag,t);i.setNodeTag(l,c),o.push({op:"set_node_tag",args:{id:l,old:d,new:c}})}else if(r==="set_arc_tag"){const l=a(s.arc);if(i.isArc(l)){const d=i.arcs.get(l).tag,c=Se(i,s.tag,t);i.setArc(l,{tag:c}),o.push({op:"set_arc_tag",args:{id:l,old:d,new:c}})}}else if(r==="set_arc_w"){const l=a(s.arc);i.isArc(l)&&(i.setArc(l,{w:Number(s.w)}),o.push({op:"set_arc_w",args:{id:l,w:Number(s.w)}}))}else if(r==="add_node"){const l=s.src!==void 0?a(s.src):t.anchor,d=i.isNode(l)?i.nodes.get(l).tag:0,c=Se(i,s.tag??d,t),f=i.isNode(l)?i.nodes.get(l).payload:null,b=.02*(ke(t.payloadSeed,0,"jitter",[l],i)-.5),m=f===null?new Float64Array(i._dim):(()=>{const u=new Float64Array(f.length);for(let g=0;g<f.length;g++)u[g]=f[g]+b;return u})(),p=i.addNode(c,m,t.payloadSeed);s.role&&t.roles.set(String(s.role),p.id),o.push({op:"add_node",args:{id:p.id,tag:c,parent:l}})}else throw new Error(`unknown effect op ${r}`)}class ri{constructor(e,t,s=0,n=!0){y(this,"sites",[]);y(this,"byRule",new Map);y(this,"stateHash");this.stateHash=e.graphHash();const o=[],r=new Map;for(const a of t.active()){const l=[];for(const d of[...e.nodes.keys()].sort((c,f)=>c-f))ii(e,a,d)&&(n?gt(e,a,d,s,e.step)!==null&&l.push(d):l.push(d));if(l.length>0){r.set(a.id,l);for(const d of l)o.push({ruleId:a.id,anchor:d})}}o.sort((a,l)=>{const d=J(e.structuralDigest(a.anchor,1)),c=J(e.structuralDigest(l.anchor,1));return d!==c?d<c?-1:1:a.ruleId<l.ruleId?-1:a.ruleId>l.ruleId?1:0}),this.sites=o,this.byRule=r}get length(){return this.sites.length}get rulesPresent(){return[...this.byRule.keys()].sort()}histogram(){const e={};for(const t of this.sites)e[t.ruleId]=(e[t.ruleId]??0)+1;return e}share(){const e=Math.max(this.sites.length,1),t=this.histogram(),s={};for(const n of Object.keys(t))s[n]=t[n]/e;return s}coverage(e){return e<=0?0:this.byRule.size/e}sample(e,t){if(this.sites.length===0)return null;let s=null,n=-1;for(const o of this.sites){const r=ke(e,t.step,"site",[o.anchor],t);r>n&&(s=o,n=r)}return s}sampleWeighted(e,t,s){if(this.sites.length===0)return null;let n=null,o=-1;for(const r of this.sites){const l=Math.max(Number(s[r.ruleId]??1),1e-12)*ke(e,t.step,`site:${r.ruleId}`,[r.anchor],t);l>o&&(n=r,o=l)}return n}canonicalKey(e){const t=[];for(const o of this.sites)t.push(z(o.ruleId)),t.push(z(bt(o,e)));const s=new Uint8Array(t.reduce((o,r)=>o+r.length,0));let n=0;for(const o of t)s.set(o,n),n+=o.length;return J(me(s,16))}summary(e){return{size:this.sites.length,rulesPresent:this.rulesPresent,histogram:this.histogram(),canonicalKey:this.canonicalKey(e)}}}function bt(i,e){const t=e.structuralDigest(i.anchor,1);return`${i.ruleId}@${J(t).slice(0,16)}`}class yt{constructor(e,t,s=0,n="uniform",o=!0,r=1){y(this,"state");y(this,"ruleset");y(this,"seed");y(this,"policy");y(this,"recordEvents");y(this,"capCheckEvery");y(this,"events",[]);y(this,"halt",null);y(this,"_rrCursor",0);y(this,"_rrOrder",[]);y(this,"activity",new Map);if(!["canonical","uniform","weighted","roundrobin"].includes(n))throw new Error(`unknown policy ${n}`);this.state=e,this.ruleset=t,this.seed=s,this.policy=n,this.recordEvents=o,this.capCheckEvery=Math.max(1,r)}_noteActivity(e,t){for(const s of this.ruleset.active())this.activity.has(s.id)||this.activity.set(s.id,{eligible:0,applied:0});for(const[s,n]of e.byRule.entries())this.activity.has(s)||this.activity.set(s,{eligible:0,applied:0}),this.activity.get(s).eligible+=n.length;t!==null&&(this.activity.has(t)||this.activity.set(t,{eligible:0,applied:0}),this.activity.get(t).applied+=1)}_select(e){if(e.length===0)return null;const t=this.state;if(this.policy==="canonical")return[...e.sites].reduce((l,d)=>{const c=J(t.structuralDigest(l.anchor,1));return J(t.structuralDigest(d.anchor,1))<c?d:l});if(this.policy==="uniform")return e.sample(this.seed,t);if(this.policy==="weighted"){const l={};for(const d of this.ruleset.rules)l[d.id]=d.weight;return e.sampleWeighted(this.seed,t,l)}const s=this.ruleset.active().filter(l=>e.byRule.has(l.id)).map(l=>l.id);if(s.length===0)return null;s.join(",")!==this._rrOrder.join(",")&&(this._rrOrder=s,this._rrCursor=0);const n=s[this._rrCursor%s.length];this._rrCursor+=1;const o=e.byRule.get(n);let r=null,a="";for(const l of o){const d=J(t.structuralDigest(l,1));(r===null||d<a)&&(r=l,a=d)}return{ruleId:n,anchor:r}}step(){const e=this.state;e.step+=1;const t=new ri(e,this.ruleset,this.seed,!0),s=this._select(t);if(this._noteActivity(t,s?s.ruleId:null),!s)return this.halt={step:e.step-1,reason:"no_enabled_site",detail:{space:t.length}},null;const n=bt(s,e),o=this.ruleset.get(s.ruleId),r=gt(e,o,s.anchor,this.seed,e.step);if(!r)return this.halt={step:e.step-1,reason:"site_not_instantiable",detail:{site:n}},null;const a=oi(e,o,r);this.capCheckEvery&&e.step%this.capCheckEvery===0&&e.validate();const l={step:e.step,ruleId:o.id,anchor:s.anchor,edits:a,siteKey:n};return this.recordEvents&&this.events.push(l),l}run(e,t=null,s=!0){const n=[];for(let o=0;o<e;o++){const r=this.step();if(!r)break;n.push(r),t&&t(this.state,r.step)}return s||(this.halt=null),n}ruleUsage(){const e={};for(const t of this.events)e[t.ruleId]=(e[t.ruleId]??0)+1;return Object.fromEntries(Object.entries(e).sort())}editUsage(){const e={};for(const t of this.events)for(const s of t.edits)e[s.op]=(e[s.op]??0)+1;return Object.fromEntries(Object.entries(e).sort())}activityReport(e=null){const t=[...this.activity.values()].reduce((r,a)=>r+a.eligible,0),s=[...this.activity.values()].reduce((r,a)=>r+a.applied,0),n=e??Math.max(s+this.events.length,1),o={_totalApplied:s,_totalEligible:t,_nSteps:n};for(const[r,a]of[...this.activity.entries()].sort()){const l=t>0?n*a.eligible/t:0;o[r]={eligible:a.eligible,applied:a.applied,share:s>0?a.applied/s:0,expectedUniform:l,enrichment:l>0?a.applied/l:null}}return o}}function Pe(){const i=ht,e=mt,t=[{id:"GATHER",desc:"Hub reinforcement. Two supporters of the same hub become directly connected.",match:[i({channel:"in_nodes",min:2})],select:[e({role:"a",pool:"in_nodes"}),e({role:"b",pool:"in_nodes",distinctFrom:["a"]})],effect:[{op:"add_arc",src:{role:"a"},dst:{role:"b"},tag:ei,w:.6,unique:!0}],weight:1},{id:"BOND",desc:"Cycle closure. The anchor and an out-neighbour that share two in-neighbours are linked directly.",match:[i({channel:"co_in_nodes",k:2,min:1})],select:[e({role:"y",pool:"co_in_nodes",tag:$e})],effect:[{op:"add_arc",src:{anchor:!0},dst:{role:"y"},tag:$e,w:.4,unique:!0}],weight:1},{id:"TAG_PROP",desc:"Contextual relabelling. The anchor copies the label of one of its out-neighbours.",match:[i({channel:"out_nodes",min:1})],select:[e({role:"teacher",pool:"out_nodes"})],effect:[{op:"set_node_tag",node:{anchor:!0},tag:{inherit:{role:"teacher"}}}],weight:1},{id:"QUIET",desc:"Starvation. A node that has received nothing for 30 steps is marked QUIET.",match:[i({channel:"since_inflow",min:30})],select:[],effect:[{op:"set_node_tag",node:{anchor:!0},tag:et}],weight:1},{id:"DESCEND",desc:"Birth with inheritance. A starved QUIET node with headroom spawns a child.",match:[i({channel:"node_tag",equals:et}),i({channel:"free_nodes",min:1}),i({channel:"free_arcs",min:2})],select:[],effect:[{op:"add_node",role:"child",tag:{inherit:{anchor:!0}},src:{anchor:!0}},{op:"add_arc",src:{anchor:!0},dst:{role:"child"},tag:fe,w:.9,unique:!0}],weight:1},{id:"FUSE",desc:"Identity fusion. Two siblings (same parent via DESCEND) with same label and close payload are identified.",match:[i({channel:"out_arcs",tag:fe,min:2}),i({channel:"payload_close",max:.05})],select:[e({role:"survivor",pool:"clones",within:.05}),e({role:"twin",pool:"clones",within:.05,distinctFrom:["survivor"]})],effect:[{op:"add_arc",src:{role:"twin"},dst:{role:"survivor"},tag:re,w:1,unique:!0},{op:"del_node",node:{role:"twin"},preserveArcTags:[re]}],weight:1}];return new qe(t,63)}function ai(i){const e=new Map,t=new Map;for(const s of i.nodes.keys())e.set(s,0),t.set(s,0);for(const s of i.arcs.values())i.isNode(s.src)&&i.isNode(s.dst)&&(e.set(s.src,(e.get(s.src)??0)+1),t.set(s.dst,(t.get(s.dst)??0)+1));return[t,e]}function li(i){const e=[...i.values()];if(e.length===0)return{mean:0,var:0,max:0,gini:0,cv:0};const t=e.sort((f,b)=>f-b),s=t.length,n=t.reduce((f,b)=>f+b,0),o=n/s,r=t.reduce((f,b)=>f+(b-o)**2,0)/s,a=t[s-1];let l=0;if(n>0){let f=0;for(let b=0;b<s;b++)f+=(2*(b+1)-s-1)*t[b];l=f/(s*n)}const d=Math.sqrt(r),c=o>0?d/o:0;return{mean:o,var:r,max:a,gini:l,cv:c}}function Fe(i){const e=new Map;function t(d){e.has(d)||e.set(d,d);let c=d;for(;e.get(c)!==c;)c=e.get(c);for(;e.get(d)!==d;){const f=e.get(d);e.set(d,c),d=f}return c}function s(d,c){const f=t(d),b=t(c);f!==b&&e.set(b,f)}const n=[...i.nodes.keys(),...i.arcs.keys()];for(const d of n)t(d);for(const d of i.arcs.values())s(d.src,d.dst);const o=new Set(n.map(d=>t(d))),r=[...o].sort((d,c)=>d-c),a=new Map(r.map((d,c)=>[d,c])),l=new Map;for(const d of n)l.set(d,a.get(t(d)));return[o.size,l]}function Be(i){const[e]=Fe(i),t=i.nodes.size+i.arcs.size,s=i.arcs.size-t+e;return[e,Math.max(s,0)]}function di(i,e){const t=new Map;for(const[a,l]of e.entries())i.nodes.has(a)&&t.set(l,(t.get(l)??0)+1);if(t.size===0)return{n:0,max:0,mean:0,entropy:0,largestFrac:0};const s=[...t.values()].reduce((a,l)=>a+l,0),n=Math.max(...t.values()),o=s/t.size;let r=0;for(const a of t.values()){const l=a/s;r-=l*Math.log(l+1e-300)}return{n:t.size,max:n,mean:o,entropy:r,largestFrac:n/s}}function je(i){const e=[...i].filter(n=>n>0);if(e.length===0)return 0;const t=e.reduce((n,o)=>n+o,0);let s=0;for(const n of e){const o=n/t;s-=o*Math.log(o)}return s}function xt(i,e,t=1){const s=[...i.nodes.keys()].sort((p,u)=>p-u),n=s.length;if(n===0)return 0;const o=new Map(s.map((p,u)=>[p,u])),r=new Float64Array(n*n);for(const p of i.arcs.values())if(i.isNode(p.src)&&i.isNode(p.dst)&&p.src!==p.dst){const u=o.get(p.src),g=o.get(p.dst);r[u*n+g]+=1,r[g*n+u]+=1}const a=new Float64Array(n);let l=0;for(let p=0;p<n;p++){for(let u=0;u<n;u++)a[p]+=r[p*n+u];l+=a[p]}if(l<=0)return 0;const d=new Int32Array(n);for(let p=0;p<n;p++)d[p]=p;const c=[];for(let p=0;p<n;p++){const u=[];for(let g=0;g<n;g++)r[p*n+g]>0&&g!==p&&u.push(g);c.push(u)}for(let p=0;p<20;p++){let u=!1;const g=new Float64Array(n);for(let v=0;v<n;v++)g[d[v]]+=a[v];for(let v=0;v<n;v++){const k=d[v];g[k]-=a[v];const x=new Map;for(const A of c[v]){const M=d[A];x.set(M,(x.get(M)??0)+r[v*n+A])}const I=t*a[v]/l;let w=k,h=(x.get(k)??0)-I*g[k];for(const[A,M]of[...x.entries()].sort((S,E)=>S[0]-E[0])){if(A===k)continue;const S=M-I*g[A];S>h+1e-15&&(h=S,w=A)}d[v]=w,g[w]+=a[v],w!==k&&(u=!0)}if(!u)break}const f=new Map;let b=0;for(let p=0;p<n;p++)f.has(d[p])||f.set(d[p],b++);for(let p=0;p<n;p++)d[p]=f.get(d[p]);let m=0;for(let p=0;p<n;p++)for(let u=0;u<n;u++)d[p]===d[u]&&(m+=r[p*n+u]-t*a[p]*a[u]/l);return m/l}function Ae(i,e=fe){const t=new Map;for(const s of i.arcs.values())if(s.tag===e&&i.isNode(s.src)&&i.isNode(s.dst)){const n=t.get(s.src)??[];n.push(s.dst),t.set(s.src,n)}for(const[s,n]of t.entries())n.sort((o,r)=>o-r);return t}function ci(i,e=fe){const t=new Map,s=new Set,n=Ae(i,e);for(const[o,r]of n.entries())for(const a of r)t.has(a)&&t.get(a)!==o&&s.add(a),t.has(a)||t.set(a,o);return{map:t,ambiguous:s}}function ui(i,e=fe){const t=Ae(i,e),s=new Map,n=new Map,o=[],r=[];function a(l){s.set(l,1),r.push(l);let d=0;for(const c of t.get(l)??[]){if(!i.nodes.has(c))continue;const f=s.get(c)??0;if(f===0){const b=a(c);b>=0&&(d=Math.max(d,b+1))}else if(f===1){const b=r.indexOf(c),m=[...r.slice(b),c];(m.length>2||m.length===2)&&o.push(m)}else{const b=n.get(c)??0;b>=0&&(d=Math.max(d,b+1))}}return r.pop(),s.set(l,2),n.set(l,d),d}for(const l of[...i.nodes.keys()].sort((d,c)=>d-c))(s.get(l)??0)===0&&a(l);return{depth:n,cycles:o}}function pi(i,e=re){const t=new Set;for(const d of i.nodes.keys())t.add(d);for(const d of i.arcs.values())d.tag===e&&((i.isNode(d.src)||i.isRetired(d.src))&&t.add(d.src),(i.isNode(d.dst)||i.isRetired(d.dst))&&t.add(d.dst));const s=new Map;for(const d of t)s.set(d,d);function n(d){for(;s.get(d)!==d;)s.set(d,s.get(s.get(d))),d=s.get(d);return d}for(const d of i.arcs.values())if(d.tag===e&&s.has(d.src)&&s.has(d.dst)){const c=n(d.src),f=n(d.dst);c!==f&&s.set(f,c)}const r=[...new Set([...t].map(d=>n(d)))].sort((d,c)=>d-c),a=new Map(r.map((d,c)=>[d,c])),l=new Map;for(const d of t)l.set(d,a.get(n(d)));return l}function te(i,e=null){const{depth:t,cycles:s}=ui(i),n=pi(i),o=new Map;for(const[,w]of n.entries())o.set(w,(o.get(w)??0)+1);const r=[...t.values()],a=[...o.values()].filter(w=>w>1).length,l=[...o.values()].filter(w=>w>1).reduce((w,h)=>w+h,0),d=i.nodes.size+i.retired.size,c=d>0?l/d:0,f=d-o.size;let b=NaN;if(e&&e.length>0){const w=fi(e);if(w.length>0){const h=new Set;for(const A of w)for(const M of A.deleted)n.has(M)&&h.add(M);for(const A of w)for(const M of A.equivArcs){const S=i.arcs.get(M);if(S)for(const E of[S.src,S.dst])n.has(E)&&h.add(E)}h.size>0&&(b=new Set([...h].map(M=>n.get(M))).size/w.length)}}let m=0;if(r.length>0){const w=new Map;for(const h of r)w.set(h,(w.get(h)??0)+1);m=je([...w.values()])}let p=0;o.size>0&&(p=je([...o.values()]));const u=r.filter(w=>w===0).length,g=r.length>0?Math.max(...r):0,v=r.length>0?r.reduce((w,h)=>w+h,0)/r.length:0,{map:k}=ci(i),x=[...k.entries()].filter(([w])=>[...Ae(i).values()].filter(h=>h.includes(w)).length>1).length,I=[...i.arcs.values()].filter(w=>w.tag===re).length;return{nDescentArcs:Ae(i).size,nRoots:u,maxDepth:g,meanDepth:v,depthEntropy:m,nLineageCycles:s.length,longestCycle:s.length>0?Math.max(...s.map(w=>w.length-1)):0,nParents:k.size,nAmbiguousChildren:x,nIdentityClasses:o.size,nFusionClasses:a,fusedNodes:l,fusedFraction:c,classReduction:f,largestClass:o.size>0?Math.max(...o.values()):0,classSizeEntropy:p,equivArcs:I,retiredIds:i.retired.size,closureRatio:b}}function fi(i){const e=[];for(const t of i){new Set(t.edits.map(r=>r.op));const s=t.edits.filter(r=>r.op==="set_arc_tag"&&r.args.new===re),n=t.edits.filter(r=>r.op==="del_node"),o=t.edits.filter(r=>r.op==="add_arc"&&r.args.tag===re);(s.length>0||n.length>0&&o.length>0||o.length>0)&&e.push({step:t.step,ruleId:t.ruleId,anchor:t.anchor,deleted:n.map(r=>r.args.id),equivArcs:[...o,...s].map(r=>r.args.id)})}return e}function wt(){const i={degreeTables:ai,degreeMoments:li,components:Fe,beta0Beta1:Be,componentSizeProfile:di,shannonEntropy:je,modularity:xt};return{n_nodes:e=>e.nodes.size,n_arcs:e=>e.arcs.size,arc_density:e=>e.arcs.size/Math.max(e.nodes.size,1),beta0:e=>i.beta0Beta1(e)[0],beta1:e=>i.beta0Beta1(e)[1],mean_in_degree:e=>i.degreeMoments(i.degreeTables(e)[0]).mean,mean_out_degree:e=>i.degreeMoments(i.degreeTables(e)[1]).mean,max_in_degree:e=>i.degreeMoments(i.degreeTables(e)[0]).max,gini_in_degree:e=>i.degreeMoments(i.degreeTables(e)[0]).gini,largest_component_frac:e=>{const[,t]=i.components(e);return i.componentSizeProfile(e,t).largestFrac},tag_entropy:e=>{const t=new Map;for(const s of e.nodes.values())t.set(s.tag,(t.get(s.tag)??0)+1);return i.shannonEntropy([...t.values()])},mean_lineage_depth:e=>te(e).meanDepth,max_lineage_depth:e=>te(e).maxDepth,n_identity_classes:e=>te(e).nIdentityClasses,n_fusion_classes:e=>te(e).nFusionClasses,fused_nodes:e=>te(e).fusedNodes,fused_fraction:e=>te(e).fusedFraction}}function nt(i,e=null){const t=e??wt(),s={};for(const n of Object.keys(t).sort())s[n]=t[n](i);return s}const X={nNodes:30,nArcs:60,dim:4,seed:11,steps:100,policy:"uniform",tagSpread:1,maxNodes:160,maxArcs:700,recordEvery:1},hi={level:3,summary:"Direct algorithmic port of The Box kernel, rules, engine, identity and observables; I/O boundary adapted (no numpy, no YAML loader, no null-model battery)",details:["Arc-incidence multi-digraph kernel with invariants I1–I4 (shared id space, arcs-onto-arcs, retired/witness handling)","Six foundry rules (GATHER, BOND, TAG_PROP, QUIET, DESCEND, FUSE) as data structures identical to foundry.yaml","unit_hash determinism: every random draw = BLAKE2b(seed||step||purpose||structural_digest) / 2^64, relabelling-equivariant","4 engine policies (canonical/uniform/weighted/roundrobin), step-by-step event log, activity tracking","Possibility Space: finite, exactly enumerable, seed-independent site enumeration","Identity & lineage: descent_map, parents, lineage_depths with cycle detection, identity_classes (incl. retired endpoints), fused_fraction","Structural metrics: degree tables (Gini), union-find components, Euler-exact beta0/beta1, component profile, deterministic Louvain modularity","Named observables library (14 metrics) and observe() snapshot","Adaptations: pure-TS BLAKE2b replaces hashlib.blake2b; Float64Array replaces NumPy; rules hard-coded (no YAML loader); no null-model/Koopman/classifier experiment layer"]};class mi{constructor(){y(this,"name","the-box");y(this,"version","0.1.0");y(this,"fidelity",hi)}validate(e){if(e===null||typeof e!="object")throw new Error("TheBoxModel.validate: input must be an object");const t=e,s={nNodes:Number(t.nNodes??X.nNodes),nArcs:Number(t.nArcs??X.nArcs),dim:Number(t.dim??X.dim),seed:Number(t.seed??X.seed),steps:Number(t.steps??X.steps),policy:t.policy??X.policy,tagSpread:Number(t.tagSpread??X.tagSpread),maxNodes:Number(t.maxNodes??X.maxNodes),maxArcs:Number(t.maxArcs??X.maxArcs),recordEvery:Number(t.recordEvery??X.recordEvery)};if(!Number.isFinite(s.nNodes)||s.nNodes<1)throw new Error("TheBoxModel.validate: nNodes must be a positive integer");if(!Number.isFinite(s.nArcs)||s.nArcs<0)throw new Error("TheBoxModel.validate: nArcs must be non-negative");if(!["canonical","uniform","weighted","roundrobin"].includes(s.policy))throw new Error("TheBoxModel.validate: policy must be canonical|uniform|weighted|roundrobin");if(!Number.isFinite(s.steps)||s.steps<0)throw new Error("TheBoxModel.validate: steps must be non-negative");if(!Number.isFinite(s.dim)||s.dim<1)throw new Error("TheBoxModel.validate: dim must be a positive integer");if(!Number.isFinite(s.tagSpread)||s.tagSpread<1)throw new Error("TheBoxModel.validate: tagSpread must be a positive integer");if(!Number.isFinite(s.maxNodes)||s.maxNodes<1)throw new Error("TheBoxModel.validate: maxNodes must be a positive integer");if(!Number.isFinite(s.maxArcs)||s.maxArcs<1)throw new Error("TheBoxModel.validate: maxArcs must be a positive integer");if(!Number.isFinite(s.recordEvery)||s.recordEvery<1)throw new Error("TheBoxModel.validate: recordEvery must be a positive integer");return s}run(e){const t=this.validate(e),s=Pe(),n=se.random(t.nNodes,t.nArcs,t.dim,t.seed,t.tagSpread,{maxNodes:t.maxNodes,maxArcs:t.maxArcs}),o=new yt(n,s,t.seed,t.policy,!0,1),r=wt(),a=[],l=(p,u,g,v,k)=>{const x=nt(n,r);a.push({step:p,ruleId:u,anchor:g,graphHash:n.graphHash(),observables:x,nNodes:n.nodes.size,nArcs:n.arcs.size,edits:v,siteKey:k})};l(0,null,null,[],null);const d=(p,u)=>{if(u%t.recordEvery===0){const g=o.events[o.events.length-1];l(u,g.ruleId,g.anchor,g.edits,g.siteKey)}};o.run(t.steps,d);const c=o.state,f=nt(c,r),b={nNodes:c.nodes.size,nArcs:c.arcs.size,step:c.step,graphHash:c.graphHash(),beta0:Be(c)[0],beta1:Be(c)[1],modularity:xt(c,Fe(c)[1])};return{input:t,stages:a,final:{graphHash:c.graphHash(),nNodes:c.nodes.size,nArcs:c.arcs.size,step:c.step,halt:o.halt,identity:te(c,o.events),structure:b,observables:f},determinism:{seed:t.seed,reproducible:!0,note:"Same (input, seed, ruleset) => identical trajectory; unit_hash keys on structural_digest, not object ids"},rulesUsed:o.ruleUsage(),editsUsed:o.editUsage(),complexity:"O(steps × |sites|) per trajectory; site enumeration O(rules × nodes × predicates)",equations:["unit_hash(seed, step, purpose, candidates) = BLAKE2b(seed||step||purpose||structural_digest(c)) / 2^64","graph_hash = BLAKE2b-32(sorted nodes + sorted arcs + retired ids)","structural_digest(oid, hops) = BLAKE2b-16(ball(oid, hops) sorted by sub-digest)","beta1 = |arcs| - |objects| + beta0  (Euler-exact on incidence graph)"]}}reset(){}}function vi(i){i.innerHTML=`
    <div class="grid-4">
      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Wi-Fi Time Machine</div>
            <div class="card-subtitle">Wireless environment history · TypeScript · SQLite concepts</div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Historial continuo del entorno inalámbrico local (APs, canales, bandas, RSSI, seguridad);
          reproducción y visualización de cómo cambia el entorno con el tiempo. Mapeo freq→canal,
          exportación con desinfección SHA-256. Reconstrucción determinista desde código fuente.
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-blue);">18 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">Zero deps</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/wifi-time-machine" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">BLE Radar</div>
            <div class="card-subtitle">Bluetooth LE visualization · TypeScript · deterministic demo</div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Radar terminal para el entorno BLE: blips con anillos de fuerza RSSI, máquinas de estado de
          ciclo de vida de dispositivos, historial en SQLite, reproducción de sesiones. Honestidad de
          señal: RSSI es fuerza, no distancia.
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">16 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">Demo mode</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/ble-radar" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Process Ecosystem Monitor</div>
            <div class="card-subtitle">Linux process visualization · TypeScript · /proc concepts</div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Convierte el árbol de procesos de Linux en un ecosistema vivo: nacimientos, muertes,
          rehuérfanos, CPU% mediante delta de jiffies, árbol de procesos, anillos de historial.
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">22 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">/proc parsing</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/process-ecosystem-monitor" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">Terminal Generative Engine</div>
            <div class="card-subtitle">Procedural art · TypeScript · splitmix64 RNG</div>
          </div>
          <span class="fidelity-badge fidelity-4">Level 4</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Gráficos generativos procedimentales deterministas: flowfield (campo analítico de senos),
          plasma (campos de color cerrados), attractor (mapa extraño de Clifford/Dejong).
          Semilla compartible, búsqueda O(1) de frames, huella dactilar SHA-256.
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">24 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">Zero deps</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/terminal-generative-engine" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>

      <div class="card">
        <div class="card-header">
          <div>
            <div class="card-title">The Box</div>
            <div class="card-subtitle">Arc-incidence multi-digraph · 6 rules · identity & lineage</div>
          </div>
          <span class="fidelity-badge fidelity-3">Level 3</span>
        </div>
        <p style="color:var(--text-muted); font-size:13px; margin-bottom:16px;">
          Sustrato relacional computacional: seis reglas de reescritura (GATHER, BOND, TAG_PROP,
          QUIET, DESCEND, FUSE), espacio de posibilidades, identidad y linaje derivados,
          métricas estructurales, observables nombrados. Fidelity Level 3: BLAKE2b puro TS
          (no byte-compatible con Python hashlib.blake2b).
        </p>
        <div style="display:flex; gap:8px; flex-wrap:wrap; margin-bottom:16px;">
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-green);">42 tests</span>
          <span style="font-family:var(--mono); font-size:11px; background:#1a1a1e; padding:4px 8px; border:1px solid var(--panel-border); border-radius:4px; color:var(--fg-amber);">Level 3</span>
        </div>
        <a href="https://github.com/ThorrijaDEV/the-box" target="_blank" rel="noopener" style="font-family:var(--mono); font-size:12px; color:var(--fg-cyan); text-decoration:none;">Ver repositorio →</a>
      </div>
    </div>

    <div class="card mt-16">
      <div style="display:flex; justify-content:space-between; align-items:flex-start; gap:24px;">
        <div style="flex:1;">
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);">Engineering concepts</h3>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li>Deterministic lifecycle state machines (BLE: appeared→active→fading→disappeared)</li>
            <li>CPU accounting based on jiffies with per-core normalization (PEM)</li>
            <li>RSSI EMA smoothing (alpha=0.4) and strength bands, not distance (BLE)</li>
            <li>802.11 frequency-to-channel mapping for 2.4/5/6 GHz (WTM)</li>
            <li>Stateless splitmix64 RNG: O(1)-seekable frames (GenArt)</li>
            <li>/proc parsing with nested-paren comm handling (PEM)</li>
            <li>SHA-256 truncated address sanitization (WTM, BLE)</li>
            <li>Arc-incidence multi-digraph with shared id space (The Box)</li>
          </ul>
        </div>
        <div style="flex:0 0 300px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:20px;">
          <h4 style="font-size:13px; color:var(--fg-cyan); margin-bottom:12px; font-family:var(--mono); text-transform:uppercase;">Reconstruction methodology</h4>
          <p style="color:var(--text-muted); font-size:12px; line-height:1.6; margin-bottom:16px;">
            Each model is an independent reconstruction from the original source code. The original
            project is not executed. All outputs are computed from the model. No hardcoded outputs.
          </p>
          <h4 style="font-size:13px; color:var(--fg-cyan); margin-bottom:12px; font-family:var(--mono); text-transform:uppercase;">Fidelity classification</h4>
          <p style="color:var(--text-muted); font-size:12px; line-height:1.6;">
            <strong>Level 4</strong>: direct algorithmic reproduction. I/O boundary adapted to deterministic inputs.<br>
            <strong>Level 3</strong> (The Box): faithful port with documented simplifications — pure-TS BLAKE2b,
            Float64Array instead of NumPy, hard-coded foundry rules.
          </p>
        </div>
      </div>
    </div>
  `}function gi(i){const e=new os,t=`BSS 11:22:33:44:55:66(Onboard)
	freq: 2412
	signal: -45
	SSID: Home-Network
	DS Parameter set: channel 1
	RSN:
		Authentication suites: 00-0f-ac:2
BSS aa:bb:cc:dd:ee:ff(Onboard)
	freq: 5180
	signal: -60
	SSID: Office-5G
	DS Parameter set: channel 36
	WPA:
		Authentication suites: 00-0f-ac:8
BSS 00:11:22:33:44:55(Onboard)
	freq: 5925
	signal: -70
	SSID: Six-G
`;i.innerHTML=`
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Entrada de escaneo</div>
              <div class="card-subtitle">Fixture sintética de iw dump o nmcli</div>
            </div>
          </div>
          <textarea id="wtm-iw-input" rows="14" style="width:100%; font-family:var(--mono); font-size:11px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); color:var(--text); padding:12px; resize:vertical;">${t}</textarea>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">Backend</label>
            <select id="wtm-backend" style="margin-left:8px;">
              <option value="iw">iw</option>
              <option value="nmcli">nmcli</option>
            </select>
            <label style="margin-left:24px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Sanitizar BSSIDs</label>
            <input type="checkbox" id="wtm-sanitize" style="margin-left:6px;">
          </div>
          <button id="wtm-run" class="btn primary">Ejecutar modelo</button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Etapas intermedias</div>
              <div class="card-subtitle">Cada etapa del cálculo, no solo el resultado final</div>
            </div>
          </div>
          <div id="wtm-stages" style="font-family:var(--mono); font-size:12px; color:var(--text-muted);">
            <div class="stage-row"><span class="stage-chip">Esperando ejecución...</span></div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Mapa de calor de tiempo (timeline)</div>
              <div class="card-subtitle">Filas: redes · Columnas: buckets de tiempo · Glifo: señal media · Blanco: no observado</div>
            </div>
          </div>
          <div class="canvas-container" style="height:320px;">
            <canvas id="wtm-timeline-canvas"></canvas>
          </div>
          <div id="wtm-timeline-footer" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); margin-top:8px;"></div>
        </div>

        <div class="grid-2" style="gap:16px;">
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Actividad por canal</div>
                <div class="card-subtitle">Conteo de observaciones y señal media por canal 802.11</div>
              </div>
            </div>
            <pre id="wtm-channels" style="font-size:11px;">—</pre>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Sparkline de señal</div>
                <div class="card-subtitle">Señal a lo largo del tiempo para la red más fuerte</div>
              </div>
            </div>
            <div id="wtm-sparkline" style="font-family:var(--mono); font-size:16px; color:var(--fg-cyan); height:40px; display:flex; align-items:center; gap:2px;"></div>
            <div id="wtm-sparkline-stats" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); margin-top:4px;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title">Exportación</div>
          <div class="card-subtitle">JSON / CSV con opción de desinfección SHA-256</div>
        </div>
      </div>
      <div class="controls mt-8">
        <button id="wtm-export-json" class="btn secondary">Exportar JSON</button>
        <button id="wtm-export-csv" class="btn secondary">Exportar CSV</button>
      </div>
      <pre id="wtm-export-output" style="font-size:11px; max-height:200px; overflow:auto;">—</pre>
    </div>
  `;const s=i.querySelector("#wtm-iw-input"),n=i.querySelector("#wtm-backend"),o=i.querySelector("#wtm-sanitize"),r=i.querySelector("#wtm-run"),a=i.querySelector("#wtm-stages"),l=i.querySelector("#wtm-timeline-canvas"),d=i.querySelector("#wtm-timeline-footer"),c=i.querySelector("#wtm-channels"),f=i.querySelector("#wtm-sparkline"),b=i.querySelector("#wtm-sparkline-stats"),m=i.querySelector("#wtm-export-json"),p=i.querySelector("#wtm-export-csv"),u=i.querySelector("#wtm-export-output");function g(h){const A=h.map(M=>{let S="";return Array.isArray(M.data)?S=`(${M.data.length} items)`:M.data&&typeof M.data=="object"?S=JSON.stringify(M.data).slice(0,120):S=String(M.data??""),`
        <div class="stage-row">
          <span class="stage-chip">${M.name}</span>
          <span class="stage-value">${M.description} ${S?"· "+S:""}</span>
        </div>
      `}).join("");a.innerHTML=A}function v(h,A){if(!h){A.width=A.clientWidth||400,A.height=A.clientHeight||200;const P=A.getContext("2d");P.fillStyle="#0a0a0c",P.fillRect(0,0,A.width,A.height),P.fillStyle="#4a4a55",P.font="12px monospace",P.fillText("(no data)",20,30),d.textContent="";return}const M=window.devicePixelRatio||1,S=A.clientWidth,E=A.clientHeight;A.width=S*M,A.height=E*M;const T=A.getContext("2d");T.scale(M,M),T.fillStyle="#050507",T.fillRect(0,0,S,E);const N=h.rows.length,L=h.nCols,B=150,$=24,G=20,ae=24,q=(S-B-G)/L,H=(E-$-ae)/Math.max(N,1);for(let P=0;P<N;P++){const ee=h.rows[P];for(let _=0;_<L;_++){const D=ee.cells[_],O=B+_*q,F=$+P*H;if(D.observed&&D.avgSignal!==null){const R=D.avgSignal,Y=R>=-50?"#10b981":R>=-60?"#3b82f6":R>=-70?"#a855f7":R>=-80?"#f59e0b":"#ef4444";T.fillStyle=Y,T.globalAlpha=.7}else T.fillStyle="#0a0a0c",T.globalAlpha=1;T.fillRect(O+1,F+1,q-2,H-2),T.globalAlpha=1}}T.fillStyle="#8a8a92",T.font="11px monospace",T.textAlign="right";for(let P=0;P<N;P++){const ee=h.rows[P],_=ee.label.length>28?ee.label.slice(0,25)+"...":ee.label;T.fillText(_,B-8,$+P*H+H/2+4)}T.fillStyle="#8a8a92",T.font="10px monospace",T.textAlign="center";for(let P=0;P<L;P++)if(P%5===0||P===L-1){const ee=h.startEpoch+P*h.bucketSeconds,_=new Date(ee*1e3).toISOString().substr(11,5),D=B+(P+.5)*q;T.fillText(_,D,$-6)}d.textContent=h.footer}function k(h){if(!h||h.length===0){c.textContent="(no data)";return}const A=h.map(M=>{const S="█".repeat(Math.max(1,Math.round(M.count/10*20)));return`ch ${String(M.channel).padStart(2)}  ${S}  ${M.count} obs · avg ${M.avgSignal??"-"} dBm`});c.textContent=A.join(`
`)}function x(h,A){if(!h){f.textContent="(no data)",b.textContent="";return}f.textContent=h.rendered,b.textContent=`${A}: min ${h.min} dBm · max ${h.max} dBm · ${h.values.length} samples`}const I=()=>{var E,T;const h=s.value.trim(),A=n.value,M=o.checked,S={[A==="iw"?"iwDump":"nmcliText"]:h,observedAt:Math.floor(Date.now()/1e3),backend:A,sanitize:M,width:100,labelWidth:22};try{const N=e.run(S);g(N.stages);const L=l;if(L.width=L.clientWidth*(window.devicePixelRatio||1),L.height=L.clientHeight*(window.devicePixelRatio||1),v(N.final.timeline,l),N.final.timeline&&(d.textContent=N.final.timeline.footer),k(N.final.channelStats),N.final.sparkline){const B=N.final.observations.filter($=>{var G;return $.bssid===((G=N.final.networks[0])==null?void 0:G.bssid)&&$.signal!==null}).sort(($,G)=>$.observedAt-G.observedAt).map($=>$.signal);x(N.final.sparkline,((E=N.final.networks[0])==null?void 0:E.ssid)??((T=N.final.networks[0])==null?void 0:T.bssid)??"unknown")}else x(null,"");m.onclick=()=>{u.textContent=N.final.exportJson},p.onclick=()=>{u.textContent=N.final.exportCsv}}catch(N){a.innerHTML=`<div style="color:var(--fg-red);">Error: ${N.message}</div>`}};r.addEventListener("click",I),window.addEventListener("resize",()=>{w.lastOutput&&v(w.lastOutput.final.timeline,l)});let w={lastOutput:null};I()}function bi(i){const e=new xs;i.innerHTML=`
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Configuración de entrada</div>
              <div class="card-subtitle">Observaciones BLE o modo demo determinista</div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Modo demo (segundos sintéticos)</label>
            <input type="number" id="ble-demo-seconds" value="30" min="1" max="300" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Seed</label>
            <input type="number" id="ble-demo-seed" value="7" style="width:70px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">Clock (epoch s)</label>
            <input type="number" id="ble-clock" value="1000000000" style="width:120px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Sweep ángel (°)</label>
            <input type="number" id="ble-sweep" value="0" min="0" max="359" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Sanitizar direcciones</label>
            <input type="checkbox" id="ble-sanitize" style="margin-left:6px;">
          </div>
          <button id="ble-run" class="btn primary">Ejecutar modelo</button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Estado del dispositivo (ciclo de vida)</div>
              <div class="card-subtitle">Estado, RSSI, ·ltimos vistos, trails de histórico</div>
            </div>
          </div>
          <div id="ble-devices" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); max-height:200px; overflow-y:auto;">
            <div style="color:var(--text-muted);">Esperando ejecución...</div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Radar (geometría determinista)</div>
              <div class="card-subtitle">Anillos = fuerza RSSI (NO distancia) · Ángulo = hash de dirección (convención visual)</div>
            </div>
          </div>
          <div class="canvas-container" style="height:360px; display:flex; align-items:center; justify-content:center;">
            <canvas id="ble-radar-canvas" width="400" height="300"></canvas>
          </div>
          <div id="ble-radar-legend" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); margin-top:8px; line-height:1.6;"></div>
        </div>

        <div class="grid-2" style="gap:16px;">
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Resumen de ciclo de vida</div>
                <div class="card-subtitle">Conteo de dispositivos por estado</div>
              </div>
            </div>
            <div id="ble-lifecycle" style="font-family:var(--mono); font-size:13px; line-height:2;"></div>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Reproducción de sesión</div>
                <div class="card-subtitle">Cursor de tiempo sobre observaciones grabadas</div>
              </div>
            </div>
            <div id="ble-replay" style="font-family:var(--mono); font-size:12px; color:var(--text-muted); height:80px; display:flex; align-items:center; justify-content:center;"></div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title">Exportación</div>
          <div class="card-subtitle">JSON / CSV con desinfección de direcciones SHA-256</div>
        </div>
      </div>
      <div class="controls mt-8">
        <button id="ble-export-json" class="btn secondary">Exportar JSON</button>
        <button id="ble-export-csv" class="btn secondary">Exportar CSV</button>
      </div>
      <pre id="ble-export-output" style="font-size:11px; max-height:180px; overflow:auto;">—</pre>
    </div>
  `;const t=i.querySelector("#ble-demo-seconds"),s=i.querySelector("#ble-demo-seed"),n=i.querySelector("#ble-clock"),o=i.querySelector("#ble-sweep"),r=i.querySelector("#ble-sanitize"),a=i.querySelector("#ble-run"),l=i.querySelector("#ble-devices"),d=i.querySelector("#ble-radar-canvas"),c=i.querySelector("#ble-radar-legend"),f=i.querySelector("#ble-lifecycle"),b=i.querySelector("#ble-replay"),m=i.querySelector("#ble-export-json"),p=i.querySelector("#ble-export-csv"),u=i.querySelector("#ble-export-output");function g(k){const x=window.devicePixelRatio||1,I=d.clientWidth||400,w=d.clientHeight||300;d.width=I*x,d.height=w*x;const h=d.getContext("2d");h.scale(x,x),h.clearRect(0,0,I,w);const{cells:A,centerX:M,centerY:S,maxRadius:E}=k,T=I/k.width,N=w/k.height,L=M*T,B=S*N;for(const $ of A){const G=$.col*T,ae=$.row*N;let q="#4a4a55",H=.5;switch($.kind){case"cross":q="#666666",H=.8;break;case"ring":q="#2a2a3a",H=.6;break;case"sweep":q="#06b6d4",H=.8;break;case"trail":q="#5b21b6",H=.4;break;case"marker":q="#10b981",H=.9;break}h.fillStyle=q,h.globalAlpha=H,h.fillRect(Math.floor(G),Math.floor(ae),Math.max(1,T),Math.max(1,N)),h.globalAlpha=1}h.strokeStyle="#666666",h.lineWidth=1,h.beginPath(),h.moveTo(L-10,B),h.lineTo(L+10,B),h.moveTo(L,B-10),h.lineTo(L,B+10),h.stroke(),c.innerHTML=k.legend.map($=>`<div style="margin:2px 0;">${$}</div>`).join("")}function v(){const k=parseInt(n.value,10)||1e9,x=parseFloat(o.value)||0,I=r.checked,w=parseInt(t.value,10)||0,h=parseInt(s.value,10)||7,A={observations:[],now:k,sweepAngle:x,sanitize:I,width:60,height:24};w>0&&(A.demoSeconds=w,A.demoSeed=h);try{const M=e.run(A),S=M.final.devices.map(T=>{const N=T.state==="active"?"#10b981":T.state==="fading"?"#f59e0b":T.state==="disappeared"?"#ef4444":"#a855f7",L=T.rawRssi!==null?`RSSI ${T.rawRssi} dBm`:"—";return`
          <div style="display:flex; justify-content:space-between; padding:4px 0; border-bottom:1px solid #1a1a1e;">
            <span style="color:var(--text);">${T.name||T.address}</span>
            <span style="color:${N}; font-weight:bold;">${T.state}</span>
            <span style="color:var(--text-muted);">${L}</span>
            <span style="color:var(--text-muted);">${T.timesSeen} obs</span>
          </div>
        `}).join("");l.innerHTML=S||"<div style='color:var(--text-muted);'>Sin dispositivos</div>",g(M.final.frame);const E=M.final.lifecycleSummary;if(f.innerHTML=`
        <div><span style="color:#a855f7;">▪ appeared:</span> <span style="color:var(--text);">${E.appeared}</span></div>
        <div><span style="color:#10b981;">▪ active:</span> <span style="color:var(--text);">${E.active}</span></div>
        <div><span style="color:#f59e0b;">▪ fading:</span> <span style="color:var(--text);">${E.fading}</span></div>
        <div><span style="color:#ef4444;">▪ disappeared:</span> <span style="color:var(--text);">${E.disappeared}</span></div>
      `,M.final.replay){const T=M.final.replay;b.innerHTML=`
          <div style="text-align:center;">
            <div style="color:var(--text); font-size:13px;">${T.progress.toFixed(0)}% — t=${Math.round(T.replayT)} / ${T.endT}</div>
            <div style="color:var(--text-muted); font-size:11px;">${T.done?"sesión completada":"en reproducción"}</div>
          </div>
        `}else b.innerHTML="<div style='color:var(--text-muted);'>Sin datos de reproducción</div>";m.onclick=()=>{u.textContent=M.final.exportJson},p.onclick=()=>{u.textContent=M.final.exportCsv}}catch(M){l.innerHTML=`<div style="color:var(--fg-red);">Error: ${M.message}</div>`}}a.addEventListener("click",v),window.addEventListener("resize",()=>g(e.run({observations:[],now:parseInt(n.value)||1e9,sweepAngle:parseFloat(o.value)||0,sanitize:r.checked,width:60,height:24,demoSeconds:parseInt(t.value)||0,demoSeed:parseInt(s.value)||7}).final.frame)),v()}const yi=[{pid:1,ppid:0,comm:"systemd",state:"S",utime:100,stime:10,numThreads:5,starttime:200,vsize:60*1024*1024,rss:60*1024*1024,user:"root"},{pid:2,ppid:0,comm:"kthreadd",state:"S",utime:0,stime:0,numThreads:1,starttime:200,vsize:1*1024*1024,rss:1*1024*1024,user:null},{pid:10,ppid:1,comm:"dbus",state:"S",utime:200,stime:50,numThreads:2,starttime:300,vsize:12*1024*1024,rss:12*1024*1024,user:"dbus"},{pid:100,ppid:10,comm:"browser",state:"R",utime:1e3,stime:200,numThreads:10,starttime:400,vsize:980*1024*1024,rss:980*1024*1024,user:"user"},{pid:110,ppid:100,comm:"renderer",state:"R",utime:800,stime:100,numThreads:4,starttime:450,vsize:210*1024*1024,rss:210*1024*1024,user:"user"}];function xi(i){const e=new _s;i.innerHTML=`
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Entrada de procesos (sintética /proc)</div>
              <div class="card-subtitle">Instantáneas de procesos para este tick</div>
            </div>
          </div>
          <textarea id="pem-snapshots" rows="12" style="width:100%; font-family:var(--mono); font-size:11px; background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); color:var(--text); padding:12px; resize:vertical;">${JSON.stringify(yi,null,2)}</textarea>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Intervalo (s) · CLK_TCK · Núcleos</label>
            <div style="display:flex; gap:12px;">
              <div style="flex:1;"><label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;">intervalSec</label><input type="number" id="pem-interval" value="0.2" step="0.1" style="width:70px; font-family:var(--mono); font-size:12px;"></div>
              <div style="flex:1;"><label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;">clkTick</label><input type="number" id="pem-clktick" value="100" style="width:70px; font-family:var(--mono); font-size:12px;"></div>
              <div style="flex:1;"><label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px;">ncores</label><input type="number" id="pem-ncores" value="1" style="width:70px; font-family:var(--mono); font-size:12px;"></div>
            </div>
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:2px; margin-top:8px;">Wall time (s)</label>
            <input type="number" id="pem-walltime" value="0" style="width:100px; font-family:var(--mono); font-size:12px;">
          </div>
          <button id="pem-run" class="btn primary">Ejecutar tick</button>
          <button id="pem-reset" class="btn secondary">Reiniciar ecosistema</button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Eventos del tick (diff)</div>
              <div class="card-subtitle">Nacimientos, muertes, picos de CPU, huérfanos</div>
            </div>
          </div>
          <div id="pem-diff" style="font-family:var(--mono); font-size:12px; color:var(--text-muted); max-height:200px; overflow-y:auto;">
            <div style="color:var(--text-muted);">Esperando ejecución...</div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Estado de procesos</div>
              <div class="card-subtitle">Ciclo de vida, CPU%, RSS, huérfano, pico</div>
            </div>
          </div>
          <table id="pem-table">
            <thead><tr><th>PID</th><th>Comm</th><th>Estado</th><th>CPU%</th><th>RSS (MB)</th><th>Hilos</th><th>Huérfano</th><th>Pico</th></tr></thead>
            <tbody id="pem-table-body"></tbody>
          </table>
        </div>

        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">&Aacute;rbol de procesos</div>
              <div class="card-subtitle">Raíces, hilos del kernel, memoria RAM del sistema</div>
            </div>
          </div>
          <div id="pem-tree" style="font-family:var(--mono); font-size:12px; color:var(--text-muted); line-height:2; background:#0a0a0c; padding:16px; border-radius:var(--radius); border:1px solid var(--panel-border);">
            <div style="color:var(--text-muted);">Esperando ejecución...</div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title">M&eacutetricas del sistema</div>
          <div class="card-subtitle">CPU %, RAM %, carga, historial de ticks</div>
        </div>
      </div>
      <div class="grid-3">
        <div style="background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:16px;">
          <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); text-transform:uppercase;">CPU sistema</div>
          <div id="pem-sys-cpu" style="font-size:28px; font-weight:700; color:var(--fg-cyan); font-variant-numeric:tabular-nums;">—</div>
        </div>
        <div style="background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:16px;">
          <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); text-transform:uppercase;">RAM sistema</div>
          <div id="pem-sys-ram" style="font-size:28px; font-weight:700; color:var(--fg-green); font-variant-numeric:tabular-nums;">—</div>
        </div>
        <div style="background:#0a0a0c; border:1px solid var(--panel-border); border-radius:var(--radius); padding:16px;">
          <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); text-transform:uppercase;">Procesos vivos</div>
          <div id="pem-alive" style="font-size:28px; font-weight:700; color:var(--fg-blue); font-variant-numeric:tabular-nums;">—</div>
        </div>
      </div>
    </div>
  `;const t=i.querySelector("#pem-snapshots"),s=i.querySelector("#pem-interval"),n=i.querySelector("#pem-clktick"),o=i.querySelector("#pem-ncores"),r=i.querySelector("#pem-walltime"),a=i.querySelector("#pem-run"),l=i.querySelector("#pem-reset"),d=i.querySelector("#pem-diff"),c=i.querySelector("#pem-table-body"),f=i.querySelector("#pem-tree"),b=i.querySelector("#pem-sys-cpu"),m=i.querySelector("#pem-sys-ram"),p=i.querySelector("#pem-alive");function u(){let v;try{v=JSON.parse(t.value)}catch{d.innerHTML='<div style="color:var(--fg-red);">JSON inváldo</div>';return}const k={snapshots:v,system:null,intervalSec:parseFloat(s.value)||.2,clkTick:parseInt(n.value,10)||100,ncores:parseInt(o.value,10)||1,wallTime:parseFloat(r.value)};try{const x=e.run(k),I=x.final.diff;d.innerHTML=`
        <div style="color:var(--fg-green);">▲ nacimientos: ${I.births.length} (${I.births.map(h=>`${h.pid}:${h.comm}`).join(", ")||"—"})</div>
        <div style="color:var(--fg-red);">▼ muertes: ${I.deaths.length} (${I.deaths.map(h=>`${h.pid}:${h.comm}`).join(", ")||"—"})</div>
        <div style="color:var(--fg-amber);">◆ picos CPU: ${I.spikes.length}</div>
        <div style="color:var(--fg-purple);">● huérfanos: ${I.orphans.length}</div>
        <div style="color:var(--text-muted);">sistema CPU: ${I.cpuPct.toFixed(1)}% · RAM: ${I.ramPct.toFixed(1)}% · vivos: ${I.alive}</div>
      `;const w=x.final.processes.map(h=>{const A=h.lifecycle==="active"?"#10b981":h.lifecycle==="idle"?"#f59e0b":h.lifecycle==="new"?"#a855f7":h.lifecycle==="dying"?"#ef4444":"#666666",M=(h.rss/(1024*1024)).toFixed(1);return`
          <tr>
            <td>${h.pid}</td>
            <td>${h.comm}</td>
            <td style="color:${A};">${h.lifecycle}</td>
            <td>${h.cpuPct.toFixed(1)}%</td>
            <td>${M}</td>
            <td>${h.numThreads}</td>
            <td>${h.orphan?"sí":"no"}</td>
            <td>${h.spike?"sí":"no"}</td>
          </tr>
        `}).join("");c.innerHTML=w||"<tr><td colspan='8' style='color:var(--text-muted);'>Sin procesos</td></tr>",f.innerHTML=`
        <div style="color:var(--fg-blue); font-weight:bold;">Raíces: ${x.final.treeRoots.join(", ")||"—"}</div>
        <div style="color:var(--text-muted); margin-top:6px;">Hilos del kernel (ppid=2): ${x.final.kernelThreads.join(", ")||"—"}</div>
        <div style="color:var(--text-muted); margin-top:6px;">Núcleos: ${k.ncores} · CLK_TCK: ${k.clkTick}</div>
      `,b.textContent=x.final.systemCpu.toFixed(1)+"%",m.textContent=x.final.systemRam.toFixed(1)+"%",p.textContent=x.final.aliveCount.toString()}catch(x){d.innerHTML=`<div style="color:var(--fg-red);">Error: ${x.message}</div>`}}function g(){e.reset(),d.innerHTML="<div style='color:var(--text-muted);'>Ecosistema reiniciado</div>",c.innerHTML="<tr><td colspan='8' style='color:var(--text-muted);'>Sin procesos</td></tr>",f.innerHTML="<div style='color:var(--text-muted);'>Esperando ejecución...</div>",b.textContent="—",m.textContent="—",p.textContent="—"}a.addEventListener("click",u),l.addEventListener("click",g),u()}function wi(i){const e=new Ws;i.innerHTML=`
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Identidad del mundo</div>
              <div class="card-subtitle">Semilla · modo · par·metros · frame</div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Semilla (entero compartible)</label>
            <input type="number" id="gen-seed" value="12345" style="width:100px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Modo</label>
            <select id="gen-mode" style="margin-left:8px; width:130px; font-family:var(--mono); font-size:12px;">
              <option value="flowfield">flowfield</option>
              <option value="plasma">plasma</option>
              <option value="attractor">attractor</option>
            </select>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Canvas (cols × rows)</label>
            <div style="display:flex; gap:8px; align-items:center;">
              <input type="number" id="gen-width" value="100" min="20" max="200" style="width:70px; font-family:var(--mono); font-size:12px;">
              <span style="font-family:var(--mono); font-size:11px; color:var(--text-muted);">×</span>
              <input type="number" id="gen-height" value="40" min="8" max="120" style="width:70px; font-family:var(--mono); font-size:12px;">
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Frame</label>
            <input type="number" id="gen-frame" value="0" min="0" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Paleta</label>
            <select id="gen-palette" style="margin-left:8px; width:100px; font-family:var(--mono); font-size:12px;">
              <option value="">(desde semilla)</option>
              <option value="neon">neon</option>
              <option value="ocean">ocean</option>
              <option value="ember">ember</option>
              <option value="forest">forest</option>
              <option value="sunset">sunset</option>
              <option value="ice">ice</option>
              <option value="toxic">toxic</option>
              <option value="mono">mono</option>
            </select>
          </div>
          <button id="gen-run" class="btn primary">Renderizar frame</button>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Etapas del cálculo</div>
              <div class="card-subtitle">Semilla → par·metros → lienzo → render → huella</div>
            </div>
          </div>
          <div id="gen-stages" style="font-family:var(--mono); font-size:12px; color:var(--text-muted);">
            <div class="stage-row"><span class="stage-chip">Esperando ejecución...</span></div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Render (pixels deterministas)</div>
              <div class="card-subtitle">Cada píxel es una función pura de (semilla, modo, par·metros, frame)</div>
            </div>
          </div>
          <div class="canvas-container" style="height:420px; display:flex; align-items:center; justify-content:center; background:#050507;">
            <canvas id="gen-canvas"></canvas>
          </div>
          <div id="gen-fingerprint" style="font-family:var(--mono); font-size:11px; color:var(--fg-cyan); margin-top:8px; word-break:break-all;"></div>
        </div>

        <div class="grid-2" style="gap:16px;">
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Par·metros del modo</div>
                <div class="card-subtitle">Todos derivados de la semilla</div>
              </div>
            </div>
            <pre id="gen-params" style="font-size:11px;">—</pre>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Huella dactilar del mundo</div>
                <div class="card-subtitle">SHA-256 sobre modo + frame + par·metros + píxeles — identificador compartible</div>
              </div>
            </div>
            <div id="gen-fp-detail" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); background:#0a0a0c; padding:12px; border-radius:var(--radius); border:1px solid var(--panel-border);">—</div>
          </div>
        </div>
      </div>
    </div>
  `;const t=i.querySelector("#gen-seed"),s=i.querySelector("#gen-mode"),n=i.querySelector("#gen-width"),o=i.querySelector("#gen-height"),r=i.querySelector("#gen-frame"),a=i.querySelector("#gen-palette"),l=i.querySelector("#gen-run"),d=i.querySelector("#gen-stages"),c=i.querySelector("#gen-canvas"),f=i.querySelector("#gen-fingerprint"),b=i.querySelector("#gen-params"),m=i.querySelector("#gen-fp-detail");function p(g,v,k){const x=window.devicePixelRatio||1,I=c.clientWidth||400,w=c.clientHeight||300;c.width=I*x,c.height=w*x;const h=c.getContext("2d");h.scale(x,x),h.clearRect(0,0,I,w);const A=h.createImageData(v,k*2),M=A.data;for(const S of g){const E=(S.y*v+S.x)*4;M[E]=S.r,M[E+1]=S.g,M[E+2]=S.b,M[E+3]=255}h.putImageData(A,0,0)}function u(){const g={seed:parseInt(t.value,10)||0,mode:s.value||"flowfield",width:parseInt(n.value,10)||100,height:parseInt(o.value,10)||40,frame:parseInt(r.value,10)||0,palette:a.value||void 0};try{const v=e.run(g),k=v.stages.map(x=>{let I="";return x.data&&typeof x.data=="object"&&!Array.isArray(x.data)?I=JSON.stringify(x.data).slice(0,100):Array.isArray(x.data)&&(I=`(${x.data.length} items)`),`<div class="stage-row"><span class="stage-chip">${x.name}</span><span class="stage-value">${x.description} ${I?"· "+I:""}</span></div>`}).join("");d.innerHTML=k,p(v.final.pixels,v.final.width,v.final.height*2),f.textContent=`fp=${v.final.fingerprint}`,m.textContent=`mode=${v.final.mode} frame=${v.final.frame} seed=${v.final.seed} palette=${v.final.palette} cells=${v.final.cellCount}`,b.textContent=JSON.stringify(v.final.params,null,2)}catch(v){d.innerHTML=`<div style="color:var(--fg-red);">Error: ${v.message}</div>`}}l.addEventListener("click",u),u()}function Si(i){i.innerHTML=`
    <div class="grid-2">
      <div style="flex:1;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Clasificación de fidelidad por modelo</div>
              <div class="card-subtitle">Nivel 1 = modelo conceptual · Nivel 4 = reproducción algorítmica directa</div>
            </div>
          </div>
          <div class="fidelity-grid">
            <div class="fidelity-card">
              <h4>Wi-Fi Time Machine</h4>
              <div class="level">4</div>
              <ul>
                <li>Parsing de bloques BSS de iw dump</li>
                <li>Tokenizador escapado de nmcli</li>
                <li>Deduplicación por BSSID (se~nal más fuerte)</li>
                <li>Mapeo freq→canal 2.4/5/6 GHz</li>
                <li>Inferencia de seguridad por AKM</li>
                <li>Mapa de calor tiempo × buckets</li>
                <li>Sanitización SHA-256 de BSSID</li>
                <li><strong>Adaptado:</strong> sin iw/nmcli, sin SQLite, sin tamaño de terminal</li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4>BLE Radar</h4>
              <div class="level">4</div>
              <ul>
                <li>M&aacutequina de estado: appeared→active→fading→disappeared</li>
                <li>EMA RSSI (alpha=0.4)</li>
                <li>Bandas de fuerza (NO distancia)</li>
                <li>Ángulo desde SHA-256(dir) — convención visual</li>
                <li>Geometría del frame radar (cárdenas)</li>
                <li>Cursor de reproducción con seek/speed</li>
                <li><strong>Adaptado:</strong> sin bleak/BlueZ, sin curses, sin SQLite</li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4>Process Ecosystem Monitor</h4>
              <div class="level">4</div>
              <ul>
                <li>Parsing de /proc/[pid]/stat (comm con paréntesis anidados)</li>
                <li>CPU% por delta de jiffies, normalizado per-núcleo</li>
                <li>CPU del sistema desde /proc/stat</li>
                <li>Identidad (pid, starttime) y detección de reuso de PID</li>
                <li>&Aacute;rbol desde ppid, rehuerfamiento con cementerio</li>
                <li>Ciclo: new→active/idle→dying→dead</li>
                <li><strong>Adaptado:</strong> sin /proc real, sin curses</li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4>Generative Engine</h4>
              <div class="level">4</div>
              <ul>
                <li>RNG splitmix64 sin estado (O(1) buscar frames)</li>
                <li>Paletas continuas 1-D interpoladas</li>
                <li>Flowfield: campo de sénos análitico</li>
                <li>Plasma: fórmulas de color cerradas</li>
                <li>Attractor: Clifford/Dejong con sondeo de coeficientes</li>
                <li>Huella dactilar del mundo (hash de píxeles)</li>
                <li><strong>Adaptado:</strong> sin terminal/ANSI, sin exportación de archivo</li>
              </ul>
            </div>
            <div class="fidelity-card">
              <h4>The Box</h4>
              <div class="level">3</div>
              <ul>
                <li>Kernel arc-incidence multi-digraph con invariantes I1-I4</li>
                <li>Seis reglas (GATHER, BOND, TAG_PROP, QUIET, DESCEND, FUSE)</li>
                <li>4 políticas del motor (canonical, uniform, weighted, roundrobin)</li>
                <li>Espacio de posibilidades: sitios finitos, enumerables, sin semilla</li>
                <li>unit_hash: BLAKE2b(semilla||paso||prop||digest_estructural) / 2^64</li>
                <li>Identidad y linaje: descenso, profundidad, clases de fusión</li>
                <li>Métricas estructurales: grados, componentes, beta0/beta1, modularidad</li>
                <li>Observables nombrados (14 mediciones)</li>
                <li><strong>Adaptado:</strong> BLAKE2b puro TS (no hashlib), Float64Array (no NumPy), reglas hard-coded (no YAML), sin batería de modelos nulos ni koopman</li>
              </ul>
            </div>
          </div>
        </div>

        <div class="card mt-16">
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);">Suposiciones documentadas</h3>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li><strong>RSSI ≠ distancia:</strong> los anillos del radar son bandas de fuerza se~nal, nunca metros físicos.</li>
            <li><strong>Ángulo ≠ orientación:</strong> el ángulo de dispositivo se deriva del hash de la dirección MAC; BLE no proporciona orientación.</li>
            <li><strong>Sin hardware:</strong> los modelos no acceden a adaptadores Bluetooth, Wi-Fi ni /proc. Las entradas son sintéticas o de muestra.</li>
            <li><strong>Sin I/O original:</strong> no se invocan iw, nmcli, bleak ni curses. Límites de E/S sustituidos por entradas deterministas.</li>
            <li><strong>Reloj configurable:</strong> el tiempo de pared se sustituye por un reloj de época configurable para reproducibilidad.</li>
            <li><strong>GenArt tests upstream:</strong> el motor original tiene 5 tests fallidos (no reproducidos aquí).</li>
          </ul>
        </div>
      </div>

      <div style="flex:1;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Limitaciones honestas</div>
              <div class="card-subtitle">Qué no se reproduce y por qué</div>
            </div>
          </div>
          <ul style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8; padding-left:18px;">
            <li><strong>Hardware de radio:</strong> WTM y BLE requieren adaptadores Wi-Fi/BLE reales para escaneo en vivo; sustituidos por datos sintéticos.</li>
            <li><strong>Base de datos SQLite:</strong> la persistencia se sustituyó por almacén en memoria con la misma semántica de consultas.</li>
            <li><strong>Interfaz de terminal:</strong> curses/pantalla sustituidos por lienzo HTML y geometría de cárdenas.</li>
            <li><strong>/proc de Linux:</strong> el modelo PEM usa instantáneas sintéticas; no lee /proc del sistema anfitrión.</li>
            <li><strong>Exportación de archivo:</strong> GIF/PNG/ANS del GenArt no están en el nivel de modelo; los arrays de píxeles se exportan como datos.</li>
            <li><strong>No se afirman capacidades:</strong> nada se afirma que no esté implementado y probado.</li>
          </ul>
        </div>

        <div class="card mt-16">
          <div class="card-header">
            <div>
              <div class="card-title">Ecuaciones y complejidad</div>
              <div class="card-subtitle">Fundamentos matemáticos de los modelos reconstruidos</div>
            </div>
          </div>
          <div style="font-family:var(--mono); font-size:12px; color:var(--text-muted); line-height:1.8;">
            <div class="equation">canal = floor((freq − 5000) / 5)   [5 GHz]</div>
            <div class="equation">canal = floor((freq − 5925) / 5)   [6 GHz]</div>
            <div class="equation">canal = floor((freq − 2407) / 5)   [2.4 GHz, excepto 2484 → 14]</div>
            <div class="equation">rssi_ema = 0.6 × prev + 0.4 × raw      (BLE Radar, alpha=0.4)</div>
            <div class="equation">ángulo = SHA-256(dir)[0:2] / 65536 × 360°    (BLE Radar, convención visual)</div>
            <div class="equation">cpu_proc = Δ(utime+stime) / (interval × CLK_TCK × ncores) × 100   (PEM)</div>
            <div class="equation">cpu_sys = busy_delta / total_delta × 100   (idle = idle + iowait)</div>
            <div class="equation">x = cx + radius × 2 × cos(ángulo);  y = cy − radius × sin(ángulo)   (radar, corrección de aspecto)</div>
            <div class="equation">x' = sin(a·y) + c·cos(a·x),  y' = sin(b·x) + d·cos(b·y)   (attractor Clifford)</div>
            <div class="equation">complejidad: lineal en el número de observaciones / procesos por tick</div>
          </div>
        </div>

        <div class="card mt-16">
          <h3 style="font-size:16px; margin-bottom:12px; color:var(--text);">Reproducibilidad</h3>
          <p style="color:var(--text-muted); font-size:13px; font-family:var(--mono); line-height:1.8;">
            Todos los modelos son deterministas: misma entrada → misma salida. No hay aleatoriedad en tiempo de render, ni hardware, ni reloj de pared. Cada ejecución produce salidas idénticas byte a byte, verificadas por pruebas automatizadas en <code>tests/</code>.
          </p>
        </div>
      </div>
    </div>
  `}function ki(i){const e=new mi;i.innerHTML=`
    <div class="grid-2">
      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card">
          <div class="card-header">
            <div>
              <div class="card-title">Configuración del sustrato</div>
              <div class="card-subtitle">Arc-incidence multi-digraph · 6 reglas · motor determinista</div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Nodos iniciales</label>
            <input type="number" id="box-nnodes" value="20" min="1" max="200" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Arcos iniciales</label>
            <input type="number" id="box-narcs" value="40" min="0" max="400" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Dimensión</label>
            <input type="number" id="box-dim" value="4" min="1" max="8" style="width:60px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Semilla</label>
            <input type="number" id="box-seed" value="11" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Pasos</label>
            <input type="number" id="box-steps" value="100" min="1" max="2000" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Política</label>
            <select id="box-policy" style="width:120px; font-family:var(--mono); font-size:12px;">
              <option value="uniform">Uniform</option>
              <option value="canonical">Canonical</option>
              <option value="weighted">Weighted</option>
              <option value="roundrobin">RoundRobin</option>
            </select>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Max nodos</label>
            <input type="number" id="box-maxnodes" value="160" min="1" max="1000" style="width:80px; font-family:var(--mono); font-size:12px;">
            <label style="margin-left:20px; font-family:var(--mono); font-size:11px; color:var(--text-muted);">Max arcos</label>
            <input type="number" id="box-maxarcs" value="700" min="1" max="5000" style="width:80px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:6px;">Spread de etiquetas</label>
            <input type="number" id="box-tagspread" value="1" min="1" max="10" style="width:60px; font-family:var(--mono); font-size:12px;">
          </div>
          <div class="controls mt-8">
            <button id="box-run" class="btn primary">Ejecutar modelo</button>
            <button id="box-reset" class="btn secondary">Resetear</button>
          </div>
        </div>

        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Controles de paso a paso</div>
              <div class="card-subtitle">Ejecución un paso a la vez con visualización del evento</div>
            </div>
          </div>
          <div class="controls mt-8">
            <button id="box-step1" class="btn secondary">Paso 1</button>
            <button id="box-step10" class="btn secondary">Paso 10</button>
            <button id="box-runall" class="btn primary">Ejecutar todo</button>
            <button id="box-pause" class="btn secondary" disabled>Pausar</button>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Evento actual</div>
            <div id="box-current-event" style="font-family:var(--mono); font-size:11px; background:#121216; border:1px solid #2a2a3a; padding:8px; border-radius:4px; color:var(--text);">
              <div style="color:var(--text-muted);">Ningún evento aún</div>
            </div>
          </div>
          <div class="controls mt-8">
            <label style="font-family:var(--mono); font-size:11px; color:var(--text-muted); display:block; margin-bottom:4px;">Hash del grafo (proveniencia)</div>
            <div id="box-graph-hash" style="font-family:var(--mono); font-size:10px; background:#0c0c10; border:1px solid #2a2a3a; padding:8px; border-radius:4px; color:#06b6d4; word-break:break-all;">
              —
            </div>
          </div>
        </div>
      </div>

      <div style="flex:1; display:flex; flex-direction:column; gap:16px;">
        <div class="card" style="flex:1;">
          <div class="card-header">
            <div>
              <div class="card-title">Visualización del sustrato</div>
              <div class="card-subtitle">Nodos = puntos (color por etiqueta) · Arcos = líneas (color por etiqueta de arco) · Retirados = desvanecidos</div>
            </div>
          </div>
          <div class="canvas-container" style="height:300px; display:flex; align-items:center; justify-content:center; background:#0c0c10; border:1px solid #2a2a3a; border-radius:4px;">
            <canvas id="box-canvas" width="400" height="300"></canvas>
          </div>
          <div id="box-canvas-legend" style="font-family:var(--mono); font-size:10px; color:var(--text-muted); margin-top:6px; line-height:1.4;"></div>
        </div>

        <div class="grid-2" style="gap:16px;">
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Observables (nombrados)</div>
                <div class="card-subtitle">Medi­das estructurales del sustrato en cada paso</div>
              </div>
            </div>
            <div id="box-observables" style="font-family:var(--mono); font-size:10px; color:var(--text-muted); max-height:200px; overflow-y:auto; line-height:1.6;">
              <div style="color:var(--text-muted);">Esperando ejecución...</div>
            </div>
          </div>
          <div class="card" style="flex:1;">
            <div class="card-header">
              <div>
                <div class="card-title">Identidad y linaje</div>
                <div class="card-subtitle">Profundidad, clases de fusión, fracción de fusiones</div>
              </div>
            </div>
            <div id="box-identity" style="font-family:var(--mono); font-size:11px; color:var(--text-muted); line-height:1.8;">
              <div style="color:var(--text-muted);">Esperando ejecución...</div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="card mt-16">
      <div class="card-header">
        <div>
          <div class="card-title">Reglas del foundry (datas, no código)</div>
          <div class="card-subtitle">Seis reescrituras locales del sustrato, cada una con predicado, selectores y efectos</div>
        </div>
      </div>
      <div style="font-family:var(--mono); font-size:11px; color:var(--text-muted); line-height:1.8; padding:8px;">
        <div><span style="color:#06b6d4;">GATHER</span>: Dos partidarios del mismo hub se conectan directamente. (tag=1, w=0.6)</div>
        <div><span style="color:#10b981;">BOND</span>: Ancla y vecino de salida que comparten 2 veci­nos de entrada se enlazan. (tag=2, w=0.4)</div>
        <div><span style="color:#f59e0b;">TAG_PROP</span>: La ancla copia la etiqueta de un vecino de salida.</div>
        <div><span style="color:#ef4444;">QUIET</span>: Nodo sin flujo de entrada durante 30 pasos se marca como QUIET (tag=5).</div>
        <div><span style="color:#a855f7;">DESCEND</span>: Nodo QUIET con espacio genera hijo con su etiqueta y payload con jitter. (tag=3, w=0.9)</div>
        <div><span style="color:#8b5cf6;">FUSE</span>: Dos hermanos con etiqueta igual y payload cercano se identifican. El gemelo se retira; el testigo EQUIV perdura. (tag=4)</div>
      </div>
    </div>
  `;const t=i.querySelector("#box-nnodes"),s=i.querySelector("#box-narcs"),n=i.querySelector("#box-dim"),o=i.querySelector("#box-seed"),r=i.querySelector("#box-steps"),a=i.querySelector("#box-policy"),l=i.querySelector("#box-maxnodes"),d=i.querySelector("#box-maxarcs"),c=i.querySelector("#box-tagspread"),f=i.querySelector("#box-run"),b=i.querySelector("#box-reset"),m=i.querySelector("#box-step1"),p=i.querySelector("#box-step10"),u=i.querySelector("#box-runall"),g=i.querySelector("#box-pause"),v=i.querySelector("#box-current-event"),k=i.querySelector("#box-graph-hash"),x=i.querySelector("#box-canvas"),I=i.querySelector("#box-canvas-legend"),w=i.querySelector("#box-observables"),h=i.querySelector("#box-identity");let A=null,M=null;Pe();let S=null,E=0,T=null,N=!1;const L={0:"#666666",1:"#06b6d4",2:"#10b981",3:"#f59e0b",4:"#8b5cf6",5:"#ef4444"};function B(){return{nNodes:parseInt(t.value,10)||20,nArcs:parseInt(s.value,10)||40,dim:parseInt(n.value,10)||4,seed:parseInt(o.value,10)||11,steps:parseInt(r.value,10)||100,policy:a.value||"uniform",tagSpread:parseInt(c.value,10)||1,maxNodes:parseInt(l.value,10)||160,maxArcs:parseInt(d.value,10)||700,recordEvery:1}}function $(_){const D=window.devicePixelRatio||1,O=x.clientWidth||400,F=x.clientHeight||300;x.width=O*D,x.height=F*D;const R=x.getContext("2d");R.scale(D,D),R.clearRect(0,0,O,F);const Y=[..._.nodes.values()],le=[..._.arcs.values()],St=O/2,kt=F/2,Ue=Math.min(O,F)/2*.75,ve=new Map,At=Math.max(Y.length,1);for(let C=0;C<Y.length;C++){const W=Y[C],K=C/At*2*Math.PI,de=St+Math.cos(K)*Ue,_e=kt+Math.sin(K)*Ue;ve.set(W.id,{x:de,y:_e})}for(const C of le){if(!_.isNode(C.src)||!_.isNode(C.dst))continue;const W=ve.get(C.src),K=ve.get(C.dst);if(!W||!K)continue;const de=_.isRetired(C.src),_e=_.isRetired(C.dst),Ie=de||_e;R.beginPath(),R.moveTo(W.x,W.y),R.lineTo(K.x,K.y),R.strokeStyle=Ie?"#2a2a3a":L[C.tag]??"#666666",R.globalAlpha=Ie?.2:.5,R.lineWidth=Ie?.5:Math.min(2,Math.max(.5,C.w*2)),R.stroke(),R.globalAlpha=1}for(const C of Y){const W=ve.get(C.id),K=_.isRetired(C.id);R.beginPath(),R.arc(W.x,W.y,K?2:4,0,2*Math.PI),R.fillStyle=K?"#1a1a1e":L[C.tag]??"#666666",R.globalAlpha=K?.3:.9,R.fill(),R.globalAlpha=1,Y.length<=30&&(R.fillStyle="#666666",R.font="8px monospace",R.textAlign="center",R.fillText(String(C.id),W.x,W.y+6))}const Ee=new Map;for(const C of Y)Ee.set(C.tag,(Ee.get(C.tag)??0)+1);const Te=[];for(const[C,W]of Ee.entries()){const K=L[C]??"#666666",de=C===0?"default":C===1?"PULL":C===2?"BOND":C===3?"DESCEND":C===4?"EQUIV":C===5?"QUIET":`t${C}`;Te.push(`<span style="color:${K};">▪ ${de}: ${W}</span>`)}const Ge=_.retired.size;Ge>0&&Te.push(`<span style="color:#1a1a1e;">▪ retirados: ${Ge}</span>`),I.innerHTML=Te.join("   ")}function G(_){const D=Object.entries(_).map(([O,F])=>`<div style="display:flex; justify-content:space-between; padding:1px 0;">
        <span style="color:var(--text-muted);">${O.replace(/_/g," ")}:</span>
        <span style="color:var(--text);">${typeof F=="number"?F.toFixed(4):F}</span>
      </div>`).join("");w.innerHTML=D}function ae(_){h.innerHTML=`
      <div><span style="color:var(--text-muted);">Profundidad máxima:</span> <span style="color:var(--text);">${_.maxDepth}</span></div>
      <div><span style="color:var(--text-muted);">Profundidad media:</span> <span style="color:var(--text);">${_.meanDepth.toFixed(2)}</span></div>
      <div><span style="color:var(--text-muted);">Clases de fusión:</span> <span style="color:var(--text);">${_.nFusionClasses}</span></div>
      <div><span style="color:var(--text-muted);">Nodos fusionados:</span> <span style="color:var(--text);">${_.fusedNodes}</span></div>
      <div><span style="color:var(--text-muted);">Fracción fusionada:</span> <span style="color:var(--text);">${(_.fusedFraction*100).toFixed(1)}%</span></div>
      <div><span style="color:var(--text-muted);">Arcos EQUIV:</span> <span style="color:var(--text);">${_.equivArcs}</span></div>
      <div><span style="color:var(--text-muted);">IDs retirados:</span> <span style="color:var(--text);">${_.retiredIds}</span></div>
    `}function q(_){if(!_){v.innerHTML="<div style='color:var(--text-muted);'>Ningún evento aún</div>";return}const O={GATHER:"#06b6d4",BOND:"#10b981",TAG_PROP:"#f59e0b",QUIET:"#ef4444",DESCEND:"#a855f7",FUSE:"#8b5cf6"}[_.ruleId]??"#666666",F=_.edits.map(R=>`<div style="margin-left:12px; color:var(--text-muted); font-size:10px;">• ${R.op} ${JSON.stringify(R.args).slice(0,80)}</div>`).join("");v.innerHTML=`
      <div style="color:${O}; font-weight:bold;">${_.ruleId} @ ${_.anchor}</div>
      <div style="color:var(--text-muted); font-size:10px;">${_.siteKey}</div>
      ${F}
    `}function H(_){k.textContent=_.graphHash()}function P(_){try{const D=e.run(_);A=_,M=D.final;const O=D.stages,F=O[O.length-1];E=O.length-1;const R=Pe(),Y=se.random(_.nNodes,_.nArcs,_.dim,_.seed,_.tagSpread,{maxNodes:_.maxNodes,maxArcs:_.maxArcs}),le=new yt(Y,R,_.seed,_.policy,!0,1);le.run(_.steps),M=le.state,S=le,$(M),H(M),G(F.observables),ae(D.final.identity),q(null),v.innerHTML=`<div style="color:var(--text-muted);">${O.length-1} pasos ejecutados · Última regla: ${F.ruleId??"—"}</div>`}catch(D){w.innerHTML=`<div style="color:var(--fg-red);">Error: ${D.message}</div>`}}function ee(){var D;if(!A||!S||!M)return;const _=S.step();_?(E++,$(S.state),H(S.state),G({}),q(_),v.innerHTML=`<div style="color:var(--text);">Paso ${E}: ${_.ruleId}</div>`+v.innerHTML):(g.disabled=!0,u.disabled=!1,v.innerHTML=`<div style="color:var(--text-muted);">Motor detenido: ${((D=S.halt)==null?void 0:D.reason)??"desconocido"}</div>`+v.innerHTML)}f.addEventListener("click",()=>{T&&(cancelAnimationFrame(T),T=null),N=!1,g.disabled=!0,g.textContent="Pausar",u.disabled=!1,P(B())}),b.addEventListener("click",()=>{T&&(cancelAnimationFrame(T),T=null),N=!1,g.disabled=!0,u.disabled=!1,M=null,S=null,E=0,x.getContext("2d").clearRect(0,0,400,300),v.innerHTML="<div style='color:var(--text-muted);'>Resetado</div>",k.textContent="—",w.innerHTML="<div style='color:var(--text-muted);'>Esperando ejecución...</div>",h.innerHTML="<div style='color:var(--text-muted);'>Esperando ejecución...</div>"}),m.addEventListener("click",()=>ee()),p.addEventListener("click",()=>{if(S){for(let _=0;_<10&&S.step();_++)E++;$(S.state),H(S.state),q(null),v.innerHTML=`<div style="color:var(--text);">Ejecutados 10 pasos (total ${E})</div>`+v.innerHTML}}),u.addEventListener("click",()=>{if(!A||!S)return;N=!0,g.disabled=!1,u.disabled=!0,m.disabled=!0,p.disabled=!0;function _(){var O;if(!N)return;const D=S.step();D?(E++,$(S.state),H(S.state),q(D),T=requestAnimationFrame(_)):(N=!1,g.disabled=!0,u.disabled=!1,m.disabled=!1,p.disabled=!1,v.innerHTML=`<div style="color:var(--text-muted);">Motor detenido: ${((O=S.halt)==null?void 0:O.reason)??"desconocido"}</div>`+v.innerHTML)}T=requestAnimationFrame(_)}),g.addEventListener("click",()=>{N=!1,g.disabled=!0,u.disabled=!1,m.disabled=!1,p.disabled=!1,T&&(cancelAnimationFrame(T),T=null)}),P(B())}const ot=[{id:"overview",title:"Overview",hint:"Proyectos",render:vi},{id:"wtm",title:"Wi-Fi Time Machine",hint:"WTM",render:gi},{id:"ble",title:"BLE Radar",hint:"BLE",render:bi},{id:"pem",title:"Process Ecosystem Monitor",hint:"PEM",render:xi},{id:"gen",title:"Generative Engine",hint:"GEN",render:wi},{id:"box",title:"The Box",hint:"BOX",render:ki},{id:"fidelity",title:"Fidelity & Methodology",hint:"FID",render:Si}];function Ai(i){const e=document.createElement("aside");e.className="sidebar";const t=document.createElement("div");t.className="brand",t.innerHTML=`
    <h1>THORRIJA</h1>
    <p>Engineering Showcase &bull; Modelos deterministas reconstruidos desde c&oacute;digo fuente</p>
  `,e.appendChild(t);const s=document.createElement("nav");s.className="nav",e.appendChild(s);const n=document.createElement("main");n.className="main",i.appendChild(e),i.appendChild(n);function o(r){s.querySelectorAll(".nav-item").forEach(c=>{c.dataset.section===r?c.classList.add("active"):c.classList.remove("active")}),n.innerHTML="";const l=ot.find(c=>c.id===r),d=document.createElement("div");d.className="section-header",d.innerHTML=`
      <h2>${l.title}</h2>
      <p>M&oacute;dulo computacional determinista reconstruido desde el c&oacute;digo fuente original.</p>
      <div class="meta">
        <span>Fidelidad: reconstrucci&oacute;n algor&iacute;tmica</span>
        <span>Sin hardware externo</span>
        <span>Sin claves de API</span>
      </div>
    `,n.appendChild(d),l.render(n)}return ot.forEach(r=>{const a=document.createElement("a");a.className="nav-item",a.href="#",a.dataset.section=r.id,a.textContent=r.title;const l=document.createElement("span");l.className="item-hint",l.textContent=r.hint,a.appendChild(l),a.addEventListener("click",d=>{d.preventDefault(),o(r.id)}),s.appendChild(a)}),o("overview"),{main:n,setSection:o}}function Mi(){const i=document.getElementById("app");i.innerHTML='<div class="shell"></div>';const e=i.querySelector(".shell");Ai(e)}document.addEventListener("DOMContentLoaded",Mi);
