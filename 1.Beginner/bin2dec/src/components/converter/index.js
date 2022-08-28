import React, { useState } from "react";
import "./style.scss";

const isValid = input => {
  return /^[01]*$/.test(input) && input !== "";
};

const Converter = () => {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");

  const convert = e => {
    const validation = isValid(input);
    if (!validation) {
      e.preventDefault();
      alert("输入表达式非法！请输入由 0 或 1 组成的二进制数");
      return;
    }
    const res = parseInt(input, 2);
    setOutput(res);
  };

  return (
    <div className="container">
      <div className="input">
        <label for="_input">输入二进制数</label>
        <input
          type="text"
          id="_input"
          className="_input"
          placeholder="请输入由 0 或 1 组成的二进制数，不包含空格"
          onChange={e => setInput(e.target.value)}
        />
        <button
          onClick={e => {
            convert(e);
          }}
        >
          点击转换
        </button>
      </div>
      <div className="output">
        <div className="_output">输出</div>
        <div className="output-text">{output}</div>
      </div>
    </div>
  );
};

export { Converter };
