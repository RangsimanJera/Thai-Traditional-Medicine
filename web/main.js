const menu = document.querySelector(".menu");
const nav_main = document.querySelector(".nav_main");
menu.onclick = function() {
    if(menu.classList.contains("active")) {
        closeMenu();     
    } else {
        menu.classList.add("active");
        nav_main.classList.add("active");  
    }
}
function closeMenu() {
    menu.classList.remove("active"); 
    nav_main.classList.remove("active");   
}
const header = document.querySelector(".header");
let tempHeader = 0;
const vocab = document.querySelector(".vocab");
const compound = document.querySelector(".compound");
const about = document.querySelector(".about");

function homepage() {
    vocab.classList.remove("active");
    compound.classList.remove("active");
    if(tempHeader !== 1) {
        header.classList.remove("active");
        tempHeader = 0;
    }
    else if(tempHeader === 1) {
        back.classList.add("active");
    }    
    closeMenu();
}
function prepareMedpage() {
    compound.classList.remove("active");
    vocab.classList.add("active");
    if(tempHeader === 0) {
        header.classList.add("active");
        tempHeader = 2;
    }
    else if(tempHeader === 1) {
        back.classList.remove("active");
    }
    closeMenu();
}
function compoundMedpage() {
    vocab.classList.remove("active");
    compound.classList.add("active");
    if(tempHeader === 0) {
        header.classList.add("active");
        tempHeader = 2;
    }
    else if(tempHeader === 1) {
        back.classList.remove("active");
    }
    closeMenu();
}
function aboutpage() {
    about.classList.add("active");
    closeMenu();
}
function aboutClose() {
    about.classList.remove("active");
}

const type = document.querySelector(".type");

function typeExpand() {
    type.style.width = "150px";
    type.style.alignItems = "unset";
    for(let i=1; i<14; i++) {
        type.children[i].style.display = "block";
    }
    type.firstElementChild.style.display = "none";
    for(let i=1; i<14; i++) {
        type.children[i].addEventListener("click", () => {
            type.style.width = "10%";
            type.style.alignItems = "center";
            for(let i=1; i<14; i++) {
                type.children[i].style.display = "none";
            }
            type.firstElementChild.style.display = "block";
        });
    }
}

let ready1 = "no";
let ready2 = "no";
const list = document.querySelector(".list");
const myList = document.querySelector(".myList");
const back = document.querySelector(".back");
const symtompsSec = document.querySelector(".symtomps");
const medicineSec = document.querySelector(".medicine");
const urlSymptoms = 'https://script.google.com/macros/s/AKfycbxj_k5m0Ha0wNQWjzMlCpQb4gPoI4Zz-rk_B5zTB4dGEP8F9Cadon0wpGSkGkD6VDUG/exec';
let symptoms = [];
let mySymptoms = [];
const spinner = document.querySelector(".spinner-box");

function backmain() {
    header.classList.remove("active");
    tempHeader = 0;
    back.classList.remove("active");
    content.classList.remove("active");
    showMedicineArr = [];
    medList.innerHTML = showMedicineArr;
    userSymptoms = [];
    list.innerHTML = [];
    myList.innerHTML = [];
    symtompsSec.classList.add("nactive");
    medicineSec.classList.add("nactive");
}

function select(select) {
    header.classList.add("active");
    tempHeader = 1;
    back.classList.add("active");
    symtompsSec.classList.remove("nactive");
    medicineSec.classList.remove("nactive");
    spinner.classList.add("active");
    fetch(urlSymptoms).then((res) => {
        return res.json();
    }) .then((data) => {
        symptoms = data.symtomps.filter((symptom) => {
            return symptom.name === select;
        });
        symptoms = symptoms[0].tag.filter((symptom) => {
            return symptom!== "";
        });
        mySymptoms = symptoms.map((symptom) => {
            return symptom = '<li class="myLiSelect">' + symptom + '</li>';         
        });
        symptoms = symptoms.map((symptom) => {
            return symptom = '<li class="liSelect">' + symptom + '<span>+</span></li>';         
        });
        accurateMed(select);
        medicineSelect(select);
    }) .then(() => {
        function checkReady() {
            if(ready1 === "yes" && ready2 === "yes") {
                spinner.classList.remove("active");
                showList(symptoms, mySymptoms);
            } else {
                window.setTimeout(checkReady, 100);
            }
        }
        checkReady();
    });
}

