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
    
    // Access the $httpsStatus variable in your PHP code
    echo $httpsStatus;
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/normalize.css">
    <link rel="stylesheet" href="css/main.css">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script>
    <title>Yorick Devleeschouwer</title>
</head>
<body class="lightest-background">
    <div class="centeredflex">
        <div class="colorblocks">
            <div>
                <p class="toptext">Can't see any colors here?</p>
                <p class="bottext">Try changing the https to http!</p>
            </div>
            <div class="colorblock lightest-background"></div>
            <div class="colorblock light-background"></div>
            <div class="colorblock maincolor-background"></div>
            <div class="colorblock lightdark-background"></div>
            <div class="colorblock dark-background"></div>

            <p class="dark-color" id="dark"></p>
            <p class="dark-color" id="lightdark"></p>
            <p class="dark-color" id="maincolor"></p>
            <p class="dark-color" id="light"></p>
            <p class="dark-color" id="lightest"></p>
    
            <p class="dark-color">Lightest color</p>
            <p class="dark-color">Light color</p>
            <p class="dark-color">Main color</p>
            <p class="dark-color">Lightdark color</p>
            <p class="dark-color">Dark color</p>
        </div>
    </div>
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
    <section class="developsection lightdark-background light-color" id="develop">
        <a href="projects/1IMD/BeachPuppies/game.html" class="light-color">Beach Puppies (game) - 1st year IMD</a>
        <a href="projects/1IMD/clubdefender/portrait.html" class="light-color">Cub Defender (game) - 1st year IMD</a>
        <a href="https://copoll.live" class="light-color">Copoll</a>
        <!-- <a href="projects/2IMD/vrballoons/vr/dist/index.html">vr game - 2nd year IMD</a> thisones fucked because azure cors problem -->
    </section>
    <section class="djsection dark-background lightest-color" id="dj">
        <a href="https://www.zwabber.be" class="lightest-color">Go to zwabber.be</a>
    </section>
    <section class="designsection lightdark-background light-color" id="design">
        <a href="projects/1IMD/doodle/index.html" class="light-color">Avicii google doodle - 1st year IMD</a>
        <a href="https://yorickdv.blob.core.windows.net/portfolio-public/videos/shampoo.mp4" class="light-color">Animated shampoo logo - 2nd year IMD</a>
        <a href="projects/2IMD/deathproof/death-proof.html" class="light-color">Animated deathproof poster in css and html! - 2nd year IMD</a>
        <a href="projects/2IMD/night/index.html" class="light-color">Night animated logo - 2nd year IMD</a>
        <a href="projects/2IMD/zengarden/index.html" class="light-color">CSS Zengarden (theme: dance) - 2nd year IMD</a>
    </section>
</body>
<script>
    var url = "http://colormind.io/api/";
    var data = {
        model : "default"
    }

    var http = new XMLHttpRequest();

    http.onreadystatechange = function() {
        if(http.readyState == 4 && http.status == 200) {
            var palette = JSON.parse(http.responseText).result;

            var dark = palette[0];
            var lightdark = palette[1];
            var maincolor = palette[2];
            var light = palette[3];
            var lightest = palette[4];
            console.log(dark);
            

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


    // Send an AJAX request to the current page URL
    $.ajax({
      type: 'POST',
      url: window.location.href,
      data: { isHTTPS: window.location.protocol === "https:" },
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

</html>