import React from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

export default function ResetPassword(props) {

    const resetpasswordapi = '/reset-password';
    const token = sessionStorage.getItem('userData');

    let history = useHistory();

    const resetpassword = (event) => {

        var body = {
            old_password: event.target.currentpassword.value,
            new_password: event.target.newpassword.value,
            confirm_new_password: event.target.confirmpassword.value
        }

        event.preventDefault();

        axios({
            method: 'put',
            url: resetpasswordapi,
            data: body,
            headers: { "Authorization": `Bearer ${token}` }
        }).then(res => {

            alert("Password Changed Successfully");
            history.push('/userprofile');

        }).catch((err) => {
            alert("Password Does not match");
            document.getElementById("resetpassword-form").reset();
        });
    }
    return (
        <>
        <p className="resetpassword-heading">Reset Password</p>
            <div className="restepassword-div">
                
                <div className="resetpassword-form-div">
                    <form id="resetpassword-form" onSubmit={resetpassword} className="resetpassword-form">
                        <label for="newPassword">Current Password : </label>
                        <input type="password" id="newPassword" name="currentpassword" title="New password" required /><br /><br />

                        <label for="newPassword">New Password : </label>
                        <input type="password" id="newPassword" name="newpassword" title="new password" required /><br /><br />

                        <label for="confirmPassword">Confirm Password : </label>
                        <input type="password" id="confirmPassword" name="confirmpassword" title="Confirm new password" required /><br /><br />

                        <input type="submit" className="update-btn" value="Change Password" />
                    </form>
                </div>

            </div>
        </>
    );
}
