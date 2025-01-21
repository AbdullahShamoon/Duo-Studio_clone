// For using gsap with locomotive scroll
function gsapPlusLocomotive() {
    gsap.registerPlugin(ScrollTrigger);

    // Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

    const locoScroll = new LocomotiveScroll({
        el: document.querySelector(".main"),
        smooth: true
    });
    // each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
    locoScroll.on("scroll", ScrollTrigger.update);

    // tell ScrollTrigger to use these proxy methods for the ".main" element since Locomotive Scroll is hijacking things
    ScrollTrigger.scrollerProxy(".main", {
        scrollTop(value) {
            return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
        }, // we don't have to define a scrollLeft because we're only scrolling vertically.
        getBoundingClientRect() {
            return { top: 0, left: 0, width: window.innerWidth, height: window.innerHeight };
        },
        // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
        pinType: document.querySelector(".main").style.transform ? "transform" : "fixed"
    });

    // each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
    ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

    // after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
    ScrollTrigger.refresh();

}

gsapPlusLocomotive();

// Cursor
var cursor = document.querySelector(".cursor");
var main = document.querySelector(".main");

main.addEventListener("mousemove", (e) => {

    // cursor.style.left = `${e.x}px`;
    // cursor.style.top = `${e.y}px`;

    gsap.to(cursor, {
        left : `${e.x + 10}px`,
        top : `${e.y + 10}px`,
        duration: 0.2
    })
})


// Animating Page-1 
let tl = gsap.timeline({
    scrollTrigger: {
        trigger: ".page1 h1",
        scroller: ".main",
        start: "top 27%",
        end: "top 0",
        scrub: 2,
        // markers: true
    }
})

tl.to(".page1 h1", {
    x: -100,

},"anim")
tl.to(".page1 h2", {
    x: 100,
},"anim")
tl.to(".page1 video", {
    width:"90%"
},"anim")


// Animating Page-2 
let tl2 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page2",
        scroller: ".main",
        start: "top 10%",
        end: "top 0",
        scrub: 2,
        // markers: true
    }
})
tl2.to(".main", {
    backgroundColor: "white"
})


// Animating Page-4 
let tl3 = gsap.timeline({
    scrollTrigger: {
        trigger: ".page4",
        scroller: ".main",
        start: "top 70%",
        end: "top 0",
        scrub: 2,
        // markers: true
    }
})
tl3.to(".main", {
    backgroundColor: "#0f0d0d"
})


//Animating Page-5
let boxes = document.querySelectorAll(".box");

boxes.forEach((box) => {
    box.addEventListener("mouseenter", () => {
        let att = box.getAttribute("data-image");
        // cursor.style.height="100px";
        // cursor.style.width="100px";
        gsap.to(cursor, {
            backgroundImage: `url(${att})`,
            height:"260px",
            width:"400px",
            borderRadius:"0",
            duration: 0
        })
    })
    box.addEventListener("mouseleave", () => {
        let att = box.getAttribute("data-image");
        gsap.to(cursor, {
            backgroundImage: `none`,
            height:"20px",
            width:"20px",
            borderRadius:"50%",
            duration: 0
        })
    })
})