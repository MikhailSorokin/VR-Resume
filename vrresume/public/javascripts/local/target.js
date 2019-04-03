
export default (objLoader, parent, texture) => new Promise(resolve => {
  objLoader.load('target.obj', object => {

    object.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture
      }
      child.castShadow = true
    });

    //TODO - Do in a loop

    //NOTE - the resolve and the function that calls these promises must have the same names in the arguments
    const target1 = object.clone()
    target1.name = 'target_1'
    target1.position.z = -20
    target1.position.x = -10
    target1.rotation.y = 0
    parent.add(target1)

    const target2 = object.clone()
    target2.name = 'target_2'
    target2.position.z = -10
    target2.position.x = 0
    target2.rotation.y = 0
    parent.add(target2)

    const target3 = object.clone()
    target3.name = 'target_3'
    target3.position.z = -30
    target3.position.x = 10
    target3.rotation.y = 0
    parent.add(target3)

    resolve({target1, target2, target3})
  });
});
