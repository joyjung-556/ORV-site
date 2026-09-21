# Design QA — 전지적 독자 시점

final result: passed

판정 범위: 사용자 요청의 레이아웃, 타이포그래피, 인터랙션, 모바일 반응형. 이미지·영상 콘텐츠는 명시적으로 제외되었으므로 해당 영역의 빈 상태는 의도된 결과입니다. 실제 미디어를 넣은 뒤 크롭/화질/재생 검증은 별도로 필요합니다.

## 기준과 환경

- 원본: `/Users/hihee/Downloads/무제 폴더 2/1.png`–`7.png`, 각각 1920 × 1080.
- 움직임: `/Users/hihee/Movies/CapCut/0920.mov`, 74.37초. `qa/video-contact-sheet.jpg`에 3초 간격 장면 분석 저장.
- 구현: Codex in-app browser의 `http://localhost:4173/`.
- 데스크톱 CSS viewport 1920 × 1080, 캡처 1920 × 1080. 비교 보드는 양쪽 모두 960 × 540으로 동일 축소. 세부 비교는 원본 1:1 크롭.
- 모바일: 390 × 844, 320 × 740. 태블릿: 768 × 1024. 사용자 제공 모바일 원본이 없으므로 콘텐츠 가독성, 접근 가능한 조작, 가로 넘침 여부로 검증.

## 최종 시각 근거

- `qa/compare-world-final.jpg`: 원본 2.png와 세계관 첫 주제/첫 페이지. 제목 위치와 3열 비율, 본문 밀도, 인용문, 원형 탭 확인.
- `qa/compare-reviews.jpg`: 원본 4.png와 ALL 후기. 동일 전체 화면 및 후기 두 열의 1:1 확대 비교.
- `qa/compare-goods.jpg`: 원본 7.png와 피규어 첫 슬롯. 전체 화면 및 카테고리 2행의 확대 비교.
- `qa/compare-books-final.jpg`: 원본 5.png와 ALL 20권 책장. 책장 영역, 구분선, 책등 방향, 선택 메뉴 비교.
- `qa/characters-desktop.png`, `qa/character-open-desktop.png`: 인물 닫힘/펼침 상태.
- `qa/book-open-desktop.png`, `qa/book-mobile.png`: 책 상세. 데스크톱 초기 스크롤 문제는 최종 books 캡처 및 scrollWidth 검사로 수정 확인.
- `qa/character-mobile.png`, `qa/goods-mobile.png`, `qa/reviews-320.png`, `qa/world-tablet.png`, `qa/world-mobile-final.png`: 작은 화면의 추가 검증.

## 수정 이력

1. P2 — 세계관 제목이 약 40px 낮음. 제목을 위로 조정하고 자간을 원본에 맞춤. 최종 `compare-world-final.jpg`에서 확인.
2. P2 — 긴 후기 첫 문장이 인접 열을 침범함. 줄바꿈과 overflow-wrap 적용, 원본에 제공된 문단 개행 보존. `compare-reviews.jpg`에서 침범 없음 확인.
3. P2 — 후기 필터 ALL 시작점, 굿즈 카테고리 너비와 모서리 프레임 불일치. 필터 행 높이와 간격, 72% 카테고리 영역, 네 모서리 테두리로 수정. 최종 후기/굿즈 비교에서 확인.
4. P2 — 인물 호버와 클릭이 연달아 발생하면서 소개를 닫을 수 있음. 클릭은 선택으로 통일하고 호버 감지 영역을 인물 그룹으로 확장. 데스크톱 클릭 직후와 안정화 후 모두 aria-expanded=true 확인. 모바일 소개 캡처에서도 확인.
5. P2 — 책 상세 확장 시 다른 책등이 겹치고, 마지막 책의 숨은 호버가 가로 스크롤을 생성함. 상세 상태의 책등 최소 폭 보존, 끝 두 권 호버 방향 반전. 최종 책장 clientWidth=1528, scrollWidth=1528 확인.
6. P2 — 320px 세계관 제목의 어색한 분절. 모바일 제목에 유동 폰트 크기를 적용. `world-mobile-final.png`에서 제목이 읽기 좋은 세 줄로 표시됨.
7. P3 — 명조가 원본보다 두꺼워 보임. 주요 제목/인용문을 나눔명조 700, 작은 로고를 나눔명조 400으로 조정. 최종 비교에서 반영.

