const connection = require("./connection");
const cTable = require("console.table");

const orm = {
    selectAll: function (tableName) {
        const queryString = "SELECT * FROM ??";
        connection.query(queryString, [tableName], function (err, result) {
            if (err) throw err;
            console.table(result);
        });
    },

    delete: function (tableName, tableCol) {
        const queryString = ""
    }
}