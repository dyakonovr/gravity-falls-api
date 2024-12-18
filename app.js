const express = require("express");

const app = express();
const port = 3000;

// Пример данных (персонажи из Гравити Фолз) с ссылками на изображения
let data = [
  { id: 1, name: 'Dipper Pines', age: 12, imageUrl: 'https://example.com/dipper.jpg' },
  { id: 2, name: 'Mabel Pines', age: 12, imageUrl: 'https://example.com/mabel.jpg' },
  { id: 3, name: 'Grunkle Stan', age: 60, imageUrl: 'https://example.com/grunkle_stan.jpg' },
  { id: 4, name: 'Soos Ramirez', age: 22, imageUrl: 'https://example.com/soos.jpg' },
  { id: 5, name: 'Wendy Corduroy', age: 15, imageUrl: 'https://example.com/wendy.jpg' },
  { id: 6, name: 'Bill Cipher', age: 1000000, imageUrl: 'https://example.com/bill.jpg' },
  { id: 7, name: 'Ford Pines', age: 60, imageUrl: 'https://example.com/ford.jpg' },
  { id: 8, name: 'Robbie Valentino', age: 17, imageUrl: 'https://example.com/robbie.jpg' },
  { id: 9, name: 'Pacifica Northwest', age: 16, imageUrl: 'https://example.com/pacifica.jpg' },
  { id: 10, name: 'Lazy Susan', age: 50, imageUrl: 'https://example.com/lazy_susan.jpg' },
  { id: 11, name: 'Candy Chiu', age: 12, imageUrl: 'https://example.com/candy.jpg' },
  { id: 12, name: 'Grenda Grendinator', age: 12, imageUrl: 'https://example.com/grenda.jpg' },
];

// Функция для пагинации и фильтрации
app.get('/', (req, res) => {
  const { name, page = 1, limit = 5 } = req.query;

  // Фильтрация по имени
  let filteredData = data;
  if (name) {
    filteredData = filteredData.filter(item => item.name.toLowerCase().includes(name.toLowerCase()));
  }

  // Пагинация
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  const paginatedData = filteredData.slice(startIndex, endIndex);

  // Рассчитываем общее количество страниц
  const totalPages = Math.ceil(filteredData.length / limit);

  // Ответ с пагинированными и отфильтрованными данными
  res.json({
    page: parseInt(page),
    limit: parseInt(limit),
    totalPages: totalPages,
    results: paginatedData
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
