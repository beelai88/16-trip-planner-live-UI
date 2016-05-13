function makeOptions(data, id) {
    data.forEach(function(item) {
        $(id).append("<option>" + item.name + "</option>")
    })
}
makeOptions(hotels, "#hotel-choices");
makeOptions(restaurants, "#restaurant-choices");
makeOptions(activities, "#activity-choices");

function addChoice(addButtonId, optionId, planId){
    $(addButtonId).on("click", function(){
        var item = $(optionId).val();
        var newRemoveButton = "<button class='btn btn-xs btn-danger remove btn-circle'>x</button>";
        var finalChoice = "<span class='title'>" + item + "</span>";
        $(planId).append(finalChoice + newRemoveButton);
    })
}
addChoice("#hotel-add", "#hotel-choices", "#my-hotel");
addChoice("#restaurant-add", "#restaurant-choices", "#my-restaurant");
addChoice("#activity-add", "#activity-choices", "#my-activity");
