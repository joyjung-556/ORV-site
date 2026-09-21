import {useState,useEffect,useRef} from 'react';
import {CaretLeft,CaretRight} from '@phosphor-icons/react';
import {media} from './media';
import {MediaSlot} from './Shelves';
export function GoodsCarousel({category}){
 const [product,setProduct]=useState(0),[progress,setProgress]=useState(0),[step,setStep]=useState(0),[paused,setPaused]=useState(false),[hover,setHover]=useState(false);
 const busy=useRef(false),touch=useRef(null);
 const move=d=>{if(busy.current)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){setProduct(p=>(p+d+3)%3);return}busy.current=true;setStep(d)};
 useEffect(()=>{if(!step)return;let frame,start;const tick=time=>{if(start===undefined)start=time;const t=Math.min(1,(time-start)/1000);setProgress(1-Math.pow(1-t,3));if(t<1)frame=requestAnimationFrame(tick);else{setProduct(p=>(p+step+3)%3);setStep(0);setProgress(0);busy.current=false}};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[step]);
 useEffect(()=>{if(step||paused||hover||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setTimeout(()=>{if(!document.hidden)move(-1)},4000);return()=>clearTimeout(timer)},[paused,hover,product,step]);
 return <div className="product-carousel rolling-carousel" aria-label={`${category} 캐러셀`} aria-roledescription="캐러셀" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={()=>setHover(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setHover(false)}} onTouchStart={e=>touch.current=e.touches[0].clientX} onTouchEnd={e=>{if(touch.current!==null){const dx=e.changedTouches[0].clientX-touch.current;if(Math.abs(dx)>40)move(dx>0?-1:1);touch.current=null}}}>
 <div className={`rolling-track ${step?'moving':''}`} style={{'--slide-step':step*progress}}>{[-2,-1,0,1,2].map(offset=><div key={offset} style={{'--focus':1-Math.min(1,Math.abs(offset-step*progress))}} className={`product-card ${offset===0?'current':''}`} aria-hidden={offset!==step}><MediaSlot src={media.products[category]?.[(product+offset+3)%3]} label={`${category} ${(product+offset+3)%3+1} 이미지 영역`}/></div>)}</div>
 <button className="carousel-prev" aria-label="이전 굿즈" onClick={()=>move(-1)}><CaretLeft weight="bold"/></button><button className="carousel-next" aria-label="다음 굿즈" onClick={()=>move(1)}><CaretRight weight="bold"/></button><span className="carousel-count">{(product+step+3)%3+1} / 3</span><button className="carousel-pause" aria-label={paused?'자동 슬라이드 재생':'자동 슬라이드 일시정지'} onClick={()=>setPaused(!paused)}>{paused?'▶':'Ⅱ'}</button>
 </div>
}
