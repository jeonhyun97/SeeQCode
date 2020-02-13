

function readTextFile(file) {
    let md;
    var rawFile = new XMLHttpRequest();
    rawFile.open("GET", file, false);
    rawFile.onreadystatechange = function () {
        if (rawFile.readyState === 4) {
            if (rawFile.status === 200 || rawFile.status == 0) {
                md = rawFile.responseText;
            }
        }
    };
    rawFile.send(null);
    return md;
}



function initManual() {
    let html = new showdown.Converter().makeHtml(readTextFile("../doc/manual.md"));
    document.getElementById("manualDiv").innerHTML = html;
}

initManual();