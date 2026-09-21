import Link from "next/link";

export default function ManagerLogin({searchParams}:{searchParams?:{error?:string}}){
 return <main className="manager-login-page"><section className="manager-login-card"><span>BUSITEMA STAYS</span><h1>Manager sign in</h1><p>Administrators can keep “admin” as the username. Hostel managers should use the account given to them.</p>{searchParams?.error&&<div className="login-error">The sign-in details did not match. Check the password and try again.</div>}<form action="/api/manager/login" method="post"><label>Username<input name="username" defaultValue="admin" autoComplete="username" required autoFocus/></label><label>Password<input name="password" type="password" minLength={8} autoComplete="current-password" required/></label><button type="submit">Open dashboard</button></form><Link href="/">Return to Busitema Stays</Link></section></main>
}
