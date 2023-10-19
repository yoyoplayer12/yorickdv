<?php
require_once __DIR__ . '/bootstrap.php';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $isHTTPS = isset($_POST['isHTTPS']) && $_POST['isHTTPS'] === 'true';

    // Set the HTTPS status in the session
    $_SESSION['isHTTPS'] = $isHTTPS;

    // Return the HTTPS status as the response
    echo $isHTTPS ? "true" : "false";
    exit();
}
// Check if the HTTPS status has been set in the session
if (isset($_SESSION['isHTTPS'])) {
    $isHTTPS = $_SESSION['isHTTPS'];
    if ($isHTTPS) {
        // Show content for HTTPS
        $httpsStatus = "This is an HTTPS page.";
    } else {
        // Show content for non-HTTPS
        $httpsStatus = "This is not an HTTPS page.";
    }
} else {
    // HTTPS status not available, handle accordingly
    $httpsStatus = "Unable to determine HTTPS status.";
}
?>
<!DOCTYPE html>
<html lang="en">

<head>
    <!-- Google Tag Manager -->
    <script>
        (function(w, d, s, l, i) {
            w[l] = w[l] || [];
            w[l].push({
                'gtm.start': new Date().getTime(),
                event: 'gtm.js'
            });
            var f = d.getElementsByTagName(s)[0],
                j = d.createElement(s),
                dl = l != 'dataLayer' ? '&l=' + l : '';
            j.async = true;
            j.src =
                'https://www.googletagmanager.com/gtm.js?id=' + i + dl;
            f.parentNode.insertBefore(j, f);
        })(window, document, 'script', 'dataLayer', 'GTM-WHDRZWXG');
    </script>
    <!-- mailchimp -->
    <script id="mcjs">
        ! function(c, h, i, m, p) {
            m = c.createElement(h), p = c.getElementsByTagName(h)[0], m.async = 1, m.src = i, p.parentNode.insertBefore(m, p)
        }(document, "script", "https://chimpstatic.com/mcjs-connected/js/users/73ce4ec6685f7d62b4ee57336/ee7c52e7988ddb10b5dfa36b2.js");
    </script>
    <!-- end mailchimp -->
    <!-- End Google Tag Manager -->
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="icon" href="https://portfolionew.blob.core.windows.net/photos/main/icon.png?sp=r&st=2023-09-30T19:27:28Z&se=2027-09-13T03:27:28Z&sv=2022-11-02&sr=c&sig=VW5wrRC5ATdgTCgeJBXjVpeoVW0p4r4RIHfg9bal2yU%3D" type="image/x-icon" />
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <!-- open graphs -->
    <meta property="og:type" content="website" />
    <meta property="og:secure_url" content="https://yorickdv.be" />
    <meta property="og:url" content="http://yorickdv.be" />
    <meta property="og:title" content="Yorick Devleeschouwer | Portfolio" />
    <meta property="og:description" content="Here you can explore some things i've been working on..." />
    <meta property="og:image" content="https://portfolionew.blob.core.windows.net/photos/main/graphs.jpg?sp=r&st=2023-09-30T19:27:28Z&se=2027-09-13T03:27:28Z&sv=2022-11-02&sr=c&sig=VW5wrRC5ATdgTCgeJBXjVpeoVW0p4r4RIHfg9bal2yU%3D" />
    <meta property="og:site_name" content="yorickdv" />

    <!-- Twitter -->
    <meta property="twitter:card" content="summary_large_image" />
    <meta property="twitter:site" content="yorickdv.be" />
    <meta property="twitter:title" content="Yorick Devleeschouwer | Portfolio" />
    <meta property="twitter:description" content="Here you can explore some things i've been working on..." />
    <meta property="twitter:image" content="https://portfolionew.blob.core.windows.net/photos/main/graphs.jpg?sp=r&st=2023-09-30T19:27:28Z&se=2027-09-13T03:27:28Z&sv=2022-11-02&sr=c&sig=VW5wrRC5ATdgTCgeJBXjVpeoVW0p4r4RIHfg9bal2yU%3D" />


    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <script>
        // Send an AJAX request to the current page URL
        $.ajax({
            type: 'POST',
            url: window.location.href,
            data: {
                isHTTPS: window.location.protocol === "https:"
            },
            success: function(response) {
                console.log(response);
                // Handle the response here (e.g., show content based on HTTPS status)
                if (response === "true") {
                    // Show content for HTTPS
                    $('#content').text("This is an HTTPS page.");
                } else {
                    // Show content for non-HTTPS
                    $('#content').text("This is not an HTTPS page.");
                }
            },
            error: function(xhr, status, error) {
                console.log(error);
            }
        });
    </script>


    <title>Yorick Devleeschouwer</title>
