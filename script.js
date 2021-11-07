//selecting all required elements
const dropArea = document.querySelector(".drag-area"),
dragText = dropArea.querySelector("header"),
button = dropArea.querySelector("button"),
input = dropArea.querySelector("input");

let file; // this is a global variable and we'll use it inside multiple functions

button.onclick=()=>{
    input.click();
}
input.addEventListener("change", function(){
    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = this.files[0];
    dropArea.classList.add("active");
    showFile(); //calling func
});

//If user Drag File Over DreaArea
dropArea.addEventListener("dragover", (event)=>{
    event.preventDefault();
    //console.log("File is over DragArea");
    dropArea.classList.add("active");
    dragText.textContent = "Release to Upload File";
});

//If user leave dragged File from DragArea
dropArea.addEventListener("dragleave", ()=>{
    //console.log("File is outside DragArea");
    dropArea.classList.remove("active");
    dragText.textContent = "Drag & Drop to Upload File";
});

//If user drop File on DropArea
dropArea.addEventListener("drop", (event)=>{
    event.preventDefault();
    //console.log("File is dropped on DropArea");

    //getting user select file and [0] this means if user select multiple files then we'll select only the first one
    file = event.dataTransfer.files[0];
    showFile(); //calling func
    

});

function showFile(){
    let fileType = file.type;
    console.log(fileType);

    let validExtensions = ["image/jpeg","image/jpg","image/png"]; //adding some valid image extension in array
    if(validExtensions.includes(fileType)){ 
        //console.log("파일타입이 맞습니다")
        let fileReader = new FileReader();
        fileReader.onload = ()=> {
            let fileURL = fileReader.result; //passing user file source in file URL variable

            let imgTag= `<img src="${fileURL}" alt="">`; //creating an img tag and passing user selectedc file source inside src attribute
            dropArea.innerHTML = imgTag; // adding that created img tag inside dropArea content
        }
        fileReader.readAsDataURL(file);
    }else {
        alert("파일형식을 한번더 확인해주세요");
        dropArea.classList.remove("active");
        dragText.textContent = "Drag & Drop to Upload File";
    }

}