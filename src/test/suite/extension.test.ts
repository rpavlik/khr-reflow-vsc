// Copyright Microsoft Corporation
// Copyright 2023-2024, Collabora, Ltd.
//
// SPDX-License-Identifier: MIT

import * as assert from "assert";

// You can import and use all API from the 'vscode' module
// as well as import your extension to test it
import * as vscode from "vscode";
import * as myExtension from "../../extension";

suite("Extension Test Suite", () => {
  vscode.window.showInformationMessage("Start all tests.");

  test("Expect a single edit", () => {
    // vscode.workspace.
    vscode.workspace.openTextDocument({ language: "asciidoc", content: "a\nb\nc." }).then((doc) => {
      const edit = myExtension.formatDocument(doc);
      assert.strictEqual(edit.length, 1);
      // vscode.workspace.applyEdit(edit)
      // assert.strictEqual()
      // vscode.workspace.
    });
  });

  test("Expect no edits edit", () => {
    vscode.workspace.openTextDocument({ language: "asciidoc", content: "a b c.\n" }).then((doc) => {
      const edit = myExtension.formatDocument(doc);
      assert.strictEqual(edit.length, 0);
      // vscode.workspace.applyEdit()
    });
  });
});
