import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSort } from '../../store/slices/sortSlice';
import styles from './Sorting.module.scss';
import plane from '../../image/plane.svg';
import { selectSort } from '../../store/slices/selectors';

const Sorting = () => {
  const dispatch = useDispatch();
  const sort = useSelector(selectSort);
  return (
    <>
      <img className={styles.sorting__image} src={plane} alt="Логотип самолета" />
      <div className={styles.sorting}>
        <button
          className={`${styles.sorting__button} ${sort === 'cheap' ? styles.sorting__button__active : ''}`}
          onClick={() => dispatch(setSort('cheap'))}
        >
          САМЫЙ ДЕШЕВЫЙ
        </button>
        <button
          className={`${styles.sorting__button} ${sort === 'fast' ? styles.sorting__button__active : ''}`}
          onClick={() => dispatch(setSort('fast'))}
        >
          САМЫЙ БЫСТРЫЙ
        </button>
        <button
          className={`${styles.sorting__button} ${sort === 'optimal' ? styles.sorting__button__active : ''}`}
          onClick={() => dispatch(setSort('optimal'))}
        >
          ОПТИМАЛЬНЫЙ
        </button>
      </div>
    </>
  );
};

export default Sorting;
