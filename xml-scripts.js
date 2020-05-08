$(document).ready(function () {
    const page_obj = new page();
    if ($("body").attr('id') == 'homepage') {
        page_obj.load_carousel("https://smileschool-api.hbtn.info/xml/quotes", 1);
        page_obj.load_pop_tutos("https://smileschool-api.hbtn.info/xml/popular-tutorials",2);
        page_obj.load_pop_tutos("https://smileschool-api.hbtn.info/xml/latest-videos",3);
    }
    else if($("body").attr('id') == 'pricing') {
        page_obj.load_carousel("https://smileschool-api.hbtn.info/xml/quotes", 1);
    }
    else if($("body").attr('id') == 'courses') {
        const url_courses = "https://smileschool-api.hbtn.info/xml/courses";
        page_obj.load_courses(url_courses);
        $(document.body).on('keyup', $("#search"), function(event) {
            if(event.keyCode == 13) { // 13 = Enter Key
                $(".normal_section .container-md #cont_videos").html("");
                page_obj.load_courses(url_courses);
            }
        });
        $("#topics").change(function() {
            $(".normal_section .container-md #cont_videos").html("");
            page_obj.load_courses(url_courses);
        });
        $("#sort").change(function() {
            $(".normal_section .container-md #cont_videos").html("");
            page_obj.load_courses(url_courses);
        });
    }
});

