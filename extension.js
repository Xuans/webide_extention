
const vscode = require('vscode');
const Koa=require('koa');
const koaStatic=require('koa-static');
const http=require('http');
const ConfigProvider =require('./provider/config');
const Webview =require('./webview');
const path=require('path')

/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let app=new Koa();

	app.use(koaStatic(
		path.join(__dirname, './views')
	))
	let server=	http.createServer(app.callback());
	server.listen(0,()=>{
		let port = parseInt(server.address().port.toString());
		 let configProvider=new ConfigProvider();
		 let webview=new Webview(port);

		 vscode.window.registerTreeDataProvider('config', configProvider);
		
					context.subscriptions.push(vscode.commands.registerCommand('extension.openDevTool', () => {
						vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools', false);
					}));
                   
                    vscode.commands.registerCommand('extension.newProject', (name,fielName) => {
                
                        try {
							webview.open(name,fielName)
                        
                           
                        
                        } catch (err) {
                            vscode.window.showErrorMessage(err);
                        }
					});
					vscode.commands.registerCommand('extension.dependency', (name,fielName) => {
                
                        try {
							webview.open(name,fielName)
                        
                           
                        
                        } catch (err) {
                            vscode.window.showErrorMessage(err);
                        }
                    });
        
		console.log(`启动成功${port}`)

	})

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
