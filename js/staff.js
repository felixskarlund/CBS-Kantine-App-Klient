$(document).ready( () => {
    const currentUser = SDK.Storage.load("currentUser");
    const userId = SDK.Storage.load("user_id");

    // Function to select all orders from database
    SDK.Orders.getAll( (error, orders) => {
        if (error) throw error;

        function checkReady(order){
            return order.isReady == false;
        }

        let unReadyOrders = orders.filter(checkReady);

        // For each order, append the html-template for orders
        unReadyOrders.forEach((order) => {
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
                      <input class="button makeReady" data-order-id="${order.orderId}" type="submit" value="Make ready">
                   </div>
                 </div>`;

            $("#staffOrderContent").append(orderHtml);
        });

        // When makeReady is clicked, update order in database to isReady = true
        $(".makeReady").click(function () {
            const orderId = $(this).data("order-id");
            const order = orders.find((order) => order.orderId === orderId);

            SDK.Orders.makeReady(order.orderId, (error) => {
                if (error) throw error;
                window.location.reload();
            });
        });
    });

    // When logOutButton is clicked, log out user
    $("#logOutButton").on('click', () => {
        SDK.logOut( () => {
            window.location.href = "index.html";
        });
    });
});