const see = document.querySelector(".see");
const mark = document.querySelector(".mark");
const overlay = document.querySelector(".overlay");

see.onclick = () => {
    overlay.classList.add("active");

    see.style.display = "none";
    mark.style.display = "block";
};

mark.onclick = () => {
    overlay.classList.remove("active");

    mark.style.display = "none";
    see.style.display = "block";
};
window.onload = function(){
    mark.style.display =' none';
}






document.querySelectorAll(".overlay .dropdown > a").forEach(item=>{

    item.addEventListener("click",(e)=>{

        e.preventDefault();

        item.parentElement.classList.toggle("open");

    });

});



// الواجهه
const texts = [

"يقدم د. عبد السلام محمد أحدث تقنيات علاج وتجميل الأسنان مع التركيز على راحة المريض وتحقيق أفضل النتائج الممكنة.",

"يوفر المركز خدمات متكاملة تشمل زراعة الأسنان وتقويم الأسنان وابتسامة هوليوود وعلاج الجذور بأحدث الأجهزة الطبية."

];

const element = document.getElementById("typing-text");

let textIndex = 0;
let charIndex = 0;
let deleting = false;

function typeEffect(){

    const currentText = texts[textIndex];

    if(!deleting){

        element.textContent =
        currentText.substring(0,charIndex++);

        if(charIndex > currentText.length){

            deleting = true;

            setTimeout(typeEffect,2500);

            return;
        }

    }else{

        element.textContent =
        currentText.substring(0,charIndex--);

        if(charIndex < 0){

            deleting = false;

            textIndex =
            (textIndex + 1) % texts.length;
        }

    }

    setTimeout(typeEffect,
    deleting ? 20 : 40);
}

typeEffect();

// vedio
const cards = document.querySelectorAll(".service-card");