</head>

<body class="lightest-background">
    <!-- Google Tag Manager (noscript) -->
    <noscript><iframe src="https://www.googletagmanager.com/ns.html?id=GTM-WHDRZWXG" height="0" width="0" style="display:none;visibility:hidden"></iframe></noscript>
    <!-- End Google Tag Manager (noscript) -->
    <div class="centeredflex">
        <div class="colorblocks">
            <?php if ($isHTTPS) : ?>
                <div class="httpstext">
                    <p class="toptext" style="background-color: black;color:white;">Can't see any colors here?</p>
                    <p class="bottext" style="background-color: black;color:white;">Try reloading the page as http to get your random color palette!</p>
                </div>
            <?php else : ?>
                <div class="colorblock lightest-background"></div>
                <div class="colorblock light-background"></div>
                <div class="colorblock maincolor-background"></div>
                <div class="colorblock lightdark-background"></div>
                <div class="colorblock dark-background"></div>





                <p class="dark-color" id="lightest"></p>
                <p class="dark-color" id="light"></p>
                <p class="dark-color" id="maincolor"></p>
                <p class="dark-color" id="lightdark"></p>
                <p class="dark-color" id="dark"></p>
            <?php endif; ?>
        </div>
    </div>
    <?php if (!$isHTTPS) : ?>
        <p class="httpexplanation" style="background-color: black;color:white;">Don't like these colors? Try reloading the page.</p>
    <?php endif; ?>
    <header class="centered-fp lightest-background">
        <a href="#firstinfo" class="dark-color fptitle">Yorick Devleeschouwer</a>
    </header>
    <section class="firstinfo dark-background" id="firstinfo">
        <div class="firstinfo-container">
            <a href="#develop" class="develop pickscreen1 lightest-color">Develop</a>
            <a href="#dj" class="dj pickscreen1 lightest-color">DJ</a>
            <a href="#design" class="design pickscreen1 lightest-color">Design</a>
        </div>
    </section>
    <section class="developsection lightdark-background lightest-color" id="develop">
        <p class="lightest-color normaltitle">Develop</p>
        <a href="projects/1IMD/BeachPuppies/game.html" class="lightest-color">Beach Puppies (game) - 1st year XD</a>
        <a href="projects/1IMD/clubdefender/portrait.html" class="lightest-color">Cub Defender (game) - 1st year XD</a>
        <a href="https://copoll.live" class="lightest-color">Copoll - 2nd year XD</a>
        <!-- <a href="projects/2IMD/vrballoons/vr/dist/index.html">vr game - 2nd year XD</a> thisones broken because azure cors problem -->
    </section>
    <section class="djsection dark-background lightest-color" id="dj">
        <p class="lightest-color normaltitle">DJ</p>
        <a href="https://www.zwabber.be" class="lightest-color">Go to zwabber.be</a>
    </section>
    <section class="designsection lightdark-background lightest-color" id="design">
        <p class="lightest-color normaltitle">Design</p>
        <a href="projects/1IMD/doodle/index.html" class="lightest-color">Avicii google doodle - 1st year XD</a>
        <a href="https://portfolionew.blob.core.windows.net/video/shampoo.mp4?sp=r&st=2023-09-30T19:53:04Z&se=2027-08-03T03:53:04Z&sv=2022-11-02&sr=c&sig=b4BTmho%2FXbX6UNIkopLG5YWAoohui%2FhMWQr%2FFgEVEHE%3D" class="lightest-color">Animated shampoo logo - 2nd year XD</a>
        <a href="projects/2IMD/deathproof/death-proof.html" class="lightest-color">Animated deathproof poster in css and html - 2nd year XD</a>
        <a href="projects/2IMD/night/index.html" class="lightest-color">Night animated logo - 2nd year XD</a>
        <a href="projects/2IMD/zengarden/index.html" class="lightest-color">CSS Zengarden (theme: dance) - 2nd year XD</a>
    </section>
    <section class="contactsection dark-background lightest-color" id="Contact">
        <p class="lightest-color normaltitle">Contact</p>
        <a href="mailto:yorick.devleeschouwer@gmail.com" class="lightest-color">yorick.devleeschouwer@gmail.com</a>
        <a href="tel:+32 475 71 61 86" class="lightest-color">+32 475 71 61 86</a>
        <div id="socials">
            <a href="https://soundcloud.com/zwabbermusic" class="lightest-color">Soundcloud</a>
            <a href="https://www.instagram.com/zwabber_dnb/" class="lightest-color">Instagram</a>
            <a href="https://www.linkedin.com/in/yorickdv" class="lightest-color">LinkedIn</a>
        </div>
    </section>
