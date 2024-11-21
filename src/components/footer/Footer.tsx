import "./footer.css";
import Facebook from "../../assets/2993778_facebook_social media_icon.png";
import Instagram from "../../assets/instagram.png";
import Youtube from "../../assets/youtube.png";

function Footer() {
  return (
    <div className="footer_container">
      <div className="footer_opt_container">
        <div className="footer_Opt1">
          <p className="footer_heading">DS Cosmetics</p>
          <p>About DS Cosmetics</p>
          <p>Shops</p>
          <p>Work with us</p>
          <p>Press</p>
          <p>Privacy Policy</p>
        </div>
        <div className="footer_Opt2">
          <p className="footer_heading">Customer Service</p>
          <p>Customer Service</p>
          <p>Terms of Purchase</p>
          <p>Cookie Settings</p>
          <p>Work with us</p>
          <p>Gift Cards</p>
        </div>
        <div className="footer_Opt3">
          <p className="footer_heading">DS Club</p>
          <p>CDS Club</p>
          <p>Become A Member</p>
          <p>Membership Conditions</p>
        </div>
      </div>
      <div className="follow">
        <p className="footer_heading">Follow Us</p>
        <div className="follow_img">
        <img src={Facebook} alt="facebook" />
        <img src={Instagram} alt="instagram" />
        <img src={Youtube} alt="youtube" />
        </div>
      </div>
    </div>
  );
}

export default Footer;
