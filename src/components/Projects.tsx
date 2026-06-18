// import { useEffect, useState } from "react";
// import { FileText, Award, FlaskConical, Activity, ShieldAlert } from "lucide-react";
// import { RevealOnScroll } from "./Interactions";

// const Publications = () => {
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   // Your ORCID ID
//   const ORCID_ID = "0009-0009-5196-7100"; 

//   // Icon array to cycle through for structural variation
//   const icons = [
//     <FlaskConical size={24} strokeWidth={1.5} />,
//     <FileText size={24} strokeWidth={1.5} />,
//     <Activity size={24} strokeWidth={1.5} />,
//     <Award size={24} strokeWidth={1.5} />,
//     <ShieldAlert size={24} strokeWidth={1.5} />
//   ];

//   useEffect(() => {
//     const fetchORCIDWorks = async () => {
//       try {
//         // Step 1: Fetch the works list to obtain put-codes
//         const response = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
//           headers: {
//             "Accept": "application/json"
//           }
//         });
        
//         if (!response.ok) throw new Error("Failed to fetch works index");
//         const data = await response.json();
        
//         const groups = data.group ? data.group.slice(0, 5) : [];
        
//         // Step 2: Fetch full details for each work individually to dynamically retrieve complete contributor datasets
//         const detailedPapersPromises = groups.map(async (group, index) => {
//           const summary = group["work-summary"][0];
//           const putCode = summary["put-code"];
          
//           try {
//             const detailResponse = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/work/${putCode}`, {
//               headers: {
//                 "Accept": "application/json"
//               }
//             });
            
//             if (!detailResponse.ok) throw new Error("Detailed fetch failed");
//             const detailData = await detailResponse.json();
            
//             const title = detailData.title?.title?.value || summary.title?.title?.value || "Untitled Publication";
//             const journal = detailData["journal-title"]?.value || summary["journal-title"]?.value || "Scientific Reports";
            
//             // Format Date Safely
//             const pDate = detailData["publication-date"] || summary["publication-date"];
//             const year = pDate?.year?.value || "2026";
//             const month = pDate?.month?.value || "06";
//             const day = pDate?.day?.value || "15";
//             const displayDate = [year, month, day].filter(Boolean).join("-");

//             const type = detailData.type ? detailData.type.replace("-", " ") : "Journal article";
            
//             // Extract DOI Safely
//             const extIds = detailData["external-ids"]?.["external-id"] || summary["external-ids"]?.["external-id"] || [];
//             const doiObj = extIds.find(id => id["external-id-type"] === "doi");
//             const doi = doiObj ? doiObj["external-id-value"] : "10.1038/s41598-026-56319-6";

//             // Extract Contributors completely dynamically from the detailed record endpoint response
//             const contributorList = detailData["contributors"]?.["contributor"] || [];
//             const contributors = contributorList
//               .map(c => c["credit-name"]?.value)
//               .filter(Boolean)
//               .join("; ") || "Contributors Unavailable";
            
//             return {
//               title: title,
//               description: (
//                 <div className="mt-3 text-[14px] text-[#444746] space-y-1.5 font-sans">
//                   <div className="font-medium text-[#1f1f1f] text-[15px]">{journal}</div>
//                   <div className="text-[#5f6368]">
//                     {displayDate} <span className="mx-1.5">|</span> <span className="capitalize">{type}</span>
//                   </div>
//                   <div className="text-[#1a73e8]">
//                     DOI: <a href={`https://doi.org/${doi}`} target="_blank" rel="noopener noreferrer" className="hover:underline">{doi}</a>
//                   </div>
//                   <div className="text-[#444746] text-[12px] font-bold tracking-wider uppercase pt-1">
//                     CONTRIBUTORS: <span className="font-normal normal-case text-[#5f6368]">{contributors}</span>
//                   </div>
//                 </div>
//               ),
//               icon: icons[index % icons.length]
//             };
//           } catch (itemError) {
//             // Internal error safety fallback matching summary parameters cleanly
//             const title = summary.title?.title?.value || "Untitled Publication";
//             const journal = summary["journal-title"]?.value || "Scientific Reports";
//             const year = summary["publication-date"]?.year?.value || "2026";
//             const type = summary.type ? summary.type.replace("-", " ") : "Journal article";
            
//             return {
//               title: title,
//               description: (
//                 <div className="mt-3 text-[14px] text-[#444746] space-y-1.5 font-sans">
//                   <div className="font-medium text-[#1f1f1f] text-[15px]">{journal}</div>
//                   <div className="text-[#5f6368]">
//                     {year} <span className="mx-1.5">|</span> <span className="capitalize">{type}</span>
//                   </div>
//                   <div className="text-[#444746] text-[12px] font-bold tracking-wider uppercase pt-1">
//                     CONTRIBUTORS: <span className="font-normal normal-case text-[#5f6368]">Retrieving contributor data...</span>
//                   </div>
//                 </div>
//               ),
//               icon: icons[index % icons.length]
//             };
//           }
//         });

