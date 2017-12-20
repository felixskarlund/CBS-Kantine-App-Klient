$(document).ready( () => {
    const currentUser = SDK.Storage.load("currentUser");
    const userId = SDK.Storage.load("user_id");

    // Function to select all sandwiches from database
    SDK.Items.getSandwiches( (error, items) => {
        if(error) {
            alert("Error fetching sandwiches.");
        }
        else {
            // For each item in database, append the HTML-template for items
            items.forEach((item) => {

                // HTML-template for items
                const itemHtml =
                    `<div class='item'>
                        <div class='itemImg'>
                            <img src="${item.itemImg}">
                        </div>
                        <h3>${item.itemName}</h3>
                        <p class="itemDescription">${item.itemDescription}</p>
                        <p class="itemDescription">${item.itemPrice} DKK</p>
                        <input class="button orderButton" data-item-id="${item.itemId}" type="submit" value="Add to cart">
                    </div>`;

                $("#sandwiches").append(itemHtml);
            });

            // When orderButton is clicked, add chosen item to basket
            $(".orderButton").click(function() {
                const itemId = $(this).data("item-id");
                const item = items.find((item) => item.itemId == itemId);
                SDK.Items.addToBasket(item);
                createBasket();
            });
        }
    });

    // Function to select all pastries from database
    SDK.Items.getPastries( (error, items) => {
        if(error) {
            alert("Error fetching pastries.");
        }
        else {
            // For each item in database, append the html-template for items
            items.forEach((item) => {

                // HTML-template for items
                const itemHtml =
                    `<div class='item'>
                  <div class='itemImg'>
                     <img src="${item.itemImg}">
                  </div>
                  <h3>${item.itemName}</h3>
                  <p class="itemDescription">${item.itemDescription}</p>
                  <p class="itemDescription">${item.itemPrice} DKK</p>
                  <input class="button orderButton" data-item-id="${item.itemId}" type="submit" value="Add to cart">
               </div>`;

                $("#pastries").append(itemHtml);
            });

            // When orderButton is clicked, add chosen item to basket
            $(".orderButton").click(function() {
                const itemId = $(this).data("item-id");
                const item = items.find((item) => item.itemId == itemId);
                SDK.Items.addToBasket(item);
                createBasket();
            });
        }
    });

    // Function to select all smoothies from database
    SDK.Items.getSmoothies( (error, items) => {
        if(error) {
            alert("Error fetching smoothies.");
        }
        else {
            // For each item in database, append the html-template for items
            items.forEach((item) => {

                // HTML-template for items
                const itemHtml =
                    `<div class='item'>
                  <div class='itemImg'>
                     <img src="${item.itemImg}">
                  </div>
                  <h3>${item.itemName}</h3>
                  <p class="itemDescription">${item.itemDescription}</p>
                  <p class="itemDescription">${item.itemPrice} DKK</p>
                  <input class="button orderButton" data-item-id="${item.itemId}" type="submit" value="Add to cart">
               </div>`;

                $("#smoothies").append(itemHtml);
            });

            // When orderButton is clicked, add chosen item to basket
            $(".orderButton").click(function() {
                const itemId = $(this).data("item-id");
                const item = items.find((item) => item.itemId == itemId);
                SDK.Items.addToBasket(item);
                createBasket();
            });
        }
    });

    // Function to create basket structure and prepare it for possible items to be added to basket
    createBasket = () => {
        const basket = SDK.Storage.load("basket") || [];
        const $basketContent = $("#basketContent");
        const $totalSum = $("#totalSum");
        let total = 0;

        $basketContent.empty();
        $totalSum.empty();

        // For each entry, append the html-template for basket
        basket.forEach(entry => {
            let subtotal = entry.item.itemPrice * entry.count;
            total += subtotal;

            $basketContent.append(`
                <div id="basketRow" class="basketRow">
                   <div class="itemRow">
                      <p class="itemCount">${entry.count} stk</p>
                      <p class="itemName">${entry.item.itemName}</p>
                      <p class="itemPrice">${subtotal} DKK</p>
                   </div>
                   <div class="clearItem" data-item-id="${entry.item.itemId}">
                      <img src="img/remove.svg">
                   </div>
                </div>
            `);
        });

        // When clearItem is clicked, remove chosen item from basket and load the new basket
        $(".clearItem").click(function() {
            const itemId = $(this).data("item-id");
            SDK.Items.removeFromBasket(itemId);
            createBasket();
        });

        $totalSum.append(`<p id="totalSumText">Total: ${total} DKK</p>`);
    };

    createBasket();

    // When clearBasketButton is clicked, remove all items in the basket and load the new basket
    $("#clearBasketButton").click(() => {
        SDK.Storage.remove("basket");
        createBasket();
    });

    // When checkoutButton is clicked, add all items to selectedItems array and create an order with selected items
    $("#checkoutButton").click(() => {
        const basket = SDK.Storage.load("basket");
        const selectedItems = [];

        for (let i = 0; i < basket.length; i++) {
            for (let j = 0; j < basket[i].count; j++) {
                selectedItems.push(basket[i].item);
            }
        }

        SDK.Orders.createOrder(selectedItems, (error) => {
            if (error) throw error;
            alert("Your order is now sent.");
            SDK.Storage.remove("basket");
            createBasket();
            window.location.reload();
        });
    });

    // Function to select all orders from database that is connected to the user that is logged in
    SDK.Orders.getOrdersById( (error, orders) => {
        if (error) throw error;

        // For each order in database, append the html-template for orders
        orders.forEach((order) => {
            let status = "Not ready";

            if (order.isReady) {
                status = "Ready";
            }

            let $items = "";
            let $total = 0;

            for (let i = 0; i < order.items.length; i++) {
                $items += order.items[i].itemName + "<br>";
                $total += order.items[i].itemPrice;
            }

            // HTML-template for orders
            orderHtml =
                `<div class="orderRow">
               <div class="orderValue">
                  <p class="orderId">${order.orderId}</p>
               </div>
               <div class="orderValue">
                  <p class="orderItems">${$items}</p>
               </div>
               <div class="orderValue">
                  <p class="orderPrice">${$total} DKK</p>
               </div>
               <div class="orderValue">
                  <p class="orderStatus" data-order-status="${status}">${status}</p>
               </div>
            </div>`;

            $("#orderContent").append(orderHtml);

            if (order.items.length > 0) {
                $("#emptyOrderList").css("display", "none");
            }

            $(".orderStatus").filter('[data-order-status="Not ready"]').addClass("notReady");
            $(".orderStatus").filter('[data-order-status="Ready"]').addClass("ready");
        })
    });

    // When logOutButton is clicked, log out user
    $("#logOutButton").on('click', () => {
        SDK.logOut( () => {
            window.location.href = "index.html";
        });
    });
});

// Function to add functionality to the separate tabs
function openTab(tab, tabNumber) {
    var i, tabcontent, tabs;

    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    tabs = document.getElementsByClassName("tabs");
    for (i = 0; i < tabs.length; i++) {
        tabs[i].className = tabs[i].className.replace(" current", "");
    }

    document.getElementById(tabNumber).style.display = "flex";
    tab.currentTarget.className += " current";
}