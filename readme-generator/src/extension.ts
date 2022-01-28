// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';
import { ReadmeWriter } from './lib/ReadmeWriter';

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {
	
	console.log('Congratulations, your extension "README-generator" is now active!')
	
	context.subscriptions.push(
		vscode.commands.registerCommand('readme-generator.readme', (url) =>
		  insertReadme(context, url.path)
		)
	);
	function insertReadme(context: vscode.ExtensionContext, url: string) {
		const writer = new ReadmeWriter(context);
		writer.insertReadme(url);
	}
}

// this method is called when your extension is deactivated
export function deactivate() {}
