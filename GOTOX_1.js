(function () {
    const FIXED_DOMAIN = "https://search.blog-dnz.com/gotox=";
    function encodeLinks() {
        document.querySelectorAll('a[href^="/gotox="]').forEach(a => {
            const original = a.getAttribute("href");
            if (!original) return;
            const rawUrl = original.replace("/gotox=", "");
            if (rawUrl) {
                const encoded = btoa(rawUrl);
                a.setAttribute(
                    "href",
                    FIXED_DOMAIN + encoded
                );
            }
        });
    }
    document.addEventListener("click", function (e) {
        const a = e.target.closest(
            'a[href^="https://search.blog-dnz.com/gotox="]'
        );
        if (!a || a.target === "_blank") return;
        e.preventDefault();
        const encoded = a.getAttribute("href")
            .split("/gotox=")[1];
        if (encoded) {
            location.href = atob(encoded);
        }
    });
    if (location.href.includes("/gotox=")) {
        const encoded = location.href.split("/gotox=")[1];
        if (encoded) {
            try {
                location.href = atob(encoded);
            } catch (e) {
                console.error(e);
            }
        }
    }
    if (document.readyState === "complete") {
        encodeLinks();
    } else {
        document.addEventListener(
            "DOMContentLoaded",
            encodeLinks
        );
    }
})();
