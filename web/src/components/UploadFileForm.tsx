import React, { useCallback, useState } from 'react';
import { Button, Input, Label } from 'reactstrap';
import axios from 'axios';
import { useDropzone } from 'react-dropzone';

const UploadFileForm = () => {
  const [file, setFile] = useState<File | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [titleError, setTitleError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [fileTypeError, setFileTypeError] = useState(false);
  const onDrop = useCallback((acceptedFiles: File[] | null) => {
    if (!acceptedFiles) {
      console.log('no file uploaded');
      return;
    }
    setFile(acceptedFiles[0]);
    const fileType = acceptedFiles[0].name.match(/\.(gltf|glb|fbx)$/);
    if (!fileType) {
      setFileTypeError(true);
    } else {
      setFileTypeError(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: false,
  });
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(e.target.value);
    if (e.target.value === '') {
      setTitleError(true);
    } else {
      setTitleError(false);
    }
  };

  const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDescription(e.target.value);
    if (e.target.value === '') {
      setDescriptionError(true);
    } else {
      setDescriptionError(false);
    }
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (file && title && description && !fileTypeError) {
      // Handle file upload and metadata submission here
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('file_path', file);

      try {
        const response = await axios.post('http://localhost:5000/api/upload', formData);
        if (window.confirm('Form submitted successfully! Do you want to reload the page?')) {
          window.location.reload();
          return response;
        }
      } catch (err) {
        return err;
      }
    } else {
      if (!title) {
        setTitleError(true);
      }
      if (!description) {
        setDescriptionError(true);
      }
    }
  };
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: '16px' }} {...getRootProps()}>
          <input {...getInputProps()} />
          {isDragActive ? (
            <p>Drop the files here ...</p>
          ) : (
            <>
              <p>Drag &amp; drop a 3D model file here, or click to select a file</p>
              <em>Supported file types: .glb, .gltf, .fbx</em>
              {fileTypeError && (
                <p style={{ color: 'red' }}>
                  Invalid file type. Please upload a .glb, .gltf, or .fbx file.
                </p>
              )}
            </>
          )}
        </div>
        <div style={{ marginBottom: '8px' }}>
          <Label>Title:</Label>
          <Input type="text" value={title} onChange={handleTitleChange} />
          {titleError && <p style={{ color: 'red' }}>Please enter a title.</p>}
        </div>
        <div style={{ marginBottom: '16px' }}>
          <Label>Description:</Label>
          <Input type="textarea" value={description} onChange={handleDescriptionChange} />
          {descriptionError && <p style={{ color: 'red' }}>Please enter a description.</p>}
        </div>
        <Button type="submit" color="primary">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default UploadFileForm;
