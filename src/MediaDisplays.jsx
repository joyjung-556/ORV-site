import {useEffect,useRef,useState} from 'react';
import {media} from './media';

export function WorldMedia({index,name}){
 const [visibleIndex,setVisibleIndex]=useState(index);
 const [ratio,setRatio]=useState(1);
 const videos=useRef([]);
 const requested=useRef(index);
 requested.current=index;
 useEffect(()=>{
  const video=videos.current[index];
  if(!video)return;
  video.play().catch(()=>setVisibleIndex(index));
 },[index]);
 useEffect(()=>{
  const timer=setTimeout(()=>videos.current.forEach((video,i)=>{if(i!==visibleIndex)video?.pause()}),500);
  return()=>clearTimeout(timer);
 },[visibleIndex]);
 return <div className={`media world-background${index===1&&visibleIndex!==1?' entering-star-stream':''}`} aria-label={name+' 배경 영상 영역'}>
  {media.worldVideos.map((src,i)=><div key={src} className={`world-layer ${visibleIndex===i?'is-current':''} ${i===1?'star-stream-motion':''}`} aria-hidden={visibleIndex!==i}>
   {i!==1&&media.worldThumbnails[i]&&<img className="world-poster" src={media.worldThumbnails[i]} alt=""/>}
   {i===1?<div className="world-video-crop" style={{aspectRatio:ratio*2/3}}><video ref={node=>videos.current[i]=node} src={src} preload={i===index?'auto':'none'} onLoadedMetadata={e=>setRatio(e.currentTarget.videoWidth/e.currentTarget.videoHeight)} onPlaying={()=>{if(requested.current===i)setVisibleIndex(i)}} muted loop playsInline/></div>:
    <video ref={node=>videos.current[i]=node} src={src} preload={i===index?'auto':'none'} onPlaying={()=>{if(requested.current===i)setVisibleIndex(i)}} muted loop playsInline/>}
  </div>)}
 </div>;
}
export function WorldThumbnail({index}){
 const image=media.worldThumbnails[index]||media.worlds[index];
 return image?<img src={image} alt=""/>:media.worldVideos[index]?<video src={media.worldVideos[index]} muted playsInline preload="metadata" aria-hidden="true"/>:<span>{String(index+1).padStart(2,'0')}</span>;
}
export function MoviePosters(){
 const [paused,setPaused]=useState(false),[tall,setTall]=useState(false);
 const ref=useRef(null);
 useEffect(()=>{const ro=new ResizeObserver(([entry])=>setTall(entry.contentRect.height>entry.contentRect.width));ro.observe(ref.current);return()=>ro.disconnect()},[]);
 return <div ref={ref} className="movie-poster poster-carousel" aria-label="영화 포스터 7장" aria-roledescription="캐러셀">
  <div className="poster-flow" style={{animationPlayState:paused?'paused':'running'}}>{[0,1].map(copy=><div className="poster-set" key={copy} aria-hidden={copy===1}>{media.moviePosters.map((p,i)=>{const src=(tall?p.portrait:p.landscape)||p.landscape||p.portrait||media.moviePoster;return <div className="media poster-slide" key={i}>{src?<img src={src} alt={'영화 포스터 '+(i+1)}/>:<span className="media-label">영화 포스터 {i+1}</span>}</div>})}</div>)}</div>
  <div className="poster-controls"><button aria-label={paused?'포스터 자동 재생':'포스터 일시정지'} onClick={()=>setPaused(p=>!p)}>{paused?'▶':'Ⅱ'}</button></div>
 </div>;
}
export function GoodsMascot(){
 const [alternate,setAlternate]=useState(false);
 return <button type="button" className={'media mascot'+(alternate?' alternate':'')} aria-label="도깨비 모습 바꾸기" aria-pressed={alternate} onClick={()=>setAlternate(value=>!value)}><img className="mascot-base" src={media.mascot} alt="도깨비"/><img className="mascot-hover" src={media.mascotHover} alt="" aria-hidden="true"/></button>;
}
export function MascotSpeech(){
 return <div className="mascot-speech"><svg viewBox="0 0 690 500" aria-hidden="true"><path d="M 6 128 L 320 6 L 635 128 L 635 365 L 320 490 L 6 365 Z" fill="black" stroke="white" strokeWidth="7"/></svg><p>성좌님들~!<br/>전.독.시 굿즈<br/>구경하고 가세요!</p></div>;
}
