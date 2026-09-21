import {useState,useRef,useLayoutEffect} from 'react';
import {ArrowLeft,ArrowRight} from '@phosphor-icons/react';

export function WorldCopy({world}){
 const area=useRef(null),meter=useRef(null);
 const [pages,setPages]=useState([[]]),[page,setPage]=useState(0);
 useLayoutEffect(()=>{
  let disposed=false;
  const paginate=()=>{
   if(disposed||!area.current||!meter.current)return;
   const height=area.current.clientHeight,measure=meter.current;
   if(height<40)return;
   const result=[];let current=[];
   const fits=blocks=>{measure.replaceChildren(...blocks.map(b=>{const el=document.createElement(b.type);el.textContent=b.text;return el}));return measure.scrollHeight<=height-2};
   const flush=()=>{if(current.length){result.push(current);current=[]}};
   const blocks=world.pages.flatMap(([intro,detail],i)=>[
    {type:'h2',text:i===0?world.subtitle:`${world.name} · 이야기 ${i+1}`},
    {type:'p',text:intro},{type:'h2',text:'상세내용 · 스포일러 포함'},
    {type:'p',text:detail},
    {type:'p',text:i===0?'이야기를 읽던 사람이 이야기의 한가운데에 서게 된다. 김독자는 자신이 기억하는 인물들을 현실의 동료로 만나고, 그들과 함께 다음 시나리오로 나아간다. 미래를 알고 있다는 사실만으로 모든 위기를 해결할 수는 없다. 서로 다른 사람들이 내리는 선택과 그 관계가 새로운 이야기를 만들어 간다.':'다음 장면은 아직 정해지지 않았다. 선택이 쌓여 이야기가 되고, 이야기는 또 다른 가능성을 만든다.'},
   ]);
   for(const block of blocks){
    if(block.type==='h2'){if(!fits([...current,block,{type:'p',text:'내용의 첫 줄을 위한 공간입니다.'}]))flush();current.push(block);continue}
    let rest=block.text;
    while(rest){if(fits([...current,{...block,text:rest}])){current.push({...block,text:rest});break}
     let low=0,high=rest.length;while(low<high){const mid=Math.ceil((low+high)/2);if(fits([...current,{...block,text:rest.slice(0,mid)}]))low=mid;else high=mid-1}
     if(low<1){flush();continue}
     const boundary=rest.lastIndexOf(' ',low);const cut=boundary>low/2?boundary:low;
     current.push({...block,text:rest.slice(0,cut)});rest=rest.slice(cut).trimStart();flush();
    }
   }
   flush();setPages(result.length?result:[[]]);setPage(p=>Math.min(p,Math.max(0,result.length-1)));
  };
  const ro=new ResizeObserver(paginate);ro.observe(area.current);paginate();document.fonts.ready.then(paginate);
  return()=>{disposed=true;ro.disconnect()};
 },[world]);
 return <div className="world-copy paginated-world" data-inner-scroll><div className="world-page-area" ref={area}><div className="world-text world-page" key={page} aria-live="polite">{pages[page]?.map((b,i)=>b.type==='h2'?<h2 key={i}>{b.text}</h2>:<p key={i}>{b.text}</p>)}</div><div ref={meter} className="world-text world-meter" aria-hidden="true"/></div><div className="pager"><button aria-label="이전 내용" disabled={page===0} onClick={()=>setPage(p=>p-1)}><ArrowLeft/></button><span>{page+1} / {pages.length}</span><button aria-label="다음 내용" disabled={page===pages.length-1} onClick={()=>setPage(p=>p+1)}><ArrowRight/></button></div></div>
}
