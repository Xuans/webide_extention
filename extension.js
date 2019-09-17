
const vscode = require('vscode');
const Koa = require('koa');
const koaStatic = require('koa-static');
const koaBody = require('koa-body')
const http = require('http');
const ConfigProvider = require('./provider/config');
const Webview = require('./webview');
const path = require('path')
const newProject = require('./router/newProject');
const socketIo=require('socket.io');
const util=require('./util/util');
const exec=require('child_process').exec;
const constant=require('./config/const')
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	let app = new Koa();
	app.use(koaBody());
	app.use(koaStatic(
		path.join(__dirname, './views')
	))

	app.use(newProject.routes())
		.use(newProject.allowedMethods());

	let server = http.createServer(app.callback());
	let port=7350;

	const io = socketIo(server);
	

	io.on('connection', (socket)=> { 
		let address = socket.handshake.address;
		console.log('New client: ' + address);
		
		socket.on('/new/install',async()=>{
			let location=vscode.workspace.rootPath;

			let packageJsonPath=path.join(location,'./package.json');
			let packageJsonData=await util.readFile(packageJsonPath);
			packageJsonData=JSON.parse(packageJsonData.toString());

			let installProecess= exec(`npm install --${constant.NPMRC}`, { encoding: "utf8", cwd: location },async (error, stdout, stderr)=>{
				if(error){
					console.log(error);
					socket.emit('/client/uninstall',error);
				}else{
			
					packageJsonData.__proStatus='installed';
					socket.emit('/client/installed');
				}
				await util.writeFile(packageJsonPath,JSON.stringify(packageJsonData,null,8))
				
				
			})
			installProecess.stderr.on('data', data => {
			
				console.log(data)
				socket.emit('/client/installing',data);
			});

			installProecess.stdout.on('data', data => {
				console.log(data)
				socket.emit('/client/installing',data);
			});
		})
	
		
	
		

		
	})//监听客户端链接


	server.listen(port, () => {
		if(port===0){
		  port = parseInt(server.address().port.toString());
		}
		let configProvider = new ConfigProvider();
		let webview = new Webview(port);

		vscode.window.registerTreeDataProvider('webide-config', configProvider);

		context.subscriptions.push(vscode.commands.registerCommand('extension.webide.openDevTool', () => {
			vscode.commands.executeCommand('workbench.action.webview.openDeveloperTools', false);
		}));

		vscode.commands.registerCommand('extension.webide.openPanel', (name, fielName) => {

			try {
				webview.open(name, fielName)

			} catch (err) {
				vscode.window.showErrorMessage(err);
			}
		});

		console.log(`启动成功：http://localhost:${port}`)
	})

}
exports.activate = activate;

// this method is called when your extension is deactivated
function deactivate() { }

module.exports = {
	activate,
	deactivate
}
