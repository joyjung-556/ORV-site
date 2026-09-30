import {useEffect, useId, useRef, useState} from 'react';
import {ArrowLeft, ArrowRight} from '@phosphor-icons/react';
import novelLinks from './novelLinks.json';
import characterLinks from './characterLinks.json';

// Missing destinations stay visibly unavailable instead of opening an unrelated episode.
export function externalDestination(value) {
  if (!value) return null;
  try {
    const url = new URL(value);
    return ['https:', 'http:'].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

export function ReadingLink({href, children, className = '', label, unavailable = '준비 중'}) {
  const destination = externalDestination(href);
  return destination
    ? <a className={className} href={destination} target="_blank" rel="noopener noreferrer" aria-label={label}>{children}</a>
    : <span className={`${className} reading-link-unavailable`} role="link" aria-disabled="true" aria-label={label ? `${label} · ${unavailable}` : undefined} title={unavailable}>{children}</span>;
}

export function ChapterLinks({bookId, chapters}) {
  return <ol className="chapter-list" aria-label="목차">
    {chapters.map(chapter => {
      const entry = novelLinks[bookId]?.chapters?.[chapter.label];
      return <li key={chapter.label} className={chapter.label === 'Prologue' ? 'prologue' : !chapter.title ? 'afterword' : ''}>
        <ReadingLink href={entry?.novelUrl} className="chapter-novel-link" label={`${chapter.label} ${chapter.title} 웹소설 보기`}>
          <span className="chapter-number">{chapter.label}</span>
          {chapter.title && <span className="chapter-title">{chapter.title}</span>}
        </ReadingLink>
        <ReadingLink href={entry?.webtoonUrl} className="chapter-webtoon-link" unavailable={entry?.webtoonStatus === 'unreleased' ? '웹툰 미공개' : '준비 중'} label={`${chapter.label} ${chapter.title} 웹툰 ${entry?.webtoonEpisode ? `${entry.webtoonEpisode}화 ` : ''}보기`}>
          {entry?.webtoonEpisode ? `웹툰 ${entry.webtoonEpisode}화` : entry?.webtoonStatus === 'unreleased' ? '웹툰 미공개' : '웹툰 준비 중'}
        </ReadingLink>
      </li>;
    })}
  </ol>;
}

export function BookLink({book}) {
  return <ReadingLink className="outline-button novel-link" href={novelLinks[book.id]?.bookUrl}>
    PART{book.part}-{String(book.volume).padStart(2, '0')} 보러가기
  </ReadingLink>;
}

export function CharacterReadingLinks({character}) {
  const entry = characterLinks[character.id];
  const scenesRef = useRef(null);
  const scenesId = useId();
  const [edges, setEdges] = useState({start: true, end: false});
  useEffect(() => {
    const el = scenesRef.current;
    if (!el) return;
    el.scrollLeft = 0;
    const update = () => setEdges({start: el.scrollLeft < 2, end: el.scrollLeft + el.clientWidth >= el.scrollWidth - 2});
    const observer = new ResizeObserver(update);
    observer.observe(el);
    el.addEventListener('scroll', update);
    update();
    return () => {observer.disconnect(); el.removeEventListener('scroll', update);};
  }, [character.id]);
  const moveScene = direction => {
    const el = scenesRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.getBoundingClientRect().width || el.clientWidth;
    const gap = parseFloat(getComputedStyle(el).columnGap) || 0;
    el.scrollBy({left: direction * (cardWidth + gap), behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth'});
  };
  return <div className="character-reading">
    <ReadingLink className="outline-button first-appearance-link" href={entry?.firstAppearanceUrl} label={`${character.name} 첫 등장 화 보러가기`}>
      첫 등장 화 보러가기
    </ReadingLink>
    <div className="character-scenes-heading">
      <h3>명장면 보러가기</h3>
      <div className="character-scene-controls">
        <button type="button" aria-label={`${character.name} 이전 명장면`} aria-controls={scenesId} disabled={edges.start} onClick={() => moveScene(-1)}><ArrowLeft aria-hidden="true"/></button>
        <button type="button" aria-label={`${character.name} 다음 명장면`} aria-controls={scenesId} disabled={edges.end} onClick={() => moveScene(1)}><ArrowRight aria-hidden="true"/></button>
      </div>
    </div>
    <div className="character-scenes" ref={scenesRef} id={scenesId} role="region" aria-label={`${character.name} 명장면 목록`} tabIndex={0} data-inner-scroll onKeyDown={event => {
      if (event.target === event.currentTarget && ['ArrowLeft', 'ArrowRight'].includes(event.key)) {
        event.preventDefault();
        moveScene(event.key === 'ArrowRight' ? 1 : -1);
      }
    }}>
      {Array.from({length: 4}, (_, index) => {
        const scene = entry?.scenes?.[index];
        return <ReadingLink key={index} className="character-scene" href={scene?.url} label={`${character.name} 명장면 ${index + 1}${scene?.episode ? ` · 웹툰 ${scene.episode}화` : ''}`}>
          {scene?.image
            ? <img src={scene.image} alt={scene.alt || `${character.name} 명장면 ${index + 1}`} loading="lazy"/>
            : <span className="scene-placeholder" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>}
          {scene?.episode && <span className="scene-episode">웹툰 {scene.episode}화</span>}
        </ReadingLink>;
      })}
    </div>
  </div>;
}
