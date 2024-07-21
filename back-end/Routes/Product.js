const express=require("express");
const router=express.Router();
//REQUIRE FUNCTIONS FROM CONTROLLERS
const{HomepageGetRequest, UserRegister, UserLogin, singleUser, updateUser, AllUsers, setStatus, addMessage, displayMessage}=require('../Controllers/Product');
//RESTFUL APIs
router.route("/").get(HomepageGetRequest);
router.route("/Register").post(UserRegister);
router.route("/Login").post(UserLogin);
router.route("/SingleUser/:id").get(singleUser);
router.route("/UpdateUser/:id").put(updateUser);
router.route("/AllUsers").get(AllUsers);
router.route("/SetStatus/:id").put(setStatus);
router.route("/AddMessage/:id").put(addMessage);
router.route("/DisplayMessage").get(displayMessage);
module.exports=router;