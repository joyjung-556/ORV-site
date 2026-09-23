// public/media에 추가된 파일을 화면 슬롯에 연결합니다.
const goodsAssets = import.meta.glob('/public/media/goods/*.png', {eager:true,query:'?url',import:'default'});
const goodsImage = name => goodsAssets[`/public/media/goods/${name}.png`];
const goodsGroup = prefix => Array.from({length:3},(_,i)=>goodsImage(`${prefix}0${i+1}`));
export const media = {
 logo: '/media/brand/logo.png',
 characterLogo: '/media/brand/character-logo.png',
 heroVideo: '/media/hero/main-video.mp4',
 heroPoster: '',

 worldVideos: [
  '/media/world/world-01.mp4', '/media/world/world-02.mp4',
  '/media/world/world-03.mp4', '/media/world/world-04.mp4',
 ],
 worldThumbnails: Array.from({length:4},(_,i)=>`/media/world/world-${String(i+1).padStart(2,'0')}-thumbnail.png`),
 worlds: ['', '', '', ''],

 // 주요 인물: 김독자, 유중혁, 정희원, 이현성, 유상아, 한수영, 이길영
 characters: [
  '/media/characters/dokja.png', '/media/characters/joonghyuk.png',
  '/media/characters/heewon.png', '/media/characters/hyunsung.png',
  '/media/characters/sangah.png', '/media/characters/sooyoung.png', '',
 ],
 characterCatalog: {
  dokja: '/media/characters/dokja.png',
  joonghyuk: '/media/characters/joonghyuk.png',
  sooyoung: '/media/characters/sooyoung.png',
  sangah: '/media/characters/sangah.png',
  hyunsung: '/media/characters/hyunsung.png',
  heewon: '/media/characters/heewon.png',
  yoosung: '/media/characters/yoosung.png',
  jihye: '/media/characters/jihye.png',
 },

 // Book spines use the cover filename with a trailing -1.
 bookSpines: Object.fromEntries(Object.entries(import.meta.glob('/public/media/books/part*-*-1.png', {eager:true,query:'?url',import:'default'})).map(([path,url])=>{
  const [,part,volume]=path.match(/part(\d+)-(\d+)-1\./);
  return [`${part}-${Number(volume)}`,url];
 })),
 bookCovers: Object.fromEntries([
  ...Array.from({length:8},(_,i)=>[`1-${i+1}`,`/media/books/part1-${String(i+1).padStart(2,'0')}.png`]),
  ...Array.from({length:3},(_,i)=>[`2-${i+1}`,`/media/books/part2-${String(i+1).padStart(2,'0')}.png`]),
  ...Array.from({length:3},(_,i)=>[`3-${i+1}`,`/media/books/part3-${String(i+1).padStart(2,'0')}.png`]),
  ...Array.from({length:4},(_,i)=>[`4-${i+1}`,`/media/books/part4-${String(i+1).padStart(2,'0')}.png`]),
  ...Array.from({length:2},(_,i)=>[`5-${i+1}`,`/media/books/part5-${String(i+1).padStart(2,'0')}.png`]),
 ]),

 moviePosters: Array.from({length:7},(_,i)=>({
  landscape:`/media/movie/poster-${String(i+1).padStart(2,'0')}-landscape.webp`,
  portrait:`/media/movie/poster-${String(i+1).padStart(2,'0')}-portrait.webp`,
 })),
 moviePoster: '',
 trailers: ['', '', ''],

 mascot: '/media/goods/mascot01.png',
 mascotHover: '/media/goods/mascot02.png',
 products: {
  '스페셜': goodsGroup('special'),
  '페이퍼': goodsGroup('paper'),
  '아크릴': goodsGroup('acryl'),
  '피규어': goodsGroup('figures'),
  '봉제': goodsGroup('plush'),
  '패브릭': goodsGroup('fabric'),
  '기타': goodsGroup('etc'),
 },
};
