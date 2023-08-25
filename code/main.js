// EXPLORATION(): I feel like I want to keep an optionaly nice aspect ratio for non required items.
// Because if we set the height too high what I call spagheti view of the item. Meaning the item is
// very compressed and the experience is weird.
// TODO(): La vie est belle.
function _class_call_check(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
        throw new TypeError("Cannot call a class as a function");
    }
}
function _define_property(obj, key, value) {
    if (key in obj) {
        Object.defineProperty(obj, key, {
            value: value,
            enumerable: true,
            configurable: true,
            writable: true
        });
    } else {
        obj[key] = value;
    }
    return obj;
}
var m3_carousel_item_content = document.getElementsByClassName("m3_carousel_item_content");
var m3_carousel = document.getElementById("m3_carousel");
var el_carousel_items = document.getElementsByClassName("m3_carousel_item");
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
    console.assert(el_carousel_items.length >= 1 + numbers_of_items_to_display, "Numbers of items to display greater than actual items in caraousel");
    for(var index = 0; index < numbers_of_items_to_display; ++index){
        el_carousel_items[index].style.width = "".concat(m3_carousel_item_width, "px");
    }
    for(var index1 = 1 + numbers_of_items_to_display + 1; index1 < el_carousel_items.length; ++index1){
        el_carousel_items[index1].style.display = "none";
    }
}
el_carousel_items[total_items_per_view - 1].style.width = "56px";
el_carousel_items[total_items_per_view - 1].style.backgroundColor = "blue";
el_carousel_items[total_items_per_view - 2].style.width = "120px";
el_carousel_items[total_items_per_view - 2].style.backgroundColor = "red";
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
var first_item_abs_position_x = el_carousel_items[0].getBoundingClientRect().left + 16;
var carousel_padding_left = 16;
var absolute_origin_x = m3_carousel.getBoundingClientRect().left + carousel_padding_left;
var first_item_position = el_carousel_items[0];
var previous_item_position = first_item_position;
var first_item_position_index = 0;
var Carousel = function Carousel() {
    "use strict";
    _class_call_check(this, Carousel);
    _define_property(this, "el", void 0);
    _define_property(this, "items", void 0);
    _define_property(this, "origin_x", void 0);
};
var CarouselItem = function CarouselItem(el, pos, abs_x, rel_x, scaling_x, original_width, actual_width, can_move) {
    "use strict";
    _class_call_check(this, CarouselItem);
    _define_property(this, "el", void 0);
    _define_property(this, "pos", void 0);
    _define_property(this, "abs_x", void 0);
    _define_property(this, "rel_x", void 0);
    _define_property(this, "scaling_x", void 0);
    _define_property(this, "original_width", void 0);
    _define_property(this, "actual_width", void 0);
    _define_property(this, "can_move", void 0);
    this.el = el;
    this.pos = pos;
    this.abs_x = abs_x;
    this.rel_x = rel_x;
    this.scaling_x = scaling_x;
    this.original_width = original_width;
    this.actual_width = actual_width;
    this.can_move = can_move;
};
var carousel_items = [];
for(var index2 = 0; index2 < el_carousel_items.length; ++index2){
    var item_width = el_carousel_items[index2].clientWidth;
    var abs_x = el_carousel_items[index2].getBoundingClientRect().left;
    var item = void 0;
    if (index2 == 0) {
        item = new CarouselItem(el_carousel_items[index2], index2, abs_x, 0, 1, item_width, item_width, false);
    } else {
        item = new CarouselItem(el_carousel_items[index2], index2, abs_x, 0, 1, item_width, item_width, true);
    }
    carousel_items.push(item);
}
m3_carousel.addEventListener("mousemove", function(e) {
    if (is_down) {
        var _iteratorNormalCompletion = true, _didIteratorError = false, _iteratorError = undefined;
        try {
            for(var _iterator = carousel_items[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true){
                var item = _step.value;
                item.el.style.transformOrigin = "bottom right";
                item.rel_x += e.movementX;
                item.abs_x += e.movementX;
                var left_item_point = item.abs_x;
                var right_item_point = item.abs_x + item.actual_width;
                var left_first_position_point = absolute_origin_x + 40;
                var right_first_position_point = absolute_origin_x + m3_carousel_item_width;
                if (right_item_point >= left_first_position_point && right_item_point <= right_first_position_point) {
                    var d = right_first_position_point - left_first_position_point;
                    console.log("d: ".concat(d));
                    var m = (right_item_point - absolute_origin_x - 40) / d;
                    console.log("m: ".concat(m));
                    var w = 40 + m * d;
                    console.log("w: ".concat(w));
                    item.width = w;
                    item.scaling_x = w / m3_carousel_item_width;
                    console.log("item.scaling_x: ".concat(item.scaling_x));
                    item.el.style.backgroundColor = "yellow";
                } else if (right_item_point < left_first_position_point) {
                    item.width = 40;
                    item.scaling_x = item.width / m3_carousel_item_width;
                    item.el.style.backgroundColor = "blue";
                } else if (right_item_point > left_first_position_point) {
                    item.width = item.original_width;
                    item.scaling_x = 1;
                    item.el.style.backgroundColor = "red";
                }
                item.el.style.transform = "translate3d(".concat(item.rel_x, "px, 0, 0)"); //scale3d(${item.scaling_x}, 1, 1)
                item.el.style.clipPath = "inset(0 0 0 ".concat(m3_carousel_item_width - item.width, "px)");
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally{
            try {
                if (!_iteratorNormalCompletion && _iterator.return != null) {
                    _iterator.return();
                }
            } finally{
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }
});

