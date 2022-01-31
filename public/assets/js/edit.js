function btnSave() {
    var but = document.getElementById("change").innerHTML;
    if (but === "Save Changes") {
        document.getElementById("change").innerHTML = "Edit";
        document.getElementById("content").disabled = true;
    }
    if (but === "Edit") {
        document.getElementById("change").innerHTML = "Save Changes";
        document.getElementById("content").disabled = false;
    }
}

var editableQuestion = 0;

function getId(btn) {
    editableQuestion = btn.id;
    console.log(editableQuestion);
}

function selectCategory() {
    var category = document.getElementById("category");
    var selectedCategory = category.options[category.selectedIndex].text;
    console.log(selectedCategory);
    let e2 = document.getElementById("easy");
    let e3 = document.getElementById("medium");
    let e4 = document.getElementById("hard");

    switch (selectedCategory) {
        case "All":
            e2.classList.remove("hidden");
            e3.classList.remove("hidden");
            e4.classList.remove("hidden");
            break;
        case "Easy":
            e2.classList.remove("hidden");
            e3.classList.add("hidden");
            e4.classList.add("hidden");
            break;
        case "Medium":
            e2.classList.add("hidden");
            e3.classList.remove("hidden");
            e4.classList.add("hidden");
            break;
        case "Hard":
            e3.classList.add("hidden");
            e2.classList.add("hidden");
            e4.classList.remove("hidden");
            break;

    }
}