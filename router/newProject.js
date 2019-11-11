const Router = require('koa-router');
const router = new Router();
const constant = require('../config/const');
const util = require('../util/util');
const res = require('../util/res');
const vscode = require('vscode');
const path = require('path');
const fs = require('fs');
router.get('/new/workbench', async (ctx) => {
    try {
        let scopeInfo = await util.$get(`${constant.NPM_URL}/-/projectModules/`);
        scopeInfo = JSON.parse(scopeInfo.toString());
        let v2WorkBench = scopeInfo.v2WorkBench;

        res.success(ctx, v2WorkBench);
    } catch (error) {
        res.error(ctx, error);
    }
})

router.post('/new/init', async (ctx) => {
    try {
        let { workbench } = ctx.request.body;
        let projectPath = vscode.workspace.rootPath;
        let packagePath = path.join(projectPath, './package.json');
        let webidePath = path.join(projectPath, './config/webide.json');
        let packageJsonData = {};

        let needInit = true;
        if (fs.existsSync(packagePath)) {
            packageJsonData = await util.readFile(packagePath);
            packageJsonData = (packageJsonData && JSON.parse(packageJsonData.toString()))||{};
            if (packageJsonData.__proStatus !== undefined) {
                needInit = false;
            }
        }



        if (needInit) {
            let scopeInfo = await util.$get(`${constant.NPM_URL}/-/projectModules/`);


            scopeInfo = JSON.parse(scopeInfo.toString());
            let v2WorkbenchMap = {};
            let v2LibMap = {};
            let v2Lib = scopeInfo.v2Lib;
            let v2WorkBench = scopeInfo.v2WorkBench;


            let webideLib = v2Lib.filter(item => {
                v2LibMap[item.name] = item.version;
                return item.name === constant.toolkit;
            })

            let codeResult = await util.urlLib(`${constant.NPM_URL}/${constant.toolkit}/download/${constant.toolkit}-${webideLib[0].version}.tgz`);
            let compressPath = path.join(projectPath, './vue-spa');

            await util.uncompress(codeResult, compressPath);
            await util.copyDir(path.join(compressPath, './package'), projectPath);
            await util.rimraf(compressPath);//

            packageJsonData = await util.readFile(packagePath);
            packageJsonData =  JSON.parse(packageJsonData.toString());

            await util.writeFile(path.join(projectPath, './.npmrc'), `${constant.NPMRC}`);



            if (!packageJsonData.dependencies) packageJsonData.dependencies = {};
            if (!packageJsonData.devDependencies) packageJsonData.devDependencies = {};

            // 删除有关workbench的包，动态添加
            Object.keys(packageJsonData.dependencies).forEach(item => {
                if (item.includes("@v2-workbench/")) {
                    delete packageJsonData.dependencies[item]
                }
            })
            // 删除有关workbench的包，动态添加
            Object.keys(packageJsonData.devDependencies).forEach(item => {
                if (item.includes("@v2-workbench/")) {
                    delete packageJsonData.devDependencies[item]
                }
            })

            v2WorkBench.forEach(item => {
                v2WorkbenchMap[item.name] = `^${item.version}`
            })




            if (!fs.existsSync(webidePath)) await util.writeFile(webidePath, JSON.stringify({}));

            let webideData = await util.readFile(webidePath);

            webideData = JSON.parse(webideData.toString());
            webideData.alias = {};
            webideData.plugin = workbench.map((item, i) => {
                packageJsonData.dependencies[item] = v2WorkbenchMap[item]
                let name = item.replace(/[^\/]*\//, "");
                let ret = {
                    "name": name,
                    "type": "product",
                    "module": item,
                    "workbench": `${name}/client/index`,
                    "desp": packageJsonData.description,
                    "adapter": null
                }

                return ret;
            })

            await util.writeFile(webidePath, JSON.stringify(webideData, null, 8));
        }

        packageJsonData.__proStatus = 'installed';
        await util.writeFile(packagePath, JSON.stringify(packageJsonData, null, 8));

        res.success(ctx, []);
    } catch (error) {
        console.log(error)
        res.error(ctx, error);
    }



})


// router.post('/new/changeFinished', async (ctx) => {
//     try {
//         let projectPath = vscode.workspace.rootPath;
//         let packageJsonPath = path.join(projectPath, './package.json');
//         let packageJsonData = await util.readFile(packageJsonPath);
//         packageJsonData = JSON.parse(packageJsonData.toString());
//         packageJsonData.__proStatus = 'installed';
//         await util.writeFile(packageJsonPath, JSON.stringify(packageJsonData, null, 8))
//         res.success(ctx, []);
//     } catch (error) {
//         console.log(error)
//         res.error(ctx, error);
//     }
// })

router.post('/new/command', async (ctx) => {
    try {
        let { command } = ctx.request.body;
        let terminal = vscode.window.createTerminal({ name: `npm install \n npm run build` });
        
        terminal.show(true);
        terminal.sendText(command);
        res.success(ctx, []);
    } catch (error) {
        res.error(ctx, error);

    }


})


module.exports = router;
