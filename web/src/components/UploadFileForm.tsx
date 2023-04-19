import React, { useCallback, useState, useRef, useEffect } from 'react';
import { Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';
import { AiOutlineFile, AiOutlineClose } from 'react-icons/ai';
import '../css/UploadFileForm.css';
import SuccessCard from './SuccessCard';

const UploadFileForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState('');
  const [descriptionError, setDescriptionError] = useState('');
  const [fileError, setFileError] = useState('');
  const rocketRef = useRef<HTMLElement | null>(null);
  const successRef = useRef<HTMLDivElement | null>(null);

  const onDrop = useCallback((acceptedFiles: File[] | null) => {
    if (!acceptedFiles) {
      return;
    }

    const fileType = acceptedFiles[0].name.match(/\.(gltf|glb|fbx)$/);
    if (!fileType) {
      setFileError('Invalid file type. Please upload a .glb, .gltf, or .fbx file.');
    } else {
      setFileError('');
      setFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });

  const handleFileChange = (e: React.MouseEvent<SVGElement>) => {
    e.stopPropagation();
    setFile(null);
  };
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      setTitleError('Please enter a title.');
    } else {
      setTitleError('');
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    if (e.target.value === '') {
      setDescriptionError('Please enter a description.');
    } else {
      setDescriptionError('');
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (file && title && description && !fileError) {
      // Handle file upload and metadata submission here
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file_path', file);

      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData);
        (e.target as HTMLFormElement).style.animationPlayState = 'running';
        rocketRef.current!.style.animationPlayState = 'running';
        successRef.current!.style.zIndex = '2';
        successRef.current!.style.opacity = '1';
        return response;
      } catch (err) {
        return err;
      }
    } else {
      if (!title) {
        setTitleError('Please enter a title.');
      }
      if (!description) {
        setDescriptionError('Please enter a description.');
      }
      if (!file) {
        setFileError('Please upload a 3D model.');
      }
    }
  };
  return (
    <>
      <div className="bg"></div>
      <div className="content">
        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-group">
            <div className="dropzone" {...getRootProps()}>
              <input {...getInputProps()} />
              {isDragActive ? (
                <p>Drop the files here ...</p>
              ) : (
                <>
                  <p>Drag &amp; drop a 3D model file here, or click to select a file</p>
                  <em>Supported file types: .glb, .gltf, .fbx</em>
                  {file && (
                    <p className="file">
                      {' '}
                      <AiOutlineFile /> &nbsp;
                      {file.name} &nbsp;
                      <AiOutlineClose color="black" onClick={handleFileChange} />
                    </p>
                  )}
                </>
              )}
            </div>
            {fileError && <p className="error">{fileError}</p>}
          </div>
          <div className="form-group">
            <Label for="title">Title:</Label>
            <Input
              type="text"
              id="title"
              value={title}
              onFocus={handleTitleChange}
              onChange={handleTitleChange}
            />
            {titleError && <p className="error">{titleError}</p>}
          </div>
          <div className="form-group">
            <Label for="description">Description:</Label>
            <Input
              type="textarea"
              id="description"
              value={description}
              onChange={handleDescriptionChange}
              onFocus={handleDescriptionChange}
            />
            {descriptionError && <p className="error">{descriptionError}</p>}
          </div>
          <Button type="submit" className="btn-submit">
            Submit
          </Button>
        </form>
        <span id="rocket" ref={rocketRef}></span>
      </div>
      <div className="success" ref={successRef}>
        <SuccessCard />
      </div>
    </>
  );
};

export default UploadFileForm;
