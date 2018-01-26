$(() => {
    "use strict"

    function loadPage(name) {
        // Clear the target first
        var $target = $("#content-target")
        $target.html("")

        // Load the content into the target
        $.ajax(`/pages/${name}.html`).done((data) => {
            $target.html(data)
        })
    }

    $(document).on("click", "a", function(event) {
        var $anchor = $(this)

        // If has the data-link attr
        if ($anchor.data("link")) {
            event.preventDefault()
            loadPage($anchor.data("link"))
        }
    })

    // Start with loading the active link's page
    $("li.active").each(function(index) {
        var $anchor = $(this.children[0])

        if (!$anchor.data) return

        if ($anchor.data("link")) {
            loadPage($anchor.data("link"))
        }
    })

})
