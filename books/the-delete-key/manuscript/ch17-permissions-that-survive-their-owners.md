# Permissions That Survive Their Owners

Permissions are promises made by a system about who may do what.

They are also one of the clearest places where addition and removal have unequal machinery.

Granting access is usually connected to an event.

A person is hired. A contractor joins a project. An engineer needs production access during an incident. A manager requests a finance folder. A service account needs an API.

The request has an owner and a reason.

Months later, the reason changes.

The employee moves teams. The project ends. The contractor leaves. The incident closes. The integration is replaced.

Nothing necessarily happens to the permission.

This is how authority becomes sediment.

A modern identity system can accumulate thousands of grants whose original purpose was temporary but whose technical lifetime was indefinite. The system still knows that the permission exists. It may no longer know why.

That missing why is dangerous.

Access review then becomes archaeology. A manager sees an unfamiliar group name in a quarterly certification screen and has to decide whether removing it will break someone's work. Keeping it is easy. Revoking it requires confidence.

So uncertainty votes for continued authority.

The security principle of least privilege attempts to push in the other direction: give only the access needed, for only as long as needed. In practice, the second half is harder.

Time is the missing dimension in many permission systems.

We record who and what.

We are less disciplined about until when.

Short-lived credentials solve part of this mechanically. Just-in-time elevation solves another part. Role-based access can make job changes easier to propagate. Automated offboarding can revoke accounts when employment ends.

But no technical mechanism answers the governance question by itself.

What event should end the authority?

Who is responsible for noticing that event?

What evidence should survive revocation?

What happens to work owned by the identity after access disappears?

Can emergency access be restored quickly if the original revocation turns out to be wrong?

Permissions show why deletion is not destruction.

When access ends, the audit trail should often remain.

The system should remember that the permission existed, when it was granted, who authorized it, what it allowed, when it ended, and under what policy.

Operational capability disappears.

Evidence persists.

That is deletion with memory.

Service accounts make the problem stranger.

A human employee eventually leaves. A machine identity can survive indefinitely if nothing is designed to retire it. The original engineer leaves, but the token still works. The project is renamed, but the account remains. A script calls another script, and no one is willing to revoke either credential because the dependency chain is unclear.

Machine-to-machine authority can therefore outlive human organizational memory.

Agents will accelerate this.

An AI system acting on behalf of a person may need access to calendars, mail, files, payments, code repositories, customer systems, or internal tools. The convenience will be enormous.

So will the temptation to grant broad, durable authority because repeated reauthorization is annoying.

That would recreate the oldest permission mistake at a new scale.

A delegated agent should not receive a vague promise of permanent power. Its authority should be scoped by purpose, resource, time, and action wherever possible.

The agent booking a trip does not need indefinite access to everything the user has ever purchased.

The coding agent fixing one repository does not need permanent credentials to every repository in the organization.

The finance agent reconciling a quarter does not automatically need authority to initiate payments next year.

A good delegation expires when the mandate does.

This is one place where the delete key can become almost literal.

Revoke.

Not erase the history. Not pretend the access never existed. End the capability.

And then verify it ended everywhere.

That last step matters because authority can be copied. Tokens are cached. Sessions remain active. Secondary accounts inherit roles. API keys appear in scripts. A permission revoked at the central identity provider may survive in local systems that are not actually governed by it.

Revocation, like repeal, has replicas.

A mature identity system therefore needs dependency-aware offboarding.

What did this identity touch?

Which credentials were derived from it?

Which resources does it own?

Which automations depend on it?

Which data should transfer to another owner?

Which privileges should vanish immediately?

Which evidence should remain?

The goal is not merely to disable a login.

It is to close the authority graph.

Permissions make the book's central claim unusually concrete.

We know how to say yes.

The dangerous residue is all the yeses nobody remembered to revisit.

A civilization that can add authority cheaply will need to become extremely good at ending authority precisely.