// EXPLORATION(): I feel like I want to keep an optionaly nice aspect ratio for non required items.
// Because if we set the height too high what I call spagheti view of the item. Meaning the item is
// very compressed and the experience is weird.

// TODO(): La vie est belle.

let m3_carousel = document.getElementById("m3_carousel");
let m3_carousel_items = document.getElementsByClassName("m3_carousel_item");

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
    console.assert(m3_carousel_items.length >= 1 + numbers_of_items_to_display, "Numbers of items to display greater than actual items in caraousel");
    for (let index = 0;
             index < numbers_of_items_to_display;
           ++index ) {
        m3_carousel_items[index].style.width = `${m3_carousel_item_width}px`;
    }

    for (let index = 1 + numbers_of_items_to_display + 1;
             index < m3_carousel_items.length;
           ++index) {
        m3_carousel_items[index].style.display = "none";
    }
}

m3_carousel_items[total_items_per_view - 1].style.width = "56px";
m3_carousel_items[total_items_per_view - 1].style.backgroundColor = "blue";

m3_carousel_items[total_items_per_view - 2].style.width = "120px";
m3_carousel_items[total_items_per_view - 2].style.backgroundColor = "red";


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

m3_carousel.addEventListener("mousemove", (e) => {
    // console.log(`e.movementX:${e.movementX}`);
    if (is_down) {
        // TODO(): Since many viariables depends on e.movementX I strongly suspect we can simplify the code a lot.
        abs_translation_x += e.movementX;
        rel_translation_x += e.movementX;
        scaling_px += e.movementX;

        scaling_rel_x =  scaling_px / m3_carousel_item_width;
        scaling_abs_x += scaling_rel_x;

        let remaining_px;
        let scaling_to_small_item_px;
        let scaling_to_small_item;
        
        if (Math.abs(scaling_px) >= (m3_carousel_item_width - small_carousel_item_width)) {   
            // TODO(): Make transition from remaining the remaining_px after swap smooth.
            scaling_to_small_item = 40 / m3_carousel_item_width;
            first_item_can_move = true;
        }

        if (abs_translation_x >= 0) {
            offset_left_x = Math.floor(rel_translation_x/(small_carousel_item_width));
        } else if (rel_translation_x <= 0) {
            offset_left_x = Math.ceil(rel_translation_x/(small_carousel_item_width));
        }
        console.log(`offset_left_x:${offset_left_x}`);
        if (offset_left_x == previous_offset) {
            offset_left_x = 0;
        } else {
            // TODO(): We want to recanolize the origin.
            previous_offset = offset_left_x;
            rel_translation_x = abs_translation_x % small_carousel_item_width;
            console.log(`rel_translation_x:${rel_translation_x}`);
        }
        console.log(`abs_translation_x:${abs_translation_x}`);
        for (let index = 0;
                 index < m3_carousel_items.length;
               ++index) {
            let current_item = m3_carousel_items[index];

            if (index == 0) {
                current_item.style.transformOrigin = `bottom left`;
                if (!first_item_can_move) {
                    current_item.style.transform = `translate3d(${0}px, 0, 0) scale3d(${1 + scaling_rel_x}, 1, 1)`;
                } else {
                    // current_item.style.transformOrigin = `center`;
                    // current_item.style.transform = `translate3d(${abs_translation_x}px, 0, 0)`;
                    translate = abs_translation_x + (m3_carousel_item_width - small_carousel_item_width);
                    current_item.style.transform = `translate3d(${translate}px, 0, 0) scale3d(${scaling_to_small_item}, 1, 1)`;
                }
            } else {
                current_item.style.transform = `translate3d(${abs_translation_x}px, 0, 0)`;            
            }
            
        }
        for (let index = 0;
            index < m3_carousel_items.length;
          ++index) {
                let current_item = m3_carousel_items[index];
                let pos = Number(current_item.getAttribute("pos"));
                pos += offset_left_x;
                current_item.setAttribute("pos", pos.toString());
                current_item.innerHTML = `${current_item.getAttribute("pos")}`;
        }
    }
    
});
