import React,{useState} from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import './index.css';
// 获取本周的日期范围
const getWeekDates = () => {
  const today = new Date();
  const dayOfWeek = today.getDay(); // 0 表示周日，1 表示周一，以此类推
  const startDate = new Date(today);
  startDate.setDate(today.getDate() - dayOfWeek + 1); // 本周第一天
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + (7 - dayOfWeek)); // 本周最后一天

  const weekDates = [];
  for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
    const month = date.getMonth() + 1; // 月份从0开始，需要加1
    const day = date.getDate();
    weekDates.push({
      time: `${month.toString().padStart(2, '0')}-${day.toString().padStart(2, '0')}`, // 格式化为 MM-DD
      quantity: Math.floor(Math.random() * 500), // 随机生成数量
    });
  }

  return weekDates;
};

const data = getWeekDates();



const WaveChart = () => {


  const CustomTooltip = ({ payload, label }) => {
    if ( payload && payload.length ) {
      return (
        <div className="custom-tooltip">
          <p className="label">{`日期: ${label}`}</p>
          <p className="value">{`数量: ${payload[0].value}`}</p>
        </div>
      );
    }
  
    return null;
  };
  return (
    <LineChart width={310} height={200} data={data}  margin={{ top: 5, right: 20, bottom: 5, left: 20 }}>
      {/* <CartesianGrid strokeDasharray="3 3" /> */}
      <XAxis dataKey="time" tick={{ fontSize: 11, lineHeight: '1.5', }} interval={0} />
      <YAxis hide /> {/* 隐藏 Y 轴 */}
      <Tooltip content={<CustomTooltip />} isAnimationActive={false} cursor={{ fill: 'transparent' }} active={true}/>
      <Legend payload={[{ value: '', type: 'line', id: 'quantity' }]} /> 
      <Line type="monotone" dataKey="quantity" stroke="#8884d8" activeDot={{ r: 8 }} />
    </LineChart>
  );
};

export default WaveChart;