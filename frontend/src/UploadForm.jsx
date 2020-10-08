import React, { Component } from 'react'
import { Card, Button, Form, Container, Spinner, Row, Toast } from 'react-bootstrap'
import axios from 'axios';
import { faCloudDownloadAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default class UploadForm extends Component {

    state = {
        image: null,
        returnedImage: null,
        loading: false,
        inferenceTime: null,
        instances: null,
        errorMessage: null
    }

    onImageChange = (event) => {
        this.setState({ image: event.target.files[0] })

        if (!event.target.files[0].name.match(/.(jpg|jpeg|png)$/i)){
            this.setState({ image: null})
            alert('Not an image. jpg, jpeg, png are allowed');
        }
            
        // console.log(this.state)
    }

    onImageUpload = () => {
        const formData = new FormData();

        // Update the formData object 
        formData.append(
            "file",
            this.state.image,
            this.state.image.name
        );

        this.setState({ loading: true })
        this.setState({ returnedImage: null })

        // console.log(this.state.image);

        axios({
            method: 'post',
            url: 'http://localhost:5000/api/analyse-image-json',
            data: formData,
            headers: { 'Content-Type': 'multipart/form-data' },
            responseType: 'json'
        })
            .then((response) => {
                const data = response.data
                // console.log(response);

                this.setState({ loading: false })
                this.setState({ inferenceTime: data['inference_time'] })
                this.setState({ instances: data['instances'] })

                // base64 json image to blob for display
                const byteCharacters = atob(data['img']);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);

                let image = new Blob([byteArray], { type: 'image/jpeg' });

                this.setState({ returnedImage: URL.createObjectURL(image) })
            })
            .catch((err) => {
                //handle error
                this.setState({ loading: false })
                console.log(err);
                this.setState({ errorMessage: err.message })
                // this.displayErrorMessage(err.message)
            });
    }

    displayErrorMessage = () => {
        return (
            <div className='pt-4' aria-live="polite" aria-atomic="true" style={{ position: 'relative', minHeight: '100px', }}>
                <Toast style={{ position: 'absolute', top: 0, right: 0, }} delay={3000} autohide>
                    <Toast.Header className="text-white bg-danger">
                        {/* <img src="holder.js/20x20?text=%20" className="rounded mr-2" alt="" /> */}
                        {/* <strong className="mr-auto text-left"><FontAwesomeIcon icon={faTimesCircle} size="lg" /> </strong> */}
                        <small>{this.state.errorMessage}</small>
                    </Toast.Header>
                    <Toast.Body>{this.state.errorMessage}</Toast.Body>
                </Toast>

            </div>
        )
    }

    imgDetails = () => {
        if (this.state.image) {
            return (
                <Card.Subtitle className="mb-2 text-muted">
                    <ul>
                        {/* <li>File Name: {this.state.image.name}</li> */}
                        <li>File Type: {this.state.image.type}</li>
                        <li>File size: {(this.state.image.size / 1000000).toFixed(1)} MB</li>
                        <li>Inference time: {this.state.inferenceTime}</li>
                        <li>Instances: {this.state.instances}</li>
                    </ul>
                </Card.Subtitle>
            )
        }
    }

    downloadImage = () => {
        // create temporary link to download image
        const url = this.state.returnedImage
        const link = document.createElement('a');
        link.href = url;
        link.setAttribute('download', this.state.image.name);
        document.body.appendChild(link);
        link.click();
    }

    loading = () => {
        if (this.state.loading) {
            return (
                <Container className='pt-4'>
                    <Row className="justify-content-md-center">
                        <Spinner animation="grow" variant="primary" />
                        <Spinner animation="grow" variant="secondary" />
                        <Spinner animation="grow" variant="success" />
                        <Spinner animation="grow" variant="danger" />
                        <Spinner animation="grow" variant="warning" />
                        <Spinner animation="grow" variant="info" />
                        <Spinner animation="grow" variant="dark" />
                    </Row>
                </Container>
            )
        }

        if (this.state.errorMessage) {
            return (
                this.displayErrorMessage(this.state.errorMessage)
            )
        }
    }


    render() {

        const imgDisplay = (
            <div className='pt-4 shadow-lg'>
                <Card border="warning" bg="light">
                    <Card.Header className="logo text-center bg-light">
                        <h5>Analysed image</h5>
                        <Button variant="Warning" size="lg" type="button" onClick={this.downloadImage}>
                            <FontAwesomeIcon icon={faCloudDownloadAlt} size="lg" />
                        </Button>
                    </Card.Header>
                    <Card.Body>
                        <img alt="asdfasdfs" src={this.state.returnedImage} style={{ maxWidth: '98%' }} />
                    </Card.Body>
                </Card>
            </div>
        )


        return (
            <div>
                <div>
                    <Card border="info" bg="light" className='shadow-lg'>
                        <Card.Header className="logo text-center text-white bg-info"><h5>Upload image</h5></Card.Header>
                        <Card.Body>
                            <Form onSubmit={this.onSubmit}>
                                <Form.Group controlId="name">
                                    <Form.Label className="logo">Image</Form.Label>
                                    <Form.Control name="image" type="file" onChange={this.onImageChange} />
                                </Form.Group>
                                <Button variant="info" type="button" onClick={this.onImageUpload} >Upload</Button>
                            </Form>
                        </Card.Body>
                        {this.state.image ? this.imgDetails() : null}
                    </Card>


                </div>
                <div>
                    {this.state.returnedImage ? imgDisplay : this.loading()}
                </div>
            </div>

        )
    }
}
