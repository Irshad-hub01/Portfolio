/*========================= typing animation==================*/
var typed = new Typed(".typing", {
    strings: ["Biotechnologist", "pharmacist", "AI ML Engineer", "Bioinformatics", "Drug Discoverer","Clinical Researcher","Researcher"],
    typeSpeed: 100,
    BackSpeed: 60,
    loop: true
})
/*========================= Aside ==================*/
const nav = document.querySelector(".nav"),
    navList = nav.querySelectorAll("li"),
    totalNavList = navList.length;
allSection = document.querySelectorAll(".section"),
    totalSection = allSection.length;
for (let i = 0; i < totalNavList; i++) {
    const a = navList[i].querySelector("a");
    a.addEventListener("click", function() {
        removeBackSection();
        for (let j = 0; j < totalNavList; j++) {
            if (navList[j].querySelector("a").classList.contains("active")) {
                addBackSection(j);
                //allSection[j].classList.add("back-section");
            }
            navList[j].querySelector("a").classList.remove("active");
        }
        this.classList.add("active")
        showSection(this);
        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }
    })
}

function removeBackSection() {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("back-section");
    }
}

function addBackSection(num) {
    allSection[num].classList.add("back-section");
}

function showSection(element) {
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split("#")[1];
    document.querySelector("#" + target).classList.add("active")
}

function updateNav(element) {
    for (let i = 0; i < totalNavList; i++) {
        navList[i].querySelector("a").classList.remove("active");
        const target = element.getAttribute("href").split("#")[1];
        if (target === navList[i].querySelector("a").getAttribute("href").split("#")[1]) {
            navList[i].querySelector("a").classList.add("active");
        }
    }
}

function submitForm(event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (name === '') {
        document.getElementById('nameError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('nameError').style.display = 'none';
    }

    if (email === '') {
        document.getElementById('emailError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('emailError').style.display = 'none';
    }

    if (subject === '') {
        document.getElementById('subjectError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('subjectError').style.display = 'none';
    }

    if (message === '') {
        document.getElementById('messageError').style.display = 'block';
        isValid = false;
    } else {
        document.getElementById('messageError').style.display = 'none';
    }

    if (isValid) {
        // Construct the URL to submit the form data to Google Forms
        const formURL = 'https://docs.google.com/forms/u/0/d/e/1FAIpQLSc21uAQ79QWEMCDEAnu7TrwhTDmuk-pVg3RP9Daca1k1yokEw/formResponse';
        const params = new URLSearchParams();
        params.append('entry.1584840337', name);
        params.append('entry.2006036215', email);
        params.append('entry.1469822471', subject);
        params.append('entry.611448767', message);

        // Submit the form data
        fetch(formURL, {
            method: 'POST',
            body: params,
            mode: 'no-cors'
        }).then(() => {
            showPopup();
        }).catch((error) => {
            alert('There was an error submitting the form.');
            console.error('Error:', error);
        });
    }
}

function showPopup() {
    document.getElementById('thankYouPopup').classList.add('show');
}

function closePopup() {
    document.getElementById('thankYouPopup').classList.remove('show');
    window.location.href = ''
}


document.querySelector(".hire-me").addEventListener("click", function() {
    const sectionIndex = this.getAttribute("data-section-index");
    // console.log(sectionIndex);
    showSection(this);
    updateNav(this);
    removeBackSection();
    addBackSection(sectionIndex);
})
const navTogglerBtn = document.querySelector(".nav-toggler"),
    aside = document.querySelector(".aside");
navTogglerBtn.addEventListener("click", () => {
    asideSectionTogglerBtn();
})

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for (let i = 0; i < totalSection; i++) {
        allSection[i].classList.toggle("open");
    }
}