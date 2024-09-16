import { Controller } from "@hotwired/stimulus"

export default class extends Controller {
  static targets = ["video", "captureButton"]

  connect() {
    console.log("Photo controller connected")
    const constraints = {
      audio: false,
      video: {
        facingMode: 'environment'
      }
    };

    navigator.mediaDevices.getUserMedia(constraints)
      .then((stream) => {
        this.videoTarget.srcObject = stream
        this.videoTarget.play()
      })
      .catch((err) => {
        console.error("Error accessing camera: ", err)
      });
  }

  takePhoto() {
    const canvas = document.createElement("canvas")
    canvas.width = this.videoTarget.videoWidth
    canvas.height = this.videoTarget.videoHeight
    const context = canvas.getContext("2d")
    context.drawImage(this.videoTarget, 0, 0, canvas.width, canvas.height)

    canvas.toBlob((blob) => {
      const formData = new FormData()
      formData.append('photo[photo]', blob, 'photo.png')  // 'photo[photo]' correspond au paramètre attendu dans Rails


      fetch('/photos', {
        method: 'POST',
        headers: {
          'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').getAttribute('content')  // Ajoute le token CSRF
        },
        body: formData
      })
      .then(response => response.json())
      .then(data => {
        if (data.url) {
          this.photoTarget.src = data.url;
          console.log('Photo uploaded successfully: ', data.url)
        } else {
          console.error('Error uploading photo: ', data.error)
        }
      })
      .catch(error => {
        console.error('Error while uploading photo: ', error)
      })
    }, 'image/png')
  }
}
