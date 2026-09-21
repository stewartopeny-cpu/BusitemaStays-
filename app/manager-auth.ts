import {cookies} from "next/headers";
import {eq} from "drizzle-orm";
import {getDb} from "../db";
import {managerAccounts} from "../db/schema";

const COOKIE_NAME="busitema-manager-session";
const encoder=new TextEncoder();
const decoder=new TextDecoder();

export type ManagerSession={id:string;username:string;displayName:string;role:"admin"|"manager";hostelName:string|null;expires:number};

function secret(){return process.env.MANAGER_AUTH_SECRET||process.env.MANAGER_PASSWORD||""}
function bytesToHex(bytes:Uint8Array){return Array.from(bytes).map(x=>x.toString(16).padStart(2,"0")).join("")}
function base64Url(value:string){return btoa(String.fromCharCode(...encoder.encode(value))).replace(/\+/g,"-").replace(/\//g,"_").replace(/=+$/,"")}
function fromBase64Url(value:string){const base64=value.replace(/-/g,"+").replace(/_/g,"/");const padded=base64+"=".repeat((4-base64.length%4)%4);return decoder.decode(Uint8Array.from(atob(padded),character=>character.charCodeAt(0)))}

async function signature(value:string){
 const key=await crypto.subtle.importKey("raw",encoder.encode(secret()),{name:"HMAC",hash:"SHA-256"},false,["sign"]);
 return bytesToHex(new Uint8Array(await crypto.subtle.sign("HMAC",key,encoder.encode(value))));
}

export async function managerSessionToken(session:Omit<ManagerSession,"expires">){
 const payload=base64Url(JSON.stringify({...session,expires:Date.now()+7*24*60*60*1000}));
 return `${payload}.${await signature(payload)}`;
}

export async function getManagerSession():Promise<ManagerSession|null>{
 const token=(await cookies()).get(COOKIE_NAME)?.value;
 if(!token||!secret())return null;
 const [payload,sig]=token.split(".");
 if(!payload||!sig||sig!==await signature(payload))return null;
 try{
  const session=JSON.parse(fromBase64Url(payload)) as ManagerSession;
  if(session.expires<Date.now()||!["admin","manager"].includes(session.role))return null;
  return session;
 }catch{return null}
}

export async function isManagerAuthenticated(){return Boolean(await getManagerSession())}

async function passwordHash(password:string,saltHex:string){
 const salt=new Uint8Array((saltHex.match(/.{2}/g)||[]).map(x=>parseInt(x,16)));
 const key=await crypto.subtle.importKey("raw",encoder.encode(password),"PBKDF2",false,["deriveBits"]);
 const bits=await crypto.subtle.deriveBits({name:"PBKDF2",hash:"SHA-256",salt,iterations:120000},key,256);
 return bytesToHex(new Uint8Array(bits));
}

export async function createPasswordRecord(password:string){
 const salt=crypto.getRandomValues(new Uint8Array(16)),passwordSalt=bytesToHex(salt);
 return {passwordSalt,passwordHash:await passwordHash(password,passwordSalt)};
}

export async function authenticateManager(username:string,password:string):Promise<Omit<ManagerSession,"expires">|null>{
 const normalized=username.trim().toLowerCase();
 const configured=process.env.MANAGER_PASSWORD||"";
 // Keep the original administrator password compatible even when a browser
 // autofills a name or email into the new username field.
 if(configured.length>=8&&password===configured)
  return {id:"bootstrap-admin",username:"admin",displayName:"Stewart",role:"admin",hostelName:null};
 const [account]=await getDb().select().from(managerAccounts).where(eq(managerAccounts.username,normalized)).limit(1);
 if(!account||!account.active)return null;
 if(await passwordHash(password,account.passwordSalt)!==account.passwordHash)return null;
 return {id:String(account.id),username:account.username,displayName:account.displayName,role:account.role==="admin"?"admin":"manager",hostelName:account.hostelName};
}

export const managerCookieName=COOKIE_NAME;
