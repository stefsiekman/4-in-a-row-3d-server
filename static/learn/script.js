$(() => {

    "use strict"

    // DOM ready

    var aiId, aiKey

    pushAlert("Hi there, welcome to the FIAR3D learning tool!")

    // Function to display alerts
    function pushAlert(message, type = "info") {
        var $alert = $("<div>").addClass(`alert alert-${type}`)

        if (message.error_code && message.error_message) {
            $alert.html(`<b>Error #${message.error_code}:</b> ${message.error_message}`)
        } else {
            $alert.html(message)
        }

        // Display the alert
        $("#alerts").prepend($alert)

        // Log to the terminal
        switch (type) {
        case "warning":
            console.warn(message)
            break
        case "danger":
            console.error(message)
            break
        default:
            console.log(message)
        }
    }

    // Hide some elements at the start
    $("#ai-credentials").hide()

    // AI registration
    $("#formRegister").submit((event) => {
        event.preventDefault()

        var data = {
            name: $("#aiName").val()
        }

        $.ajax({
            type: "POST",
            url: "/ai",
            data: JSON.stringify(data),
            dataType: "json",
            contentType: "application/json",
            success: (data) => {
                pushAlert("Registerd successfully!", "success")
                $("#aiName").val("")

                // Fill the ai credentials
                $("#aiCredId").val(data.id)
                $("#aiCredName").val(data.name)
                $("#aiCredKey").val(data.key)

                // Switch visibility of elements
                $("#ai-activate").hide()
                $("#ai-credentials").show()

                // Save the credentials
                aiId = data.id
                aiKey = data.key
            },
            error: (error) => {
                if (error.responseText) {
                    pushAlert(JSON.parse(error.responseText), "danger")
                } else {
                    pushAlert("Could not complete your request.", "danger")
                }
            }
        })
    })

    // AI Login form
    $("#formLogin").submit((event) => {
        event.preventDefault()

        aiId = $("#aiId").val()
        aiKey = $("#aiKey").val()

        $.ajax({
            type: "GET",
            url: "/ai/" + aiId,
            success: (data) => {
                pushAlert("AI name loaded successfully", "success")

                // Fill the ai credentials
                $("#aiCredId").val(aiId)
                $("#aiCredName").val(data.name)
                $("#aiCredKey").val(aiKey)

                // Switch visibility of elements
                $("#ai-activate").hide()
                $("#ai-credentials").show()
            },
            error: (error) => {
                if (error.responseText) {
                    pushAlert(JSON.parse(error.responseText), "danger")
                } else {
                    pushAlert("Could not complete your request.", "danger")
                }
            }
        })
    })

})
