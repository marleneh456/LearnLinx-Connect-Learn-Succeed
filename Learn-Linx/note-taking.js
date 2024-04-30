//note-taking

// This where to load Notepad 

document.addEventListener('DOMContentLoaded', function () {
    var quill = new Quill('#editor-container', {
        theme: 'snow'
    });

    window.downloadNote = function() {
        var text = quill.getText();
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', "MyNotes.txt");

        element.style.display = 'none';
        document.body.appendChild(element);

        element.click();

        document.body.removeChild(element);
    }
});
