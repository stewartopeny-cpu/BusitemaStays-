import {eq} from "drizzle-orm";
import {getDb} from "../../../../db";
import {bookings} from "../../../../db/schema";

function canonicalUgandanPhone(value:string){
 const digits=value.replace(/\D/g,"");
 if(digits.startsWith("256")&&digits.length===12)return `0${digits.slice(3)}`;
 if(digits.length===10&&digits.startsWith("0"))return digits;
 return "";
}

export async function POST(request:Request){
 try{
  const body=await request.json() as Record<string,string>;
  const reference=body.reference?.trim().toUpperCase();
  const phone=canonicalUgandanPhone(body.phone||"");
  if(!reference||!phone)return Response.json({error:"Enter your booking reference and Ugandan phone number."},{status:400});
  if(!/^(?:BHF|BST)-[A-Z0-9]{4,16}$/.test(reference))return Response.json({error:"That booking reference is not valid."},{status:400});
  const booking=await getDb().select().from(bookings).where(eq(bookings.reference,reference)).get();
  if(!booking||canonicalUgandanPhone(booking.phone)!==phone)return Response.json({error:"No booking matches that reference and phone number."},{status:404});
  return Response.json({booking:{reference:booking.reference,hostelName:booking.hostelName,fullName:booking.fullName,roomType:booking.roomType,moveInDate:booking.moveInDate,status:booking.status,createdAt:booking.createdAt}});
 }catch{
  return Response.json({error:"We could not check your booking right now. Please try again."},{status:500});
 }
}
