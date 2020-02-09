[![Build Status](https://travis-ci.com/cf-digital-ukraine/default-html-template.svg?branch=master)](https://travis-ci.com/cf-digital-ukraine/default-html-template) [![Codacy Badge](https://api.codacy.com/project/badge/Grade/43d32cd89e5e42dabcef8c0ad6aeb5a7)](https://www.codacy.com/app/cf-digital-ukraine/default-html-template?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=cf-digital-ukraine/default-html-template&amp;utm_campaign=Badge_Grade) [![Greenkeeper badge](https://badges.greenkeeper.io/cf-digital-ukraine/default-html-template.svg)](https://greenkeeper.io/) [![devDependency Status](https://david-dm.org/cf-digital-ukraine/default-html-template/dev-status.svg)](https://david-dm.org/cf-digital-ukraine/default-html-template#info=devDependencies) [![Dependency Status](https://david-dm.org/cf-digital-ukraine/default-html-template.svg)](https://david-dm.org/cf-digital-ukraine/default-html-template)
<p align="left">
  <img src="https://cdn.rawgit.com/hjnilsson/country-flags/master/svg/ua.svg" width="25px" height="10px">  
    <a href="./README.ua.md" title="CF.Digital git" style="vertical-align: middle;margin-left: 25px;">README Українською</a>
</p>

# Standard template CF.Digital

- Webpack is an extended package of "laravel-mix" and its configuration differs from the standard one.
- This template works separately from the Laravel itself, and is intended solely for layout.
- Before you begin, you need to change the configuration:
  - _File paths and directories_  
  - _Clear unnecessary parameters_  
  - _If necessary, update dependencies_  
 
- More information about dependencies is in the file [package](./package.json)  
- By default webpack prodaction (npm run prod command) collects:  
  - _JavaScript is compatible with "ES6 <" - browsers_  
  - _postCss minimizes and groups mediaQueries with logic: (min-width) - to increase, (max-width) - to decrease_  

- By default webpack development (npm run dev / watch) performs a similar function, except:
  - _JavaScript ES6 +, enabled soucemap, does not delete comments and console._  

## INSTALL

Must be installed [Node.js with npm 6+](https://nodejs.org/uk/download/)
### Teams run in the terminal - the root of [package](./package.json)  
To download all development dependencies:
```shell
npm install
```
To start file listeners:
```shell
npm run watch
```
  
To install the library, you must add it to the dependent dependencies section of the [package](./package.json), and then `run npm install`.
Or execute the command `npm install *package-name* -S` in the terminal