// Copyright (c) 2016-2021, The Khronos Group Inc.
// Copyright 2021 Collabora, Ltd
//
// SPDX-License-Identifier: MIT

import * as vscode from "vscode";

import * as reflow from "@ryan.pavlik/khr-reflow";

function makeFullDocument(document: vscode.TextDocument): vscode.Range {
  return document.lineAt(document.lineCount - 1).range.with({ start: new vscode.Position(0, 0) });
}

export function formatDocument(document: vscode.TextDocument): vscode.TextEdit[] {
  const input = reflow.stringToLines(document.getText());
  const result = reflow.reflowLines(input, null);
  return [vscode.TextEdit.replace(makeFullDocument(document), result)];
}

export function activate(context: vscode.ExtensionContext) {
  let sel: vscode.DocumentSelector = { language: "asciidoc" };
  vscode.languages.registerDocumentFormattingEditProvider(sel, {
    provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
      const config = vscode.workspace.getConfiguration("khr-reflow");
      if (config.get("enable", true)) {
        return formatDocument(document);
      }
      // it's disabled
      return [];
    },
  });
}

export function deactivate() {}
