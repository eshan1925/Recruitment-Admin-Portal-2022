function selectCategory() {
    var category = document.getElementById("category");
    var selectedCategory = category.options[category.selectedIndex].text;
    let element1 = document.getElementById("user_section");
    let element2 = document.getElementById("question_section");
    let element3 = document.getElementById("rightQuestionFirst");
    let element4 = document.getElementById("rightQuestionSecond");

    switch (selectedCategory) {
        case "User":
            element1.classList.remove("hidden");
            element3.classList.remove("hidden");
            element2.classList.add("hidden");
            element4.classList.add("hidden");
            break;
        case "Questions":
            element1.classList.add("hidden");
            element3.classList.add("hidden");
            element2.classList.remove("hidden");
            element4.classList.remove("hidden");
            break;
    }
}