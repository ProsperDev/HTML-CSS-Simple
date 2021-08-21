let results;

function showall() {

    $(".product-list").empty();
    for (let product of results) {

        let element = `
            <div class="product" onclick="showdetail('${product.model.raw}')">
                <div class="product-image">
                    <img src="images/sample.jpg" class="product-img" alt="">
                </div>
                <div class="product-content">
                    <span class="product-title">${product.model.raw}</span>
                    <span class="product-detail">${product.brand.raw}</span>
                </div>
            </div>`;
        $(".product-list").append(element);
    };

}

function showdetail(product_id) {

    window.location.href = "detail.html?product_id=" + product_id;
}

$(document).ready(function() {

    $(".loading-container-search").hide();
    $(".see-all").hide();

    let typingTimer; //timer identifier
    let doneTypingInterval = 500; //time in ms (0.5 seconds)

    //on keyup, start the countdown
    $('#search-input').keyup(function() {

        clearTimeout(typingTimer);
        if ($('#search-input').val()) {
            typingTimer = setTimeout(doneTyping, doneTypingInterval);
        } else {
            $(".product-list").empty();
            $(".see-all").hide();
        }
    });

    //user is "finished typing," do something
    function doneTyping() {
        $(".product-list").empty();
        $(".see-all").hide();
        $(".loading-container-search").show();

        $.ajax({
            url: "http://api.techspecs.io/api/product/search?query=" + $('#search-input').val(),
            method: 'POST',
            headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
            data: JSON.stringify({ category: 'smartphone' })

        }).done(function(data) {
            $(".loading-container-search").hide();
            // $(".product-list").empty();
            results = data.data.results;
            console.log(results);
            let temp_num = 0;

            for (let product of results) {

                let element = `
                    <div class="product" onclick="showdetail('${product.id.raw}')">
                        <div class="product-image">
                            <img src="images/sample.jpg" class="product-img" alt="">
                        </div>
                        <div class="product-content">
                            <span class="product-title">${product.model.raw}</span>
                            <span class="product-detail">${product.brand.raw}</span>
                        </div>
                    </div>`;
                $(".product-list").append(element);

                temp_num++;
                if (temp_num == 5) {
                    break;
                }
            };

            if (results.length > 5) {
                $(".see-all").show();
                $("#see-all-span").text($('#search-input').val());
            } else {
                $(".see-all").hide();
            }

        });
    }

})