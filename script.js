function readyFn(jQuery) {
    $("form#animal-form").submit(formSubmitted)
    $("form#zipcode-form").submit(zipSubmitted)
}

function findAnimalsBySpecies(type) {
    type = type.toUpperCase()
    var url = "https://data.brla.gov/resource/3tyj-sddj.json?species=" + type

    var request = $.ajax(url)
    request.done(displayAnimals)
    request.fail(handleError)
}

function findAnimalsByZip(zip) {
    var url = "https://data.brla.gov/resource/3tyj-sddj.json?loczip=" + zip

    var request = $.ajax(url)
    request.done(displayAnimals)
    request.fail(handleError)
}

function displayAnimals(animalData) {
    var list = ""
    var animal = null

    if (animalData.length > 0) {
        for (index in animalData) {
            animal = animalData[index]
            list = list +
                "<li class=\"list-group-item\">" +
                animal.size +
                " " +
                animal.breed +
                " | " +
                animal.temperment +
                " | " +
                (animal.petname || "No name") +
                " | " +
                animal.location +
                "</li>"
        }
        $("#message").html("Here are your results!")
        $("ul#animal-list").html(list)
    } else {
        $("#message").html("No results found for that type of animal :(")
    }
}

function handleError(_request, _status, error) {
    $("#message").html("There was an error! Try again please.")
}

function formSubmitted(event) {
    event.preventDefault()
    console.log("form submitted!")
    var species = $("#species").val()
    console.log("Searching for this type of animal: " + species)
    findAnimalsBySpecies(species)
}

function zipSubmitted(event) {
    event.preventDefault()
    console.log("zip submitted!")
    var zip = $("#zipcode").val()
    console.log("Searching for this animal in this zipcode: " + zip)
    findAnimalsByZip(zip)
}


$(document).ready(readyFn)