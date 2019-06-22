var userCtrl = require("./user/user.controller");

module.exports = function(app) {
    
    app.post("/api/loginUser",userCtrl.Logining);
    app.post("api/signupDetails",userCtrl.signupDetails);
    
    app.post("/api/updateDetails", userCtrl.updateDetails);
    app.get("/api/getDetails",  userCtrl.getDetails);
    app.put("/api/updateDetails", userCtrl.updateDetails);
    app.delete("/api/deleteUser", userCtrl.deleteUser);
        return app;
}