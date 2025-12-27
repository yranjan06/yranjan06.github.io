import { azurePart3Content } from './azurePart3.js';

export const blogPosts = [
    azurePart3Content,
    {
        id: 1,
        title: "Azure Virtual Machine",
        date: "2024-12-26",
        categories: ["Cloud Computing", "Azure"],
        tags: ["azure", "virtual-machine", "cloud", "microsoft"],
        excerpt: "An Azure Virtual Machine (VM) is essentially a computer that exists inside Microsoft's cloud data centers instead of sitting physically on your desk. Learn how Azure VMs provide flexible, scalable computing resources that you can access through the internet with full control over the operating system and resources.",
        slug: "azure-virtual-machine",
        readTime: 5,
        content: `
            <div class="audio-header-container" style="display: flex; align-items: center; gap: 15px; margin-bottom: 15px; flex-wrap: wrap;">
                <h3 style="margin: 0; flex: 1; min-width: 200px;">What is an Azure Virtual Machine?</h3>
                <div class="audio-controls" style="display: flex; align-items: center; gap: 10px; flex-wrap: nowrap;">
                    <audio id="azure-audio-1" style="display: none;" 
                           ontimeupdate="document.getElementById('audio-progress-1').style.width = ((this.currentTime / this.duration) * 100) + '%';"
                           onplay="document.getElementById('logo-btn-1').style.opacity='1'; document.getElementById('wave-1').style.display='flex'; document.querySelectorAll('#logo-btn-1 path').forEach(p => p.style.color='hsl(354.4, 81.96%, 55.66%)');"
                           onpause="document.getElementById('logo-btn-1').style.opacity='0.5'; document.getElementById('wave-1').style.display='none'; document.querySelectorAll('#logo-btn-1 path').forEach(p => p.style.color='hsl(219, 14%, 71%)');"
                           onended="document.getElementById('logo-btn-1').style.opacity='0.5'; document.getElementById('wave-1').style.display='none'; document.getElementById('audio-progress-1').style.width='0%'; document.querySelectorAll('#logo-btn-1 path').forEach(p => p.style.color='hsl(219, 14%, 71%)');">
                        <source src="images/BlogAudio/Azure01/Azure.m4a" type="audio/mp4">
                    </audio>
                    <button id="logo-btn-1" onclick="document.getElementById('azure-audio-1').paused ? document.getElementById('azure-audio-1').play() : document.getElementById('azure-audio-1').pause()" 
                            style="width: 40px; height: 40px; border-radius: 50%; border: 2px solid hsl(219, 14%, 71%); background: transparent; cursor: pointer; display: flex; align-items: center; justify-content: center; transition: all 0.3s ease; padding: 8px; flex-shrink: 0; opacity: 0.5;"
                            onmouseover="this.style.background='hsl(219, 14%, 71%, 0.1)'; this.style.borderColor='hsl(0, 0%, 100%)';"
                            onmouseout="this.style.background='transparent'; this.style.borderColor='hsl(219, 14%, 71%)';">
                        <svg width="24" height="24" viewBox="0 0 52 52" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M 1 50 L 1 1 L 51 1 L 51 25 L 38 25 L 38 12 L 13 12 L 13 51 L 1 51" 
                                  fill="currentColor" 
                                  stroke="currentColor" 
                                  stroke-width="1" 
                                  stroke-linejoin="round" 
                                  stroke-linecap="round"
                                  style="color: hsl(219, 14%, 71%); transition: color 0.3s ease;"/>
                            <path d="M 21 25 L 34 25 L 34 38 L 51 38 L 51 51 L 21 51 Z" 
                                  fill="currentColor" 
                                  stroke="currentColor" 
                                  stroke-width="1" 
                                  stroke-linejoin="round" 
                                  stroke-linecap="round"
                                  style="color: hsl(219, 14%, 71%); transition: color 0.3s ease;"/>
                        </svg>
                    </button>
                    <div id="wave-1" style="display: none; align-items: center; gap: 3px; height: 40px;">
                        <div style="width: 3px; height: 12px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0s;"></div>
                        <div style="width: 3px; height: 20px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0.1s;"></div>
                        <div style="width: 3px; height: 16px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0.2s;"></div>
                        <div style="width: 3px; height: 24px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0.3s;"></div>
                        <div style="width: 3px; height: 14px; background: hsl(219, 14%, 71%); animation: wave 0.6s ease-in-out infinite; animation-delay: 0.4s;"></div>
                    </div>
                    <div class="audio-progress-bar" 
                         onclick="const rect = this.getBoundingClientRect(); const percent = (event.clientX - rect.left) / rect.width; const audio = document.getElementById('azure-audio-1'); audio.currentTime = percent * audio.duration;"
                         style="width: 150px; height: 4px; background: hsl(219, 14%, 71%, 0.2); border-radius: 2px; overflow: hidden; position: relative; cursor: pointer;">
                        <div id="audio-progress-1" style="width: 0%; height: 100%; background: hsl(219, 14%, 71%); transition: width 0.1s linear; pointer-events: none;"></div>
                    </div>
                </div>
            </div>
            <style>
                @keyframes wave {
                    0%, 100% { height: 12px; }
                    50% { height: 28px; }
                }
                
                @media (max-width: 768px) {
                    .audio-header-container {
                        flex-direction: column !important;
                        align-items: flex-start !important;
                        gap: 10px !important;
                    }
                    
                    .audio-header-container h3 {
                        width: 100%;
                    }
                    
                    .audio-controls {
                        width: 100%;
                        justify-content: flex-start !important;
                    }
                    
                    .audio-progress-bar {
                        flex: 1;
                        min-width: 100px !important;
                        max-width: 100% !important;
                        width: auto !important;
                    }
                }
                
                @media (max-width: 500px) {
                    .audio-header-container {
                        gap: 8px !important;
                    }
                    
                    .audio-controls {
                        gap: 8px !important;
                    }
                    
                    #logo-btn-1 {
                        width: 36px !important;
                        height: 36px !important;
                    }
                    
                    #wave-1 {
                        height: 36px !important;
                    }
                }
            </style>
            <p>An Azure Virtual Machine (VM) is essentially a computer that exists inside Microsoft's cloud data centers instead of sitting physically on your desk. To understand this easily, imagine that instead of buying a laptop or server, you are renting a powerful computer from Microsoft. You can turn it on, turn it off, install software on it, and work on it exactly like your own system, but you access it through the internet.</p>
            
            <h3>How Does It Work?</h3>
            <p>This virtual computer is not imaginary or fake. It is a real physical machine running in a Microsoft data center somewhere in the world. The only difference is that you do not see or touch it physically. Azure manages the hardware, electricity, cooling, and security, while you focus only on using the computer.</p>
            
            <h3>Full Control and Flexibility</h3>
            <p>With an Azure VM, you get full control. You decide which Operating System you want to run, such as Windows Server or Ubuntu Linux. You also choose how much RAM, how many CPU cores, and how much storage the machine should have. This flexibility makes Azure Virtual Machines extremely powerful for developers, students, startups, and enterprises.</p>
            
            <div class="blog-post__image">
                <img src="images/Blog/ghar-to-datacenter.webp" alt="Azure VM connection from home to data center" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
            </div>
            
            <h3>How to create VM in Azure ?</h3>
            <p>To create a Virtual Machine, you first need to log in to the Azure Portal, which is Microsoft's web-based dashboard for managing cloud resources. Once logged in, you click on "Create a Resource" and then select Virtual Machine. From here, Azure guides you through a step-by-step process where you configure your VM.</p>
            <p>Although the process looks long, it is actually logical and structured. Each step helps Azure understand what kind of machine you want to create.</p>
            
            <div class="blog-post__image">
                <img src="images/Blog/Your paragraph text.webp" alt="Azure VM creation process" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
            </div>
            
            <h3>Project Details: Subscription and Resource Group</h3>
            <p>The first configuration step involves selecting a <strong>Subscription</strong> and a <strong>Resource Group</strong>. A subscription defines who pays the bill for your Azure resources. If you have multiple Azure accounts or free credits, the subscription determines which account will be charged for the resources you create.</p>
            <p>A Resource Group can be understood as a logical container or folder where you organize related resources. All resources associated with a single project—such as Virtual Machines, storage disks, IP addresses, and virtual networks—are stored inside one resource group. This organizational structure makes it easier to manage, monitor, and control costs for your entire project.</p>
            <p>One significant advantage of using resource groups is simplified cleanup. When you delete a resource group, all resources contained within it are automatically deleted as well. This prevents orphaned resources that could continue incurring charges.</p>
            
            <div class="blog-post__image">
                <img src="images/Blog/Subscription.webp" alt="Azure Subscription and Resource Group configuration" style="width: 100%; border-radius: 8px; border: 1px solid rgba(255, 255, 255, 0.3);" />
            </div>
        `
    },
    {
        id: 2,
        title: "Project, Kafka Consumption Group and Topic Relationship",
        date: "2024-09-22",
        categories: ["Apache Kafka", "Big Data"],
        tags: ["kafka", "microservices", "distributed-systems"],
        excerpt: "The project here can be regarded as a microservice. You need to choose the project, consumption group and topic relationship according to the scenario. Under one project: multiple consumption groups correspond to one topic. (n: 1) Academic aesthetic education settlement. Under a project, multiple consumption groups correspond to multiple topics. (1: n) None for the time being??? Under a project, a consumption group corresponds to multiple topics. (1: n) Academic order, ...",
        slug: "kafka-consumption-group-topic-relationship",
        readTime: 5,
        content: `
            <p>When designing distributed systems with Apache Kafka, understanding the relationship between projects, consumption groups, and topics is crucial for building scalable and maintainable architectures.</p>
            
            <h3>Project as Microservice</h3>
            <p>In modern architecture, we can consider each project as an independent microservice. This approach helps in maintaining clear boundaries and responsibilities.</p>
            
            <h3>Relationship Patterns</h3>
            <h4>Multiple Consumption Groups to One Topic (n:1)</h4>
            <p>This pattern is useful when multiple services need to process the same stream of data independently. Each consumption group maintains its own offset, allowing parallel processing without interference.</p>
            
            <h4>One Consumption Group to Multiple Topics (1:n)</h4>
            <p>This pattern allows a single service to consume from multiple related topics, useful for data aggregation and correlation scenarios.</p>
            
            <h4>Multiple Consumption Groups to Multiple Topics (n:n)</h4>
            <p>The most complex but flexible pattern, suitable for large-scale systems with complex data flow requirements.</p>
        `
    },
    {
        id: 3,
        title: "Vector Search with Faiss: A Practical Guide",
        date: "2024-01-07",
        categories: ["Deep Learning", "NLP"],
        tags: ["faiss", "vector-search", "similarity-search", "ai"],
        excerpt: "Faiss introduction Faiss is a library for efficient similarity search and clustering of dense vectors. Official introduction: Faiss is a library for efficient similarity search and dense vector clustering. That is, it is used to achieve efficient vector retrieval. Faiss main component package...",
        slug: "vector-search-faiss-practice",
        readTime: 8,
        content: `
            <p>Faiss (Facebook AI Similarity Search) is a powerful library developed by Facebook AI Research for efficient similarity search and clustering of dense vectors.</p>
            
            <h3>What is Faiss?</h3>
            <p>Faiss is designed to handle large-scale vector databases efficiently. It provides both exact and approximate nearest neighbor search algorithms, making it suitable for various applications from recommendation systems to semantic search.</p>
            
            <h3>Key Features</h3>
            <ul>
                <li>Efficient similarity search for dense vectors</li>
                <li>Support for both CPU and GPU operations</li>
                <li>Multiple indexing algorithms (Flat, IVF, HNSW, etc.)</li>
                <li>Scalable to billions of vectors</li>
            </ul>
            
            <h3>Getting Started</h3>
            <p>Installation is straightforward with pip:</p>
            <pre><code>pip install faiss-cpu  # for CPU version
pip install faiss-gpu  # for GPU version</code></pre>
            
            <h3>Basic Usage Example</h3>
            <pre><code>import faiss
import numpy as np

# Generate sample data
d = 128  # dimension
nb = 100000  # database size
nq = 10000  # number of queries

np.random.seed(1234)
xb = np.random.random((nb, d)).astype('float32')
xq = np.random.random((nq, d)).astype('float32')

# Build index
index = faiss.IndexFlatL2(d)
index.add(xb)

# Search
k = 4  # number of nearest neighbors
D, I = index.search(xq, k)</code></pre>
        `
    },
    {
        id: 4,
        title: "Building Scalable Data Pipelines with Apache Airflow",
        date: "2024-08-15",
        categories: ["Data Pipelines", "ETL"],
        tags: ["airflow", "data-pipelines", "workflow", "orchestration"],
        excerpt: "Apache Airflow has become the de facto standard for orchestrating complex data workflows. In this post, we'll explore best practices for building scalable and maintainable data pipelines using Airflow, including DAG design patterns, error handling strategies, and performance optimization techniques.",
        slug: "scalable-data-pipelines-airflow",
        readTime: 12,
        content: `
            <p>Apache Airflow has revolutionized the way we think about data pipeline orchestration. As data teams scale and workflows become more complex, having a robust orchestration platform becomes critical.</p>
            
            <h3>Why Airflow?</h3>
            <p>Airflow provides several key advantages for data pipeline orchestration:</p>
            <ul>
                <li>Rich user interface for monitoring and debugging</li>
                <li>Extensive operator ecosystem</li>
                <li>Dynamic DAG generation</li>
                <li>Built-in retry and error handling mechanisms</li>
                <li>Strong community and enterprise support</li>
            </ul>
            
            <h3>DAG Design Best Practices</h3>
            <h4>1. Keep DAGs Simple and Focused</h4>
            <p>Each DAG should have a single, well-defined purpose. Avoid creating monolithic DAGs that try to do everything.</p>
            
            <h4>2. Use Meaningful Names and Documentation</h4>
            <p>Clear naming conventions and comprehensive documentation make your pipelines maintainable.</p>
            
            <h4>3. Implement Proper Error Handling</h4>
            <p>Use retries, alerting, and failure callbacks to ensure robust pipeline execution.</p>
        `
    }
];

export const getPostBySlug = (slug) => {
    return blogPosts.find(post => post.slug === slug);
};

export const getPostsByCategory = (category) => {
    return blogPosts.filter(post => 
        post.categories.some(cat => cat.toLowerCase() === category.toLowerCase())
    );
};

export const getPostsByTag = (tag) => {
    return blogPosts.filter(post => 
        post.tags.some(t => t.toLowerCase() === tag.toLowerCase())
    );
};

export const getAllCategories = () => {
    const categories = new Set();
    blogPosts.forEach(post => {
        post.categories.forEach(cat => categories.add(cat));
    });
    return Array.from(categories);
};

export const getAllTags = () => {
    const tags = new Set();
    blogPosts.forEach(post => {
        post.tags.forEach(tag => tags.add(tag));
    });
    return Array.from(tags);
};