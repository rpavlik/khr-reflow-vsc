// Copyright (c) 2016-2021, The Khronos Group Inc.
// Copyright 2021-2023 Collabora, Ltd
//
// SPDX-License-Identifier: Apache-2.0

import * as vscode from "vscode";
import * as reflow from "@rpavlik/khr-reflow";

export default class Reflower {
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
    const line = document.lineAt(lineNumber);
    if (this.range === null) {
      this.range = line.rangeIncludingLineBreak;
    } else {
      this.range = this.range.union(line.rangeIncludingLineBreak);
    }
    this.state.processNumberedLine(line.text, line.lineNumber);
    return this.state.isBetweenParagraphs();
  }
}
