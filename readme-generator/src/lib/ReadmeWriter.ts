import * as vscode from 'vscode';
import * as path from 'path';
import { ContentReader } from './ContentReader';

export class ReadmeWriter {
    fs = vscode.workspace.fs;
    constructor(private context: vscode.ExtensionContext) {}
  
    async insertReadme(url: string) {
        await this.createFile(url);
    }
  
    private async createFile(url: string) {
        let content = '';
        const reader = new ContentReader(url);
        const filePath = this.getFilePath(url);

        try{
            await this.fs.stat(vscode.Uri.file(filePath));
            const ReadmeFile = await this.fs.readFile(vscode.Uri.file(filePath));
            console.log('README.md file existed');
            content = await reader.environmentCheck(ReadmeFile.toString());
            await this.fs.writeFile(vscode.Uri.file(filePath), Buffer.from(content));
            vscode.window.showInformationMessage('目录结构已经被重加载')
            return;
        }catch{
            const Path = this.context.asAbsolutePath(path.join('file', 'standard-README.md'));
            const standardReadme = await this.fs.readFile(vscode.Uri.file(Path));
            console.log(`url:${filePath}`);
            console.log("a new README is created");
            if (filePath) {
                content = await reader.environmentCheck(standardReadme.toString());
                await this.fs.writeFile(vscode.Uri.file(filePath), Buffer.from(content));
            }
        }
    }
  
    private getFilePath(url: string) {
        const fileName = 'README.md';
        let filePath = '';
    
        if (url) {
            filePath = url+'/'+fileName;
        }
        console.log(filePath);
        return filePath;
    }
  }