function userDisSelect(e) {
    let clickMyLi = e.target;
    clickMyLi.classList.remove("userSelect");

    const liSelect = document.querySelectorAll(".liSelect");

    let selectLi = clickMyLi.outerHTML;
    selectLi = selectLi.replace('<li class="myLiSelect">', '<li class="liSelect">');
    selectLi = selectLi.replace('</li>', '<span>+</span></li>');
    liSelect.forEach(li => {
        if(li.outerHTML === selectLi) {
            li.classList.add("userSelect");
        }
    });

    filterMed(clickMyLi.innerHTML, 0);
}

function userSelect(e) {
    let clickLi = e.target;
    if(clickLi.innerHTML === "+") {
        clickLi = e.target.parentElement;
    }
    console.log(clickLi)
    clickLi.classList.remove("userSelect");

    const myLiSelect = document.querySelectorAll(".myLiSelect");
    
    let selectLi = clickLi.innerHTML;
    selectLi = selectLi.replace('<span>+</span>', '');
    myLiSelect.forEach(myli => {
        if(myli.innerHTML === selectLi) {
            myli.classList.add("userSelect");
        }
        myli.addEventListener("click", userDisSelect)
    });

    filterMed(selectLi, 1);
}

function showList(symptom, mySymptom) {
    let myListSymptoms = mySymptom.join('');
    let listSymptoms = symptom.join('');
    list.innerHTML = listSymptoms;
    myList.innerHTML = myListSymptoms;
    
    const liSelect = document.querySelectorAll(".liSelect");

    liSelect.forEach(li => {
        li.classList.add("userSelect");
        li.addEventListener("click", userSelect)
    });
}

let userSymptoms = [];
let n = 0;

function filterMed(symptom, i) {
    if(i == 1) {
        userSymptoms[n] = symptom;
        n++;
    } else {
        userSymptoms = userSymptoms.filter((sym) => {
            return sym !== symptom;
        });
        n--;
    }
    console.log(userSymptoms);
    console.log(n);
    showMed();
}

const urlศีรษะ = 'https://script.google.com/macros/s/AKfycbzE_Nh_TCsUszSFu85FkMEyyhT3-T67vh8TeYW-i3dlmJN2Psj9YU7mL5V6u7-8D8xK/exec';
const urlหู = 'https://script.google.com/macros/s/AKfycbwBHfWreYX-7oz3r2WbwHrtPMVibpHm63E2Xue9xWOljFxIjyfrLXHm5t0v1hc9mwC7/exec';
const urlกล้ามเนื้อ = 'https://script.google.com/macros/s/AKfycbwWG014lEF0c1yBfSZ8VXIVyGv0nquTxharfRkaYOS2IYQXOZmJDtjhqfnS8PeIm13X/exec';
const urlภายใน = 'https://script.google.com/macros/s/AKfycbx8zEyHANfWmOSyIPhlBXsmCJsVSyxmVw63NmGTA077ZkC0uEw9o-VcAJYistDi3m_G/exec';
const urlผิวหนัง = 'https://script.google.com/macros/s/AKfycbzV67sdJgI8SvAmlYqaJcgbqTeo8G6f5XtxJXGN4SO-ndbq7qRX0M9xZPN6VHruLolx/exec';
const urlปาก = 'https://script.google.com/macros/s/AKfycbya0wEo0T7FTd-I3lna4wgW6L3Qcf2020nHg4yQnWkFMJSIsF4g1uXFgYrvYF-CsUFA/exec';
const urlจมูก = 'https://script.google.com/macros/s/AKfycbxqse5OIrK-wwdOxAdQHMY2Z5rG5TTGti4uH5EGvLlF1wCmOXBXvPYxxXG-5IzmwIQV/exec';
const urlลำคอ = 'https://script.google.com/macros/s/AKfycbwox1e8Fy2t5a0McZuzSBe791bLdrqD5_54TOF9ZmGGsIsVKk2owYAIN8fAxQBHGikn/exec';
const urlร่างกาย = 'https://script.google.com/macros/s/AKfycbz5lIqvCwL-TJGTwkmvXGpceP2VhS857GMG6lO5nsDMTOJlVpopCJOv_SWK_oGhj49S/exec';
const urlสตรี = 'https://script.google.com/macros/s/AKfycbxyZdlFlEm-bcyq7anEUmBvco7hyYocIPnBBzIwyyCBrwEreUc-U7APg3JHw08jRCYU/exec';
var url = ''; 
let medicineArray = [];

