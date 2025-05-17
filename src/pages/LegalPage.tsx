
import { useParams } from "react-router-dom";
import { Footer } from "@/components/footer";
import { MainNav } from "@/components/main-nav";

const legalContent = {
  privacy: {
    title: "Privacy Policy",
    content: `
      <h2>Privacy Policy</h2>
      <p>Last updated: May 17, 2025</p>
      <p>This Privacy Policy describes Our policies and procedures on the collection, use and disclosure of Your information when You use the Service.</p>
      <h3>Information Collection</h3>
      <p>We collect several different types of information for various purposes to provide and improve our Service to you.</p>
      <h3>Use of Data</h3>
      <p>HealthFuture uses the collected data for various purposes such as:</p>
      <ul>
        <li>To provide and maintain our Service</li>
        <li>To notify you about changes to our Service</li>
        <li>To provide customer support</li>
        <li>To gather analysis or valuable information so that we can improve our Service</li>
        <li>To monitor the usage of our Service</li>
      </ul>
    `
  },
  terms: {
    title: "Terms of Service",
    content: `
      <h2>Terms of Service</h2>
      <p>Last updated: May 17, 2025</p>
      <p>Please read these Terms of Service carefully before using the HealthFuture website.</p>
      <h3>Use License</h3>
      <p>Permission is granted to temporarily download one copy of the materials on HealthFuture's website for personal, non-commercial transitory viewing only.</p>
      <h3>Disclaimer</h3>
      <p>The materials on HealthFuture's website are provided on an 'as is' basis. HealthFuture makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties.</p>
    `
  },
  cookies: {
    title: "Cookie Policy",
    content: `
      <h2>Cookie Policy</h2>
      <p>Last updated: May 17, 2025</p>
      <p>This Cookie Policy explains how HealthFuture uses cookies and similar technologies to recognize you when you visit our website.</p>
      <h3>What are cookies?</h3>
      <p>Cookies are small data files that are placed on your computer or mobile device when you visit a website. Cookies are widely used by website owners in order to make their websites work, or to work more efficiently, as well as to provide reporting information.</p>
      <h3>How do we use cookies?</h3>
      <p>We use cookies for several reasons. Some cookies are required for technical reasons in order for our Website to operate, and we refer to these as "essential" or "strictly necessary" cookies.</p>
    `
  },
  about: {
    title: "About HealthFuture",
    content: `
      <h2>About HealthFuture</h2>
      <p>HealthFuture is a predictive health analytics platform designed to help individuals make better lifestyle choices through data-driven insights.</p>
      <h3>Our Mission</h3>
      <p>Our mission is to empower individuals to take control of their health journey through accessible, actionable data. We believe that by understanding the relationships between daily habits and long-term health outcomes, everyone can make more informed decisions about their wellbeing.</p>
      <h3>Our Team</h3>
      <p>HealthFuture was founded by a team of health professionals, data scientists, and software engineers passionate about preventive healthcare and wellness technology.</p>
    `
  }
};

export default function LegalPage() {
  const { pageType = "privacy" } = useParams();
  const pageData = legalContent[pageType as keyof typeof legalContent] || legalContent.privacy;
  
  return (
    <div className="min-h-screen bg-background flex flex-col">
      <MainNav />
      <div className="container mx-auto py-8 px-4 flex-1">
        <div className="max-w-3xl mx-auto prose dark:prose-invert">
          <div dangerouslySetInnerHTML={{ __html: pageData.content }} />
        </div>
      </div>
      <Footer />
    </div>
  );
}
