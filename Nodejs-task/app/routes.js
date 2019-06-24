var userCtrl = require("./user/user.controller");

module.exports = function(app) {
    
    app.post("/api/loginUser",userCtrl.loginUser);
    app.post("api/signupDetails",userCtrl.UserSignup);
    
    app.post("/api/createUserDetails", userCtrl.addDetails);
	
    app.get("/api/getDetails",  userCtrl.getAllUsersDetails);
	app.get(/api/getSingleDetails",userCtrl.getSingleUser)
    app.put("/api/updateDetails", userCtrl.updateUser);
    app.delete("/api/deleteUser", userCtrl.deleteUser);
        return app;
}