## 5개 필수 표면

- 폰트: Pretendard 400/600/700, 나눔명조 400/700/800, MapoDPP 로컬 파일 적용. 데스크톱 기준 세계관 제목 80px, 후기 제목 64px, 인용문 32px, 본문 16px, 후기 20px, 기본 내비게이션 16px. 화면 크기별 유동 조정.
- 간격: 108px 헤더, 40px 바깥 가이드, 세계관 50.5/24.2/25.3% 3열, 후기 310px 사이드 영역, 책장 20권, 굿즈 좌우 패널 비율과 카테고리 5 × 2 배열 확인.
- 색: 검정 바탕, 회색 구분선, 청록색 활성/선택 상태. 모서리와 버튼의 청록색 유지.
- 미디어: 사용자 요청에 따라 배경·포스터·캐릭터·표지·제품·영상 제외. 경로 설정으로 연결 가능. 굿즈 아이콘은 Phosphor의 대응 아이콘으로 구현했으며 원본의 사용자 지정 아이콘과 완전히 동일한 모양은 아님.
- 내용: 검색 자료를 바탕으로 소개를 재작성. 출처 문서 및 출처 모달 제공. 후기 문구와 수치는 사용자 디자인의 예시이며 EP 분류는 시연용임을 화면에 표시.

## 실제 브라우저 동작 확인

- 세계관 주제 선택, 다음 페이지 2/3, 주제 변경 시 1/3 초기화, 첫 페이지 이전 버튼 비활성.
- 헤더 탐색, 휠로 세계관→인물 이동, 브라우저 뒤로 가기로 세계관 복귀.
- 인물 클릭 펼침, 추가 인물 모달 열기/닫기.
- 후기 EP.03 필터: 1건. 공감 토글 aria-pressed=true. EP.05: 빈 상태 표시.
- 책장 전체 20권, Part 5 필터 2권, 책 상세 펼침/닫기.
- 영화 포스터→예고편 선택 화면, 공식 예고편 링크 목적지, 포스터로 복귀.
- 굿즈 인형 카테고리 선택 및 다음: status '인형 2 / 3'.
- 모바일 메뉴 열기→내비게이션 선택→메뉴 닫힘, 인물 및 책 상세 표시.
- 320/390px body.scrollWidth가 viewport 너비와 같음. 의도된 책장·필터 내부 가로 스크롤만 존재.
- 브라우저 콘솔 error/warn: 마지막 조회 결과 없음.
- 최종 `npm run build`: 성공. JS 약 276KB, gzip 약 85KB.

## 잔여 P3 및 검증 경계

- 이미지/영상이 연결되지 않았으므로 실제 미디어의 크롭, 로딩, 재생, 자막은 검증 대상에서 제외.
- 모바일 스와이프 핸들러는 구현했지만 실제 터치 기기에서의 제스처 테스트는 수행하지 않음. 캐러셀 버튼과 카테고리 전환은 브라우저에서 확인.
- 사용자 지정 로고·제품 아이콘의 정확한 원본 자산이 없어서 작은 텍스트 로고/대응 아이콘을 사용. media 설정으로 로고 교체 가능.
- OS와 브라우저의 글꼴 래스터화 차이는 남을 수 있음.
- 기능은 로컬 프런트엔드이며 후기/공감/상품 재고 서버는 연결하지 않음.

남은 P0/P1/P2 없음. 요청 범위의 시각·인터랙션 확인 완료.

## 2026-09-21 requested revisions

