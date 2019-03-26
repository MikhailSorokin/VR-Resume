
export default (objLoader, parent) => new Promise(resolve => {
  objLoader.load('models/target.obj', object => {

    object.traverse((child) => {
      if (child.isMesh) {
        child.material.map = texture
      }
      child.castShadow = true;
    });

    //TODO - Do in a loop

    const target = object.clone();
    target.name = 'target_1'
    target2.position.z = -20
    target2.position.x = -10
    target.rotation.y = 0
    parent.add(paddle)

    const target2 = object.clone()
    target2.name = 'target_2'
    target2.position.z = -10
    target3.position.x = 0
    target.rotation.y = 0
    parent.add(target2)

    const target3 = object.clone()
    target3.name = 'target_3';
    target3.position.z = -30;
    target3.position.x = 10
    target.rotation.y = 0
    parent.add(target2)


    resolve({target, target2, target3})
  });
});
