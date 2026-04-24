import { useState, useRef, useEffect } from "react";

const NAVY  = "#0D1B3E";
const TEAL  = "#1A9E8F";
const AMBER = "#F4A623";
const RUST  = "#C0392B";
const GREEN = "#1A6B3A";
const GREY  = "#F0F4F8";
const WHITE = "#FFFFFF";
const MID   = "#64748B";
const PLUM  = "#6B21A8";

function TASSLogo({ size = "md", theme = "light" }) {
  const s = { sm:{the:9,main:18,sub:16,tag:9,rW:16,rH:1.5,gap:2}, md:{the:11,main:24,sub:22,tag:11,rW:22,rH:2,gap:3}, lg:{the:14,main:32,sub:29,tag:13,rW:28,rH:2,gap:4} }[size] || {the:11,main:24,sub:22,tag:11,rW:22,rH:2,gap:3};
  const navy = theme==="dark"?"#fff":NAVY;
  const tag  = theme==="dark"?"rgba(255,255,255,0.5)":"#6B7FA3";
  const tagB = theme==="dark"?"rgba(255,255,255,0.75)":"#3D4F6B";
  return (
    <div style={{display:"inline-flex",flexDirection:"column",alignItems:"center",gap:s.gap,userSelect:"none"}}>
      <div style={{display:"flex",alignItems:"center",gap:7}}>
        <div style={{width:s.rW,height:s.rH,background:TEAL,borderRadius:99}}/>
        <span style={{color:TEAL,fontSize:s.the,fontWeight:800,letterSpacing:"0.25em",textTransform:"uppercase",lineHeight:1}}>THE</span>
        <div style={{width:s.rW,height:s.rH,background:TEAL,borderRadius:99}}/>
      </div>
      <div style={{color:navy,fontSize:s.main,fontWeight:900,letterSpacing:"-0.01em",textTransform:"uppercase",lineHeight:1,marginTop:-1}}>APPRENTICESHIP</div>
      <div style={{color:TEAL,fontSize:s.sub,fontWeight:900,letterSpacing:"-0.01em",textTransform:"uppercase",lineHeight:1,marginTop:-3}}>SUCCESS SYSTEM™</div>
      <div style={{width:"70%",height:s.rH,background:TEAL,borderRadius:99}}/>
      <div style={{color:tag,fontSize:s.tag,letterSpacing:"0.16em",textTransform:"uppercase",fontWeight:400,marginTop:1}}>
        Stop Guessing.{" "}<strong style={{fontWeight:800,color:tagB}}>Start Securing.</strong>
      </div>
    </div>
  );
}

const TABS = [
  {id:"home",      icon:"🏠", label:"Home"},
  {id:"why",       icon:"❓", label:"Why MAs"},
  {id:"myths",     icon:"💡", label:"Myths"},
  {id:"coaching",  icon:"🗣️",  label:"Coaching"},
  {id:"programme", icon:"📅", label:"6 Weeks"},
  {id:"cv",        icon:"📄", label:"CV Help"},
  {id:"resilience",icon:"💪", label:"Resilience"},
  {id:"resources", icon:"📋", label:"Resources"},
  {id:"coach",     icon:"🤖", label:"AI Coach"},
];

function PageHeader({icon,title,subtitle}){
  return (
    <div style={{marginBottom:24}}>
      <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:6}}>
        <span style={{fontSize:22}}>{icon}</span>
        <h2 style={{color:NAVY,fontSize:20,fontWeight:900,margin:0,letterSpacing:"-0.02em"}}>{title}</h2>
      </div>
      <div style={{height:3,width:40,background:AMBER,borderRadius:2,marginBottom:8}}/>
      {subtitle && <p style={{color:MID,fontSize:13,lineHeight:1.6,margin:0}}>{subtitle}</p>}
    </div>
  );
}

function Card({children,style={}}){
  return <div style={{background:WHITE,border:"1px solid #E2E8F0",borderRadius:12,padding:16,marginBottom:12,boxShadow:"0 1px 4px rgba(0,0,0,0.04)",...style}}>{children}</div>;
}

function InfoBox({text,type="tip"}){
  const s = {
    tip:    {bg:"#FFFBEB",border:AMBER,col:"#92400E"},
    info:   {bg:"#EFF6FF",border:TEAL, col:"#1A5276"},
    success:{bg:"#F0FDF4",border:GREEN,col:"#14532D"},
    warning:{bg:"#FEF2F2",border:RUST, col:"#7F1D1D"},
    purple: {bg:"#FAF5FF",border:PLUM, col:"#581C87"},
  }[type] || {bg:"#FFFBEB",border:AMBER,col:"#92400E"};
  return (
    <div style={{background:s.bg,borderLeft:`4px solid ${s.border}`,borderRadius:8,padding:"10px 13px",marginBottom:14}}>
      <p style={{color:s.col,fontSize:13,lineHeight:1.65,margin:0}}>{text}</p>
    </div>
  );
}

