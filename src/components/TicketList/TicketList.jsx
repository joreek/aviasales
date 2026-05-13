import React from 'react';
import {
  selectError,
  selectLoading,
  selectVisibleCount,
  selectFilteredAndSortedTickets,
} from '../../store/slices/selectors';
import Ticket from '../Ticket/Ticket';
import Loader from '../Loader/Loader';
import { useSelector } from 'react-redux';

const TicketList = () => {
  const error = useSelector(selectError);
  const loading = useSelector(selectLoading);
  const visibleCount = useSelector(selectVisibleCount);
  const sortedTickets = useSelector(selectFilteredAndSortedTickets);

  if (sortedTickets.length === 0 && loading) {
    return <Loader />;
  }

  if (error) {
    return <div> Произошла ошибка: {error} </div>;
  }

  if (sortedTickets.length === 0) {
    return <div>Рейсов, подходящих под заданные фильтры, не найдено.</div>;
  }

  return (
    <div>
      {sortedTickets.slice(0, visibleCount).map((ticket) => (
        <Ticket key={ticket.id} ticket={ticket} />
      ))}
    </div>
  );
};

export default TicketList;
