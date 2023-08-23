// EXPLORATION(): I feel like I want to keep an optionaly nice aspect ratio for non required items.
// Because if we set the height too high what I call spagheti view of the item. Meaning the item is
// very compressed and the experience is weird.

// TODO(): La vie est belle.

let m3_carousel = document.getElementById("m3_carousel");
let el_carousel_items = document.getElementsByClassName("m3_carousel_item");

let m3_carousel_width = m3_carousel.clientWidth;

// NOTE(): We remove the padding.
m3_carousel_width -= 32;
// NOTE(): We remove the two defaults items combined witdth.
m3_carousel_width -= 176;
// NOTE(): We remove the gap between the two defaults items.
m3_carousel_width -= 8;
// NOTE(): We remove the gap between the second item and the rest.
m3_carousel_width -= 8;

let numbers_of_items_to_display = 0;

let rest = m3_carousel_width;
while (rest >= 0) {
    rest -= 204;
    ++numbers_of_items_to_display;
}

let gap_to_add = numbers_of_items_to_display - 1;

let total_gap = gap_to_add * 8;

m3_carousel_width -= total_gap;

let m3_carousel_item_width = m3_carousel_width / numbers_of_items_to_display;

let total_items_per_view = 2 + numbers_of_items_to_display;

// TODO(): We want to determine how many item to display in the caraousel container.

if (numbers_of_items_to_display) {
    console.assert(el_carousel_items.length >= 1 + numbers_of_items_to_display, "Numbers of items to display greater than actual items in caraousel");
    for (let index = 0;
             index < numbers_of_items_to_display;
           ++index ) {
        el_carousel_items[index].style.width = `${m3_carousel_item_width}px`;
    }

    for (let index = 1 + numbers_of_items_to_display + 1;
             index < el_carousel_items.length;
           ++index) {
        el_carousel_items[index].style.display = "none";
    }
}

el_carousel_items[total_items_per_view - 1].style.width = "56px";
el_carousel_items[total_items_per_view - 1].style.backgroundColor = "blue";

el_carousel_items[total_items_per_view - 2].style.width = "120px";
el_carousel_items[total_items_per_view - 2].style.backgroundColor = "red";


let is_down = false;
m3_carousel.addEventListener("mousedown", (e) => {
    is_down = true;
});

m3_carousel.addEventListener("mouseup", (e) => {
    is_down = false;
});


let rel_translation_x = 0;
let abs_translation_x = 0;
let previous_offset = 0;
let offset_left_x = 0;
let small_carousel_item_width = 40;

let scaling_rel_x = 1;
let scaling_abs_x = 1;
let scaling_px = 0;
let first_item_can_move = false;

let translate = 0;

let first_item_abs_position_x = el_carousel_items[0].getBoundingClientRect().left + 16;

let carousel_padding_left = 16;
let absolute_origin_x = m3_carousel.getBoundingClientRect().left + carousel_padding_left;

let first_item_position = el_carousel_items[0];
let previous_item_position = first_item_position;
let first_item_position_index = 0;

class Carousel {
    el: Element;
    items: CarouselItem[];
    origin_x: Number;
}

class CarouselItem {
    el: Element;
    pos: Number;
    abs_x: Number;
    rel_x: Number
    scaling_x: Number;
    original_width: Number;
    actual_width: Number;
    can_move: Boolean;

    constructor(el : Element, pos : Number, abs_x : Number, rel_x: Number, scaling_x : Number, original_width : Number, actual_width : Number, can_move: Boolean) {
        this.el = el;
        this.pos = pos;
        this.abs_x = abs_x;
        this.rel_x = rel_x
        this.scaling_x = scaling_x;
        this.original_width = original_width;
        this.actual_width = actual_width;
        this.can_move = can_move;
    }
}

let carousel_items = [];
for (let index = 0; index < el_carousel_items.length; ++index) {
    let item_width = el_carousel_items[index].clientWidth;
    let abs_x = el_carousel_items[index].getBoundingClientRect().left;
    let item;
    if (index == 0) {
        item = new CarouselItem(
            el_carousel_items[index],
            index,
            abs_x,
            0,
            1,
            item_width,
            item_width,
            false
        );    
    }
    else {
        item = new CarouselItem(
            el_carousel_items[index],
            index,
            abs_x,
            0,
            1,
            item_width,
            item_width,
            true
        );  
    }
    
    carousel_items.push(item);
}

m3_carousel.addEventListener("mousemove", (e) => {
    if (is_down) {
        for (const item of carousel_items) {
            item.el.style.transformOrigin = `bottom right`;
        
            item.rel_x += e.movementX;
            item.abs_x += e.movementX;

            let left_item_point : Number = item.abs_x;
            let right_item_point : Number = item.abs_x + item.actual_width;
            let left_first_position_point : Number = absolute_origin_x + 40;
            let right_first_position_point : Number = absolute_origin_x + m3_carousel_item_width;

            if ((right_item_point >= left_first_position_point) && (right_item_point <= right_first_position_point)) {
                    
                let d = right_first_position_point - left_first_position_point;
                console.log(`d: ${d}`);
                let m =  ((right_item_point - absolute_origin_x) - 40 )/ d;
                console.log(`m: ${m}`);
                let w = 40 + (m * d);
                console.log(`w: ${w}`);

                item.width = w;

                item.scaling_x =  w / m3_carousel_item_width;
                console.log(`item.scaling_x: ${item.scaling_x}`);
                item.el.style.backgroundColor = "yellow";
                
            }
            else if ((right_item_point < left_first_position_point)) {
                item.width = 40;
                item.scaling_x = item.width / m3_carousel_item_width;
                item.el.style.backgroundColor = "blue";
            }
            else if ((right_item_point > left_first_position_point)) {
                item.width = item.original_width;
                item.scaling_x = 1;
                item.el.style.backgroundColor = "red";
            }

            item.el.style.transform = `translate3d(${item.rel_x}px, 0, 0) scale3d(${item.scaling_x}, 1, 1)`;
        }
    }
});
