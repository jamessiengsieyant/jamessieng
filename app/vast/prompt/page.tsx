import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import { isOwnerEmail } from "../owner";

export default async function PromptPage() {
  const devBypass = process.env.NODE_ENV !== "production";
  const user = devBypass ? null : await currentUser();
  const owner =
    devBypass || (user?.emailAddresses?.some((e) => isOwnerEmail(e.emailAddress)) ?? false);
  if (!owner) redirect("/vast");
  return (
    <article className="band">
      <div className="wrap narrow">
        <div className="mono">Onsite — Friday, August 7 · 12:45 PM PT · Long Beach</div>
        <h1 style={{ marginTop: 12 }}>The interview</h1>
        <p className="lede" style={{ color: "var(--muted)", fontSize: 16 }}>
          Host: Andre Carbajal · (562) 900-4105
        </p>

        <div className="note" style={{ marginTop: 20 }}>
          <strong>Deadline:</strong> presentation must be sent 24–48 hours before the onsite — that
          means <strong>between Wednesday Aug 5, 12:45 PM and Thursday Aug 6, 12:45 PM</strong> to
          Kimani Glass, Andre Carbajal, and guest@vastspace.com. PDF or PowerPoint.
        </div>

        <h2 style={{ fontSize: 22, marginTop: 40 }}>Schedule</h2>
        <ul className="list" style={{ marginTop: 16 }}>
          <li>
            <span className="yr">12:45–1:00</span>
            <span className="body">
              <strong>Andre Carbajal</strong>
              <span>Candidate greet &amp; tour. Relax — this is the warm-up.</span>
            </span>
          </li>
          <li>
            <span className="yr">1:00–2:00</span>
            <span className="body">
              <strong>Panel Presentation — the main event</strong>
              <span>
                Vincent Nguyen · Catherine Rivera · Patty Dungo Morales · Dennis Lam · Daniel
                Galvan · Brian Fairchild. 30–45 min of material + questions.
              </span>
            </span>
          </li>
          <li>
            <span className="yr">2:00–2:30</span>
            <span className="body">
              <strong>Catherine Rivera</strong>
              <span>Problem Solving &amp; Adaptability — have the spray-booth judgment factors and the &ldquo;scale flips the answer&rdquo; arc ready.</span>
            </span>
          </li>
          <li>
            <span className="yr">2:30–3:00</span>
            <span className="body">
              <strong>Patty Dungo Morales</strong>
              <span>Communication &amp; Collaboration — exit-conference story: explaining an assessment to a hostile room, and the controller-buy-in-before-building beat.</span>
            </span>
          </li>
          <li>
            <span className="yr">3:00–3:30</span>
            <span className="body">
              <strong>Daniel Galvan</strong>
              <span>Technical Breadth &amp; Depth — ASC 350-40 vs 360, ASC 830/CTA, the platforms-transfer parallel, the builds.</span>
            </span>
          </li>
          <li>
            <span className="yr">3:30–4:00</span>
            <span className="body">
              <strong>Dennis Lam</strong>
              <span>Leadership &amp; Culture — &ldquo;documented well enough to survive me,&rdquo; owning &ldquo;faster,&rdquo; judgment that cuts both ways.</span>
            </span>
          </li>
          <li>
            <span className="yr">4:00–4:30</span>
            <span className="body">
              <strong>Brian Fairchild &amp; Vincent Nguyen</strong>
              <span>Analytical — expect a live problem. Think out loud; show the split-the-piles instinct.</span>
            </span>
          </li>
          <li>
            <span className="yr">4:30–4:45</span>
            <span className="body">
              <strong>Kimani Glass</strong>
              <span>Onsite wrap-up. Ask about next steps; restate the 90-day pitch in one sentence.</span>
            </span>
          </li>
        </ul>

        <h2 style={{ fontSize: 22, marginTop: 40 }}>The presentation prompt — verbatim</h2>
        <div style={{ marginTop: 12, lineHeight: 1.65 }}>
          <p>Please put together a 30-45 min. presentation that goes over the following:</p>
          <ul style={{ marginTop: 10 }}>
            <li style={{ marginBottom: 8 }}>
              Your background/career with history/projects or programs worked on. Education, what
              you like to do for fun, etc.
            </li>
            <li style={{ marginBottom: 8 }}>
              Topic 1: Walk us through 2 examples of times when you had to decide whether something
              should be capitalized as a fixed asset vs expensed, and why you believe the treatment
              for that transaction was done appropriately.
              <ul style={{ marginTop: 6 }}>
                <li>
                  The walk through should include the goals/requirements, your direct contributions,
                  results, and lessons learned/what you&apos;d do differently.
                </li>
              </ul>
            </li>
            <li>
              Topic 2: Give a 30/60/90 day plan of what you would do if you were hired at Vast.
              Please include one brilliant idea that you believe would benefit Vast!
            </li>
          </ul>
        </div>
      </div>
    </article>
  );
}
