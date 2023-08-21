// EXPLORATION(): I feel like I want to keep an optionaly nice aspect ratio for non required items.
// Because if we set the height too high what I call spagheti view of the item. Meaning the item is
// very compressed and the experience is weird.
// TODO(): La vie est belle.
var m3_carousel = document.getElementById("m3_carousel");
var m3_carousel_items = document.getElementsByClassName("m3_carousel_item");
var m3_carousel_width = m3_carousel.clientWidth;
// NOTE(): We remove the padding.
m3_carousel_width -= 32;
// NOTE(): We remove the two defaults items combined witdth.
m3_carousel_width -= 176;
// NOTE(): We remove the gap between the two defaults items.
m3_carousel_width -= 8;
// NOTE(): We remove the gap between the second item and the rest.
m3_carousel_width -= 8;
var numbers_of_items_to_display = 0;
var rest = m3_carousel_width;
while(rest >= 0){
    rest -= 204;
    ++numbers_of_items_to_display;
}
var gap_to_add = numbers_of_items_to_display - 1;
var total_gap = gap_to_add * 8;
m3_carousel_width -= total_gap;
var m3_carousel_item_width = m3_carousel_width / numbers_of_items_to_display;
var total_items_per_view = 2 + numbers_of_items_to_display;
// TODO(): We want to determine how many item to display in the caraousel container.
if (numbers_of_items_to_display) {
    console.assert(m3_carousel_items.length >= 1 + numbers_of_items_to_display, "Numbers of items to display greater than actual items in caraousel");
    for(var index = 0; index < numbers_of_items_to_display; ++index){
        m3_carousel_items[index].style.width = "".concat(m3_carousel_item_width, "px");
    }
    for(var index1 = 1 + numbers_of_items_to_display + 1; index1 < m3_carousel_items.length; ++index1){
        m3_carousel_items[index1].style.display = "none";
    }
}
m3_carousel_items[total_items_per_view - 1].style.width = "56px";
m3_carousel_items[total_items_per_view - 1].style.backgroundColor = "blue";
m3_carousel_items[total_items_per_view - 2].style.width = "120px";
m3_carousel_items[total_items_per_view - 2].style.backgroundColor = "red";
var is_down = false;
m3_carousel.addEventListener("mousedown", function(e) {
    is_down = true;
});
m3_carousel.addEventListener("mouseup", function(e) {
    is_down = false;
});
var rel_translation_x = 0;
var abs_translation_x = 0;
var previous_offset = 0;
var offset_left_x = 0;
var small_carousel_item_width = 40;
var scaling_rel_x = 1;
var scaling_abs_x = 1;
var scaling_px = 0;
var first_item_can_move = false;
var translate = 0;
var first_item_abs_position_x = m3_carousel_items[0].getBoundingClientRect().left + 16;
var carousel_padding_left = 16;
var absolute_origin_x = m3_carousel.getBoundingClientRect().left + carousel_padding_left;
var first_item_position = m3_carousel_items[0];
var first_item_position_index = 0;
m3_carousel.addEventListener("mousemove", function(e) {
    // console.log(`e.movementX:${e.movementX}`);
    if (is_down) {
        // Recanonize first carousel's item.
        for(var index = 0; index < m3_carousel_items.length; ++index){
            var current_item = m3_carousel_items[index];
            var current_item_abs_x = current_item.getBoundingClientRect().left;
            if (current_item_abs_x >= absolute_origin_x - 40 && current_item_abs_x <= absolute_origin_x) {
                first_item_position = current_item;
                first_item_position_index = index;
            }
        }
        var position_index = first_item_position_index;
        for(var index1 = 0; index1 < m3_carousel_items.length; ++index1){
            var current_item1 = m3_carousel_items[index1];
            current_item1.setAttribute("pos", "".concat(1 - position_index));
            current_item1.innerHTML = "".concat(1 - position_index);
            console.log("position_index:" + position_index);
            --position_index;
        }
        // TODO(): Since many viariables depends on e.movementX I strongly suspect we can simplify the code a lot.
        abs_translation_x += e.movementX;
        rel_translation_x += e.movementX;
        scaling_px += e.movementX;
        scaling_rel_x = scaling_px / m3_carousel_item_width;
        scaling_abs_x += scaling_rel_x;
        var remaining_px;
        var scaling_to_small_item_px;
        var scaling_to_small_item;
        if (Math.abs(scaling_px) >= m3_carousel_item_width - small_carousel_item_width) {
            // TODO(): Make transition from remaining the remaining_px after swap smooth.
            scaling_to_small_item = 40 / m3_carousel_item_width;
            first_item_can_move = true;
        }
        // console.log(`abs_translation_x:${abs_translation_x}`);
        for(var index2 = 0; index2 < m3_carousel_items.length; ++index2){
            var current_item2 = m3_carousel_items[index2];
            if (index2 == 0) {
                current_item2.style.transformOrigin = "bottom left";
                if (!first_item_can_move) {
                    current_item2.style.transform = "translate3d(".concat(0, "px, 0, 0) scale3d(").concat(1 + scaling_rel_x, ", 1, 1)");
                } else {
                    // current_item.style.transformOrigin = `center`;
                    // current_item.style.transform = `translate3d(${abs_translation_x}px, 0, 0)`;
                    translate = abs_translation_x + (m3_carousel_item_width - small_carousel_item_width);
                    current_item2.style.transform = "translate3d(".concat(translate, "px, 0, 0) scale3d(").concat(scaling_to_small_item, ", 1, 1)");
                }
            } else {
                current_item2.style.transform = "translate3d(".concat(abs_translation_x, "px, 0, 0)");
            }
        }
    }
});

