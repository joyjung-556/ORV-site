// 경로를 지정하면 빈 미디어 영역에 자동으로 표시됩니다. public/media의 파일은 /media/파일명 으로 연결합니다.
export const media = {
 logo: '', heroVideo: '', heroPoster: '', characterLogo: '',
 worlds: ['', '', '', ''], characters: ['', '', '', '', '', '', ''],
 characterCatalog: {}, // 인물별 고유 id: { dokja: '/media/dokja.png' }
 bookCovers: {}, moviePoster: '', trailers: ['', '', ''],
 mascot: '', products: {} // 예: '피규어': ['/media/figure-1.png', '/media/figure-2.png']
};
