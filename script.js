const stores = document.querySelectorAll(".store");
      let cart = [];

      stores.forEach(store => {
        store.addEventListener("click", event => {
          if (event.target.classList.contains("add-to-cart")) {
            const itemName = event.target.parentElement.querySelector(
              ".item-name"
            ).innerHTML;
            const itemPrice = event.target.parentElement.querySelector(
              ".item-price"
            ).innerHTML;
            addToCart(itemName, itemPrice);
          }
        });
      });

      function addToCart(itemName, itemPrice) {
        const item = {
          name: itemName,
          price: parseFloat(itemPrice.substring(1)),
          quantity: 1
        };
        const existingItem = cart.find(cartItem => cartItem.name === itemName);
        if (existingItem) {
          existingItem.quantity++;
        } else {
          cart.push(item);
        }
        renderCart();
      }

      function renderCart() {
        const cartContainer = document.querySelector("#cart-items");
        cartContainer.innerHTML = "";
        let total = 0;
        cart.forEach(item => {
          total += item.price * item.quantity;
          const cartItem = document.createElement("tr");
          cartItem.innerHTML = `
            <td>${item.name}</td>
            <td>₹ ${item.price.toFixed(2)}</td>
            <td>
              <button class="decrement">-</button>
              ${item.quantity}
              <button class="increment">+</button>
            </td>
            <td>₹ ${(item.price * item.quantity).toFixed(2)}</td>
          `;
          cartContainer.appendChild(cartItem);
        });
        document.querySelector("#total-amount").innerHTML = total.toFixed(2);
      }

      document.querySelector("#cart-items").addEventListener("click", event => {
        if (event.target.classList.contains("increment")) {
          const itemName = event.target.parentElement.parentElement.querySelector("td:first-child").innerHTML;
          incrementItem(itemName);
        } else if (event.target.classList.contains("decrement")) {
          const itemName = event.target.parentElement.parentElement.querySelector("td:first-child").innerHTML;
          decrementItem(itemName);
        }
      });

      function incrementItem(itemName) {
        const item = cart.find(cartItem =>cartItem.name === itemName);
        item.quantity++;
        renderCart();
        }
        function decrementItem(itemName) {
            const item = cart.find(cartItem => cartItem.name === itemName);
            item.quantity--;
            if (item.quantity === 0) {
              cart = cart.filter(cartItem => cartItem.name !== itemName);
            }
            renderCart();
          }
        
        