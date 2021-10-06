// Copyright (c) 2016-2021, The Khronos Group Inc.
// Copyright 2021 Collabora, Ltd
//
// SPDX-License-Identifier: Apache-2.0

export const Regexes = {
    // Markup that always ends a paragraph
    //   empty line or whitespace
    //   [block options]
    //   [[anchor]]
    //   //                  comment
    //   <<<<                page break
    //   :attribute-setting
    //   macrodirective::terms
    //   +                   standalone list item continuation
    //   label::             labelled list - label must be standalone
    endPara: /^( *|\[.*\]|\/\/.*|<<<<|:.*|[a-z]+::.*|\+|.*::)$/,

    // Special case of markup ending a paragraph, used to track the current
    // command/structure. This allows for either OpenXR or Vulkan API path
    // conventions. Nominally it should use the file suffix defined by the API
    // conventions (conventions.file_suffix), except that XR uses '.txt' for
    // generated API include files, not '.adoc' like its other includes.
    includePat: /include::(?<directory_traverse>((..\/){1,4}|\{INCS-VAR\}\/|\{generated\}\/)(generated\/)?)(?<generated_type>[\w]+)\/(?<category>\w+)\/(?<entity_name>[^./]+).txt[\[][\]]/,

    // Find the first pname: pattern in a Valid Usage statement
    pnamePat: /pname:(?<param>\w+)/,

    // Markup that's OK in a contiguous paragraph but otherwise passed through
    //   .anything
    //   === Section Titles
    //   image::path_to_image[attributes]  (apparently a single colon is OK but less idiomatic)
    endParaContinue: /^(\..*)|(=+ .+)|(image:.*\[.*\])$/,

    // Markup for block delimiters whose contents *should* be reformatted
    //   --   (exactly two)  (open block)
    //   **** (4 or more)    (sidebar block - works best/only? in AsciiDoctor 2)
    //   ==== (4 or more)    (example block)
    //   ____ (4 or more)    (quote block)
    blockReflow: /^(--|[*=_]{4,})$/,


    // Markup for block delimiters whose contents should *not* be reformatted
    //   |=== (3 or more)  (table)
    //   ++++ (4 or more)  (passthrough block)
    //   .... (4 or more)  (literal block)
    //   //// (4 or more)  (comment block)
    //   ---- (4 or more)  (listing block)
    //   ```  (exactly 3)  (listing block)
    blockPassthrough: /^(\|={3,}|[`]{3}|[-.+/]{4,})$/,

    // Markup for introducing lists (hanging paragraphs)
    //   * bullet
    //     ** bullet
    //     -- bullet
    //   . bullet
    //   :: bullet (no longer supported by asciidoctor 2)
    //   {empty}:: bullet
    //   1. list item
    //   <1> source listing callout
    beginBullet: /^ *([-*.]+|\{empty\}::|::|[0-9]+[.]|<([0-9]+)>) /,

    // Text that (may) not end sentences

    // A single letter followed by a period, typically a middle initial.
    endInitial: /^[A-Z]\.$/,

    // An abbreviation, which doesn't (usually) end a line.
    endAbbrev: /(e\.g|i\.e|c\.f)\.$/i,

    // Explicit Valid Usage list item with one or more leading asterisks
    // The dotAll (s) is needed to prevent vuPat.exec() from stripping
    // the trailing newline.
    vuPat: /^(?<head>  [*]+)( *)(?<tail>.*)/s,

    // Pattern matching leading nested bullet points
    nestedVuPat: /^  \*\*/,
};
