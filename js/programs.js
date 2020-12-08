var programs_url = "https://univerlist.com/tr/api/v2/programs-bound-disciplines/?page_size=16";
var firstPageProgramURL = "https://univerlist.com/tr/api/v2/programs-bound-disciplines/?page_size=16";
var blog_url = "https://univerlist.com/tr/api/v2/blog/?&page=1";
var searchURL = "";

uploadFirstPagePrograms(firstPageProgramURL);


$('#moreButton').click(function () {

    if ($("#search").val() !== "") {
        more(searchURL, true);
    } else {
        more(programs_url, false);
    }
});
loadBlogs(blog_url);

var debou = _.debounce(() => {
    searchFunc(firstPageProgramURL, $("#search").val());
}, 500);



$("#search").keyup(() => {
    if ($("#search").val() !== "") {
        debou();
    } else {
        uploadFirstPagePrograms(firstPageProgramURL);
    }
});


function searchFunc(firstPageProgramURL, text) {
    if (text !== "" && text != null) {

        $('#program_container').html("");
        let name = "&name=" + text;
        getData(firstPageProgramURL + name).then(data => {
            data.results.forEach(element => {

                if (!$('#program_container').html().includes(element.name)) {
                    $('#program_container').append(
                        `<div class="col-md-3 mt-4"> <a href="#" class="btn btn-light d-flex justify-content-center align-items-center text-center min-height-program font-weight-600">${element.name}</a> </div>`
                    );
                }

            });

            if (data.next != null) {
                window.searchURL = data.next;
            }

        });
    }
}


function uploadFirstPagePrograms(firstPageProgramURL) {
    $('#program_container').html("");
    getData(firstPageProgramURL).then(data => {
        data.results.forEach(element => {

            $('#program_container').append(
                `<div class="col-md-3 mt-4"> <a href="#" class="btn btn-light d-flex justify-content-center align-items-center text-center min-height font-weight-600 min-height-program">${element.name}</a> </div>`
            );
        });
        window.programs_url = data["next"];
    });
}


function more(programs_url, flag) {
    getData(programs_url).then(data => {
        data.results.forEach(element => {
            $('#program_container').append(
                `<div class="col-md-3 mt-4"> <a href="#" class="btn btn-light d-flex justify-content-center align-items-center text-center min-height font-weight-600 min-height-program">${element.name}</a> </div>`
            );
        });

        if (data.next != null && flag) {
            window.searchURL = data.next;
        } else if (!flag) {

            window.programs_url = data["next"];
        }

    });
}


function loadBlogs(blog_url) {
    getData(blog_url).
    then(data => data.results.forEach(element => {

        var $carousel = $('.carousel').flickity({
            initialIndex: 0
        });

        var $cellElems = $(makeCellHtml());
        $carousel.flickity('append', $cellElems);


        function makeCellHtml() {
            return `<div class="carousel-cell mr-4">
            <div class="container"><div class="row"><div class="col-12">  <img class="carousel-cell-image img-fluid rounded" src="${element.thumbnail}" /> <p class="mt-4 ">${element.name}</p></div></div></div> </div>`;
        }

    }));
}


async function getData(programs_url) {
    const response = await fetch(programs_url);
    const data = response.json();
    return data;
}