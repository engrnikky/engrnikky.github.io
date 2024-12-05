let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');
let modal = document.getElementById('project-modal');
let modalImg = document.getElementById('modal-image');
let currentIndex = 0;
let currentProjectIndex = 0;

// Image sets for each project
let projectImages = [
    ["assets/Graphic Design/1.png", "assets/Graphic Design/2.png", "assets/Graphic Design/3.png"], // Graphic Design
    ["assets/Web Dev/1.png", "assets/Web Dev/2.png", "assets/Web Dev/3.png", "assets/Web Dev/4.png", "assets/Web Dev/5.png", "assets/Web Dev/6.png", "assets/Web Dev/7.png"], // Web Development
    ["assets/Front End/1.png", "assets/Front End/2.png", "assets/Front End/3.png", "assets/Front End/4.png", "assets/Front End/5.png", "assets/Front End/6.png", "assets/Front End/7.png"]  // Frontend Development
];

function openModal(projectIndex) {
    modal.style.display = "block";
    currentProjectIndex = projectIndex;
    currentIndex = 0; // Reset to the first image of the selected project
    showImage(currentProjectIndex, currentIndex);
}

function closeModal() {
    modal.style.display = "none";
}

function showImage(projectIndex, imageIndex) {
    modalImg.src = projectImages[projectIndex][imageIndex];
}

function showNext() {
    currentIndex = (currentIndex + 1) % projectImages[currentProjectIndex].length;
    showImage(currentProjectIndex, currentIndex);
}

function showPrev() {
    currentIndex = (currentIndex - 1 + projectImages[currentProjectIndex].length) % projectImages[currentProjectIndex].length;
    showImage(currentProjectIndex, currentIndex);
}

document.querySelectorAll('.open-modal').forEach((button, index) => {
    button.addEventListener('click', function(event) {
        event.preventDefault();  // Prevent the default link action
        openModal(index);
    });
});

document.querySelector('.close').addEventListener('click', closeModal);
document.querySelector('.next').addEventListener('click', showNext);
document.querySelector('.prev').addEventListener('click', showPrev);

window.addEventListener('click', function(event) {
    if (event.target === modal) {
        closeModal();
    }
});



window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if(top >= offset && top < offset + height){
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        }
    });
};

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');
};

// EmailJS integration for form submission
document.getElementById('contact-form').addEventListener('submit', function(event) {
    event.preventDefault();

    emailjs.sendForm('service_kaf25ps', 'template_3w660wd', this)
        .then(function() {
            console.log('SUCCESS!');
            // Display the success message
            let successMessage = document.getElementById('success-message');
            successMessage.innerText = 'Your message has been sent successfully!';
            successMessage.style.display = 'block';

            // Clear form fields manually
            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('phone').value = '';
            document.getElementById('subject').value = '';
            document.getElementById('message').value = '';

            setTimeout(function() { successMessage.style.display = 'none'; }, 5000);
        }, function(error) {
            console.log('FAILED...', error);
            alert('There was an error sending your message. Please try again.');
        });
});
