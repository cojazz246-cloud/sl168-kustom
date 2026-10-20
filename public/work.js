/* AES-GCM token codec. Public client key: obfuscation, not access control. */
(() => {
 const keyBytes = "k6lPbiCnA2k8XtpAR70XXPA4mJ40eLNy1gwYnFC0WaI";
 const unpack = s => Uint8Array.from(atob(s.replace(/-/g,'+').replace(/_/g,'/')+'='.repeat((4-s.length%4)%4)),c=>c.charCodeAt(0));
 const pack = a => btoa(String.fromCharCode(...a)).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'');
 const key = () => crypto.subtle.importKey('raw',unpack(keyBytes),'AES-GCM',false,['encrypt','decrypt']);
 const aad = new TextEncoder().encode('ULB-V10');
 window.BannerCodec = Object.freeze({
  async encode(name) {
   if(typeof name!=='string'||!name.trim()||name.length>256) throw new Error('Nama parameter tidak valid');
   const iv=crypto.getRandomValues(new Uint8Array(12));
   const data=new Uint8Array(await crypto.subtle.encrypt({name:'AES-GCM',iv,additionalData:aad},await key(),new TextEncoder().encode(name)));
   const out=new Uint8Array(iv.length+data.length);out.set(iv);out.set(data,12);return 'v10.'+pack(out);
  },
  async decode(token) {
   if(typeof token!=='string'||!token.startsWith('v10.')||token.length>1024) throw new Error('Token tidak valid');
   const data=unpack(token.slice(4));if(data.length<29)throw new Error('Token tidak valid');
   const result=new TextDecoder('utf-8',{fatal:true}).decode(await crypto.subtle.decrypt({name:'AES-GCM',iv:data.slice(0,12),additionalData:aad},await key(),data.slice(12)));
   if(!result.trim()||result.length>256)throw new Error('Nama tidak valid');return result;
  }
 });
})();