Status: PASS for layout and interaction changes. Book quote content scope: supplied first-volume excerpt retained; other volumes explicitly show editorial part summaries, not invented quotes. Media slots remain intentionally empty.

- 1920×1080: original portrait width 220.57px; selected width 330.86px (1.5×). Logo collapses to 0px; five portraits plus detail fill the entire stage. Hover no longer opens details.
- Character library: category filtering works; horizontal next arrow moves the list; fixed an initial-mount observer issue so arrow availability updates immediately.
- Book spines: ALL=20 and Part 2=3 each measure 76.03px wide. Hover raises the spine 18px and reveals its neighbor preview.
- Selected book: cover, excerpt, eight first-volume TOC rows, CTA and adjacent spines visible at 1920×1080. Adjusted excerpt type/spacing until detail height and scroll height both equal 718px; no hidden CTA.
- Book navigation: next arrow moved the remaining spine list from 0 to 195px. Old back-to-bookshelf button absent.
- All 20 books have individual nonempty TOCs (Node data check).
- Mobile 390×844 and 320×740: document width matches viewport; readable vertical cover/excerpt/TOC layout; compact remaining spines and horizontal arrows at bottom.
- Mobile portrait widths 112.95px and 169.44px (1.5×); no horizontal document overflow.
- Movie: trailer view and poster return work. All movie CTAs have left-origin 450ms fill layers. Same shared behavior on novel and goods CTA.
- Goods: observed automatic change from 1/3 to 3/3 without clicking; 3000ms interval, real horizontal transition, seamless wrap after 3/3. Pause and manual next verified. Hover/focus pauses; reduced-motion disables autoplay.
- Removed main CTA and review navigation/section/data.
- Production build passes; browser console reports no warnings/errors.

Evidence: `qa/revision-character.png`, `qa/revision-book-desktop.png`, `qa/revision-book-mobile.png`, `qa/revision-compare-book.jpg`. Comparison: reference image and implementation at matched 960×540 thumbnails; media is excluded from fidelity assessment as requested. Desktop structure, border lines, selected-spine placement, excerpt/TOC hierarchy and bottom controls agree with supplied composition; six-item nav reflects removal of reviews.

## Character catalogue correction

PASS: exact category counts [16,7,12,4,4,10], 53 unique IDs, two hidden constellation names. Browser verified all-items count, side-story ordering/titles, separate 1,863/0-round Yoo Joonghyuk entries, and hidden-name detail panel. Browser console clean. Existing image indices preserved; new id-keyed media mapping supports separate variants.

## Inline book expansion and carousel timing revision

Verified Part 1 volume 4 expands after volumes 1–3 with original order preserved and scrollLeft=0. Shelf arrows remain functional. At 390px, horizontal scrolling reached 265px without document overflow. Goods moving cards all retain the same dim border and opacity; bright cyan frame and side dimming are stationary. Computed transition duration: 1 second. Autoplay uses a 4000ms timeout only after motion completes (step=0). Build passed. A development HMR hook-dependency warning from the live code edit was observed; it did not recur after reload.

## Browser comments — 2026-09-22

All six comments addressed. At 1135×911, Part 2 volume 1 auto-scrolls to 432px; detail bounds x=282–920 are inside shelf x=208–1110. Character catalogue preserves order, expands Yoo Sangah after the first three entries, and auto-scrolls to 240px; detail x=308–1000 is inside shelf. World pages fit their measured area (620/660px first page; 577/660px last page); next button exposes the continuation. At 390×844, world pages are recalculated to four pages and fit 451px (418px and 395px verified); no horizontal document overflow. Mobile Yoo Sangah detail x=110–346 lies inside shelf x=13–366 after scrollLeft=255. Poster return computed position is absolute, 21px from panel right edge, at panel bottom. Header pseudo-element uses a 450ms left-origin fill. Goods fixed frame removed: during left-card entry, incoming/outgoing opacities measured 0.681/0.769, other cards 0.45; values derive from the same animation progress as translation so reindexing has no brightness transition. Build passes.
