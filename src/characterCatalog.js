import { characters } from './content.js';

// User-provided category tables are the source of truth, in row-major order.
export const characterGroups = ['인물전체보기', '김독자 컴퍼니', '화신', '성좌 / 마왕', '도깨비', '기타', '외전'];
const groups = [
 ['김독자 컴퍼니', [
  ['dokja','김독자','구원의 마왕'], ['joonghyuk','유중혁','패왕'],
  ['sooyoung','한수영','흑염마황'], ['sangah','유상아','월하현제'],
  ['hyunsung','이현성','강철검제'], ['heewon','정희원','멸망의 심판자'],
  ['gilyoung','이길영','충왕'], ['yoosung','신유승','비스트 로드'],
  ['jihye','이지혜','대해의 군주'], ['pildu','공필두','무장성주'],
  ['seolhwa','이설화','의선'], ['hayoung','장하영','초월자들의 왕'],
  ['myungoh','한명오','악마 백작'], ['sookyung','이수경','방랑자들의 왕'],
  ['persephone','페르세포네','가장 어두운 봄의 여왕'], ['mia','유미아','유중혁 동생'],
 ]],
 ['화신', [
  ['namwoon','김남운','망상악귀'], ['inho','천인호','선동가'],
  ['anna','안나 크로프트','예언자'], ['jiwon','민지원','미희왕'],
  ['kyrgios','키리오스 로드그라임','역설의 백청'], ['nirvana','니르바나 뫼비우스','구원교주'],
  ['namgung','남궁민영','파천검성'],
 ]],
 ['성좌 / 마왕', [
  ['black-dragon','심연의 흑염룡',''], ['uriel','우리엘','악마 같은 불의 심판자'],
  ['plotter','■■■','은밀한 모략가'], ['monkey-king','제천대성','긴고아의 죄수'],
  ['sunshin','이순신','해상전신'], ['junkyung','척준경','고려제일검'],
  ['surya','수르야','지고한 빛의 신'], ['hades','하데스','부유한 밤의 아버지'],
  ['oldest-dream','■■■','가장 오래된 꿈'], ['asmodeus','아스모데우스','격노와 정욕의 마신'],
  ['agares','아가레스','지옥 동부의 지배자'], ['mass-production','양산형 제작자',''],
 ]],
 ['도깨비', [
  ['bihyung','비형',''], ['biryoo','비류',''], ['youngki','영기',''], ['biyoo','비유',''],
 ]],
 ['기타', [
  ['tls123','tls123','멸살법 작가'], ['joonghyuk-1863','유중혁 (1,863회차)','철혈의 패왕'],
  ['joonghyuk-0','유중혁 (0회차)','패왕'], ['jaehwan','재환','군주 학살자'],
 ]],
 ['외전', [
  ['side-hakhyun','이학현','■■■'], ['side-jieun','지은유','1사도'],
  ['side-joonghyuk','유중혁','패왕'], ['side-heewon','정희원','멸마의 심판자'],
  ['side-dansoo','이단수','불살의 왕'], ['side-sein','경세인','심판자희원'],
  ['side-sungwoo','차성우','2사도 킬러킹'], ['side-yerin','차예린','문학소녀64'],
  ['side-hyunwoo','예현우','7사도'], ['side-snow-dokja','설원의 김독자',''],
 ]],
];
// Preserve the original portrait slots when the catalogue order changes.
const legacyMedia = {'김독자':0,'유중혁':1,'정희원':2,'이현성':3,'유상아':4,'한수영':5,'이길영':6,'한명오':7,'이지혜':8,'신유승':9,'공필두':10,'이설화':11,'우리엘':12,'제천대성':13,'은밀한 모략가':14,'비형':15,'비유':16};
export const catalog = groups.flatMap(([group, entries]) => entries.map(([id,name,role]) => {
 const existing = group==='김독자 컴퍼니' ? characters.find(c=>c.name===name) : undefined;
 return {id,name,role,group,en:existing?.en||group,
  desc:existing?.desc||`${name==='■■■'?role:name} · ${group}`,
  tags:[group,...(role?[role]:[])],
  mediaIndex:group==='외전'||id.startsWith('joonghyuk-')?undefined:legacyMedia[name==='■■■'?role:name],
 };
}));
