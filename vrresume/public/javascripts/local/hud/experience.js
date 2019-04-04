
export default class ExperienceHeader {

  constructor(scene, geometry) {
    this.geometry = geometry
    this.scene = scene
    this.messageGroup = new THREE.Group()
    this.setMessage('Experience', font)
  }

  setMessage(text, geometry) {
    let material = new THREE.MeshBasicMaterial({
      color: 0xF00000
    })

    geometry.computeBoundingBox()

    var boundingBox = geometry.boundingBox.clone();
    console.log('bounding box coordinates: ' +
        '(' + boundingBox.min.x + ', ' + boundingBox.min.y + ', ' + boundingBox.min.z + '), ' +
        '(' + boundingBox.max.x + ', ' + boundingBox.max.y + ', ' + boundingBox.max.z + ')' );

    const message = new THREE.Mesh(geometry, material)
    this.scene.add(message)
  }

}
