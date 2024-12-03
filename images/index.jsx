
import { useState } from "react";
import styles from "./login.module.css";
//import toast from "react-hot-toast";
import { login } from "../../services";
import { uploads } from "../../services";
import logo from "../../assets/site_logo.png"
import badges from "../../assets/app_store_badges.png"
import facebook from "../../assets/Facebook_icon.png"
import instagram from "../../assets/Instagram_icon.png"
import tiktok from "../../assets/TikTok_icon.png"
import snapchat from "../../assets/Snapchat_icon.png"
import footerLogo from "../../assets/footer_logo.png"
import { useNavigate } from "react-router-dom";
import '../../components/FooterSection';

export default function Login() {
    const [formData, setFormData] = useState({
        email: "",
        password: "",
    })
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    const [formErrors, setFormErrors] = useState({
        email: null,
        password: null,
    })

    const handleLogin = async (e) => {
        e.preventDefault()
        let errors = false;
        setFormErrors((formErrors) => { return { ...formErrors, email: null, password: null } })
        if (!formData.email || formData.email.length < 1 || !formData.email.includes("@") || !formData.email.includes(".")) {
            setFormErrors((formErrors) => { return { ...formErrors, email: "Email is invalid" } })
            errors = true
        }
        if (!formData.password || formData.password.length < 8) {
            setFormErrors((formErrors) => { return { ...formErrors, password: "Password is required" } })
            errors = true
        }
        if (errors) {
            return

        }
        try {
            setLoading(() => true)
            console.log(true)
            //const response = await login(formData)
            //toast.success(response.message)
            console.log(response);
            if (response.token !== null) {
                localStorage.setItem("token", response.token)
                navigate("/home")
            }
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(() => false)
        }
    };

    const imageUrl = uploads("login_image.png");

    return (
        <div>
            <div className={styles.loginPage}>
                <div className={styles.leftside}>
                    <header>
                        <img src={logo} alt="Main Logo" className={styles.main_logo} /><br />
                        <h1 className={styles.h1line}>Welcome Back 👋</h1><br />
                        <p className={styles.headp}>
                            Today is a new day. It's your day. You shape it. <br />
                            Sign in to start ordering.
                        </p>
                        <br />
                    </header>
                    <form className={styles.form} onSubmit={handleLogin}>
                        <label className={styles.lbl} htmlFor="email">Email</label>
                        <input id={styles.email} value={formData.email} type="text" placeholder="Example@email.com" onChange={(e) =>
                            setFormData({ ...formData, email: e.target.value })} />
                        {formErrors.email && <p className={styles.error}>{formErrors.email}</p>}
                        <label className={styles.lbl} htmlFor="password">Password</label>
                        <input id={styles.password} value={formData.password} type="password" placeholder="At least 8 characters" onChange={(e) =>
                            setFormData({ ...formData, password: e.target.value })} />
                        {formErrors.password && <p className={styles.error}>{formErrors.password}</p>}
                        <br />
                        <button className={styles.signBtn} disabled={loading} type="submit">{loading ? "Loading.." : "Sign In"}</button>
                        {/*<p>Already have an account? <Link to="./signin" style={{ color: "orange"}}>Sign in</Link></p> */}
                        <br />
                        <p className={styles.bottom_line}>
                            Don't you have an account? &nbsp;
                            <span
                                className={styles.underline}
                                onClick={() => navigate("/register")}
                            >
                                Sign up
                            </span>
                        </p>
                    </form>
                </div>

                <div className={styles.rightside}>
                    <img src={imageUrl} alt="Login image" className={styles.login_image_1} />
                </div>
            </div>
            <br/>
            <div className={styles.footer}>
                <div className="fcolumn_1">
                    <img src={footerLogo} alt="footer logo" className="flogo" /> <br /><br />
                    <img src={badges} alt="app store link" className="badges" /><br /><br />
                    <p>
                        Company # 490039-445, Registered with <br />
                        House of companies.
                    </p>
                </div>
                <div className="fcolumn_2">
                    <h4>Get Exclusive Deals in your inbox</h4> <br />
                    <input className={styles.subscribe_bar} name="email" type="email" placeholder="youremail@gmail.com" />
                    <button className={styles.subscribe_btn} type="submit">Subscribe</button> <br />
                    <p>we wont spam, read our <a href="#" onClick="return false;">email policy</a></p><br />
                    <img src={facebook} alt="facebook" />
                    <img src={instagram} alt="Instagram" />
                    <img src={tiktok} alt="Tiktok" />
                    <img src={snapchat} alt="Snapchat" />
                </div>
                <div className="fcolumn_3">
                    <h4>Legal Pages</h4> <br />
                    <a href="#" onClick="return false;">Terms and conditions</a> <br /><br />
                    <a href="#" onClick="return false;">Privacy</a> <br /><br />
                    <a href="#" onClick="return false;">Cookies</a> <br /><br />
                    <a href="#" onClick="return false;">Modern Slavery Statement</a>
                </div>
                <div className="fcolumn_4">
                    <h4>Important Links</h4> <br />
                    <a href="#" onClick="return false;">Get help</a> <br /><br />
                    <a href="#" onClick="return false;">Add your restaurant</a> <br /><br />
                    <a href="#" onClick="return false;">Sign up to delivary</a> <br /><br />
                    <a href="#" onClick="return false;">Create a bussiness account</a>
                </div>
            </div>
            <footer className="copyrightprivacy">
                <div className="copyright">Order.uk Copyright 2024, All Rights Reserved.</div>
                <div className="privacylinks">
                    <a href="#" onClick="return false;">Privacy Policy</a>
                    <a href="#" onClick="return false;">Terms</a>
                    <a href="#" onClick="return false;">Pricing</a>
                    <a href="#" onClick="return false;">Do not sell or share my personal information</a>
                </div>
            </footer>
        </div>
    )
}