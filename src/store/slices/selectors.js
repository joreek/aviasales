//Селекторы
export const selectTickets = (state) => state.tickets.tickets;
export const selectError = (state) => state.tickets.error;
export const selectLoading = (state) => state.tickets.loading;
export const selectFilters = (state) => state.filters;
export const selectSort = (state) => state.sort.sort;
export const selectVisibleCount = (state) => state.tickets.visibleCount;

// Получаю список выбранных пересадок для TicketList
export const selectSelectedStops = (state) => {
  const filters = selectFilters(state);
  const selectedStops = [];

  if (filters.noTransfers) selectedStops.push(0);
  if (filters.oneTransfer) selectedStops.push(1);
  if (filters.twoTransfers) selectedStops.push(2);
  if (filters.threeTransfers) selectedStops.push(3);
  return selectedStops;
};

// Фильтрация и сортировка для TicketList
export const selectFilteredAndSortedTickets = (state) => {
  const tickets = selectTickets(state);
  const sort = selectSort(state);
  const selectedStops = selectSelectedStops(state);

  const filtered = tickets.filter((ticket) =>
    ticket.segments.some((segment) => selectedStops.includes(segment.stops.length))
  );

  let sorted = [...filtered];

  if (sort === 'cheap') {
    sorted.sort((a, b) => a.price - b.price);
  } else if (sort === 'fast') {
    sorted.sort((a, b) => {
      const aTime = a.segments[0].duration + a.segments[1].duration;
      const bTime = b.segments[0].duration + b.segments[1].duration;
      return aTime - bTime;
    });
  } else if (sort === 'optimal') {
    sorted.sort((a, b) => {
      const aTime = a.segments[0].duration + a.segments[1].duration;
      const bTime = b.segments[0].duration + b.segments[1].duration;
      return a.price + aTime - (b.price + bTime);
    });
  }

  return sorted;
};
