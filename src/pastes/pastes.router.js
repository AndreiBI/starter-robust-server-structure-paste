const router = require("express").Router( {mergeParams: true} );
const controller = require("./pastes.controller");
// const methodNotAllowed = require("../errors/methodNotAllowed");

router.route("/").get(controller.list).post(controller.create);
router.route("/:pasteId").get(controller.read);

/*
router.route("/:pasteId").get(controller.read).put(controller.update).delete(controller.delete).all(methodNotAllowed);
 */

module.exports = router;
