import React, { useEffect, useRef } from "react";
import * as fabric from 'fabric';
import { useNavigate } from "react-router-dom";
import './EditPage.css'; 

function EditPage({ image, goBackToSearch }) {
    const navigate = useNavigate();
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    console.log("image",image)
    const canvasElement = canvasRef.current;
    const fabricCanvas = new fabric.Canvas(canvasElement, {
      width: 1500,
      height: 500,
    });

    fabricCanvasRef.current = fabricCanvas;

    fabric.Image.fromURL(image, (img) => {
      img.scaleToWidth(1000);
      fabricCanvas.add(img);
      fabricCanvas.renderAll();
    });

    return () => {
      fabricCanvas.dispose();
    };
  }, [image]);

  const addText = () => {
    const fabricCanvas = fabricCanvasRef.current;
    const text = new fabric.Textbox("Your Caption", {
      left: 100,
      top: 100,
      width: 200,
      fontSize: 20,
      fill: "black",
    });
    fabricCanvas.add(text);
    fabricCanvas.renderAll();
  };

  const addShape = (shapeType) => {
    const fabricCanvas = fabricCanvasRef.current;
    let shape;
    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "blue",
          left: 150,
          top: 150,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: "green",
          left: 150,
          top: 150,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "yellow",
          left: 150,
          top: 150,
        });
        break;
      default:
        return;
    }
    fabricCanvas.add(shape);
    fabricCanvas.renderAll();
  };

  const downloadImage = () => {
    const fabricCanvas = fabricCanvasRef.current;
    const dataURL = fabricCanvas.toDataURL({
      format: "png",
    });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
  };

  return (
    <div className="container">
      <button className="back-button" onClick={() => navigate("/")}>
        Back to Search
      </button>
      <h1>Edit Your Image</h1>
      <div className="canvas-container">
        <canvas ref={canvasRef}></canvas>
      </div>
      <div className="buttons-container">
        <button onClick={addText}>Add Caption</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={downloadImage}>Download</button>
      </div>
    </div>
  );
}

export default EditPage;
