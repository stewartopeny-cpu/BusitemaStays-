import {redirect} from "next/navigation";

export default async function HostelLink({params}:{params:Promise<{slug:string}>}){
 const {slug}=await params;
 redirect(`/?hostel=${encodeURIComponent(slug)}`);
}
