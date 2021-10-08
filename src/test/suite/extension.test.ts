// Copyright Microsoft Corporation
//
// SPDX-License-Identifier: MIT

import * as assert from 'assert';

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from 'vscode';
 import * as myExtension from '../../extension';

suite('Extension Test Suite', () => {
	vscode.window.showInformationMessage('Start all tests.');
	vscode.workspace.openTextDocument({ language: "asciidoc", content: "a\nb\nc." }).then((doc) => {
		myExtension.formatDocument(doc);
	});

	test('Sample test', () => {
		assert.strictEqual(-1, [1, 2, 3].indexOf(5));
		assert.strictEqual(-1, [1, 2, 3].indexOf(0));
	});
});
