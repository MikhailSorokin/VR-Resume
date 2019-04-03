
import Targets from './target.js'
import Hud from './hud'

export default class Scene {

  constructor() {
      this.setup()
  }

  setup() {
      this.minY = 0
      this.deltaIncr = 0

      this.targets = []

      const windowHalfX = window.innerWidth / 2;
      const windowHalfY = window.innerHeight / 2;

      const backgroundColor = 0x0040fff

      this.clock = new THREE.Clock()

      //Creates a div for the entire three.js to be placed inside
      let container = document.createElement('div')
      document.body.appendChild(container)

      //creates a scene that will be used to populate targets and lights inside
      this.scene = new THREE.Scene()
      this.scene.background = new THREE.Color(backgroundColor)

      //adds a perspectivecamera into the scene with fov (overridenin vr), aspect ratio, near/far plane
      this.camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight,
      0.1, 100)


      //Sets up the renderer for use
      this.renderer = new THREE.WebGLRenderer({antialias: true})
      this.renderer.setPixelRatio(window.devicePixelRatio)
      this.renderer.setSize(window.innerWidth, window.innerHeight)
      this.renderer.vr.enabled = true;
      container.appendChild(this.renderer.domElement)

      let ambientLight = new THREE.AmbientLight(0xcccccc, 0.4)
      this.scene.add(ambientLight)

      //This is the main light, the light above is just for aesthetics
      let pointLight = new THREE.PointLight(0xffffff, 0.8)
      this.camera.add(pointLight)

      this.scene.add(this.camera)

      /* ------------- Here is the load model functionality --------- */

      this.loader = new THREE.OBJLoader()
      this.loader.setPath('../../models/')

      //Texture
      this.texture = new THREE.TextureLoader().load('models/textures/target_diffuse.jpg')

      //Load three different targets and put them in different positions
      this.loadModels()

      //Important to enable VR - TODO maybe customize the button look
      document.body.appendChild(WEBVR.createButton(this.renderer))

      //TODO - Controls
      /*this.controls = new THREE.FlyControls( camera );

      this.controls.movementSpeed = 1000;
      controls.domElement = renderer.domElement;
      controls.rollSpeed = Math.PI / 24;
      controls.autoForward = false;
      controls.dragToLook = false;*/

      window.addEventListener('resize', this.onWindowResize, false)

  }

    //...

  async loadModels() {
      Promise.all([
          Targets(this.loader, this.scene, this.texture)
      ]).then(([{target1, target2, target3}]) => {
          this.targets.push(target1)
          this.targets.push(target2)
          this.targets.push(target3)
          console.log('loaded')

          this.hud = new Hud(this.scene, this.loader)
          //Run the loop
          this.animate()
      }).catch(e => {
        console.warn('Loading error: ')
        console.warn(e)
      })
  }


  animate() {
    //TODO - Bind is not ES6 style or something like that - angry Brian
    this.renderer.setAnimationLoop(this.render.bind(this))
  }

  render() {
    let delta = this.clock.getDelta()

    let frac = (delta * 60) / 1000
    let angle = Math.PI * 2 * frac

    this.deltaIncr += (delta * 5) / 10


    for (let target of this.targets) {
      //console.log(`sin value ${Math.sin(this.deltaIncr)}`)
      if (target) {
        console.log(target.name)
        target.position.y = this.minY + Math.sin(this.deltaIncr) * 3
      }
    }

    this.renderer.render( this.scene, this.camera );
  }

  onWindowResize() {
    if (this.camera) {
      this.camera.aspect = window.innerWidth / window.innerHeight
      this.camera.updateProjectionMatrix()

      this.renderer.setSize( window.innerWidth, window.innerHeight )
    }
  }

}

const ms_resume = new Scene()
