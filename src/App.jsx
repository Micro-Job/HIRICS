import MockUpDesktop from "@/assets/images/mackbook-desktop.png";
import MockUpMobile from "@/assets/images/mackbook-mobile.png";
import Logo from "@/assets/svg/logo.svg";
import Message from "@/assets/svg/message.svg";
import CommentsModal from "@/component/modals/CommentsModal";
import { useEffect, useState } from "react";
import "./App.css";

const LAUNCH_DATE = new Date("2026-01-08T00:00:00");

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [timeLeft, setTimeLeft] = useState({
    days: "00",
    hours: "00",
    minutes: "00",
    seconds: "00",
  });

  useEffect(() => {
    let id;

    const tick = () => {
      const now = new Date();
      const diff = LAUNCH_DATE - now;

      if (diff <= 0) {
        if (id) clearInterval(id);
        return setTimeLeft({
          days: "00",
          hours: "00",
          minutes: "00",
          seconds: "00",
        });
      }

      const days = Math.floor(diff / 86_400_000);
      const hours = Math.floor((diff / 3_600_000) % 24);
      const minutes = Math.floor((diff / 60_000) % 60);
      const seconds = Math.floor((diff / 1_000) % 60);

      setTimeLeft({
        days: String(days).padStart(2, "0"),
        hours: String(hours).padStart(2, "0"),
        minutes: String(minutes).padStart(2, "0"),
        seconds: String(seconds).padStart(2, "0"),
      });
    };

    tick(); // immediate first call
    id = setInterval(tick, 1000);
    return () => {
      if (id) clearInterval(id);
    };
  }, []); // ← now it only runs once

  return (
    <>
      <div className="content-container">
        <h2 className="background-text">hiri</h2>

        <div className="content">
          <img className="logo" src={Logo} alt="HİRİ logo" />

          <h1 className="title">HİRİ – Tezliklə Gəlirik!</h1>
          <p className="description">
            Yeni nəsil vakansiya və iş platforması ilə tanış olun. Əmək bazarını
            daha şəffaf, sürətli və innovativ edən <span>HİRİ</span> çox yaxında
            istifadəyə veriləcək!
          </p>

          <img
            src={MockUpMobile}
            alt="MacBook mockup"
            className="mockup-mobile"
          />
          <p className="countdown-info">⏳ Geri sayım başladı!</p>

          <div className="countdown">
            <div className="countdown-item">
              <span className="count">{timeLeft.days}</span>
              <span className="label">Gün</span>
            </div>
            <div className="divider" />
            <div className="countdown-item">
              <span className="count">{timeLeft.hours}</span>
              <span className="label">Saat</span>
            </div>
            <div className="divider" />
            <div className="countdown-item">
              <span className="count">{timeLeft.minutes}</span>
              <span className="label">Dəqiqə</span>
            </div>
            <div className="divider" />
            <div className="countdown-item">
              <span className="count">{timeLeft.seconds}</span>
              <span className="label">Saniyə</span>
            </div>
          </div>

          <button className="btn" onClick={() => setIsModalOpen(true)}>
            <div className="btn-icon-wrapper">
              <img src={Message} alt="message icon" className="btn-icon" />
            </div>
            Təkliflərinizi bizə bildirə bilərsiniz
          </button>
        </div>

        <img
          src={MockUpDesktop}
          alt="MacBook mockup"
          className="mockup-desktop"
        />
      </div>

      <CommentsModal open={isModalOpen} onOpenChange={setIsModalOpen} />
    </>
  );
}

export default App;
