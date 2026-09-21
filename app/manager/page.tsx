import {desc,eq} from "drizzle-orm";
import Link from "next/link";
import {getDb} from "../../db";
import {bookings,hostelEdits,managerAccounts,partnerLeads} from "../../db/schema";
import {redirect} from "next/navigation";
import {getManagerSession} from "../manager-auth";
import ManagerDashboard from "./manager-dashboard";
import BusinessInsights from "./business-insights";
import ListingAdmin from "./listing-admin";
import AccountAdmin from "./account-admin";
export const dynamic="force-dynamic";
export default async function ManagerPage(){
 const session=await getManagerSession();
 if(!session)redirect("/manager/login");
 const db=getDb();
 const rows=session.role==="admin"?await db.select().from(bookings).orderBy(desc(bookings.createdAt)):await db.select().from(bookings).where(eq(bookings.hostelName,session.hostelName||"")).orderBy(desc(bookings.createdAt));
 const leads=session.role==="admin"?await db.select().from(partnerLeads).orderBy(desc(partnerLeads.createdAt)):[];
 const edits=session.role==="admin"?await db.select().from(hostelEdits).orderBy(hostelEdits.name):[];
 const accounts=session.role==="admin"?await db.select({id:managerAccounts.id,username:managerAccounts.username,displayName:managerAccounts.displayName,hostelName:managerAccounts.hostelName,role:managerAccounts.role,active:managerAccounts.active}).from(managerAccounts).orderBy(managerAccounts.displayName):[];
 const initialEdits=edits.map(row=>{try{return {name:row.name,payload:JSON.parse(row.payload) as Record<string,unknown>,status:row.status}}catch{return {name:row.name,payload:{},status:row.status}}});
 return <main className="manager-shell"><header className="manager-header"><div><span>BUSITEMA STAYS</span><h1>{session.role==="admin"?"Business dashboard":session.hostelName}</h1><p>Welcome, {session.displayName}. {session.role==="admin"?"Manage bookings, listings, partners and manager access.":"Manage booking requests for your hostel."}</p></div><div><Link href="/">View public website</Link><a href="/api/manager/logout">Sign out</a></div></header>{session.role==="admin"&&<BusinessInsights bookings={rows} leads={leads}/>}<ManagerDashboard initialBookings={rows}/>{session.role==="admin"&&<><ListingAdmin initialEdits={initialEdits}/><AccountAdmin initialAccounts={accounts}/></>}</main>
}
