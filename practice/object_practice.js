function Book(title, author, page_num, read_book) {
  this.title = title;
  this.author = author;
  this.page_num = page_num;
  this.read_book = read_book;
  this.info = function () {
    const info_message = `${this.title} by ${this.author}, ${this.page_num}, ${this.read_book}`;
    return info_message;
  };
}

function Player(name, height, strength, power) {
  this.name = name;
  this.height = height;
  this.strength = strength;
  this.power = power;
  this.stats = function () {
    console.log(`${strength} and ${power}`);
  };
}

const player1 = new Player("Elvy", "6ft", 120, 200);
const player2 = new Player("Maria", "5ft", 100, 140);

player1.stats();
player2.stats();
