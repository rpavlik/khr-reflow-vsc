// Copyright (c) 2016-2021, The Khronos Group Inc.
// Copyright 2021-2023, Collabora, Ltd
//
// SPDX-License-Identifier: MIT

import * as vscode from "vscode";

import * as reflow from "@rpavlik/khr-reflow";

function makeFullDocument(document: vscode.TextDocument): vscode.Range {
  return document.lineAt(document.lineCount - 1).range.with({ start: new vscode.Position(0, 0) });
}

export function formatDocument(document: vscode.TextDocument): vscode.TextEdit[] {
  const input = reflow.stringToLines(document.getText());
  const result = reflow.reflowLines(input, null);
  return [vscode.TextEdit.replace(makeFullDocument(document), result)];
}

export function activate(_context: vscode.ExtensionContext) {
  const sel: vscode.DocumentSelector = { language: "asciidoc" };
  vscode.languages.registerDocumentRangeFormattingEditProvider(sel, {
    provideDocumentRangeFormattingEdits(document, range, _options, _token): vscode.TextEdit[] {
      const config = vscode.workspace.getConfiguration("khr-reflow");
      if (!config.get("enable", true)) {
        // it's disabled
        return [];
      }
      const firstLine = document.lineAt(range.start.line).range;
      const lastLine = document.lineAt(range.end.line).range;

      const expandedRange = firstLine.with({ end: lastLine.end });
      const inputString = document.getText(expandedRange);
      const input = reflow.stringToLines(inputString);
      const result = reflow.reflowLines(input, null);
      if (result === inputString) {
        // no change
        return [];
      }
      return [vscode.TextEdit.replace(expandedRange, result)];
    },
  });
  // vscode.languages.registerDocumentFormattingEditProvider(sel, {
  //   provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
  //     const config = vscode.workspace.getConfiguration("khr-reflow");
  //     if (config.get("enable", true)) {
  //       return formatDocument(document);
  //     }
  //     // it's disabled
  //     return [];
  //   },
  // });
}
