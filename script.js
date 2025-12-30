
        // Enhanced starfield with multiple star sizes
        function createStars() {
            const starfield = document.getElementById('starfield');
            const starCount = 150;
            
            for (let i = 0; i < starCount; i++) {
                const star = document.createElement('div');
                star.className = 'star';
                
                // Random size distribution
                const rand = Math.random();
                if (rand < 0.6) {
                    star.classList.add('small');
                } else if (rand < 0.9) {
                    star.classList.add('medium');
                } else {
                    star.classList.add('large');
                }
                
                star.style.left = Math.random() * 100 + '%';
                star.style.top = Math.random() * 100 + '%';
                star.style.animationDelay = Math.random() * 3 + 's';
                star.style.animationDuration = (2 + Math.random() * 3) + 's';
                starfield.appendChild(star);
            }

            // Add shooting stars
            for (let i = 0; i < 3; i++) {
                const shootingStar = document.createElement('div');
                shootingStar.className = 'shooting-star';
                shootingStar.style.left = Math.random() * 50 + '%';
                shootingStar.style.top = Math.random() * 50 + '%';
                shootingStar.style.animationDelay = (i * 5 + Math.random() * 3) + 's';
                starfield.appendChild(shootingStar);
            }
        }

        function fadeIn(audio, duration = 2000) {
              audio.volume = 0;
              audio.play();
                    
              const step = 0.05;
              const interval = duration / (1 / step);
                    
              const fade = setInterval(() => {
                if (audio.volume < 0.7) {
                  audio.volume += step;
                } else {
                  clearInterval(fade);
                }
              }, interval);
            }
            
            function fadeOut(audio, duration = 1500) {
              const step = 0.05;
              const interval = duration / (audio.volume / step);
            
              const fade = setInterval(() => {
                if (audio.volume > 0.05) {
                  audio.volume -= step;
                } else {
                  audio.pause();
                  audio.volume = 0;
                  clearInterval(fade);
                }
              }, interval);
            }
            

        // Create floating flowers
        function createFlowers() {
            const flowersContainer = document.getElementById('flowers');
            const flowers = ['🌸', '🌺', '🌷', '🌹', '💐', '🌼'];
            
            for (let i = 0; i < 15; i++) {
                const flower = document.createElement('div');
                flower.className = 'flower';
                flower.textContent = flowers[Math.floor(Math.random() * flowers.length)];
                flower.style.left = Math.random() * 100 + '%';
                flower.style.animationDelay = Math.random() * 15 + 's';
                flower.style.animationDuration = (12 + Math.random() * 6) + 's';
                flowersContainer.appendChild(flower);
            }
        }

        createStars();
        createFlowers();

        // Start journey - show all sections with staggered animations
        function startJourney() {
            const timeline = document.getElementById('timeline');
            const reflection = document.getElementById('reflection');
    
            // 1. Show the sections first
            reflection.classList.remove('hidden');
            reflection.classList.add('visible');
            timeline.classList.remove('hidden');
            timeline.classList.add('visible');

            // 2. Refresh the observer so it "sees" the cards now that timeline is display:block
            const cards = document.querySelectorAll('.month-card');
            cards.forEach((card, index) => { // Fallback: If the observer fails, force them visible after a delay
                    
                setTimeout(() => {
                card.classList.add('visible');
            }, 500 + (index * 200)); 
        });

            reflection.scrollIntoView({ behavior: 'smooth' });
        }

        // Scroll to notebook
        function scrollToNotebook() {
            document.getElementById('notebook').scrollIntoView({ behavior: 'smooth' });
        }

        // Toggle song player
    function toggleSong(element, month) {
        const player = document.getElementById('player-' + month);
        if (!player) return;
        const audio = player.querySelector('audio');
        const timing = songTimings[month];

    // Stop all other audios
    document.querySelectorAll('audio').forEach(a => {
        a.pause();
        a.currentTime = 0;
    });

    if (!timing) {
        fadeIn(audio);
        return;
    }
    audio.currentTime = timing.start;
    fadeIn(audio);

    // Stop at end time
    audio.ontimeupdate = () => {
        if (audio.currentTime >= timing.end) {
            fadeOut(audio);
            audio.currentTime = timing.start;
        }
    };
}


        const songTimings = {
            may: { start: 30, end: 55 },
            june: { start: 41, end: 85 },
            july: { start:49, end: 60 },
            august: { start: 0, end: 12 },
            september: { start: 58, end: 92 },
            october: { start: 90, end: 151 },
            november: { start: 25, end: 50 },
            december: { start: 26, end: 40 }
        };

        // Intersection Observer for fade-in animations
        const observerOptions = {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all sections and month cards
        document.querySelectorAll('section').forEach(section => {
            observer.observe(section);
        });

        document.querySelectorAll('.month-card').forEach(card => {
            observer.observe(card);
        });

        // Smooth scrolling
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            });
        });

        // Save editable content to localStorage
        const editableSection = document.querySelector('.editable-section');
        
        // Load saved content
        const savedContent = localStorage.getItem('notebookContent');
        if (savedContent) {
            editableSection.innerHTML = savedContent;
        }

        // Save content on input
        editableSection.addEventListener('input', () => {
            localStorage.setItem('notebookContent', editableSection.innerHTML);
        });

        // Parallax effect for moon
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const moon = document.querySelector('.moon-container');
            if (moon && scrolled < window.innerHeight) {
                moon.style.transform = `translateY(${scrolled * 0.3}px)`;
            }
        });

        // Create floating hearts on certain sections
        function createFloatingHeart(section) {
            const heart = document.createElement('div');
            heart.className = 'heart';
            heart.textContent = '💖';
            heart.style.left = Math.random() * 90 + 5 + '%';
            heart.style.bottom = '0';
            heart.style.animationDelay = Math.random() * 3 + 's';
            section.appendChild(heart);
            
            setTimeout(() => heart.remove(), 8000);
        }

        // Add hearts to gratitude section periodically
        setInterval(() => {
            const gratitudeSection = document.getElementById('gratitude');
            if (gratitudeSection && gratitudeSection.classList.contains('visible')) {
                createFloatingHeart(gratitudeSection);
            }
        }, 4000);

        // Add sparkle effect to title
        const title = document.querySelector('h1');
        if (title) {
            setInterval(() => {
                title.classList.add('sparkle-text');
                setTimeout(() => title.classList.remove('sparkle-text'), 1000);
            }, 5000);
        }
     function handlePhotoClick(element, month) {
    // 1. Add the flash animation class
    element.classList.add('clicked');
    
    // 2. Remove it after animation finishes so it can be re-triggered
    setTimeout(() => {
        element.classList.remove('clicked');
    }, 600);
    
    // 3. Trigger your music toggle (ensure this function exists in your code)
    if (typeof toggleSong === "function") {
        toggleSong(element, month);
    }
}


    // Reveal sections on scroll
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        sections.forEach(section => {
        const top = section.getBoundingClientRect().top;
        const trigger = window.innerHeight * 0.8; // show when section is 80% down the viewport
        if(top < trigger){
            section.classList.add('visible');
            section.classList.remove('hidden');
        }
    });
});

// Staggered Entrance: Makes cards appear one after another as you scroll
    const timelineObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
        if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('.month-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.classList.add('visible');
                }, index * 200); // 200ms delay between each card
            });
        }
    });
}, { threshold: 0.1 });

// Initialize the observer
document.addEventListener('DOMContentLoaded', () => {
    const timelineSection = document.querySelector('#timeline');
    if (timelineSection) timelineObserver.observe(timelineSection);
});

    let revealTimeout;

    window.addEventListener("scroll", () => {
      const msg = document.getElementById("hidden-message");
      const rect = msg.getBoundingClientRect();
    
      if (rect.top < window.innerHeight && rect.bottom >= 0) {
        clearTimeout(revealTimeout);
        revealTimeout = setTimeout(() => {
          msg.style.opacity = 1;
        }, 5000); // waits 5 seconds
      }
    });