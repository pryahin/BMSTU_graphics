let canvas = document.getElementById('lab01');
const ctx = canvas.getContext('2d');

ctx.fillStyle = "#ff0000";
ctx.fillRect(10, 10, 1000, 1000);
ctx.fillStyle = "#000000";

canvas.addEventListener('click', function(event){
    ctx.fillStyle = "#000000";

    ctx.fillRect(event.offsetX,event.offsetY,10,10);
});

function saveTextAsFile()
{
    var textToWrite = document.getElementById("inputTextToSave").value;
    var textFileAsBlob = new Blob([textToWrite], {type:'text/plain'});

    // let x=0, y=0;
    // while (x<100 && y<100)
    // {
    //     ctx.fillRect(x+10, y+10, 10*(1+x), 10*(1+y));
    //     x++;
    //     if (x > 10) {
    //         x = 0;
    //         y++;
    //     }
    // }
    var fileNameToSaveAs ="123";// document.getElementById("inputFileNameToSaveAs").value;

    var downloadLink = document.createElement("a");
    downloadLink.download = fileNameToSaveAs;
    downloadLink.innerHTML = "Download File";
    if (window.webkitURL != null)
    {
        // Chrome allows the link to be clicked
        // without actually adding it to the DOM.
        downloadLink.href = window.webkitURL.createObjectURL(textFileAsBlob);
    }
    else
    {
        // Firefox requires the link to be added to the DOM
        // before it can be clicked.
        downloadLink.href = window.URL.createObjectURL(textFileAsBlob);
        downloadLink.onclick = destroyClickedElement;
        downloadLink.style.display = "none";
        document.body.appendChild(downloadLink);
    }

    downloadLink.click();
}

function destroyClickedElement(event)
{
    document.body.removeChild(event.target);
}


document.getElementById('loadbutton').addEventListener('click', function() {
    var fileToLoad = document.getElementById("fileToLoad").files[0];

    var fileReader = new FileReader();

    ctx.fillStyle = "#ff0000";
    ctx.fillRect(10, 10, 1000, 1000);
    ctx.fillStyle = "#000000";

    fileReader.onload = function(fileLoadedEvent)
    {
        let x=0,y=0;
        var textFromFileLoaded = fileLoadedEvent.target.result;
        for (char in textFromFileLoaded){
            if (textFromFileLoaded[char]=='1') {
                ctx.fillRect(10*(1+x), 10*(y+1), 10, 10);
            }
            else if (textFromFileLoaded[char]=="\n"){
                x=0;
                y++;
            }

            x++;
        }
        document.getElementById("inputTextToSave").value = textFromFileLoaded;

    };
    fileReader.readAsText(fileToLoad, "UTF-8");
});