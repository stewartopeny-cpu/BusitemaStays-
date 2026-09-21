import {asc} from "drizzle-orm";
import {getDb} from "../../../db";
import {hostelEdits} from "../../../db/schema";

export async function GET(){
 try{
  const rows=await getDb().select().from(hostelEdits).orderBy(asc(hostelEdits.name));
  return Response.json({edits:rows.map(row=>({name:row.name,status:row.status,payload:JSON.parse(row.payload)}))});
 }catch{
  return Response.json({edits:[]});
 }
}

