"use client";
import { FormEvent, useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, Phone, ShieldCheck, UserRound } from "lucide-react";

type Profile = { fullName: string; phone: string; email: string };

export default function StudentLogin() {
  const [error, setError] = useState("");
  useEffect(() => {
    try {
      if (localStorage.getItem("busitema-student-profile"))
        window.location.replace("/");
    } catch {}
  }, []);
  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");
    const form = new FormData(event.currentTarget),
      profile: Profile = {
        fullName: String(form.get("fullName") || "").trim(),
        phone: String(form.get("phone") || "").trim(),
        email: String(form.get("email") || "")
          .trim()
          .toLowerCase(),
      };
    if (profile.fullName.length < 3) return setError("Enter your full name.");
    if (!/^(?:\+256|0)\d{9}$/.test(profile.phone.replace(/[\s-]/g, "")))
      return setError("Enter a valid Ugandan phone number.");
    if (!/^\S+@\S+\.\S+$/.test(profile.email))
      return setError("Enter a valid email address.");
    localStorage.setItem("busitema-student-profile", JSON.stringify(profile));
    window.location.replace("/");
  };
  return (
    <main className="student-login-page">
      <section className="student-login-shell">
        <div className="student-login-visual">
          <div className="student-login-brand student-login-brand-light">
            <img src="/busitema-hostel-finder-logo-gold.png" alt="Busitema Stays" />
          </div>
          <div className="login-visual-copy">
            <span>STUDENT HOSTEL FINDER</span>
            <h2>A better room is closer than you think.</h2>
            <p>Compare verified hostels, services and semester prices around Busitema University.</p>
            <div className="login-trust-points">
              <span><CheckCircle2 /> Real hostel photos</span>
              <span><CheckCircle2 /> Quick booking requests</span>
            </div>
          </div>
        </div>
        <section className="student-login-card">
          <div className="student-login-brand student-login-brand-mobile">
            <img src="/busitema-hostel-finder-logo-gold.png" alt="Busitema Stays" />
          </div>
          <span className="login-kicker">WELCOME</span>
          <h1>Welcome to Busitema Stays</h1>
          <p>Enter your details once to start finding and booking your ideal hostel.</p>
          <form onSubmit={submit}>
            <label>
              <span><UserRound /> Full name</span>
              <input name="fullName" autoComplete="name" placeholder="Enter your full name" required />
            </label>
            <label>
              <span><Phone /> Contact number</span>
              <input name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="e.g. 0773 351 738" required />
            </label>
            <label>
              <span><Mail /> Email address</span>
              <input name="email" type="email" autoComplete="email" placeholder="e.g. name@gmail.com" required />
            </label>
            {error && <div className="login-error">{error}</div>}
            <button type="submit"><span>Enter hostel finder</span><ArrowRight /></button>
          </form>
          <small><ShieldCheck /> Your details are saved on this device. When you request a room, they are securely sent to Busitema Stays and stored for booking follow-up.</small>
          <div className="manager-login-link">Are you a hostel manager? <a href="/manager">Manager access</a></div>
        </section>
      </section>
    </main>
  );
}
