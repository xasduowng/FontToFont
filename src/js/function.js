function handleDeleteMark(text) {
    text = text.replace(/a|ă|â|á|à|ả|ã|ạ|ắ|ằ|ẳ|ẵ|ặ|ấ|ầ|ẩ|ẫ|ậ/gi, "a");
    text = text.replace(/o|ơ|ô|ó|ò|ỏ|õ|ọ|ớ|ờ|ở|ỡ|ợ|ố|ồ|ổ|ỗ|ộ/gi, "o");
    text = text.replace(/e|ê|é|è|ẻ|ẽ|ẹ|ế|ề|ể|ễ|ệ/gi, "e");
    text = text.replace(/u|ư|ú|ù|ủ|ũ|ụ|ứ|ừ|ử|ữ|ự/gi, "u");
    text = text.replace(/i|í|ỉ|ì|ĩ|ị/gi, "i");
    text = text.replace(/ỳ|ý|ỵ|ỷ|ỹ/gi, "y");
    text = text.replace(/đ/gi, "d");  
    return text;
};
async function handleCopyValue(eleText, btn) {
    try {
        if (eleText.value != "") {
            btn.onclick = () => {
                navigator.clipboard.writeText(eleText.value);
                btn.innerText = "Copied!";
            }
        } else {
            btn.style = "display: none";
        }
    } catch (error) {
        console.log("Không copy được!")
    }
};
function handlePasteValue(eleText, btn) {
    btn.onclick = () => {
        navigator.clipboard.readText()
        .then((clipText) => {
            eleText.value = clipText;
            text = clipText;
        })
    };
}

export {handleDeleteMark, handleCopyValue, handlePasteValue}