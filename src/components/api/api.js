export const fetchSearchId = async () => {
  const response = await fetch('https://aviasales-test-api.kata.academy/search');
  const data = await response.json();
  return data.searchId; //Получила уникальный ключ для запроса
};

export const fetchTicketsId = async (searchId) => {
  const response = await fetch(`https://aviasales-test-api.kata.academy/tickets?searchId=${searchId}`);
  if (!response.ok) {
    //Для 500 ошибки
    throw new Error(`Ошибка сервера ${response.status}`);
  }
  const data = await response.json();
  return data; //Получила пачку билетов по id
};
