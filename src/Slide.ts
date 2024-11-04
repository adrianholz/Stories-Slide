import Timeout from "./Timeout.js";

export default class Slide {
  public container: Element;
  public slides: Element[];
  public controls: Element;
  public time: number;
  public index: number;
  public slide: Element;
  public timeout: Timeout | null;

  constructor(
    container: Element,
    slides: Element[],
    controls: Element,
    time: number = 5000
  ) {
    this.container = container;
    this.slides = slides;
    this.controls = controls;
    this.time = time;
    this.index = 0;
    this.slide = this.slides[this.index];
    this.timeout = null;
    this.init();
  }

  hide(el: Element) {
    el.classList.remove("active");
  }

  show(index: number) {
    this.index = index;
    this.slide = this.slides[this.index];
    this.slides.forEach((slide) => this.hide(slide));
    this.slide.classList.add("active");
    this.auto(this.time);
  }

  auto(time: number) {
    this.timeout?.clear();
    this.timeout = new Timeout(() => this.next(), time);
  }

  prev() {
    const prev = this.index > 0 ? this.index - 1 : this.slides.length - 1;
    this.show(prev);
  }

  next() {
    const next = this.index + 1 < this.slides.length ? this.index + 1 : 0;
    this.show(next);
  }

  private addControls() {
    const prevButton = document.createElement("button");
    const nextButton = document.createElement("button");
    prevButton.innerText = "Previous Slide";
    nextButton.innerText = "Next Slide";
    this.controls.appendChild(prevButton);
    this.controls.appendChild(nextButton);

    nextButton.addEventListener("pointerup", () => this.next());
    prevButton.addEventListener("pointerup", () => this.prev());
  }

  private init() {
    this.addControls();
    this.show(this.index);
  }
}
