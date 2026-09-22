import mixpanel from 'mixpanel-browser/src/loaders/loader-module-core.js';

const token = import.meta.env.VITE_MIXPANEL_TOKEN;
const enabled = Boolean(token);
const sessionId = crypto.randomUUID?.() || `${Date.now()}-${Math.random().toString(36).slice(2)}`;
let initialized = false;
let current = null;

const pageNames = {main:'메인',world:'세계관',characters:'등장인물',novel:'웹소설',movie:'영화',goods:'굿즈'};

function deviceType(){
 if(matchMedia('(max-width: 599px)').matches)return 'mobile';
 if(matchMedia('(max-width: 1023px)').matches)return 'tablet';
 return 'desktop';
}
function baseProperties(){return {session_id:sessionId,page_path:location.pathname,viewport_width:innerWidth,viewport_height:innerHeight,device_type:deviceType()};}

export function initAnalytics(){
 if(!enabled||initialized)return;
 mixpanel.init(token,{persistence:'localStorage',track_pageview:false,ip:false,ignore_dnt:false,debug:import.meta.env.DEV});
 initialized=true;
}
export function track(event,properties={},options){
 if(!enabled)return;
 initAnalytics();
 mixpanel.track(event,{...baseProperties(),...properties},options);
}
function accumulateVisibleTime(){
 if(!current?.visibleSince)return;
 current.visibleMs+=performance.now()-current.visibleSince;
 current.visibleSince=null;
}
export function leaveCurrentPage(reason='navigation',nextPage,transport){
 if(!current||current.exited)return;
 accumulateVisibleTime();current.exited=true;
 track('Page Exited',{page_id:current.id,page_name:pageNames[current.id],next_page_id:nextPage||null,next_page_name:pageNames[nextPage]||null,exit_reason:reason,duration_seconds:Number(((performance.now()-current.startedAt)/1000).toFixed(2)),engaged_seconds:Number((current.visibleMs/1000).toFixed(2))},transport?{transport}:undefined);
}
export function enterPage(pageId,previousPageId=null){
 if(current?.id===pageId&&!current.exited)return;
 const previous=current?.id||previousPageId;
 if(current&&!current.exited)leaveCurrentPage('navigation',pageId);
 current={id:pageId,startedAt:performance.now(),visibleMs:0,visibleSince:document.visibilityState==='visible'?performance.now():null,exited:false};
 track('Page Viewed',{page_id:pageId,page_name:pageNames[pageId],previous_page_id:previous||null,previous_page_name:pageNames[previous]||null,entry_url:location.href,referrer:document.referrer||null});
}
export function trackInternalNavigation(from,to,method){
 if(from===to)return;
 track('Internal Navigation',{from_page_id:from,from_page_name:pageNames[from],to_page_id:to,to_page_name:pageNames[to],navigation_method:method});
}
export function trackExternalLink({href,label,area}){
 const url=new URL(href,location.href);const pageId=current?.id||location.hash.slice(1)||'main';
 track('External Link Clicked',{source_page_id:pageId,source_page_name:pageNames[pageId],link_label:label,link_area:area||'unknown',destination_url:url.href,destination_host:url.hostname,destination_path:url.pathname});
}
export function bindPageLifecycle(){
 const visibility=()=>{if(!current)return;if(document.visibilityState==='hidden')accumulateVisibleTime();else if(!current.visibleSince)current.visibleSince=performance.now();};
 const pagehide=()=>leaveCurrentPage('pagehide',null,'sendBeacon');
 const externalClick=event=>{const anchor=event.target.closest?.('a[href]');if(!anchor)return;const url=new URL(anchor.href,location.href);if(url.origin===location.origin)return;const region=anchor.closest('section,header,footer,dialog');trackExternalLink({href:url.href,label:anchor.getAttribute('aria-label')||anchor.textContent.trim().replace(/\s+/g,' '),area:region?.getAttribute('aria-label')||region?.tagName.toLowerCase()||'unknown'});};
 document.addEventListener('visibilitychange',visibility);document.addEventListener('click',externalClick,{capture:true});window.addEventListener('pagehide',pagehide);
 return()=>{document.removeEventListener('visibilitychange',visibility);document.removeEventListener('click',externalClick,{capture:true});window.removeEventListener('pagehide',pagehide);};
}
export {pageNames};
