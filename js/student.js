$(document).ready( () => {
    const currentUser = SDK.Storage.load("currentUser");
    const userId = SDK.Storage.load("user_id");

    SDK.Items.getSandwiches( (error, items) => {
        if(error) {
            alert("Error fetching sandwiches.");
        }
        else {
            items.forEach((item) => {
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

            $(".orderButton").click(function() {
                const itemId = $(this).data("item-id");
                const item = items.find((item) => item.itemId == itemId);
                SDK.Items.addToBasket(item);
                createBasket();
            });
        }
    });

    SDK.Items.getPastries( (error, items) => {
        if(error) {
            alert("Error fetching pastries.");
        }
        else {
            items.forEach((item) => {
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

            $(".orderButton").click(function() {
                const itemId = $(this).data("item-id");
                const item = items.find((item) => item.itemId == itemId);
                SDK.Items.addToBasket(item);
                createBasket();
            });
        }
    });

    SDK.Items.getSmoothies( (error, items) => {
        if(error) {
            alert("Error fetching smoothies.");
        }
        else {
            items.forEach((item) => {
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

            $(".orderButton").click(function() {
                const itemId = $(this).data("item-id");
                const item = items.find((item) => item.itemId == itemId);
                SDK.Items.addToBasket(item);
                createBasket();
            });
        }
    });

    createBasket = () => {
        const basket = SDK.Storage.load("basket") || [];
        const $basketContent = $("#basketContent");
        const $totalSum = $("#totalSum");
        let total = 0;

        $basketContent.empty();
        $totalSum.empty();

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

        $(".clearItem").click(function() {
            const itemId = $(this).data("item-id");
            SDK.Items.removeFromBasket(itemId);
            createBasket();
        });

        $totalSum.append(`<p id="totalSumText">Total: ${total} DKK</p>`);
    };

    createBasket();

    $("#clearBasketButton").click(() => {
        SDK.Storage.remove("basket");
        createBasket();
    });

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

    SDK.Orders.getOrdersById( (error, orders) => {
        if (error) throw error;

        orders.forEach((order) => {
            let status = "Not ready";

            if (order.isReady) {
                status = "Ready";
            }

            let $items = "";
            let $quantity = 0;
            let $total = 0;

            for (let i = 0; i < order.items.length; i++) {
                $items += order.items[i].itemName + "<br>";
                $total += order.items[i].itemPrice;
            }

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

    $("#logOutButton").on('click', () => {
        SDK.logOut( () => {
            window.location.href = "index.html";
        });
    });
});

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