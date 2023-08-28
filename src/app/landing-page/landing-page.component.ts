import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import LazyLoad, { ILazyLoadInstance } from 'vanilla-lazyload';

@Component({
  selector: 'vp-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})
export class LandingPageComponent implements OnInit{
  @ViewChild('balkan-hero-slider') heroSlider!: ElementRef;
  burgerToggled:Boolean;
  constructor(){
    this.burgerToggled = false;
  }

  ngOnInit(): void {
    console.log("ONINIT")
    function logElementEvent(eventName: string, element: HTMLElement) {
      console.log(Date.now(), eventName, element.getAttribute("data-src"));
    }
    const callback_enter = function (element: any) {
      logElementEvent("🔑 ENTERED", element);
    };
     const callback_exit = function (element: any) {
      logElementEvent("🚪 EXITED", element);
    };
     const callback_loading = function (element: any) {
      logElementEvent("⌚ LOADING", element);
    };
     const callback_loaded = function (element: any) {
      logElementEvent("👍 LOADED", element);
    };
     const callback_error = function (element: any) {
      logElementEvent("💀 ERROR", element);
      element.src = "https://via.placeholder.com/440x560/?text=Error+Placeholder";
    };
     const callback_finish = function () {
      logElementEvent("✔️ FINISHED", document.documentElement);
    };
     const callback_cancel = function (element: any) {
      logElementEvent("🔥 CANCEL", element);
    };
  
    const ll = new LazyLoad({
      // Assign the callbacks defined above
      callback_enter: callback_enter,
      callback_exit: callback_exit,
      callback_cancel: callback_cancel,
      callback_loading: callback_loading,
      callback_loaded: callback_loaded,
      callback_error: callback_error,
      callback_finish: callback_finish,
      // For debugging purposes
      threshold: 0
    });

    /* Set the heights of rows */
    var rows = document.querySelectorAll(".balkan-row");
    console.log("IACATALI", rows);
    // for (var i = 0; i < rows.length; i++) {
    //   console.log(rows[i], rows[i].querySelectorAll("video"));
    //   var min = Array.from(rows[i].querySelectorAll("video")).reduce((min, child)=>{
    //     console.log(min, child.offsetHeight);
    //     return Math.min(min, child.offsetHeight)
    //   }, Infinity)
    //   console.log(min);
    //   (rows[i] as HTMLElement).style.height = min + "px";
    //   (rows[i] as HTMLElement).style.minHeight = min + "px";
    //   (rows[i] as HTMLElement).style.maxHeight = min + "px";

    //   Array.from(rows[i].querySelectorAll("video")).every((element) => {
    //     element.style.height = min + "px";
    //     element.style.minHeight = min + "px";
    //   })
    // }
  }

  ngAfterViewInit(){
    console.log("heyy",this.heroSlider);
    console.log("heyy",document.getElementsByClassName('balkan-hero-slider'));
    var heroContainer = document.querySelector('.hero-container');
    var imgContainers = document.querySelectorAll('.balkan-hero-slider');

      

    heroContainer!.addEventListener('mousemove', (event) => {
        // console.log(event);
        if(event.target instanceof HTMLElement){
          if(event.target.classList.contains('balkan-hero-bg')){
            var containerWidth = heroContainer!.clientWidth;
            var halfWidth = containerWidth / 2;
            var firstFourth = containerWidth / 4;
            var lastFourth = containerWidth - firstFourth;

            var parent = event.target.parentElement;
            var img = event.target;

            if((parent!.firstChild == img && !img.classList.contains('balkan-hero-bg-r') && (event as MouseEvent).clientX <= firstFourth) ||
            (parent!.firstChild == img && img.classList.contains('balkan-hero-bg-r') && (event as MouseEvent).clientX >= lastFourth)){
              parent!.style.maxWidth = '90%'
              img!.style.opacity = '0';
              if(heroContainer?.querySelector(".balkan-hero-slider-opened"))
                heroContainer.querySelector(".balkan-hero-slider-opened")?.classList.remove("balkan-hero-slider-opened");
              parent?.classList.add("balkan-hero-slider-opened");

            } else if((parent!.firstChild == img && !img.classList.contains('balkan-hero-bg-r') && (event as MouseEvent).clientX > halfWidth) || 
            parent!.firstChild == img && img.classList.contains('balkan-hero-bg-r') && (event as MouseEvent).clientX < halfWidth){
              parent!.style.maxWidth = '50%';
              img!.style.opacity = '1';
              setTimeout(() => {
                parent?.classList.remove("balkan-hero-slider-opened");
              }, 1400);
            } 

          }

          
            
          
        }
      })
      
    heroContainer!.addEventListener('mouseleave', (event) => {
      // console.log("leaving, bye");
      var opened = heroContainer!.querySelector('.balkan-hero-slider-opened') as HTMLElement;
      opened!.style.maxWidth = '50%';
      (opened.firstElementChild! as HTMLElement).style.opacity = '1';
      setTimeout(() => {
        opened!.classList.remove('balkan-hero-slider-opened');
      }, 1400);
    })

    window.addEventListener('scroll', (event) => {
      var logoB = document.querySelector('.logo-big') as HTMLElement;
      var logo = document.querySelector('.logo-text') as HTMLElement;
      var rect = logo!.getBoundingClientRect();
      var reff = document.querySelector('.reff');
      var rectReff = reff!.getBoundingClientRect();
      console.log("scrolling", rect.top);
      if (rect.top <= 0) {
        console.log("at the top");
        logo!.classList.add("fixed");
        logoB!.style.opacity = "0";
        logo!.style.opacity = "1";
      }
      if(rectReff.top > 0){
        if(logo?.classList.contains('fixed'))
          logo.classList.remove('fixed')
          logoB!.style.opacity = "1";
          logo!.style.opacity = "0";
        // console.log("still on page");
        
      }
    })
    //   const observer = new IntersectionObserver((entries) => {
    //     if (entries[0].isIntersecting) {
    //       console.log('Element is currently visible');
    //       // (document.querySelector(".logo-text") as HTMLElement)!.style.opacity = '0';
    //     } else {
    //       // (document.querySelector(".logo-text") as HTMLElement)!.style.opacity = '1';
    //       console.log('Element is currently not visible');
    //     }
    //   });
    //   observer.observe(document.querySelector('.logo-big')!);
      
    // })
     
  }

  toggleBurger(){
    this.burgerToggled = !this.burgerToggled;
    console.log(this.burgerToggled)

    var burgerBody = document.querySelector('.burger-body');
    burgerBody?.classList.toggle('visible');
    burgerBody?.classList.toggle('hidden');
  }
  
}