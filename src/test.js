/*

// New middleware function to validate the request body
function bodyHasTextProperty(req, res, next) {
    const { data: { text } = {} } = req.body;
    if (text) {
        return next();
    }
    next({status: 400, message: "A 'text' property is required."});
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

app.use((error, req, res, next) => {
    console.error(error);
    const { status = 500, message = "Something went wrong!" } = error;
    res.status(status).json({ error: message });
});

 */