/* V10: CSS owns viewport presentation. JS reads the CSS result, never width. */
(() => {
 'use strict';
 let root, image, name, ticket=0, timer, controller, disposed=false;
 const c=window.BannerSetup;
 const emit=(type,detail={})=>window.dispatchEvent(new CustomEvent('ulb:'+type,{detail}));
 const hide=()=>{if(root?.dataset.ready==='true'){root.dataset.ready='false';emit('hidden');}};
 const report=e=>{hide();emit('error',{message:e.message});if(c?.debug)console.warn('[ULB V10]',e);};
 const mql=window.matchMedia('(max-width:999.98px)');
 const visible=()=>mql.matches;
 const safeUrl=value=>{const u=new URL(value,location.href);if(u.protocol!=='https:'&&!(u.protocol==='http:'&&['localhost','127.0.0.1'].includes(u.hostname)))throw new Error('URL harus HTTPS');return u;};
 function destination(value){
  return safeUrl(value).href;
 }
 function localEligible(){
  if(!c.enabled||!c.bannerPaths.includes(location.pathname))return false;
  if(!c.imageUrl||typeof c.imageUrl!=='string'||!c.imageUrl.trim())return false;
  if(!c.parameterRequired)return true;
  const values=new URLSearchParams(location.search).getAll(name);
  return values.length===1&&!!values[0].trim()&&(c.parameterMatchValue===null||values[0]===c.parameterMatchValue);
 }
 async function decision(){
  if(c.decisionMode==='frontend')return {eligible:localEligible(),imageUrl:c.imageUrl,destinationUrl:c.destinationUrl};
  if(c.decisionMode!=='backend')throw new Error('Mode tidak valid');
  controller?.abort();controller=new AbortController();
  const abort=setTimeout(()=>controller.abort(),c.backendTimeoutMs);
  try {
   const params={};const source=new URLSearchParams(location.search);
   if(name&&source.has(name))params[name]=source.getAll(name);
   const response=await fetch(c.decisionEndpoint,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({pathname:location.pathname,viewportWidth:innerWidth,params}),signal:controller.signal,cache:'no-store'});
   if(!response.ok)throw new Error('Backend gagal');const d=await response.json();
   if(typeof d.eligible!=='boolean')throw new Error('Respons backend tidak valid');return d;
  } finally {clearTimeout(abort);}
 }
 async function evaluate(){
  const id=++ticket;clearTimeout(timer);hide();controller?.abort();
  const cssEligible=visible();
  if(!cssEligible||!c.enabled||!c.bannerPaths.includes(location.pathname))return;
  try {
   const d=await decision();if(disposed||id!==ticket||!d.eligible)return;
   safeUrl(d.imageUrl);const target=destination(d.destinationUrl);
   emit('eligible');
   timer=setTimeout(async()=>{
    try {
     if(disposed||id!==ticket)return;
     const src=safeUrl(d.imageUrl).href;
     if(image.src!==src)image.src=src;
     await image.decode();
     if(disposed||id!==ticket)return;
     root.dataset.ready='true';
     if(!visible()){hide();return;}
     root.dataset.destination=target;emit('shown');
    }catch(e){if(id===ticket)report(e);}
   },c.showDelayMs);
  }catch(e){if(id===ticket)report(e);}
 }
 async function start(){
  try {
   if(!c||!Array.isArray(c.bannerPaths)||!Number.isFinite(c.showDelayMs)||c.showDelayMs<0)throw new Error('Config tidak valid');
   name=await window.BannerCodec.decode(c.parameterNameToken);
   const urlMode=new URLSearchParams(location.search).get('mode');
   const isTestScrollPage=location.pathname.endsWith('test-scroll.html');
   const isScrollable=(urlMode==='scrollable')||(isTestScrollPage&&urlMode!=='overlay')||(urlMode!=='overlay'&&c.displayMode==='scrollable');
   root=document.createElement('div');root.id='ulb-root';root.dataset.ready='false';root.dataset.mode=isScrollable?'scrollable':'overlay';root.tabIndex=0;root.setAttribute('role','button');root.setAttribute('aria-label',c.imageAlt);
   image=new Image();image.alt=c.imageAlt;root.append(image);
   let lastClick=0;
   const triggerClick=(targetUrl)=>{
     if(!visible()||root.dataset.ready!=='true'||Date.now()-lastClick<1000)return;
     lastClick=Date.now();
     emit('click');
     const dest=targetUrl||root.dataset.destination;
     window.open(dest,'_blank','noopener');
    };
   if(c.buttonEnabled!==false){
    const btnWrap=document.createElement('div');btnWrap.className='ulb-btn-wrap';
    const btnList=(Array.isArray(c.buttonTexts)&&c.buttonTexts.length>0)?c.buttonTexts.map(t=>({text:typeof t==='string'?t:(t.text||''),url:c.destinationUrl})):((Array.isArray(c.buttons)&&c.buttons.length>0)?c.buttons:null);
    if(btnList&&btnList.length>1){
     btnWrap.classList.add('ulb-multi-btns');
     const grid=document.createElement('div');grid.className='ulb-btn-grid'+(c.buttonLayout==='stack'?' layout-stack':'');
     btnList.forEach((bItem,idx)=>{
      const btn=document.createElement('button');btn.type='button';btn.className='ulb-btn ulb-btn-item';
      const text=typeof bItem==='string'?bItem:(bItem.text||'');
      const targetUrl=(typeof bItem==='object'&&bItem.url)?bItem.url:c.destinationUrl;
      const destUrl=destination(targetUrl);
      if(!text.trim()){btn.setAttribute('data-empty','true');btn.setAttribute('data-placeholder',`[Tombol ${idx+1}]`);}
      btn.innerHTML=`<span>${text}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
      btn.addEventListener('click',e=>{e.stopPropagation();triggerClick(destUrl);});
      grid.append(btn);
     });
     btnWrap.append(grid);
    }else{
     const btn=document.createElement('button');btn.type='button';btn.className='ulb-btn';
     btn.innerHTML=`<span>${c.buttonText||""}</span><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
     btn.addEventListener('click',e=>{e.stopPropagation();triggerClick(root.dataset.destination);});
     btnWrap.append(btn);
    }
    root.append(btnWrap);
   }
   if(isScrollable)document.body.prepend(root);else document.body.append(root);
   const click=()=>triggerClick(root.dataset.destination);
   root.addEventListener('click',click);root.addEventListener('keydown',e=>{if(e.key==='Enter'||e.key===' '){e.preventDefault();click();}});
   let resize;
   window.addEventListener('resize',()=>{++ticket;clearTimeout(timer);controller?.abort();if(!visible())hide();clearTimeout(resize);resize=setTimeout(evaluate,100);});
   if(mql.addEventListener)mql.addEventListener('change',()=>{++ticket;clearTimeout(timer);controller?.abort();if(!visible())hide();clearTimeout(resize);resize=setTimeout(evaluate,50);});
   window.addEventListener('popstate',evaluate);
   window.addEventListener('pagehide',()=>{disposed=true;++ticket;clearTimeout(timer);controller?.abort();});
   window.addEventListener('pageshow',e=>{if(e.persisted){disposed=false;evaluate();}});
   evaluate();
  }catch(e){report(e);}
 }
 if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',start,{once:true});else start();
})();
