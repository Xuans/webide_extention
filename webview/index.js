const vscode = require('vscode');
module.exports = class {

    constructor(port) {
        this.openedWebviewPanels = {};
        this.port = port;

    }

    _getPanelHtml(loactionHref) {
        return `
        <script>
            var style = document.createElement('style'); 
                style.type = 'text/css';
                style.innerHTML="iframe{ visibility: visible !important }"; 
                window.top.document.getElementsByTagName('head')[0].appendChild(style);
                location.href = "${loactionHref}"
        </script>
    `;
    }
    async _newWebview(name, fielName) {
        try {

            let port = this.port;
            let openedWebviewPanels = this.openedWebviewPanels;
            // 打开开发者工具，会把所有webview的都打开

            let panel = vscode.window.createWebviewPanel('aweb-preview', fielName, vscode.ViewColumn.One, {
                enableScripts: true,
                retainContextWhenHidden: true,// 切出不销毁
                localResourceRoots: []
            });

            let loactionHref;
            switch (name) {

                case 'new':
                    loactionHref = `http://127.0.0.1:${port}/#/new`;

                    break;
                case 'dependency':
                    loactionHref = `http://127.0.0.1:${port}/#/dependency`;

                    break;
            }

            if (loactionHref) {
                panel.webview.html = this._getPanelHtml(loactionHref);
                openedWebviewPanels[name] = panel;
                console.log(`打开文件成功，${loactionHref}`);
            } else {
                console.log('没有路径')
            }



        } catch (error) {
            console.log(error);
        }

    }

    open(name, fielName) {

        if (name) {
            let openedWebviewPanels = this.openedWebviewPanels,
                panel = openedWebviewPanels[name];

            if (panel) {
                // 若已经打开了，则显示之
                // 若打开后关闭了，则抛出异常，并重新打开
                // 本来可以使用属性来判断是否已经被关闭, 但typescript报错
                try {
                    panel.reveal();


                } catch (e) {

                    //重新打开
                    this._newWebview(name, fielName);
                }
            } else {
                //新建打开
                this._newWebview(name, fielName);
            }
        } else {
            vscode.window.showErrorMessage("没有适合的文件打开!");
        }

    }
}