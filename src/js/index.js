import {handleDeleteMark, handleCopyValue, handlePasteValue} from "./function.js"

const z = document.querySelector.bind(document);
const zz = document.querySelectorAll.bind(document);
const arrFont= {
    arrFontFamily : [
        {id: 0, font:"Segoe UI"}, {id: 1,font: "Courier New"}, {id: 2,font: "Arial Narrow"}, 
        {id: 3,font: "Gill Sans"}, {id: 4,font:"Lucida Sans"}, {id: 5,font:"Times New Roman"}, 
        {id: 6,font:"Trebuchet MS"}, {id: 7,font:"Arial"},{id: 8,font:"Cambria"}
    ],
    arrFontSize : [
        {id: 0, font: 16}, {id: 1,font: 13}, {id: 2,font: 14}, {id: 3,font: 18}, {id: 4,font: 20}, {id: 5,font: 24}, {id: 6,font: 28}
    ]
};
function renderListFont() {
    const fontText = zz(".form_font-text select");
    fontText[0].innerHTML = (arrFont.arrFontFamily).map(renderEle).join("");
    fontText[1].innerHTML = (arrFont.arrFontSize).map(renderEle).join("");
    function renderEle (item) {
        let {font, id} = item;
        return (`
            <option value= ${id}>${font}</option>   
        `)
    }
} renderListFont();

const selectElement = zz("select");
const textarea = zz("textarea");
const listStatus = [{mark: 0},{transform: 0}, {dash: 0}, {indexSize: 0}, {indexFamily: 0}]
selectElement[0].onclick = () => { listStatus[4].indexFamily = selectElement[0].value}
selectElement[1].onclick = () => { listStatus[3].indexSize = selectElement[1].value}
selectElement[2].onclick = () => { listStatus[1].transform = selectElement[2].value}

const btnElement = zz(".nav-form_mark li");
btnElement[0].onclick = () => {
    btnElement[0].classList.toggle("choose");
    if (btnElement[0].classList.contains("choose")) {
        listStatus[0].mark = 1;
    } else {listStatus[0].mark = 0}
}
btnElement[1].onclick = () => {
    btnElement[1].classList.toggle("choose");
    if (btnElement[1].classList.contains("choose")) {
        listStatus[2].mark = 1;
    } else {listStatus[2].mark = 0}
}
/*Ham dung de xoa dau cau */
const navBtn = z (".nav-form_btn");
const btnCopy = z(".box-edit_copy");
const btnPaste = z(".box-edit_paste");
navBtn.onclick = () => {handleArrFont()};
// Dan noi dung trong bang nho tam------------------------------------------
const boxPaste = zz(".box-edit > div")[0];
boxPaste.onclick = () => {
    btnCopy.style = "display:block";
    btnCopy.innerText = "Copy";
    // btnPaste.innerText = "Covert";
    handleArrFont(); 
}
    handlePasteValue(textarea[0], btnPaste);
textarea[0].oninput = () => {
    btnCopy.style = "display:block";
    btnCopy.innerText = "Copy";
    handleCopyValue(textarea[1], btnCopy); handleArrFont();  
};
function handleArrFont() {
    let mark = listStatus[0].mark;
    let dash = listStatus[2].mark;
    let transform = listStatus[1].transform;
    let size = arrFont.arrFontSize[listStatus[3].indexSize].font;
    let family = arrFont.arrFontFamily[listStatus[4].indexFamily].font;
        //------------------------//
    handleTextFont(size, family);
    textarea[1].value = handleTextDisplay( textarea[0].value, mark , transform, dash);
};
/* 
    - Có dấu:                           mark = 0
    - Không dấu:                        mark = 1;
        + Du nguyen dinh dang:              transform = 0, dash = 0;
        + Dữ nguyên định dạng có gạch       transform = 0, dash = 1;             
        + Viết thường:                      transform = 1, dash = 0; 
        + Viết thường có dấu gạch:          transform = 1, dash = 1;
        + Viết hoa chữ cái đầu:             transform = 1, dash = 0;
        + Viết hoa chữ cái đầu có gạch :    transform = 1, dash = 1;
        + Viết in hoa:                      transform = 2, dash = 0;
        + Viết in hoa có gạch:              transform = 2, dash = 1;
*/
function handleTextDisplay( text, mark , transform, dash) {
    if (mark == 0) {
        text = insertFont(text, transform, dash);
    } else {
        text = handleDeleteMark(text);
        text = insertFont(text, transform, dash);
    }
    //----------------------------------------------------------------------//
    function insertFont(text, transform, dash) {
        // transform = 0 du nguyen dinh dang
        // transform = 1 viết thường | transform = 2 viêt hoa chu cai dau | transform = 3 viet in hoa
        if (transform == 0) {
            text = text;
        } else if (transform == 1) {
            text = text.toLowerCase();
        } else if (transform == 2) {
            let arrtext = text.toLowerCase().split(" ");
            let capitalizeStr = arrtext.map((val) => {
                return val.charAt(0).toUpperCase() + val.slice(1)
            })
            text = capitalizeStr.toString().replace(/,/gi, " ");
        } else {text = text.toUpperCase()};
        // dash = 0 khong gach | dash = 1 co gach-----------------------------------
        if (dash == 1) {
            text = text.replace(/ /gi, "-");  
        }
        return text;
    };
    
        // Dung de chuyen doi sang viet hoa chu cai dau
    return text;
}
function handleTextFont(size, family) {
    Object.assign(textarea[1].style, {
        fontFamily: family,
        fontSize: size + "px"
    })
}


