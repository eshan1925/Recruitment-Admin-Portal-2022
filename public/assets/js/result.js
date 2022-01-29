function selectCategory() {
    var category = document.getElementById("category");
    var selectedCategory = category.options[category.selectedIndex].text;
    let element1 = document.getElementById("all");
    let element2 = document.getElementById("selected");
    let element3 = document.getElementById("notselected");


    switch (selectedCategory) {
        case "All":
            element1.classList.remove("hidden");
            element2.classList.add("hidden");
            element3.classList.add("hidden");
            break;
        case "Selected":
            element1.classList.add("hidden");
            element2.classList.remove("hidden");
            element3.classList.add("hidden");
            break;
        case "Not Selected":
            element1.classList.add("hidden");
            element2.classList.add("hidden");
            element3.classList.remove("hidden");
            break;
    }
}