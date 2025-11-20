console.log("Hi, I'm JS, and I'm here to help you build awesome websites!")
document.addEventListener("DOMContentLoaded", () => {
    document.querySelector('.baiscope').forEach(svg => {
        svg.addEventListener("dragstart", e => e.preventDefault());
    });
});
