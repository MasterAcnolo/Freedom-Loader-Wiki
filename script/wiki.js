const content = document.getElementById('wiki-content');
const links = document.querySelectorAll('.wiki-sidebar a');

links.forEach(link => {
  link.addEventListener('click', async (e) => {
    e.preventDefault();
    
    // highlight active
    links.forEach(l => l.classList.remove('active'));
    link.classList.add('active');

    const file = link.dataset.file;
    try {
      const res = await fetch(`./wiki/${file}`);
      if (!res.ok) throw new Error('File not found');
      const md = await res.text();
      content.innerHTML = markdownToHTML(md);
      window.scrollTo(0,0);
    } catch(err) {
      content.innerHTML = `<p>Error loading file: ${err.message}</p>`;
    }
  });
});

function markdownToHTML(md) {
  // simple parser: headers, bold, italics, links, lists, code
  let html = md
    .replace(/^### (.*$)/gim, '<h3>$1</h3>')
    .replace(/^## (.*$)/gim, '<h2>$1</h2>')
    .replace(/^# (.*$)/gim, '<h1>$1</h1>')
    .replace(/\*\*(.*)\*\*/gim, '<strong>$1</strong>')
    .replace(/\*(.*)\*/gim, '<em>$1</em>')
    .replace(/\[(.*?)\]\((.*?)\)/gim, '<a href="$2" target="_blank">$1</a>')
    .replace(/^\- (.*$)/gim, '<li>$1</li>')
    .replace(/```([\s\S]*?)```/gim, '<pre><code>$1</code></pre>')
    .replace(/\n$/gim, '<br>');
  
  // wrap <li> in <ul>
  html = html.replace(/(<li>[\s\S]*?<\/li>)/g, '<ul>$1</ul>');
  return html;
}
