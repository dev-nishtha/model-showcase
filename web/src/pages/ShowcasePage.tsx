import React, { useEffect, useState, Suspense } from 'react';
import { Container, Row, Col } from 'reactstrap';
import axios from 'axios';
import WebGlWrapper from './../components/WebGlWrapper';
import LoadingSpinner from '../components/LoadingSpinner';
import Model from '../components/Model';
type FileData = {
  data: { title: ''; description: ''; file_path: '' };
};

const ShowcasePage = () => {
  const [fileData, setFileData] = useState<FileData>();

  useEffect(() => {
    const fetchFileData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/showcase`);
        setFileData(response.data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchFileData();
  }, []);

  if (!fileData?.data.title || !fileData?.data.description || !fileData?.data.file_path) {
    return <LoadingSpinner />;
  } else {
    return (
      <Container>
        <Row>
          <Col>
            <h1>{fileData.data.title}</h1>
            <p>{fileData.data.description}</p>
          </Col>
        </Row>
        <Row>
          <Col>
            {fileData && (
              <WebGlWrapper>
                <ambientLight intensity={0.2} />
                <directionalLight
                  castShadow
                  position={[2.5, 8, 5]}
                  intensity={1.5}
                  shadow-mapSize={1024}
                  shadow-camera-far={50}
                  shadow-camera-left={-10}
                  shadow-camera-right={10}
                  shadow-camera-top={10}
                  shadow-camera-bottom={-10}
                />
                <mesh receiveShadow>
                  <planeGeometry args={[50, 50]} />
                  <shadowMaterial opacity={0.3} />
                </mesh>
                <Suspense fallback={<LoadingSpinner />}>
                  <Model file_path={fileData.data.file_path} />
                </Suspense>
              </WebGlWrapper>
            )}
          </Col>
        </Row>
      </Container>
    );
  }
};

export default ShowcasePage;
