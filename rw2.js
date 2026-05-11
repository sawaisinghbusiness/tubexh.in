const fs = require('fs');
let c = fs.readFileSync('index.html', 'utf8');

// Big content blocks
c = c.replace(
  "When searching for web designers Jaipur businesses can trust, TubeXh stands out for several compelling reasons. Our approach combines creativity with strategy, ensuring every site we build delivers both visual appeal and tangible commercial growth.",
  "When searching for a digital growth partner that delivers real results, TubeXh stands out. Our approach fuses AI-powered automation with creative strategy, ensuring every solution delivers both visual impact and measurable commercial growth."
);

c = c.replace(
  "Our team brings over 25 years of combined experience in website design, having helped hundreds of local businesses establish and grow their online presence. We don't just build websites \u2013 we create digital experiences that engage your target audience. Each project begins with a deep dive into your unique goals and target audience, ensuring the final product looks impressive and serves your strategic objectives.",
  "Our team brings elite expertise in AI, automation, and modern digital growth \u2014 having helped businesses across industries scale their online presence. We don't just build websites \u2014 we engineer intelligent digital ecosystems that engage your audience and drive revenue. Every project begins with deep strategic analysis of your goals and market."
);

c = c.replace(
  "Unlike larger agencies where you might feel like just another number, we provide personalised attention to every client. We offer transparent pricing with no hidden fees, ensuring you know exactly what you are investing in. Plus, our local presence means we understand the Rajasthan, Indian market and can tailor solutions accordingly.",
  "Unlike larger agencies, we provide dedicated attention to every client with transparent pricing and no hidden fees. Our team brings deep expertise in AI, automation, and modern digital growth strategies, ensuring your investment delivers maximum ROI."
);

c = c.replace(
  "TubeXh offers a comprehensive suite of digital services designed to help your business thrive online. We don't just create beautiful layouts \u2013 we build complete digital ecosystems that drive traffic, engage visitors, and convert leads.",
  "TubeXh offers a comprehensive suite of AI-powered digital services designed to scale your business. From intelligent automation and high-performance websites to SEO that dominates rankings and branding that captivates \u2014 we build complete digital ecosystems that drive traffic, engagement, and revenue."
);

c = c.replace(
  "From initial concept and custom web design to ongoing SEO, content marketing, and maintenance, we are your complete digital partner. Our integrated approach ensures all aspects of your online presence work together seamlessly. Whether you need a simple brochure site, a complex e-commerce platform, or a full-fledged digital marketing strategy, we have the skills and experience to deliver.",
  "From initial strategy and system design to ongoing optimisation and scale, we are your complete digital growth partner. Our integrated approach ensures all aspects of your online presence work together seamlessly. Whether you need AI automation, a high-performance website, or a full digital marketing engine, we deliver."
);

c = c.replace(
  "Our core services include custom layouts, responsive development, and user experience optimisation. Every site we create is built from the ground up to reflect your brand identity. We use the latest technologies to ensure your site loads quickly and ranks well. Services include:",
  "Our core services include AI automation, custom web development, UX/UI design, advanced SEO, branding, video production, and content strategy. Every solution we build is crafted from the ground up to reflect your brand identity and drive measurable growth. Services include:"
);

// Process steps
c = c.replace(
  "Every successful website design project begins with understanding your business. During our discovery phase, we meet with you to discuss your vision, analyse your competitors, and identify opportunities. We review your existing site (if applicable), define key success metrics, and establish project timelines and milestones. You emerge with a clear strategic roadmap and a shared vision for the project ahead.",
  "Every successful digital growth project begins with understanding your business. During our discovery phase, we analyse your market, study your competitors, identify automation opportunities, and define key success metrics. You emerge with a clear strategic roadmap and a shared vision for the project ahead."
);

c = c.replace(
  "Next, our creative team brings your vision to life through custom mockups. We create visual representations of your homepage and key interior pages, showcasing the layout, colour scheme, and typography. This is your opportunity to see how your Jaipur web design project will look before development begins. We revise based on your feedback until the design is perfect.",
  "Next, our team transforms your vision into a comprehensive digital blueprint. We create wireframes and prototypes of your key pages and system flows, showcasing the architecture, design language, and user experience. This is your opportunity to see how your digital solution will look and function before we build it. We refine based on your feedback until it\u2019s perfect."
);

c = c.replace(
  "Once you\u2019ve approved the design, we begin the development phase. We transform approved mockups into a fully functional, responsive site using clean, modern code. This includes responsive coding for all devices, CMS integration for easy content updates, and security implementation. Throughout development, we provide regular progress updates and a staging link for your review.",
  "Once you approve the blueprint, we begin the build phase. Our team transforms designs into a fully functional, high-performance solution using modern tech stacks. This includes responsive development, AI system integration, CMS setup, and security implementation. Throughout the build, we provide regular progress updates and a staging environment for your review."
);

c = c.replace(
  "The final step is launch and ongoing optimisation. Before going live, we conduct final testing, set up analytics tracking, and submit your sitemap to search engines. After launch, we don't just disappear \u2013 we monitor performance, provide training on updating content, and remain available for support and future enhancements as your business grows.",
  "The final step is launch and continuous optimisation. Before going live, we conduct rigorous testing, set up analytics and tracking, and optimise for search engines. After launch, we don't just disappear \u2013 we monitor performance, provide training, and remain available for ongoing support and enhancements as your business scales."
);

// Other remaining paragraphs  
c = c.replace(
  "We live and work in the communities we serve. We understand the Rajasthan, Indian business landscape and local consumer behaviour. This insight informs every decision, ensuring your site resonates with local customers.",
  "We leverage cutting-edge AI, automation frameworks, and modern tech stacks to deliver solutions that outperform competitors. Our data-driven approach ensures every decision is backed by insights, not guesswork."
);

c = c.replace(
  "Your project is led by a dedicated client success manager who stays with you from start to finish. They manage all communication, collect your needs, coordinate with our skilled remote design team, and keep everything on schedule \u2014 giving you clear updates, fast replies, and personalized attention throughout the entire journey.",
  "Your project is led by a dedicated growth manager who stays with you from strategy to scale. They manage all communication, align deliverables with your goals, coordinate with our expert team, and keep everything on schedule \u2014 giving you clear updates, fast replies, and personalised attention throughout the entire journey."
);

c = c.replace(
  "Our comprehensive suite of digital services includes responsive web design, e-commerce solutions, SEO optimization, and ongoing support. We customise each project to your specific needs, ensuring your website works as hard as you do.",
  "Our comprehensive suite of digital growth services includes AI automation, custom web design & development, advanced SEO, premium branding, video production, content strategy, social media marketing, CRM integration, and conversion funnel design. We customise every solution to your specific business needs."
);

fs.writeFileSync('index.html', c, 'utf8');
console.log('Section content rewritten');