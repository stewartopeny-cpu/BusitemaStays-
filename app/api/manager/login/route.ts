import {authenticateManager,managerCookieName,managerSessionToken} from "../../../manager-auth";

export async function POST(request:Request){
 const form=await request.formData();
 const session=await authenticateManager(String(form.get("username")||""),String(form.get("password")||""));
 if(!session)return Response.redirect(new URL("/manager/login?error=1",request.url),303);
 return new Response(null,{status:303,headers:{
  Location:new URL("/manager",request.url).toString(),
  "Set-Cookie":`${managerCookieName}=${await managerSessionToken(session)}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=604800`,
 }});
}
