let currentLanguage = 'zh';
currentLanguage = document.cookie.indexOf('lang=en') > -1 ? 'en' : 'zh';
const langTitleMap = {
  'zh': '中文',
  'en': 'English',
}
$('#langDropdown').html(langTitleMap[currentLanguage]);

function setCurrentLang(lang) {
  document.cookie = `lang=${lang};max-age=31536000`;
  location.reload();
}

const languageMap = {
  '总体趋势': 'Summary',
  '新增概览': 'Increasements',
  '省市趋势': 'Provinces Trends',
  '省市地图': 'Provinces Map',
  '全部城市地图': 'All Cities Map',
  '世界地图': 'World Map',
  '数据来源': 'Data Source',
  '最后更新时间：': 'Last Update: ',
  '当前显示累计确诊': 'Display Total Confirmed',
  '当前显示现存确诊': 'Display Exists Confirmed',
  '确诊人数：': 'Confirmed: ',
  '治愈人数：': 'Cured: ',
  '死亡人数：': 'Dead: ',
  '新增确诊：': 'New Confirmed: ',
  '暂无数据': 'N/A',
  '治愈': 'Cured',
  '死亡': 'Dead',
  '治疗': 'Treating',
  '新增确诊': 'Confirmed Incr.',
  '无新增确诊天数': 'Zero Incr. Days',
  '治愈/死亡率': 'Cured/Dead Rate',
  '累计死亡率': 'Accum. Dead Rate',
  '累计治愈率': 'Accum. Cured Rate',
  '新增死亡率': '',
  '累计疑似': 'Total Suspected',
  '累计确诊': 'Total Confirmed',
  '当前疑似': 'Exists Suspected',
  '新增疑似': 'Suspected Incr.',
  '疑似确诊比例': 'Suspected Confirmed Rate',
  '疑似检测': 'Suspected Processed',
  '疑似变化': 'Suspected Trend',
  '疑似检测/确诊': 'Suspected Processed',
  '重症率': 'Critical Rate',
  '全国': 'Country',
  '非湖北': 'Excl. Hubei',
  '湖北省': 'Hubei',
  '现存确诊': 'Exists Confirmed',
  '累计死亡率': 'Accum. Dead Rate',
  '累计治愈率': 'Accum. Cured Rate',
  '累计重症比例': 'Accum. Critical Rate',
  '累计重症': 'Accum. Critical',
  '新增重症': 'Critical Incr.',
  '新增治愈': 'Cured Incr.',
  '新增死亡': 'Dead Incr.',
  '确诊': 'Confirmed',
};

function getTextForKey(k) {
  if (currentLanguage !== 'en') {
    return k;
  }

  return languageMap[k] || k;
}

$('#navbarSupportedContent a').get().forEach(a => {
  a.innerHTML = getTextForKey(a.innerHTML);
});