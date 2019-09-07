drop database if exists bamazon_db;
create database bamazon_db;
use bamazon_db;

create table products(
    item_id int not null auto_increment,
    product_name varchar(50) not null,
    department_name varchar(50)  not null,
    price int not null,
    stock_quantity int default 0,
    primary key (item_id)
);

insert into products(product_name, department_name, price, stock_quantity)
values ("Rolex Oyster Perpetual", "Luxury Watches", 7000, 5),
("Samsung Galaxy S10", "Mobile Phones", 1500, 10),
("Razer Death Adder", "Computers and Electronics", 50, 50),
("AMD Ryzen 3 1200", "Computers and Electronics", 120, 20),
("Casio Mud Master", "Watches", 200, 20),
("Wilson Pro Staff RF97", "Sporting Goods", 250, 10),
("Yonex Astrox 88s", "Sporting Goods", 200, 10);