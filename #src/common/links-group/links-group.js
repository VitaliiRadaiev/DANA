{
    let links = document.querySelectorAll('.links-group a');
    if(links.length) {
        links.forEach(link => {
            link.innerHTML = link.innerText.split(' ').map(word => `<span>${word}</span>`).join('');
        })
    }
}