package backend.nvt.DTO;

public class UserResponse {
    private String email;
    private String userRole;
    private String firstname;
    private String lastname;
    private String phone;
    private String profilePic;

    public UserResponse(String email, String userRole, String firstname, String lastname, String phone, String profilePic) {
        this.email = email;
        this.userRole = userRole;
        this.firstname = firstname;
        this.lastname = lastname;
        this.phone = phone;
        this.profilePic = profilePic;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getUserRole() {
        return userRole;
    }

    public void setUserRole(String userRole) {
        this.userRole = userRole;
    }

    public String getFirstname() {
        return firstname;
    }

    public void setFirstname(String firstname) {
        this.firstname = firstname;
    }

    public String getLastname() {
        return lastname;
    }

    public void setLastname(String lastname) {
        this.lastname = lastname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getProfilePic() {
        return profilePic;
    }

    public void setProfilePic(String profilePic) {
        this.profilePic = profilePic;
    }
}
