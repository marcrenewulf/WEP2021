<html>
    <head>
        <title>WEP 2021</title>
        <script src="./lib/phaser.js"></script>
        <script src="./src/preload.js"></script>
        <script src="./src/character.js"></script>
        <script src="./src/scene1.js"></script>
        <script src="./src/main.js"></script>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous">
        <link rel="stylesheet" href="styles/main.css" />
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
        <script src="src/multiplayer.js"></script>
    </head>
    <body>
        <header>
            <nav>
                <div class="clearfix">
                    <div class="float-start">LOGO</div>
                    <div><button type="button" class="btn btn-primary float-end">SignIn</button></div>
                </div>
            </nav>
            <h1>WEP 2021</h1>
        </header>
        <main>
            <div id="canvasDiv"></div>
            <div style="height:100px; width:300px; background-color:green;" id="chat">
                
            </div>
            <textarea id="message"></textarea>
            <button id="button">senden</button>

        </main>
        <footer>
            Copyright Schulte Wulf Nielsen
        </footer>
    </body>
</html>