//         const resolvedPapers = await Promise.all(detailedPapersPromises);
//         setPapers(resolvedPapers);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching ORCID structural records:", error);
        
//         // Final fallback data layer
//         setPapers([
//           {
//             title: "Uncovering the potential anti-cancer compounds from Strobilanthes cusia against colorectal cancer through network pharmacology and molecular docking",
//             description: (
//               <div className="mt-3 text-[14px] text-[#444746] space-y-1.5 font-sans">
//                 <div className="font-medium text-[#1f1f1f] text-[15px]">Scientific Reports</div>
//                 <div className="text-[#5f6368]">
//                   2026-06-15 <span className="mx-1.5">|</span> <span>Journal article</span>
//                 </div>
//                 <div className="text-[#1a73e8]">
//                   DOI: <a href="https://doi.org/10.1038/s41598-026-56319-6" target="_blank" rel="noopener noreferrer" className="hover:underline">10.1038/s41598-026-56319-6</a>
//                 </div>
//                 <div className="text-[#444746] text-[12px] font-bold tracking-wider uppercase pt-1">
//                   CONTRIBUTORS: <span className="font-normal normal-case text-[#5f6368]">Yogananthan Dhanapal; Duraisamy Sridhar; Sulekha Khute; Paranthaman Subash</span>
//                 </div>
//               </div>
//             ),
//             icon: icons[0],
//           }
//         ]);
//         setLoading(false);
//       }
//     };

//     fetchORCIDWorks();
//   }, [ORCID_ID]);

//   return (
//     <section id="projects" className="py-32 px-6 md:px-12 bg-[#ffffff] relative border-t border-border/30">
//       <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">
        
//         {/* Left statically positioned container matching Google Ads layout */}
//         <div className="w-full lg:w-[45%] lg:sticky lg:top-[30vh] h-fit z-10 pt-4">
//           <RevealOnScroll>
//             {/* Contextual Over-title */}
//             <p className="text-[hsl(var(--google-blue))] font-semibold tracking-wider uppercase text-sm mb-4">
//               Featured Research
//             </p>
            
//             <h2 className="text-[40px] md:text-[52px] font-medium text-[#202124] tracking-[-0.02em] leading-[1.15] mb-6" style={{ fontFamily: "Google Sans Display, sans-serif" }}>
//               Publications & Literature
//             </h2>
            
//             <p className="text-[16px] text-[#5f6368] leading-[1.6] mb-8 max-w-[400px]">
//               Explore the peer-reviewed papers, chemical analytics datasets, molecular docking models, and network pharmacology records I've contributed to the global scientific community.
//             </p>
            
//             <a 
//               href={`https://orcid.org/${ORCID_ID}`}
//               target="_blank"
//               rel="noopener noreferrer" 
//               className="inline-flex items-center justify-center rounded-full bg-[#1a73e8] px-6 py-2.5 text-[14px] font-medium text-white transition-all hover:bg-[#1b66c9] hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] focus:outline-none focus:ring-2 focus:ring-[#1a73e8] focus:ring-offset-2"
//             >
//               View ORCID Profile
//             </a>
//           </RevealOnScroll>
//         </div>

//         {/* Right scrolling vertical cards - Exact Google Card styling */}
//         <div className="flex-1 flex flex-col gap-6 w-full lg:pt-12 ">
//           {loading ? (
//             <div className="text-center py-12 text-[#5f6368] text-[15px]">Retrieving record registry data...</div>
//           ) : (
//             papers.map((project, i) => (
//               <RevealOnScroll key={i} delay={i * 100}>
//                 <div className="bg-white border text-left border-[#dadce0] rounded-[16px] p-8 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-shadow duration-300">
                  
//                   {/* Light blue circular icon container */}
//                   <div 
//                     className="w-[56px] h-[56px] rounded-full flex items-center justify-center mb-6 bg-[#e8f0fe] text-[#1a73e8]"
//                   >
//                     {project.icon}
//                   </div>
                  
//                   <h3 className="text-[24px] font-medium text-[#202124] mb-3 tracking-tight" style={{ fontFamily: "Google Sans, sans-serif" }}>
//                     {project.title}
//                   </h3>
                  
//                   {/* Container prints the structured dynamic JSX without overriding global UI style layout rules */}
//                   <div className="text-[15px] text-[#5f6368] leading-[1.6]">
//                     {project.description}
//                   </div>
                  
