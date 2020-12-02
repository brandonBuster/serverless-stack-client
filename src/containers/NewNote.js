import React, { createContext, useRef, useState } from 'react';
import {API} from "aws-amplify";
import { s3Upload } from "../libs/awsLib";
import Form from "react-bootstrap/Form";
import { useHistory } from 'react-router-dom';
import LoaderButton from '../components/LoaderButton';
import { onError } from '../libs/errorLib';
import config from '../config';
import './NewNote.css';

export default function NewNote() {
  //const { fields } = useForm();
  /*
   * useRef doesn't cause component to re-render.
   * it only stores the value so we can use it later
   * set/get "current" value by referencing file.current
   */
  const file = useRef(null);
  const history = useHistory();
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = (e) => (file.current = e.target.files[0]);

  const validateForm = () => content.length > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `File must be smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000} MB`
      );
      return;
    }

    setIsLoading(true);

    try {
        const attachment = file.current ? await s3Upload(file.current) : null;
        await createNote({content, attachment});
        history.push('/');
    } catch(e) {
        onError(e);
        setIsLoading(false);
    }
  };

  const createNote = (content) => API.post("notes", "/notes", {body: content});

  return (
    <div className="NewNote">
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="content">
          <Form.Control
            value={content}
            as="textarea"
            onChange={(e) => setContent(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId="file">
          <Form.Label>Attachment</Form.Label>
          <Form.Control onChange={handleFileChange} type="file" />
        </Form.Group>

        <LoaderButton
          block
          type="submit"
          size="lg"
          variant="primary"
          isLoading={isLoading}
          disabled={!validateForm}>Post</LoaderButton>
      </Form>
    </div>
  );
}
