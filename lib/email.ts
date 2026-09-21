import {env} from "cloudflare:workers";

type RuntimeEnv = Record<string,string|undefined>;

export function escapeHtml(value:string){
 return value.replace(/[&<>"']/g,character=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[character]||character));
}

export async function sendEmail({to,subject,html}:{to:string;subject:string;html:string}){
 const runtime=env as unknown as RuntimeEnv;
 if(!runtime.RESEND_API_KEY)return {sent:false,error:"Email service is not configured."};
 const response=await fetch("https://api.resend.com/emails",{
  method:"POST",
  headers:{Authorization:`Bearer ${runtime.RESEND_API_KEY}`,"Content-Type":"application/json"},
  body:JSON.stringify({from:runtime.EMAIL_FROM||"Busitema Stays <onboarding@resend.dev>",to:[to],subject,html})
 });
 if(!response.ok)return {sent:false,error:"The email service rejected the message."};
 return {sent:true};
}

export function managerEmail(){
 const runtime=env as unknown as RuntimeEnv;
 return runtime.MANAGER_EMAIL||"stewartopeny@gmail.com";
}
