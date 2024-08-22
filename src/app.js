const express = require("express");
const app = express();
const pastes = require("./data/pastes-data");

app.use(express.json());


// TODO: Follow instructions in the checkpoint to implement ths API.
// New middleware function to validate the request body
function bodyHasTextProperty(req, res, next) {
  const { data: { text } = {} } = req.body;
  if (text) {
    return next();
  }
  next({status: 400, message: "A 'text' property is required."});
  // using the status property here because the default error handler
    // for Express sets res.statusCode to the value stored in error.status.
}

let lastPasteId = pastes.reduce((maxId, paste) => Math.max(maxId, paste.id), 0);

app.post("/pastes", bodyHasTextProperty, (req, res) => {
      // Route handler no longer has validation code.
      const { data: { name, syntax, exposure, expiration, text, user_id } = {} } = req.body;
      const newPaste = {
        id: ++lastPasteId, // Increment last id then assign as the current ID
        name,
        syntax,
        exposure,
        expiration,
        text,
        user_id,
      };
      pastes.push(newPaste);
      res.status(201).json({ data: newPaste });
    }
);

app.use("/pastes/:pasteId", (req, res, next) => {
    const { pasteId } = req.params;
    const foundPaste = pastes.find((paste) => paste.id === Number(pasteId));

    if (foundPaste) {
        res.json({ data: foundPaste });
    } else {
        next({ status: 404, message: `Paste id not found: ${pasteId}` });
    }
});

app.get("/pastes", (req, res) => {
    res.json({ data: pastes });
});

// Not found handler
app.use((request, response, next) => {
  next(`Not found: ${request.originalUrl}`);
});

// Error handler
app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

module.exports = app;
