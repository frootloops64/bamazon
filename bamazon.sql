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
values ("")