1. Task: [link](https://github.com/rolling-scopes-school/tasks/blob/master/tasks/eCommerce-Application/Sprints/Sprint%234.md)
2. Screenshot:
3. Deploy: 
4. Done 18.09.2023 / deadline 18.09.2023
5. Score: 325 / 325

### 📚 Catalog Page Enhancements (105 points - Total)

> Interactive Product Cards **(10 points)** 📋
- [ ] Include an "Add to Cart" button on each product card, enabling users to directly add the product to the shopping cart. _(10 points)_

---

> Shopping Cart Integration **(30 points)** 🔍
- [ ]  Integrate the Catalog Product page with the chosen API (commercetools or any other simple API) to enable users to add products to their shopping cart directly from the product list. _(30 points)_

---

> Performance Optimization **(20 points)** 🃏
- [ ] Implement lazy loading, pagination, or infinite scroll to efficiently load and display a large number of products without significant delays or performance issues, leveraging the chosen API (commercetools or any other simple API) for product data retrieval. _(30 points)_

---

> Modal Window with Image Slider **(45 points)** 🧭
- [ ] Display a modal window with an image, product name, and description when a user hovers over a product image. _(20 points)_
- [ ] Allow users to navigate through all product images using the slider inside the modal window. _(15 points)_
- [ ] Include an "Add to Cart" button in the modal window, enabling users to directly add the product to the shopping cart. _(10 points)_

### 🔎 Detailed Product Page Implementation (40 points - Total)

> Add or Remove Product from Cart **(30 points)** 📝
- [ ] If the product is not already in the user's shopping cart, provide an "Add to Cart" button that adds the product with the selected options to their cart using the chosen API. _(15 points)_
- [ ]   If the product is already in the user's shopping cart, provide a "Remove from Cart" button that allows users to remove the product from their cart using the chosen API. _(15 points)_

---

> Quantity Selection **(10 points)** 🖼️🔍
- [ ]  Allow users to select the desired quantity of the product before adding it to their shopping cart _(10 points)_

### 👥 Basket Page Implementation (105 points - Total)

> Display Basket Items **(25 points)** 📋
- [ ] Use the commercetools API to fetch and display the list of items added to the basket along with essential details such as the name, image, and price. _(252 points)_

---

> Modify Product Quantity **(15 points)** ✏️
- [ ]  Allow users to modify the quantity of each product in the cart, updating the corresponding data using the commercetools API and recalculating the total cost accordingly. _(15 points)_

---

> Remove Product from Car **(15 points)** ✏️
- [ ]  Provide a "Remove from Cart" button for each product, enabling users to delete items from the cart and updating the cart data using the commercetools API. _(15 points)_

---

> Recalculate Total Cost **(15 points)** ✏️
- [ ]  Automatically recalculate the total cost of the items in the shopping cart when users modify product quantities or remove items from the cart, using the updated data from the commercetools API. _(15 points)_

---

> Display Empty Cart Message and Link to Catalog **(10 points)** ✏️
- [ ]  When the shopping cart is empty, display a clear message indicating the cart is empty. _(5 points)_
- [ ]  Provide a link to the catalog of products within the empty cart message, guiding users to easily continue shopping and explore other parts of the website. _(5 points)_

---

> Apply Promo Code and Display Updated Prices **(15 points)** ✏️
- [ ]  Implement a feature that allows users to apply a promo code to their order, offering discounts on eligible items, and updating the total cost of the cart accordingly using the commercetools API. _(10 points)_
- [ ]  Display both the original price and the discounted price after applying the promo code, ensuring that the two prices are visually distinct _(5 points)_

---

> Clear Shopping Cart **(10 points)** ✏️
- [ ]  Provide a "Clear Shopping Cart" button that removes all items from the user's shopping cart and updates the cart data using the commercetools API. _(10 points)_


### 🛣️ About Us Page Implementation (35 points - Total)

> Introduction to the Development Team **(25 points)** ✏️
- [ ]  Create a comprehensive introduction to the development team, highlighting each member's contributions to the project, their effective collaboration methods, as well as personal details such as names, roles, short bios, relevant photos, and GitHub profile links. _(25 points)_

---

> RS School Logo and Link **(10 points)** ✏️
- [ ]  Feature and link the RS School logo on the "About Us" page, making it visible and recognizable, and allowing users to learn more about the educational program by linking it to the school's website. _(10 points)_

### 🛣️ Routing Implementation (20 points)

- [ ]  Implement routing for seamless navigation to the Basket page from all other pages, ensuring that the Basket page is accessible whether the user is logged in or not and supporting browser navigation buttons. _(10 points)_
- [ ]  Implement routing for seamless navigation to the About Us page from all other pages, ensuring that the About Us page is accessible whether the user is logged in or not and supports browser navigation buttons. _(10 points)_

### 🛣️ Evaluation Criteria for Header (20 points)

- [ ]  Implement a basket icon in the header navigation, providing a link to the Basket page and displaying the quantity of items in the cart. _(15 points)_
- [ ]  Incorporate an icon or link in the header navigation leading to the About Us page. _(5 points)_