function accurateMed(select) {
    if(select === "ภายใน") {
        url = urlภายใน;
    } else if (select === "กล้ามเนื้อ") {
        url = urlกล้ามเนื้อ;
    } else if (select === "หู") {
        url = urlหู;
    } else if (select === "ศีรษะ") {
        url = urlศีรษะ;
    } else if (select === "ผิวหนัง") {
        url = urlผิวหนัง;
    } else if (select === "ปาก") {
        url = urlปาก;
    } else if (select === "จมูก") {
        url = urlจมูก;
    } else if (select === "ลำคอ") {
        url = urlลำคอ;
    } else if (select === "ร่างกาย") {
        url = urlร่างกาย;
    } else if (select === "สตรี") {
        url = urlสตรี;
    }
    for(let j=0; j<length; j++) {
        accurateCheck[j] = 0;
    }
    fetch(url).then((check) => {
        return check.json();
    }) .then((medData) => {
        ready1 = "yes";
        medicineArray = medData.medicine;
    });
}

let accurateCheck = [];
let medicineResArray = [];
let showMedicine = [];
let repeatMedicine = [];
let unrepeatMedicine = [];
let newShowMedicine = [];

function showMed() {
    for(let i=0; i<=n; i++) {
        medicineResArray = medicineArray.filter((value) => {
            for(let j=0; j<value.tag.length; j++) {
                if(value.tag[j] === userSymptoms[i]) {
                    return value;
                }
            }      
        });
        medicineResArray = medicineResArray.map((value) => {
            return value.name;
        });
        if(i === 0) {
            showMedicine = medicineResArray;
        } else {
            repeatMedicine = showMedicine.filter(value => medicineResArray.includes(value));
            unrepeatMedicine = showMedicine.filter(value => !medicineResArray.includes(value));
            newShowMedicine = medicineResArray.filter(value => !repeatMedicine.includes(value));
            showMedicine = repeatMedicine.concat(unrepeatMedicine, newShowMedicine);
        }
    }
    medicineList();
}

const medList = document.querySelector(".medList");
const urlMedicine = 'https://script.google.com/macros/s/AKfycbzxY6HXCW-NzLQmuIUhEYEI8mJq4J2h9awuyMUsq4FhVf2AJDigWmN1SeTZ-6dMlcXL/exec';
let medicine = [];
let preMedicine = [];
let showMedicineArr = [];

function medicineSelect(select) {
    fetch(urlMedicine).then((medRes) => {
        return medRes.json();
    }) .then((medData) => {
        medicine = medData.medicine.filter((med) => {
            return med.tag === select;
        });
        ready2 = "yes";
    });
}

function medicineList() {
    preMedicine = [];
    for(let i=0; i<showMedicine.length; i++) {
        for(let j=0; j<medicine.length; j++) {
            if(medicine[j].ชื่อยา === showMedicine[i]) {
                preMedicine.push(medicine[j]);
                break;
            }
        }
    }
    console.log(preMedicine)
    
    showMedicineArr = preMedicine.map((med) => {
        return med = '<li onclick="medicineNameSelect(\'' + med.ชื่อยา + '\')"><h3>' + med.ชื่อยา + '</h3><h5>' + text_truncate(med.สรรพคุณเต็ม) + '</h5></li>';   
    });
    showMedicineArr = showMedicineArr.join('');
    medList.innerHTML = showMedicineArr;
}

