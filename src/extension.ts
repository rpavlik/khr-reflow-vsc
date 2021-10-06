// Copyright (c) 2016-2021, The Khronos Group Inc.
// Copyright 2021 Collabora, Ltd
//
// SPDX-License-Identifier: MIT

import * as vscode from 'vscode';

// import { reflowLines, stringToLines } from 'khr-reflow-ts';
import { reflowLines, stringToLines } from './main';

function makeFullDocument(document: vscode.TextDocument): vscode.Range {
	return document.lineAt(document.lineCount - 1).range.with({ start: new vscode.Position(0, 0) });
}

export function activate(context: vscode.ExtensionContext) {

	let sel: vscode.DocumentSelector = { language: 'asciidoc' };
	vscode.languages.registerDocumentFormattingEditProvider(sel, {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			const input = stringToLines(document.getText());
			const result = reflowLines(input, null);
			return [vscode.TextEdit.replace(makeFullDocument(document), result)];
		}
	});

}

export function deactivate() { }
