// Global variables
let currentPage = 'home';
let currentQuestionIndex = 0;
let score = 0;
let selectedOption = null;

// Quiz questions database
const quizQuestions = [
    {
        question: "Which civilization is known for its advanced drainage system and urban planning?",
        options: ["Vedic Civilization", "Indus Valley Civilization", "Mauryan Empire", "Gupta Empire"],
        correct: 1,
        explanation: "The Indus Valley Civilization (3300-1300 BCE) was renowned for its sophisticated urban planning, including advanced drainage systems and well-planned cities like Harappa and Mohenjo-daro."
    },
    {
        question: "Who founded the Mauryan Empire?",
        options: ["Ashoka", "Chandragupta Maurya", "Bindusara", "Kautilya"],
        correct: 1,
        explanation: "Chandragupta Maurya founded the Mauryan Empire in 322 BCE with the help of his advisor Kautilya (Chanakya). The empire reached its zenith under his grandson Ashoka."
    },
    {
        question: "The Battle of Plassey was fought in which year?",
        options: ["1757", "1764", "1767", "1775"],
        correct: 0,
        explanation: "The Battle of Plassey was fought on June 23, 1757, between the British East India Company and the Nawab of Bengal, Siraj-ud-Daulah. Robert Clive's victory established British supremacy in Bengal."
    },
    {
        question: "Which Mughal emperor built the Taj Mahal?",
        options: ["Akbar", "Jahangir", "Shah Jahan", "Aurangzeb"],
        correct: 2,
        explanation: "Shah Jahan built the Taj Mahal in Agra (1632-1653) as a mausoleum for his beloved wife Mumtaz Mahal. It is considered one of the finest examples of Mughal architecture."
    },
    {
        question: "The Sepoy Mutiny of 1857 started from which place?",
        options: ["Delhi", "Meerut", "Lucknow", "Kanpur"],
        correct: 1,
        explanation: "The Sepoy Mutiny of 1857 began in Meerut on May 10, 1857. It was triggered by the cartridge issue and spread to various parts of North India, marking the first major uprising against British rule."
    },
    {
        question: "Who was known as the 'Lion of Kashmir'?",
        options: ["Sheikh Abdullah", "Maharaja Hari Singh", "Gulab Singh", "Ranjit Singh"],
        correct: 0,
        explanation: "Sheikh Abdullah was known as the 'Lion of Kashmir' (Sher-e-Kashmir). He was a prominent political leader who played a key role in Kashmir's accession to India."
    },
    {
        question: "The Quit India Movement was launched in which year?",
        options: ["1940", "1942", "1944", "1946"],
        correct: 1,
        explanation: "The Quit India Movement was launched by Mahatma Gandhi on August 8, 1942. It was a mass civil disobedience movement demanding an end to British rule in India."
    },
    {
        question: "Which battle marked the end of the Vijayanagara Empire?",
        options: ["Battle of Talikota", "Battle of Panipat", "Battle of Khanwa", "Battle of Ghaghra"],
        correct: 0,
        explanation: "The Battle of Talikota (1565) was fought between the Vijayanagara Empire and the combined forces of the Deccan Sultanates. The defeat marked the end of the Vijayanagara Empire."
    },
    {
        question: "Who was the last Mughal emperor?",
        options: ["Aurangzeb", "Bahadur Shah I", "Bahadur Shah Zafar", "Akbar Shah II"],
        correct: 2,
        explanation: "Bahadur Shah Zafar (1837-1857) was the last Mughal emperor. He was exiled to Rangoon (Myanmar) by the British after the 1857 revolt and died there in 1862."
    },
    {
        question: "The Indian National Congress was founded in which year?",
        options: ["1883", "1885", "1887", "1889"],
        correct: 1,
        explanation: "The Indian National Congress was founded in 1885 by A.O. Hume, a retired British civil servant. The first session was held in Bombay with W.C. Bonnerjee as the first president."
    }
];

// Initialize the website
document.addEventListener('DOMContentLoaded', function() {
    showPage('home');
    initializeQuiz();
    
    // Add scroll animations
    addScrollAnimations();
    
    // Add pulse animation to important elements
    const importantElements = document.querySelectorAll('.btn-primary, .hero-title');
    importantElements.forEach(el => {
        el.classList.add('pulse');
    });
});

// Page navigation function
function showPage(pageId) {
    // Hide all pages
    const pages = document.querySelectorAll('.page');
    pages.forEach(page => page.classList.remove('active'));
    
    // Show selected page
    document.getElementById(pageId).classList.add('active');
    
    // Update navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => link.classList.remove('active'));
    
    const activeLink = document.querySelector(`[onclick="showPage('${pageId}')"]`);
    if (activeLink) {
        activeLink.classList.add('active');
    }
    
    currentPage = pageId;
    
    // Add fade-in animation to timeline items
    if (pageId === 'ancient' || pageId === 'medieval' || pageId === 'modern') {
        setTimeout(() => {
            const timelineItems = document.querySelectorAll('.timeline-item');
            timelineItems.forEach((item, index) => {
                setTimeout(() => {
                    item.classList.add('fade-in');
                }, index * 200);
            });
        }, 100);
    }
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// Quiz functionality
function initializeQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedOption = null;
    updateScoreDisplay();
    loadQuestion();
}

