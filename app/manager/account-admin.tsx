"use client";
import {FormEvent,useState} from "react";
import {KeyRound,UserPlus} from "lucide-react";

type Account={id:number;username:string;displayName:string;hostelName:string|null;active:number};
export default function AccountAdmin({initialAccounts}:{initialAccounts:Account[]}){
 const[accounts,setAccounts]=useState(initialAccounts),[notice,setNotice]=useState("");
 const create=async(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();setNotice("");const form=event.currentTarget;
  const response=await fetch("/api/manager/accounts",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(Object.fromEntries(new FormData(form)))}),result=await response.json();
  if(!response.ok)return setNotice(result.error||"Could not create the account.");
  setAccounts(current=>[...current,result.account]);setNotice("Manager account created. Give the username and password directly to the manager.");form.reset();
 };
 const toggle=async(account:Account)=>{
  const response=await fetch("/api/manager/accounts",{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({id:account.id,active:!account.active})});
  if(response.ok)setAccounts(current=>current.map(x=>x.id===account.id?{...x,active:x.active?0:1}:x));
 };
 return <section className="admin-workspace"><div className="admin-section-heading"><div><span>ADMIN ONLY</span><h2><KeyRound/>Manager accounts</h2><p>Each hostel manager sees booking requests for the hostel assigned to their account.</p></div></div>
  {notice&&<p className="admin-notice">{notice}</p>}
  <form className="admin-grid-form" onSubmit={create}>
   <label>Manager name<input name="displayName" required/></label>
   <label>Username<input name="username" minLength={3} required/></label>
   <label>Assigned hostel<input name="hostelName" required/></label>
   <label>Temporary password<input name="password" type="password" minLength={10} required/></label>
   <div className="wide admin-form-actions"><button type="submit"><UserPlus/>Create manager account</button></div>
  </form>
  <div className="admin-records"><h3>Manager accounts</h3>{accounts.length?accounts.map(account=><article key={account.id}><div><b>{account.displayName}</b><small>{account.username} · {account.hostelName}</small></div><button className={account.active?"danger":""} onClick={()=>toggle(account)}>{account.active?"Disable":"Enable"}</button></article>):<p>No separate manager accounts have been created.</p>}</div>
 </section>
}

