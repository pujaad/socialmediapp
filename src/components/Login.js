import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { auth } from '../firebase/services';
import sociallogo from '../assets/sociallogo.png';
import book from "../assets/book.png";
import flower from "../assets/flower.png";
import girl from "../assets/girl.png";
import green from "../assets/green.png";
import pic from "../assets/pic.png";
import pinkflower from "../assets/pinkflower.png";
import sky from "../assets/sky.png";

const Login = () => {
    const handleGoogleLogin = async () => {
      const provider = new GoogleAuthProvider();
      provider.setCustomParameters({
        prompt: 'select_account'
      });

      try {
        console.log("Attempting to sign in...");
        const result = await signInWithPopup(auth, provider);
        console.log("Sign in successful:", result.user);
      } catch (error) {
        console.error("Error code:", error.code);
        console.error("Error message:", error.message);
        if (error.code === 'auth/popup-blocked') {
          alert('Please enable popups for this website');
        } else if (error.code === 'auth/cancelled-popup-request') {
          console.log('Sign-in cancelled by user');
        } else {
          alert(`Sign-in error: ${error.message}`);
        }
      }
    };

  return (
    <div className="login-container">
      <div className="login-content">
        <div className='images-grid'>
          <img src={book} alt="book" />
          <img src={flower} alt="flower" />
          <img src={girl} alt="girl" />
          <img src={green} alt="green" />
          <img src={pic} alt="pic" />
          <img src={pinkflower} alt="pinkflower" />
          <img src={sky} alt="sky" />
        </div>
        <div className="login-box">
          <div className="logo-container">
            <img src={sociallogo} alt="Vibesnap Logo" className="vibesnap-logo" />
            <h1 className="app-name">Vibesnap</h1>
          </div>
          <p className="tagline">Moments That Matter, Shared Forever.</p>
          <button className="google-login-btn" onClick={handleGoogleLogin}>
            <img 
              src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" 
              alt="Google" 
            />
            Continue with Google
          </button>
        </div>
      </div>
    </div>
  );
}

export default Login; 