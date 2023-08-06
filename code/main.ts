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


let translation_x = 0;
m3_carousel.addEventListener("mousemove", (e) => {
    console.log(`e.movementX:${e.movementX}`);
    if (is_down) {
        translation_x = translation_x + e.movementX;
        for (let index = 0;
                 index < m3_carousel_items.length;
               ++index) {
            console.log(`translation_x:${translation_x}`);
            m3_carousel_items[index].style.transform = `translate3d(${translation_x}px, 0, 0)`;
        }
    } else {
    }
});
