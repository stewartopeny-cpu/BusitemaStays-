import {managerCookieName} from "../../../manager-auth";

export async function GET(request:Request){
 return new Response(null,{status:303,headers:{
  Location:new URL("/",request.url).toString(),
  "Set-Cookie":`${managerCookieName}=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0`,
 }});
}
