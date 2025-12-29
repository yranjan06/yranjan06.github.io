export const azurePart3Content = {
    id: 5,
    title: "The Unsexy Secret to Building LLM Apps That Don't Suck",
    date: "2024-12-28",
    categories: ["Machine Learning", "AI Engineering", "Software Development"],
    tags: ["llm", "evaluation", "machine-learning", "rag", "ai-systems", "engineering-practices"],
    excerpt: "Discover why the most successful LLM applications start with systematic manual error analysis rather than automated evaluation pipelines. Learn practical strategies for identifying failure patterns, prioritizing improvements, and building evaluation systems that actually improve user experience.",
    slug: "unsexy-secret-building-llm-apps",
    readTime: 12,
    content: `
        <h3>The Evaluation Problem in LLM Systems</h3>
        
        <p>Here's something interesting about working with Large Language Models (think ChatGPT or similar AI systems). They've brought a unique challenge to building software. How do you test a system that gives you different answers each time? Traditional software is predictable. You give it input X, you get output Y, every single time. But LLMs? They're more like having a conversation with a creative person. Ask the same question twice, and you might get two perfectly valid but different answers.</p>
        
        <p>This unpredictability makes many engineers uncomfortable. When something feels unreliable, we naturally want to measure it, track it, and control it. So teams start building all sorts of evaluation systems. They create automated tests to catch when the AI makes stuff up (we call these hallucinations). They build dashboards that show metrics updating in real time. They set up systems where one AI judges another AI's responses. Everything gets measured, tracked, and visualized.</p>
        
        <p>Here's where it gets tricky. All these metrics might show green checkmarks. Your dashboards look great. Your automated tests pass. But then you talk to actual users, and they're frustrated. The AI gives technically correct answers that completely miss what they actually needed. It works according to your measurements but fails in real life. This disconnect between looking good on paper and being useful in practice is one of the biggest problems teams face when building AI applications.</p>
        
        <div class="blog-post__image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/Blog/LLM/Your_paragraph_text-removebg-preview.webp" alt="LLM Evaluation Challenges" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
        </div>
        
        <h3>Why Jumping to Automation Too Early Backfires</h3>
        
        <p>Let me share what usually happens. When you rush to build automated evaluation systems, you're making a big assumption. You're assuming you already know what's wrong with your AI system. But here's the thing, in most cases, especially when you're just starting out, that assumption is completely wrong.</p>
        
        <p>Imagine you've built a customer support chatbot that uses AI to answer questions. You set up automated checks for common issues. Does it hallucinate? Check. Is it relevant? Check. Is it factually accurate? Check. Does it sound appropriate? Check. All your metrics say everything is fine. Green lights everywhere. But customers are still unhappy and leaving frustrated comments.</p>
        
        <p>The metrics aren't lying to you. They're measuring exactly what you told them to measure. The real problem is you're measuring the wrong things. Maybe your system is pulling up completely irrelevant documents to answer questions, but your metrics are just checking if the AI makes stuff up based on those wrong documents. Or maybe users are asking questions with hidden context (like "How do I reset this?" when they actually mean a specific feature), but your system only looks at the literal words.</p>
        
        <p>This is why you'll see teams spending weeks trying to reduce hallucinations when their real problem is that the AI fundamentally misunderstands what users are asking for. Generic labels like "helpfulness" or "relevance" sound thorough, but they're often too vague to tell you what's actually broken. You end up fixing things that don't matter while the big problems keep hurting your users.</p>
        
        <div class="blog-post__image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/Blog/LLM/kp2.webp" alt="LLM Evaluation Process" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
        </div>
        
        <h3>Why Manual Analysis Actually Works Better</h3>
        
        <p>I know what you're thinking. Manual analysis sounds basic, maybe even boring. In a world where we can automate almost everything, why would you sit down and read through failures by hand? But here's what I've learned from working on these systems. This "boring" approach is actually the fastest way to make real progress.</p>
        
        <p>Andrew Ng, who's basically a legend in machine learning (he co-founded Coursera and led AI teams at Google and Baidu), has been saying this for years. In his book "Machine Learning Yearning" and his recent talks, he keeps emphasizing one point. Systematic error analysis, where you actually look at failures and understand them, is the biggest predictor of whether your AI project succeeds or fails. Not fancy tools. Not automation. Just understanding.</p>
        
        <p>The approach is simple. Look at real failures from your system. Try to understand why they happened. Count how often each type of problem occurs. Then use that information to decide what to fix first and, eventually, what to automate. You don't need any special infrastructure or tools. You just need to be willing to look at your system's actual behavior instead of hiding behind metrics.</p>
        
        <h3>The 50 Example Method</h3>
        
        <p>Here's a practical framework that works really well. Instead of trying to evaluate everything, collect exactly 50 examples where your system failed. These should be real problems. Maybe users flagged responses as unhelpful, or they gave low ratings, or you can clearly see the system messed up.</p>
        
        <p>Why 50? This number comes from experience across many AI projects. If you only look at 15 or 20 examples, you don't have enough information. You're just looking at random incidents. But if you analyze more than 50, you're not really learning much more. By the time you've gone through 30 to 50 failures, you start seeing the same patterns over and over. New examples stop teaching you new things about what's broken.</p>
        
        <p>One important thing though. Don't cherry pick interesting failures. Don't just grab the most recent ones either. You want a realistic mix of the problems your users actually face. If you have user ratings, focus on the low rated interactions. If you track support tickets, include examples from commonly reported issues. You're trying to understand the real distribution of problems, not collect weird edge cases that make for interesting technical discussions.</p>
        
        <div class="blog-post__image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/Blog/LLM/kp3.webp" alt="Error Analysis Framework" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
        </div>
        
        <h3>How to Set Up Your Analysis</h3>
        
        <p>The actual analysis is straightforward. Open a spreadsheet. Make one row for each failure. For every example, write down a few things. Give it a simple ID number. Record what the user asked or said. Note what your system responded with. Then comes the important part, labeling what went wrong.</p>
        
        <p>The categories you use depend on your specific application, but here are common ones that pop up. Retrieval failures mean your system grabbed the wrong documents or missed the right ones (this is common in systems that search through documents to answer questions). Intent misunderstanding is when the system completely misreads what the user wants. Hallucination is when it invents facts that aren't true. Context loss happens when it forgets important stuff from earlier in the conversation. Tone or formatting issues are when the answer is technically right but delivered in a way that doesn't help. Reasoning errors are when the logic just doesn't make sense.</p>
        
        <p>Here's something really important. Don't force each failure into just one category. Real problems often have multiple causes. A single bad response might have pulled the wrong documents AND made up additional information. Allowing multiple labels helps you see not just individual problems but also how issues combine, which often points to deeper structural problems in your system.</p>
        
        <p>After you've labeled all 50 examples, count how many times each problem type appeared. This simple counting transforms your gut feelings into real data. You now have something dashboards rarely give you, a clear ranked list of what's actually hurting your users.</p>
        
        <h3>The Math That Changes Everything</h3>
        
        <p>Once you have these counts, you can do something powerful. Let's say retrieval failures (grabbing the wrong documents) showed up in 28 out of your 50 examples. That means 56% of your observed failures have retrieval problems. Even if you made your retrieval system absolutely perfect, you'd still have issues in the other 44% of cases. But 56% is your maximum possible improvement from fixing retrieval.</p>
        
        <p>This math immediately tells you what to work on. Let's say formatting issues only appeared in 3 out of 50 examples. That's 6% of your problems. No matter how much time you spend making your formatting perfect, building custom checks for it, or creating fancy post processing, you cannot improve your overall system quality by more than 6%. If you haven't fixed the bigger issues yet, working on formatting is mathematically a waste of time.</p>
        
        <p>This is huge because it protects you from a super common trap. Every team encounters this. You find a rare but really interesting failure. It's technically fascinating. Someone gets excited and suggests building a custom solution for it. Before you do that, ask yourself one question. If we fix this perfectly, how much better does our overall system get? If the answer is less than 5%, put it on the back burner. The numbers protect you from optimizing things that don't actually matter.</p>
        
        <h3>The Right Way to Improve Your System</h3>
        
        <p>Manual analysis isn't something you do once and forget about. It's actually part of a cycle that keeps making your system better. Here's how it works. First, manually look at failures and label them. Second, count and categorize the patterns you see. Third, fix the single biggest problem. Fourth, collect new examples and analyze them again.</p>
        
        <p>Why repeat the analysis? Because fixing one problem changes what problems you see next. Imagine you improve how your system retrieves documents. Suddenly, you might notice that understanding what users mean becomes your biggest issue. Problems that were hidden behind the retrieval failures now become visible. Your understanding of what's broken evolves as you fix things, which is why you need to keep checking.</p>
        
        <p>Automation only comes in later, after you've done manual analysis a few times and keep seeing the same patterns. Once you've verified that certain problems are persistent, important, and well understood, then you can build automated checks for them. At that point, your automation tests for real problems that you know hurt users, not abstract concepts that just sound important.</p>
        
        <h3>A Real Example from Production</h3>
        
        <p>Let me tell you about a real team working on a customer support AI. They had built a system that searches through documentation to answer customer questions (this is called RAG or retrieval augmented generation, but don't worry about the fancy name). They had sophisticated automated evaluation. One AI would judge if another AI was hallucinating. They measured how similar responses were to good answers. They checked if facts matched the source documents. They verified responses were complete. All their automated metrics looked good. But customer satisfaction was terrible.</p>
        
        <p>So they did something simple. They grabbed 50 interactions where customers had rated their experience poorly and manually went through each one. What they found was eye opening. 48% of the failures involved retrieval, the system was either pulling up the wrong documents or missing relevant information entirely. 22% were about misunderstanding, the system didn't grasp what customers actually needed. 14% included hallucinations, making up information not in the documents. 16% were about tone or wordiness, where answers were technically correct but practically useless.</p>
        
        <p>This completely flipped their priorities. They had been heavily focused on hallucination detection, which only affected 14% of failures. Meanwhile, they'd largely ignored retrieval quality, which was causing nearly half of all problems. Based on this analysis, they shifted gears. They improved how the system searches for documents, made it better at understanding what customers were really asking, and refined how it decides what information is relevant.</p>
        
        <p>Two weeks later, customer satisfaction scores jumped 43%. They didn't build new evaluation infrastructure. They didn't create complex automated testing. They didn't use any sophisticated new AI techniques. They just understood what actually mattered and fixed that first.</p>
        
        <h3>Why This Feels Wrong (But Really Isn't)</h3>
        
        <p>I get it. If you're an engineer or you're studying to become one, manual work feels low status. There's no clever algorithm. No impressive architecture to show off. No cool tools to talk about. You're literally just reading examples and filling out spreadsheets. It feels like something an intern would do, not "real" engineering work.</p>
        
        <p>But this mindset misses something crucial. This is where you actually learn how users interact with your system. Not how you think they'll use it, not how your design docs say they should use it, but how they really use it. You discover the actual patterns in your data, not the theoretical patterns you assumed. You find your AI's real weaknesses, not the ones you read about in research papers.</p>
        
        <p>Every hour you spend understanding these failures saves you weeks of working on the wrong things. It grounds your decisions in reality instead of guesses or assumptions. The knowledge you build here influences way more than just evaluation. It affects how you design features, what you prioritize, and where you spend your resources.</p>
        
        <h3>How to Actually Do This</h3>
        
        <p>Want to try this? Here's how to start. Block out one day on your calendar. Grab 50 examples where your system failed. Open a simple spreadsheet that your team can work on together. You don't need specialized tools, Google Sheets or Excel works fine.</p>
        
        <p>Get different people involved. Have engineers look at the examples. Get product managers to review them. If you can, include people who talk to customers regularly, like support team members. Different perspectives reveal different insights. An engineer might see a retrieval problem, while a product manager recognizes it's actually a missing feature, and a support person identifies it as a common user misunderstanding.</p>
        
        <p>Don't just record categories. Save actual examples that show each problem clearly. When you find that 48% of failures are retrieval issues, keep concrete examples that illustrate what that looks like. These examples become incredibly valuable later for debugging, explaining problems to teammates or managers, and checking if your fixes actually worked.</p>
        
        <p>After everyone has gone through the examples, get the team together to talk about what to do. Let the numbers guide the conversation. A problem that shows up in 30% of cases but requires completely rebuilding your system might need to wait. A problem at 20% might have an obvious quick fix. Use the data to inform your decisions, not to make them automatically.</p>
        
        <h3>When Should You Automate?</h3>
        
        <p>You're ready to automate when three things are true. One, you've done manual analysis several times and keep seeing the same patterns. Two, you've identified specific problems that really hurt user experience. Three, you have clear examples that show what good and bad look like for those problems.</p>
        
        <p>At this point, automation serves a different purpose. You're not trying to discover what matters anymore, you already know. You're trying to make sure you don't accidentally break the things you fixed. Your automated tests become focused and specific, testing things that you know correlate with actual user satisfaction.</p>
        
        <p>This order matters a lot. Manual analysis first, automation second. It ensures you measure things that matter instead of things that are easy to measure. It prevents you from spending time optimizing proxy metrics that don't actually connect to whether users find your system helpful.</p>
        
        <h3>Building AI Systems That Actually Work</h3>
        
        <div class="blog-post__image">
            <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1 1'%3E%3C/svg%3E" data-src="/images/Blog/LLM/k4.webp" alt="Building Effective AI Systems" class="lazy-loading" loading="lazy" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
        </div>
        
        <p>The path to building useful AI applications doesn't start with fancy evaluation infrastructure. It starts with understanding. Before you build dashboards, before you set up AI judges, before you create comprehensive test suites, spend time with manual analysis. Look at real failures. Understand them. Let that understanding drive your decisions.</p>
        
        <p>This approach won't impress people in the same way that a sophisticated automated system might. It doesn't involve novel architectures or clever algorithms. But it's the fastest way to build something that actually works for real users. Something that doesn't just pass automated checks but genuinely helps people.</p>
        
        <p>The most successful AI teams I've seen all share something in common. They start every new phase of development by directly looking at failures. They resist the urge to automate too early. They let real observations about real problems drive what they build. This discipline turns AI development from a game of managing metrics into a practice of continuously learning about what users need and how your system behaves.</p>
        
        <p>It's not the flashiest approach. But it's the one that consistently delivers systems people actually want to use. And at the end of the day, that's what matters.</p>
    `
};
