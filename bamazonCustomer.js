var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "guitar87",
    database: "bamazon_db"
});

connection.connect(function (err) {
    if (err) throw err;
    start();
});

function start() {
    connection.query("SELECT * FROM products", function (err, res) {
                if (err) throw err;
                inquirer.prompt([{
                            name: "choice",
                            type: "rawlist",
                            choices: function () {
                                var choiceArray = [];
                                for (i = 0; i < res.length; i++) {
                                    choiceArray.push(res[i].product_name);
                                }
                                return choiceArray;
                            },
                            message: "Enter the product ID you would like to purchase:"
                        },
                        {
                            name: "quantity",
                            type: "input",
                            message: "How many units would you like to buy?",
                            validate: function (value) {
                                if (isNaN(value) === false) {
                                    return true;
                                }
                                return false;
                            }
                        }
                    ])
                    .then(function (answer) {
                        var chosenItem;
                        for (i = 0; i < res.length; i++) {
                            if (res[i].product_name === answer.choice) {
                                chosenItem = res[i];
                            }
                        }
                        if (chosenItem.stock_quantity > parseInt(answer.quantity)) {
                            connection.query(
                                "UPDATE products SET ? WHERE ?",
                                [{
                                        stock_quantity: answer.quantity
                                    },
                                    {
                                        item_id: chosenItem.id
                                    }
                                ],
                                function (err) {
                                    if (err) throw err;
                                    console.log("Order successful!");
                                    start();
                                }
                            );
                        } else {
                            console.log("Insufficient stock!");
                            start();
                        }
                    });
        });
}