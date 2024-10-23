import React, { useEffect, useRef, useState } from "react";
import * as fabric from "fabric";
import "./EditPage.css";

function EditPage({ image }) {
  const [canvas, setCanvas] = useState(null);
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);

  useEffect(() => {
    if (!image) {
      console.log("image not available");
    } else {
      console.log("image", image);
    }

    const canvasElement = canvasRef.current;
    if (!canvasElement) {
      console.error("canvas element not available");
      return;
    }

    const fabricCanvas = new fabric.Canvas(canvasElement, {
      width: 800,
      height: 500,
    });

    fabricCanvasRef.current = fabricCanvas;
    setCanvas(fabricCanvas);

    try {
      fabric.Image.fromURL(image, (img) => {
        console.log("image inside fabric", image);
        img.scaleToWidth(1000);
        fabricCanvas.add(img);
        fabricCanvas.renderAll();
        logCanvasLayers(fabricCanvas); // Log layers after adding the image
      });
    } catch (error) {
      console.error("error loading image with fabric", error);
    }

    return () => {
      fabricCanvas.dispose();
    };
  }, [image]);

  // Function to log all canvas layers and their attributes
  const logCanvasLayers = (canvas) => {
    const objects = canvas.getObjects();
    const layers = objects.map((obj) => {
      let attributes = {
        type: obj.type,
        left: obj.left,
        top: obj.top,
        width: obj.width,
        height: obj.height,
        scaleX: obj.scaleX,
        scaleY: obj.scaleY,
        angle: obj.angle,
      };

      if (obj.type === "image") {
        attributes.src = obj.getSrc(); 
      } else if (obj.type === "textbox") {
        attributes.text = obj.text; 
        attributes.fontSize = obj.fontSize;
        attributes.fill = obj.fill;
      }

      return attributes;
    });

    console.log("Canvas Layers:", layers);
  };

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
    logCanvasLayers(fabricCanvas); 
  };

  const addShape = (shapeType) => {
    const fabricCanvas = fabricCanvasRef.current;
    let shape;
    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "yellow",
          left: 250,
          top: 150,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 60,
          fill: "red",
          left: 150,
          top: 150,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "black",
          left: 150,
          top: 150,
        });
        break;
      default:
        return;
    }
    fabricCanvas.add(shape);
    fabricCanvas.renderAll();
    logCanvasLayers(fabricCanvas);
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
      <h1>Edit Your Image</h1>
      <canvas ref={canvasRef}></canvas>
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
