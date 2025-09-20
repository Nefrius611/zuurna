// Makale Sayfası JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // URL parametresinden makale ID'sini al
    const urlParams = new URLSearchParams(window.location.search);
    const articleId = urlParams.get('id');
    
    if (articleId && articlesData[articleId]) {
        // Makale verisini yükle
        const article = articlesData[articleId];
        
        // Sayfa başlığını güncelle
        document.title = `${article.title} - ZuurnaHaber`;
        
        // Makale içeriğini doldur
        document.getElementById('article-title').textContent = article.title;
        document.getElementById('article-author').textContent = article.author;
        document.getElementById('article-date').textContent = article.date;
        document.getElementById('article-image').src = article.image;
        document.getElementById('article-image').alt = article.title;
        document.getElementById('article-content').innerHTML = article.content;
        
        // Etiketleri doldur
        const tagsContainer = document.getElementById('article-tags');
        tagsContainer.innerHTML = '';
        
        article.tags.forEach(tag => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.href = `#${tag.toLowerCase().replace(/ /g, '-')}`;
            a.textContent = tag;
            li.appendChild(a);
            tagsContainer.appendChild(li);
        });
        
        // İlgili makaleleri yükle
        loadRelatedArticles(article);
        
        // Paylaşım bağlantılarını ayarla
        setupShareLinks(article);
    } else {
        // Makale bulunamadı durumunu ele al
        document.getElementById('article-title').textContent = 'Makale Bulunamadı';
        document.getElementById('article-content').innerHTML = '<p>Üzgünüz, aradığınız makale mevcut değil veya kaldırılmış.</p>';
    }
});

// Etiketlere ve kategoriye göre ilgili makaleleri yükle
function loadRelatedArticles(currentArticle) {
    const relatedContainer = document.getElementById('related-articles');
    relatedContainer.innerHTML = '';
    
    // Eşleşen etiketlere veya kategoriye sahip makaleleri bul
    const relatedArticles = [];
    
    for (const id in articlesData) {
        if (id !== currentArticle.id.toString()) {
            const article = articlesData[id];
            
            // Makalenin mevcut makale ile etiketleri veya kategorisi paylaşıp paylaşmadığını kontrol et
            const hasMatchingTag = article.tags.some(tag => currentArticle.tags.includes(tag));
            const hasMatchingCategory = article.category === currentArticle.category;
            
            if (hasMatchingTag || hasMatchingCategory) {
                relatedArticles.push(article);
                
                // 3 ilgili makale ile sınırla
                if (relatedArticles.length >= 3) break;
            }
        }
    }
    
    // İlgili makaleleri görüntüle
    relatedArticles.forEach(article => {
        const articleElement = document.createElement('article');
        
        articleElement.innerHTML = `
            <div class="article-image">
                <img src="${article.image}" alt="${article.title}">
            </div>
            <div class="article-content">
                <h3><a href="article.html?id=${article.id}">${article.title}</a></h3>
                <p class="article-meta">Yazan: ${article.author} | <span>${article.date}</span></p>
            </div>
        `;
        
        relatedContainer.appendChild(articleElement);
    });
    
    // İlgili makale bulunamazsa, bölümü gizle
    if (relatedArticles.length === 0) {
        document.querySelector('.related-articles').style.display = 'none';
    }
}

// Sosyal medya paylaşım bağlantılarını ayarla
function setupShareLinks(article) {
    const shareLinks = document.querySelectorAll('.article-share .social-icons a');
    const articleUrl = encodeURIComponent(window.location.href);
    const articleTitle = encodeURIComponent(article.title);
    
    // Paylaşım bağlantılarını mevcut makale bilgileriyle güncelle
    shareLinks.forEach(link => {
        const icon = link.querySelector('i');
        
        if (icon.classList.contains('fa-facebook-f')) {
            link.href = `https://www.facebook.com/sharer/sharer.php?u=${articleUrl}`;
        } else if (icon.classList.contains('fa-twitter')) {
            link.href = `https://twitter.com/intent/tweet?url=${articleUrl}&text=${articleTitle}`;
        } else if (icon.classList.contains('fa-linkedin-in')) {
            link.href = `https://www.linkedin.com/shareArticle?mini=true&url=${articleUrl}&title=${articleTitle}`;
        } else if (icon.classList.contains('fa-pinterest')) {
            link.href = `https://pinterest.com/pin/create/button/?url=${articleUrl}&description=${articleTitle}`;
        } else if (icon.classList.contains('fa-whatsapp')) {
            link.href = `https://api.whatsapp.com/send?text=${articleTitle} ${articleUrl}`;
        }
        
        // Paylaşım bağlantılarını yeni pencerede aç
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
    });
}