const observer = new IntersectionObserver(entries=>{
    entries.forEach(entry=>{
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
},{
    threshold:0.2
});

cards.forEach(card=>{
    observer.observe(card);
});




// عن المركز
const aboutSection =
document.querySelector(".about-center");

const typingTitle =
document.querySelector(".typing-title");

const typingParagraph =
document.querySelector(".typing-paragraph");

const titleText =
"مركز عبد السلام لطب وتجميل الأسنان";

const paragraphText =
"نقدم خدمات طب وتجميل الأسنان وفق أحدث المعايير الطبية والتقنيات الحديثة، مع الاهتمام بتوفير تجربة علاجية مريحة وآمنة لجميع المرضى، باستخدام أحدث الأجهزة الطبية وفريق متخصص في مختلف مجالات طب الأسنان.";

let aboutStarted = false;

function typeText(element,text,speed){

    let i = 0;

    element.textContent = "";

    const typing = setInterval(()=>{

        element.textContent += text.charAt(i);

        i++;

        if(i >= text.length){

            clearInterval(typing);

        }

    },speed);

}

const aboutObserver =
new IntersectionObserver((entries)=>{

    if(entries[0].isIntersecting && !aboutStarted){

        aboutStarted = true;

        typeText(
            typingTitle,
            titleText,
            50
        );

        setTimeout(()=>{

            typeText(
                typingParagraph,
                paragraphText,
                15
            );

        },2000);

    }

},{
    threshold:.3
});

aboutObserver.observe(aboutSection);






const counters =
document.querySelectorAll(".counter");

let counterStarted = false;

const counterObserver =
new IntersectionObserver((entries)=>{

    if(entries[0].isIntersecting && !counterStarted){

        counterStarted = true;

        counters.forEach(counter=>{

            const target =
            +counter.dataset.target;

            let current = 0;

            const increment =
            Math.ceil(target / 100);

            function updateCounter(){

                current += increment;

                if(current >= target){

                    counter.textContent =
                    target + "+";

                    return;
                }

                counter.textContent =
                current;

                requestAnimationFrame(
                    updateCounter
                );

            }

            updateCounter();

        });

    }

},{
    threshold:.3
});

counterObserver.observe(
document.querySelector(".about-stats")
);
// review
const REV = document.querySelectorAll(".review-slide");
const REVDOTS = document.querySelector(".review-dots");

let RI = 0;

// create dots
REV.forEach((_, i) => {

    const d = document.createElement("span");
    d.classList.add("dot");

    if(i === 0) d.classList.add("active");

    d.addEventListener("click", () => {
        RI = i;
        showReview(RI);
    });

    REVDOTS.appendChild(d);
});

const dots = document.querySelectorAll(".review-dots .dot");

function showReview(i){

    REV.forEach(s => s.classList.remove("active"));
    dots.forEach(d => d.classList.remove("active"));

    REV[i].classList.add("active");
    dots[i].classList.add("active");
}

setInterval(() => {
    RI = (RI + 1) % REV.length;
    showReview(RI);
}, 5000);
// doctor
const doctorSlides = document.querySelectorAll(".doctor-slide");
const doctorDotsContainer = document.querySelector(".doctor-dots");

let doctorCurrent = 0;

// إنشاء النقط
doctorSlides.forEach((_, index) => {

    const dot = document.createElement("span");

    dot.classList.add("doctor-dot");

    if(index === 0){
        dot.classList.add("active");
    }

    dot.addEventListener("click", () => {
        doctorCurrent = index;
        updateDoctors();
    });

    doctorDotsContainer.appendChild(dot);

});

const doctorDots = document.querySelectorAll(".doctor-dot");

function updateDoctors(){

    doctorSlides.forEach(slide => {

        slide.classList.remove(
            "active",
            "prev",
            "next"
        );

    });

    doctorDots.forEach(dot => {
        dot.classList.remove("active");
    });

    const prev =
    (doctorCurrent - 1 + doctorSlides.length)
    % doctorSlides.length;

    const next =
    (doctorCurrent + 1)
    % doctorSlides.length;

    doctorSlides[doctorCurrent].classList.add("active");
    doctorSlides[prev].classList.add("prev");
    doctorSlides[next].classList.add("next");

    doctorDots[doctorCurrent].classList.add("active");

}

updateDoctors();

// Auto Slide

let doctorAuto = setInterval(() => {

    doctorCurrent++;

    if(doctorCurrent >= doctorSlides.length){
        doctorCurrent = 0;
    }

    updateDoctors();

}, 4000);

// حجز

const openBooking = document.getElementById("openBooking");
const modal = document.getElementById("bookingModal");
const closeBooking = document.getElementById("closeBooking");

// فتح المودال
openBooking.addEventListener("click", (e) => {
  e.preventDefault();
  modal.classList.add("active");
});

// قفل بالمفتاح X
closeBooking.addEventListener("click", () => {
  modal.classList.remove("active");
});

// قفل لما تدوس برا الكارت
modal.addEventListener("click", (e) => {
  if(e.target === modal){
    modal.classList.remove("active");
  }
});



// submit
document.querySelector(".booking-form").addEventListener("submit", (e)=>{
  e.preventDefault();
  alert("تم الحجز بنجاح ✅");
  modal.classList.remove("active");
});
// موعد
const scheduleModal = document.getElementById("scheduleModal");
const openSchedule = document.getElementById("selectedTime");
const closeSchedule = document.getElementById("closeSchedule");

// open
openSchedule.addEventListener("click", (e) => {
  e.preventDefault();
  scheduleModal.classList.add("active");
});

// close
closeSchedule.addEventListener("click", () => {
  scheduleModal.classList.remove("active");
});

// close when click outside card
scheduleModal.addEventListener("click", (e) => {
  if(e.target === scheduleModal){
    scheduleModal.classList.remove("active");
  }
});
// price
const priceModal = document.getElementById("priceModal");
const closePrice = document.getElementById("closePrice");
const openPrice = document.getElementById("openPrice");

const priceItems = document.querySelectorAll(".price-item");
const priceDetails = document.getElementById("priceDetails");
const priceCategories = document.getElementById("priceCategories");
const priceContent = document.getElementById("priceContent");
const backBtn = document.getElementById("backToCategories");

// OPEN
if(openPrice){
  openPrice.addEventListener("click", (e)=>{
    e.preventDefault();
    priceModal.classList.add("active");
  });
}

// CLOSE
if(closePrice){
  closePrice.addEventListener("click", ()=>{
    priceModal.classList.remove("active");
  });
}

// BACK
if(backBtn){
  backBtn.addEventListener("click", ()=>{
    priceCategories.style.display = "grid";
    priceDetails.classList.remove("active");
    priceContent.innerHTML = "";
  });
}

// ITEMS
priceItems.forEach(item=>{
  item.addEventListener("click", ()=>{

    const type = item.dataset.type;

    priceCategories.style.display = "none";
    priceDetails.classList.add("active");

    let html = "";

    if(type === "filling"){
      html = `
        <div class="price-box">حشو عادي — من 300 إلى 600 جنيه</div>
        <div class="price-box">حشو عصب — من 800 إلى 1500 جنيه</div>
      `;
    }

    if(type === "root"){
      html = `
        <div class="price-box">علاج عصب ضرس — من 1200 إلى 2500 جنيه</div>
        <div class="price-box">علاج عصب أمامي — من 900 إلى 1800 جنيه</div>
      `;
    }

    if(type === "implant"){
      html = `
        <div class="price-box">زراعة ألماني — من 12000 إلى 18000 جنيه</div>
        <div class="price-box">زراعة كورى — من 8000 إلى 12000 جنيه</div>
        <div class="price-box">زراعة سويسري — من 15000 إلى 22000 جنيه</div>
      `;
    }

    if(type === "whitening"){
      html = `
        <div class="price-box">تبييض ليزر — من 1500 إلى 3000 جنيه</div>
        <div class="price-box">تبييض منزلي — من 800 إلى 1500 جنيه</div>
      `;
    }

    priceContent.innerHTML = html;
  });
});
// الفروع
const openWa = document.getElementById("openWhatsApp");
const waModal = document.getElementById("waModal");
const closeWa = document.getElementById("closeWa");

openWa.addEventListener("click", ()=>{
  waModal.classList.add("active");
});

closeWa.addEventListener("click", ()=>{
  waModal.classList.remove("active");
});

// غلق لما تضغط بره
waModal.addEventListener("click", (e)=>{
  if(e.target === waModal){
    waModal.classList.remove("active");
  }
});














const BAA = document.querySelectorAll(".baa-slide");
const BAADOTS = document.querySelectorAll(".baa-dot");

let BA = 0;

function showBA(i){

    BAA.forEach(s => s.classList.remove("active"));
    BAADOTS.forEach(d => d.classList.remove("active"));

    BAA[i].classList.add("active");
    BAADOTS[i].classList.add("active");
}

setInterval(() => {
    BA = (BA + 1) % BAA.length;
    showBA(BA);
}, 5000);

// dots
BAADOTS.forEach((dot, i) => {
    dot.addEventListener("click", () => {
        BA = i;
        showBA(BA);
    });
});







const revealElements = document.querySelectorAll(".reveal");

/* Reveal Observer (ممنوع يتكرر في أي مكان تاني بنفس الاسم) */
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, {
    threshold: 0.15
});

/* Observe all elements */
revealElements.forEach(el => {
    revealObserver.observe(el);
});






const faqItems = document.querySelectorAll(".faq-item");

faqItems.forEach(item => {
    const question = item.querySelector(".faq-question");

    question.addEventListener("click", () => {

        faqItems.forEach(el => {
            if(el !== item){
                el.classList.remove("active");
            }
        });

        item.classList.toggle("active");
    });
});
const openBranches = document.getElementById("openBranches");
const branchesPopup = document.getElementById("branchesPopup");
const closeBranches = document.getElementById("closeBranches");

openBranches.addEventListener("click", (e) => {
    e.preventDefault();
    branchesPopup.classList.add("active");
});

closeBranches.addEventListener("click", () => {
    branchesPopup.classList.remove("active");
});

branchesPopup.addEventListener("click", (e) => {
    if (e.target === branchesPopup) {
        branchesPopup.classList.remove("active");
    }
});
