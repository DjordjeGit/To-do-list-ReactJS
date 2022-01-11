import classes from './task.module.css';
import React, { useState } from 'react';

const Task = props => {
  let dateNow = new Date();
  const month = new Date().getMonth() + 1;
  const daysInMonth = new Date(
    dateNow.getFullYear(),
    dateNow.getMonth() + 1,
    0
  ).getDate();
  const { monthToExpire, daysToExpire, yearsToExpire } = props.expireTime;

  let isMonthCountToMonth = monthToExpire >= 1;
  let isDaysDecrease = daysToExpire < 0;

  const mounth =
    monthToExpire > 0
      ? `${
          monthToExpire > 1
            ? monthToExpire + ' months'
            : monthToExpire + ' month'
        }`
      : '';

  const monthAnotherYear =
    yearsToExpire > 0 && isDaysDecrease && monthToExpire + 11 == 0
      ? ''
      : yearsToExpire > 0 && isDaysDecrease && monthToExpire + 11 == 1
      ? monthToExpire + 11 + ' month'
      : monthToExpire + 11 + ' months';

  const days =
    daysToExpire === 0 && !isMonthCountToMonth
      ? ''
      : daysToExpire === 0
      ? 'today'
      : daysToExpire < 0 && isDaysDecrease
      ? `${daysInMonth - daysToExpire * -1 + ' days'}`
      : daysToExpire === 1
      ? daysToExpire + ' day'
      : `${daysToExpire + ' days'}`;

  const years =
    yearsToExpire > 1
      ? yearsToExpire - 1 + `${yearsToExpire - 1 === 1 ? ' year' : ' years'}`
      : '';
  let cntTimeText =
    daysToExpire < 0 && monthToExpire === 0 && yearsToExpire === 0
      ? 'Expired'
      : daysToExpire === 0 && yearsToExpire === 0 && monthToExpire === 0
      ? 'Expire today'
      : `Expire in ${
          yearsToExpire > 0 ? monthAnotherYear : mounth
        } ${days} ${years}`;
  return (
    <li>
      <div className={classes.task}>
        <p className={classes.text}>{props.task}</p>
        <div className={classes.dateHolder}>
          <div className={classes.taskDate}>
            <p>{props.date}</p>
          </div>
          <p className={classes.pForDays}>{cntTimeText}</p>
        </div>
      </div>
    </li>
  );
};
export default Task;
