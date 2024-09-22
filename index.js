const express = require("express");
const tesseract = require("tesseract.js");
const bodyParser = require("body-parser");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

// Helper function to decode base64 image
const decodeBase64Image = (dataString) => {
  const matches = dataString.match(/^data:image\/([A-Za-z-+/]+);base64,(.+)$/);
  if (!matches || matches.length !== 3) {
    return new Error("Invalid base64 string");
  }
  return Buffer.from(matches[2], "base64");
};

// Error handling function
const handleInvalidImage = (res, message) => {
  return res.status(400).json({
    success: false,
    error: {
      message,
    },
  });
};

// API to get text from image
app.post("/api/get-text", async (req, res) => {
  const { base64_image } = req.body;

  // Check if base64_image is valid
  if (!base64_image) {
    return handleInvalidImage(res, "Invalid base64_image.");
  }

  try {
    const imageBuffer = decodeBase64Image(base64_image);

    if (imageBuffer instanceof Error) {
      return handleInvalidImage(res, "Invalid base64_image.");
    }

    // Use Tesseract to recognize text from the image
    const result = await tesseract.recognize(imageBuffer);
    return res.json({
      success: true,
      result: {
        text: result.data.text,
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        message: error.message,
      },
    });
  }
});

// API to get bounding boxes
app.post("/api/get-bboxes", async (req, res) => {
  const { base64_image, bbox_type } = req.body;

  // Check if base64_image and bbox_type are valid
  if (!base64_image || !bbox_type) {
    return handleInvalidImage(res, "Invalid base64_image or bbox_type.");
  }

  // Check for valid bbox_type
  const validBBoxTypes = ["word", "line", "paragraph", "block", "page"];
  if (!validBBoxTypes.includes(bbox_type)) {
    return res.status(400).json({
      success: false,
      error: {
        message: "Invalid bbox_type.",
      },
    });
  }

  try {
    const imageBuffer = decodeBase64Image(base64_image);

    if (imageBuffer instanceof Error) {
      return handleInvalidImage(res, "Invalid base64_image.");
    }

    // Use Tesseract to recognize bounding boxes from the image
    const result = await tesseract.recognize(imageBuffer, {
      tessedit_char_whitelist: bbox_type,
    });
    return res.json({
      success: true,
      result: {
        bboxes: result.data.words.map((word) => ({
          x_min: word.bbox.x0,
          y_min: word.bbox.y0,
          x_max: word.bbox.x1,
          y_max: word.bbox.y1,
        })),
      },
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      error: {
        message: error.message,
      },
    });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