function text_truncate(str, length, ending) {
    if (length == null) {
      length = 70;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
  };

const content = document.querySelector(".content");
const close = document.querySelector(".close");
const contain = document.querySelector(".contain");
let medicineContent = [];

function medicineNameSelect(name) {
    content.classList.add("active");
    console.log(name)
    console.log(preMedicine)
    medicineContent = preMedicine.filter((med) => {
        return med.ชื่อยา === name;
    });
    console.log(medicineContent)
    console.log(medicineContent[0].ชื่อยา)
    close.innerHTML = '<h1>' + medicineContent[0].ชื่อยา +'</h1>' + '<div onclick="contentClose()">X</div>';
    contain.innerHTML = '<h3>สรรพคุณ</h3>' +
                        '<p>' + medicineContent[0].สรรพคุณเต็ม +'</p>' +
                        '<h3>สูตร</h3>' +
                        '<p>' + medicineContent[0].สูตร +'</p>' +
                        '<h3>รูปแบบยา</h3>' +
                        '<p>' + medicineContent[0].รูปแบบยา +'</p>' +
                        '<h3>วิธีปรุงยา</h3>' +
                        '<p>' + medicineContent[0].วิธีปรุงยา +'</p>' +
                        '<h3>ขนาดและวิธีใช้</h3>' +
                        '<p>' + medicineContent[0].ขนาดและวิธีใช้ +'</p>' +
                        '<h3>ข้อห้ามใช้</h3>' +
                        '<p>' + medicineContent[0].ข้อห้ามใช้ +'</p>' +
                        '<h3>ข้อควรระวัง</h3>' +
                        '<p>' + medicineContent[0].ข้อควรระวัง +'</p>' +
                        '<h3>อาการไม่พึงประสงค์</h3>' +
                        '<p>' + medicineContent[0].อาการไม่พึงประสงค์ +'</p>' +
                        '<h3>คำเตือน</h3>' +
                        '<p>' + medicineContent[0].คำเตือน +'</p>'+
                        '<h3>ข้อมูลเพิ่มเติม</h3>' +
                        '<p>' + medicineContent[0].ข้อมูลเพิ่มเติม +'</p>';
}

function contentClose() {
    content.classList.remove("active");
}

const navigation = document.querySelector(".navigation");
navigation.children[2].addEventListener("click", scrollLeft);
navigation.children[4].addEventListener("click", scrollRight);
const block = document.createElement

function scrollLeft() {
    const slide = document.querySelectorAll(".slide");
    for(const i of slide) {
        i.style.transition = "0.6s";
    }
    document.documentElement.style.setProperty('--vocabNavigationAfterOrder', "block");
    navigation.children[2].removeEventListener("click", scrollLeft);
    navigation.children[4].removeEventListener("click", scrollRight);
    navigation.removeChild(navigation.lastElementChild);
    navigation.firstElementChild.style.margin = "0 5px 0 135px";
    navigation.children[3].classList.remove("center");
    navigation.children[2].classList.add("center");
    setTimeout(() => {
        const element = navigation.children[3].cloneNode(true);
        navigation.prepend(element);
        for(const i of slide) {
            i.style.transition = "0s";
        }
        navigation.children[1].style.margin = "0 5px";
        navigation.children[2].addEventListener("click", scrollLeft);
        navigation.children[4].addEventListener("click", scrollRight);
    }, 600);
    setTimeout(() => {
        for(const i of slide) {
            i.style.transition = "0.6s";
        }
        document.documentElement.style.setProperty('--vocabNavigationAfterOrder', "none");
    }, 650);
}

function scrollRight() {
    const slide = document.querySelectorAll(".slide");
    for(const i of slide) {
        i.style.transition = "0.6s";
    }
    document.documentElement.style.setProperty('--vocabNavigationAfterOrder', "block");
    navigation.children[2].removeEventListener("click", scrollLeft);
    navigation.children[4].removeEventListener("click", scrollRight);
    navigation.removeChild(navigation.firstElementChild);
    navigation.lastElementChild.style.margin = "0 135px 0 5px";
    navigation.children[2].classList.remove("center");
    navigation.children[3].classList.add("center");
    setTimeout(() => {
        const element = navigation.children[2].cloneNode(true);
        for(const i of slide) {
            i.style.transition = "0s";
        }
        navigation.append(element);
        navigation.children[5].style.margin = "0 5px";
        navigation.children[2].addEventListener("click", scrollLeft);
        navigation.children[4].addEventListener("click", scrollRight);
    }, 600);
    setTimeout(() => {
        for(const i of slide) {
            i.style.transition = "0.6s";
        }
        document.documentElement.style.setProperty('--vocabNavigationAfterOrder', "none");
    }, 650);
}