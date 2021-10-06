// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import * as vscode from 'vscode';

// import { reflowLines, stringToLines } from 'khr-reflow-ts';

import { reflowLines, stringToLines } from './main';

function makeFullDocument(document: vscode.TextDocument): vscode.Range {
	return document.lineAt(document.lineCount - 1).range.with({ start: new vscode.Position(0, 0) });
}

// this method is called when your extension is activated
// your extension is activated the very first time the command is executed
export function activate(context: vscode.ExtensionContext) {

	// Use the console to output diagnostic information (console.log) and errors (console.error)
	// This line of code will only be executed once when your extension is activated
	console.log('Congratulations, your extension "khr-reflow-vsc" is now active!');
	let sel: vscode.DocumentSelector = { language: 'asciidoc' };
	vscode.languages.registerDocumentFormattingEditProvider(sel, {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			const input = stringToLines(document.getText());
			const result = reflowLines(input, null);
			return [vscode.TextEdit.replace(makeFullDocument(document), result)];
		}
	});

}

// this method is called when your extension is deactivated
export function deactivate() { }
