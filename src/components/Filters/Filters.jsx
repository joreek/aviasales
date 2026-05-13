import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setAllFilters, toggleFilter } from '../../store/slices/filtersSlice';
import { selectFilters } from '../../store/slices/selectors';
import styles from './Filters.module.scss';

const Filters = () => {
  const filters = useSelector(selectFilters);
  const dispatch = useDispatch();

  return (
    <div className={styles.filters}>
      <div className={styles.filters__filter}>КОЛИЧЕСТВО ПЕРЕСАДОК</div>

      <label className={styles.filters__option}>
        <input
          type="checkbox"
          className={styles.filters__checkbox}
          checked={filters.all}
          onChange={() => dispatch(setAllFilters(!filters.all))}
        />
        <span className={styles.filters__label}>Все</span>
      </label>

      <label className={styles.filters__option}>
        <input
          type="checkbox"
          className={styles.filters__checkbox}
          checked={filters.noTransfers}
          onChange={() => dispatch(toggleFilter('noTransfers'))}
        />
        <span className={styles.filters__label}>Без пересадок</span>
      </label>

      <label className={styles.filters__option}>
        <input
          type="checkbox"
          className={styles.filters__checkbox}
          checked={filters.oneTransfer}
          onChange={() => dispatch(toggleFilter('oneTransfer'))}
        />
        <span className={styles.filters__label}>1 пересадка</span>
      </label>

      <label className={styles.filters__option}>
        <input
          type="checkbox"
          className={styles.filters__checkbox}
          checked={filters.twoTransfers}
          onChange={() => dispatch(toggleFilter('twoTransfers'))}
        />
        <span className={styles.filters__label}>2 пересадки</span>
      </label>

      <label className={styles.filters__option}>
        <input
          type="checkbox"
          className={styles.filters__checkbox}
          checked={filters.threeTransfers}
          onChange={() => dispatch(toggleFilter('threeTransfers'))}
        />
        <span className={styles.filters__label}>3 пересадки</span>
      </label>
    </div>
  );
};

export default Filters;
