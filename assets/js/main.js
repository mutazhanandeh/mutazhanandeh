// assets/js/main.js
(function(){
  // Mark active nav link based on current file name
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll(".links a").forEach(a=>{
    const href = (a.getAttribute("href")||"").toLowerCase();
    if (href === path) a.classList.add("active");
  });
})();
