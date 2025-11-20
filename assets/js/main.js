document.addEventListener('DOMContentLoaded', () => {
    // Search Functionality
    const searchInput = document.getElementById('search-input');
    const postCards = document.querySelectorAll('.post-card');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const searchTerm = e.target.value.toLowerCase();

            postCards.forEach(card => {
                const title = card.querySelector('h3').textContent.toLowerCase();
                const excerpt = card.querySelector('.post-excerpt').textContent.toLowerCase();
                const parent = card.parentElement; // The <li> element

                if (title.includes(searchTerm) || excerpt.includes(searchTerm)) {
                    parent.style.display = '';
                    card.style.animation = 'fadeIn 0.5s ease';
                } else {
                    parent.style.display = 'none';
                }
            });
        });
    }

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Table of Contents Generation
    const postContent = document.querySelector('.post-content');
    const tocContainer = document.getElementById('toc-container');

    if (postContent && tocContainer) {
        const headings = postContent.querySelectorAll('h2, h3');

        if (headings.length > 0) {
            const tocList = document.createElement('ul');
            tocList.className = 'toc-list';

            headings.forEach((heading, index) => {
                const id = `heading-${index}`;
                heading.id = id;

                const li = document.createElement('li');
                li.className = `toc-item toc-${heading.tagName.toLowerCase()}`;

                const a = document.createElement('a');
                a.href = `#${id}`;
                a.textContent = heading.textContent;

                li.appendChild(a);
                tocList.appendChild(li);
            });

            tocContainer.appendChild(tocList);
            tocContainer.style.display = 'block'; // Show if we have headings
        }
    }

    console.log('Nebula Theme Loaded 🚀');
});