function loadQuestion() {
    const question = quizQuestions[currentQuestionIndex];
    document.getElementById('question-text').textContent = question.question;
    
    const optionsContainer = document.getElementById('options');
    optionsContainer.innerHTML = '';
    
    question.options.forEach((option, index) => {
        const optionElement = document.createElement('div');
        optionElement.className = 'quiz-option';
        optionElement.textContent = option;
        optionElement.onclick = () => selectOption(index);
        optionsContainer.appendChild(optionElement);
    });
    
    // Reset quiz state
    selectedOption = null;
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('quiz-question').style.display = 'block';
    document.getElementById('submit-btn').style.display = 'inline-block';
}

function selectOption(optionIndex) {
    // Remove previous selection
    const options = document.querySelectorAll('.quiz-option');
    options.forEach(option => option.classList.remove('selected'));
    
    // Add selection to clicked option
    options[optionIndex].classList.add('selected');
    selectedOption = optionIndex;
}

function submitAnswer() {
    if (selectedOption === null) {
        alert('Please select an answer before submitting!');
        return;
    }
    
    const question = quizQuestions[currentQuestionIndex];
    const options = document.querySelectorAll('.quiz-option');
    
    // Show correct/incorrect styling
    options.forEach((option, index) => {
        if (index === question.correct) {
            option.classList.add('correct');
        } else if (index === selectedOption && index !== question.correct) {
            option.classList.add('wrong');
        }
        option.style.pointerEvents = 'none';
    });
    
    // Update score
    if (selectedOption === question.correct) {
        score++;
        document.getElementById('result-text').textContent = '🎉 Correct!';
        document.getElementById('result-text').style.color = '#4caf50';
    } else {
        document.getElementById('result-text').textContent = '❌ Incorrect!';
        document.getElementById('result-text').style.color = '#f44336';
    }
    
    // Show explanation
    document.getElementById('explanation').textContent = question.explanation;
    
    // Show result and hide question
    document.getElementById('quiz-result').style.display = 'block';
    document.getElementById('submit-btn').style.display = 'none';
    
    updateScoreDisplay();
}

function nextQuestion() {
    currentQuestionIndex++;
    
    if (currentQuestionIndex >= quizQuestions.length) {
        showFinalScore();
        return;
    }
    
    loadQuestion();
}

function showFinalScore() {
    const percentage = Math.round((score / quizQuestions.length) * 100);
    let message = '';
    
    if (percentage >= 80) {
        message = '🏆 Excellent! You have a great knowledge of history!';
    } else if (percentage >= 60) {
        message = '👍 Good job! Keep studying to improve further!';
    } else {
        message = '📚 Keep learning! Review the historical events and try again!';
    }
    
    document.getElementById('question-text').textContent = `Quiz Complete! Your final score: ${score}/${quizQuestions.length} (${percentage}%)`;
    document.getElementById('options').innerHTML = `
        <div style="text-align: center; padding: 20px; background: white; border-radius: 15px; margin: 20px 0;">
            <h3 style="color: #667eea; margin-bottom: 15px;">${message}</h3>
            <button class="btn btn-primary" onclick="initializeQuiz()">Take Quiz Again</button>
            <button class="btn btn-secondary" onclick="showPage('home')" style="margin-left: 10px;">Back to Home</button>
        </div>
    `;
    
    document.getElementById('quiz-result').style.display = 'none';
    document.getElementById('submit-btn').style.display = 'none';
}

function updateScoreDisplay() {
    document.getElementById('score').textContent = score;
    document.getElementById('total').textContent = currentQuestionIndex + 1;
}

// Add scroll animations
function addScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, observerOptions);
    
    // Observe elements that should animate on scroll
    const animatedElements = document.querySelectorAll('.feature-card, .war-card, .timeline-content');
    animatedElements.forEach(el => observer.observe(el));
}

// Add smooth scrolling for internal links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Add keyboard navigation
document.addEventListener('keydown', function(e) {
    if (currentPage === 'quiz') {
        if (e.key >= '1' && e.key <= '4') {
            const optionIndex = parseInt(e.key) - 1;
            if (optionIndex < document.querySelectorAll('.quiz-option').length) {
                selectOption(optionIndex);
            }
        } else if (e.key === 'Enter') {
            if (document.getElementById('submit-btn').style.display !== 'none') {
                submitAnswer();
            } else if (document.getElementById('quiz-result').style.display !== 'none') {
                nextQuestion();
            }
        }
    }
});

// Progress tracking
function trackProgress() {
    const visitedPages = JSON.parse(localStorage.getItem('visitedPages') || '[]');
    if (!visitedPages.includes(currentPage)) {
        visitedPages.push(currentPage);
        localStorage.setItem('visitedPages', JSON.stringify(visitedPages));
    }
}

// Search functionality (basic implementation)
function searchHistory(query) {
    const results = [];
    const pages = ['ancient', 'medieval', 'modern'];
    
    pages.forEach(pageId => {
        const page = document.getElementById(pageId);
        const content = page.textContent.toLowerCase();
        if (content.includes(query.toLowerCase())) {
            results.push(pageId);
        }
    });
    
    return results;
}

// Enhanced timeline hover effects
document.addEventListener('DOMContentLoaded', function() {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateX(10px)';
            this.style.transition = 'transform 0.3s ease';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateX(0)';
        });
    });
});

// Print functionality
function printPage() {
    window.print();
}

// Dark mode toggle (bonus feature)
function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    localStorage.setItem('darkMode', document.body.classList.contains('dark-mode'));
}

// Initialize dark mode from localStorage
if (localStorage.getItem('darkMode') === 'true') {
    document.body.classList.add('dark-mode');
}