export class Place {
  constructor(title, imageUri, address, location, id) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = { lat: location.latitude, lng: location.longitude };
    this.id = id;
  }
}
