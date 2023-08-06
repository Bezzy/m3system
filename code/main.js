var m3_carousel = document.getElementById("m3_carousel");
var m3_carousel_items = document.getElementsByClassName("m3_carousel_item");
// TODO(): We want to determine how many item to display in the caraousel container.
m3_carousel_items[0].style.width = "56px";
m3_carousel_items[0].style.backgroundColor = "blue";
m3_carousel_items[1].style.width = "120px";
m3_carousel_items[1].style.backgroundColor = "red";
var m3_carousel_width = m3_carousel.clientWidth;
// NOTE(): We remove the padding.
m3_carousel_width -= 32;
// NOTE(): We remove the two defaults items combined witdth.
m3_carousel_width -= 176;
// NOTE(): We remove the gap between the two defaults items.
m3_carousel_width -= 8;
// NOTE(): We remove the gap between the second item and the rest.
m3_carousel_width -= 8;
var numbers_of_items = 0;
var rest = m3_carousel_width;
while(rest >= 0){
    rest -= 204;
    ++numbers_of_items;
}
var gap_to_add = numbers_of_items - 1;
var total_gap = gap_to_add * 8;
m3_carousel_width -= total_gap;
var m3_carousel_item_width = m3_carousel_width / numbers_of_items;
if (numbers_of_items) {
    // TODO(): IMPORTANT: Assert m3_carousel_items.length >= 1 + numbers_of_items
    for(var index = 1 + numbers_of_items; index > 1; --index){
        m3_carousel_items[index].style.width = "".concat(m3_carousel_item_width, "px");
    }
    for(var index1 = 1 + numbers_of_items + 1; index1 < m3_carousel_items.length; ++index1){
        m3_carousel_items[index1].style.display = "none";
    }
}
