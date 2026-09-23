import {media} from './media';
import {links} from './content';
import {Play} from '@phosphor-icons/react';

const trailers = [
 {title:'메인 예고편',id:'Xb96_61kMS8'},
 {title:'런칭 예고편',id:'YRIW33DftIM'},
 {title:'티저 예고편',id:'hUtnGbYIWxA'},
];

export function MovieTrailers({selected,onSelect}) {
 const current=trailers[selected];
 return <>
  <aside className="trailer-list" aria-label="예고편 선택">
   {trailers.map((item,index)=><button key={item.id} className={selected===index?'selected':''} aria-pressed={selected===index} onClick={()=>onSelect(index)}>
    <div className="trailer-thumbnail"><img src={`https://i.ytimg.com/vi/${item.id}/hqdefault.jpg`} alt=""/><Play weight="fill" aria-hidden="true"/></div><span>{item.title}</span>
   </button>)}
  </aside>
  <div className="trailer-content"><h1>{current.title}</h1>
   {media.trailers[selected]?<video key={selected} src={media.trailers[selected]} controls autoPlay playsInline/>:
    <iframe key={current.id} className="trailer-player" title={current.title} src={`https://www.youtube-nocookie.com/embed/${current.id}?playsinline=1&rel=0`} allow="autoplay; encrypted-media; picture-in-picture; fullscreen" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen/>}
   <div className="trailer-caption"><p className="film-caption">전지적 독자 시점 · 2025 · 감독 김병우<br/>안효섭 · 이민호 · 채수빈 · 신승호 · 나나 · 지수</p><a href={`https://www.youtube.com/watch?v=${current.id}`} target="_blank" rel="noreferrer">YouTube에서 보기 ↗</a></div>
  </div>
  <a className="poster-return outline-button" href={links.movie} target="_blank" rel="noreferrer">영화 보러가기</a>
 </>;
}
