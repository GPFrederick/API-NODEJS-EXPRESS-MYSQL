const express = require('express');
const router = express.Router();

const mysqlConnection = require('../../db/db');

//GET ALL
router.get('/ventas', (req, res) => {
  //query = consulta
  mysqlConnection.query(
    `
  SELECT v._id, v.idCliente, v.idVendedor, v.total_venta, v.created_at,
  CONCAT(n.usu_nombre, ' ', n.usu_apellido) AS cliente, CONCAT(u.usu_nombre, ' ', u.usu_apellido) AS vendedor
  FROM Ventas AS v
  INNER JOIN Usuarios AS u
  ON v.idVendedor = u.idUsuario
  INNER JOIN Usuarios AS n
  ON v.idCliente = n.idUsuario
  `,
    (err, rows, fields) => {
      if (!err) {
        res.json(rows);
      } else {
        console.log(err);
      }
    }
  );
});

router.post('/ventas/create', (req, res) => {
  const sql = `INSERT INTO Ventas SET ?`;

  const ventasObject = {
    idProducto: req.body.idProduct,
    cantidad_producto: req.body.product_quantity,
    total_venta: req.body.total_sale,
    idCliente: req.body.idClient,
    idVendedor: req.body.idSalesman,
  };

  mysqlConnection.query(sql, ventasObject, (err, rows, fields) => {
    if (!err) {
      res.json({ Status: 'Venta creada. (API)' });
    } else {
      console.log(err);
    }
  });
});

module.exports = router;
