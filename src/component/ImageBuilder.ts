class Images {
  constructor() {}
}

export class ImageBuilder {
  images;

  static create() {
    return new ImageBuilder();
  }

  setImages(images) {
    this.images = images;
  }

  build() {
    const img = new Images();
  }
}