function Accordion({items,accentColor=TEAL}){
  const [open,setOpen] = useState(null);
  return (
    <div>
      {items.map((item,i)=>(
        <div key={i} style={{background:WHITE,border:`1px solid ${open===i?accentColor:"#E2E8F0"}`,borderRadius:10,overflow:"hidden",marginBottom:8,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
          <button onClick={()=>setOpen(open===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"13px 15px",display:"flex",justifyContent:"space-between",alignItems:"center",cursor:"pointer",fontFamily:"inherit"}}>
            <span style={{color:NAVY,fontWeight:700,fontSize:14,textAlign:"left"}}>{item.title}</span>
            <span style={{color:accentColor,fontSize:18,flexShrink:0}}>{open===i?"−":"+"}</span>
          </button>
          {open===i && (
            <div style={{padding:"0 15px 15px",borderTop:"1px solid #F0F4F8"}}>
              <div style={{paddingTop:12}}>
                {typeof item.content==="string"
                  ? <p style={{color:"#444",fontSize:13,lineHeight:1.75,margin:0,whiteSpace:"pre-line"}}>{item.content}</p>
                  : item.content}
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── HOME ─────────────────────────────────────────────────────────────────────
function HomeModule({setTab}){
  const cards = [
    {id:"why",       icon:"❓", title:"Why Apprenticeships?",   desc:"The facts, the pay, the progression — what MAs actually offer"},
    {id:"myths",     icon:"💡", title:"Myths Busted",           desc:"The most common things parents believe that are not true"},
    {id:"coaching",  icon:"🗣️",  title:"How to Coach",          desc:"Conversations that help — and mistakes that accidentally hurt"},
    {id:"programme", icon:"📅", title:"6-Week Programme",       desc:"A structured plan you and your young person can follow together"},
    {id:"cv",        icon:"📄", title:"CV Help for Parents",    desc:"How to help with CVs without writing them yourself"},
    {id:"resilience",icon:"💪", title:"Handling Rejection",     desc:"How to keep them going when the rejections come"},
    {id:"resources", icon:"📋", title:"Scottish Resources",     desc:"The websites, contacts and services you actually need"},
    {id:"coach",     icon:"🤖", title:"AI Coach",               desc:"Ask anything — tailored advice for your specific situation"},
  ];
  return (
    <div>
      <div style={{background:`linear-gradient(135deg, ${NAVY} 0%, #1A3060 100%)`,borderRadius:14,padding:"32px 20px 28px",display:"flex",justifyContent:"center",marginBottom:20}}>
        <TASSLogo size="lg" theme="dark"/>
      </div>
      <Card style={{borderLeft:`4px solid ${AMBER}`,background:"#FFFBEB"}}>
        <p style={{color:"#666",fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 4px"}}>Parent and Carer Guide</p>
        <p style={{color:NAVY,fontSize:14,lineHeight:1.7,margin:0}}>This guide is for the parents, carers, guardians and family members supporting a young person through the apprenticeship process. You do not need to be an expert. You need to know how to help without taking over — and how to keep them going when it gets hard.</p>
      </Card>
      <Card style={{borderLeft:`4px solid ${TEAL}`,background:"#EFF6FF",marginBottom:20}}>
        <p style={{color:"#1A5276",fontWeight:700,fontSize:13,margin:"0 0 4px",textTransform:"uppercase",letterSpacing:0.5}}>Who this is for</p>
        <p style={{color:"#1A5276",fontSize:13,lineHeight:1.65,margin:0}}>Whether your young person is 16 and just leaving school, 22 and finished college, or 28 and changing career — this guide covers all three. Use the tabs below to find what is relevant to you right now.</p>
      </Card>
      <p style={{color:NAVY,fontWeight:800,fontSize:12,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 12px"}}>Choose a section</p>
      <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:10,marginBottom:24}}>
        {cards.map((c,i)=>(
          <button key={i} onClick={()=>setTab(c.id)} style={{background:WHITE,border:"1px solid #E2E8F0",borderRadius:12,padding:"14px 12px",textAlign:"left",cursor:"pointer",fontFamily:"inherit",boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}
            onMouseEnter={e=>e.currentTarget.style.borderColor=AMBER}
            onMouseLeave={e=>e.currentTarget.style.borderColor="#E2E8F0"}>
            <div style={{fontSize:20,marginBottom:6}}>{c.icon}</div>
            <p style={{color:NAVY,fontWeight:700,fontSize:13,margin:"0 0 3px",lineHeight:1.3}}>{c.title}</p>
            <p style={{color:MID,fontSize:11,lineHeight:1.4,margin:0}}>{c.desc}</p>
          </button>
        ))}
      </div>
      <div style={{textAlign:"center",color:"#AAA",fontSize:11,paddingBottom:8}}>
        <strong style={{color:TEAL}}>The Apprenticeship Success System™</strong> · tass.scot
      </div>
    </div>
  );
}

// ─── WHY MAs ─────────────────────────────────────────────────────────────────
function WhyModule(){
  return (
    <div>
      <PageHeader icon="❓" title="Why Apprenticeships?" subtitle="The facts every parent and carer needs — before the conversations start."/>
      <Card style={{borderLeft:`4px solid ${AMBER}`,background:"#FFFBEB"}}>
        <p style={{color:"#92400E",fontWeight:800,fontSize:15,margin:"0 0 6px"}}>The most important thing to understand</p>
        <p style={{color:"#92400E",fontSize:14,lineHeight:1.7,margin:0}}>A Modern Apprenticeship is a <strong>real job with structured training</strong>. It is not a consolation prize for people who did not get into university. It is a paid employment contract with a recognised qualification at the end of it.</p>
      </Card>
      <Accordion accentColor={TEAL} items={[
        {title:"What is a Modern Apprenticeship (MA)?", content:"A Modern Apprenticeship is a job. The young person:\n• Is employed from day one — they sign an employment contract\n• Earns a wage throughout — the national minimum is £7.55/hr (2025) and many Scottish employers pay significantly more\n• Works towards a nationally recognised SVQ qualification (SCQF Levels 5–11)\n• Attends college on day release or block release, funded by Skills Development Scotland\n• Completes the apprenticeship in 1–4 years depending on the trade\n\nThere are over 80 MA frameworks in Scotland covering engineering, construction, IT, health and social care, business, hospitality, creative industries and more."},
        {title:"How does pay and progression actually work?", content:"Starting wages vary by employer and sector. Many Scottish employers pay above the minimum:\n• Entry level: £8–£12/hr in many trades\n• After qualification: £15–£25/hr is common in engineering, electrical, plumbing\n• Senior/supervisory roles: £30,000–£60,000+ is achievable within 10 years in most trades\n\nProgression is structured:\nApprentice → Qualified tradesperson → Supervisor → Contracts manager → Director\n\nChartered status (through professional bodies like IMechE, CIOB, IET) is achievable from trade routes — equivalent in standing to a degree in many sectors.\n\nThere is no tuition debt. No student loans. No years of unpaid internships."},
        {title:"How does it compare to university?", content:"This is the question most parents ask. The honest answer is: it depends on the goal.\n\nFor many careers — especially trades, engineering, IT, care, business — an apprenticeship provides a faster, less expensive route to employment with equivalent or higher lifetime earnings.\n\nUniversity is better suited to careers requiring a specific degree (medicine, law, academic research). For everything else, the comparison is much closer than most families assume.\n\nKey differences:\n• Apprentice earns from day one. Student accumulates debt (average £30,000+ in Scotland for non-SAAS-covered courses).\n• Apprentice gains 3–4 years of work experience during training. Graduate starts from zero.\n• Apprentice qualification is nationally recognised. Both routes lead to professional status in most sectors.\n\nNeither path is superior. Both are legitimate. The key is matching the path to the person, not the other way round."},
        {title:"Who can do a Modern Apprenticeship in Scotland?", content:"Any person aged 16 or over can apply. There is no upper age limit — the Scottish Government removed the 29-year-old cap for most frameworks.\n\nMAs are open to:\n• School leavers (16–18) — the most common entry point\n• College and university graduates (18–24) — often entering at a higher framework level\n• Career changers (25+) — retraining into a new field\n• People returning after a break — caring responsibilities, health, travel\n• People with disabilities — additional funding and support is available\n\nThere are specific incentives for employers to take on care-experienced young people, those with disabilities, and those from deprived areas. This is worth knowing if your young person fits any of these categories."},
        {title:"What sectors are most in demand in Scotland right now?", content:"Scotland currently has significant shortfalls in:\n\n1. Construction and trades — the housing programme, school building, net zero retrofitting and infrastructure projects are creating sustained demand for carpenters, plumbers, electricians, bricklayers and plant operators\n\n2. Engineering — advanced manufacturing, renewables (wind, hydrogen), aerospace and defence\n\n3. Digital and IT — software development, cyber security, data analysis, IT support across all industries\n\n4. Health and social care — ageing population and NHS workforce needs mean consistent demand\n\n5. Business and financial services — accountancy, project management, HR, operations\n\nSDS publishes annual labour market data. The consistent message for Scotland is that the trades and digital sectors face the largest shortfalls and offer the clearest employment guarantees for qualified apprentices."},
        {title:"What are the key Scottish apprenticeship bodies to know?", content:"Skills Development Scotland (SDS) — the national body. Manages MA frameworks, funding and employer support. Their website (skillsdevelopmentscotland.co.uk) has the full framework list.\n\nApprenticeship.scot — the main job portal for advertised vacancies. Searchable by sector, location and level.\n\nMyJobScotland.gov.uk — used by all Scottish councils and many public sector employers. Most local authority apprenticeships are advertised here.\n\nSNIPEF — Scottish and Northern Ireland Plumbing Employers Federation. Manages all plumbing apprenticeships in Scotland.\n\nSELECT — the trade body for electrical contractors. Manages electrical apprenticeships.\n\nCITB — Construction Industry Training Board. Manages construction frameworks and the HS&E test."},
      ]}/>
    </div>
  );
}

// ─── MYTHS ────────────────────────────────────────────────────────────────────
function MythsModule(){
  const myths = [
    {myth:"Apprenticeships are for people who are not academic enough for university.", truth:"Apprenticeships attract people across the full academic range. Many engineering and technical MAs require Higher Maths and Physics. Some degree-level apprenticeships (SCQF Level 11) are equivalent to a university degree. The idea that apprenticeships are a fallback for weaker students is outdated and actively harmful — it puts young people off a route that may be the best possible fit for them."},
    {myth:"My child will earn very little as an apprentice.",truth:"The national minimum apprentice wage applies only to the first year. After year one, apprentices move to the National Minimum Wage for their age group. Many Scottish employers pay above both minimums from day one. In trades like electrical and plumbing, apprentices in their third and fourth year can earn £12–£15/hr. After qualification, earnings in these trades frequently exceed £35,000 within a few years."},
    {myth:"An apprenticeship will limit their options later in life.",truth:"Completing a Modern Apprenticeship opens doors — it does not close them. Many qualified tradespeople go on to take HNC/HND qualifications, chartered professional status, or move into management and directorship. The construction industry has directors and company owners who began as apprentices. The IT sector has CTOs who came through technical apprenticeships. An SVQ qualification is a foundation, not a ceiling."},
    {myth:"Employers do not take apprentices seriously.",truth:"In Scotland, thousands of employers actively recruit Modern Apprentices because it is how they grow their own talent. Balfour Beatty, Robertson Construction, Scottish Water, NHS Scotland, all 32 Scottish councils, and most major engineering firms have structured MA programmes. These are not token schemes — they are the main route for workforce development in many sectors."},
    {myth:"The application process is simple — they just need to send a CV.",truth:"This is one of the most dangerous misconceptions. Apprenticeship applications are competitive. In popular sectors, 50–100 people may apply for a single position. The difference between success and rejection usually comes down to CV quality, tailoring to the specific employer, and interview preparation. A generic CV without sector-specific language, evidence of relevant skills, and employer research will fail. Preparation is not optional."},
    {myth:"If they do not get in the first time, something is wrong with them.",truth:"Most successful apprentices are rejected multiple times before securing a place. Rejection at this stage is almost never a permanent verdict — it reflects a specific application on a specific day competing against specific candidates. What matters is what happens next: getting feedback, improving the CV and interview technique, and trying again. Resilience and persistence are more predictive of eventual success than any single application outcome."},
    {myth:"Once they start, they are locked in to that trade forever.",truth:"Modern Apprenticeships give a qualification and work experience — neither locks a person into one path. Many apprentices move between employers, sectors or roles after qualifying. The transferable skills developed — reliability, practical problem-solving, working under supervision, health and safety awareness — are valued across multiple industries. Changing direction after completing an apprenticeship is entirely normal."},
    {myth:"My young person can apply any time — there is no rush.",truth:"Many apprenticeship programmes have specific annual intake dates with application windows that close months in advance. Scottish councils and large contractors often recruit between January and April for August starts. Missing the window means waiting a full year in some sectors. Understanding the recruitment calendar and preparing in advance is essential — not optional."},
  ];
  const [active,setActive] = useState(null);
  return (
    <div>
      <PageHeader icon="💡" title="Myths Busted" subtitle="The most common things parents believe about apprenticeships that are not true — and the reality."/>
      <InfoBox text="Many families make decisions based on outdated assumptions. These 8 myths are the ones that most consistently hold young people back from applying." type="warning"/>
      {myths.map((m,i)=>(
        <div key={i} style={{background:WHITE,border:`1px solid ${active===i?TEAL:"#E2E8F0"}`,borderRadius:12,overflow:"hidden",marginBottom:10,boxShadow:"0 1px 4px rgba(0,0,0,0.04)"}}>
          <button onClick={()=>setActive(active===i?null:i)} style={{width:"100%",background:"none",border:"none",padding:"13px 15px",display:"flex",justifyContent:"space-between",alignItems:"flex-start",cursor:"pointer",fontFamily:"inherit",gap:10}}>
            <div style={{textAlign:"left"}}>
              <span style={{background:RUST+"15",color:RUST,fontSize:10,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,padding:"2px 8px",borderRadius:99,display:"inline-block",marginBottom:4}}>Myth</span>
              <p style={{color:NAVY,fontWeight:700,fontSize:14,margin:0,lineHeight:1.4}}>{m.myth}</p>
            </div>
            <span style={{color:TEAL,fontSize:18,flexShrink:0,marginTop:2}}>{active===i?"−":"+"}</span>
          </button>
          {active===i && (
            <div style={{padding:"0 15px 15px",borderTop:"1px solid #F0F4F8"}}>
              <div style={{background:"#F0FDF4",borderLeft:`3px solid ${GREEN}`,borderRadius:8,padding:"10px 12px",marginTop:12}}>
                <p style={{color:GREEN,fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 4px"}}>Reality</p>
                <p style={{color:"#14532D",fontSize:13,lineHeight:1.7,margin:0}}>{m.truth}</p>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

// ─── COACHING ─────────────────────────────────────────────────────────────────
function CoachingModule(){
  const [view,setView] = useState("dos");
  const dos = [
    {title:"Ask questions instead of giving instructions",content:"The single most effective thing you can do is ask questions rather than direct. Questions build self-reflection and ownership.\n\nInstead of: 'You should apply to Morrison Construction.'\nTry: 'What is it about construction that appeals to you? Which companies have you looked at?'\n\nInstead of: 'Your CV needs more on your work experience.'\nTry: 'What do you think is the strongest part of your CV? What do you think an employer might want to know more about?'\n\nThis approach — sometimes called motivational interviewing — produces better outcomes than instruction because the young person generates their own answers rather than resisting yours."},
    {title:"Validate before redirecting",content:"When your young person expresses frustration, fear or negativity, the instinct is to immediately reassure or solve. Resist it. Listen first.\n\nThem: 'No one is going to hire me anyway. I'm useless at interviews.'\n\nWrong: 'Don't say that! You're brilliant. Just be confident.'\nRight: 'That sounds really discouraging. What happened in the last one that felt hard?'\n\nValidating the feeling first — before redirecting to solutions — prevents them from feeling dismissed. Once they feel heard, they are more open to thinking constructively."},
    {title:"Be the researcher, not the decision-maker",content:"Your role is to bring information, not to make choices. Find apprenticeship vacancies and share them. Research what different sectors involve. Print off application deadlines. But the decisions — which sector, which employer, which application to prioritise — belong to the young person.\n\nIf you make the choices, two things happen:\n1. They may resent the path and disengage\n2. They do not develop the ownership and self-belief they need to succeed at interview\n\nPresent options: 'I found three electrical apprenticeship programmes that are hiring in our area. Want to look at them together?'"},
    {title:"Celebrate process, not just outcomes",content:"If you only celebrate offers and acceptances, the young person will only feel successful in rare moments. Most of the process involves effort with no immediate result.\n\nCelebrate the drafting of a CV. Celebrate a completed application. Celebrate researching an employer. Celebrate practising an interview question out loud.\n\nThis sounds small but it is the difference between a young person who keeps going and one who gives up after the first rejection."},
    {title:"Set up a regular check-in",content:"Structure reduces anxiety. A weekly 20-minute check-in — not a grilling, a conversation — does more than multiple ad-hoc comments throughout the week.\n\nFormat:\n• What did you do this week on applications?\n• What felt hard?\n• What is the plan for next week?\n\nKeep it brief. Keep it consistent. The regularity signals that this is a shared priority without turning every family interaction into a job-hunting discussion."},
  ];
  const donts = [
    {title:"Write the CV for them",content:"This is the most common mistake. It is understandable — you want them to succeed and you can see what is needed — but it backfires in three ways.\n\n1. The CV will not sound like them. Experienced recruiters notice immediately when a CV has been written by a parent rather than a young person.\n2. They cannot defend it at interview. If they did not write it, they do not own it and they cannot speak confidently to its contents.\n3. It removes the learning. Writing a CV is a skill they will use for life. Doing it for them denies that development.\n\nYour job: ask questions that help them generate the content, then help them check the result. Never open a blank document and start typing."},
    {title:"Compare them to other young people",content:"'Your cousin got an apprenticeship at 16.' 'Your friend from school has already had two interviews.' 'Other people manage to do this.'\n\nThese comparisons feel like they motivate. They do not. They create shame, which shuts down effort and creates avoidance.\n\nEvery young person's timeline is different. Comparison to peers is one of the fastest ways to erode the confidence they need to keep applying."},
    {title:"Express anxiety about their future in front of them",content:"Parents carry real worry about their child's future. That worry is natural and valid. But expressing it directly — especially repeatedly — transfers the anxiety to the young person and makes the process feel heavier than it already is.\n\nIf you are worried, talk to another adult. When talking to your young person, lead with calm confidence: 'I think you have a lot to offer. Let's focus on making sure employers can see that.'"},
    {title:"Treat rejection as failure",content:"If you react to a rejection with visible disappointment, frustration or despair, the young person will learn that rejection means they have let you down. This makes them less likely to apply again because they want to avoid repeating that experience.\n\nThe correct response to every rejection: 'That is disappointing but completely normal. What can we learn from it? What is next?'\n\nYour emotional response to their rejections is one of the most powerful signals you send about the process."},
    {title:"Make it the only topic of conversation",content:"If every interaction with you is about job applications, the young person will start avoiding you. The apprenticeship process should be one topic among many — not a constant pressure that pervades home life.\n\nThe weekly check-in contains the conversation. Outside that structure, let it rest unless they raise it."},
    {title:"Dismiss concerns about a sector you do not rate",content:"'Construction is not for you.' 'You would be bored in an office.' 'IT is too competitive.'\n\nYour instinct to protect them from sectors you think are wrong for them can close doors they should be opening. Unless you have specific factual reasons (health contraindications, genuine incompatibility with documented requirements), reflect the choice back rather than closing it down.\n\n'What appeals to you about that sector? What do you know about what the day-to-day involves?'"},
  ];
  const scripts = [
    {situation:"They say 'I don't know what I want to do'",script:"'That is completely normal at your age. We do not have to know the destination to start moving. What subjects have you enjoyed? What kind of work do you think you would not want to do? Let's narrow it down from there rather than trying to find the perfect answer.'\n\nFollow up: research together. Look at 3 different MA sectors. Visit apprenticeship.scot and filter by different areas. Seeing real jobs makes abstract choices more concrete."},
    {situation:"They say 'I'll do it later / I'm not ready'",script:"'I understand there is no urgency feeling right now. What I want to flag is that some of the application windows close in February and March — so 'later' might actually mean waiting another full year. What would it take to feel ready? Is there something specific you are worried about?'\n\nKey: find the actual barrier. 'Not ready' often means 'scared of rejection' or 'not sure where to start'. Address the real thing."},
    {situation:"They have been rejected and are taking it personally",script:"'I know that is gutting. And I want to be honest with you — most people who eventually get an apprenticeship have been rejected multiple times. This does not mean you are not good enough. It means one employer, on one day, chose differently. What do we know about why? Is there anything from the feedback we can use?'\n\nIf no feedback was given: 'Would you be comfortable sending a polite email asking if they can share any feedback? It shows maturity and it gives us information to work with.'"},
    {situation:"They are applying but not getting interviews",script:"'You are putting in the work — that matters. Let's look at the CVs you are sending together. Sometimes it is a small adjustment to the personal profile or the skills section that makes the difference. Have you been tailoring each one to the specific employer, or sending the same one each time?'\n\nDo not criticise the CV. Ask to look at it together and approach it as a team problem to solve."},
    {situation:"They want to give up entirely",script:"'I hear you. Can I ask you to give it two more weeks before we make that decision? I am not saying that to dismiss what you are feeling — I am saying it because two weeks of focused applications could change the picture entirely. What would make the next two weeks feel more manageable?'\n\nIf they are genuinely at the point of serious distress: deprioritise the applications and address their wellbeing first. No job is worth serious mental health deterioration."},
    {situation:"They got an interview and are panicking",script:"'This is great news — they read your CV and thought you are worth meeting. That already says something. Now let's prepare so you go in feeling ready, not just hoping it goes well. Tell me what you know about the company and what the role involves.'"},
  ];
  const ageGuides = [
    {age:"16–18 — School Leaver",icon:"🎒",notes:["They may not have thought seriously about their career — do not assume they have","Peer influence is powerful at this age. If friends are going to university, apprenticeships may feel like giving up. Address this directly: they are not giving anything up.","School is ending and everything feels uncertain. The apprenticeship process is one of many changes happening simultaneously — be aware of the wider context.","They may have very little sense of what they are good at professionally. The skills extraction process (Session 2) is especially important for this group.","Their self-confidence is often fragile. One rejection can feel catastrophic. Manage this carefully."]},
    {age:"19–24 — Graduate or College Leaver",icon:"🎓",notes:["They may feel they are going backwards by doing an apprenticeship after a degree. Reframe: they are going into employment immediately, with a structured qualification pathway and no additional debt.","They may face prejudice from peers who think apprenticeships are beneath them. Give them the language to defend the choice confidently.","They often have stronger academic skills but less practical confidence. Help them see their degree projects, presentations and research as evidence of professional competence.","They may be frustrated that they studied for years and are now starting at the beginning. This is real — acknowledge it and redirect to what the apprenticeship actually offers."]},
    {age:"25–29 — Career Changer",icon:"🔄",notes:["They carry more responsibility (rent, possibly a family, established social identity) and the stakes feel higher.","Self-doubt is particularly intense — years of experience in one field can make starting again feel humiliating rather than exciting.","They may face ageism assumptions (from themselves or from employers). Remind them: Scottish MAs have no upper age limit and mature apprentices have a significantly lower dropout rate.","Their previous experience is an asset — but only if the CV presents it as such. The reframing work is the most important element of their application.","They need to be able to articulate clearly why they are changing career. If the answer is not clear and positive, help them develop it before they apply."]},
  ];

  return (
    <div>
      <PageHeader icon="🗣️" title="How to Coach" subtitle="What helps, what harms, how to have the right conversations, and how to adapt for your young person's age."/>
      <div style={{display:"flex",gap:6,marginBottom:16}}>
        {[{id:"dos",label:"✓ What helps"},{id:"donts",label:"✗ What harms"},{id:"scripts",label:"💬 Scripts"},{id:"ages",label:"👤 By age"}].map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} style={{flex:1,padding:"8px 4px",background:view===v.id?NAVY:WHITE,color:view===v.id?WHITE:MID,border:`1px solid ${view===v.id?NAVY:"#E2E8F0"}`,borderRadius:8,fontWeight:view===v.id?700:400,fontSize:11,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",letterSpacing:0.3}}>
            {v.label}
          </button>
        ))}
      </div>
      {view==="dos" && (
        <div>
          <InfoBox text="These five approaches consistently make the biggest difference. You do not need to do all of them — but the first two alone will transform the quality of your conversations." type="success"/>
          <Accordion items={dos} accentColor={GREEN}/>
        </div>
      )}
      {view==="donts" && (
        <div>
          <InfoBox text="These six behaviours are well-intentioned but consistently backfire. Most parents do at least two of them. Recognising them is the first step." type="warning"/>
          <Accordion items={donts} accentColor={RUST}/>
        </div>
      )}
      {view==="scripts" && (
        <div>
          <InfoBox text="These are word-for-word scripts for the conversations that parents find hardest. Adapt them to your own voice — but the structure is what matters." type="info"/>
          {scripts.map((s,i)=>(
            <Card key={i}>
              <p style={{color:TEAL,fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 6px"}}>Situation</p>
              <p style={{color:NAVY,fontWeight:700,fontSize:14,margin:"0 0 12px"}}>{s.situation}</p>
              <div style={{background:"#F0FDF4",borderLeft:`3px solid ${GREEN}`,borderRadius:8,padding:"10px 12px"}}>
                <p style={{color:GREEN,fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 6px"}}>What to say</p>
                <p style={{color:"#14532D",fontSize:13,lineHeight:1.75,margin:0,whiteSpace:"pre-line"}}>{s.script}</p>
              </div>
            </Card>
          ))}
        </div>
      )}
      {view==="ages" && (
        <div>
          <InfoBox text="The support your young person needs depends heavily on where they are in life. The same conversation lands very differently at 17 than at 27." type="purple"/>
          {ageGuides.map((a,i)=>(
            <Card key={i}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12}}>
                <span style={{fontSize:22}}>{a.icon}</span>
                <p style={{color:NAVY,fontWeight:800,fontSize:14,margin:0}}>{a.age}</p>
              </div>
              {a.notes.map((n,j)=>(
                <div key={j} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
                  <div style={{width:6,height:6,background:AMBER,borderRadius:99,flexShrink:0,marginTop:5}}/>
                  <p style={{color:"#444",fontSize:13,lineHeight:1.6,margin:0}}>{n}</p>
                </div>
              ))}
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── 6-WEEK PROGRAMME ─────────────────────────────────────────────────────────
function ProgrammeModule(){
  const [week,setWeek] = useState(0);
  const weeks = [
    {num:1,title:"Awareness and goal setting",icon:"🔍",
     aim:"Establish a shared understanding of what Modern Apprenticeships are and identify your young person's areas of genuine interest.",
     tasks:["Research together on apprenticeship.scot — look at 2 or 3 sectors that interest them","Use the TASS modules together — start with the sector overview relevant to their interest","Discuss what they enjoy, what they are good at, and what kind of working environment appeals to them","Identify 3 employers or programmes they want to find out more about","Set up job alert emails on apprenticeship.scot and MyJobScotland"],
     parentTip:"Your job this week is to listen more than you speak. Ask what appeals to them — not what you think should appeal. Curiosity, not direction.",
     activity:"Together, each of you lists the top 3 sectors you think would suit them. Compare your lists without judgment. Discuss the differences."},
    {num:2,title:"Skills inventory",icon:"📝",
     aim:"Extract all potential CV content from their background — school, college, jobs, volunteering, hobbies, home responsibilities.",
     tasks:["Make a comprehensive list of everything they have done: every subject, club, sport, job, volunteer role, project, responsibility","For each activity, identify 1–2 skills it demonstrates","Practice the Action + Skill + Outcome formula on 3 examples","Look at the TASS CV Builder module — read the Cohort section relevant to them","Identify any gaps — short courses, certificates or experiences that would strengthen a CV"],
     parentTip:"Nothing is too small to be useful. A paper round demonstrates reliability and independent working. Caring for a sibling demonstrates responsibility and time management. Help them see the professional value in everyday experience.",
     activity:"For each of the following, write one CV bullet together: a school project or subject, a sport or club, a job or volunteering role (or home responsibility if no job)."},
    {num:3,title:"CV drafting",icon:"📄",
     aim:"Produce a first draft CV using the TASS CV Builder. Focus on structure and content — polish comes later.",
     tasks:["Use the TASS CV Builder — work through each section using the guided prompts","Write the personal profile last — once all other sections are drafted","Check the draft against the job description of a real vacancy they are interested in","Paste the draft into the TASS AI CV Review for feedback","Make one round of revisions based on that feedback"],
     parentTip:"Do not write the CV for them. Sit beside them while they type. Ask questions that generate their content: 'What did you actually do in that role? What was the outcome?'. The words must be theirs.",
     activity:"Read the draft personal profile aloud together. Does it sound like them? Does it mention the specific sector and employer type? Does it include any actual evidence, or is it all claims?"},
    {num:4,title:"Tailoring and applying",icon:"📮",
     aim:"Learn to adapt the CV for specific employers and submit first applications.",
     tasks:["Choose 2–3 real vacancies to apply to this week","For each, highlight the keywords in the job description and check the CV mirrors those words","Adjust the personal profile and skills section for each specific application","Submit the applications — do not wait for the CV to be perfect","Set up a simple tracking spreadsheet: employer, role, date applied, outcome, notes"],
     parentTip:"Quality over quantity — 3 tailored applications will outperform 15 generic ones. Resist the temptation to 'spray and pray'. Encourage them to research each employer before applying.",
     activity:"Take one job advert. Highlight every skill, quality and responsibility mentioned. Count how many of those appear in the CV. Any missing? Add them."},
    {num:5,title:"Interview preparation",icon:"🎤",
     aim:"Build confidence and practical skill for interviews through structured practice.",
     tasks:["Use the TASS Interview module — read the strong answer examples for common questions","Run a mock interview: take turns asking and answering the 8 most common questions","Record one answer on a phone and watch it back together — look at pace, eye contact, energy","Prepare 3 questions they will ask the interviewer","Research the specific employer thoroughly before any actual interview"],
     parentTip:"Be honest in feedback but kind in delivery. 'That answer was a bit vague — can you give me a specific example?' is more useful than 'That was good, well done.' They need real feedback to improve.",
     activity:"Role play the question 'Tell me about a time you worked effectively in a team.' Use the STAR method. Time the answer — it should be 90 seconds to 2 minutes."},
    {num:6,title:"Resilience and forward planning",icon:"💪",
     aim:"Build the mindset and systems to keep going through the inevitable difficult periods.",
     tasks:["Review what has worked in the first 5 weeks and what needs adjusting","If any rejections have come in — analyse them constructively. What can be learned?","Update the CV with anything new — a skill developed, a course completed, a new experience","Set goals for the next 2 weeks: number of applications, any networking to do, any skills to add","Read the Resilience section in this guide together"],
     parentTip:"The work does not stop here. The 6-week programme builds habits and skills — the habit of regular applications, the skill of CV tailoring and interview preparation. Help them see this as ongoing, not finished.",
     activity:"Write down 3 things they are genuinely better at now than they were 6 weeks ago. These are not small — they are evidence of real progress."},
  ];
  const w = weeks[week];
  return (
    <div>
      <PageHeader icon="📅" title="6-Week Programme" subtitle="A structured plan for parents and carers to work through with their young person."/>
      <InfoBox text="This programme is a guide, not a rigid schedule. Adapt the pace to your young person's situation. Some weeks may take two weeks. That is fine." type="info"/>
      <div style={{display:"flex",gap:6,flexWrap:"wrap",marginBottom:16}}>
        {weeks.map((w,i)=>(
          <button key={i} onClick={()=>setWeek(i)} style={{background:week===i?NAVY:WHITE,color:week===i?WHITE:MID,border:`1px solid ${week===i?NAVY:"#E2E8F0"}`,borderRadius:20,padding:"6px 12px",fontSize:11,fontWeight:week===i?800:400,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",letterSpacing:0.3}}>
            Wk {w.num}
          </button>
        ))}
      </div>
      <Card>
        <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:4}}>
          <span style={{fontSize:22}}>{w.icon}</span>
          <div>
            <p style={{color:MID,fontSize:11,margin:0,textTransform:"uppercase",letterSpacing:0.5}}>Week {w.num}</p>
            <p style={{color:NAVY,fontWeight:800,fontSize:15,margin:0}}>{w.title}</p>
          </div>
        </div>
        <div style={{height:2,width:32,background:AMBER,borderRadius:2,marginBottom:12,marginTop:6}}/>
        <p style={{color:TEAL,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 6px"}}>Aim this week</p>
        <p style={{color:"#444",fontSize:14,lineHeight:1.65,margin:"0 0 14px"}}>{w.aim}</p>
        <p style={{color:TEAL,fontSize:11,fontWeight:700,textTransform:"uppercase",letterSpacing:0.5,margin:"0 0 8px"}}>Tasks</p>
        {w.tasks.map((t,i)=>(
          <div key={i} style={{display:"flex",gap:10,marginBottom:8,alignItems:"flex-start"}}>
            <div style={{width:20,height:20,border:`2px solid ${AMBER}`,borderRadius:4,flexShrink:0,marginTop:1}}/>
            <p style={{color:"#444",fontSize:13,lineHeight:1.55,margin:0}}>{t}</p>
          </div>
        ))}
        <div style={{background:"#EFF6FF",borderLeft:`3px solid ${TEAL}`,borderRadius:8,padding:"10px 12px",margin:"14px 0"}}>
          <p style={{color:TEAL,fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 4px"}}>Parent tip</p>
          <p style={{color:"#1A5276",fontSize:13,lineHeight:1.65,margin:0}}>{w.parentTip}</p>
        </div>
        <div style={{background:"#FAF5FF",borderLeft:`3px solid ${PLUM}`,borderRadius:8,padding:"10px 12px"}}>
          <p style={{color:PLUM,fontWeight:700,fontSize:11,textTransform:"uppercase",margin:"0 0 4px"}}>Weekly activity</p>
          <p style={{color:"#581C87",fontSize:13,lineHeight:1.65,margin:0}}>{w.activity}</p>
        </div>
      </Card>
      <div style={{display:"flex",gap:10}}>
        {week>0 && <button onClick={()=>setWeek(w=>w-1)} style={{flex:1,padding:12,background:WHITE,border:"1px solid #E2E8F0",color:NAVY,borderRadius:8,fontWeight:700,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>← Previous</button>}
        {week<weeks.length-1 && <button onClick={()=>setWeek(w=>w+1)} style={{flex:1,padding:12,background:AMBER,border:"none",color:NAVY,borderRadius:8,fontWeight:800,cursor:"pointer",fontFamily:"inherit",fontSize:14}}>Next week →</button>}
      </div>
    </div>
  );
}

// ─── CV HELP FOR PARENTS ──────────────────────────────────────────────────────
function CVModule(){
  return (
    <div>
      <PageHeader icon="📄" title="CV Help for Parents" subtitle="How to support without taking over — and what makes a CV fail."/>
      <InfoBox text="The most important rule: the CV must be written by your young person. Your job is to ask the right questions, check the result, and direct them to better resources — not to produce the document yourself." type="warning"/>
      <Accordion accentColor={TEAL} items={[
        {title:"The golden rule: questions, not writing",content:"When helping with a CV, your entire contribution should be in the form of questions:\n\n'What did you actually do in that job — not the job title, the specific things you did day to day?'\n'What was the outcome of that project?'\n'If I was a manager reading this, what would I not understand about what you did?'\n'Does this sound like you, or does it sound formal and stiff?'\n'Which of these two sentences is clearer?'\n\nThe moment you start typing, you have crossed the line. Put the keyboard down and ask another question."},
        {title:"What a strong CV does — in simple terms",content:"A strong apprenticeship CV does four things:\n\n1. It answers the question 'who are you and what do you offer this specific employer?' in the first 5 lines.\n2. It provides specific evidence for every skill claimed — not 'I am hardworking' but 'I maintained 100% attendance over 18 months at RetailCo.'\n3. It mirrors the language of the job advert — if the advert says 'attention to detail', those words appear in the CV.\n4. It is easy to scan — clear headings, bullet points, consistent formatting, no walls of text.\n\nAny CV that does not do these four things will underperform — regardless of how impressive the candidate's actual experience is."},
        {title:"The most common CV mistakes — by young people",content:"These are the errors that appear most frequently and most consistently damage applications:\n\n• Generic personal profile — does not name the sector, the employer type, or include any specific evidence. Reads like it was copied from a template.\n• Skills listed without evidence — 'good communication skills', 'team player', 'hardworking' with nothing to back them up.\n• Weak experience bullets — 'helped with customer service', 'worked in a team', 'assisted the manager'. These describe a presence, not a contribution.\n• No quantification — no numbers anywhere. '80 customers per shift' beats 'many customers' every time.\n• Using 'we' instead of 'I' — the employer is assessing an individual. 'I coordinated' not 'we coordinated'.\n• Same CV sent to every employer — the personal profile and skills section should be adjusted for each application.\n• Typos and inconsistencies — one error in a CV is enough to trigger rejection from some employers."},
        {title:"What to check when reviewing their draft",content:"When your young person asks you to review their CV, use this checklist:\n\n☐ Does the personal profile name the specific sector and type of role?\n☐ Does the profile include at least one specific piece of evidence (not just claims)?\n☐ Does the skills section mirror language from the job advert?\n☐ Does every experience bullet start with a strong action verb (managed, developed, resolved, trained, organised)?\n☐ Are there any numbers anywhere? (Number of customers, budget managed, team size, % improvement)\n☐ Is 'I' used consistently — not 'we'?\n☐ Is the formatting consistent — same font, same bullet style, same date format throughout?\n☐ Are there any typos? (Read it aloud — errors you cannot see, you can hear)\n☐ Is it 1–2 pages maximum?\n☐ Does it feel like it could have been written by them, or does it feel formal and adult?\n\nNote what is missing or wrong. Ask them to address it. Do not fix it yourself."},
        {title:"Helping a school leaver with little experience",content:"The most common parental anxiety: 'But they have not done anything. What do they put on a CV?'\n\nThis is almost never true. Help them see the professional value in:\n\n• School subjects — 'National 5 Physics: demonstrates analytical thinking and problem-solving'\n• Group projects — coordination, teamwork, meeting deadlines\n• Sports — team membership, captaincy, training commitment, resilience\n• Part-time or casual work — any paid work, including babysitting, lawn mowing, helping a relative's business\n• Clubs and societies — school council, debate team, drama, music, coding club\n• Caring responsibilities — looking after siblings or elderly relatives demonstrates reliability, time management and emotional maturity\n• Volunteering — any structured voluntary activity\n• Hobbies with transferable skills — gaming that involved team strategy, DIY projects, content creation\n\nThe question to ask for each activity: 'What skill does this demonstrate, and can we give a specific example of using that skill?'"},
        {title:"When to use the TASS tools with them",content:"The most effective use of the TASS platform is to sit with your young person and work through it together rather than directing them to use it alone.\n\nRecommended approach:\n\n1. TASS CV Builder — Section Builder tab: work through each section together using the guided prompts. You ask the questions on screen; they type the answers.\n\n2. TASS CV Builder — AI Review tab: paste their draft and read the feedback together. Discuss each point before they make changes.\n\n3. TASS Interview module: read the strong and weak answer examples together. Then run a mock interview using the questions provided.\n\n4. The relevant sector module (Engineering, Construction, Local Authority etc.): read the CV examples in that module to show them the standard to aim for."},
      ]}/>
    </div>
  );
}

// ─── RESILIENCE ───────────────────────────────────────────────────────────────
function ResilienceModule(){
  const [view,setView] = useState("rejection");
  const affirmations = [
    "Every application I submit is practice — I am getting better at this.",
    "Rejection tells me about one employer on one day. It does not tell me my worth.",
    "I have skills that an employer needs. My job is to help them see that.",
    "This process is hard for most people. I am not failing by finding it hard.",
    "Each time I practise an interview answer, I am more ready than I was before.",
    "The right opportunity exists. I need to stay in the process long enough to reach it.",
    "I have overcome difficult things before. This is another one.",
    "Progress is not just interviews and offers. Every application, every revision, every practice counts.",
  ];
  const rejectionSteps = [
    {step:"Acknowledge it", content:"Do not minimise it. A rejection stings — especially early in the process. Say: 'That is genuinely disappointing. It's okay to feel that.' Do not rush past the feeling."},
    {step:"Separate it from identity", content:"The rejection is about one application on one day — not about who they are or what they are worth. Help them hold this distinction: 'That employer said no. That is not the same as every employer saying no. That is not the same as you not being good enough.'"},
    {step:"Look for information", content:"If the employer offers feedback — take it. If they do not offer it, your young person can politely request it. Most employers will give brief feedback if asked professionally. Feedback is information. Information improves the next application."},
    {step:"Wait 48 hours before revising", content:"Do not revise the CV or application strategy in the immediate aftermath of a rejection. Wait 48 hours, then review with clearer eyes. Reactive changes based on raw disappointment often make things worse."},
    {step:"Reframe the count", content:"Track all the applications submitted, not just the rejections. 'We have submitted 12 applications and had 3 rejections' is a very different story to '3 rejections'. Progress is happening even when it does not feel like it."},
    {step:"Set the next action immediately", content:"Uncertainty is harder than difficulty. After processing the rejection, identify the next specific action: 'Tomorrow we are going to apply to two more. Today we are not thinking about it.'"},
  ];
  return (
    <div>
      <PageHeader icon="💪" title="Handling Rejection" subtitle="How to support your young person through the inevitable setbacks — and how to keep yourself steady too."/>
      <div style={{display:"flex",gap:6,marginBottom:16}}>
        {[{id:"rejection",label:"Rejection guide"},{id:"parent",label:"Parent wellbeing"},{id:"affirmations",label:"Affirmations"},{id:"warning",label:"Warning signs"}].map(v=>(
          <button key={v.id} onClick={()=>setView(v.id)} style={{flex:1,padding:"8px 4px",background:view===v.id?NAVY:WHITE,color:view===v.id?WHITE:MID,border:`1px solid ${view===v.id?NAVY:"#E2E8F0"}`,borderRadius:8,fontWeight:view===v.id?700:400,fontSize:10,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",letterSpacing:0.2}}>
            {v.label}
          </button>
        ))}
      </div>
      {view==="rejection" && (
        <div>
          <Card style={{borderLeft:`4px solid ${AMBER}`,background:"#FFFBEB",marginBottom:16}}>
            <p style={{color:"#92400E",fontWeight:700,fontSize:14,margin:"0 0 6px"}}>The most important thing to know about rejection</p>
            <p style={{color:"#92400E",fontSize:13,lineHeight:1.7,margin:0}}>Most people who secure an apprenticeship are rejected multiple times before they do. Rejection is not the exception — it is part of the process. How a young person (and their parent) responds to rejection is one of the strongest predictors of eventual success.</p>
          </Card>
          {rejectionSteps.map((s,i)=>(
            <Card key={i}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <div style={{background:TEAL,color:WHITE,width:28,height:28,borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontWeight:900,fontSize:13,flexShrink:0}}>{i+1}</div>
                <div>
                  <p style={{color:NAVY,fontWeight:700,fontSize:14,margin:"0 0 6px"}}>{s.step}</p>
                  <p style={{color:"#444",fontSize:13,lineHeight:1.65,margin:0}}>{s.content}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
      {view==="parent" && (
        <div>
          <InfoBox text="Parents and carers also find this process hard. Your own anxiety about your young person's future is valid — but it needs managing so it does not transfer to them." type="purple"/>
          <Accordion accentColor={PLUM} items={[
            {title:"Your anxiety is real but containable",content:"Most parents are genuinely worried about their child's future. That worry is natural and comes from care. The challenge is that anxiety is contagious — if your young person senses your fear, it amplifies their own.\n\nPractical strategies:\n• Keep your worried thoughts in a separate conversation — with a partner, a friend, or a journal — rather than with your young person\n• When you feel yourself wanting to panic-apply to 30 employers on their behalf, pause\n• Remind yourself: the process takes time. Most people who persist eventually succeed."},
            {title:"Taking care of yourself during a long search",content:"If your young person's apprenticeship search extends over many months, the sustained worry can be genuinely exhausting for parents too.\n\nThis is normal. It does not mean you are failing as a parent.\n\nWhat helps:\n• Separate your identity from their outcome — their success or failure at this stage does not reflect on your parenting\n• Maintain your own interests and relationships throughout — if you make their search your entire focus, you will burn out\n• Celebrate your own progress too: you are learning new things, developing new skills as a coach\n• Connect with other parents in similar situations — many communities have parent support networks around young people's employment"},
            {title:"When you disagree with their choices",content:"Your young person may choose to apply to a sector you do not think suits them. They may turn down advice you think is clearly correct. They may prioritise an employer you would not choose.\n\nUnless their choice involves clear safety risks or factual errors, your job is to support the decision, not override it.\n\nWhy:\n• They are developing autonomy and decision-making. Overriding them slows that development.\n• They will perform better in an interview for a role they chose than one you chose for them.\n• You may be wrong. The sector that seems wrong to you may be exactly right for them.\n\nExpress concern once, clearly and specifically: 'I'm not sure about X because of Y. Have you thought about that?' Then let it go."},
            {title:"When to get additional support",content:"Seek additional support if:\n• Your young person's mood or motivation has significantly deteriorated over more than 4–6 weeks\n• They are expressing persistent hopelessness ('Nothing will ever work out for me')\n• They have withdrawn from social activities, family, or normal interests\n• You are having significant conflict at home about the job search\n\nIn Scotland:\n• SDS Career Advisers: 0800 917 8000 (free, professional, impartial)\n• My World of Work: myworldofwork.co.uk (free career tools and guidance)\n• Young Scot: youngscot.net (resources and support for young people)\n• SAMH (Scottish Association for Mental Health): samh.org.uk\n• NHS 24: 111 (if there are mental health concerns)"},
          ]}/>
        </div>
      )}
      {view==="affirmations" && (
        <div>
          <InfoBox text="These affirmations work best when they are specific and repeated regularly — not read once. Help your young person choose 2 or 3 that feel true to them and use them daily." type="info"/>
          <p style={{color:NAVY,fontWeight:700,fontSize:13,margin:"0 0 12px"}}>Choose ones that resonate — then use them consistently.</p>
          {affirmations.map((a,i)=>(
            <div key={i} style={{background:WHITE,border:"1px solid #E2E8F0",borderRadius:10,padding:"14px 16px",marginBottom:8,boxShadow:"0 1px 3px rgba(0,0,0,0.04)"}}>
              <div style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                <div style={{width:24,height:24,background:AMBER+"20",color:"#92400E",borderRadius:6,display:"flex",alignItems:"center",justifyContent:"center",fontSize:11,fontWeight:700,flexShrink:0}}>{i+1}</div>
                <p style={{color:NAVY,fontSize:14,lineHeight:1.6,margin:0,fontStyle:"italic"}}>"{a}"</p>
              </div>
            </div>
          ))}
          <Card style={{background:"#FAF5FF",borderLeft:`3px solid ${PLUM}`,marginTop:8}}>
            <p style={{color:PLUM,fontWeight:700,fontSize:13,margin:"0 0 8px"}}>How to use affirmations effectively</p>
            <p style={{color:"#581C87",fontSize:13,lineHeight:1.7,margin:0}}>Write the chosen 2–3 on paper or a phone note. Say them aloud — not just read them silently. Morning is most effective. Pair with a specific action: say the affirmation, then immediately start one task on the applications list. The combination of positive self-statement and immediate action is more powerful than either alone.</p>
          </Card>
        </div>
      )}
      {view==="warning" && (
        <div>
          <InfoBox text="These are signs that the process has moved beyond normal difficulty and may need external support." type="warning"/>
          <Accordion accentColor={RUST} items={[
            {title:"Signs in your young person to take seriously",content:"These go beyond normal discouragement and warrant a direct conversation and potentially professional support:\n\n• Persistent hopelessness lasting more than 2–3 weeks: 'Nothing will ever work out' or 'I'll never get anywhere'\n• Complete disengagement — refusing to discuss applications, look at CVs, or consider next steps\n• Significant withdrawal from social activities, friends, or normal interests\n• Changes in sleep, appetite, or energy that persist over weeks\n• Expressed feelings of worthlessness beyond frustration with the job search\n\nIf you observe these, the apprenticeship search should be paused and the young person's wellbeing addressed first. Contact your GP, school guidance, SDS adviser or SAMH if needed."},
            {title:"Signs that the dynamic at home has become unhealthy",content:"The job search can create real tension at home. These patterns need addressing:\n\n• Every family conversation becomes a discussion about applications and progress\n• Your relationship with your young person feels primarily transactional — about the job search rather than broader\n• There is significant conflict or resentment around the subject\n• They have started avoiding you or hiding information about their applications\n• You find yourself checking their applications without their knowledge\n\nIf any of these are present, step back from the coaching role temporarily. The relationship is more important than the process. A damaged relationship will make the coaching impossible anyway."},
            {title:"When professional careers support is the right move",content:"If you have been supporting your young person for 3+ months with limited progress, consider involving professional support:\n\nSDS Career Advisers (free): 0800 917 8000. They provide impartial, professional guidance and have current knowledge of the labour market and apprenticeship landscape that goes beyond what any individual parent can have.\n\nSchool or college guidance: if still in education, the guidance team can provide support, references, and access to employer contacts.\n\nEmployability Scotland: a national programme providing free intensive support for young people who are struggling to access employment or training.\n\nSometimes a fresh voice — someone who is not a family member — is what is needed to unlock progress."},
          ]}/>
        </div>
      )}
    </div>
  );
}

// ─── RESOURCES ────────────────────────────────────────────────────────────────
function ResourcesModule(){
  const resources = [
    {category:"Job portals",items:[
      {name:"Apprenticeships.scot",desc:"The official Scottish Government portal for all Modern Apprenticeship vacancies. Search by sector, level and location. Set up job alerts.",url:"apprenticeships.scot",icon:"🏴󠁧󠁢󠁳󠁣󠁴󠁿"},
      {name:"MyJobScotland",desc:"Used by all 32 Scottish councils and most public sector employers. Essential if your young person is interested in local authority work.",url:"myjobscotland.gov.uk",icon:"🏛️"},
      {name:"Apprenticeships.gov.uk",desc:"UK-wide apprenticeship portal. Some Scottish employers also list here alongside apprenticeships.scot.",url:"apprenticeships.gov.uk",icon:"🇬🇧"},
      {name:"S1 Jobs and LinkedIn",desc:"Worth checking for employers who advertise apprenticeships through general job boards rather than specialist portals.",url:"s1jobs.com / linkedin.com",icon:"🔍"},
    ]},
    {category:"Guidance and support",items:[
      {name:"My World of Work",desc:"Skills Development Scotland's career guidance platform. Free tools including career assessments, CV builder, job search and sector guides. An excellent first stop.",url:"myworldofwork.co.uk",icon:"🌐"},
      {name:"SDS Career Advisers",desc:"Free, impartial professional career guidance. Phone: 0800 917 8000 (Mon–Fri 8am–10pm, Sat 9am–5pm). Also available via Live Chat on My World of Work.",url:"myworldofwork.co.uk",icon:"📞"},
      {name:"Employability Scotland",desc:"Connects young people to free employability support programmes in their local area — CV help, interview coaching, employer contacts.",url:"employabilityinscotland.com",icon:"🤝"},
      {name:"Developing the Young Workforce",desc:"Scotland's youth employment programme. Your local DYW Regional Group can connect young people with employers and opportunities.",url:"dyw.scot",icon:"🏫"},
    ]},
    {category:"Sector-specific contacts",items:[
      {name:"SNIPEF",desc:"Scottish and Northern Ireland Plumbing Employers Federation. Manages all plumbing apprenticeships. If your young person wants to be a plumber, start here.",url:"snipef.org",icon:"🔧"},
      {name:"SELECT",desc:"The trade association for the Scottish electrical contracting industry. Manages electrical apprenticeships and has an employer directory.",url:"select.org.uk",icon:"⚡"},
      {name:"CITB",desc:"Construction Industry Training Board. Manages construction apprenticeship frameworks. Administers the CITB Health, Safety and Environment test required for most site work.",url:"citb.co.uk",icon:"🏗️"},
      {name:"Scottish Engineering",desc:"Represents engineering employers in Scotland. Has apprenticeship information and an employer directory.",url:"scottishengineering.org.uk",icon:"⚙️"},
    ]},
    {category:"Wellbeing and mental health",items:[
      {name:"SAMH",desc:"Scottish Association for Mental Health. Information, resources and support for young people experiencing anxiety, low mood or other mental health challenges during a job search.",url:"samh.org.uk",icon:"💚"},
      {name:"Young Scot",desc:"Scotland's national youth information and citizenship charity. Resources specifically for young people including wellbeing, rights and opportunities.",url:"youngscot.net",icon:"🌟"},
      {name:"NHS 24",desc:"For urgent mental health concerns: 111. For non-urgent mental health support: speak to your GP or visit nhsinform.scot.",url:"nhsinform.scot",icon:"🏥"},
      {name:"Breathing Space",desc:"Free, confidential phone line for people in Scotland experiencing low mood, depression or anxiety. 0800 83 85 87 (Mon–Thu 6pm–2am, Fri 6pm–Mon 6am).",url:"breathingspace.scot",icon:"🌬️"},
    ]},
    {category:"Recruitment calendar — key dates",items:[
      {name:"January–March",desc:"Peak period for council and large contractor applications. Most August start apprenticeships open in this window. Check MyJobScotland and apprenticeships.scot weekly.",url:"",icon:"📅"},
      {name:"February–April",desc:"Plumbing (SNIPEF) and electrical (SELECT) employer recruitment. Trade sector applications typically close before Easter.",url:"",icon:"📅"},
      {name:"May–June",desc:"Late applications and additional intake rounds. Graduate apprenticeships (for college or university completers) often recruit in this window.",url:"",icon:"📅"},
      {name:"September–November",desc:"Spring start programmes and some employer-specific intakes. Scottish Water and utilities sometimes recruit in this window.",url:"",icon:"📅"},
    ]},
  ];
  const [cat,setCat] = useState("Job portals");
  return (
    <div>
      <PageHeader icon="📋" title="Scottish Resources" subtitle="The websites, contacts and organisations that are actually useful — focused on Scotland."/>
      <InfoBox text="Many UK-wide resources give generic advice that does not reflect Scotland's specific apprenticeship framework, qualification system or recruitment calendar. These resources are Scotland-specific." type="info"/>
      <div style={{display:"flex",flexWrap:"wrap",gap:6,marginBottom:16}}>
        {resources.map(r=>(
          <button key={r.category} onClick={()=>setCat(r.category)} style={{background:cat===r.category?NAVY:WHITE,color:cat===r.category?WHITE:MID,border:`1px solid ${cat===r.category?NAVY:"#E2E8F0"}`,borderRadius:20,padding:"6px 12px",fontSize:11,fontWeight:cat===r.category?800:400,cursor:"pointer",fontFamily:"inherit",textTransform:"uppercase",letterSpacing:0.3}}>
            {r.category.split(" ")[0]}
          </button>
        ))}
      </div>
      {resources.filter(r=>r.category===cat).map(r=>(
        <div key={r.category}>
          {r.items.map((item,i)=>(
            <Card key={i}>
              <div style={{display:"flex",alignItems:"flex-start",gap:12}}>
                <span style={{fontSize:22,flexShrink:0}}>{item.icon}</span>
                <div style={{flex:1}}>
                  <p style={{color:NAVY,fontWeight:700,fontSize:14,margin:"0 0 4px"}}>{item.name}</p>
                  <p style={{color:"#444",fontSize:13,lineHeight:1.6,margin:"0 0 6px"}}>{item.desc}</p>
                  {item.url && <span style={{color:TEAL,fontSize:12,fontWeight:600}}>{item.url}</span>}
                </div>
              </div>
            </Card>
          ))}
        </div>
      ))}
    </div>
  );
}

// ─── AI COACH ─────────────────────────────────────────────────────────────────
function AICoachModule(){
  const [messages,setMessages] = useState([{role:"assistant",content:"I am your TASS Parent and Carer Coach.\n\nI am here to help you support your young person through the apprenticeship process — not to give you generic advice, but to answer your specific situation.\n\nYou can ask me:\n• 'My 17-year-old wants to be an electrician — where do we start?'\n• 'My daughter has had 8 rejections and is ready to give up. What do I say?'\n• 'I don't agree with the sector they want to go into. How do I handle this?'\n• 'We looked at their CV and I don't know what is wrong with it — can I paste it here?'\n• 'What are the best employers to approach for IT apprenticeships in Glasgow?'\n• 'My son is 27 and changing career. Is it too late?'\n\nTell me your situation and I will give you specific, practical guidance."}]);
  const [input,setInput] = useState("");
  const [loading,setLoading] = useState(false);
  const bottomRef = useRef(null);
  useEffect(()=>{bottomRef.current?.scrollIntoView({behavior:"smooth"});},[messages]);

  const PROMPTS = [
    "Where do we start? My teenager has no idea what they want.",
    "They've been rejected 5 times and are losing hope.",
    "I want to help with the CV but don't know how.",
    "What Scottish employers are best for apprenticeships?",
    "They're 26 — is it too late for an apprenticeship?",
    "We're having arguments about their job search at home.",
  ];

  async function send(){
    if(!input.trim()||loading) return;
    const userMsg = input.trim();
    setInput("");
    const newMsgs = [...messages,{role:"user",content:userMsg}];
    setMessages(newMsgs);
    setLoading(true);
    try{
      const res = await fetch("/api/chat",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({
        model:"claude-sonnet-4-20250514",
        max_tokens:1000,
        system:`You are the TASS Parent and Carer Coach — a warm, direct and expert coach helping Scottish parents and carers support their young person (aged 16–29) through the Modern Apprenticeship application process.

Your approach:
- Speak to the parent, not to the young person. Your job is to help the parent be a better support.
- Be specific and practical. No generic reassurance. Give actual next steps.
- Be honest about difficulty without being alarming. The process is competitive and hard — acknowledge that.
- Scotland-specific: you know the Scottish apprenticeship framework (Modern Apprenticeships, SVQ levels, SCQF), the relevant bodies (SDS, SNIPEF, SELECT, CITB), the portals (apprenticeship.scot, MyJobScotland), and the Scottish labour market.
- Emotionally intelligent: parents are often anxious and sometimes part of the problem. Be kind about that.

When a parent describes their young person's situation:
1. Acknowledge the situation briefly
2. Give 2–3 specific, actionable next steps
3. Flag any coaching mistakes the parent might be making (gently)
4. Offer a specific resource or tool from the TASS platform or Scottish system

Key principles:
- The CV must be written by the young person — not the parent
- Rejection is normal and expected — help parents manage their own reaction
- Questions beat instructions every time in parent-young person conversations
- The relationship matters more than the outcome — never sacrifice one for the other

Scottish resources to reference when relevant:
- apprenticeship.scot for vacancies
- myworldofwork.co.uk for career guidance
- SDS Career Advisers: 0800 917 8000 (free)
- SNIPEF for plumbing, SELECT for electrical, CITB for construction
- MyJobScotland for council and public sector roles
- Employability Scotland for intensive free support
- Breathing Space: 0800 83 85 87 for mental health support

Keep responses focused and mobile-friendly. Use short paragraphs.`,
        messages:newMsgs.map(m=>({role:m.role,content:m.content}))
      })});
      const data = await res.json();
      const reply = data.content?.[0]?.text || "Connection issue — please try again.";
      setMessages([...newMsgs,{role:"assistant",content:reply}]);
    }catch{
      setMessages([...newMsgs,{role:"assistant",content:"Connection issue — please try again."}]);
    }
    setLoading(false);
  }

  return (
    <div style={{display:"flex",flexDirection:"column",height:"calc(100vh - 180px)",minHeight:480}}>
      <div style={{background:"#EFF6FF",borderLeft:`3px solid ${TEAL}`,borderRadius:8,padding:"9px 13px",marginBottom:10}}>
        <p style={{color:"#1A5276",fontSize:13,margin:0}}>💡 Tell me your specific situation — the more detail you give, the more useful the advice will be.</p>
      </div>
      <div style={{display:"flex",gap:6,marginBottom:10,overflowX:"auto",paddingBottom:4}}>
        {PROMPTS.map((p,i)=><button key={i} onClick={()=>setInput(p)} style={{background:TEAL+"15",border:`1px solid ${TEAL}40`,color:TEAL,borderRadius:99,padding:"5px 11px",whiteSpace:"nowrap",fontSize:11,fontWeight:600,cursor:"pointer",flexShrink:0,fontFamily:"inherit"}}>{p}</button>)}
      </div>
      <div style={{flex:1,overflowY:"auto",display:"flex",flexDirection:"column",gap:12,paddingRight:4,paddingBottom:8}}>
        {messages.map((m,i)=>(
          <div key={i} style={{display:"flex",justifyContent:m.role==="user"?"flex-end":"flex-start"}}>
            <div style={{maxWidth:"88%",padding:"10px 14px",borderRadius:m.role==="user"?"14px 14px 4px 14px":"14px 14px 14px 4px",background:m.role==="user"?NAVY:WHITE,color:m.role==="user"?WHITE:NAVY,fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap",border:m.role==="assistant"?"1px solid #E2E8F0":"none",boxShadow:m.role==="assistant"?"0 1px 4px rgba(0,0,0,0.06)":"none"}}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && (
          <div style={{display:"flex",justifyContent:"flex-start"}}>
            <div style={{background:WHITE,border:"1px solid #E2E8F0",borderRadius:"14px 14px 14px 4px",padding:"11px 15px",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
              <div style={{display:"flex",gap:4}}>{[0,1,2].map(i=><div key={i} style={{width:6,height:6,background:TEAL,borderRadius:99,animation:`b 1.2s ${i*0.2}s infinite`}}/>)}</div>
            </div>
          </div>
        )}
        <div ref={bottomRef}/>
      </div>
      <div style={{display:"flex",gap:8,marginTop:10}}>
        <textarea value={input} onChange={e=>setInput(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&!e.shiftKey){e.preventDefault();send();}}} placeholder="Describe your situation or ask a specific question..." rows={3} style={{flex:1,background:WHITE,border:"1px solid #E2E8F0",borderRadius:10,padding:"10px 13px",color:NAVY,fontSize:13,fontFamily:"inherit",resize:"none",minHeight:60,boxSizing:"border-box",lineHeight:1.65}}/>
        <button onClick={send} disabled={loading||!input.trim()} style={{background:input.trim()?TEAL:"#E2E8F0",border:"none",color:input.trim()?WHITE:"#999",borderRadius:10,padding:"0 16px",cursor:input.trim()?"pointer":"default",fontSize:20}}>↑</button>
      </div>
      <style>{`@keyframes b{0%,80%,100%{transform:translateY(0)}40%{transform:translateY(-6px)}}`}</style>
    </div>
  );
}

// ─── APP ──────────────────────────────────────────────────────────────────────
export default function TASSParentGuide(){
  const [tab,setTab] = useState("home");
  const current = TABS.find(t=>t.id===tab);
  return (
    <div style={{fontFamily:"'Segoe UI', system-ui, sans-serif",background:GREY,minHeight:"100vh",color:NAVY}}>
      <style>{`* { box-sizing: border-box; } ::-webkit-scrollbar { width: 4px; } ::-webkit-scrollbar-track { background: ${GREY}; } ::-webkit-scrollbar-thumb { background: #CBD5E1; border-radius: 4px; } textarea:focus, button:focus { outline: 2px solid ${TEAL}; outline-offset: 2px; }`}</style>
      {tab!=="home" && (
        <div style={{background:`linear-gradient(135deg, ${NAVY} 0%, #1A3060 100%)`,padding:"12px 16px",display:"flex",alignItems:"center",gap:12,position:"sticky",top:0,zIndex:100,boxShadow:"0 2px 8px rgba(0,0,0,0.15)"}}>
          <TASSLogo size="sm" theme="dark"/>
          <div style={{width:1,height:32,background:"rgba(255,255,255,0.15)",margin:"0 4px"}}/>
          <div style={{flex:1}}>
            <div style={{color:"rgba(255,255,255,0.6)",fontWeight:700,fontSize:11,textTransform:"uppercase",letterSpacing:0.5}}>Parent and Carer Guide</div>
            <div style={{color:WHITE,fontSize:13,fontWeight:700,marginTop:2}}>{current?.icon} {current?.label}</div>
          </div>
        </div>
      )}
      <div style={{maxWidth:640,margin:"0 auto",padding:"20px 16px 110px"}}>
        {tab==="home"       && <HomeModule setTab={setTab}/>}
        {tab==="why"        && <WhyModule/>}
        {tab==="myths"      && <MythsModule/>}
        {tab==="coaching"   && <CoachingModule/>}
        {tab==="programme"  && <ProgrammeModule/>}
        {tab==="cv"         && <CVModule/>}
        {tab==="resilience" && <ResilienceModule/>}
        {tab==="resources"  && <ResourcesModule/>}
        {tab==="coach"      && <AICoachModule/>}
      </div>
      <div style={{position:"fixed",bottom:0,left:0,right:0,background:WHITE,borderTop:"1px solid #E2E8F0",display:"flex",justifyContent:"center",padding:"8px 2px 12px",zIndex:100,boxShadow:"0 -2px 12px rgba(0,0,0,0.06)"}}>
        {TABS.map(t=>(
          <button key={t.id} onClick={()=>setTab(t.id)} style={{flex:1,maxWidth:58,background:"none",border:"none",cursor:"pointer",padding:"5px 2px",display:"flex",flexDirection:"column",alignItems:"center",gap:2}}>
            <div style={{fontSize:14,filter:tab===t.id?"none":"grayscale(1) opacity(0.35)"}}>{t.icon}</div>
            <div style={{fontSize:7,color:tab===t.id?TEAL:"#999",fontWeight:tab===t.id?800:400,textTransform:"uppercase",letterSpacing:"0.02em"}}>{t.label.substring(0,5)}</div>
            {tab===t.id && <div style={{width:14,height:2,background:TEAL,borderRadius:2}}/>}
          </button>
        ))}
      </div>
    </div>
  );
}
