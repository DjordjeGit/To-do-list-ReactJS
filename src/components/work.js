import React, { useRef, useEffect, useState, useCallback } from 'react';
import Section from '../UI/section';
import InputForm from './inputForm';
import Task from '../UI/task';
import classes from './work.module.css';
const Work = props => {
  const InputHadnler1 = (data, e) => {
    console.log(data);

    localStorage.setItem(props.lastKey + 1 + props.prefix, data.get('text'));
    localStorage.setItem(
      props.lastKey + 1 + props.prefix + 'd', //prefix is use to specified type of to do and different id
      data.get('date')
    );
    props.change();
  };
  const deleteItem = (idt, idd) => {
    localStorage.removeItem(idt);
    localStorage.removeItem(idd);
    props.change();
  };
  const { tasks, dates } = props.values;
  let li1 = props.values.tasks.map((el, i) => {
    const { taskKeys, dateKeys } = props.keyList[props.prefix];
    let idT = taskKeys[i];
    let idD = dateKeys[i];
    let date = dates[i];
    let dateNow = Intl.DateTimeFormat('en', {
      day: '2-digit',
      mounth: '2-digit',
      year: 'numeric',
    }).format(new Date());
    const newDate = new Date();
    const daysInMonth = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0
    ).getDate();

    const dayToExpire =
      Number(date.substring(date.indexOf('/') + 1, date.lastIndexOf('/'))) -
      Number(
        dateNow.substring(dateNow.indexOf('/') + 1, dateNow.lastIndexOf('/'))
      );
    const dateValue = Intl.DateTimeFormat('en', {
      dateStyle: 'short',
    }).format(new Date());
    /////////////// set expire time values and set props to task component
    const monthOverlap =
      Number(date.substring(0, date.indexOf('/'))) -
        Number(new Date().getMonth() + 1) ===
      1;
    const pickCorrectMonth = () => {
      if (monthOverlap) {
        return '';
      }
      return (
        Number(date.substring(0, date.indexOf('/'))) -
        Number(new Date().getMonth() + 1)
      );
    };

    const pickCorrectDay = () => {
      let overlapDays;
      if (monthOverlap) {
        overlapDays =
          daysInMonth -
          Number(new Date().getDate()) +
          Number(date.substring(date.indexOf('/') + 1, date.lastIndexOf('/')));
        return overlapDays;
      } else
        return Number(
          date.substring(date.indexOf('/') + 1, date.lastIndexOf('/')) -
            Number(new Date().getDate())
        );
    };

    const pickCorrectYear = () => {
      return Number(
        Number(date.substring(date.lastIndexOf('/') + 1)) -
          Number(new Date().getFullYear())
      );
    };
    const expireTime = {
      monthToExpire: pickCorrectMonth(),
      daysToExpire: pickCorrectDay(),
      yearsToExpire: pickCorrectYear(),
    };
    ///////////////////////////////////////////////////////
    const id = Math.random().toString(16).substring(5, 10);
    return (
      <section key={id}>
        <div className={classes.lispacing} key={el.text}>
          <Task task={el} date={date} expireTime={expireTime} />
          <button
            className={classes.cancel}
            type="button"
            onClick={deleteItem.bind(null, idT, idD)}
          >
            X
          </button>
        </div>
      </section>
    );
  });

  const wrapColore = `${classes.colore} ${classes[props.prefix]}`;
  return (
    <React.Fragment>
      <div className={classes.work}>
        <div className={wrapColore}>
          <Section>
            <InputForm InputHandler={InputHadnler1} />
          </Section>
          <ul>{li1}</ul>
        </div>
      </div>
    </React.Fragment>
  );
};
export default Work;
