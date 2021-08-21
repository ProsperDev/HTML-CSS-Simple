$.ajax({
    url: "http://api.techspecs.io/api/product/trending",
    method: 'GET',
    headers: {
        Accept: 'application/json'
    }
}).done(function(data) {

    $(".loading-container").hide();
    data.data.product.forEach(product => {
        console.log(product);
        let newEle = `<div class="trending-product-new">
                        NEW
                    </div>`;
        let element = `
        <div class="trending-product">
            <div class="trending-product-img-container">
                <img src="${product.Image.RawFrontBack ? product.Image.RawFrontBack : product.Image.RawFront ? product.Image.RawFront : product.Image.RawBack}" class="trending-product-img" alt="No Image">
            </div>
            <div class="trending-product-detail">
                <span class="trending-product-title">${product.Product.Model}</span>
                <span class="trending-product-describe">${product.Product.Brand}</span>
            </div>
        </div>`;
        $(".trending-product-list").append(element);

    });
});;