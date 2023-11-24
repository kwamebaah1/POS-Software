import React , { useState, useEffect }from 'react'
import './invoices.css';
import { FaHome} from 'react-icons/fa';
import { IoTrashOutline} from 'react-icons/io5';


export default function Invoices() {
        const [cart, setCart] = useState([]);
        const [formData, setFormData] = useState({
          invnum: '',
          pname: '',
          product_price: '',
          quantity: ''
        });
        
        const [productNames, setProductNames] = useState([]);
        const [cartTotal, setCartTotal] = useState(0);

    useEffect(() => {
    // Fetch product names from your MySQL database and update the productNames state
    fetch('http://localhost:8081/products')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setProductNames(data);
      })
      .catch(error => {
        console.error('Error fetching product names:', error);
        // Handle the error (e.g., display an error message to the user)
      });
    }, []);

        const handleChange = async (e) => {
            const { name, value } = e.target;
            setFormData({ ...formData, [name]: value });

            if (name === 'pname') {
                try {
                  const response = await fetch(`http://localhost:8081/products/${value}`); // Backend endpoint to fetch product price by name
                  const { product_price } = await response.json();
                  setFormData(prevData => ({...prevData, product_price })); // Update product_price in form data
                } catch (error) {
                  console.error('Error fetching product price:', error);
                }
              }
            };
        
          const addToCart = async (e) => {
            e.preventDefault(); // Prevent page reload
            if (formData.pname && formData.product_price && formData.quantity) {
                    const subitemTotal = parseFloat(formData.product_price) * parseInt(formData.quantity);
                     const newCartItem = {
                      ...formData,
                      subtotal: subitemTotal // Calculate and format subtotal to two decimal places
                      };
                    // Update the cart total
                   /* const newCartTotal = cartTotal + itemTotal;
                    
                    const dataToSend = {
                      ...formData,
                      cart_total: newCartTotal
                    };
                  const response = await fetch('http://localhost:8081/invoices', {
                    method: 'POST',
                    headers: {
                      'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(dataToSend)
                  });
            
                  if (response.ok) {*/
                    
            setCart([...cart, newCartItem]);
            setFormData({
              invnum: '',
              pname: '',
              product_price: '',
              quantity: ''
            });
        
    }else {
        console.error('Please fill all fields');
      }
    };
            

          const removeFromCart = (index) => {
            const updatedCart = [...cart];
            updatedCart.splice(index, 1);
            setCart(updatedCart);
          };
          const submitCartToServer = async () => {
            try {

              const cartTotal = calculateTotal();
    const cartItems = [...cart];

    for (const item of cartItems) {
      const { pname, quantity } = item;

      const response = await fetch(`http://localhost:8081/products/checkQuantity/${pname}/${quantity}`);
      const { available, message } = await response.json();

      if (!available) {
        alert(message);
        return;
      }
    }

    // Deduct quantity from the database for each item in the cart
    for (const item of cartItems) {
      const { pname, quantity } = item;

      await fetch(`http://localhost:8081/products/deductQuantity/${pname}/${quantity}`, {
        method: 'PUT' // Use appropriate HTTP method to update the quantity in your backend
      });
    }
                // Prepare the data to send to the server
                const dataToSend = {
                  cart: cart, // Your cart data
                };
                
                const response = await fetch('http://localhost:8081/invoices', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify(dataToSend)
                });
          
                if (response.ok) {
                  console.log('Cart submitted successfully');
                  handlePrint();
                  setCart([]);
                  // Handle success if needed
                  // ...
                } else {
                  console.error('Failed to submit cart');
                }
              } catch (error) {
                console.error('Error submitting cart:', error);
              }
        }
        const handlePrint = () => {
          window.print();
        }
          const calculateTotal = () => {
            return cart.reduce((total, item) => {
              const itemTotal = parseFloat(item.product_price) * parseFloat(item.quantity);
              return total + itemTotal;
            }, 0).toFixed(2); // Ensures the total is formatted to two decimal places
        }
          /*const subTotal = () => {
            return cart.reduce((item) => {
              const itemSubTotal = parseFloat(item.product_price) * parseFloat(item.quantity);
              return itemSubTotal;
            }, 0).toFixed(2);
          }*/
        return (
            <div>
        <div className='invtop'>
        <h3 className='invh3'>Add Invoice</h3>
        <a href='/app'>
        <button className='invhome'>Home<FaHome/></button>
        </a>
        </div>
        <div className='invbody'>
            <form className='invform'>
            <div className='flex1'>
                <label className='label3'>
                    <span className='invspan'> Invoice No:</span>
                    <input required="" placeholder='' type='text' name='invnum' className='input0' value={formData.invnum} onChange={handleChange} /> 
                </label>
                <select name="pname" value={formData.pname} onChange={handleChange} className='input3'>
  <option value="">Select a product</option>
  {productNames.map((product, index) => (
    <option key={index} value={product.pname}>
      {product.pname}
    </option>
  ))}
</select>
            </div>
            <hr></hr>
            <div className='flex1'>
            <label className='label3'>
                    <span className='invspan'>Quantity:</span>
                    <input required="" placeholder='' type='number' className='input5' name="quantity" value={formData.quantity} onChange={handleChange} />
                </label>

        <input
          type="text"
          name="product_price"
          value={formData.product_price}
          onChange={handleChange}
          placeholder="Product Price"
          readOnly // Ensure users can't directly modify the price
          className='input4'
          />
            </div>
           
            <button className='submit1' onClick={addToCart}>Add to Cart</button>
            </form>
            <div>
        <h2 className='carth2'>Cart</h2>
        <table>
            <thead>
                <tr>
                    <th>Invoice Number</th>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Sub Total</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id='tablelistings'>
          {cart.map((item, index) => (
            <tr key={index}>
                <td>{item.invnum}</td>
                <td>{item.pname}</td>
                <td>{item.product_price}</td>
                <td>{item.quantity}</td>
                <td>${item.subtotal}</td>
                <td>
                <button onClick={() => removeFromCart(index)} className='deletebtn'><IoTrashOutline/></button>
                </td>
            </tr>
          ))}
        </tbody>
        </table>
        <p className="cart-total">Cart Total: ${calculateTotal()}</p>
        <button type="button" onClick={submitCartToServer} className='subbtn'>Submit Cart</button>
      </div>
    </div>
        </div>

  )
 };

