import {eq} from "drizzle-orm";
import {getDb} from "../../../../db";
import {bookings} from "../../../../db/schema";
import {escapeHtml,sendEmail} from "../../../../lib/email";
import {getManagerSession} from "../../../manager-auth";

export async function PATCH(request:Request){
 const session=await getManagerSession();
 if(!session)return Response.json({error:"Forbidden"},{status:403});
 const b=await request.json() as {id?:number;status?:string};
 if(!b.id||!["pending","confirmed","rejected"].includes(b.status||""))return Response.json({error:"Invalid update"},{status:400});
 const [booking]=await getDb().select().from(bookings).where(eq(bookings.id,b.id)).limit(1);
 if(!booking)return Response.json({error:"Request not found"},{status:404});
 if(session.role!=="admin"&&booking.hostelName!==session.hostelName)return Response.json({error:"Forbidden"},{status:403});
 await getDb().update(bookings).set({status:b.status}).where(eq(bookings.id,b.id));
 let emailSent=false;
 if(booking.email&&(b.status==="confirmed"||b.status==="rejected")){
  const confirmed=b.status==="confirmed";
  const result=await sendEmail({to:booking.email,subject:`Your hostel request ${booking.reference} was ${b.status}`,html:`<h2>${confirmed?"Your room request is confirmed":"Update about your room request"}</h2><p>Hello ${escapeHtml(booking.fullName)},</p><p>${confirmed?`Your request for a ${escapeHtml(booking.roomType)} room at <strong>${escapeHtml(booking.hostelName)}</strong> has been confirmed. Contact the hostel manager to verify the official payment details before sending money.`:`Your request for a ${escapeHtml(booking.roomType)} room at <strong>${escapeHtml(booking.hostelName)}</strong> could not be confirmed at this time.`}</p><p>Reference: <strong>${escapeHtml(booking.reference)}</strong></p><p>Busitema Stays</p>`});
  emailSent=result.sent;
 }
 return Response.json({ok:true,emailSent,emailSkipped:!booking.email||b.status==="pending"});
}
