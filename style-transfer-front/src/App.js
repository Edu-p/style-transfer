/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable react-hooks/rules-of-hooks */
import "./App.css";
import { useState } from "react";
import { Col, Row } from "react-bootstrap";
import cachorro1 from "./img/cachorro-alguma-raça.jpg";
import cachorro2 from "./img/cachorro-feliz.jpg";
import cachorro3 from "./img/cachorro-fofo.png";
import cachorro4 from "./img/cachorro-golden.jpg";
import estilo1 from "./img/estilo-1.jpg";
import estilo2 from "./img/estilo-2.jpg";
import estilo3 from "./img/estilo-3.jpg";
import estilo4 from "./img/estilo-4.jpg";
import BusyIndicator from "./BusyIndicator";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCloud,
  faCamera,
  faCheck,
} from "@fortawesome/free-solid-svg-icons";
import Webcam from "react-webcam";
import API from "./API.js";
import imageToBase64 from "image-to-base64/browser";

function App() {
  const [selectModel, setSelectModel] = useState(1)
  const [image, setImage] = useState(cachorro1);
  const [style, setStyle] = useState(estilo1);
  const [webcam, setWebcam] = useState(false);
  const [output, setOutput] = useState();
  const [loading, setLoading] = useState(false);

  // upar arquivo do cliente
  const onSelectFile = (e) => {
    if (!e.target.files || e.target.files.length === 0) {
      setImage(undefined);
      return;
    }
    setImage(URL.createObjectURL(e.target.files[0]));
  };

  // configurações da webcam
  const videoConstraints = {
    width: 300,
    height: 300,
    facingMode: "user",
  };

  // mandar para o servidor a imagem e o estilo escolhido 
  const submit = () => {
    console.log(selectModel);
    imageToBase64(image) // Path to the image
      .then((response) => {
        API.post("/vector_image", {
          num: selectModel,
          img: "data:image/jpeg;base64," + response,
        withCredentials: true,
        })
          .then((res) => {
            setLoading(false);
            console.log(res);
            res.data && setOutput(res.data);
          })
          .catch((error) => {
            console.log(error);
          });
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  };

  return (
    <div className="App">
      <div className="wrapper d-flex">
        <h2>Style Transfer Example</h2>
        <Row className="w-100 d-flex jc-space-around content-container">
          <div className="style-image-inputs">
          <Col className="col-3 row-1">
            <div className="box">
              <div className="description">
                <h2>Input</h2>
                {webcam ? (
                  <Webcam
                    audio={false}
                    screenshotFormat="image/jpeg"
                    videoConstraints={videoConstraints}
                  >
                    {({ getScreenshot }) => (
                      <>
                        {" "}
                        <Row className="d-flex jc-space-around">
                          <Col>
                            {" "}
                            <div className="input-group">
                              <div className="custom-file">
                                <label
                                  className="custom-file-label"
                                  onClick={() => {
                                    setImage(getScreenshot());
                                    setWebcam(!webcam);
                                  }}
                                >
                                  Capture photo
                                </label>
                              </div>
                            </div>
                          </Col>
                          <Col>
                            {" "}
                            <div className="input-group">
                              <div className="custom-file">
                                <label
                                  className="custom-file-label"
                                  onClick={() => setWebcam(!webcam)}
                                >
                                  Hidden webcam
                                </label>
                              </div>
                            </div>
                          </Col>
                        </Row>
                      </>
                    )}
                  </Webcam>
                ) : (
                  <img src={image} className="crop-fit main-image" />
                )}
                <Row className="d-flex">
                  <Col>
                    <img
                      src={cachorro1}
                      className="thumbnail crop-fit c-pointer"
                      onClick={() => setImage(cachorro1)}
                    />
                  </Col>
                  <Col>
                    <img
                      src={cachorro2}
                      className="thumbnail crop-fit c-pointer"
                      onClick={() => setImage(cachorro2)}
                    />
                  </Col>
                </Row>
                <Row className="d-flex">
                  <Col>
                    <img
                      src={cachorro3}
                      className="thumbnail crop-fit c-pointer"
                      onClick={() => setImage(cachorro3)}
                    />
                  </Col>
                  <Col>
                    <img
                      src={cachorro4}
                      className="thumbnail crop-fit c-pointer"
                      onClick={() => {setImage(cachorro4)
                      }}
                    />
                  </Col>
                </Row>
                <Row className="d-flex jc-space-around align-items-center">
                  <Col>
                    <div className="input-group">
                      <div className="custom-file">
                        <input
                          type="file"
                          className="custom-file-input"
                          id="upload"
                          onChange={onSelectFile}
                        />
                        <label className="custom-file-label" htmlFor="upload">
                          <FontAwesomeIcon icon={faCloud} className="mr-1" />
                          File
                        </label>
                      </div>
                    </div>
                  </Col>
                  <Col>
                    <div className="input-group">
                      <div className="custom-file">
                        <label
                          className="custom-file-label"
                          onClick={() => setWebcam(!webcam)}
                        >
                          <FontAwesomeIcon icon={faCamera} className="mr-1" />
                          Webcam
                        </label>
                      </div>
                    </div>
                  </Col>
                </Row>
                {/* <Row>
                  <div className="input-group">
                    <div className="custom-file">
                      <label className="custom-file-label">
                        <FontAwesomeIcon icon={faUpload} className="mr-1" />
                        Transfer my image/video
                      </label>
                      <p>
                        Click this button to start transfering your own image or
                        video. If you are using webcam, you might need to wait
                        for 3s / frame.
                      </p>
                    </div>
                  </div>
                </Row> */}
              </div>
            </div>
          </Col>
          <Col className="col-3 row-1">
            <div className="box">
              <div className="description">
                <h2>Style</h2>
                <img src={style} className="crop-fit main-image" />
                <Row className="d-flex jc-space-around">
                  <Col>
                    <img
                      src={estilo1}
                      className="thumbnail crop-fit c-pointer"
                      onClick={() => {setStyle(estilo1)
                      setSelectModel(1)
                      }}
                    />
                  </Col>
                  <Col>
                    <img
                      src={estilo2}
                      className="thumbnail crop-fit c-pointer"
                      onClick={() => {setStyle(estilo2)
                        setSelectModel(2)
                        }}
                    />
                  </Col>
                </Row>
                <Row className="d-flex jc-space-around">
                  <Col>
                    <img
                      src={estilo3}
                      className="thumbnail crop-fit c-pointer"
                      onClick={() => {setStyle(estilo3)
                        setSelectModel(3)
                        }}
                    />
                  </Col>
                  <Col>
                    <img
                      src={estilo4}
                      className="thumbnail crop-fit c-pointer"
                      onClick={() => {setStyle(estilo4)
                        setSelectModel(4)
                        }}
                    />
                  </Col>
                </Row>
                <Row>
                  <div className="input-group">
                    <div className="custom-file">
                      <label
                        className="custom-file-label"
                        onClick={() => {
                          submit();
                          setLoading(true);
                          setOutput("");
                        }}
                      >
                        <FontAwesomeIcon icon={faCheck} className="mr-1" />
                        Selec this style
                      </label>
                    </div>
                  </div>
                </Row>
              </div>
            </div>
          </Col>
          </div>
          <Col className="col-3">
            <div className="box output-container">
              <div className="description">
                <h2>Output</h2>
                {loading && <BusyIndicator />}
                {output && <img src={output} className="crop-fit main-image" />}
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default App;
