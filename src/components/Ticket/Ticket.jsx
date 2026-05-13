import React from 'react';
import styles from './Ticket.module.scss';
import { addMinutes, format } from 'date-fns';

// Форматирую время в красивую строку
const formatDuration = (minutes) => {
  const hours = Math.floor(minutes / 60); // Получаю количество полных часов
  const mins = minutes % 60; // Получаю количество оставшихся минут
  return `${hours}ч ${mins}м`;
};

// Текст для количества пересадок
const stopsText = (count) => {
  if (count === 0) return 'Без пересадок';
  if (count === 1) return '1 пересадка';
  if (count >= 2 && count <= 4) return `${count} пересадки`;
  return `${count} пересадок`;
};

// Форматирую время в красивое число
const formatTime = (dateString, duration) => {
  const start = new Date(dateString);
  const end = addMinutes(start, duration);
  const formatStart = format(start, 'HH:mm');
  const formatEnd = format(end, 'HH:mm');
  return `${formatStart} - ${formatEnd}`;
};

const Ticket = ({ ticket }) => {
  const { price, carrier, segments } = ticket;

  return (
    <div className={styles.ticket}>
      <div className={styles.ticket__header}>
        <div className={styles.ticket__price}>{price} Р</div>
        <img className={styles.ticket__logo} src={`//pics.avs.io/99/36/${carrier}.png`} alt={`${carrier} Airlines`} />
      </div>

      <div className={styles.ticket__info}>
        {segments.map((segment, index) => (
          <div className={styles.ticket__segment} key={index}>
            <div className={styles.ticket__route}>
              <span className={styles.ticket__title}>
                {segment.origin} – {segment.destination}
              </span>
              <span className={styles.ticket__value}>{formatTime(segment.date, segment.duration)}</span>
            </div>

            <div className={styles.ticket__duration}>
              <span className={styles.ticket__title}>В пути</span>
              <span className={styles.ticket__value}>{formatDuration(segment.duration)}</span>
            </div>

            <div className={styles.ticket__stops}>
              <span className={styles.ticket__title}>{stopsText(segment.stops.length)}</span>
              <span className={styles.ticket__value}>{segment.stops.join(', ') || '—'}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Ticket;
