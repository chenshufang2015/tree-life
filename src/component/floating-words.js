import React from "react";
import "./index.css";

const WordCloud = ({ words }) => {
  return (
    <div className="word-cloud">
      {words.map((word, index) => (
        <span
          key={index}
          className="word"
          style={{
            top: word.top, // 纵向位置
            left: word.left, // 横向位置
            fontSize: word.fontSize, // 字体大小
            color: word.color, // 自定义颜色
            animation: `float ${Math.random() * 3 + 2}s ease-in-out infinite ${index * 0.5}s`, // 添加动画，延迟时间随机
          
          }}
        >
          {word.text}
        </span>
      ))}
    </div>
  );
};

export default WordCloud;