// GENERIC FUNCTIONS ========================
let carousel_act_item = function (i) {
    if (i == 0) {
        return "active";
    }
    else {
        return "";
    }
};
let stars_calification = function (calf, max_stars) {
    html_stars_tags = "";
    for (let y=0;y<calf;y++){
        html_stars_tags = html_stars_tags + '<img class="img-fluid " src="./images/star_on.png" />';
    }
    for (let z=0;z<(max_stars-calf);z++){
        html_stars_tags = html_stars_tags + '<img class="img-fluid " src="./images/star_off.png" />';
    }
    return html_stars_tags;
};
function capitalizeFL(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
// ==END GENERIC FUNCTIONS
class page {
    constructor() {

    }

    load_carousel(url_api, number_carousel){
        let parser, xmlDoc  = null;
        $("#carousel-"+number_carousel+" .carousel-inner").append('<div class="loader"></div>');
        $.get(url_api, function (data) {
            let quotes = data.getElementsByTagName("quotes")[0].childNodes;
            let html_content1 = "";
            let html_content2 = "";
            quotes.forEach(function (element, i) {
                //console.log( element.getElementsByTagName("title")[0].textContent);
                html_content1 = `<!-- CAROUSEL ITEM -->
                                <div class="carousel-item `+ carousel_act_item(i) + `">
                                    <div class="row">
                                        <div class="col-12 col-sm-3 text-center mb-3">
                                            <img class="rounded-circle img-fluid" src=`+element.getElementsByTagName("pic_url")[0].textContent+ ` alt="Slide Image" />
                                        </div>
                                        <div class="col-12 col-sm-9">
                                            <p>&lsaquo;&lsaquo; `+element.getElementsByTagName("text")[0].textContent+ ` &rsaquo;&rsaquo;</p>
                                            <p class="font-weight-bold">`+element.getElementsByTagName("name")[0].textContent+ `</p>
                                            <p>`+element.getElementsByTagName("title")[0].textContent+ `</p>
                                        </div>
                                    </div>
                                </div>`;
                $("#carousel-"+number_carousel+" .carousel-inner").append($.parseHTML(html_content1));
                html_content2 = `<li data-target="#carousel-`+number_carousel+`" data-slide-to="` + i + `" class="` + carousel_act_item(i) + `"></li>`;
                $("#carousel-"+number_carousel+" .carousel-indicators").append($.parseHTML(html_content2));
            });
            if ($("#carousel-"+number_carousel+" .carousel-inner").html() !== "") {
                $("#carousel-"+number_carousel+" .carousel-inner .loader").css('display', 'none');
            } 
        });
    }

    load_pop_tutos(url_api, number_carousel) {
        $("#carousel-"+number_carousel+" .carousel-inner").append('<div class="loader"></div>');
        $.get(url_api, function (data) {
            let videos = data.getElementsByTagName("videos")[0].childNodes;
            let html_content1 = "";
            let html_content2 = "";
            videos.forEach(function (element, i) {
                //console.log(element.getAttribute("star"));
                html_content1 = `<!-- CAROUSEL ITEM - `+element.getElementsByTagName("title")[0].textContent+` -->
                                <div class="carousel-item col-12 col-sm-6 col-md-4 col-lg-3 `+ carousel_act_item(i) + `">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="">
                                            <a class="youtube" href="https://www.youtube.com/watch?v=3ymwOvzhwHs">
                                                <img class="img-fluid" src="`+element.getElementsByTagName("thumb_url")[0].textContent+`"
                                                    alt="{ video title here }" />
                                            </a>
                                        </div>
                                        <h5 class="card-title font-weight-bold">`+element.getElementsByTagName("title")[0].textContent+`</h5>
                                        <p class="card-text">
                                            <span>`+element.getElementsByTagName("sub-title")[0].textContent+`</span>
                                        </p>
                                        <!-- VIDEO REVIEWER -->
                                        <div class="row mb-3">
                                            <div class="col-3 user_review">
                                                <img class="rounded-circle img-fluid " src="`+element.getElementsByTagName("author_pic_url")[0].textContent+`" />
                                            </div>
                                            <div class="col-9 d-lg-flex justify-content-lg-start align-items-lg-center">
                                                <span class="highlight_text1 font-weight-bold">`+element.getElementsByTagName("author")[0].textContent+`</span>
                                            </div>
                                        </div>
                                        <!-- VIDEO CALIFICATION -->
                                        <div class="row text-center">
                                            <div class="col-7">
                                                <div class="d-flex justify-content-lg-center">`+stars_calification(element.getAttribute("star"),5)+`</div>
                                            </div>
                                            <div class="col-5">
                                                <span class="highlight_text1 font-weight-bold">`+element.getElementsByTagName("duration")[0].textContent+`</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                $("#carousel-"+number_carousel+" .carousel-inner").append($.parseHTML(html_content1));
                html_content2 = `<li data-target="#carousel-`+number_carousel+`" data-slide-to="` + i + `" class="` + carousel_act_item(i) + `"></li>`;
                $("#carousel-"+number_carousel+" .carousel-indicators").append($.parseHTML(html_content2));
            });
            if ($("#carousel-"+number_carousel+" .carousel-inner").html() !== "") {
                $("#carousel-"+number_carousel+" .carousel-inner .loader").css('display', 'none');
            } 
        });
    }
    load_courses(url_api) {
        $(".normal_section .container-md #cont_videos").append('<div class="loader"></div>');
        console.log($("#search").val(),$( "#topics option:selected" ).text(),$( "#sort option:selected" ).text());
        $.get( url_api, { q: $("#search").val(), topic: $( "#topics option:selected" ).val(), sort: $( "#sort option:selected" ).val() } )
            .done(function( data ) {
                let topics = data.getElementsByTagName("result")[0].childNodes[0].childNodes;
                let sorts = data.getElementsByTagName("result")[0].childNodes[2].childNodes;
                let courses = data.getElementsByTagName("result")[0].childNodes[5].childNodes;
                console.log(courses);
                let html_content1 = "";
                if ($("#topics").html() === "" && $("#sort").html() === ""){
                    topics.forEach(function (element, i) {
                        $("#topics").append('<option class="text-capitalize" value="'+element.textContent+'">'+capitalizeFL(element.textContent.replace("_", " "))+'</option>');
                    });
                    sorts.forEach(function (element, i) {
                        $("#sort").append('<option class="text-capitalize" value="'+element.textContent+'">'+capitalizeFL(element.textContent.replace("_", " "))+'</option>');
                    });
                    console.log("categorys filled");
                }

                $("#label_videos").html(courses.length + " videos");
            courses.forEach(function (element, i) {
                html_content1 = `<!-- CAROUSEL ITEM - `+element.title+` -->
                                <div class="col-md-3 col-sm-4 col-12 mb-5">
                                <div class="card">
                                    <div class="card-body">
                                        <div class="">
                                            <a class="youtube" href="https://www.youtube.com/watch?v=3ymwOvzhwHs">
                                                <img class="img-fluid" src="`+element.getElementsByTagName("thumb_url")[0].textContent+`"
                                                    alt="{ video title here }" />
                                            </a>
                                        </div>
                                        <h5 class="card-title font-weight-bold">`+element.getElementsByTagName("title")[0].textContent+`</h5>
                                        <p class="card-text">
                                            <span>`+element.getElementsByTagName("sub-title")[0].textContent+`</span>
                                        </p>
                                        <!-- VIDEO REVIEWER -->
                                        <div class="row mb-3">
                                            <div class="col-3 user_review">
                                                <img class="rounded-circle img-fluid " src="`+element.getElementsByTagName("author_pic_url")[0].textContent+`" />
                                            </div>
                                            <div class="col-9 d-lg-flex justify-content-lg-start align-items-lg-center">
                                                <span class="highlight_text1 font-weight-bold">`+element.getElementsByTagName("author")[0].textContent+`</span>
                                            </div>
                                        </div>
                                        <!-- VIDEO CALIFICATION -->
                                        <div class="row text-center">
                                            <div class="col-7">
                                                <div class="d-flex justify-content-lg-center">`+stars_calification(element.getAttribute("star"),5)+`</div>
                                            </div>
                                            <div class="col-5">
                                                <span class="highlight_text1 font-weight-bold">`+element.getElementsByTagName("duration")[0].textContent+`</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`;
                $(".normal_section .container-md #cont_videos").append($.parseHTML(html_content1));
            });
            if ($(".normal_section .container-md #cont_videos").html() !== "") {
                $(".normal_section .container-md #cont_videos .loader").css('display', 'none');
            } 
            console.log(data);
        });
    }


}

class HomePage extends page {

}
