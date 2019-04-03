
import {TextGeometry} from 'three'

export default class Hud {
  constructor(scene, loader) {
    this.scene = scene

    this.setupText()
  }

  setupText() {
    let material = new MeshBasicMaterial({
      color: 0xffffff,
      transparent: true
    })
  }

  setMessage(text, font = 'helvetica') {

  }
}
