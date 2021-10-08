// Copyright (c) 2016-2021, The Khronos Group Inc.
// Copyright 2021 Collabora, Ltd
//
// SPDX-License-Identifier: MIT

import * as vscode from "vscode";

import * as reflow from "@ryan.pavlik/khr-reflow";

function makeFullDocument(document: vscode.TextDocument): vscode.Range {
  return document.lineAt(document.lineCount - 1).range.with({ start: new vscode.Position(0, 0) });
}

class Reflower {
  private state: reflow.ReflowState = new reflow.ReflowState();
  private range: vscode.Range | null = null;

  tryGetChunk(): null | { inputRange: vscode.Range; lines: string[] } {
    if (!this.state.isBetweenParagraphs()) {
      return null;
    }
    if (this.range === null) {
      return null;
    }
    const lines = this.state.getEmittedLines();
    const range = this.range;
    this.state.clearEmittedText();
    this.range = null;
    return {
      inputRange: range,
      lines: lines,
    };
  }
  processLine(document: vscode.TextDocument, lineNumber: number): boolean {
    let line = document.lineAt(lineNumber);
    if (this.range === null) {
      this.range = line.rangeIncludingLineBreak;
    } else {
      this.range = this.range.union(line.rangeIncludingLineBreak);
    }
    this.state.processNumberedLine(line.text, line.lineNumber);
    return this.state.isBetweenParagraphs();
  }
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
        console.log("provideDocumentFormattingEdits");
        const input = reflow.stringToLines(document.getText());
        const result = reflow.reflowLines(input, null);
        return [vscode.TextEdit.replace(makeFullDocument(document), result)];
      }
      console.log("khr-reflow disabled");
      return [];
    },
  });
  console.log("Activated khr-reflow");
}

export function deactivate() {}
