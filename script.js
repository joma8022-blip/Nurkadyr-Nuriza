console.log("KADRY SCRIPT WORK");


// ==============================
// PRELOADER
// ==============================

window.addEventListener("load",()=>{

const loader=document.querySelector(".preloader");

if(loader){

setTimeout(()=>{

loader.style.display="none";

},1800);

}

});




// ==============================
// SCROLL ANIMATION
// ==============================


const animatedElements = document.querySelectorAll(
".section, .story-item, .gallery-grid img, .review-card"
);


const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{
threshold:0.15
});


animatedElements.forEach(el=>{

observer.observe(el);

});




// ==============================
// GALLERY LIGHTBOX
// ==============================


const images=document.querySelectorAll(
".gallery-grid img"
);


images.forEach(img=>{


img.addEventListener("click",()=>{


let box=document.createElement("div");


box.className="lightbox";


box.innerHTML=`

<div class="lightbox-close">
×
</div>

<img src="${img.src}">

`;


document.body.appendChild(box);



setTimeout(()=>{

box.classList.add("active");

},50);



box.onclick=()=>{

box.remove();

};



});


});




// ==============================
// WHATSAPP
// ==============================


const whatsappNumber="79361246606";


const whatsappText=
"Здравствуйте! Хочу узнать стоимость съёмки KADRY MOSCOW";


document.querySelectorAll(
".contact-buttons a"
)
.forEach(button=>{


if(button.innerText.includes("WHATSAPP")){


button.href=
"https://wa.me/"
+whatsappNumber
+"?text="
+encodeURIComponent(whatsappText);


button.target="_blank";


}


});




// ==============================
// FOOTER YEAR
// ==============================


const footer=document.querySelector("footer");


if(footer){

footer.innerHTML +=`

<p style="margin-top:20px">
© ${new Date().getFullYear()} KADRY MOSCOW
</p>

`;

}




// ==============================
// SEND REVIEW TO TELEGRAM SERVER
// ==============================


async function sendReview(){


let name =
document.getElementById("clientName").value;


let message =
document.getElementById("reviewText").value;


let stars =
document.getElementById("reviewStars").value;



if(!name || !message){

alert("Заполните все поля");

return;

}



try{


let response = await fetch(
"http://localhost:3001/review",
{

method:"POST",

headers:{

"Content-Type":"application/json"

},


body:JSON.stringify({

name:name,

message:message,

stars:stars

})


});


if(response.ok){


document.getElementById(
"reviewResult"
).innerHTML=
"Спасибо ❤️ Ваш отзыв отправлен";


document.getElementById(
"clientName"
).value="";


document.getElementById(
"reviewText"
).value="";


}


else{


alert("Ошибка отправки");


}



}

catch(error){


console.log(error);


alert(
"Сервер отзывов не запущен"
);


}



}