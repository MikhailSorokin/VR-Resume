
import ExperienceHeader from './experience.js'

export default class Hud {
  constructor(scene, loader) {
    this.scene = scene
    this.loader = loader

  }

  setupText() {
    const fontLoader = new THREE.FontLoader()
    Promise.all([new Promise(resolve => {
        fontLoader.load('fonts/Helvetca_Regular.js',
          function(font) {
            this.font = font
            console.log('come on')
          }, function (xhr) {
            console.log('ayy')
          }, function (err) {
            console.log(err)
          }
        )
      })
    ]).then(() => {
      console.log('ahh')

      //TODO - Load from a JSON object or something
      this.geometry = new THREE.TextGeometry('Experience', {
        font: this.font,
        size: 15,
        height: 0.001,
        curveSegments: 3
      })

      this.experienceHeader = new ExperienceHeader(this.scene, this.geometry)
            resolve()
    }).catch(e => {
      console.log(e)
    })

  }

}