//                 </div>
//               </RevealOnScroll>
//             ))
//           )}
//         </div>
        
//       </div>
//     </section>
//   );
// };

// export default Publications;


import { useEffect, useState } from "react";
import { FileText, Award, FlaskConical, Activity, ShieldAlert } from "lucide-react";
import { RevealOnScroll } from "./Interactions";

const Publications = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const ORCID_ID = "0009-0009-5196-7100";
  const GOOGLE_SCHOLAR_ID = "YOUR_GOOGLE_SCHOLAR_ID"; // Replace with your actual Google Scholar ID

  const icons = [
    <FlaskConical size={24} strokeWidth={1.5} />,
    <FileText size={24} strokeWidth={1.5} />,
    <Activity size={24} strokeWidth={1.5} />,
    <Award size={24} strokeWidth={1.5} />,
    <ShieldAlert size={24} strokeWidth={1.5} />
  ];

  useEffect(() => {
    const fetchORCIDWorks = async () => {
      try {
        const response = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/works`, {
          headers: { "Accept": "application/json" }
        });

        if (!response.ok) throw new Error("Failed to fetch works index");
        const data = await response.json();
        const groups = data.group ? data.group.slice(0, 5) : [];

        const detailedPapersPromises = groups.map(async (group, index) => {
          const summary = group["work-summary"][0];
          const putCode = summary["put-code"];

          try {
            const detailResponse = await fetch(`https://pub.orcid.org/v3.0/${ORCID_ID}/work/${putCode}`, {
              headers: { "Accept": "application/json" }
            });

            if (!detailResponse.ok) throw new Error("Detailed fetch failed");
            const detailData = await detailResponse.json();

            const title = detailData.title?.title?.value || summary.title?.title?.value || "Untitled Publication";
            const journal = detailData["journal-title"]?.value || summary["journal-title"]?.value || "Scientific Reports";

            const pDate = detailData["publication-date"] || summary["publication-date"];
            const year = pDate?.year?.value || "2026";
            const month = pDate?.month?.value || "06";
            const day = pDate?.day?.value || "15";
            const displayDate = [year, month, day].filter(Boolean).join("-");

            const type = detailData.type ? detailData.type.replace("-", " ") : "Journal article";

            const extIds = detailData["external-ids"]?.["external-id"] || summary["external-ids"]?.["external-id"] || [];
            const doiObj = extIds.find(id => id["external-id-type"] === "doi");
            const doi = doiObj ? doiObj["external-id-value"] : "10.1038/s41598-026-56319-6";

            const contributorList = detailData["contributors"]?.["contributor"] || [];
            const contributors = contributorList
              .map(c => c["credit-name"]?.value)
              .filter(Boolean)
              .join("; ") || "Contributors Unavailable";

            return {
              title,
              journal,
              displayDate,
              type,
              doi,
              contributors,
              icon: icons[index % icons.length]
            };
          } catch {
            const title = summary.title?.title?.value || "Untitled Publication";
            const journal = summary["journal-title"]?.value || "Scientific Reports";
            const year = summary["publication-date"]?.year?.value || "2026";
            const type = summary.type ? summary.type.replace("-", " ") : "Journal article";

            return {
              title,
              journal,
              displayDate: year,
              type,
              doi: null,
              contributors: "Retrieving contributor data...",
              icon: icons[index % icons.length]
            };
          }
        });

        const resolvedPapers = await Promise.all(detailedPapersPromises);
        setPapers(resolvedPapers);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching ORCID records:", error);
        setPapers([
          {
            title: "Uncovering the potential anti-cancer compounds from Strobilanthes cusia against colorectal cancer through network pharmacology and molecular docking",
            journal: "Scientific Reports",
            displayDate: "2026-06-15",
            type: "Journal article",
            doi: "10.1038/s41598-026-56319-6",
            contributors: "Yogananthan Dhanapal; Duraisamy Sridhar; Sulekha Khute; Paranthaman Subash",
            icon: icons[0],
          }
        ]);
        setLoading(false);
      }
    };

    fetchORCIDWorks();
  }, [ORCID_ID]);

  const PublicationCard = ({ project, i }) => (
    <RevealOnScroll key={i} delay={i * 100}>
      <div className="bg-white border text-left border-[#dadce0] rounded-[16px] p-8 shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] hover:shadow-[0_1px_3px_0_rgba(60,64,67,0.3),0_4px_8px_3px_rgba(60,64,67,0.15)] transition-shadow duration-300">
        <div className="w-[56px] h-[56px] rounded-full flex items-center justify-center mb-6 bg-[#e8f0fe] text-[#1a73e8]">
          {project.icon}
        </div>

        <h3 className="text-[22px] font-medium text-[#202124] mb-4 tracking-tight leading-snug" style={{ fontFamily: "Google Sans, sans-serif" }}>
          {project.title}
        </h3>

        <div className="mt-3 text-[14px] text-[#444746] space-y-2 font-sans">
          <div className="font-medium text-[#1f1f1f] text-[15px]">{project.journal}</div>
          <div className="text-[#5f6368]">
            {project.displayDate}
            <span className="mx-1.5">|</span>
            <span className="capitalize">{project.type}</span>
          </div>

          {/* DOI filled button */}
          {project.doi && (
            <div className="pt-1">
              <a
                href={`https://doi.org/${project.doi}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 bg-[#1a73e8] hover:bg-[#1b66c9] text-white text-[12px] font-medium px-3 py-1 rounded-full transition-colors duration-200 no-underline"
              >
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z" />
                </svg>
                DOI: {project.doi}
              </a>
            </div>
          )}

          <div className="text-[#444746] text-[12px] font-bold tracking-wider uppercase pt-1">
            CONTRIBUTORS:{" "}
            <span className="font-normal normal-case text-[#5f6368]">{project.contributors}</span>
          </div>
        </div>
      </div>
    </RevealOnScroll>
  );

  return (
    <section id="projects" className="py-32 px-6 md:px-12 bg-[#ffffff] relative border-t border-border/30">
      <div className="max-w-[1200px] mx-auto flex flex-col lg:flex-row gap-16 lg:gap-24 relative">

        {/* Left sticky panel */}
        <div className="w-full lg:w-[45%] lg:sticky lg:top-[30vh] h-fit z-10 pt-4">
          <RevealOnScroll>
            <p className="text-[hsl(var(--google-blue))] font-semibold tracking-wider uppercase text-sm mb-4">
              Featured Research
            </p>

            <h2
              className="text-[40px] md:text-[52px] font-medium text-[#202124] tracking-[-0.02em] leading-[1.15] mb-6"
              style={{ fontFamily: "Google Sans Display, sans-serif" }}
            >
              Publications & Literature
            </h2>

            <p className="text-[16px] text-[#5f6368] leading-[1.6] mb-8 max-w-[400px]">
              Explore the peer-reviewed papers, chemical analytics datasets, molecular docking models, and network pharmacology records I've contributed to the global scientific community.
            </p>

            {/* Profile buttons */}
            <div className="flex flex-wrap gap-3">
              {/* ORCID — official green #A6CE39 */}
              <a
                href={`https://orcid.org/${ORCID_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:opacity-90 hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] focus:outline-none"
                style={{ backgroundColor: "#A6CE39" }}
              >
                {/* ORCID iD icon */}
                <svg width="18" height="18" viewBox="0 0 256 256" fill="white">
                  <path d="M128 0C57.3 0 0 57.3 0 128s57.3 128 128 128 128-57.3 128-128S198.7 0 128 0zm-29.2 178.3H80.7V98.5h18.1v79.8zm-9-90.6c-5.8 0-10.5-4.7-10.5-10.5s4.7-10.5 10.5-10.5 10.5 4.7 10.5 10.5-4.7 10.5-10.5 10.5zm75.8 90.6h-18.1v-38.8c0-9.3-.2-21.2-12.9-21.2-12.9 0-14.9 10.1-14.9 20.5v39.5h-18.1V98.5h17.4v10.9h.2c2.4-4.6 8.3-9.4 17.1-9.4 18.3 0 21.7 12 21.7 27.7v50.6z" />
                </svg>
                View ORCID Profile
              </a>

              {/* Google Scholar — official blue #4285F4 */}
              <a
                href={`https://scholar.google.com/citations?user=${GOOGLE_SCHOLAR_ID}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-[14px] font-medium text-white transition-all hover:opacity-90 hover:shadow-[0_1px_2px_0_rgba(60,64,67,0.3),0_1px_3px_1px_rgba(60,64,67,0.15)] focus:outline-none"
                style={{ backgroundColor: "#4285F4" }}
              >
                {/* Google Scholar mortarboard icon */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="white">
                  <path d="M12 3L1 9l11 6 9-4.91V17h2V9L12 3zM5 13.18v4L12 21l7-3.82v-4L12 17l-7-3.82z" />
                </svg>
                View Google Scholar
              </a>
            </div>
          </RevealOnScroll>
        </div>

        {/* Right scrolling cards */}
        <div className="flex-1 flex flex-col gap-6 w-full lg:pt-12">
          {loading ? (
            <div className="text-center py-12 text-[#5f6368] text-[15px]">
              Retrieving record registry data...
            </div>
          ) : (
            papers.map((project, i) => (
              <PublicationCard key={i} project={project} i={i} />
            ))
          )}
        </div>

      </div>
    </section>
  );
};

export default Publications;