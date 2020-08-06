Ext.onReady(function () {
    var d = Ext.DomQuery.selectNode("meta[name=last-modified]").getAttribute("content");
    Ext.get("lastModifiedSection").setHTML("Last Modified : " + new Date(parseInt(d)));
    Ext.each(Ext.select("#menu li a").elements, function (e, index) {
        var menuElement = new Ext.Element(e);
        menuElement.on("click", menuClick, this)
    });

    function menuClick(evt, el, o) {
        this.link = el.id;
        Ext.get("content").load({
            url: el.id, scope: this, scripts: true, success: function () {
                if (this.link == "feedback") {
                    var panel = Ext.create("FeedbackForm", {renderTo: Ext.get("fbForm")});
                    panel.show()
                } else if (el.id == "") {
                }
            }
        });
        evt.preventDefault();
        evt.stopPropagation()
    }

    Ext.get("logo").on("click", function (event) {
        loadHome();
    });

    var downloadButtons = Ext.select(".downloadButton").elements;
    for (var i = 0; i < downloadButtons.length; ++i) {
        new Ext.Element(downloadButtons[i]).on("click", downloadExec)
    }
});

function downloadExec(evt, el, o) {
    window.location = el.getAttribute("location")
}

function loadHome() {
    Ext.get("content").load({
        url: "home", success: function (p, q, r) {
            var downloadButtons = Ext.select(".downloadButton").elements;
            for (var i = 0; i < downloadButtons.length; ++i) {
                new Ext.Element(downloadButtons[i]).on("click", downloadExec)
            }
        }
    })
}