import {useState,useEffect,useRef} from 'react';
import {CaretLeft,CaretRight} from '@phosphor-icons/react';
import {categories} from './content';
import {media} from './media';
import {MediaSlot} from './Shelves';
import goodsLinks from './goodsLinks.json';
const productsByCategory=Object.fromEntries(Object.entries(media.products).map(([name,images])=>[name,images.map((src,i)=>({src,href:/^https?:\/\//i.test(goodsLinks[name]?.[i]||'')?goodsLinks[name][i]:null,label:`${name} ${i+1}`}))]));
const allProducts=Object.values(productsByCategory).flat();
const groups=categories.map((name,index)=>{const items=index===0?allProducts:productsByCategory[name];return items.map((entry,item)=>({...entry,category:index,item,count:items.length}))});
const slides=groups.flat();
const firstInCategory=index=>slides.findIndex(slide=>slide.category===index);
export function GoodsCarousel({categoryIndex,onCategoryChange}){
 const [product,setProduct]=useState(firstInCategory(categoryIndex)),[progress,setProgress]=useState(0),[step,setStep]=useState(0),[paused,setPaused]=useState(false),[hover,setHover]=useState(false);
 const busy=useRef(false),touch=useRef(null),categoryRef=useRef(categoryIndex);
 const total=slides.length, wrap=n=>(n+total)%total;
 useEffect(()=>{if(categoryRef.current!==categoryIndex){categoryRef.current=categoryIndex;setProduct(firstInCategory(categoryIndex));setStep(0);setProgress(0);busy.current=false}},[categoryIndex]);
 const finish=next=>{setProduct(next);categoryRef.current=slides[next].category;onCategoryChange(categoryRef.current);setStep(0);setProgress(0);busy.current=false};
 const move=d=>{if(busy.current)return;if(matchMedia('(prefers-reduced-motion: reduce)').matches){finish(wrap(product+d));return}busy.current=true;setStep(d)};
 useEffect(()=>{if(!step)return;let frame,start;const tick=time=>{if(start===undefined)start=time;const t=Math.min(1,(time-start)/1000);setProgress(1-Math.pow(1-t,3));if(t<1)frame=requestAnimationFrame(tick);else{finish(wrap(product+step))}};frame=requestAnimationFrame(tick);return()=>cancelAnimationFrame(frame)},[step]);
 useEffect(()=>{if(step||paused||hover||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const timer=setTimeout(()=>{if(!document.hidden)move(1)},4000);return()=>clearTimeout(timer)},[paused,hover,product,step]);
 return <div className="product-carousel rolling-carousel" aria-label={`${categories[categoryIndex]} 캐러셀`} aria-roledescription="캐러셀" onMouseEnter={()=>setHover(true)} onMouseLeave={()=>setHover(false)} onFocusCapture={()=>setHover(true)} onBlurCapture={e=>{if(!e.currentTarget.contains(e.relatedTarget))setHover(false)}} onTouchStart={e=>touch.current=e.touches[0].clientX} onTouchEnd={e=>{if(touch.current!==null){const dx=e.changedTouches[0].clientX-touch.current;if(Math.abs(dx)>40)move(dx>0?-1:1);touch.current=null}}}>
 <div className={`rolling-track ${step?'moving':''}`} style={{'--slide-step':step*progress}}>{[-2,-1,0,1,2].map(offset=>{const item=slides[wrap(product+offset)];return <div key={offset} style={{'--focus':1-Math.min(1,Math.abs(offset-step*progress))}} className={`product-card ${offset===0?'current':''}`} aria-hidden={offset!==step}>{item.href?<a className="product-link" href={item.href} target="_blank" rel="noopener noreferrer" tabIndex={offset===0&&!step?0:-1} aria-label={`${item.label} 판매 사이트 (새 창)`}><MediaSlot src={item.src} label={item.label}/></a>:<MediaSlot src={item.src} label={item.label}/>}</div>})}</div>
 <button className="carousel-prev" aria-label="이전 굿즈" onClick={()=>move(-1)}><CaretLeft weight="bold"/></button><button className="carousel-next" aria-label="다음 굿즈" onClick={()=>move(1)}><CaretRight weight="bold"/></button><span className="carousel-count">{slides[product].item+1} / {slides[product].count}</span><button className="carousel-pause" aria-label={paused?'자동 슬라이드 재생':'자동 슬라이드 일시정지'} onClick={()=>setPaused(!paused)}>{paused?'▶':'Ⅱ'}</button>
 </div>
}
