import {eq} from "drizzle-orm";
import {getDb} from "../../../../db";
import {managerAccounts} from "../../../../db/schema";
import {createPasswordRecord,getManagerSession} from "../../../manager-auth";

export async function POST(request:Request){
 const session=await getManagerSession();
 if(!session||session.role!=="admin")return Response.json({error:"Administrator access required."},{status:403});
 const body=await request.json() as {username?:string;displayName?:string;hostelName?:string;password?:string};
 const username=String(body.username||"").trim().toLowerCase(),displayName=String(body.displayName||"").trim(),hostelName=String(body.hostelName||"").trim(),password=String(body.password||"");
 if(!/^[a-z0-9._-]{3,30}$/.test(username))return Response.json({error:"Use 3 to 30 letters, numbers, dots, dashes or underscores for the username."},{status:400});
 if(displayName.length<2||hostelName.length<3)return Response.json({error:"Enter the manager name and assigned hostel."},{status:400});
 if(password.length<10)return Response.json({error:"Use a password with at least 10 characters."},{status:400});
 const passwordRecord=await createPasswordRecord(password);
 try{
  const [account]=await getDb().insert(managerAccounts).values({username,displayName,hostelName,role:"manager",...passwordRecord}).returning();
  return Response.json({ok:true,account:{id:account.id,username,displayName,hostelName,active:1}},{status:201});
 }catch{return Response.json({error:"That username already exists."},{status:409})}
}

export async function PATCH(request:Request){
 const session=await getManagerSession();
 if(!session||session.role!=="admin")return Response.json({error:"Administrator access required."},{status:403});
 const body=await request.json() as {id?:number;active?:boolean;password?:string};
 if(!body.id)return Response.json({error:"Account id is required."},{status:400});
 if(body.password){
  if(body.password.length<10)return Response.json({error:"Use a password with at least 10 characters."},{status:400});
  const record=await createPasswordRecord(body.password);
  await getDb().update(managerAccounts).set(record).where(eq(managerAccounts.id,body.id));
 }else await getDb().update(managerAccounts).set({active:body.active===false?0:1}).where(eq(managerAccounts.id,body.id));
 return Response.json({ok:true});
}

