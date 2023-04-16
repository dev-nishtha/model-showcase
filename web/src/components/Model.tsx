import React from 'react';
import { useState, useEffect } from 'react';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

type ModelProps = {
  file_path: string;
};

const Model = ({ file_path }: ModelProps) => {
  const [model, setModel] = useState<null | THREE.Object3D>(null);
  useEffect(() => {
    let loader: GLTFLoader | FBXLoader;
    const fileExtension = file_path.split('.').pop()?.toLowerCase();
    if (!fileExtension) {
      console.error(`Cannot load model from ${file_path}: no file extension`);
      return;
    }
    if (fileExtension === 'glb' || fileExtension === 'gltf') {
      loader = new GLTFLoader();
    } else if (fileExtension === 'fbx') {
      loader = new FBXLoader();
    } else {
      console.error(
        `Cannot load model from ${file_path}: unsupported file extension "${fileExtension}"`,
      );
      return;
    }

    const fetchModel = async () => {
      const response = '../../../server/'.concat(file_path);
      try {
        const model = await new Promise<THREE.Object3D>((resolve, reject) => {
          loader.load(
            response,
            (result) => {
              if ('scene' in result) {
                console.log('hello resolve');
                resolve(result.scene || result.scenes[0]);
              } else {
                resolve(result);
              }
            },
            (progressEvent) =>
              console.log(
                `Loading model from ${response}: ${
                  (progressEvent.loaded / progressEvent.total) * 100
                }%`,
              ),
            (err) => reject(err),
          );
        });
        setModel(model);
      } catch (err) {
        console.error(`Failed to load model from ${response}: ${err}`);
      }
    };

    fetchModel();
  }, [file_path]);

  return model ? <primitive object={model} dispose={null} /> : null;
};
export default Model;
