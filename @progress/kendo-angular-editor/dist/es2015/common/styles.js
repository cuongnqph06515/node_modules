/**-----------------------------------------------------------------------------------------
* Copyright © 2020 Progress Software Corporation. All rights reserved.
* Licensed under commercial license. See LICENSE.md in the project root for more information
*-------------------------------------------------------------------------------------------*/
/**
 * @hidden
 */
export const defaultStyle = `
html, body {
    margin: 0;
    height: 100%;
    padding: 0;
}

html {
  min-height: 100%;
}

body {
  box-sizing: border-box;
  position: relative;
  padding: 8px;
}

.ProseMirror-selectednode {
  outline: 2px solid #8cf;
}

div.ProseMirror {
  position: relative;
  min-height: 100%;
  word-wrap: break-word;
  white-space: pre-wrap;
  white-space: break-spaces;
  -webkit-font-variant-ligatures: none;
  font-variant-ligatures: none;
  font-feature-settings: "liga" 0; /* the above doesn't seem to work in Edge */
}

div.ProseMirror:focus {
  outline: none;
}

.ProseMirror pre {
  white-space: pre-wrap;
}

.ProseMirror-hideselection *::selection { background: transparent; }
.ProseMirror-hideselection *::-moz-selection { background: transparent; }
.ProseMirror-hideselection { caret-color: transparent; }

.ProseMirror li {
  position: relative;
}

li.ProseMirror-selectednode {
  outline: none;
}

li.ProseMirror-selectednode:after {
  content: "";
  position: absolute;
  left: -32px;
  right: -2px;
  top: -2px;
  bottom: -2px;
  border: 2px solid #8cf;
  pointer-events: none;
}

.ProseMirror-gapcursor {
  display: none;
  pointer-events: none;
  position: absolute;
}

.ProseMirror-gapcursor:after {
  content: "";
  display: block;
  position: absolute;
  top: -2px;
  width: 20px;
  border-top: 1px solid black;
  animation: ProseMirror-cursor-blink 1.1s steps(2, start) infinite;
}

@keyframes ProseMirror-cursor-blink {
  to {
    visibility: hidden;
  }
}

.ProseMirror-focused .ProseMirror-gapcursor {
  display: block;
}
`;
/**
 * @hidden
 */
export const tablesStyles = `
  .ProseMirror .tableWrapper {
    overflow-x: auto;
    margin: 1em 0;
  }

  .ProseMirror table {
    margin: 0;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
    overflow: hidden;
  }

  .ProseMirror td, .ProseMirror th {
    min-width: 1em;
    border: 1px solid #ddd;
    padding: 3px 5px;
    vertical-align: top;
    box-sizing: border-box;
    position: relative;
  }

  .ProseMirror th {
    font-weight: bold;
    text-align: left;
  }

  .ProseMirror .column-resize-handle {
    position: absolute;
    right: -2px;
    top: 0;
    bottom: 0;
    width: 4px;
    z-index: 20;
    background-color: #adf;
    pointer-events: none;
  }

  .ProseMirror.resize-cursor {
    cursor: ew-resize;
    cursor: col-resize;
  }

  /* Give selected cells a blue overlay */
  .ProseMirror .selectedCell:after {
    z-index: 2;
    position: absolute;
    content: "";
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(200, 200, 255, 0.4);
    pointer-events: none;
  }
`;
/**
 * @hidden
 */
export const rtlStyles = 'body { direction: rtl }';
