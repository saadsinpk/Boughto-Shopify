$(document).ready(function () {
    axios.get("https://shopify.boughtofeed.co.uk/api/custom_css").then((res) => {
        let style = document.createElement("style");
        style.innerHTML = res.data;
        document.head.appendChild(style);
    });
});


let activeFalse = ` <svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
<path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
</svg>`;
let activeTrue = `<svg x-show="expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                  </svg>`;
$(document).on("click", ".accorditon_boughto_top", function (e) {
    $(this).closest(".accorditon_boughto").toggleClass("active");
    if ($(this).closest(".accorditon_boughto").hasClass("active")) {
        $(this).find(".accd").html(activeTrue);
    } else {
        $(this).find(".accd").html(activeFalse);
    }
});
var linktext = ''
var manufacturername = ''
var modelname = ''
var chasisname = ''
const url1 = new URL(window.location.href);

const params = new URLSearchParams(url1.search);

var model = params.get('model');
var make = params.get('make');
var year = params.get('year')
var engine = params.get('engine')

var boughto_wheel_search_by_vehicle = "[boughto_wheel_search_by_vehicle]";
var boughto_alloy_wheel_results = "[boughto_alloy_wheel_results]";
var boughto_wheel_brands = "[boughto_wheel_brands]";
var boughto_wheel_search_by_vehicleText =
    "<div class='boughto_wheel_search_by_vehicle'></div>";
var boughto_alloy_wheel_resultsText =
    "<div class='boughto_alloy_wheel_results'></div>";
var boughto_wheel_brandsText =
    "<div class='boughto_wheel_brands'><div class='boughto_wheel_brandsGrid'></div></div>";
var bodyElement = document.querySelector("#MainContent");
var bodyText = bodyElement.innerHTML;


