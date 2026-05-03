import { readFileSync, writeFileSync } from 'fs';

const content = readFileSync('./src/context/LanguageContext.jsx', 'utf-8');

function extractLangBlock(name, nextName) {
  const pattern = new RegExp(`const ${name} = \\{([\\s\\S]*?)\\};\\s*\\n(?:const ${nextName}|const translations)`, 'm');
  const match = content.match(pattern);
  if (!match) return {};

  const block = match[1];
  const obj = {};
  const regex = /['"]([^'"]+)['"]\s*:\s*'((?:[^'\\]|\\.)*)'/g;
  let m;
  while ((m = regex.exec(block)) !== null) {
    obj[m[1]] = m[2].replace(/\\'/g, "'");
  }
  return obj;
}

const translations = {
  tr: extractLangBlock('tr', 'en'),
  en: extractLangBlock('en', 'ar'),
  ar: extractLangBlock('ar', 'ru'),
  ru: extractLangBlock('ru', 'translations'),
};

console.log('TR keys:', Object.keys(translations.tr).length);
console.log('EN keys:', Object.keys(translations.en).length);
console.log('AR keys:', Object.keys(translations.ar).length);
console.log('RU keys:', Object.keys(translations.ru).length);

writeFileSync('./server/data/translations.json', JSON.stringify(translations, null, 2), 'utf-8');
console.log('Translations exported to server/data/translations.json');
