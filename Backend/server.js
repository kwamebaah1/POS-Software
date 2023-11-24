const express = require('express');
const mysql = require('mysql');
const cors = require('cors');

const app = express()
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST, GET, PUT, DELETE"],
        credentials: true
    }
));
app.use(express.json());

const db = mysql.createConnection({
    host: "localhost",
    user: 'root',
    password: "",
    database:'posdb',
}
)


app.post('/login',(req,res) => {
    const sql = "SELECT * FROM users WHERE username= ? AND password = ?";
   
    db.query(sql, [ req.body.userID, req.body.password], (err,data) => {
        if(err) return res.json("Error");
        if(data.length > 0) {
            return res.json({Status: "Success"});
        } else {
            return res.json("No Record");
        }
       
    })
})
app.get('/products',(req,res) => {
    const sql = "SELECT * FROM products";
   
    db.query(sql, (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})
app.get('/bank',(req,res) => {
  const sql = "SELECT * FROM bank";
 
  db.query(sql, (err,data) => {
      if(err) return res.json("Error");
      return res.json(data);
  })
})
app.get('/sales',(req,res) => {
  const sql = "SELECT * FROM purchases";
 
  db.query(sql, (err,data) => {
      if(err) return res.json("Error");
      return res.json(data);
  })
})
app.get('/sale', (req, res) => {
  const query = 'SELECT date, COUNT(*) AS purchaseCount FROM purchases GROUP BY date';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching purchases data:', err);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }

    res.json(results);
  });
});

app.get('/saleschart', (req, res) => {
  const query = 'SELECT date, COUNT(*) AS salesCount FROM purchases GROUP BY date';

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching sales data:', err);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }

    res.json(results);
  });
});

app.get('/expiredproducts', (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0]; // Get current date in 'YYYY-MM-DD' format
  const query = `SELECT * FROM products WHERE date_expired < '${currentDate}'`;

  db.query(query, (err, results) => {
    if (err) {
      console.error('Error fetching expired products:', err);
      res.status(500).json({ error: 'Error fetching data' });
      return;
    }

    res.json(results);
  });
});


