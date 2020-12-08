var type_url = "https://univerlist.com/tr/api/v2/blog-category/?page_size=100";
var blog_url = "https://univerlist.com/tr/api/v2/blog/?page=1";
var defBlogUrl = "https://univerlist.com/tr/api/v2/blog/?page=1";
var hehexd = "https://univerlist.com/tr/api/v2/blog/?name=";

getTypes(type_url);
getFirstPage(blog_url);




$("#search").bind("enterKey", function (e) {
    if ($("#search").val() !== "") {
        hehexd = "https://univerlist.com/tr/api/v2/blog/?name=";
        $("#types").hide();
        $(".sec-2").hide();
        $("#backArrow").removeClass("d-none");
        $(".big-title").text("Arama Sonuçları:").append(`<span class="text-muted font-weight-700">${$("#search").val()}</span>`);
        $("#col_container").html("");
        searchFunc(hehexd, $("#search").val());
        $(this).val("");
    }
});

$("#section-1 #backArrow").click(function () {
    hehexd = "https://univerlist.com/tr/api/v2/blog/?name=";
    $("#types").show();
    $(".sec-2").show();
    $("#backArrow").addClass("d-none");
    $(".big-title").text("Blog");
    $("#moreButton").show();
    $("#moreButton").click(() => {
        moreButtonFunc(blog_url);
    });
    getFirstPage(defBlogUrl);
});
$("#search").keyup(function (e) {
    if (e.keyCode == 13) {
        $(this).trigger("enterKey");
    }


});




$("#moreButton").click(() => {

    if ($("#backArrow").hasClass("d-none")) {
        console.log($("#backArrow").hasClass("d-none"));
        moreButtonFunc(blog_url);
    } else {
        console.log(hehexd);
        moreButtonFunc(hehexd);
    }

});



function getTypes(type_url) {
    getData(type_url).then($("#types").append(`<a href="#" class="btn btn-outline-dark px-4 m-2 rounded-pill font-weight-600">Hepsi</a>`)).
    then(
        data => data.results.forEach(element => {
            $("#types").append(`<a href="#" class="btn btn-outline-dark px-4 py-1 m-2 rounded-pill font-weight-600">${element.name}</a>`);
        })
    );
}

function getFirstPage(blog_url) {
    $(".blog-title").html("");
    $(".blog-author").html("");
    $(".blog-thumbnail").attr("src", "");
    $("#col_container").html("");
    getData(blog_url).
    then(
        data => {
            data.results.forEach((element, index) => {
                if (index == 0) {
                    $(".blog-title").append(element.name);
                    $(".blog-author").append("By " + element.owner.first_name + " " + element.owner.last_name);
                    $(".blog-thumbnail").attr("src", element.thumbnail);
                } else {

                    $("#col_container").append(`<div class="col-6 mb-5">
                    <a href="" style="text-decoration: none;">
                        <div class="blog-image"><img class="img-fluid blog-thumbnail" src="${element.thumbnail}"></div>
                        <div class="article-body pt-3 text-dark">
                            <h2 class="blog-title">${element.name}</h2>
                            <p class="text-muted blog-author">${"By " + element.owner.first_name + " " + element.owner.last_name}</p>
                        </div>
                    </a>
                </div>`);
                }
            });

            window.blog_url = data['next'];
        }
    )

}

function searchFunc(defBlogUrl, search) {

    if (search !== "" && search != null) {


        getData(defBlogUrl + search).then(data => {

            data.results.forEach(function (element) {

                if (element.name.toLowerCase().includes(search)) {

                    $("#col_container").append(`<div class="col-6 mb-5">
                    <a href="" style="text-decoration: none;">
                        <div class="blog-image"><img class="img-fluid blog-thumbnail" src="${element.thumbnail}"></div>
                        <div class="article-body pt-3 text-dark">
                            <h2 class="blog-title">${element.name}</h2>
                            <p class="text-muted blog-author">${"By " + element.owner.first_name + " " + element.owner.last_name}</p>
                        </div>
                    </a>
                </div>`);
                }

            });

            if (data.next != null) {

                window.hehexd = data.next;
                console.log(hehexd);

            }

        });

    }
}

function moreButtonFunc(URL) {

    getData(URL).then(
        data => {
            data.results.forEach(function (element) {

                $("#col_container").append(`<div class="col-6 mb-5">
                    <a href="" style="text-decoration: none;">
                        <div class="blog-image"><img class="img-fluid blog-thumbnail" src="${element.thumbnail}"></div>
                        <div class="article-body pt-3 text-dark">
                            <h2 class="blog-title">${element.name}</h2>
                            <p class="text-muted blog-author">${"By " + element.owner.first_name + " " + element.owner.last_name}</p>
                        </div>
                    </a>
                </div>`);
            });


            if (data.next != null) {
                $("#moreButton").show();
                if ($("#backArrow").hasClass("d-none")) {
                    window.blog_url = data['next'];
                } else {
                    window.hehexd = data['next'];
                }
            } else {
                $("#moreButton").hide();
            }

        }
    )

}

async function getData(programs_url) {
    const response = await fetch(programs_url);
    const data = response.json();
    return data;
}