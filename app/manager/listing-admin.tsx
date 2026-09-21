"use client";
import {FormEvent,useState} from "react";
import {Building2,EyeOff,Save} from "lucide-react";

type Edit={name:string;status:string;payload:Record<string,unknown>};
const hostelNames=["Precious Executive Hostel","Jamaica Hostel","Oburu Hostel","Mamikki Hostels","Mabonga Hostel","Olympia Hostel","Goodlife Hostel","Freedom Hostel Old","Freedom Hostel New","Zalane Hostel","Kings & Queens Hostel","New Harriet Hostel","Old Harriet Hostel","Triple T Hostel","AA Guilds Hostel","Machio Hostel","Luna Hostel","Sky View Hostel","Plumber's Hostel","Before Plumber Hostel","Bankproperty Hostel","White House Hostel","Near University View Hostel"];

export default function ListingAdmin({initialEdits}:{initialEdits:Edit[]}){
 const[edits,setEdits]=useState(initialEdits),[notice,setNotice]=useState(""),[selected,setSelected]=useState<Edit|null>(null);
 const save=async(event:FormEvent<HTMLFormElement>)=>{
  event.preventDefault();setNotice("");
  const form=event.currentTarget,data=new FormData(form),amenities=String(data.get("amenities")||"").split(",").map(x=>x.trim()).filter(Boolean);
  const raw={area:data.get("area"),distance:data.get("distance"),walk:data.get("walk"),price:data.get("price"),roomTypes:data.get("roomTypes"),phone:data.get("phone"),amenities:amenities.length?amenities:undefined,available:data.get("available")==="on",featured:data.get("featured")==="on",verification:data.get("verification")};
  const payload=Object.fromEntries(Object.entries(raw).filter(([,value])=>value!==""&&value!==undefined));
  const response=await fetch("/api/manager/hostels",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:data.get("name"),status:"active",payload})}),result=await response.json();
  if(!response.ok)return setNotice(result.error||"Could not save the listing.");
  setEdits(current=>[...current.filter(x=>x.name!==result.edit.name),result.edit].sort((a,b)=>a.name.localeCompare(b.name)));setSelected(result.edit);setNotice("Listing saved. Students will see the change immediately.");form.reset();
 };
 const hide=async(name:string)=>{
  if(!confirm(`Hide ${name} from student search?`))return;
  const response=await fetch(`/api/manager/hostels?name=${encodeURIComponent(name)}`,{method:"DELETE"});
  if(response.ok){setEdits(current=>current.map(x=>x.name===name?{...x,status:"hidden"}:x));setNotice("Listing hidden.");}
 };
 const p=selected?.payload||{};
 return <section className="admin-workspace"><div className="admin-section-heading"><div><span>ADMIN ONLY</span><h2><Building2/>Hostel listing editor</h2><p>Update an existing hostel by using its exact name, or enter a new hostel name.</p></div></div>
  {notice&&<p className="admin-notice">{notice}</p>}
  <form className="admin-grid-form" onSubmit={save} key={selected?.name||"new"}>
   <label>Hostel name<input name="name" list="hostel-name-options" defaultValue={selected?.name||""} required/><datalist id="hostel-name-options">{hostelNames.map(x=><option value={x} key={x}/>)}</datalist></label>
   <label>Area or location<input name="area" defaultValue={String(p.area||"")}/></label>
   <label>Semester price<input name="price" defaultValue={String(p.price||"")} placeholder="e.g. 450,000"/></label>
   <label>Distance<input name="distance" defaultValue={String(p.distance||"")} placeholder="e.g. 1.5 km"/></label>
   <label>Walking time<input name="walk" defaultValue={String(p.walk||"")} placeholder="e.g. 15-minute walk"/></label>
   <label>Room types<input name="roomTypes" defaultValue={String(p.roomTypes||"")} placeholder="Single and self-contained"/></label>
   <label>Manager phone<input name="phone" defaultValue={String(p.phone||"")} inputMode="tel"/></label>
   <label className="wide">Included services<input name="amenities" defaultValue={Array.isArray(p.amenities)?p.amenities.join(", "):""} placeholder="Water, Electricity, Wi-Fi, Security"/></label>
   <label>Verification<select name="verification" defaultValue={String(p.verification||"submitted")}><option value="submitted">Details submitted</option><option value="visited">Verified visit</option></select></label>
   <label className="admin-check"><input name="available" type="checkbox" defaultChecked={p.available!==false}/>Rooms available</label>
   <label className="admin-check"><input name="featured" type="checkbox" defaultChecked={Boolean(p.featured)}/>Featured listing</label>
   <div className="wide admin-form-actions"><button type="submit"><Save/>Save listing</button><button type="button" className="secondary" onClick={()=>setSelected(null)}>Clear form</button></div>
  </form>
  <div className="admin-records"><h3>Database-managed changes</h3>{edits.length?edits.map(edit=><article key={edit.name}><div><b>{edit.name}</b><small>{edit.status==="hidden"?"Hidden from students":"Active override"}</small></div><div><button onClick={()=>setSelected(edit)}>Edit</button><button className="danger" onClick={()=>hide(edit.name)}><EyeOff/>Hide</button></div></article>):<p>No listing changes have been saved yet. Existing hostel information remains active.</p>}</div>
 </section>
}
