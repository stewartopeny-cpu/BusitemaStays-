"use client";
import {FormEvent,useState} from "react";
import Link from "next/link";
import {BadgeCheck,BedSingle,Clock,MapPin,Search,ShieldCheck} from "lucide-react";

type TrackedBooking={reference:string;hostelName:string;fullName:string;roomType:string;moveInDate:string;status:string;createdAt:string};

export default function StudentBookings(){
 const[booking,setBooking]=useState<TrackedBooking|null>(null);
 const[error,setError]=useState("");
 const[loading,setLoading]=useState(false);
 const submit=async(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();setLoading(true);setError("");setBooking(null);
  try{
   const form=new FormData(event.currentTarget);
   const response=await fetch("/api/bookings/track",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({reference:form.get("reference"),phone:form.get("phone")})});
   const data=await response.json();
   if(!response.ok)throw new Error(data.error||"Booking not found.");
   setBooking(data.booking);
  }catch(reason){setError(reason instanceof Error?reason.message:"Booking not found.")}finally{setLoading(false)}
 };
 const statusCopy=booking?.status==="confirmed"
  ?{title:"Your room is confirmed",text:"Contact the hostel manager and verify the payment instructions before sending money.",icon:<BadgeCheck/>}
  :booking?.status==="rejected"
   ?{title:"This room was unavailable",text:"Search for another hostel or request a different room type.",icon:<ShieldCheck/>}
   :{title:"Waiting for the hostel",text:"The manager is reviewing room availability. Do not pay yet.",icon:<Clock/>};
 return <main className="student-shell">
  <header className="student-nav"><Link href="/"><img className="nav-logo-mark" src="/logo-mark.svg" alt=""/>Busitema Stays</Link><Link href="/#hostels"><Search size={17}/>Find a hostel</Link></header>
  <section className="tracking-hero"><span>MY BOOKINGS</span><h1>Check your room request.</h1><p>No account is needed. Use the phone number from your request and the reference we gave you.</p></section>
  <section className="tracking-layout">
   <form className="tracking-form" onSubmit={submit}>
    <div><span>BOOKING LOOKUP</span><h2>Enter your details</h2></div>
    <label>Booking reference<input name="reference" required autoCapitalize="characters" placeholder="e.g. BST-A1B2C3D4E5"/></label>
    <label>Phone number<input name="phone" required inputMode="tel" autoComplete="tel" placeholder="e.g. 0773351738"/></label>
    {error&&<p className="tracking-error" role="alert">{error}</p>}
    <button type="submit" disabled={loading}>{loading?"Checking…":"Check booking status"}</button>
    <small>Your reference appears after you submit a room request.</small>
   </form>
   <div className="tracking-result" aria-live="polite">
    {booking?<article className="student-booking tracked-booking">
     <div className="student-booking-top"><span className={`status ${booking.status}`}>{booking.status}</span><small>{booking.reference}</small></div>
     <h3>{booking.hostelName}</h3><p><BedSingle size={15}/>{booking.roomType} room · Move in {booking.moveInDate}</p>
     <p><MapPin size={15}/>Request made by {booking.fullName}</p>
     <div className="student-next">{statusCopy.icon}<span><b>{statusCopy.title}</b>{statusCopy.text}</span></div>
    </article>:<div className="tracking-placeholder"><Search/><h2>Your booking status will appear here</h2><p>Enter the exact phone number and reference used for your request.</p></div>}
   </div>
  </section>
  <section className="tracking-safety"><ShieldCheck/><div><b>Before you pay</b><p>Wait for confirmation, verify the manager and payment number, and check the exact room allocated to you.</p></div></section>
 </main>
}
