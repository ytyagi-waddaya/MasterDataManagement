// src/lib/auth-kit/ShowIf.tsx
import React from "react";
import IfAllowed from "./IfAllowed";

export default function ShowIf({ whenAllowed, children, fallback }: { whenAllowed: any; children: React.ReactNode; fallback?: React.ReactNode }) {
  // whenAllowed is the same props you'd pass to IfAllowed
  return <IfAllowed {...(whenAllowed as any)}>{children}</IfAllowed>;
}

{/* <ShowIf action="READ" resource="REPORT" context={{ resource: report }} renderDenied={<small>Not allowed</small>}>
  {({ allowed }) => <Button disabled={!allowed}>Open</Button>}
</ShowIf> */}
