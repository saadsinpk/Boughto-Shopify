
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
paramss22.set("page","1");
paramss22.set("sort","low-high");
$(document).on("click", ".boughto-search-button button", function (e) {
        paramss22.set("manufacturer",$("[name=Make]").val());
        paramss22.set("model",$("[name=Model]").val());
        paramss22.set("generation",$("[name=Year]").val());
        paramss22.set("chassis",$("[name=Engine]").val());
        paramss22.set("diameter",$("[name=Size]").val());
        let data = {
            "Make": $("[name=Make]").val(),
            "Model": $("[name=Model]").val(),
            "Year":$("[name=Year]").val(),
            "Engine": $("[name=Engine]").val(),
            "Size": $("[name=Size]").val(),
            }
            
            let isAnyFieldBlank = Object.values(data).some(value => value === "");
            if(isAnyFieldBlank === false) {
            window.location.href = `/pages/boughto_wheel_search_by_vehicle?${paramss22.toString()}`
            }
            
            });


let WheelSize = []
let WheelBrand = []
let WheelColour = []
let Style = []
function dataa2(item,name,na) {
let acc = item.map((ite) => {
return `<li>
<label for="${ite?.key}">
<input  id="${ite?.key}"  name="${na}" value="${ite?.key}" type="checkbox" class="">
<span>${ite?.key}</span>
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
paramss.set('page', (get -1));
url2.search = paramss.toString();
window.location.href = url2.toString();
});
$(document).on("click", ".paginationSeNext", function (e) {
let get = Number(paramss.get('page'));
paramss.delete('page');
paramss.delete('ignore_no_stock');
paramss.delete('ignore_no_price');
paramss.set('page', (get +1));
url2.search = paramss.toString();
window.location.href = url2.toString();
});

function productCard (result) {
let a =  result.map((item, index) => {
  return `<a href="/pages/boughto_wheel_package?wheel_id=${item.id}" class="CardMain_Box">
        <div class="CardMain_Box_">
          <img src="${item.range.image_url}" /> 
          </div>
          <div class="CardMain_Box_B">
            <p>
              ${item.range.brand.name}
              <br />
              ${item.range.design} (${item.range.finish})
              </p>
              <ul>
                <li>${item.width} x ${item.diameter}</li>
                <li>${item.pcds[0]?.pcd ? item.pcds[0]?.pcd : ""}</li>
                <li>ET${item.offset_et}</li>
                </ul>
                <div class="CardMain_Box_BB"> Call for pricing</div>

            </div>
        </a>`;
}).join("")
console.log(a)
$(".CardMain").html(a)
}

function Paginationss(map) {
let b =    map.map((item, index) => {
  return `<li data-id="${item}">${item}</li>`;
}).join("")
$(".paginationSeli").html(b)
let a = Number(pagess)
$(`.paginationSeli [data-id=${a}]`).addClass("active"); // Add "active" class to the currently active element
$(`.paginationSeli [data-id=${a}]`).addClass("active2"); // Add "active" class to the currently active element
$(`.paginationSeli [data-id=${a -1}]`).addClass("active2"); // Add "active" class to the currently active element
$(`.paginationSeli [data-id=${a -2}]`).addClass("active2"); // Add "active" class to the currently active element
$(`.paginationSeli [data-id=${a -3}]`).addClass("active2"); // Add "active" class to the currently active element
$(`.paginationSeli [data-id=${a +1}]`).addClass("active2"); // Add "active" class to the currently active element
$(`.paginationSeli [data-id=${a +2}]`).addClass("active2"); // Add "active" class to the currently active element
$(`.paginationSeli [data-id=${a +3}]`).addClass("active2"); // Add "active" class to the currently active element
$(`.paginationSeli [data-id]:not(.active2)`).remove(); // Remove elements without the "active" class
}
$(document).on("click", ".boughto_top-right-drop li", function (e) {
paramss.delete('sort');
paramss.set('sort', $(this).data("sort"));
url.search = paramss.toString();
axios.get(`${url.toString()}`, {
headers: {
Accept: "application/json",
// Authorization:"Bearer " + "de9f63dc9a7578c59a70866d181ca34b4387d7d35b02634044df6c20ecc838bb",
},
})
.then((response) => {
let result = response.data.results;

productCard(result)
})

.catch((error) => {
console.error(error);
// Handle the error
});

});
paramss.delete("ignore_no_stock", "1");
paramss.delete("ignore_no_price", "1");
paramss.append("ignore_no_stock", "1");
paramss.append("ignore_no_price", "1");
let pagess = paramss.get("page");
let pagilength = [];
function checkVal() {
paramss.delete('diameter');
paramss.delete('brand');
paramss.delete('colour');
paramss.delete('style');
paramss.delete('page');
paramss.set('page',1);

// ($("[name=diameter]:checked").val() !== "all" && $("[name=diameter]:checked").val() ) && paramss.set("diameter", $("[name=diameter]:checked").val());
$("[name=diameter]:checked").val() &&  paramss.set("diameter", $("[name=diameter]:checked").val());
$("[name=brand]:checked").val() &&  paramss.set("brand", $("[name=brand]:checked").val());
$("[name=colour]:checked").val() && paramss.set("colour", $("[name=colour]:checked").val());
$("[name=style]:checked").val() &&  paramss.set("style", $("[name=style]:checked").val());
url.search = paramss.toString();
axios.get(`${url.toString()}`, {
headers: {
Accept: "application/json",
// Authorization:"Bearer " + "de9f63dc9a7578c59a70866d181ca34b4387d7d35b02634044df6c20ecc838bb",
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
dataa2(WheelSize,".diameterlist","diameter");
dataa2(WheelBrand,".brandlist","brand")
dataa2(WheelColour,".colorlist","colour")
dataa2(Style,".stylelist","style")
$(` [value=${paramss.get('diameter')}]`).attr("checked",true)
$(`[value=${paramss.get('brand')}]`).attr("checked",true)
$(`[value=${paramss.get('colour')}]`).attr("checked",true)
$(`[value='${paramss.get('style')}']`).attr("checked",true)
Paginationss(map)
productCard(result)
})

.catch((error) => {
console.error(error);
// Handle the error
});
}
$(document).on("change", ".diameterlist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
checkVal()
});
$(document).on("change", ".brandlist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
checkVal()
});
$(document).on("change", ".colorlist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
checkVal()
});
$(document).on("change", ".stylelist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
checkVal()
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
// Authorization:"Bearer " +"de9f63dc9a7578c59a70866d181ca34b4387d7d35b02634044df6c20ecc838bb",
},
})
.then((response) => {

pagilength.length = response.data.pagination.total_pages
let map = []
for (let index = 0; index < pagilength.length; index++) {
map.push(index + 1)
}


let result = response.data.results;
let filters = response.data.filters;
let pagination = response.data.pagination;
let currentPage = pagination.currentpage;
// paramss.delete('page');
// url.searchParams.set('page', pagination.currentpage);
data = response.data

WheelSize = data.filters.diameter.options
WheelBrand = data.filters.brand.options
WheelColour = data.filters.colour.options
Style = data.filters.style.options


$(".boughto_alloy_wheel_results").html(`
<div class="boughto_top">
<div class="boughto_top-left">
<h2>All Alloy Wheels</h2>
</div>
<div class="boughto_top-right">
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
<div class="boughto_bottom_left">
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
     
     
      
      </div>
      <div class="paginationSe">
        ${Number(pagess) != 1
? ` <button class="paginationSePre">Previous </button>`
: ``
}

<ul class="paginationSeli">

</ul>
${
Number(pagess) != pagination.total_pages
?
` <button class="paginationSeNext"> Next </button>`:""

}


    </div>
 
</div>
</div>
`);

dataa2(WheelSize,".diameterlist","diameter");
dataa2(WheelBrand,".brandlist","brand")
dataa2(WheelColour,".colorlist","colour")
dataa2(Style,".stylelist","style")
Paginationss(map)

$(document).click(function(e) {
$(".boughto_top-right-drop").removeClass("active")
})
$(".boughto_top-right-button").click(function(e) {
e.stopPropagation()
$(".boughto_top-right-drop").addClass("active")
})

productCard(result)
})
.catch((error) => {
console.error(error);
// Handle the error
});

bodyText = bodyElement.innerHTML;
}
}
else {
console.log("Text not found");
}










if (bodyText.includes(boughto_wheel_search_by_vehicle)) {
    
var modifiedText = bodyText.replace(
boughto_wheel_search_by_vehicle,
boughto_wheel_search_by_vehicleText
);
bodyElement.innerHTML = modifiedText;

$(".boughto_wheel_search_by_vehicle").html(`
<h5>Search Wheels by Vehicle:</h5>

<div class="boughto-search">
<div class="boughto-search-input">
    <select name="Make" id="">
        <option value="-1">Make</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="Model" id="">
        <option value="-1">Model</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="Year" id="">
        <option value="-1">Year</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="Engine" id="">
        <option value="-1">Engine</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="Size" id="">
        <option value="-1">Size</option>
    </select>
</div>
<div class="boughto-search-button">
   <button>Search</button>
</div>
</div>`);

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
$(".boughto_wheel_brands").html(
`<div class="boughto_wheel_brandsDetailsPAge"></div>`
);
axios
.get(
`https://boughtofeed.co.uk/api/wheels/range/${nameValue2.toLowerCase()}`,
{
headers: {
Accept: "application/json",
Authorization:"Bearer " + "de9f63dc9a7578c59a70866d181ca34b4387d7d35b02634044df6c20ecc838bb",
},
}
)
.then((response) => {
const responseData = response.data.range;
let url = window.location.href;
$(".boughto_wheel_brandsDetailsPAge")
.html(`<div class="boughto_wheel_brandsDetailsPAge_left">
<h2>${nameValue} - ${responseData.design}</h2>
<h5>${responseData.colour.name}</h5>
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
    ${Object.keys(responseData.meta.offsets)
  .map((item, index) => {
    return `<li>${item}</li>`;
  })
  .join("")}
</ul>
<p>Wheel Colours:</p>
<div class="wheelGrid">
    <div class="wheelBox">
        <img src="https://cdn.boughtofeed.co.uk/images/wheels/brands/aez/designs/12080-kaiman-dark_gunmetal-polished/thumb.png" alt="">
    </div>
    <div class="wheelBox">
        <img src="https://cdn.boughtofeed.co.uk/images/wheels/brands/aez/designs/12080-kaiman-dark_gunmetal-polished/thumb.png" alt="">
    </div>

</div>
<br>
<button class="modalSearch">Will this fit my car?</button>

<div class="prevNext">
    <button class="prevButton">Previous</button>
    <button class="NextButton">Next</button>
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
<p>Please use the search below to see if ${nameValue} - ${responseData.design} (${responseData.colour.name}) will fit your car.</p>
<div class="modalSelect"></div>
</div>
</div>
</div>`);

$(".modalSelect").html(`
<div class="boughto-search">
<div class="boughto-search-input">
    <select name="Make" id="">
        <option value="-1">Make</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="Model" id="">
        <option value="-1">Model</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="Year" id="">
        <option value="-1">Year</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="Engine" id="">
        <option value="-1">Engine</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="Size" id="">
        <option value="-1">Size</option>
    </select>
</div>
<div class="boughto-search-button">
   <button>Search</button>
</div>
</div>`);
Search();

$(".modalBoxClose").click(function () {
$(".modalBoxBack").removeClass("active");
$(".modalBox").removeClass("active");
});
$(".modalSearch").click(function () {
$(".modalBoxBack").addClass("active");
$(".modalBox").addClass("active");
});
$(".modalSearch").click(function () {
$(".modalBoxBack").addClass("active");
$(".modalBox").addClass("active");
});
})
.catch((error) => {
console.error(error);
// Handle the error
});
} else if (nameValue) {
axios
.get(
`https://shopify.boughtofeed.co.uk/api/wheels/brand/${nameValue.toLowerCase()}`,
{
headers: {
Accept: "application/json",
// Authorization:"Bearer " +"de9f63dc9a7578c59a70866d181ca34b4387d7d35b02634044df6c20ecc838bb",
},
}
)
.then((response) => {
const responseData = response.data.ranges;
let url = window.location.href;
$.each(responseData, function (index, item) {
$(".boughto_wheel_brandsGrid").append(`
<a href="${url}&detailsId=${item.id}" class="boughto_wheel_brandsGridBox boughto_wheel_brandsGridBox2">
<div class="boughto_wheel_brandsGridBox_">
    <img src=${item.image_url} alt="" />
</div>
<h3>
    ${item.design}
</h3>
<h4>${item.colour}</h4>
</a>`);
});
})
.catch((error) => {
console.error(error);
// Handle the error
});
} else {
axios
.get("https://shopify.boughtofeed.co.uk/api/brands/enabled", {
headers: {
Accept: "application/json",
// Authorization:"Bearer " + "de9f63dc9a7578c59a70866d181ca34b4387d7d35b02634044df6c20ecc838bb",
},
})
.then((response) => {
const responseData = response.data.brands;
let url = window.location.href;
$.each(responseData, function (index, item) {
$(".boughto_wheel_brandsGrid").append(`
<a href="${url}?name=${item.name}" class="boughto_wheel_brandsGridBox">
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
// Handle the error
});
}
}

function Search() {
axios
.get("https://shopify.boughtofeed.co.uk/api/vehicles/manufacturers", {
headers: {
Accept: "application/json",
// Authorization:"Bearer " + "e7946b285aec230c19c49b64c651c40123b9c9722497cc65aacc6602ea782167",
},
})
.then((response) => {
const responseData = response.data.manufacturers;
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
// Handle the error
});
$("[name=Make]").change(function () {
if ($("[name=Make]").val() === "-1") {
$("[name=Model]").html(` <option value="-1">Model</option>`);
$("[name=Year]").html(` <option value="-1">Year</option>`);
$("[name=Engine]").html(` <option value="-1">Engine</option>`);
$("[name=Size]").html(` <option value="-1">Size</option>`);
} else {
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
  // Authorization: "Bearer " +"e7946b285aec230c19c49b64c651c40123b9c9722497cc65aacc6602ea782167",
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
// Handle the error
});
}
});
$("[name=Model]").change(function () {
if ($("[name=Model]").val() === "-1") {
$("[name=Year]").html(` <option value="-1">Year</option>`);
$("[name=Engine]").html(` <option value="-1">Engine</option>`);
$("[name=Size]").html(` <option value="-1">Size</option>`);
} else {
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
  // Authorization:"Bearer " +"e7946b285aec230c19c49b64c651c40123b9c9722497cc65aacc6602ea782167",
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
// Handle the error
});
}
});
$("[name=Year]").change(function () {
if ($("[name=Year]").val() === "-1") {
$("[name=Engine]").html(` <option value="-1">Engine</option>`);
$("[name=Size]").html(` <option value="-1">Size</option>`);
} else {
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
  // Authorization: "Bearer " + "e7946b285aec230c19c49b64c651c40123b9c9722497cc65aacc6602ea782167",
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
// Handle the error
});
}
});
$("[name=Engine]").change(function () {
if ($("[name=Engine]").val() === "-1") {
$("[name=Size]").html(` <option value="-1">Size</option>`);
} else {
$("[name=Size]").html(`<option>Loading</option>`);
axios
.get(
`https://shopify.boughtofeed.co.uk/api/vehicles/chassis/${$(
"[name=Engine]"
).val()}/tyre-sizes`,
{
headers: {
  Accept: "application/json",
  // Authorization: "Bearer " +"e7946b285aec230c19c49b64c651c40123b9c9722497cc65aacc6602ea782167",
},
}
)
.then((response) => {
$("[name=Size]").html(` <option value="-1">Size</option>`);
const responseData = response.data.massage;
for (let index = 0; index < responseData.length; index++) {
    $("[name=Size]").append(
        $("<option>", {
          value: responseData[index],
          text: responseData[index],
        })
        );
}
})
.catch((error) => {
console.error(error);
// Handle the error
});
}
});
}



var boughto_wheel_package = "[boughto_wheel_package]";
var boughto_wheel_packageText = "<div class='boughto_wheel_package'></div>";
if (bodyText.includes(boughto_wheel_package)) {
const queryString = window.location.search;
const params = new URLSearchParams(queryString);
const nameValue = params.get("wheel_id");
if (nameValue) {
axios
.get(`https://shopify.boughtofeed.co.uk/api/wheels/id/${nameValue}`, {
headers: {
Accept: "application/json",
// Authorization: "Bearer " + "e7946b285aec230c19c49b64c651c40123b9c9722497cc65aacc6602ea782167",
},
})
.then((response) => {
let res = response.data.wheel;
var modifiedText = bodyText.replace(
boughto_wheel_package,
boughto_wheel_packageText
);
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
  <tbody><tr class="bg-white">
      <td>${res.max_width}X ${res.min_diameter}</td>
      <td>${res.pcds[0]?.pcd}</td>
      <td>${res.center_bore}</td>
      <td>${res.min_offset_et}</td>
      <td>${res.load_rating} Kg</td>
      </tr>
     
  </tbody>
</table>
</div>
</div>`);
bodyText = bodyElement.innerHTML;
})
.catch((error) => {
console.error(error);
// Handle the error
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
$(document).on("click", ".boughto_tyre_size_confirm button", function (e) {

let isAnyFieldBlank = Object.values(data).some(value => value === "");
if(isAnyFieldBlank === false) {
paramss.delete('ignore_no_stock');
paramss.delete('ignore_no_price');
window.location.href = `/pages/tyre-results?${paramss.toString()}`
}

});

// paramss.toString()
$(document).on("change", "[name=section]", function (e) {
paramss.delete('section');
data.section = e.target.value
if(e.target.value) {
paramss.set('section', e.target.value);
}
SearchD(paramss.toString())
});
$(document).on("change", "[name=profile]", function (e) {
paramss.delete('profile');
data.profile = e.target.value
if(e.target.value) {
paramss.set('profile', e.target.value);
}
SearchD(paramss.toString())
});
$(document).on("change", "[name=rim_size]", function (e) {
paramss.delete('rim_size');
data.rim_size = e.target.value
if(e.target.value) {
paramss.set('rim_size', e.target.value);
}
SearchD(paramss.toString())
});
$(document).on("change", "[name=load_index]", function (e) {
paramss.delete('load_index');
data.load_index = e.target.value
if(e.target.value) {
paramss.set('load_index', e.target.value);
}
SearchD(paramss.toString())
});
$(document).on("change", "[name=speed_rating]", function (e) {
paramss.delete('speed_rating');
data.speed_rating = e.target.value
if(e.target.value) {
paramss.set('speed_rating', e.target.value);
}
SearchD(paramss.toString())
});
function SearchD(item) {
if(!$("[name=section]").val()) {
$("[name=section]").html(`<option value="">loading</option>`)
}
if(!$("[name=profile]").val()) {
$("[name=profile]").html(`<option value="">loading</option>`)
}
if(!$("[name=rim_size]").val()) {
$("[name=rim_size]").html(`<option value="">loading</option>`)
}
if(!$("[name=load_index]").val()) {
$("[name=load_index]").html(`<option value="">loading</option>`)
}
if(!$("[name=speed_rating]").val()) {
$("[name=speed_rating]").html(`<option value="">loading</option>`)
}
axios.get(`https://shopify.boughtofeed.co.uk/api/search/tyres?${item}`, {
headers: {
Accept: "application/json",
// Authorization: "Bearer " + "9f838b9d7e09f4e70e56b9e85547382a1ab08dc686728b1d8dc012f152c5b026",
},
})
.then((response) => {
let data = response.data.filters
let section =  data.section.options
let profile =  data.profile.options
let rim_size =  data.rim_size.options
let load_index =  data.load_index.options
let speed_rating =  data.speed_rating.options   
if($("[name=section]").val()) {
$("[name=section]").html(`
<option value="">Any Section</option>
<option value="${$("[name=section]").val()}" selected>${$("[name=section]").val()}</option>
`)

}
else {
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
if($("[name=profile]").val()) {
$("[name=profile]").html(`
<option value="">Any Profile</option>
<option value="${$("[name=profile]").val()}" selected>${$("[name=profile]").val()}</option>
`)

}
else {
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
if($("[name=rim_size]").val()) {
$("[name=rim_size]").html(`
<option value="">Any Rim Size</option>
<option value="${$("[name=rim_size]").val()}" selected>${$("[name=rim_size]").val()}</option>
`)

}
else {
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
if($("[name=load_index]").val()) {
$("[name=load_index]").html(`
<option value="">Any Load Rating</option>
<option value="${$("[name=load_index]").val()}" selected>${$("[name=load_index]").val()}</option>
`)

}
else {
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
if($("[name=speed_rating]").val()) {
$("[name=speed_rating]").html(`
<option value="">Any Speed Index</option>
<option value="${$("[name=speed_rating]").val()}" selected>${$("[name=speed_rating]").val()}</option>
`)

}
else {
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
// Handle the error
});
}

function searachData () {
axios.get(`https://shopify.boughtofeed.co.uk/api/search/tyres?ignore_no_stock=1&ignore_no_price=1`, {
headers: {
Accept: "application/json",
// Authorization:"Bearer " + "9f838b9d7e09f4e70e56b9e85547382a1ab08dc686728b1d8dc012f152c5b026",
},
})
.then((response) => {
let data = response.data.filters
let section =  data.section.options
let profile =  data.profile.options
let rim_size =  data.rim_size.options
let load_index =  data.load_index.options
let speed_rating =  data.speed_rating.options
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
// Handle the error
});
} 
let par = ""



var boughto_tyre_size_confirm = "[boughto_tyre_size_confirm]";
var boughto_tyre_size_confirmText = "<div class='boughto_tyre_size_confirm'></div>";
if (bodyText.includes(boughto_tyre_size_confirm)) {
var modifiedText = bodyText.replace(
boughto_tyre_size_confirm,
boughto_tyre_size_confirmText
);
bodyElement.innerHTML = modifiedText;

$(".boughto_tyre_size_confirm").html(`
<h5>SEARCH FOR YOUR TYRES:</h5>

<div class="boughto_tyre-search">
<div class="boughto-search-input">
    <select name="section" id="">
        <option value="">Any Section</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="profile" id="">
        <option value="">Any Profile</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="rim_size" id="">
        <option value="">Any Rim Size</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="load_index" id="">
        <option value="" >Any Load Rating</option>
    </select>
</div>
<div class="boughto-search-input">
    <select name="speed_rating" id="">
        <option value="">Any Speed Index</option>
    </select>
</div>
<div class="boughto-search-button">
   <button>Search</button>
</div>
</div>`);
searachData()
bodyText = bodyElement.innerHTML;
} else {
console.log("Text not found");
}




var tyreResults = "[tyre-results]"
var tyreResultsText =  "<div class='tyreResults'><div class='tyreResultsB'></div></div>";


if (bodyText.includes(tyreResults)) {
const queryString = window.location.search;
const params = new URLSearchParams(queryString);


const url = new URL("https://shopify.boughtofeed.co.uk/api/search/tyres");
const url2 = new URL(window.location.href);
const paramss = new URLSearchParams(url2.search);
if(params.size === 0) {
}
else {
let WheelRange = []
let SpeedRating = []
let WetGrip = []
let FuelEfficiency = []
let NoiseDecibel = []
let NoiseRating = []




function productCardD(result) {
let  a =  result.map((item, index) => {
let rangeImg = item?.range?.image_url
let brandImg = item?.range?.brand?.logo_url
  return ` <div class="typerCard">
<div class="typerCard1">
  <img src="${brandImg}" alt="">
</div>
<div class="typerCard2">
  <img src="${rangeImg}" alt="">
</div>
<div class="typerCardDetails">
  <p>
      ${item?.range?.name}
      <br>
      ${item?.range?.tread_pattern} ${item?.rating?.speed_rating}${item?.rating?.load_index}
  </p>
  <div class="typerCardDetailsB">
      <div class="typerCardDetailsBox">
          <img src="https://cdn.boughtofeed.co.uk/assets/tyres/fuel.png" alt="">
          <span>C</span>
      </div>
      <div class="typerCardDetailsBox">
          <img src="https://cdn.boughtofeed.co.uk/assets/tyres/wet.png" alt="">
          <span>C</span>
      </div>
      <div class="typerCardDetailsBox">
          <img src="https://cdn.boughtofeed.co.uk/assets/tyres/fuel.png" alt="">
          <span>2dB</span>
      </div>
  </div>
  <div class="typerCardDetailsC">
      <p>PRICE PER TYRE:</p>
      <h3>£95.88</h3>
  </div>
  <div class="typerCardDetailsD">
      <select name="" id="">
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
      </select>
      <button>Buy</button>
  </div>
</div>
</div>`;
}).join("")
console.log(a)
$(".CardMain").html(a)
}


function dataa(item,name) {
let acc = item.map((ite) => {
return `<li>
<label for="${ite?.key}">
<input  id="${ite?.key}"  name="diameter" value="${ite?.key}" type="checkbox" class="">
<span>${ite?.key}</span>
</label>
</li>`
}).join("") 

console.log(acc,"mm")
$(name).html(acc)
}
paramss.append("ignore_no_stock", "1");
paramss.append("ignore_no_price", "1");
paramss.append("page", "1");
let pagilength = [];




function checkVal2() {
paramss.delete('range_name');
paramss.delete('speed_rating');
paramss.delete('wet_grip');
paramss.delete('fuel_efficiency');
paramss.delete('noise_decibel');
paramss.delete('noise_rating');
paramss.delete('page');
paramss.set('page',1);

$(".WheelRangelist input:checked").val() && paramss.set("range_name", $(".WheelRangelist input:checked").val())

// ($("[name=diameter]:checked").val() !== "all" && $("[name=diameter]:checked").val() ) && paramss.set("diameter", $("[name=diameter]:checked").val());
$(".SpeedRatinglist input:checked").val() &&  paramss.set("speed_rating", $(".SpeedRatinglist input:checked").val());
$(".WetGriplist input:checked").val() && paramss.set("wet_grip", $(".WetGriplist input:checked").val());
$(".FuelEfficiencylist input:checked").val() &&  paramss.set("fuel_efficiency", $(".FuelEfficiencylist input:checked").val());
$(".NoiseDecibellist input:checked").val() &&  paramss.set("noise_decibel", $(".NoiseDecibellist input:checked").val());
$(".NoiseRatinglist input:checked").val() &&  paramss.set("noise_rating", $(".NoiseRatinglist input:checked").val());
url.search = paramss.toString();
axios.get(`${url.toString()}`, {
headers: {
Accept: "application/json",
// Authorization:"Bearer " + "9f838b9d7e09f4e70e56b9e85547382a1ab08dc686728b1d8dc012f152c5b026",
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
// Paginationss(map)

productCardD(result)


data = response.data
WheelRange = data.filters.range_name.options
SpeedRating = data.filters.speed_rating.options
WetGrip = data.filters.wet_grip.options
FuelEfficiency = data.filters.fuel_efficiency.options
NoiseDecibel = data.filters.noise_decibel.options
NoiseRating = data.filters.noise_rating.options
dataa(WheelRange,".WheelRangelist");
dataa(SpeedRating,".SpeedRatinglist")
dataa(WetGrip,".WetGriplist")
dataa(FuelEfficiency,".FuelEfficiencylist")
dataa(NoiseDecibel,".NoiseDecibellist")
dataa(NoiseRating,".NoiseRatinglist")


$(`.WheelRangelist [value=${paramss.get('range_name')}]`).attr("checked",true)
$(`.SpeedRatinglist [value=${paramss.get('speed_rating')}]`).attr("checked",true)
$(`.WetGriplist [value=${paramss.get('wet_grip')}]`).attr("checked",true)
$(`.FuelEfficiencylist [value=${paramss.get('fuel_efficiency')}]`).attr("checked",true)
$(`.NoiseDecibellist [value=${paramss.get('noise_decibel')}]`).attr("checked",true)
$(`.NoiseRatinglist [value=${paramss.get('noise_rating')}]`).attr("checked",true)
})

.catch((error) => {
console.error(error);
// Handle the error
});
}









$(document).on("change", ".WheelRangelist input", function (e) {
checkVal2()
});
$(document).on("change", ".SpeedRatinglist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
  checkVal2()
});
$(document).on("change", ".WetGriplist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
  checkVal2()
});
$(document).on("change", ".FuelEfficiencylist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
  checkVal2()
});
$(document).on("change", ".NoiseDecibellist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
  checkVal2()
});
$(document).on("change", ".NoiseRatinglist input", function (e) {
if ($("[name=diameter]:checked").val()) {
}
  checkVal2()
});

url.search = paramss.toString();
var modifiedText = bodyText.replace(
tyreResults,
tyreResultsText
);
bodyElement.innerHTML = modifiedText;
axios.get(`${url.toString()}`, {
headers: {
Accept: "application/json",
// Authorization:"Bearer " +"9f838b9d7e09f4e70e56b9e85547382a1ab08dc686728b1d8dc012f152c5b026",
},
})
.then((response) => {
data = response.data
WheelRange = data.filters.range_name.options
SpeedRating = data.filters.speed_rating.options
WetGrip = data.filters.wet_grip.options
FuelEfficiency = data.filters.fuel_efficiency.options
NoiseDecibel = data.filters.noise_decibel.options
NoiseRating = data.filters.noise_rating.options
pagilength.length = data.pagination.total_pages
let map = []
for (let index = 0; index < pagilength.length; index++) {
map.push(index + 1)
}


let result = data.results;
let filters = data.filters;
let pagination = data.pagination;
let currentPage = pagination.currentpage;
$(".tyreResults").html(`<div class="boughto_top">
<div class="boughto_top-left">
<h2>Tyre results for 6/80R16</h2>
</div>
<div class="boughto_top-right">
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
<div class="boughto_bottom_left">
<div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3>Wheel Range</h3>
  <div class="accd">
    <svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
      </svg>
  </div>
</div>
<div class="accorditon_boughto_bottom">
  <ul class="WheelRangelist">
   
  </ul>
</div>
  </div>
<div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3> Speed Rating</h3>
  <div class="accd">
    <svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
      </svg>
  </div>
</div>
<div class="accorditon_boughto_bottom">
  <ul class="SpeedRatinglist">
  </ul>
</div>
  </div>
<div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3>Wet Grip</h3>
  <div class="accd">
    <svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
      </svg>
  </div>
</div>
<div class="accorditon_boughto_bottom">
  <ul class="WetGriplist">
  </ul>
</div>
  </div>
<div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3>Fuel Efficiency</h3>
  <div class="accd">
    <svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
      </svg>
  </div>
</div>
<div class="accorditon_boughto_bottom">
  <ul class="FuelEfficiencylist">
  </ul>
</div>
  </div>
  <div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3> Noise Decibel</h3>
  <div class="accd">
    <svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
      </svg>
  </div>
</div>
<div class="accorditon_boughto_bottom">
  <ul class="NoiseDecibellist">
  </ul>
</div>
  </div>
  <div class="accorditon_boughto">
<div class="accorditon_boughto_top">
<h3> Noise Rating</h3>
  <div class="accd">
    <svg x-show="!expanded" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
      <path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path>
      </svg>
  </div>
</div>
<div class="accorditon_boughto_bottom">
  <ul class="NoiseRatinglist">
  </ul>
</div>
  </div>
  </div>
  <div class="boughto_bottom_right">
    <div class="CardMain">
     
     
      
      </div>
      <div class="paginationSe">
        ${Number(paramss.get("pages")) != 1
? ` <button class="paginationSePre">Previous </button>`
: ``
}

<ul class="paginationSeli">

</ul>
${
Number(paramss.get("pages")) != pagination.total_pages
?
` <button class="paginationSeNext"> Next </button>`:""

}


    </div>
 
</div>
</div>
`);
dataa(WheelRange,".WheelRangelist");
dataa(SpeedRating,".SpeedRatinglist")
dataa(WetGrip,".WetGriplist")
dataa(FuelEfficiency,".FuelEfficiencylist")
dataa(NoiseDecibel,".NoiseDecibellist")
dataa(NoiseRating,".NoiseRatinglist")

productCardD(result)

//
// Paginationss(map)

$(document).click(function(e) {
$(".boughto_top-right-drop").removeClass("active")
})
$(".boughto_top-right-button").click(function(e) {
e.stopPropagation()
$(".boughto_top-right-drop").addClass("active")
})

// productCard(result)
})
.catch((error) => {
console.error(error);
// Handle the error
});

bodyText = bodyElement.innerHTML;
}
}


