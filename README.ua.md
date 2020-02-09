

[![Build Status](https://travis-ci.com/cf-digital-ukraine/default-html-template.svg?branch=master)](https://travis-ci.com/cf-digital-ukraine/default-html-template) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/43d32cd89e5e42dabcef8c0ad6aeb5a7)](https://www.codacy.com/app/cf-digital-ukraine/default-html-template?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cf-digital-ukraine/default-html-template&amp;utm_campaign=Badge_Grade) [![Greenkeeper badge](https://badges.greenkeeper.io/cf-digital-ukraine/default-html-template.svg)](https://greenkeeper.io/) [![devDependency Status](https://david-dm.org/cf-digital-ukraine/default-html-template/dev-status.svg)](https://david-dm.org/cf-digital-ukraine/default-html-template#info=devDependencies) [![Dependency Status](https://david-dm.org/cf-digital-ukraine/default-html-template.svg)](https://david-dm.org/cf-digital-ukraine/default-html-template)

<p align="left">
  <img src="https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/gb.svg" width="25px" height="10px">  
    <a href="./README.md" title="CF.Digital git" style="vertical-align: middle;margin-left: 25px;">README English</a>
</p>

# Стандартний шаблон CF.Digital
- Webpack розширений пакетом "laravel-mix" і його конфігурація відрізняется від стандартної.
- Даний шаблон працює окремо від самого Laravel, і призначений виключно для верстки.
- Перед початком роботи, необхідно доналаштувати конфігурацію:
  - _Шляхи файлів і діректорій_
  - _Очистити зайві параметри_
  - _При необхідності оновити залежності_
  
- Детальніше інформація про залежності знаходиться в файлі [package](./package.json)  
- За замовчуванням webpack prodaction(команда npm run prod) збирає:  
  - _JavaScript сумістний с "ES6<" - браузерами_  
  - _postCss мінімізує та группує mediaQueries з логікою: (min-width) - на зростання, (max-width) - на спадання_  

- За замовчуванням webpack development(команда npm run dev/watch) виконує аналогічну функцію, за винятком:  
  - _JavaScript ES6+, ввімкнений soucemap, не видаляє коментарі та консоль._  
  
- На данний момент конфігурація autoprefixer, знаходится в файлі [package](./package.json)  

## Встановлення  

Обов'язково необхідно встановити [Node.js with npm 6+](https://nodejs.org/uk/download/)  
### Команди виконувати в терміналі - корінь [package](./package.json)  
Для завантаження всіх development залежностей виконати:
```shell
npm install
```
Для запуску слухачів файлів:
```shell
npm run watch
```
  
Щоб встановити бібліотеку, необхідно її додати в секцію dependencies файлу [Пакет залежностей] (./ package.json),після чого запустити `npm install`.  
Або виконати команду `npm install * package-name * -S`  