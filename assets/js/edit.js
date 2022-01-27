function btnSave() {
    var but = document.getElementById("change").innerHTML;
    if (but == "Save Changes") {
        document.getElementById("change").innerHTML = "Edit";
    }
    else if (but == "Edit") {
        document.getElementById("change").innerHTML = "Save Changes";
    }
}