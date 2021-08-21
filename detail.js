$(document).ready(function() {

    let product_id = location.search.split('product_id=')[1];

    $.ajax({
        url: "http://api.techspecs.io/api/product/get/" + product_id,
        method: 'GET',
        headers: { Accept: 'application/json' }

    }).done(function(data) {

        $(".loading-container").hide();

        let results = data.data.product[0];

        let element = `
            <div class="detail-title-content">
                <div class="detail-title">
                    ${results.Product.Model}
                </div>
            <div class="detail-img">
                <img src="${results.Image.RawFrontBack ? results.Image.RawFrontBack : results.Image.RawFront ? results.Image.RawFront : results.Image.RawBack}" alt="">
            </div>

            <div class="detail-title-info">
                <span class="detail-title-info-header">
                    Version
                </span>
                <span class="detail-title-info-content">
                    ${results.Product.Version}
                </span>
            </div>
            </div>`;

        $(".detail-title-bar").append(element);

        element = `
        <div class="detail-each-title ">
            Design
        </div>`;
        for (var key in results.Design) {
            element += `
            <div class="detail-each-content ">
                <div class="detail-each-content-title">
                    ${key}
                </div>
                <div class="detail-each-content-desc-normal">
                    ${results.Design[key]}
                </div>
            </div>
            `;
        }
        $(".detail-list").append(element);

        for (var category in results.Inside) {

            element = `
                <div class="detail-category ">
                    ${category}
                </div>
                `;
            $(".detail-category-list").append(element);

            element = `
            <div class="detail-each-title ">
                ${category}
            </div>`;

            for (var key in results.Inside[category]) {

                element += `
                    <div class="detail-each-content ">
                        <div class="detail-each-content-title">
                            ${key}
                        </div>
                        <div class="detail-each-content-desc-normal">
                            ${results.Inside[category][key]}
                        </div>
                    </div>
                    `;
            }
            $(".detail-list").append(element);
        }

    });
})