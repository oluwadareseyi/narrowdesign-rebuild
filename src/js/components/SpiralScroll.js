import Component from "../classes/Component";
import AutoBind from "../utils/bind";
import NormalizeWheel from "normalize-wheel";
import { lerp, clamp } from "../utils/math";

export default class extends Component {
  constructor(element) {
    super({
      element,
      elements: {
        spiralSections: "[data-spiral-section]",
      },
    });

    AutoBind(this);

    this.scroll = {
      ease: 0.1,
      position: 0,
      current: 0,
      target: 0,
      limit: 1500,
    };

    this.aspectRatio = 0.61723;
    this.widthToTransformOriginRatio = 0.7236;
    this.elementsLength = this.elements.spiralSections.length;
    this.currentSection = 0;
    this.scrollTimeout;

    this.onResize();
    this.update();

    this.colors = [];
  }

  onResize() {
    this.width = Math.floor(window.innerWidth * this.aspectRatio);
    this.height = this.width;
    this.originX = Math.floor(
      window.innerWidth * this.widthToTransformOriginRatio
    );
    this.originY = Math.floor(
      window.innerWidth * this.aspectRatio * this.widthToTransformOriginRatio
    );

    this.initSpiral();
  }

  onScroll(event) {
    const normalized = NormalizeWheel(event);
    const speed = normalized.pixelY * -0.1;

    this.scroll.target += speed;

    this.startTimeout();
    // this.destroy();
  }

  scrollElement() {
    const { spiralSections } = this.elements;

    const scale = Math.pow(this.aspectRatio, this.rotation / 90);

    this.element.style.transform = `rotate(${this.rotation}deg) scale(${scale})`;

    this.currentSection = Math.floor((this.rotation - 30) / -90);

    spiralSections.forEach((section, index) => {
      section.style.backgroundColor = `rgba(
        ${50 * (this.currentSection + 1)},
        ${30 * (this.currentSection + 1)},
        160,
        ${1 - index / this.elementsLength}
        )`;
    });
  }

  animateScroll(currentRotation) {
    this.scroll.target = currentRotation;

    this.scrollElement();
  }

  startTimeout() {
    clearTimeout(this.scrollTimeout);

    this.scrollTimeout = setTimeout(() => {
      this.animateScroll(this.currentSection * -90);
    }, 200);
  }

  initSpiral() {
    const { spiralSections } = this.elements;
    this.element.style.transformOrigin = `${this.originX}px ${this.originY}px`;

    spiralSections.forEach((section, index) => {
      const rotation = Math.floor(90 * index);
      const scale = Math.pow(this.aspectRatio, index);

      section.style.width = `${this.width}px`;
      section.style.height = `${this.height}px`;
      section.style.transformOrigin = `${this.originX}px ${this.originY}px`;

      section.style.transform = `rotate(${rotation}deg) scale(${scale})`;

      section.textContent = `This is section ${index + 1}`;
    });
  }

  update() {
    // this.scroll.target = clamp(0, this.scroll.limit, this.scroll.target);
    super.update();

    this.scroll.current = lerp(
      this.scroll.current,
      this.scroll.target,
      this.scroll.ease
    );

    this.rotation = this.scroll.current;

    this.scrollElement();
  }
}