</body>
<script>
    var url = "http://colormind.io/api/";
    var data = {
        model: "default"
    }

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if (http.readyState == 4 && http.status == 200) {
            var palette = JSON.parse(http.responseText).result;
            var dark = palette[0];
            var lightdark = palette[1];
            var maincolor = palette[2];
            var light = palette[3];
            var lightest = palette[4];

            //backgroundcolors
            assignBackgroundColorToElement(".dark-background", dark); // Assign color to element with id "element-1"
            assignBackgroundColorToElement(".lightdark-background", lightdark); // Assign color to element with id "element-1"
            assignBackgroundColorToElement(".maincolor-background", maincolor); // Assign color to element with id "element-1"
            assignBackgroundColorToElement(".light-background", light); // Assign color to element with id "element-1"
            assignBackgroundColorToElement(".lightest-background", lightest); // Assign color to element with id "element-1"
            //colors
            assignColorToElement(".dark-color", dark); // Assign color to element with id "element-1"
            assignColorToElement(".lightdark-color", lightdark); // Assign color to element with id "element-1"
            assignColorToElement(".maincolor-color", maincolor); // Assign color to element with id "element-1"
            assignColorToElement(".light-color", light); // Assign color to element with id "element-1"
            assignColorToElement(".lightest-color", lightest); // Assign color to element with id "element-1"
            //set color names
            document.getElementById("dark").innerHTML = "rgb(" + dark + ")";
            document.getElementById("lightdark").innerHTML = "rgb(" + lightdark + ")";
            document.getElementById("maincolor").innerHTML = "rgb(" + maincolor + ")";
            document.getElementById("light").innerHTML = "rgb(" + light + ")";
            document.getElementById("lightest").innerHTML = "rgb(" + lightest + ")";
        }
    }

    http.open("POST", url, true);
    http.send(JSON.stringify(data));

    function assignBackgroundColorToElement(elementclass, color) {
        var element = document.querySelectorAll(elementclass);
        for (var i = 0; i < element.length; i++) {
            element[i].style.backgroundColor = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        }
    }

    function assignColorToElement(elementclass, color) {
        var element = document.querySelectorAll(elementclass);
        for (var i = 0; i < element.length; i++) {
            element[i].style.color = 'rgb(' + color[0] + ',' + color[1] + ',' + color[2] + ')';
        }
    }
</script>

</html>