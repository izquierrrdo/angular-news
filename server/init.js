const casual = require('casual').ru_RU;
const fs = require('fs');

casual.define("news", function(id) {
    return {
        id: id,
        title: casual.title,
        text: casual.text,
        date: casual.date(format = 'YYYY-MM-DD'),
        img: `https://picsum.photos/id/${id+12}/450/330`,
        likes: Math.floor(Math.random() * 11),
        liked: false
    };
});

const data = {
    news: []
};

for (let i = 0; i < 500; i++) {
    data.news.push(casual.news(i));
}

const json = JSON.stringify(data);
fs.writeFile('db.json', json, 'utf8', function (err) {
    if (err) throw err;
    console.log('generate-data completed!');
});
