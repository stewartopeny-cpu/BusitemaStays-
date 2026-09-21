import {getDb} from "../../../../db";
import {hostelEdits} from "../../../../db/schema";
import {getManagerSession} from "../../../manager-auth";

const allowed=["area","distance","walk","price","roomTypes","rating","rooms","image","amenities","phone","verification","featured","available","photos","singlePrice","selfContainedPrice","details"];

export async function POST(request:Request){
 const session=await getManagerSession();
 if(!session||session.role!=="admin")return Response.json({error:"Administrator access required."},{status:403});
 const body=await request.json() as {name?:string;status?:string;payload?:Record<string,unknown>};
 const name=String(body.name||"").trim();
 if(name.length<3)return Response.json({error:"Enter the hostel name."},{status:400});
 const status=body.status==="hidden"?"hidden":"active";
 const clean=Object.fromEntries(Object.entries(body.payload||{}).filter(([key,value])=>allowed.includes(key)&&value!==""&&value!==null));
 await getDb().insert(hostelEdits).values({name,payload:JSON.stringify(clean),status,updatedBy:session.username,updatedAt:new Date().toISOString()}).onConflictDoUpdate({target:hostelEdits.name,set:{payload:JSON.stringify(clean),status,updatedBy:session.username,updatedAt:new Date().toISOString()}});
 return Response.json({ok:true,edit:{name,status,payload:clean}});
}

export async function DELETE(request:Request){
 const session=await getManagerSession();
 if(!session||session.role!=="admin")return Response.json({error:"Administrator access required."},{status:403});
 const name=new URL(request.url).searchParams.get("name")?.trim();
 if(!name)return Response.json({error:"Hostel name is required."},{status:400});
 await getDb().insert(hostelEdits).values({name,payload:"{}",status:"hidden",updatedBy:session.username,updatedAt:new Date().toISOString()}).onConflictDoUpdate({target:hostelEdits.name,set:{status:"hidden",updatedBy:session.username,updatedAt:new Date().toISOString()}});
 return Response.json({ok:true});
}