if (bodyText.includes(boughto_alloy_wheel_results)) {
    const url233 = new URL(window.location.href);
    const paramss22 = new URLSearchParams(url233.search);
    paramss22.delete("ignore_no_stock");
    paramss22.delete("ignore_no_price");
    paramss22.delete("page");
    paramss22.delete("sort");
    paramss22.delete("manufacturer");
    paramss22.delete("model");
    paramss22.delete("generation");
    paramss22.delete("chassis");
    paramss22.delete("diameter");
    paramss22.set("page", "1");
    paramss22.set("sort", "low-high");
    $(document).on("click", ".boughto-search-button button", function (e) {
        paramss22.set("manufacturer", $("[name=Make]").val());
        paramss22.set("model", $("[name=Model]").val());
        paramss22.set("generation", $("[name=Year]").val());
        paramss22.set("chassis", $("[name=Engine]").val());
        paramss22.set("diameter", $("[name=Size]").val());
        let data = {
            "Make": $("[name=Make]").val(),
            "Model": $("[name=Model]").val(),
            "Year": $("[name=Year]").val(),
            "Engine": $("[name=Engine]").val(),
            "Size": $("[name=Size]").val(),
        }

        let isAnyFieldBlank = Object.values(data).some(value => (value === "" || value === "-1"));
        if (isAnyFieldBlank === false) {
            window.location.href = `/${linktext}?${paramss22.toString()}`
        }

    });


    let WheelSize = []
    let WheelBrand = []
    let WheelColour = []
    let Style = []

    function dataa2(item, name, na) {
        let acc = ""
        if (na === "diameter") {
            acc = `<li>
<label for="all">
<div class="inpud">
<input id="all" name="diameter" value="all" type="radio" class="" />
<span></span>
</div>
<span>All</span>
</label>
</li>`


        }


        acc += item.map((ite) => {
            let b = String(ite?.key)?.split(" ")
            let dd = ""
            if (b.length === 1) {
                dd = `${ite?.key}"`
            } else {
                dd = `${b[0]}" ${b.slice(1)}`
            }
            return `<li>
<label for="${ite?.key}">
<div class="inpud">
<input  id="${ite?.key}"  name="${na}" value="${ite?.key}" type="${na === "diameter" ? `radio` : "checkbox"}" class="">
<span></span>
</div>
<span>${na === "diameter" ? `${dd}` : ite?.key}</span>
</label>
</li>`
        }).join("")

        $(name).html(acc)
    }

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    if (params.size === 0) {
        var url = new URL(window.location.href);
        url.searchParams.set("sort", "low-high");
        url.searchParams.set("page", "1");

        var newUrl = url.toString();
        window.location.href = newUrl;
    } else {
        const url = new URL("https://shopify.boughtofeed.co.uk/api/search/wheels");
        const url2 = new URL(window.location.href);
        const paramss = new URLSearchParams(url2.search);

        $(document).on("click", ".paginationSeli li", function (e) {
            paramss.delete('page');
            paramss.delete('ignore_no_stock');
            paramss.delete('ignore_no_price');
            paramss.set('page', $(this).data("id"));
            url2.search = paramss.toString()
            window.location.href = url2.toString();

        });
        $(document).on("click", ".paginationSePre", function (e) {
            let get = Number(paramss.get('page'));
            paramss.delete('page');
            paramss.delete('ignore_no_stock');
            paramss.delete('ignore_no_price');
            paramss.set('page', (get - 1));
            url2.search = paramss.toString();
            window.location.href = url2.toString();
        });
        $(document).on("click", ".paginationSeNext", function (e) {
            let get = Number(paramss.get('page'));
            paramss.delete('page');
            paramss.delete('ignore_no_stock');
            paramss.delete('ignore_no_price');
            paramss.set('page', (get + 1));
            url2.search = paramss.toString();
            window.location.href = url2.toString();
        });

        function productCard(result) {
            let a = result.map((item, index) => {
                return `<a href="/pages/boughto_wheel_package?wheel_id=${item.id}&chasisname=${chasisname}&modelname=${modelname}&manufacturername=${manufacturername} " class="CardMain_Box">
    <div class="CardMain_Box_">
      <img src="${item.range.image_url}" />
      </div>
      <div class="CardMain_Box_B">
        <p>
          ${item.range.brand.name}
          <br />
          ${item.range.design} (${item.range.finish})
          </p>
          <ul class="single_list">
            <li>${item.width} x ${item.diameter}</li>
            <span></span>
            <li>${item.pcds[0]?.pcd ? item.pcds[0]?.pcd : ""}</li>
            <span></span>
            <li>ET${item.offset_et}</li>
            </ul>
            <div class="CardMain_Box_BB"> Call for pricing</div>
            <div class="CardMain_Box_BB45354"> </div>

        </div>
    </a>`;
            }).join("")
            $(".CardMain").html(a)
        }

        function Paginationss(map) {
            const Paginationssurl2 = new URL(window.location.href);
            const Paginationparam = new URLSearchParams(Paginationssurl2.search);
            let b = map.map((item, index) => {
                return `<li data-id="${item}">${item}</li>`;
            }).join("")
            $(".paginationSeli").html(b)
            let a = Number(Paginationparam.get('page'))
            $(`.paginationSeli [data-id=${a}]`).addClass("active");
            $(`.paginationSeli [data-id=${a}]`).addClass("active2");
            $(`.paginationSeli [data-id=${a - 1}]`).addClass("active2");
            $(`.paginationSeli [data-id=${a - 2}]`).addClass("active2");
            $(`.paginationSeli [data-id=${a - 3}]`).addClass("active2");
            $(`.paginationSeli [data-id=${a + 1}]`).addClass("active2");
            $(`.paginationSeli [data-id=${a + 2}]`).addClass("active2");
            $(`.paginationSeli [data-id=${a + 3}]`).addClass("active2");
            $(`.paginationSeli [data-id]:not(.active2)`).remove();
        }

        $(document).on("click", ".boughto_top-right-drop li", function (e) {
            $(".boughto_top-right-drop li").removeClass("active")
            $(this).addClass("active")
            paramss.delete('sort');
            paramss.set('sort', $(this).data("sort"));
            updateURLParameter('sort', $(this).attr("data-sort"));
            url.search = paramss.toString();
            axios.get(`${url.toString()}`, {
                headers: {
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    let result = response.data.results;

                    $(`.CardMain`).html(response.data.product)
                })

                .catch((error) => {
                    console.error(error);
                });

        });
        paramss.delete("ignore_no_stock", "1");
        paramss.delete("ignore_no_price", "1");
        paramss.append("ignore_no_stock", "1");
        paramss.append("ignore_no_price", "1");
        let pagess = paramss.get("page");

        let pagilength = [];

        function updateURLParameter(paramName, paramValue) {
            const url = new URL(window.location.href);
            url.searchParams.set(paramName, paramValue);
            window.history.pushState({}, '', url);
        }

        function deleteURLParameter(paramName) {
            const url = new URL(window.location.href);
            url.searchParams.delete(paramName);
            window.history.pushState({}, '', url);
        }

        function checkVal(removeS) {
            paramss.delete('diameter');
            paramss.delete('brand');
            paramss.delete('colour');
            paramss.delete('style');
            paramss.delete('page');
            paramss.set('page', 1);

            $("[name=diameter]:checked").val() && paramss.set("diameter", $("[name=diameter]:checked").val());
            $("[name=brand]:checked").val() && paramss.set("brand", $("[name=brand]:checked").val());
            $("[name=colour]:checked").val() && paramss.set("colour", $("[name=colour]:checked").val());
            $("[name=style]:checked").val() && paramss.set("style", $("[name=style]:checked").val());
            url.search = paramss.toString();
            axios.get(`${url.toString()}`, {
                headers: {
                    Accept: "application/json",
                },
            })
                .then((response) => {
                    let result = response.data.results;
                    let pagination = response.data.pagination;
                    let pagilength = []
                    pagilength.length = pagination.total_pages
                    let map = []
                    for (let index = 0; index < pagilength.length; index++) {
                        map.push(index + 1)
                    }
                    data = response.data

                    WheelSize = data.filters.diameter.options
                    WheelBrand = data.filters.brand.options
                    WheelColour = data.filters.colour.options
                    Style = data.filters.style.options
                    if (removeS) {

                    } else {

                    }
                    dataa2(WheelSize, ".diameterlist", "diameter");
                    dataa2(WheelBrand, ".brandlist", "brand")
                    dataa2(WheelColour, ".colorlist", "colour")
                    dataa2(Style, ".stylelist", "style")
                    $(` [value='${paramss.get('diameter')}']`).attr("checked", true)
                    $(`[value='${paramss.get('brand')}']`).attr("checked", true)
                    $(`[value='${paramss.get('colour')}']`).attr("checked", true)
                    $(`[value='${paramss.get('style')}']`).attr("checked", true)
                    Paginationss(map)
                    $(`.CardMain`).html(response.data.product)
                })

                .catch((error) => {
                    console.error(error);
                });
        }

        $(document).on("change", ".diameterlist input", function (e) {
            if ($("[name=diameter]:checked").val()) {
                updateURLParameter('diameter', e.target.value);
                updateURLParameter('page', "1");
            } else {
                deleteURLParameter("diameter")
            }

            checkVal("removeS")
        });
        $(document).on("change", ".brandlist input", function (e) {

            if ($("[name=brand]:checked").val()) {
                updateURLParameter('brand', e.target.value);
                updateURLParameter('page', "1");
            } else {
                deleteURLParameter("brand")
            }

            checkVal("removeS")
        });
        $(document).on("change", ".colorlist input", function (e) {
            if ($("[name=colour]:checked").val()) {
                updateURLParameter('colour', e.target.value);
                updateURLParameter('page', "1");
            } else {
                deleteURLParameter("colour")
            }

            checkVal("removeS")
        });
        $(document).on("change", ".stylelist input", function (e) {
            if ($("[name=style]:checked").val()) {
                updateURLParameter('style', e.target.value);
                updateURLParameter('page', "1");
            } else {
                deleteURLParameter("style")
            }

            checkVal("removeS")
        });

        url.search = paramss.toString();
        var modifiedText = bodyText.replace(
            boughto_alloy_wheel_results,
            boughto_alloy_wheel_resultsText
        );
        bodyElement.innerHTML = modifiedText;
        axios
            .get(`${url.toString()}`, {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {

                manufacturername = response.data.manufacturer?.name


                chasisname = response.data.chassis?.name
                modelname = response.data.model?.name
                pagilength.length = response.data.pagination.total_pages
                let map = []
                for (let index = 0; index < pagilength.length; index++) {
                    map.push(index + 1)
                }


                let result = response.data.results;
                let filters = response.data.filters;
                let pagination = response.data.pagination;
                let currentPage = pagination.currentpage;
                data = response.data

                WheelSize = data.filters.diameter.options
                WheelBrand = data.filters.brand.options
                WheelColour = data.filters.colour.options
                Style = data.filters.style.options

                $(".boughto_alloy_wheel_results").html(`
<div class="boughto_top">
<div class="boughto_top-left">
${(manufacturername && modelname && chasisname) ?
                    `<h2 id='alloyheading'>Alloy Wheels for ${manufacturername} ${modelname} ${chasisname} </h2>` :
                    `<h2 id='alloyheading'>All Alloy Wheels</h2>`
                }
</div>
<div class="boughto_top-right">
<div class="boughto_top-rightmobile">
                      <button type="button" class="p-2 text-gray-400 hover:text-gray-500 lg:hidden flex items-center">
                          <span class="mr-3">Filters</span>
                          <!-- Heroicon name: solid/filter -->
                          <svg class="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                              <path fill-rule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clip-rule="evenodd"></path>
                          </svg>
                      </button>
                  </div>
<div class="boughto_top-right-button">
Sort <svg class="flex-shrink-0 -mr-1 ml-1 h-5 w-5 text-gray-400 group-hover:text-gray-500 text-gray-500" x-bind:class="{ 'text-gray-500': sort_toggle }" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                      <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
</div>
<div class="boughto_top-right-drop">
<ul>
<li  data-sort="low-high">Price: Low to High</li>
<li data-sort="high-low">Price: High to Low</li>
</ul>
</div>
</div>
</div>
<div class="boughto_bottom">
<div class="backg"></div>
<div class="boughto_bottom_left">
<div class="filterH">
<h5>Filters</h5>

<div class="cl">X</div>

</div>
<div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3> Wheel Size</h3>
<div class="accd">
<svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
  </svg>
</div>
</div>
<div class="accorditon_boughto_bottom">
<ul class="diameterlist">

</ul>
</div>
</div>
<div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3> Wheel Brand</h3>
<div class="accd">
<svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
  </svg>
</div>
</div>
<div class="accorditon_boughto_bottom">
<ul class="brandlist">


</ul>
</div>
</div>
<div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3>Wheel Colour</h3>
<div class="accd">
<svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
  </svg>
</div>
</div>
<div class="accorditon_boughto_bottom">
<ul class="colorlist">


</ul>
</div>
</div>
<div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3> Style</h3>
<div class="accd">
<svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
  <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
  </svg>
</div>
</div>
<div class="accorditon_boughto_bottom">
<ul class="stylelist">


</ul>
</div>
</div>
</div>
<div class="boughto_bottom_right">
<div class="CardMain">

${response.data.product}

  </div>
  <div class="paginationSe">
    ${Number(pagess) != 1
                    ? ` <button class="paginationSePre">Previous </button>`
                    : ``
                }

<ul class="paginationSeli">

</ul>
${Number(pagess) != pagination.total_pages
                    ?
                    ` <button class="paginationSeNext"> Next </button>` : ""

                }


</div>

</div>
</div>
`);

                dataa2(WheelSize, ".diameterlist", "diameter");
                dataa2(WheelBrand, ".brandlist", "brand")
                dataa2(WheelColour, ".colorlist", "colour")
                dataa2(Style, ".stylelist", "style")

                $(`[value="${paramss.get("diameter")}"]`).attr("checked", true)
                $(`[value="${paramss.get("brand")}"]`).attr("checked", true)
                $(`[value="${paramss.get("colour")}"]`).attr("checked", true)
                $(`[value="${paramss.get("style")}"]`).attr("checked", true)
                Paginationss(map)

                $(document).click(function (e) {
                    $(".boughto_top-right-drop").removeClass("active")
                })
                $(".boughto_top-right-button").click(function (e) {
                    e.stopPropagation()
                    $(".boughto_top-right-drop").addClass("active")
                })

            })
            .catch((error) => {
                console.error(error);
            });

        bodyText = bodyElement.innerHTML;
    }
} else {
    console.log("Text not found");
}


if (bodyText.includes(boughto_wheel_search_by_vehicle)) {

    var modifiedText = bodyText.replace(
        boughto_wheel_search_by_vehicle,
        boughto_wheel_search_by_vehicleText
    );
    bodyElement.innerHTML = modifiedText;
    axios.get(`https://shopify.boughtofeed.co.uk/api/input-file`,
        {
            headers: {
                Accept: "application/json",
            },
        }
    )
        .then((response) => {

            $(".boughto_wheel_search_by_vehicle").html(response.data.massage);
        })

        .catch((error) => {

        })


    Search();
    bodyText = bodyElement.innerHTML;
} else {
    console.log("Text not found");
}
if (bodyText.includes(boughto_wheel_brands)) {
    var modifiedText = bodyText.replace(
        boughto_wheel_brands,
        boughto_wheel_brandsText
    );
    bodyElement.innerHTML = modifiedText;

    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);

    const nameValue = params.get("name");
    const nameValue2 = params.get("detailsId");
    if (nameValue2) {

        $(document).on("click", ".boughto-search-button button", function (e) {
            let data = {
                "Make": $("[name=Make]").val(),
                "Model": $("[name=Model]").val(),
                "Year": $("[name=Year]").val(),
                "Engine": $("[name=Engine]").val(),
                "Size": $("[name=Size]").val(),
            }

            let isAnyFieldBlank = Object.values(data).some(value => value === "" || value === "-1");
            if (isAnyFieldBlank === false) {
                window.location.href = `/pages/boughto_wheel_package?wheel_id=${$("[name=Engine]").attr("id")}&chassis=${$("[name=Engine]").val()}&chasisname=${chasisname}&modelname=${modelname}&manufacturername=${manufacturername}`
            }

        });


        $(".boughto_wheel_brands").html(
            `<div class="boughto_wheel_brandsDetailsPAge"></div>`
        );
        axios.get(
            `https://shopify.boughtofeed.co.uk/api/wheels/range/${nameValue2.toLowerCase()}`,
            {
                headers: {
                    Accept: "application/json",
                },
            }
        )
            .then((response) => {

                const responseData = response.data.range;
                let url = window.location.href;
                $(".boughto_wheel_brandsDetailsPAge")
                    .html(`<div class="boughto_wheel_brandsDetailsPAge_left">
<h2>${nameValue} - ${responseData.design}</h2>
<h5>${responseData.finish}</h5>
${responseData?.meta?.min_price === "0.00" ? "" : `<h4>from  &pound;${responseData?.meta?.min_price} </h4>`}
<p>Fitments:</p>
<ul class="list d-flex tagss">
${Object.keys(responseData.meta.sizes)
                        .map((item, index) => {
                            return `<li>${item}</li>`;
                        })
                        .join("")}
</ul>
<p>Bolt Patterns:</p>
<ul class="list d-flex tagss">
${Object.keys(responseData.meta.pcds)
                        .map((item, index) => {
                            return `<li>${item}</li>`;
                        })
                        .join("")}
</ul>
<p>Offsets:</p>
<ul class="list d-flex tagss">
${(responseData.meta.offsets).map((item, index) => {
                        return `<li>${item}</li>`;
                    }).join("")}
</ul>
<br />
<p>Wheel Colours:</p>
<div class="wheelGrid">

${(response.data.SameDesign).map((item, index) => {
                        return ` <a href="/pages/boughto-wheel-brands?name=${nameValue}&detailsId=${item.id}"
class="wheelBox ${nameValue2} ${nameValue2 == item.id && "active"}">
<img src="${item.image_url}" alt="">
</a>`;
                    }).join("")}


</div>
<br>
<button class="modalSearch">Will this fit my car?</button>

<div class="prevNext">
${response.data.previousId ? `<a href="/pages/boughto-wheel-brands?name=${nameValue}&detailsId=${response.data.previousId}" class="prevButton">Previous</a>` : ``}

${response.data.nextId ? ` <a href="/pages/boughto-wheel-brands?name=${nameValue}&detailsId=${response.data.nextId}" class="NextButton">Next</a>` : ``}

</div>

</div>
<div class="boughto_wheel_brandsDetailsPAge_right">
<img src="${responseData?.image_url}" alt="">
</div>`);
                $("body").append(`
<div class="modalBoxBack"></div>
<div class="modalBox">
<div class="modalBoxClose">X</div>
<div class="modalBox_">
<div class="modalBox__Left">
<img src="${responseData?.image_url}"
</div>
</div>
<div class="modalBox__Right">
<div class="modalBox__Right_">
<h3>Check if it will fit your car?</h3>
<p>Please use the search below to see if ${nameValue} - ${responseData.design} (${responseData.colour?.name ?? ""}) will fit your car.</p>
<div class="modalSelect"></div>
</div>
</div>
</div>`);


                $(".modalSelect").html(`
<div class="boughto-search">
<div class="boughto-search-input">
<select  name="Make" id="">
    <option value="-1">Make</option>
</select>
</div>
<div class="boughto-search-input">
<select disabled="disabled" name="Model" id="">
    <option value="-1">Model</option>
</select>
</div>
<div class="boughto-search-input">
<select disabled="disabled" name="Year" id="">
    <option value="-1">Year</option>
</select>
</div>
<div class="boughto-search-input">
<select disabled="disabled" name="Engine" id="">
    <option value="-1">Engine</option>
</select>
</div>
<div class="boughto-search-input">
<select disabled="disabled" name="Size" id="">
    <option value="-1">Size</option>
</select>
</div>
<div class="boughto-search-button">
<button>Search</button>
</div>
</div>`);
                Search(nameValue, nameValue2);

                $(".modalBoxClose").click(function () {
                    $(".modalBoxBack").removeClass("active");
                    $(".modalBox").removeClass("active");
                });
                $(".modalSearch").click(function () {
                    $(".modalBoxBack").addClass("active");
                    $(".modalBox").addClass("active");
                });
            })
            .catch((error) => {
                console.error(error);
            });


    } else if (nameValue) {

        axios
            .get(
                `https://shopify.boughtofeed.co.uk/api/wheels/brand/${nameValue.toLowerCase()}`,
                {
                    headers: {
                        Accept: "application/json",
                    },
                }
            )
            .then((response) => {
                const responseData = response.data.ranges;
                let url = window.location.href;
                $(".boughto_wheel_brandsGrid").addClass("active")
                $.each(responseData, function (index, item) {
                    $(".boughto_wheel_brandsGrid").append(`
<a href="${url}&detailsId=${item.id}" class="boughto_wheel_brandsGridBox boughto_wheel_brandsGridBox2">
<div class="boughto_wheel_brandsGridBox_">
<img src=${item.image_url} alt="" />
</div>
<h3>
${nameValue} ${item.design}

</h3>
<h4>${item.finish}</h4>
</a>`);
                });
            })
            .catch((error) => {
                console.error(error);
            });
    } else {
        axios
            .get("https://shopify.boughtofeed.co.uk/api/brands/enabled", {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {
                const responseData = response.data.brands;
                let url = window.location.href;
                $.each(responseData, function (index, item) {
                    $(".boughto_wheel_brandsGrid").append(`
<a href="${window.location.pathname}?name=${item.name}" class="boughto_wheel_brandsGridBox">
<div class="boughto_wheel_brandsGridBox_">
<img src=${item.logo_url} alt="" />
</div>
<h3>
${item.name}
</h3>
</a>`);
                });
                bodyText = bodyElement.innerHTML;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

function Search(nameValue, nameValue2) {
    axios
        .get("https://shopify.boughtofeed.co.uk/api/vehicles/manufacturers", {
            headers: {
                Accept: "application/json",
            },
        })
        .then((response) => {
            const responseData = response.data.manufacturers;
            linktext = response.data.boughto_wheel_search

            $.each(responseData, function (index, item) {
                $("[name=Make]").append(
                    $("<option>", {
                        value: item.id,
                        text: item.name,
                    })
                );
            });
        })
        .catch((error) => {
            console.error(error);
        });

    $(document).on("change", "[name=Make]", function (e) {
        if ($("[name=Make]").val() === "-1") {
            $("[name=Model]").attr("disabled", "disabled")
            $("[name=Year]").attr("disabled", "disabled")
            $("[name=Engine]").attr("disabled", "disabled")
            $("[name=Size]").attr("disabled", "disabled")
            $("[name=Model]").html(` <option value="-1">Model</option>`);
            $("[name=Year]").html(` <option value="-1">Year</option>`);
            $("[name=Engine]").html(` <option value="-1">Engine</option>`);
            $("[name=Size]").html(` <option value="-1">Size</option>`);
        } else {
            $("[name=Model]").removeAttr("disabled");
            $("[name=Model]").html(`<option>Loading</option>`);
            $("[name=Year]").html(` <option value="-1">Year</option>`);
            $("[name=Engine]").html(` <option value="-1">Engine</option>`);
            $("[name=Size]").html(` <option value="-1">Size</option>`);
            axios
                .get(
                    `https://shopify.boughtofeed.co.uk/api/vehicles/manufacturers/${$(
                        "[name=Make]"
                    ).val()}/models`,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                )
                .then((response) => {
                    $("[name=Model]").html(` <option value="-1">Model</option>`);
                    const responseData = response.data.models;
                    $.each(responseData, function (index, item) {
                        $("[name=Model]").append(
                            $("<option>", {
                                value: item.id,
                                text: item.name,
                            })
                        );
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });
    $(document).on("change", "[name=Model]", function (e) {
        if ($("[name=Model]").val() === "-1") {
            $("[name=Year]").attr("disabled", "disabled")
            $("[name=Engine]").attr("disabled", "disabled")
            $("[name=Size]").attr("disabled", "disabled");

            $("[name=Year]").html(` <option value="-1">Year</option>`);
            $("[name=Engine]").html(` <option value="-1">Engine</option>`);
            $("[name=Size]").html(` <option value="-1">Size</option>`);
        } else {
            $("[name=Year]").removeAttr("disabled");
            $("[name=Year]").html(`<option>Loading</option>`);
            $("[name=Engine]").html(` <option value="-1">Engine</option>`);
            $("[name=Size]").html(` <option value="-1">Size</option>`);
            axios
                .get(
                    `https://shopify.boughtofeed.co.uk/api/vehicles/models/${$(
                        "[name=Model]"
                    ).val()}/generations`,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                )
                .then((response) => {
                    $("[name=Year]").html(` <option value="-1">Year</option>`);
                    const responseData = response.data.generations;
                    $.each(responseData, function (index, item) {
                        $("[name=Year]").append(
                            $("<option>", {
                                value: item.id,
                                text: item.name,
                            })
                        );
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });
    $(document).on("change", "[name=Year]", function (e) {
        if ($("[name=Year]").val() === "-1") {
            $("[name=Engine]").attr("disabled", "disabled")
            $("[name=Size]").attr("disabled", "disabled");

            $("[name=Engine]").html(` <option value="-1">Engine</option>`);
            $("[name=Size]").html(` <option value="-1">Size</option>`);
        } else {
            $("[name=Engine]").removeAttr("disabled");
            $("[name=Engine]").html(`<option>Loading</option>`);
            $("[name=Size]").html(` <option value="-1">Size</option>`);
            axios
                .get(
                    `https://shopify.boughtofeed.co.uk/api/vehicles/generations/${$(
                        "[name=Year]"
                    ).val()}/chassis`,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                )
                .then((response) => {
                    $("[name=Engine]").html(` <option value="-1">Engine</option>`);
                    const responseData = response.data.chassis;

                    $.each(responseData, function (index, item) {
                        $("[name=Engine]").append(
                            $("<option>", {
                                value: item.id,
                                text: item.name,
                            })
                        );
                    });
                })
                .catch((error) => {
                    console.error(error);
                });
        }
    });
    $(document).on("change", "[name=Engine]", function (e) {
        if ($("[name=Engine]").val() === "-1") {
            $("[name=Size]").attr("disabled", "disabled");
            $("[name=Size]").html(` <option value="-1">Size</option>`);
        } else {
            $("[name=Size]").removeAttr("disabled");
            $("[name=Size]").html(`<option>Loading</option>`);
            if (nameValue2) {
                axios.get(
                    `https://shopify.boughtofeed.co.uk/api/search/wheels?ignore_no_price=1&filters_only=1&chassis=${$("[name=Engine]").val()}&range_id=${nameValue2}`,
                    {
                        headers: {
                            Accept: "application/json",
                        },
                    }
                )

                    .then((response) => {
                        const responseData = response.data.massage;
                        const responseData2 = response.data.filters.diameter.options;
                        if (responseData2.length) {
                            $("[name=Engine]").attr("id", response?.data?.results[0]?.id)
                            $("[name=Size]").html(`<option value="all">All Size</option>`);
                            for (let index = 0; index < responseData2.length; index++) {
                                let b = String(responseData2[index].key)?.split(" ")
                                let dd = ""
                                if (b.length === 1) {
                                    dd = `${responseData2[index].key}"`
                                } else {
                                    dd = `${b[0]}" ${b.slice(1)}`
                                }
                                $("[name=Size]").append(
                                    $("<option>", {
                                        value: responseData2[index].key,
                                        text: `${dd}`,
                                    })
                                );
                            }
                        } else {
                            $("[name=Size]").html(
                                $("<option>", {
                                    value: "-1",
                                    text: `Sorry, this does not fit your vehicle.`,
                                })
                            );
                        }

                    })
                    .catch((error) => {
                        console.error(error);
                    });
            } else {
                axios
                    .get(
                        `https://shopify.boughtofeed.co.uk/api/vehicles/chassis/${$(
                            "[name=Engine]"
                        ).val()}/tyre-sizes`,
                        {
                            headers: {
                                Accept: "application/json",
                            },
                        }
                    )
                    .then((response) => {
                        const responseData = response.data.massage;
                        if (responseData.length) {
                            $("[name=Size]").html(`<option value="all">All Size</option>`);
                            for (let index = 0; index < responseData.length; index++) {
                                let b = String(responseData[index])?.split(" ")
                                let dd = ""
                                if (b.length === 1) {
                                    dd = `${responseData[index]}"`
                                } else {
                                    dd = `${b[0]}" ${b.slice(1)}`
                                }
                                $("[name=Size]").append(
                                    $("<option>", {
                                        value: responseData[index],
                                        text: `${dd}`,
                                    })
                                );
                            }
                        }
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            }


        }
    });
}

var boughto_wheel_package = "[boughto_wheel_package]";
var boughto_wheel_packageText = "<div class='boughto_wheel_package'></div>";
if (bodyText.includes(boughto_wheel_package)) {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    const nameValue = params.get("wheel_id").trim();
    const nameValue2 = params.get("chassis")?.trim();
    let datasz = ""

    $(document).on("click", ".AddCatd", function (e) {
        e.preventDefault()
        let cart_item = []
        let chassis_name = datasz.manufacturer.name + " " + datasz.model.name + " " + datasz.generation.name + " " + datasz.chassis.name
        if (datasz.wheel.is_staggered) {
            cart_item.push(
                {
                    "id": params.get("wheel_id").trim(),
                    'title': $(".wheelPageright h2").text(),
                    'price': datasz.wheel.front.price,
                    'sku': datasz.wheel.front.product_code,
                    'quantity': 2,
                    'chassis': chassis_name,
                    'image_url': $(".wheelPageleft img").attr("src"),
                },
                {
                    "id": params.get("rear_wheel_id").trim(),
                    'title': $(".wheelPageright h2").text(),
                    'price': datasz.wheel.rear.price,
                    'sku': datasz.wheel.rear.product_code,
                    'quantity': 2,
                    'chassis': chassis_name,
                    'image_url': $(".wheelPageleft img").attr("src"),
                },
            )
        } else {
            cart_item.push(
                {
                    "id": params.get("wheel_id").trim(),
                    'title': $(".wheelPageright h2").text(),
                    'price': datasz.wheel.price,
                    'sku': datasz.wheel.product_code,
                    'quantity': 4,
                    'chassis': chassis_name,
                    'image_url': $(".wheelPageleft img").attr("src"),
                }
            )
        }

        axios.defaults.headers = {
            "Content-Type": "application/json",
        };
        axios.post(`https://shopify.boughtofeed.co.uk/api/createDraftOrder`, {"cart_item": cart_item})
            .then((response) => {
                $(".loader_").css("display", "none")
                window.location.href = response.data.draft_order.invoice_url
            })

            .catch((error) => {
                console.error(error);
            });

    })


    var modifiedText = bodyText.replace(
        boughto_wheel_package,
        boughto_wheel_packageText
    );
    if (nameValue && nameValue2) {
        const chassis = params.get("chassis")?.trim() ?? "1";
        const wheelId = params.get("wheel_id").trim();
        const rearWheelId = params.get("rear_wheel_id")?.trim();

        let url = `https://shopify.boughtofeed.co.uk/api/search/wheels/${chassis}?wheel_id=${wheelId}`;
        if (rearWheelId) {
            url += `&rear_wheel_id=${rearWheelId}`;
        }
        axios
            .get(url, {
                headers: {
                    Accept: "application/json",
                },
            })
            .then((response) => {

                bodyElement.innerHTML = modifiedText;
                let res = response.data.wheel;
                datasz = response.data


                if (response.data.wheel) {

                    if (response.data.wheel.is_staggered) {
                        let qu = res?.package_price / res.price
                        quaaa = Number(qu)
                        $(".boughto_wheel_package").html(`<div class="wheelPage">
  <div class="wheelPageleft dsds">
  <img src="${res.range.image_url}"
  alt="">
  <p>The bolt pattern in the picture may differ from the one for your car</p>
  </div>
  <div class="wheelPageright">
  <h2>${res.range.brand.name} - ${res.range.design} (${res.range.finish})</h2>
 <h3>&pound; <span> ${((Number(res.front.price) + Number(res.rear.price)) * 2).toFixed(2)}</span>  <small style="font-size:12px" class="text-xs">per set of 4</small></h3>

  <div class="dfd">

  <table class="wheelPagerightTable">
  <thead class="bg-gray-50">
      <tr>
      <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          </th>

          <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Size
          </th>
          <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          PCD
          </th>
          <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Centre Bore
          </th>
          <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Offset
          </th>
          <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Load
          </th>
      </tr>
      </thead>
      <tbody>
      <tr class="bg-white">
      <td>Front</td>
      <td>${Number(res.front.width).toFixed() + 'x' + Number(res.front.diameter).toFixed()}" </td>
      <td>${res.front.pcds[0]?.pcd ? res.front.pcds[0]?.pcd : "N/A"}</td>
      <td>${res.front.center_bore ? res.front.center_bore : "N/A"}</td>
      <td>${res.front.min_offset_et > 0 ? res.front.min_offset_et : "N/A"}</td>
      <td>${res.front.load_rating > 0 ? res.front.load_rating + " KG " : "N/A"} </td>
      </tr>
      <tr class="bg-white">
      <td>Rear</td>
      <td>${Number(res.rear.width).toFixed() + 'x' + Number(res.rear.diameter).toFixed()}" </td>
      <td>${res.rear.pcds[0]?.pcd ? res.rear.pcds[0]?.pcd : "N/A"}</td>
      <td>${res.rear.center_bore ? res.rear.center_bore : "N/A"}</td>
      <td>${res.rear.min_offset_et > 0 ? res.rear.min_offset_et : "N/A"}</td>
      <td>${res.rear.load_rating > 0 ? res.rear.load_rating + " KG " : "N/A"} </td>
      </tr>


      </tbody>
      </table>
      </div>
  ${res.price == "0" ?
                            ``
                            :
                            `<button class="AddCatd">Buy Now</button>`
                        }

      ${
                            response.data.chassis.name ?
                                `
        <div class='bg-green'>
      <div style="padding:10px">
          <div>
              <svg style="width:50px ; color:rgb(74 222 128)" class="mx-auto h-12 w-12 flex-shrink-0 text-green-400"
                  xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
                  </path>
              </svg>
          </div>
          <div style="text-align:center ; color:rgb(74 222 128) ">
          <div>
          This wheel fit yours <span class="dsdsd sdsfsfdsffsd" style="font-weight:bold">${response.data.manufacturer.name} ${response.data.model.name} ${response.data.generation.name} ${response.data.generation.model.name}</span>
      </div>
          </div>

      </div>
  </div>
  `
                                : ""
                        }


      </div>
      </div>


      `);
                    } else {
                        let qu = res?.package_price / res.price
                        quaaa = Number(qu)
                        $(".boughto_wheel_package").html(`<div class="wheelPage">
<div class="wheelPageleft dsds">
<img src="${res.range.image_url}"
alt="">
<p>The bolt pattern in the picture may differ from the one for your car</p>
</div>
<div class="wheelPageright">
<h2>${res.range.brand.name} - ${res.range.design} (${res.range.finish})</h2>
${res.price == "0" ? `<h3>Call for pricing</h3>`
                            : `<h3>&pound; <span> ${(Number(res.price) * 4)}</span>  <small style="font-size:12px" class="text-xs">per set of 4</small></h3>`
                        }

<div class="dfd">

<table class="wheelPagerightTable">
<thead class="bg-gray-50">
    <tr>
        <th scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Size
        </th>
        <th scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        PCD
        </th>
        <th scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Centre Bore
        </th>
        <th scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
        Offset
        </th>
        <th scope="col"
        class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
            Load
        </th>
    </tr>
    </thead>
    <tbody>
    <tr class="bg-white">
    <td>${Number(res.width).toFixed() + 'x' + Number(res.diameter).toFixed()}" </td>
    <td>${res.pcds[0]?.pcd ? res.pcds[0]?.pcd : "N/A"}</td>
    <td>${res.center_bore ? res.center_bore : "N/A"}</td>
    <td>${res.min_offset_et > 0 ? res.min_offset_et : "N/A"}</td>
    <td>${res.load_rating > 0 ? res.load_rating + " KG " : "N/A"} </td>
    </tr>


    </tbody>
    </table>
    </div>
${res.price == "0" ?
                            ``
                            :
                            `<button class="AddCatd">Buy Now</button>`
                        }

    ${
                            (response.data.manufacturer.name) ?
                                `
      <div class='bg-green dssads'>
    <div style="padding:10px">
        <div>
            <svg style="width:50px ; color:rgb(74 222 128)" class="mx-auto h-12 w-12 flex-shrink-0 text-green-400"
                xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
                </path>
            </svg>
        </div>
        <div style="text-align:center ; color:rgb(74 222 128) ">
            <div>
                This wheel fit yours <span class="dsdsd" style="font-weight:bold">${response.data.manufacturer.name} ${response.data.model.name} ${response.data.generation.name} ${response.data.generation.model.name}</span>
            </div>
        </div>

    </div>
</div>
`
                                : ""
                        }


    </div>
    </div>


    `);
                    }
                }


                if (response.data.wheel) {
                } else {
                    $(".boughto_wheel_package").html("No Data Found")
                }
                bodyText = bodyElement.innerHTML;
            })
            .catch((error) => {
                console.error(error);
            });
    } else if (nameValue) {
        axios.get(`https://shopify.boughtofeed.co.uk/api/search/wheels/1?wheel_id=${nameValue}`, {
            headers: {
                Accept: "application/json",
            },
        })
            .then((response) => {
                let res = response.data.wheel;

                bodyElement.innerHTML = modifiedText;

                $(".boughto_wheel_package").html(`<div class="wheelPage">
<div class="wheelPageleft">
<img src="${res.range.image_url}"
alt="">
<p>The bolt pattern in the picture may differ from the one for your car</p>
</div>
<div class="wheelPageright">
<h2>${res.range.brand.name} - ${res.range.design} (${res.range.finish})</h2>
<h5>Call for pricing</h5>

<table class="wheelPagerightTable">
<thead class="bg-gray-50">
  <tr>
      <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Size
      </th>
      <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          PCD
      </th>
      <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Centre Bore
      </th>
      <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Offset
      </th>
      <th scope="col"
          class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
          Load
      </th>
  </tr>
</thead>

<tbody>
<tr class="bg-white">
<td>${Number(res.width).toFixed() + 'x' + Number(res.diameter).toFixed()}" </td>
<td>${res.pcds[0]?.pcd ? res.pcds[0]?.pcd : "N/A"}</td>
<td>${res.center_bore ? res.center_bore : "N/A"}</td>
<td>${res.min_offset_et > 0 ? res.min_offset_et : "N/A"}</td>
<td>${res.load_rating > 0 ? res.load_rating + " KG " : "N/A"} </td>
  </tr>

</tbody>
</table>
${
                    response.data.manufacturer.name ?
                        `<div class='bg-green sddsdsddds' style="margin-top:25px">
  <div style="padding:10px" >
  <div>
  <svg style="width:50px ; color:rgb(74 222 128)" class="mx-auto h-12 w-12 flex-shrink-0 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
   <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
  </svg>
   </div>
  <div style="text-align:center ; color:rgb(74 222 128) " >
   <div>
   This wheel fit yours <span class="dsdsd" style="font-weight:bold">${response.data.manufacturer.name} ${response.data.model.name} ${response.data.generation.name} ${response.data.generation.model.name}</span>
   </div>
   </div>

  </div>
  </div>`
                        : ""

                }


</div>
</div>`);
                bodyText = bodyElement.innerHTML;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}


const url2 = new URL(window.location.href);
const paramss = new URLSearchParams(url2.search);
paramss.set('ignore_no_stock', 1);
paramss.set('ignore_no_price', 1);
let data = {
    "section": "",
    "profile": "",
    "rim_size": "",
    "load_index": "",
    "speed_rating": ""
}

$(document).on("change", "[name=section]", function (e) {
    paramss.delete('section');
    data.section = e.target.value
    if (e.target.value) {
        paramss.set('section', e.target.value);
    }
    SearchD(paramss.toString())
});
$(document).on("change", "[name=profile]", function (e) {
    paramss.delete('profile');
    data.profile = e.target.value
    if (e.target.value) {
        paramss.set('profile', e.target.value);
    }
    SearchD(paramss.toString())
});
$(document).on("change", "[name=rim_size]", function (e) {
    paramss.delete('rim_size');
    data.rim_size = e.target.value
    if (e.target.value) {
        paramss.set('rim_size', e.target.value);
    }
    SearchD(paramss.toString())
});
$(document).on("change", "[name=load_index]", function (e) {
    paramss.delete('load_index');
    data.load_index = e.target.value
    if (e.target.value) {
        paramss.set('load_index', e.target.value);
    }
    SearchD(paramss.toString())
});
$(document).on("change", "[name=speed_rating]", function (e) {
    paramss.delete('speed_rating');
    data.speed_rating = e.target.value
    if (e.target.value) {
        paramss.set('speed_rating', e.target.value);
    }
    SearchD(paramss.toString())
});

function SearchD(item) {
    if (!$("[name=section]").val()) {
        $("[name=section]").html(`<option value="">loading</option>`)
    }
    if (!$("[name=profile]").val()) {
        $("[name=profile]").html(`<option value="">loading</option>`)
    }
    if (!$("[name=rim_size]").val()) {
        $("[name=rim_size]").html(`<option value="">loading</option>`)
    }
    if (!$("[name=load_index]").val()) {
        $("[name=load_index]").html(`<option value="">loading</option>`)
    }
    if (!$("[name=speed_rating]").val()) {
        $("[name=speed_rating]").html(`<option value="">loading</option>`)
    }
    axios.get(`https://shopify.boughtofeed.co.uk/api/search/tyres?${item}`, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            let data = response.data.filters
            let section = data.section.options
            let profile = data.profile.options
            let rim_size = data.rim_size.options
            let load_index = data.load_index.options
            let speed_rating = data.speed_rating.options
            if ($("[name=section]").val()) {
                $("[name=section]").html(`
<option value="">Any Section</option>
<option value="${$("[name=section]").val()}" selected>${$("[name=section]").val()}</option>
`)

            } else {
                $("[name=section]").html(`<option value="">Any Section</option>`)
                $.each(section, function (index, item) {
                    $("[name=section]").append(
                        $("<option>", {
                            value: item.key,
                            text: item.key,
                        })
                    );
                });
            }
            if ($("[name=profile]").val()) {
                $("[name=profile]").html(`
<option value="">Any Profile</option>
<option value="${$("[name=profile]").val()}" selected>${$("[name=profile]").val()}</option>
`)

            } else {
                $("[name=profile]").html(`<option value="">Any Profile</option>`)
                $.each(profile, function (index, item) {
                    $("[name=profile]").append(
                        $("<option>", {
                            value: item.key,
                            text: item.key,
                        })
                    );
                });
            }
            if ($("[name=rim_size]").val()) {
                $("[name=rim_size]").html(`
<option value="">Any Rim Size</option>
<option value="${$("[name=rim_size]").val()}" selected>${$("[name=rim_size]").val()}</option>
`)

            } else {
                $("[name=rim_size]").html(`<option value="">Any Rim Size</option>`)
                $.each(rim_size, function (index, item) {
                    $("[name=rim_size]").append(
                        $("<option>", {
                            value: item.key,
                            text: item.key,
                        })
                    );
                });
            }
            if ($("[name=load_index]").val()) {
                $("[name=load_index]").html(`
<option value="">Any Load Rating</option>
<option value="${$("[name=load_index]").val()}" selected>${$("[name=load_index]").val()}</option>
`)

            } else {
                $("[name=load_index]").html(`<option value="">Any Load Rating</option>`)
                $.each(load_index, function (index, item) {
                    $("[name=load_index]").append(
                        $("<option>", {
                            value: item.key,
                            text: item.key,
                        })
                    );
                });
            }
            if ($("[name=speed_rating]").val()) {
                $("[name=speed_rating]").html(`
<option value="">Any Speed Index</option>
<option value="${$("[name=speed_rating]").val()}" selected>${$("[name=speed_rating]").val()}</option>
`)

            } else {
                $("[name=speed_rating]").html(`<option value="">Any Speed Index</option>`)
                $.each(speed_rating, function (index, item) {
                    $("[name=speed_rating]").append(
                        $("<option>", {
                            value: item.key,
                            text: item.key,
                        })
                    );
                });
            }

        })
        .catch((error) => {
            console.error(error);
        });
}

function searachData() {
    axios.get(`https://shopify.boughtofeed.co.uk/api/search/tyres?ignore_no_stock=1&ignore_no_price=1`, {
        headers: {
            Accept: "application/json",
        },
    })
        .then((response) => {
            let data = response.data.filters
            let section = data.section.options
            let profile = data.profile.options
            let rim_size = data.rim_size.options
            let load_index = data.load_index.options
            let speed_rating = data.speed_rating.options
            $.each(section, function (index, item) {
                $("[name=section]").append(
                    $("<option>", {
                        value: item.key,
                        text: item.key,
                    })
                );
            });
            $.each(profile, function (index, item) {
                $("[name=profile]").append(
                    $("<option>", {
                        value: item.key,
                        text: item.key,
                    })
                );
            });
            $.each(rim_size, function (index, item) {
                $("[name=rim_size]").append(
                    $("<option>", {
                        value: item.key,
                        text: item.key,
                    })
                );
            });
            $.each(load_index, function (index, item) {
                $("[name=load_index]").append(
                    $("<option>", {
                        value: item.key,
                        text: item.key,
                    })
                );
            });
            $.each(speed_rating, function (index, item) {
                $("[name=speed_rating]").append(
                    $("<option>", {
                        value: item.key,
                        text: item.key,
                    })
                );
            });

        })
        .catch((error) => {
            console.error(error);
        });
}

let par = ""




var currentUrl = window.location.href;
const formData = new FormData();
formData.append('cart_item', localStorage.getItem("savedIds"));
axios.defaults.headers = {
    "Content-Type": "multipart/form-data",
};


$(document).on("click", ".modalBoxBack", function (e) {
    $(".modalBoxBack").removeClass("active");
    $(".modalBox").removeClass("active");
})
$(window).resize(function () {
    if (screen.width < 979) {
        $(".rte").removeClass("scroll-trigger");
    } else {
        $(".rte").addClass("scroll-trigger");
    }

});

$(document).on("click", ".cl", function (e) {

    $(".backg").removeClass("active");
    $(".boughto_bottom_left").removeClass("active");
})
$(document).on("click", ".backg", function (e) {

    $(".backg").removeClass("active");
    $(".boughto_bottom_left").removeClass("active");
})
$(document).on("click", ".boughto_top-rightmobile", function (e) {

    $(".backg").addClass("active");
    $(".boughto_bottom_left").addClass("active");
})
