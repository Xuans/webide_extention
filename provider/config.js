const vscode = require('vscode');
module.exports= class {
    
    constructor() {
        this._onDidChangeTreeData = new vscode.EventEmitter();
    }


    refresh() {
        this._onDidChangeTreeData.fire();
    }

    getTreeItem(element) {
        return element;
    }

    getChildren() {
        return Promise.resolve([{
            label: '新建项目',
            collapsibleState: 0,
            command: {
                command: 'extension.newProject',
                title: '新建项目',
                arguments: ['new','新建项目']
            }
        },{
            label: '依赖管理',
            collapsibleState: 0,
            command: {
                command: 'extension.dependency',
                title: '依赖管理',
                arguments: ['dependency','依赖管理']
            }
        }
    ]);

    }





}