app.get('/suppliers',(req,res) => {
    const sql = "SELECT * FROM suppliers";
   
    db.query(sql, (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.get('/expenses',(req,res) => {
    const sql = "SELECT * FROM expenses";
   
    db.query(sql, (err,data) => {
        if(err) return res.json("Error");
        return res.json(data);
    })
})

app.put('/products/:id', (req,res) => {
    const sql = "UPDATE products set 'pname'=?, 'cost_price'=?, 'product_price'=?, 'product_qty'=?, 'date_received'=?, 'date_expired'=? WHERE product_id=?";
    const productId = req.params.id;
    const values= [
        req.body.pname,
        req.body.cost_price,
        req.body.product_price,
        req.body.product_qty,
        req.body.date_received,
        req.body.date_expired,
    ]
    db.query(sql, [...values, productId], (err,data) => {
        if(err) return res.send(err);
        return res.json(data); 
    });
});

app.delete("/products/:id", (req,res)=>{
    const productId = req.params.id;
    const q = "DELETE FROM products WHERE product_id=?"

    db.query(q, [productId], (err,data) =>{
        if (err) return res.send(err);
        return res.json(data);
    })
})

app.delete("/suppliers/:id", (req,res)=>{
    const productId = req.params.id;
    const q = "DELETE FROM suppliers WHERE id=?"

    db.query(q, [productId], (err,data) =>{
        if (err) return res.send(err);
        return res.json(data);
    })
})

app.delete("/expenses/:id", (req,res)=>{
    const productId = req.params.id;
    const q = "DELETE FROM expenses WHERE id=?"

    db.query(q, [productId], (err,data) =>{
        if (err) return res.send(err);
        return res.json(data);
    })
})

const getProductDetailsFromDB = async (productName) => {
  return new Promise((resolve, reject) => {
    db.query('SELECT * FROM products WHERE pname = ?', [productName], (error, results) => {
      if (error) {
        reject(error);
      } else {
        if (results.length > 0) {
          resolve(results[0]); // Assuming productName is unique and returning the first result
        } else {
          resolve(null); // Product not found
        }
      }
    });
  });
};

const updateProductQuantityInDB = async (productName, updatedQuantity) => {
  return new Promise((resolve, reject) => {
    db.query('UPDATE products SET product_qty = ? WHERE pname = ?', [updatedQuantity, productName], (error, results) => {
      if (error) {
        reject(error);
      } else {
        resolve(results);
      }
    });
  });
};

// Assuming you have your Express app set up and connected to your database

// Route to check product quantity
app.get('/products/checkQuantity/:productName/:quantity', async (req, res) => {
  const { productName, quantity } = req.params;

  try {
    // Fetch product details from the database using productName
    const product = await getProductDetailsFromDB(productName); // Implement this function

    if (!product) {
      return res.status(404).json({ available: false, message: 'Product not found' });
    }

    if (product.product_qty < quantity) {
      return res.status(200).json({ available: false, message: 'Quantity unavailable' });
    }

    return res.status(200).json({ available: true });
  } catch (error) {
    console.error('Error checking product quantity:', error);
    res.status(500).json({ available: false, message: 'Internal server error' });
  }
});


app.put('/products/deductQuantity/:productName/:quantity', async (req, res) => {
  const { productName, quantity } = req.params;

  try {
    const product = await getProductDetailsFromDB(productName);

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    const updatedQuantity = product.product_qty - quantity;

    await updateProductQuantityInDB(productName, updatedQuantity);

    return res.status(200).json({ success: true, message: 'Quantity deducted successfully' });
  } catch (error) {
    console.error('Error deducting product quantity:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Endpoint to receive cart data and save it to the database
/*app.post('/invoices', (req, res) => {
  const { cart } = req.body;

  // Assuming you have a table named 'cart_items' with columns id, invnum, pname, product_price, product_qty, and date

  const query = "INSERT INTO purchases (invnum, pname, product_price, quantity, date) VALUES (...)";

  const values = cart.map(item => [
    item.invnum,
    item.pname,
    item.product_price,
    item.quantity,
    new Date(), // Assuming you want to record the current date
    cart_total
  ]);
  db.query(query, [values], (err, result) => {
    if (err) {
        console.error('Error saving cart to database:', err);
        res.status(500).json({ success: false, error: err.message });
        return;
      }
      console.log('Cart data saved to database!');
      res.status(200).json({ success: true, message: 'Cart data saved to database!' });
    });
  });*/

  app.get('/products/:pname', (req, res) => {
    const { pname } = req.params;
    const query = 'SELECT product_price FROM products WHERE pname = ?';
  
    db.query(query, [pname], (err, results) => {
      if (err) {
        console.error('Error fetching product price:', err);
        res.status(500).json({ error: 'Failed to fetch product price' });
        return;
      }
  
      if (results.length === 0) {
        res.status(404).json({ error: 'Product not found' });
        return;
      }
  
      const productPrice = results[0].product_price;
      res.json({ product_price: productPrice });
    });
  });
  
  app.get('/products', (req, res) => {
    const query = 'SELECT pname FROM products'; // Assuming 'products' table with 'pname' column
  
    db.query(query, (err, results) => {
      if (err) {
        console.error('Error fetching product names:', err);
        res.status(500).send('Error fetching product names');
        return;
      }
  
      const productNames = results.map(result => result.pname);
      res.json(productNames);
    });
  });

  app.get('/profits', (req, res) => {
    db.query('SELECT SUM((product_price - cost_price) * product_qty) AS totalProfits FROM products', (error, results) => {
      if (error) {
        console.error('Error fetching total profits: ', error);
        res.status(500).json({ error: 'Unable to fetch total profits' });
        return;
      }
      const totalProfits = results[0].totalProfits || 0;
      res.json({ totalProfits });
    });
  });

  app.get('/profit', (req, res) => {
    db.query('SELECT SUM(profits) AS totalProfits FROM profits_view', (error, results) => {
      if (error) {
        console.error('Error fetching total profits sum: ', error);
        res.status(500).json({ error: 'Unable to fetch total profits sum' });
        return;
      }
      const totalProfitsSum = results[0].totalProfits || 0;
      res.json({ totalProfitsSum });
    });
  });
  
  app.get('/profitsgraph', (req, res) => {
    db.query('SELECT purchase_date, SUM(profits) AS totalProfits FROM profits_graph GROUP BY purchase_date', (error, results) => {
      if (error) {
        console.error('Error fetching profits data: ', error);
        res.status(500).json({ error: 'Unable to fetch profits data' });
        return;
      }
      res.json(results);
    });
  });

  app.post('/invoices', async (req, res) => {
    const {cart} = req.body; // Assuming the request body contains the cart data including cart_total
  
    // Here, you can handle the received cart data and store it in your database
    // For example, insert the cart data into a 'orders' table in your database
  
    // Assuming your 'orders' table has columns like 'invnum', 'pname', 'product_price', 'quantity', 'date', and 'cart_total'
    
    // Your SQL query to insert cart data into the 'orders' table
    const insertQuery = `
    INSERT INTO purchases (invnum, pname, product_price, quantity, date, cart_total)
    VALUES ?
    `;
      const values = cart.map(item => [
        item.invnum,
        item.pname,
        item.product_price,
        item.quantity,
        new Date(), // Assuming you want to record the current date
        item.subtotal
      ]);
      db.query(insertQuery, [values], (err, result) => {
        if(err){
            console.error('Error saving cart to database:', err);
            res.status(500).json({ success: false, error: err.message });
            return;
          }
          console.log('Cart data saved to database!');
          res.status(200).json({ success: true, message: 'Cart data saved to database!' });
        });
      });   
      
app.listen(8081, () => (
    console.log("listening")
))

