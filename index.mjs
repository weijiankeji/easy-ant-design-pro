import { execSync } from 'child_process';
import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';

function replaceInFile(filePath, searchValue, replaceValue) {
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const updatedContent = fileContent.replace(new RegExp(searchValue, 'g'), replaceValue);
  fs.writeFileSync(filePath, updatedContent, 'utf8');
}

// 获取脚本路径
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 执行脚本路径
const mockPath = path.join(__dirname, '../mock');
const testsPath = path.join(__dirname, '../tests');
const jestPath = path.join(__dirname, '../jest.config.ts');
const srcUserLoginTest = path.join(__dirname, '../src/pages/User/Login/login.test.tsx');
const srcUserLoginSnapshots = path.join(__dirname, '../src/pages/User/Login/__snapshots__');
const typesPath = path.join(__dirname, '../types');
const srcComponentsFooter = path.join(__dirname, '../src/components/Footer');
const srcComponentsRightContent = path.join(__dirname, '../src/components/RightContent/index.tsx');
const srcLocales = path.join(__dirname, '../src/locales');
const srcPagesAdmin = path.join(__dirname, '../src/pages/Admin.tsx');
const srcPagesWelCome = path.join(__dirname, '../src/pages/Welcome.tsx');
const srcPagesTableList = path.join(__dirname, '../src/pages/TableList');
const srcPages404 = path.join(__dirname, '../src/pages/404.tsx');
const srcServices = path.join(__dirname, '../src/services');
const srcConfigOneApi = path.join(__dirname, '../config/oneapi.json');
const srcAccess = path.join(__dirname, '../src/access.ts');
const publicIcons = path.join(__dirname, '../public/icons');
const publicCNAME = path.join(__dirname, '../public/CNAME');
const publicIco = path.join(__dirname, '../public/favicon.ico');
const publicSvg = path.join(__dirname, '../public/logo.svg');
const publicProIcon = path.join(__dirname, '../public/pro_icon.svg');

// 删除不需要的代码
[
  mockPath,
  testsPath,
  jestPath,
  srcUserLoginTest,
  srcUserLoginSnapshots,
  typesPath,
  srcComponentsFooter,
  srcComponentsRightContent,
  srcLocales,
  srcPagesAdmin,
  srcPagesWelCome,
  srcPagesTableList,
  srcPages404,
  srcServices,
  srcConfigOneApi,
  srcAccess,
  publicIcons,
  publicCNAME,
  publicIco,
  publicSvg,
  publicProIcon,
].forEach((itemPath) => {
  execSync(`rm -rf ${itemPath}`);
});

// 将 replace-source-code 的内容覆盖到 ../ 中
execSync(`cp -r ${path.join(__dirname, './replace-source-code/*')} ${path.join(__dirname, '../')}`);

const args = process.argv.slice(2);

let title = '后台管理系统';
let username = 'admin';
let password = '123456';

if (args.length === 3) {
  title = args[0];
  username = args[1];
  password = args[2];
}

replaceInFile(path.join(__dirname, '../config/defaultSettings.ts'), '{{title}}', title);
replaceInFile(path.join(__dirname, '../src/api.ts'), '{{username}}', username);
replaceInFile(path.join(__dirname, '../src/api.ts'), '{{password}}', password);

// 检查logo
const result = fs.existsSync(`${path.join(__dirname, '../public/logo.png')}`);

if (!result) {
  replaceInFile(path.join(__dirname, '../config/defaultSettings.ts'), '`{{logo}}`', 'null');
} else {
  replaceInFile(path.join(__dirname, '../config/defaultSettings.ts'), '{{logo}}', '/logo.png');
}
