document.addEventListener('DOMContentLoaded', function() {
    // Initialize Lucide icons
    lucide.createIcons();

    // Mobile menu toggle
    const menuToggle = document.getElementById('menuToggle');
    const mainNav = document.getElementById('mainNav');

    menuToggle.addEventListener('click', () => {
        mainNav.classList.toggle('hidden');
    });

    // Scroll to top button
    const scrollTopBtn = document.getElementById('scrollTopBtn');

    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 300) {
            scrollTopBtn.classList.remove('hidden');
        } else {
            scrollTopBtn.classList.add('hidden');
        }
    });

    scrollTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // Tabs functionality
    const tabTriggers = document.querySelectorAll('.tab-trigger');
    const tabContents = document.querySelectorAll('.tab-content');

    tabTriggers.forEach(trigger => {
        trigger.addEventListener('click', () => {
            const tabId = trigger.getAttribute('data-tab');
            
            tabTriggers.forEach(t => t.classList.remove('bg-background', 'text-foreground', 'shadow-sm'));
            tabContents.forEach(c => c.classList.add('hidden'));
            
            trigger.classList.add('bg-background', 'text-foreground', 'shadow-sm');
            document.getElementById(tabId).classList.remove('hidden');
        });
    });

    // Initialize with the first tab active
    tabTriggers[0].click();

    // OER Resources data
    const oerResources = [
        { name: 'OER Commons', url: 'https://www.oercommons.org/', description: 'A public digital library of open educational resources.', category: 'General' },
        { name: 'MERLOT', url: 'https://www.merlot.org/', description: 'A curated collection of free and open online teaching, learning, and faculty development services.', category: 'General' },
        { name: 'OpenStax', url: 'https://openstax.org/', description: 'A nonprofit educational initiative based at Rice University, providing free textbooks.', category: 'Textbooks' },
        { name: 'MIT OpenCourseWare', url: 'https://ocw.mit.edu/', description: 'A web-based publication of virtually all MIT course content.', category: 'Courses' },
        { name: 'Open Textbook Library', url: 'https://open.umn.edu/opentextbooks/', description: 'A growing catalog of free, peer-reviewed, and openly-licensed textbooks.', category: 'Textbooks' },
        { name: 'Khan Academy', url: 'https://www.khanacademy.org/', description: 'Offers practice exercises, instructional videos, and a personalized learning dashboard.', category: 'Courses' },
        { name: 'PhET Interactive Simulations', url: 'https://phet.colorado.edu/', description: 'Free interactive math and science simulations.', category: 'STEM' },
        { name: 'Project Gutenberg', url: 'https://www.gutenberg.org/', description: 'A library of over 60,000 free eBooks.', category: 'Literature' },
        { name: 'OpenLearn', url: 'https://www.open.edu/openlearn/', description: 'Free learning from The Open University.', category: 'Courses' },
        { name: 'TED-Ed', url: 'https://ed.ted.com/', description: 'TED's education initiative to spark and celebrate the ideas of students and educators.', category: 'Videos' },
        { name: 'Coursera', url: 'https://www.coursera.org/', description: 'Offers free courses from top universities and companies.', category: 'Courses' },
        { name: 'edX', url: 'https://www.edx.org/', description: 'Provides free online courses from top institutions.', category: 'Courses' },
        { name: 'Wikimedia Commons', url: 'https://commons.wikimedia.org/', description: 'A collection of freely usable media files.', category: 'Media' },
        { name: 'LibreTexts', url: 'https://libretexts.org/', description: 'Free textbook content for various subjects.', category: 'Textbooks' },
        { name: 'DOAJ', url: 'https://doaj.org/', description: 'Directory of Open Access Journals.', category: 'Journals' },
    ];

    // OER Creation Tools data
    const oerCreationTools = [
        { name: 'Pressbooks', url: 'https://pressbooks.com/', description: 'A book content management system that exports in multiple formats.', features: ['Multi-format export', 'Collaborative editing', 'Customizable themes'] },
        { name: 'H5P', url: 'https://h5p.org/', description: 'Create and share rich interactive content in your browser.', features: ['Interactive content', 'HTML5-based', 'LMS integration'] },
        { name: 'OpenAuthor', url: 'https://www.oercommons.org/authoring-overview', description: 'OER Commons' free authoring tool for creating and remixing OER.', features: ['Collaborative authoring', 'Standards alignment', 'Creative Commons licensing'] },
        { name: 'Scalar', url: 'https://scalar.me/', description: 'A free, open source authoring and publishing platform.', features: ['Media-rich publications', 'Non-linear structure', 'Annotation features'] },
        { name: 'Jupyter Notebook', url: 'https://jupyter.org/', description: 'Create and share documents with live code, equations, visualizations, and text.', features: ['Interactive computing', 'Multiple programming languages', 'Shareable notebooks'] },
    ];

    // Populate category select
    const categorySelect = document.getElementById('categorySelect');
    const categories = ['All', ...new Set(oerResources.map(resource => resource.category))];
    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categorySelect.appendChild(option);
    });

    // Filter and render resources
    const searchInput = document.getElementById('searchInput');
    const resourcesContainer = document.getElementById('resourcesContainer');

    function renderResources() {
        const searchTerm = searchInput.value.toLowerCase();
        const selectedCategory = categorySelect.value;

        const filteredResources = oerResources.filter(resource =>
            (selectedCategory === 'All' || resource.category === selectedCategory) &&
            (resource.name.toLowerCase().includes(searchTerm) ||
            resource.description.toLowerCase().includes(searchTerm))
        );

        resourcesContainer.innerHTML = '';

        if (filteredResources.length === 0) {
            resourcesContainer.innerHTML = '<p class="text-center text-gray-500">No resources found matching your criteria.</p>';
        } else {
            filteredResources.forEach(resource => {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <div class="p-6">
                        <h3 class="text-xl font-semibold mb-2">${resource.name}</h3>
                        <p class="text-sm text-gray-600 mb-2">${resource.description}</p>
                        <p class="text-xs text-gray-500 mb-4">Category: ${resource.category}</p>
                        <a href="${resource.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline inline-flex items-center">
                            Visit Site
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                        </a>
                    </div>
                `;
                resourcesContainer.appendChild(card);
            });
        }
    }

    searchInput.addEventListener('input', renderResources);
    categorySelect.addEventListener('change', renderResources);

    // Initial render
    renderResources();

    // Render OER Creation Tools
    const creationToolsContainer = document.getElementById('creationToolsContainer');

    oerCreationTools.forEach(tool => {
        const card = document.createElement('div');
        card.className = 'card';
        card.innerHTML = `
            <div class="p-6">
                <h3 class="text-xl font-semibold mb-2">${tool.name}</h3>
                <p class="text-sm text-gray-600 mb-2">${tool.description}</p>
                <h4 class="font-semibold mb-2">Key Features:</h4>
                <ul class="list-disc list-inside text-sm text-gray-600 mb-4">
                    ${tool.features.map(feature => `<li>${feature}</li>`).join('')}
                </ul>
                <a href="${tool.url}" target="_blank" rel="noopener noreferrer" class="btn btn-outline inline-flex items-center">
                    Learn More
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-2 h-4 w-4"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path><polyline points="15 3 21 3 21 9"></polyline><line x1="10" y1="14" x2="21" y2="3"></line></svg>
                </a>
            </div>
        `;
        creationToolsContainer.appendChild(card);
    });
});