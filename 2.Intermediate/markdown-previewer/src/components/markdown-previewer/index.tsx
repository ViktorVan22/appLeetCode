import React, { useEffect, useRef, useState } from "react";
import { marked } from "marked";
import "./style.scss";

marked.setOptions({
  renderer: new marked.Renderer(),
  highlight: function (code, lang) {
    const hljs = require("highlight.js");
    const language = hljs.getLanguage(lang) ? lang : "plaintext";
    return hljs.highlight(code, { language }).value;
  },
  langPrefix: "hljs language-", // highlight.js css expects a top-level 'hljs' class.
  pedantic: false,
  gfm: true,
  breaks: false,
  sanitize: false,
  smartLists: true,
  smartypants: false,
  xhtml: false,
});

const MarkdownPreviewer = () => {
  const [input, setInput] = useState(localStorage.getItem("draft") as string);
  const [copied, setCopied] = useState(false);
  const outputRef = useRef(null);

  function copyText() {
    const copiedText =
      input +
      ` 
      Author: ViktorVan22  
      Project Name: ViktorVan 的 Markdown 解析器  
      时间：${new Date().toLocaleString("zh-CN")}
    `;
    console.log(copiedText);
    navigator.clipboard.writeText(copiedText);
  }

  useEffect(() => {
    if (input) {
      (outputRef as any).current.innerHTML = marked.parse(input);
    }
  }, [input]);

  return (
    <div className="container">
      <header>Markdown Live Preview</header>
      <main>
        <div className="edit-area">
          <button className="copy" onClick={copyText}>
            <span className="tooltiptext" id="myTooltip">
              Copy to Clipboard
            </span>
            Copy Markdown Text
          </button>
          <textarea
            name="editor"
            id="editor"
            cols={30}
            rows={10}
            onChange={e => {
              localStorage.setItem("draft", e.target.value);
              setInput(e.target.value);
            }}
            value={input}
          ></textarea>
        </div>
        <div className="preview" ref={outputRef}></div>
      </main>
    </div>
  );
};

export { MarkdownPreviewer };
